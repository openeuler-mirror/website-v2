---
title: 'VFIO Device Passthrough Principles (2)'
date: 2020-11-21
tags: 
    - IOMMU
    - SMMU
    - DMA
archives: 2020-11
author: Wang Xingang
summary: This article describes the principles of VFIO device passthrough, including DMA remapping, interrupt remapping, and configuration space simulation.
---

Device passthrough to VMs can greatly improve the VM access performance to physical devices. This article uses the VFIO kernel module and user-mode QEMU implementation to describe key procedures of VFIO device passthrough, including device I/O address space access in user mode, direct memory access (DMA) remapping, and interrupt remapping.  

## VFIO Access to I/O Address Space of Passthrough Devices

1. PMIO and MMIO

The I/O address space of a device can be accessed in port-mapped I/O (PMIO) or memory-mapped I/O (MMIO). In PMIO mode, the device is accessed through an independent I/O port. In MMIO mode, the device memory is mapped to a segment of physical memory, and the configuration space of the device can be accessed by directly accessing the physical memory segment. In virtualization scenarios, when a VM process accesses a passthrough device through PMIO, a VM-exit event occurs, and the control is given back to QEMU. QEMU forwards the PMIO operation based on a conversion table. The base address register (BAR) space address of a PCI device is set in PMIO mode. If the PMIO access to the device is completely exposed to the VM, the VM modifies the base address configuration of the PCI BAR space of the physical device. As a result, the configuration is inconsistent with that on the host, and serious problems may occur. Therefore, a conversion table needs to be created so that QEMU can forward PMIO access to the device as configured when the VM-exit event occurs.  

When accessing the MMIO space of a device, you can create an extended page table (EPT) to map the physical MMIO memory of the device to the virtual MMIO address space. In this way, the VM can directly access the BAR space of the PCI device through MMIO, improving the I/O performance.  

2. Obtaining Passthrough Device Information

You can use the APIs provided by VFIO to obtain basic device information, including the device descriptor and number of regions.  

```c
vfio_get_device:
    fd = ioctl(group->fd, VFIO_GROUP_GET_DEVICE_FD, name);
    ret = ioctl(fd, VFIO_DEVICE_GET_INFO, &dev_info);

    vbasedev->fd = fd;
    vbasedev->group = group;
    QLIST_INSERT_HEAD(&group->device_list, vbasedev, next);

    vbasedev->num_irqs = dev_info.num_irqs;
    vbasedev->num_regions = dev_info.num_regions;
    vbasedev->flags = dev_info.flags;

```

3. PCI Configuration Space Simulation for Passthrough Devices

QEMU creates a virtual data structure **VFIOPCIDevice** for each physical PCI passthrough device to store information about it. The information is obtained by **vfio_get_device** and stored in **vbasedev**.

```c
typedef struct VFIOPCIDevice {
    PCIDevice pdev;
    VFIODevice vbasedev;
```

The VFIO device is a part of the QEMU device model. QEMU initializes the passthrough device  simulation using **vfio_realize**. After the basic information about the passthrough device is obtained through **vfio_get_device**, **pread** is used to read the file descriptor (FD) of the device and obtain a copy of its configuration space information, to which QEMU may write some customized configurations.

```c
vfio_realize:
    /* Get a copy of config space */
    ret = pread(vdev->vbasedev.fd, vdev->pdev.config,
                MIN(pci_config_size(&vdev->pdev), vdev->config_size),
                vdev->config_offset);
    if (ret < (int)MIN(pci_config_size(&vdev->pdev), vdev->config_size)) {
        ret = ret < 0 ? -errno : -EFAULT;
        error_setg_errno(errp, -ret, "failed to read device config space");
        goto error;
    }

    /* vfio emulates a lot for us, but some bits need extra love */
    vdev->emulated_config_bits = g_malloc0(vdev->config_size);

    /* QEMU can choose to expose the ROM or not */
    memset(vdev->emulated_config_bits + PCI_ROM_ADDRESS, 0xff, 4);

    /* QEMU can change multi-function devices to single function, or reverse */
    vdev->emulated_config_bits[PCI_HEADER_TYPE] =
                                              PCI_HEADER_TYPE_MULTI_FUNCTION;

    /* Restore or clear multifunction, this is always controlled by QEMU */
    if (vdev->pdev.cap_present & QEMU_PCI_CAP_MULTIFUNCTION) {
        vdev->pdev.config[PCI_HEADER_TYPE] |= PCI_HEADER_TYPE_MULTI_FUNCTION;
    } else {
        vdev->pdev.config[PCI_HEADER_TYPE] &= ~PCI_HEADER_TYPE_MULTI_FUNCTION;
    }

    /*
     * Clear host resource mapping info.  If we choose not to register a
     * BAR, such as might be the case with the option ROM, we can get
     * confusing, unwritable, residual addresses from the host here.
     */
    memset(&vdev->pdev.config[PCI_BASE_ADDRESS_0], 0, 24);
    memset(&vdev->pdev.config[PCI_ROM_ADDRESS], 0, 4);
```

