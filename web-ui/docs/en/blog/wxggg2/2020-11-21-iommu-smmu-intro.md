---
title: 'Introduction to IOMMU and ARM SMMU'
date: 2020-11-21
tags: 
    - IOMMU
    - SMMU
    - DMA
archives: 2020-11
author: Wang Xingang
summary: This article describes the IOMMU principle and ARM SMMU initialization process.
---

## Introduction to the IOMMU

In computing, an input–output memory management unit (IOMMU) is a memory management unit (MMU) that connects a direct-memory-access–capable (DMA-capable) I/O bus to the physical memory. Like a traditional MMU, the IOMMU maps device-visible virtual addresses (also called I/O virtual address, IOVA) to physical addresses (PAs). Different platforms have different IOMMUs, such as the Intel IOMMU—graphics address remapping table (GART) used by PCI Express graphics cards, and System Memory Management Unit (SMMU) used by the ARM platform.

The CPU and devices access the physical memory in the following way:
```
    +---------------------+
    |      Main Memory    |
    +---------------------+
               |
              pa
               |
         -------------
         |           |
    +--------+   +--------+
    | IOMMU  |   |  MMU   |
    +--------+   +--------+
         |           |
       iova          va
         |           |
    +--------+   +--------+
    | Device |   |  CPU   |
    +--------+   +--------+
```

Compared with DMA, IOMMU has the following advantages:
* Large regions of memory can be allocated without the need to be contiguous in physical memory. The IOMMU maps contiguous virtual addresses (VAs) to the fragmented PAs.
* Devices that do not support memory addresses long enough to address the entire physical memory can still address the entire memory through the IOMMU. For example, x86 computers can address more than 4 GB of memory with the Physical Address Extension (PAE) feature. But an ordinary 32-bit PCI device cannot address the memory above 4 GB. With IOMMU, the device can address the entire physical memory.
* Memory is protected from malicious devices that are attempting DMA attacks and faulty devices that are attempting errant memory transfers because a device cannot read or write to the mapped physical memory.
* In virtualization, a guest OS can use hardware that is not specifically made for virtualization. Higher performance hardware such as graphics cards uses DMA to access memory directly. In a virtual environment, all memory addresses are re-mapped by the virtualization software (such as QEMU), which causes the guest OS fails to access memory using DMA. The IOMMU handles this re-mapping, allowing the drivers to use DMA to access memory in the guest OS.
* In some architectures IOMMU also performs interrupt re-mapping, in a manner similar to address re-mapping.
* Peripheral memory paging can be supported by an IOMMU. A peripheral using the PCI-SIG PCIe Address Translation Services (ATS) Page Request Interface (PRI) extension can detect and signal the need for memory manager services.

Compared with DMA, the disadvantages of using the IOMMU include extra performance and memory overhead. Address translation and page fault processing increase performance overhead. In addition, the IOMMU needs to allocate space for the I/O page table in the memory. In some cases, the IOMMU and CPU share the page table to avoid this memory overhead. For example, the device and CPU share the virtual address.

## ARM SMMU Data Structure

The SMMU provides the capability of accessing the physical memory by using the IOVA visible to the device. In the system architecture, multiple devices may use the IOVA to access the physical memory through the IOMMU. The IOMMU needs to distinguish different devices, so each device is assigned with a stream ID  (SID), which points to the corresponding stream table entry (STE). All STEs exist in the memory as arrays. The SMMU records the start addresses of the STE arrays. When scanning a device, the OS allocates a unique SID to the device. All configurations for the device to access the memory through the IOMMU are written into the STE corresponding to the SID .

Stream table:
```
                  +-------+
strtab_base ----- | STE 0 |
                  | STE 1 |
StreamID[n:0] ->  | STE 2 |
                  | STE 3 |
                  +-------+
```

The STE stores the address translation process from the IOVA to the PA. To adapt to the memory access requirement in the virtualization scenario, the SMMU supports two stages of address translation in a similar way to extended page tables (EPTs). Stage 1 translates the VA into an intermediate physical address (IPA), and stage 2 translates the IPA into a PA.

STE:
```
Stream Table Entry (STE)
+-----------------------+ 
| Config | S1ContextPtr | -> CD -> Stage 1 translation tables
+-----------------------+
|  VMID  | S2TTB        | -> Stage 2 translation tables
+-----------------------+
| Other attributes,     |
| configuration         |
+-----------------------+
```

