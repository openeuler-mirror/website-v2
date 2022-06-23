---
title: Analysis of the VM Performance Deterioration When Running memcpy to Copy 1,000 Bytes in the x86_64 Environment
date: 2021-01-14
tags: 
    - Glibc
    - Performance
archives: 2021-01
author: wangshuo
summary: Introduction to the glibc memcpy logic in the x86_64 environment based on the VM performance deterioration when memcpy 1k is executed
---

# 1. Problem Background
## 1.1 Symptom
When **memcpy 1k** is executed in the x86_64 environment, the virtual machine (VM) performance is 40 times lower than that of the physical machine (PM).

## 1.2 Software Information
| Item| Version|
| :----:| :----: |
| OS| openEuler 20.03 LTS|
| Kernel| 4.19.90-2003.4.0.0036.oe1.x86_64|
| Glibc| 2.28 |
| GCC| 7.3.0 |

# 2. Conclusion and Solution
## 2.1 Conclusion
The hyper-threading function is not enabled in the XML file for starting the VM. As a result, the memcpy L3 cache threshold on the PM is different from that on the VM, causing the performance difference.

## 2.2 Solution
### Method 1: Enabling Hyper-Threading for the VM
```
<cpu mode='host-passthrough' check='none'>
   ...
  <topology sockets='2' cores='4' threads='2'/>
  <feature policy='require' name='topoext'/>
</cpu>
```
### Method 2: Adjusting the memcpy Threshold
The following configuration is recommended by the glibc community:
```
# export GLIBC_TUNABLES=glibc.tune.x86_non_temporal_threshold=$(($(getconf LEVEL3_CACHE_SIZE) * 3 / 4))
```

# 3 Overview of the memcpy Algorithm
In glibc-2.28, memcpy and memove share the same set of logic. The implementation algorithm is briefly described in the glibc source code.
```
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

/* memmove/memcpy/mempcpy is implemented as:
   1. Use overlapping load and store to avoid branch.
   2. Load all sources into registers and store them together to avoid
      possible address overlap between source and destination.
   3. If size is 8 * VEC_SIZE or less, load all sources into registers
      and store them together.
   4. If address of destination > address of source, backward copy
      4 * VEC_SIZE at a time with unaligned load and aligned store.
      Load the first 4 * VEC and last VEC before the loop and store
      them after the loop to support overlapping addresses.
   5. Otherwise, forward copy 4 * VEC_SIZE at a time with unaligned
      load and aligned store.  Load the last 4 * VEC and first VEC
      before the loop and store them after the loop to support
      overlapping addresses.
   6. If size >= __x86_shared_non_temporal_threshold and there is no
      overlap between destination and source, use non-temporal store
      instead of aligned store.  */
```

As described in item 6, if __x86_shared_non_temporal_threshold is exceeded, the non-temporal store is used to replace the aligned store, which causes the performance deterioration.