4. MMIO Mapping of Passthrough Devices

The MMIO memory of a PCI passthrough device mainly refers to the BAR space of the device. QEMU calls the VFIO interface using **vfio_populate_device** to obtain the BAR space information, obtains the region information using **vfio_region_setup**, and then set the memory region of QEMU memory virtualization to the I/O type. More importantly, QEMU sets **ops** to **vfio_region_ops** for the memory region of the I/O type. In this way, subsequent read and write operations on the memory chunk are performed by using interfaces registered with the QEMU VFIO module.

```c
vfio_populate_device:
    for (i = VFIO_PCI_BAR0_REGION_INDEX; i < VFIO_PCI_ROM_REGION_INDEX; i++) {
        char *name = g_strdup_printf("%s BAR %d", vbasedev->name, i);

        ret = vfio_region_setup(OBJECT(vdev), vbasedev, &vdev->bars[i].region, i, name);
			-> vfio_get_region_info
			-> memory_region_init_io(region->mem, obj, &vfio_region_ops,
                              region, name, region->size);
        QLIST_INIT(&vdev->bars[i].quirks);
    }
    ret = vfio_get_region_info(vbasedev, VFIO_PCI_CONFIG_REGION_INDEX, &reg_info);
			->	ioctl(vbasedev->fd, VFIO_DEVICE_GET_REGION_INFO, *info))
    ret = ioctl(vdev->vbasedev.fd, VFIO_DEVICE_GET_IRQ_INFO, &irq_info);
```

The MMIO memory information of the PCI device is obtained, but the BAR space in the physical memory is not yet mapped to QEMU. The mapping will be performed by **vfio_bars_setup**. **vfio_region_mmap** is used to map each memory address that needs to be mapped in the region, and then registers the mapped physical memory with the VM through QEMU as the physical address space of the VM.

```c
vfio_bars_setup:
    for (i = 0; i < PCI_ROM_SLOT; i++)
        vfio_bar_setup(vdev, i);
			vfio_region_mmap(&bar->region)
				    for (i = 0; i < region->nr_mmaps; i++) {
					region->mmaps[i].mmap = mmap(NULL, region->mmaps[i].size, prot,
												MAP_SHARED, region->vbasedev->fd,
												region->fd_offset +
												region->mmaps[i].offset);
					memory_region_init_ram_device_ptr
					memory_region_add_subregion
			pci_register_bar(&vdev->pdev, nr, type, bar->region.mem);

```

The **mmap** interface corresponds to the **vfio_pci_mmap** function registered by the VFIO device in the kernel where this function registers a **mmap ops** function for the virtual memory area (VMA), corresponding to a page fault processing function. When a user-mode program accesses a missing virtual memory page, the registered page fault processing function is called to map the virtual address to the physical address.

```c
vfio_pci_mmap:
	vma->vm_flags |= VM_IO | VM_PFNMAP | VM_DONTEXPAND | VM_DONTDUMP;
	vma->vm_ops = &vfio_pci_mmap_ops;
		-> .fault = vfio_pci_mmap_fault,
				-> if (remap_pfn_range(vma, vma->vm_start, vma->vm_pgoff,
					vma->vm_end - vma->vm_start, vma->vm_page_prot))
```

Simply speaking, MMIO memory mapping is to map the MMIO space in the physical memory to the QEMU virtual address space, and then QEMU registers the memory segment with the VM as a physical memory segment of the VM. During this process, EPT mapping from a guest physical address (GPA) to a host physical address (HPA) is established to improve the MMIO performance.

## DMA Remapping

A device can directly use the I/O virtual address (IOVA) to access the physical memory through DMA. The mapping from the IOVA to the physical address is completed in the IOMMU. Generally, when **dma_alloc** allocates the memory that can be accessed by the device, the IOVA and physical address space are allocated, and the mapping is established in the IOMMU.
Therefore, the following is required for a device to perform DMA:

* Address that can be identified by the device: an IOVA
* A segment of physical memory
* Mapping from an IOVA to the physical memory in IOMMU

With these requirements met, DMA remapping of VFIO is clear. First, VFIO devices are initialized. Before obtaining device information, the groups and containers to which the devices belong are obtained. Then, **VFIO_SET_IOMMU** is called to bind the containers to the IOMMU, and all devices managed by VFIO are attached. The following **pci_device_iommu_address_space** function indicates that QEMU registers a dedicated address space for DMA to the device. This memory segment exists as a physical memory segment of a VM. After **VFIO_SET_IOMMU** is performed, the address space is registered. The function for adding regions is **vfio_listener_region_add**, which is called when memory needs to be increased.

