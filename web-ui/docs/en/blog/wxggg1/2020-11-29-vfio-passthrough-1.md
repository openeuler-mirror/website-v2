---
title: 'VFIO Device Passthrough Principles (1)'
date: 2020-11-29
tags: 
    - IOMMU
    - SMMU
    - DMA
archives: 2020-11
author: Wang Xingang
summary: This article describes the principles of VFIO device passthrough, including some basic concepts and user-mode interfaces.
---

To ensure that I/O devices run within the boundaries they've been allotted, many modern systems provide DMA and interrupt remapping facilities, such as AMD-Vi and Intel VT-d on the x86 platform. Virtual Function I/O (VFIO) is a framework that securely exposes device I/O, interrupt, and DMA capabilities to userspace so that user-mode drivers can be used to implement the functions of devices. It is used to provide direct device access to VMs to obtain higher device I/O performance.

The key for implementing user-mode drivers is how to expose the DMA capability to userspace in a secure and controllable manner. IOMMU can restrict device access to memory. A malicious device cannot read or write the physical memory directly but through an I/O virtual address (IOVA) only after IOMMU mapping. In this way, memory access security is ensured.

## VFIO Kernel Components

The following lists main VFIO kernel components, which provide a unified access interface layer (the VFIO interface layer) for userspace through device files.

* VFIO container
* VFIO group
* VFIO device

``` 
+-----------------------------------------+
|            vfio interface               |
+-----------------------------------------+
|  vfio_iommu_driver |       vfio_pci     |
+--------------------+--------------------+
|        iommu       |       pci_bus      |
+--------------------+--------------------+
```

The VFIO interface layer encapsulates the **vfio_iommu_driver** and **vfio_pci** modules, which interact with the underlying IOMMU and PCI drivers respectively. **vfio_iommu_driver** provides the IOMMU remapping driver for VFIO to perform DMA remapping. The remapping is mainly completed by **vfio_iommu_type1**, which uses the IOMMU capability of managing I/O page tables to perform I/O remapping. **vfio_pci** encapsulates the PCI driver and works with user-mode programs to implement user-mode device configuration space simulation, base address register (BAR) space redirection, and interrupt remapping.

The following shows the relationship between the container, group, and device. A container can be regarded as a physical resource set, and each container can have multiple groups. A group is the minimum hardware granularity for the IOMMU to implement DMA isolation. A group may contain one or more devices, depending on the IOMMU topology of hardware.

``` 
container
+------------------------+
|    group0    group1    |
|  +-------+  +------+   |
|  | dev0  |  | dev2 |   |
|  | dev1  |  +------+   |
|  +-------+             |
+------------------------+
```