# 4 Execution Logic
Before the process is started in the x86 environment, a series of threshold initialization operations are performed. The involved threshold initialization operations are as follows:
```
sysdeps/x86/cacheinfo.c

533       /* A value of 0 for the HTT bit indicates there is only a single
534      logical processor.  */
535       if (HAS_CPU_FEATURE (HTT))
536     {
          ...
          Compute threads
          ...
693     }

        ...

781   /* The large memcpy micro benchmark in glibc shows that 6 times of
782      shared cache size is the approximate value above which non-temporal
783      store becomes faster on a 8-core processor.  This is the 3/4 of the
784      total shared cache size.  */
785   __x86_shared_non_temporal_threshold
786     = (cpu_features->non_temporal_threshold != 0
787        ? cpu_features->non_temporal_threshold
788        : __x86_shared_cache_size * threads * 3 / 4);
```
It shows that the value of **__x86_shared_non_temporal_threshold** of the VM is **0** when hyper-threading is not enabled, and that of the PM is **__x86_shared_cache_size * threads * 3/4**. When the memcpy 1k operation is performed, the branch to be executed is determined based on the following logic. The logic of the VM is different from that of the PM after this operation.
```
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

455 #if (defined USE_MULTIARCH || VEC_SIZE == 16) && IS_IN (libc)
456     /* Check non-temporal store threshold.  */
457     cmpq    __x86_shared_non_temporal_threshold(%rip), %rdx
458     ja  L(large_backward)
459 #endif
```
The logic is as follows:
```
PM logic
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

460 L(loop_4x_vec_backward):
461     /* Copy 4 * VEC a time backward.  */
462     VMOVU   (%rcx), %VEC(0)
463     VMOVU   -VEC_SIZE(%rcx), %VEC(1)
464     VMOVU   -(VEC_SIZE * 2)(%rcx), %VEC(2)
465     VMOVU   -(VEC_SIZE * 3)(%rcx), %VEC(3)
466     subq    $(VEC_SIZE * 4), %rcx
467     subq    $(VEC_SIZE * 4), %rdx
468     VMOVA   %VEC(0), (%r9)
469     VMOVA   %VEC(1), -VEC_SIZE(%r9)
470     VMOVA   %VEC(2), -(VEC_SIZE * 2)(%r9)
471     VMOVA   %VEC(3), -(VEC_SIZE * 3)(%r9)
472     subq    $(VEC_SIZE * 4), %r9
473     cmpq    $(VEC_SIZE * 4), %rdx
474     ja  L(loop_4x_vec_backward)
475     /* Store the first 4 * VEC.  */
476     VMOVU   %VEC(4), (%rdi)
477     VMOVU   %VEC(5), VEC_SIZE(%rdi)
478     VMOVU   %VEC(6), (VEC_SIZE * 2)(%rdi)
479     VMOVU   %VEC(7), (VEC_SIZE * 3)(%rdi)
480     /* Store the last VEC.  */
481     VMOVU   %VEC(8), (%r11)
482     VZEROUPPER
483     ret
```

```
VM logic
sysdeps/x86_64/multiarch/memmove-vec-unaligned-erms.S

528 L(loop_large_backward):
529     /* Copy 4 * VEC a time backward with non-temporal stores.  */
530     PREFETCH_ONE_SET (-1, (%rcx), -PREFETCHED_LOAD_SIZE * 2)
531     PREFETCH_ONE_SET (-1, (%rcx), -PREFETCHED_LOAD_SIZE * 3)
532     VMOVU   (%rcx), %VEC(0)
533     VMOVU   -VEC_SIZE(%rcx), %VEC(1)
534     VMOVU   -(VEC_SIZE * 2)(%rcx), %VEC(2)
535     VMOVU   -(VEC_SIZE * 3)(%rcx), %VEC(3)
536     subq    $PREFETCHED_LOAD_SIZE, %rcx
537     subq    $PREFETCHED_LOAD_SIZE, %rdx
538     VMOVNT  %VEC(0), (%r9)
539     VMOVNT  %VEC(1), -VEC_SIZE(%r9)
540     VMOVNT  %VEC(2), -(VEC_SIZE * 2)(%r9)
541     VMOVNT  %VEC(3), -(VEC_SIZE * 3)(%r9)
542     subq    $PREFETCHED_LOAD_SIZE, %r9
543     cmpq    $PREFETCHED_LOAD_SIZE, %rdx
544     ja  L(loop_large_backward)
545     sfence
546     /* Store the first 4 * VEC.  */
547     VMOVU   %VEC(4), (%rdi)
548     VMOVU   %VEC(5), VEC_SIZE(%rdi)
549     VMOVU   %VEC(6), (VEC_SIZE * 2)(%rdi)
550     VMOVU   %VEC(7), (VEC_SIZE * 3)(%rdi)
551     /* Store the last VEC.  */
552     VMOVU   %VEC(8), (%r11)
553     VZEROUPPER
554     ret
```