```c
vfio_realize:
    group = vfio_get_group(groupid, pci_device_iommu_address_space(pdev), errp);
		vfio_connect_container(group, as, errp)
			ret = ioctl(fd, VFIO_SET_IOMMU, container->iommu_type);
			container->listener = vfio_memory_listener;
			memory_listener_register(&container->listener, container->space->as);
					-> .region_add = vfio_listener_region_add,
```

When a memory chunk is allocated to a device for DMA, the memory chunk exists in the form of a memory region. That is, when the VM performs DMA allocation, the **region_add** function is called so as to call the registered **memory_listener_region_add** function. If a memory region exists, a physical memory chunk is allocated. In addition, an IOVA and the mapping are required. The IOVA is obtained using **section->offset_within_address_space**. This is feasible because an IOVA is only used as an address for device identification; it makes sense as long as the mapping is established.

```c
vfio_listener_region_add:
	iova = TARGET_PAGE_ALIGN(section->offset_within_address_space);
	/* Here we assume that memory_region_is_ram(section->mr)==true */
    vaddr = memory_region_get_ram_ptr(section->mr) +
            section->offset_within_region +
            (iova - section->offset_within_address_space);
    ret = vfio_dma_map(container, iova, int128_get64(llsize),
                       vaddr, section->readonly);

vfio_dma_map:
    struct vfio_iommu_type1_dma_map map = {
        .argsz = sizeof(map),
        .flags = VFIO_DMA_MAP_FLAG_READ,
        .vaddr = (__u64)(uintptr_t)vaddr,
        .iova = iova,
        .size = size,
    };

    ioctl(container->fd, VFIO_IOMMU_MAP_DMA, &map)
```

The key to establishing the mapping is **vfio_dma_map**. **ioctl** calls **container->fd** and **VFIO_IOMMU_MAP_DMA** to complete DMA remapping. Why is **container->fd** necessary? VFIO containers manage memory resources and are directly bound to the IOMMU which is the key to mapping an IOVA to the physical memory. Note that QEMU knows only the virtual address (**vaddr**) of the memory chunk. Therefore, QEMU sends **vaddr**, **iova**, and **size** to the kernel, and the kernel obtains the physical memory information to complete mapping.

```c
vfio_dma_do_map:
	vfio_pin_map_dma
		while (size) {
			/* Pin a contiguous chunk of memory */
			npage = vfio_pin_pages_remote(dma, vaddr + dma->size,
								size >> PAGE_SHIFT, &pfn, limit);
			/* Map it! */
			vfio_iommu_map(iommu, iova + dma->size, pfn, npage,
							dma->prot);
				list_for_each_entry(d, &iommu->domain_list, next)
					iommu_map(d->domain, iova, (phys_addr_t)pfn << PAGE_SHIFT,
							npage << PAGE_SHIFT, prot | d->prot);
						arm_smmu_map
							__arm_lpae_map
			size -= npage << PAGE_SHIFT;
			dma->size += npage << PAGE_SHIFT;
		}
```

Before creating a mapping from an IOVA to the physical memory, the kernel pins the allocated DMA memory chunk. The **vfio_pin_pages_remote** function is used to obtain the physical address corresponding to the virtual address and the number of pinned pages. Then **vfio_iommu_map** calls the **map** functions of the IOMMU and SMMU. Finally, the IOVA, physical address information (**pfn**), and the number of pages to be mapped (**npage**) are used to establish a mapping relationship in the device I/O page table.  

```
+--------+  iova  +--------+  gpa  +----+
| device |   ->   | memory |   <-  | vm |
+--------+        +--------+       +----+
```

After DMA remapping is complete, the device uses the IOVA allocated by QEMU to access the memory through IOMMU mapping, and the VM uses the GPA to access the memory through stage-2 page table mapping.

## Interrupt Remapping

The virtualization of PCI passthrough device interrupts includes three types: INTx, MSI, and MSI-X.

1. Initializing and Enabling INTx Interrupts

INTx interrupts can be enabled during initialization. QEMU sets the **irq_set** interrupt to the kernel through the VFIO device interface, registers an event FD, and sets the handler of the event FD. When an INTx interrupt occurs, the kernel uses the event FD to notify QEMU, and QEMU instructs the VM to process the event.

```c
vfio_realize:
    if (vfio_pci_read_config(&vdev->pdev, PCI_INTERRUPT_PIN, 1)) {
        pci_device_set_intx_routing_notifier(&vdev->pdev, vfio_intx_update);
        ret = vfio_intx_enable(vdev, errp);
			*pfd = event_notifier_get_fd(&vdev->intx.interrupt);
			qemu_set_fd_handler(*pfd, vfio_intx_interrupt, NULL, vdev);
			ret = ioctl(vdev->vbasedev.fd, VFIO_DEVICE_SET_IRQS, irq_set);
```