In non-virtualization scenarios, if a device uses the IOVA to perform DMA through the IOMMU, only stage 1 address translation is required. Because multiple devices may use one device, the STE of each device also records information about the context descriptor (CD) table, S1ContextPtr points to the base address of the CD table in the memory. The CD table is also an array and uses SubstreamID (SSID or PASID) for memory access. PASID, an ID associated with the process, is used to distinguish the VA space of different processes. After the CD entry is found by using PASID, the I/O page table for stage 1 address translation is found and stored in TTB0 and TTB1.

CD:
```
                  +-------+
S1ContextPtr ---- |  CD 0 |
                  |  CD 1 |
SubStreamID   ->  |  CD 2 |
                  |  CD 3 |
                  +-------+

Context Desctriptor (CD)
+-----------------------+ 
| Configuration | TTB0  | 
+-----------------------+
|      ASID     | TTB1  |
+-----------------------+
```

It should be noted that, generally, the process enables, by using the device driver, the IOVA used when the device performs DMA to be allocated by the kernel mode driver. When there are multiple processes, the kernel mode IOVA is mapped to the VA space of the process, that is, different processes actually use the same IOVA space during DMA. Therefore, only CD 0 is required. Generally, only the base address of the I/O page table needs to be stored in CD 0. However, when the I/O address space of the device and the VA space of the process need to be unified, for example, to access the shared virtual address (SVA), multiple CD entries are used to separately bind VA spaces of different processes.

It is a complex process for the device to translate the address through the SMMU. The first step is to locate the STE by using the device SID. The STE records whether the stage 1 address translation needs to be bypassed. Bypass means to use a PA or IPA directly. If no bypass is done, the SID is used to locate the associated CD, which records the page table for stage 1 address translation to translate a VA into an IPA. If stage 2 page table translation is configured in the STE, the IPA will be translated into a PA. If stage 2 address translation is not configured, the previously obtained IPA is the PA.

The SMMU address translation process is as follows:
```
                         VA
                          |
                    -----------
                    |         |
+---------------------+       |
| Stage 1 translation |    Bypass
|        VA->IPA      |       |
+---------------------+       |
                    |         |
                    -----------
                          |
                         IPA
                          |
                    -----------
                    |         |
+---------------------+       |
| Stage 2 translation |    Bypass
|        IPA->VA      |       |
+---------------------+       |
                    |         |
                    -----------
                          |
                         PA
```

## ARM SMMUv3 Initialization

All IOMMU-related drivers are stored in the **drivers/iommu** directory of the kernel. The latest SMMUv3 driver is `arm-smmu-v3.c`. The `struct arm_smmu_device` structure manages the key information about the SMMU platform device in the memory. The kernel initializes the SMMU device by filling in this structure.

```c
/* An SMMUv3 instance */
struct arm_smmu_device {
	struct device			*dev;
	void __iomem			*base;
	u32				features;
	u32				options;

	struct arm_smmu_cmdq		cmdq;
	struct arm_smmu_evtq		evtq;
	struct arm_smmu_priq		priq;

	int				gerr_irq;
	int				combined_irq;
	u32				sync_nr;

	unsigned long			ias; /* IPA */
	unsigned long			oas; /* PA */
	unsigned long			pgsize_bitmap;

#define ARM_SMMU_MAX_ASIDS		(1 << 16)
	unsigned int			asid_bits;
	DECLARE_BITMAP(asid_map, ARM_SMMU_MAX_ASIDS);

#define ARM_SMMU_MAX_VMIDS		(1 << 16)
	unsigned int			vmid_bits;
	DECLARE_BITMAP(vmid_map, ARM_SMMU_MAX_VMIDS);

	unsigned int			ssid_bits;
	unsigned int			sid_bits;

	struct arm_smmu_strtab_cfg	strtab_cfg;

	/* IOMMU core code handle */
	struct iommu_device		iommu;
};
```

The entry for loading the driver is the `arm_smmu_device_probe` function, which performs the following operations:

 1. Reads attributes such as the SMMU interrupt from the SMMU node of the DTS or the SMMU configuration table of the ACPI.
 2. Uses `struct resource` to obtain resource information from the device and remaps I/Os.
 3. Probes hardware features of the SMMU.
 4. Initializes interrupt and event queues.
 5. Creates an STE table.
 6. Resets the device.
 7. Registers the SMMU with the IOMMU.