# 5 Instruction Difference Analysis
According to the preceding description, the biggest difference between the execution logic of the PM and that of the VM lies in the mov instruction. The definition of the mov instruction is as follows:
```
sysdeps/x86_64/memmove.S

 23 #define PREFETCHNT  prefetchnta
 24 #define VMOVNT      movntdq
 25 /* Use movups and movaps for smaller code sizes.  */
 26 #define VMOVU       movups
 27 #define VMOVA       movaps
```
The PM logic uses the movaps instruction, which features 16-byte alignment. The VM logic uses the movntdq instruction, which bypasses the main cache. See the following description.  
>[https://stackoverflow.com/questions/14106477/how-do-non-temporal-instructions-work](https://stackoverflow.com/questions/14106477/how-do-non-temporal-instructions-work)  
>The streaming read/write with non-temporal hints are typically used to reduce cache pollution (often with WC memory). The idea is that a small set of cache lines are reserved on the CPU for these instructions to use. Instead of loading a cache line into the main caches, it is loaded into this smaller cache.
>
>The comment supposes the following behavior (but I cannot find any references that the hardware actually does this, one would need to measure or a solid source and it could vary from hardware to hardware): - Once the CPU sees that the store buffer is full and that it is aligned to a cache line, it will flush it directly to memory since the non-temporal write bypasses the main cache.

As described, the movntdq instruction stores data in the memory by bypassing the main cache. Therefore, the performance of the movntdq instruction is inferior to that of the movaps instruction.

After communicating with the community, we know that the community adopts a compromise strategy. For the memcpy operation of large data blocks, if the L3 cache is used, the memcpy performance can be improved, but the performance of the entire system is affected. Therefore, the threshold is specified.
>[https://sourceware.org/pipermail/libc-alpha/2021-January/121510.html](https://sourceware.org/pipermail/libc-alpha/2021-January/121510.html)  
>\> The performance of memcpy 1024 has recovered. However, there is performance  
>\> reduce in host. This is test result (cycle):  
>\>  
>\> 	                      memcpy_10	 memcpy_1k	 memcpy_10k	  memcpy_1m	  memcpy_10m  
>\> before backport	             8	         34	        187	        130848	   2325409  
>\> after backport	             8	         34	        182	        515156	   5282603  
>\> Performance improvement	   0.00%	    0.00%	    2.67%	    -293.71%   -127.17%
>
>I think this is expected because the large copies no longer stay within
>the cache.  This is required to avoid blowing away the entire cache
>contents for such large copies, negatively impacting whole system
>performance.  This will of course not show up in a micro-benchmark.


# 6 After Threshold Change
According to the preceding analysis, the default threshold of the VM is **0**. A verification test is performed on the VM and PM based on the recommended configuration of the community. The result (unit: number of cycles) is as follows:

| Physical Machine| memcpy_10 | memcpy_1k | memcpy_10k | memcpy_1M | memcpy_10M |
| :----:| :----: | :----: | :----: | :----: | :----: |
| Before the configuration| 8 | 34 | 187| 130848| 2325409|
| After the configuration| 8 | 34 | 182| 515156| 5282603|
| Performance| 0.00% | 0.00% |2.67% | -293.71% | -127.17% |

| Virtual Machine| memcpy_10 | memcpy_1k | memcpy_10k | memcpy_1M | memcpy_10M |
| :----:| :----: | :----: | :----: | :----: | :----: |
| Before the configuration| 8 | 1269| 4555| 523740| 5304273|
| After the configuration| 8 | 35| 183| 509297| 5260913|
| Performance | 0.00% | 97.24% |95.98% | 2.76% | 0.82% |
Compare the statistics before and after the configuration of the VM and PM. It is found that the performance of the VM is the same as that of the PM after the threshold is changed. In addition, for the PM, the threshold is changed from **__x86_shared_cache_size * threads * 3/4** to **__x86_shared_cache_size * 3/4**. The threshold decreases, and the movntdq instruction is more likely to be used. Therefore, the PM performance decreases when the data block is greater than or equal to 1 MB. 