For details about the relationship between the container, group, device, and IOMMU, see the [vfio.txt](https://www.kernel.org/doc/Documentation/vfio.txt) file.

## VFIO Container

```c
// container: /dev/vfio/vfio
struct vfio_container {
	struct kref			kref;
	struct list_head		group_list;
	struct rw_semaphore		group_lock;
	struct vfio_iommu_driver	*iommu_driver;
	void				*iommu_data;
	bool				noiommu;
};
```

A container manages memory resources and is related to the IOMMU, DMA, and address space. You can open the device file **/dev/vfio/vfio** to obtain the file descriptor corresponding to the container, and specific implementations of the VFIO device file operations are included in the kernel file **vfio/vfio.c**. **ioctl** is used to obtain IOMMU information. VFIO sends IOMMU-related operations in userspace to the underlying **vfio_iommu** driver. The following lists the interfaces provided by VFIO **ioctl**.

* Obtaining the API version
* Setting the IOMMU type, for example, **VFIO_TYPE1_IOMMU**
* Obtaining IOMMU information
* Allocating space and performing DMA mapping

``` c
int container, group, device, i;
struct vfio_iommu_type1_info iommu_info = { .argsz = sizeof(iommu_info) };
struct vfio_iommu_type1_dma_map dma_map = { .argsz = sizeof(dma_map) };

/* Create a new container */
container = open("/dev/vfio/vfio", O_RDWR);

if (ioctl(container, VFIO_GET_API_VERSION) != VFIO_API_VERSION)
    /* Unknown API version */

if (!ioctl(container, VFIO_CHECK_EXTENSION, VFIO_TYPE1_IOMMU))
    /* Doesn't support the IOMMU driver we want. */

/* Enable the IOMMU model we want */
ioctl(container, VFIO_SET_IOMMU, VFIO_TYPE1_IOMMU);

/* Get addition IOMMU info */
ioctl(container, VFIO_IOMMU_GET_INFO, &iommu_info);

/* Allocate some space and setup a DMA mapping */
dma_map.vaddr = mmap(0, 1024 * 1024, PROT_READ | PROT_WRITE,
                MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);
dma_map.size = 1024 * 1024;
dma_map.iova = 0; /* 1MB starting at 0x0 from device view */
dma_map.flags = VFIO_DMA_MAP_FLAG_READ | VFIO_DMA_MAP_FLAG_WRITE;

ioctl(container, VFIO_IOMMU_MAP_DMA, &dma_map);
```

## VFIO Group

```c
// group: /dev/vfio/%group_id
struct vfio_group {
	struct kref			kref;
	int				minor;
	atomic_t			container_users;
	struct iommu_group		*iommu_group;
	struct vfio_container		*container;
	struct list_head		device_list;
	struct mutex			device_lock;
	struct device			*dev;
	struct notifier_block		nb;
	struct list_head		vfio_next;
	struct list_head		container_next;
	struct list_head		unbound_list;
	struct mutex			unbound_lock;
	atomic_t			opened;
	wait_queue_head_t		container_q;
	bool				noiommu;
	struct kvm			*kvm;
	struct blocking_notifier_head	notifier;
};
```

A group is the minimum hardware granularity for the IOMMU to implement DMA isolation. The group to which a device belongs depends on the IOMMU and the physical structure of the device. During device passthrough, all devices in a group are allocated to a VM. That is, multiple groups and their devices belong to one container. In this way, DMA isolation can be implemented, preventing a device in a container from obtaining data in another container through DMA attacks.

For a PCI device (for example, 0000:06:0d.0::), you can obtain its **iommu_group** in the **sys** directory through **readlink**. In the following example, the PCI device is in the IOMMU group whose ID is 26.

``` shell
$ readlink /sys/bus/pci/devices/0000:06:0d.0/iommu_group
../../../../kernel/iommu_groups/26
```

The device is mounted to the PCI bus. You can use vfio-pci to manage the group by unbinding the PCI device from the original driver and writing the ID to the new **vfio-pci** path. A character device for the group will be created.

``` shell
$ lspci -n -s 0000:06:0d.0
06:0d.0 0401: 1102:0002 (rev 08)
$ echo 0000:06:0d.0 > /sys/bus/pci/devices/0000:06:0d.0/driver/unbind
$ echo 1102 0002 > /sys/bus/pci/drivers/vfio-pci/new_id
```

After the device is bound to VFIO, a new group ID is generated in the **/dev/vfio/** directory. You can use the ID to obtain group information and perform the following operations:

* Querying the group status and checking whether all devices are bound to the VFIO driver
* Setting the container of the group
* Allocating a file descriptor to the device based on the BDF (Bus:Device.Function) of the device

``` c
struct vfio_group_status group_status =
                { .argsz = sizeof(group_status) };
/* Open the group */
group = open("/dev/vfio/26", O_RDWR);

/* Test the group is viable and available */
ioctl(group, VFIO_GROUP_GET_STATUS, &group_status);

if (!(group_status.flags & VFIO_GROUP_FLAGS_VIABLE))
    /* Group is not viable (ie, not all devices bound for vfio) */

/* Add the group to the container */
ioctl(group, VFIO_GROUP_SET_CONTAINER, &container);

/* Get a file descriptor for the device */
device = ioctl(group, VFIO_GROUP_GET_DEVICE_FD, "0000:06:0d.0");
```

## VFIO Device

```c
struct vfio_device {
	struct kref			kref;
	struct device			*dev;
	const struct vfio_device_ops	*ops;
	struct vfio_group		*group;
	struct list_head		group_next;
	void				*device_data;
};
```

To support both the platform and PCI devices, VFIO provides **struct vfio_device** to describe VFIO devices and points **device_data** to **struct vfio_pci_device**. Different from a physical device, a device that is an independent piece of hardware forms an IOMMU group. For a multi-function device, multiple functions are interconnected and can access data of each other; therefore, they must be placed in a group.

After the device descriptor is obtained through the BDF of the device and the **ioctl** operation on the group, the kernel operation structure **vfio_pci_ops** of **vfio_pci** corresponding to the descriptor can be used. This **ops** structure is registered with the PCI device when the **vfio_pci_probe** function of the **vfio_pci** device driver is invoked. During the probe, the device is added to the corresponding group. The **vfio_pci_ioctl** function is an important device operation in **vfio_pci**. It provides the following interfaces:

* **VFIO_DEVICE_GET_INFO**: Obtains device information, including the number of regions and IRQs.
* **VFIO_DEVICE_GET_REGION_INFO**: Obtains the **vfio_region** information, including the regions of the configuration space and BAR space.
* **VFIO_DEVICE_GET_IRQ_INFO**: Obtains device interrupt information.
* **VFIO_DEVICE_SET_IRQS**: Completes interrupt-related settings.
* **VFIO_DEVICE_RESET**: Resets the device.
* **VFIO_DEVICE_GET_PCI_HOT_RESET_INFO**: Obtains the hot reset information of the PCI device.
* **VFIO_DEVICE_PCI_HOT_RESET**: Sets hot reset for the PCI device.
* **VFIO_DEVICE_IOEVENTFD**: Sets ioeventfd.

To expose device capabilities to userspace, ensure the device configuration space can be directly accessed and device interrupts can be processed by user-mode programs. For a PCI device, the configuration space is a VFIO region, which corresponds to a block of MMIO memory. DMA remapping enables the device configuration space to be directly accessed from userspace, and interrupt remapping enables user-mode drivers to process device interrupts.

``` c
struct vfio_device_info device_info = { .argsz = sizeof(device_info) };

/* Get a file descriptor for the device */
device = ioctl(group, VFIO_GROUP_GET_DEVICE_FD, "0000:06:0d.0");

/* Test and setup the device */
ioctl(device, VFIO_DEVICE_GET_INFO, &device_info);

for (i = 0; i < device_info.num_regions; i++) {
    struct vfio_region_info reg = { .argsz = sizeof(reg) };

    reg.index = i;

    ioctl(device, VFIO_DEVICE_GET_REGION_INFO, &reg);

    /* Setup mappings... read/write offsets, mmaps

        * For PCI devices, config space is a region */
}

for (i = 0; i < device_info.num_irqs; i++) {
    struct vfio_irq_info irq = { .argsz = sizeof(irq) };

    irq.index = i;

    ioctl(device, VFIO_DEVICE_GET_IRQ_INFO, &irq);

    /* Setup IRQs... eventfds, VFIO_DEVICE_SET_IRQS */
}

/* Gratuitous device reset and go... */
ioctl(device, VFIO_DEVICE_RESET);
```

## Container, Group, and Device Binding

1. **VFIO_SET_IOMMU**: Binds a container to an IOMMU.

The VFIO container is bound to the IOMMU by invoking **VFIO_SET_IOMMU** through **ioctl** in user mode. Once the binding is complete, all groups managed by the container and their devices are attached to the IOMMU, which means that an I/O page table is created for the devices to complete initialization.

```c
ioctl(container, VFIO_SET_IOMMU, VFIO_TYPE1_IOMMU)
    vfio_ioctl_set_iommu
    	list_for_each_entry(group, &container->group_list, container_next) {
		ret = driver->ops->attach_group(data, group->iommu_group);
            __iommu_attach_group
            	ret = __iommu_group_for_each_dev(group, domain,
					 iommu_group_do_attach_device);
                        __iommu_attach_device
                            arm_smmu_attach_dev
                                Creates an I/O page table for the devices.
```

2. **VFIO_GROUP_SET_CONTAINER**: Binds a group to a container.

VFIO provides an interface for user-mode programs to specify the container to which a group is bound. The binding operation records the group in the linked list of the container for management. If **vfio_iommu_driver** has been set, the group is attached and then the I/O page table of devices in the group is initialized.

```c
VFIO_GROUP_SET_CONTAINER:
    vfio_group_set_container
        driver = container->iommu_driver;
        if (driver) {
            ret = driver->ops->attach_group(container->iommu_data,
                            group->iommu_group);
            if (ret)
                goto unlock_out;
        }

        group->container = container;
        container->noiommu = group->noiommu;
        list_add(&group->container_next, &container->group_list);
```

3. The binding between a device and a group depends on the physical topology of the device and IOMMU.

## Summary

The implementation of VFIO kernel components is closely related to the IOMMU and device model of the Linux kernel. Three VFIO concepts (container, group, and device) are abstracted to encapsulate the Linux kernel components. This article describes the basic VFIO concepts using user-mode interfaces of VFIO. To expose a physical device to userspace through the VFIO driver, the following steps re required:

* Unbind the device from the original driver and then bind the device to the VFIO driver. The VFIO driver specifies a group for the device depending on the physical topology of the device and IOMMU.
* After the binding is complete, user-mode drivers can obtain the VFIO container through **/dev/vfio/vfio**, set the **vfio_iommu_driver** type, and indirectly access the IOMMU through the container to complete DMA mapping.
* Then, you can use **/dev/vfio/%group_id** to obtain the group to which the device belongs and use **ioctl** to add all devices in the group to the container.
* Then, the file descriptor of the VFIO device can be obtained by using the group ID and device BDF, and the configuration space and IRQ information of the device can be accessed by using the interface provided by VFIO. In this way, physical devices can be accessed from userspace.

VFIO device passthrough has several key issues. For example, how to access the I/O address space of a passthrough device, and how to complete interrupt remapping and DMA remapping to enable user-mode drivers to access physical devices.

## References

* [https://www.kernel.org/doc/Documentation/vfio.txt](https://www.kernel.org/doc/Documentation/vfio.txt)
* [https://kernelgo.org/vfio-introduction.html](https://kernelgo.org/vfio-introduction.html)