### 1. Reading the SMMU Node Information of the DTS

The `arm_smmu_device_dt_probe` function reads the attributes from `smmu->dev->of_node` and records the attributes in `smmu->options`. In addition, the function checks whether the DMA supports coherency. If the DMA supports coherency, the function sets the coherency feature.
```c
if (of_dma_is_coherent(dev->of_node))
      smmu->features |= ARM_SMMU_FEAT_COHERENCY;
```

### 2. Obtaining Device Resource Information and Performing I/O Remapping

`struct resource` stores the obtained resource information of the SMMU device, including the I/O base address and the base address after I/O remapping by using `smmu->base`. Then, the SMMU hardware registers can be read and written by using `smmu->base` plus offset.

```c
/* Base address */
res = platform_get_resource(pdev, IORESOURCE_MEM, 0);
ioaddr = res->start;
smmu->base = devm_ioremap_resource(dev, res);
```

### 3. Probing SMMU Hardware Features

The `arm_smmu_device_hw_probe` function obtains the hardware features of the SMMU by reading the SMMU register.

IDR0 register:
```
reg = readl_relaxed(smmu->base + ARM_SMMU_IDR0);
```
* Records whether the two-level STE table and two-level CD table are supported.
* Records whether PRI, ATS, SEV, MSI, HYP, STALL, Stage 1, and Stage 2 are supported.
* Obtains the ias length, asid_bits, and vmid_bits.

IDR1 register:
```c
reg = readl_relaxed(smmu->base + ARM_SMMU_IDR1);
```
* Obtains the length of the evtq and priq queues, ssid_bits, and sid_bits.

IDR5 register:
```c
reg = readl_relaxed(smmu->base + ARM_SMMU_IDR5);
```
* Obtains the maximum number of evtq stalls.
* Records whether VAX, oas length, and pgsize_bitmap are supported.

### 4. Initializing Interrupt and Event Queues

The `arm_smmu_init_structures` function initializes the data structure in the memory, including three queues: evtq, priq, and cmdq. The cmdq queue is used by the SMMU driver to send commands to hardware, such as refreshing the TLB and writing to CD. The event queue is used by the platform device mounted to the SMMU to send exception messages to the driver. The priq queue has similar functions to the event queue except that the former is used by the mounted PCI device. The event and pri queues have their own interrupt IDs to notify abnormal events. In addition, the gerror interrupt ID is used to report unrecoverable critical errors, which are interrupted directly without being added to a queue.

```c
irq = platform_get_irq_byname(pdev, "combined");
if (irq > 0)
      smmu->combined_irq = irq;
else {
      irq = platform_get_irq_byname(pdev, "eventq");
      if (irq > 0)
            smmu->evtq.q.irq = irq;

      irq = platform_get_irq_byname(pdev, "priq");
      if (irq > 0)
            smmu->priq.q.irq = irq;

      irq = platform_get_irq_byname(pdev, "gerror");
      if (irq > 0)
            smmu->gerr_irq = irq;
}

/* Initialise in-memory data structures */
ret = arm_smmu_init_structures(smmu);
```

When the driver resets the SMMU device, `arm_smmu_setup_unique_irqs` registers the corresponding event processing. The eventq and priq register a kernel thread to complete the event processing. For unrecoverable errors, `arm_smmu_setup_unique_irqs` directly registers that it completes the interrupt processing.

### 5. Creating an STE Table

A two-level or linear STE table can be created based on the SMMU configuration. Compared with a linear STE table, a two-level STE table does not need to create all STEs at the beginning, but only allocates the directory entry of the first level. For a linear STE table, a continuous region in the memory is assigned by using the DMA based on the values of `sid_bits` and `STE`. The base address is recorded in the configuration, and all STEs are set to the default bypass mode.

```c
static int arm_smmu_init_strtab_linear(struct arm_smmu_device *smmu)
{
	void *strtab;
	u64 reg;
	u32 size;
	struct arm_smmu_strtab_cfg *cfg = &smmu->strtab_cfg;

	size = (1 << smmu->sid_bits) * (STRTAB_STE_DWORDS << 3);
	strtab = dmam_alloc_coherent(smmu->dev, size, &cfg->strtab_dma,
				     GFP_KERNEL | __GFP_ZERO);

	cfg->strtab = strtab;
	cfg->num_l1_ents = 1 << smmu->sid_bits;

	/* Configure strtab_base_cfg for a linear table covering all SIDs */
	reg  = FIELD_PREP(STRTAB_BASE_CFG_FMT, STRTAB_BASE_CFG_FMT_LINEAR);
	reg |= FIELD_PREP(STRTAB_BASE_CFG_LOG2SIZE, smmu->sid_bits);
	cfg->strtab_base_cfg = reg;

	arm_smmu_init_bypass_stes(strtab, cfg->num_l1_ents);
	return 0;
}
```
### 6. Resetting the Device