2. Initializing MSI-X

During device initialization using **vfio_realize**, MSI-X obtains the interrupt configuration of the physical device and registers the configuration with the corresponding MMIO memory.

```c
vfio_msix_early_setup:
	pos = pci_find_capability(&vdev->pdev, PCI_CAP_ID_MSIX);

	if (pread(fd, &ctrl, sizeof(ctrl),
			vdev->config_offset + pos + PCI_MSIX_FLAGS) != sizeof(ctrl)) {
	if (pread(fd, &table, sizeof(table),
			vdev->config_offset + pos + PCI_MSIX_TABLE) != sizeof(table)) {
	if (pread(fd, &pba, sizeof(pba),
			vdev->config_offset + pos + PCI_MSIX_PBA) != sizeof(pba)) {

	ctrl = le16_to_cpu(ctrl);
	table = le32_to_cpu(table);
	pba = le32_to_cpu(pba);

	msix = g_malloc0(sizeof(*msix));
	msix->table_bar = table & PCI_MSIX_FLAGS_BIRMASK;
	msix->table_offset = table & ~PCI_MSIX_FLAGS_BIRMASK;
	msix->pba_bar = pba & PCI_MSIX_FLAGS_BIRMASK;
	msix->pba_offset = pba & ~PCI_MSIX_FLAGS_BIRMASK;
	msix->entries = (ctrl & PCI_MSIX_FLAGS_QSIZE) + 1;

vfio_msix_setup:
    msix_init(&vdev->pdev, vdev->msix->entries,
                    vdev->bars[vdev->msix->table_bar].region.mem,
                    vdev->msix->table_bar, vdev->msix->table_offset,
                    vdev->bars[vdev->msix->pba_bar].region.mem,
                    vdev->msix->pba_bar, vdev->msix->pba_offset, pos);
		
		memory_region_init_io(&dev->msix_table_mmio, OBJECT(dev), &msix_table_mmio_ops, dev,
                          "msix-table", table_size);
		memory_region_add_subregion(table_bar, table_offset, &dev->msix_table_mmio);
		memory_region_init_io(&dev->msix_pba_mmio, OBJECT(dev), &msix_pba_mmio_ops, dev,
							"msix-pba", pba_size);
		memory_region_add_subregion(pba_bar, pba_offset, &dev->msix_pba_mmio);

vfio_realize:
    /* QEMU emulates all of MSI & MSIX */
    if (pdev->cap_present & QEMU_PCI_CAP_MSIX) {
        memset(vdev->emulated_config_bits + pdev->msix_cap, 0xff,
               MSIX_CAP_LENGTH);

    if (pdev->cap_present & QEMU_PCI_CAP_MSI) {
        memset(vdev->emulated_config_bits + pdev->msi_cap, 0xff,
               vdev->msi_cap_size);
```

3. Enabling MSI/MSI-X and Registering IRQ FD

When a VM-exit event occurs because the VM writes the PCI configuration space, the MSI and MSI-X will be enabled. Take MSI-X as an example. The event FD handler is set in QEMU, the IRQ FD is registered with the kernel through KVM, and then the virtual interrupt is registered with the VM.

```c
kvm_cpu_exec:
	vfio_pci_write_config:
		vfio_msi_enable(vdev);
		vfio_msix_enable(vdev);
			for (i = 0; i < vdev->nr_vectors; i++) {
				if (event_notifier_init(&vector->interrupt, 0)) {

				qemu_set_fd_handler(event_notifier_get_fd(&vector->interrupt),
									vfio_msi_interrupt, NULL, vector);

				vfio_add_kvm_msi_virq(vdev, vector, i, false);
					kvm_irqchip_add_msi_route(kvm_state, vector_n, &vdev->pdev);
					vfio_add_kvm_msi_virq
						kvm_irqchip_add_irqfd_notifier_gsi
							kvm_vm_ioctl(s, KVM_IRQFD, &irqfd);
			/* Set interrupt type prior to possible interrupts */
			vdev->interrupt = VFIO_INT_MSI;
			ret = vfio_enable_vectors(vdev, false);
				ret = ioctl(vdev->vbasedev.fd, VFIO_DEVICE_SET_IRQS, irq_set);
```

## Summary

To enable a VM to directly access a device, the DMA capability, interrupt response, and I/O address space of the device must be securely exposed to the userspace. This article describes the key procedures of VFIO device passthrough, including how to access the I/O address space of a physical device in user mode and how to perform DMA remapping and interrupt remapping.

## Reference

* [https://kernelgo.org/vfio-insight.html](https://kernelgo.org/vfio-insight.html)