The `arm_smmu_device_reset` function resets the device. Based on the obtained device registers, the function writes information such as queue memory attributes to the control registers CR1 and CR2, writes the base addresses and configuration information of the STE tables to the STRTAB_BASE register, and writes the base addresses, queue heads, and queue tails of the three queues in the memory to the corresponding registers. Then, the reset function registers the interrupt event processing by calling `arm_smmu_setup_irqs`.

### 7. Registering the SMMU with the IOMMU

IOMMU devices on different platforms have a unified IOMMU interface in the Linux kernel. During SMMU initialization, an `smmu->iommu` device node is registered in the **sys** directory, and `arm_smmu_ops` is registered with the device, system PCI bus, and platform device bus. In this way, when the IOMMU public interface is used, the functions provided by the SMMU are invoked. For details, see the implementation of various IOMMU interfaces provided in `arm_smmu_ops`.

```c
iommu_device_sysfs_add(&smmu->iommu, dev, NULL,
			     "smmu3.%pa", &ioaddr);

iommu_device_set_ops(&smmu->iommu, &arm_smmu_ops);
iommu_device_set_fwnode(&smmu->iommu, dev->fwnode);

iommu_device_register(&smmu->iommu);

bus_set_iommu(&pci_bus_type, &arm_smmu_ops);
bus_set_iommu(&platform_bus_type, &arm_smmu_ops);
```

## IOMMU and DMA

One of the main functions of the IOMMU is to prevent the device from directly using the PA when accessing the memory in DMA mode. Therefore, the IOVA is generated. When `dma_alloc` allocates the memory, an IOVA is allocated in the I/O address space first, then, the mapping between the IOVA and the PA allocated by `dma_alloc` is established in the page table managed by the IOMMU. When the peripheral performs DMA, only the IOVA needs to be used.

When the `dma_alloc` series functions are called to allocate memory, the `iommu_dma_alloc` function is called. The `iommu_dma_alloc` function allocates the IOVA and actual physical memory, and uses `iommu_map` to establish the mapping between the IOVA and the physical memory, that is, locates the STE corresponding to the device, locates the CD (generally CD 0), locates the corresponding page table in the memory, and writes the mapping between the IOVA and the physical memory to the page table. The page table operations related to the ARM SMMU are performed in **io-pgtable.c**.

```c
iommu_dma_alloc
      pages = __iommu_dma_alloc_pages(count, alloc_sizes >> PAGE_SHIFT, gfp);
      iova = iommu_dma_alloc_iova(domain, size, dev->coherent_dma_mask, dev);

      iommu_map_sg(domain, iova, sgt.sgl, sgt.orig_nents, prot
```

The IOMMU can be bypassed in multiple ways. Linux provides the iommu.passthrough mode. You can configure the DMA not to use the IOMMU but use the Software Input Output Translation Lookaside Buffer (SWIOTLB) technology to access the memory. In addition, the SMMUv3 driver provides parameters to bypass an SMMU. Beyond that, you do not need to configure an SMMU node in the ACPI or DTS, so that the corresponding SMMU is not probed when the system is loaded.

## Summary

The main function of the IOMMU is to provide the mapping from the IOVA to the PA for the device to access the physical memory. In this way, the device does not directly use the PA to access the memory, which is secure. As a specific implementation of the IOMMU, the ARM SMMUv3 provides an interface for the IOMMU. IOMMU-related operations include DMA operations performed by devices and device hardware capabilities exposed securely to the user mode through the VFIO passthrough are used to establish the mapping between IOVAs that can be identified by devices and actual PAs.

## References
* https://en.wikipedia.org/wiki/Input%E2%80%93output_memory_management_unit
* https://developer.arm.com/documentation/ihi0070/latest
* https://kernel.taobao.org/2020/06/ARM-SMMU-and-IOMMU/
