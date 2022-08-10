---
title: "Glibc Malloc Source Code Analysis (1)"
date: 2021-01-29
tags: 
    - glibc
    - malloc
archives: 2021-01
author: wangshuo
summary: The glibc malloc principle is further analyzed based on the source code. This document describes the basic data structure of malloc in detail.
---
# 1. Introduction
This article analyzes data structures of glibc malloc through the source code.

The software information is as follows:
| Item | Version |
| :----:| :----: |
| OS | openEuler 20.03 LTS |
| Kernel | 4.19.90-2003.4.0.0036.oe1 |
| Glibc | 2.28 |
| GCC | 7.3.0 |


# 2. Chunk
A chunk is the minimum unit for glibc memory management. The definition of a chunk is as follows:
```
/*
  This struct declaration is misleading (but accurate and necessary).
  It declares a "view" into memory allowing access to necessary
  fields at known offsets from a given base. See explanation below.
*/

struct malloc_chunk {

  INTERNAL_SIZE_T      mchunk_prev_size;  /* Size of previous chunk (if free).  */
  INTERNAL_SIZE_T      mchunk_size;       /* Size in bytes, including overhead. */

  struct malloc_chunk* fd;         /* double links -- used only if free. */
  struct malloc_chunk* bk;

  /* Only used for large blocks: pointer to next larger size.  */
  struct malloc_chunk* fd_nextsize; /* double links -- used only if free. */
  struct malloc_chunk* bk_nextsize;
};
```
Through space reuse, the malloc memory management algorithm can be implemented with the minimum space occupied. An idle chunk requires at least four sizes of `size_t`  to store `mchunk_prev_size`, `mchunk_size`, `fd`, and `bk`. When a chunk is in use, the `prev_size` field of the next chunk is invalid. Therefore, the space can also be used by the current chunk. 

The last three bits of `mchunk_size` are used as flag bits to indicate the usage of the previous chunk, chunk application mode (brk or mmap), and chunk ownership. glibc provides the following macro definitions to determine the flag bits:
```
/* size field is or'ed with PREV_INUSE when previous adjacent chunk in use */
#define PREV_INUSE 0x1

/* extract inuse bit of previous chunk */
#define prev_inuse(p)       ((p)->mchunk_size & PREV_INUSE)


/* size field is or'ed with IS_MMAPPED if the chunk was obtained with mmap() */
#define IS_MMAPPED 0x2

/* check for mmap()'ed chunk */
#define chunk_is_mmapped(p) ((p)->mchunk_size & IS_MMAPPED)


/* size field is or'ed with NON_MAIN_ARENA if the chunk was obtained
   from a non-main arena.  This is only set immediately before handing
   the chunk to the user, if necessary.  */
#define NON_MAIN_ARENA 0x4
```


# 3. Bins
To improve the efficiency of heap memory allocation and release, glibc malloc uses explicit lists to manage chunks. An explicit list is a common data structure linked list that connects nodes with the same attribute in series to facilitate management. In glibc malloc, these linked lists are called bins. The nodes on the linked lists are free chunks. The system classifies bins into the following four types based on the sizes of free chunks:
<br>&nbsp;&nbsp;&nbsp;&nbsp;fast bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;unsorted bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;small bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;large bin

According to the management mode, bins can be classified into the following two types:
<br>&nbsp;&nbsp;&nbsp;&nbsp;fastbinsY: an array used to record small chunks. The size of each chunk is irregular.
<br>&nbsp;&nbsp;&nbsp;&nbsp;bin array: an array used to record large chunks. By default, there are 126 elements (`bin[0]` and `bin[127]` are not used), which are as follows:
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1]: unsorted bin
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2-63]: small bins
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[64-126]: large bins

A free chunk has the `fd` and `bk` pointers. Therefore, bins are doubly linked lists of chunks that are connected via these two pointers. Bins are initialized through the following process:
```
/*
   Initialize a malloc_state struct.

   This is called from ptmalloc_init () or from _int_new_arena ()
   when creating a new arena.
 */

static void 
malloc_init_state (mstate av)
{
  int i;
  mbinptr bin; 

  /* Establish circular links for normal bins */
  for (i = 1; i < NBINS; ++i) 
    {    
      bin = bin_at (av, i);
      bin->fd = bin->bk = bin; 
    }    

    ...

}
```
According to the preceding code, during initialization, the pointers of all bins point to themselves, indicating that these bins are empty. Note that the index value of the first member in the bin array is set to 1 instead of 0. The following definition of unsorted bins explains the reason.
```
...

/*
   Unsorted chunks

    All remainders from chunk splits, as well as all returned chunks,
    are first placed in the "unsorted" bin. They are then placed
    in regular bins after malloc gives them ONE chance to be used before
    binning. So, basically, the unsorted_chunks list acts as a queue,
    with chunks being placed on it in free (and malloc_consolidate),
    and taken off (to be either used or placed in bins) in malloc.

    The NON_MAIN_ARENA flag is never set for unsorted chunks, so it
    does not have to be taken into account in size comparisons.
 */

/* The otherwise unindexable 1-bin is used to hold unsorted chunks. */
#define unsorted_chunks(M)          (bin_at (M, 1))

...

/* addressing -- note that bin_at(0) does not exist */
#define bin_at(m, i) \
  (mbinptr) (((char *) &((m)->bins[((i) - 1) * 2]))               \
             - offsetof (struct malloc_chunk, fd))

...

```


## 3.1 Fast Bin
Fast bins are used to improve the allocation efficiency of small memory. Before thread local caches (tcache) are introduced, fast bins are the first structure to be accessed during memory application and release. The specifications of fast bins are as follows:
```
/* offset 2 to use otherwise unindexable first 2 bins */
#define fastbin_index(sz) \   
  ((((unsigned int) (sz)) >> (SIZE_SZ == 8 ? 4 : 3)) - 2)


/* The maximum fastbin request size we support */
#define MAX_FAST_SIZE     (80 * SIZE_SZ / 4)

#define NFASTBINS  (fastbin_index (request2size (MAX_FAST_SIZE)) + 1)
```
On a 64-bit system, a fast bin consists of 10 linked lists, and the maximum chunk size is 160 bytes. However, glibc limits the maximum chunk size to 128 bytes by using the global variable `global_max_fast` by default. Therefore, a chunk whose size is 16 to 128 bytes and is a multiple of 16 is classified as a fast chunk by default.

Each fast bin maintains a singly linked list. The last in first out (LIFO) algorithm is used to apply for and release memory. The add operation (free memory) is to add a new fast chunk to the end of the linked list, and the delete operation (malloc memory) is to delete the fast chunk from the end of the linked list. To implement the LIFO algorithm, each fast bin element in the fastbinsY array points to the tail node of the linked list, and the tail node points to the previous node by using its `fd` pointer.

In addition, to ensure the performance of applying for and releasing small memory chunks, fast bins do not merge free chunks (the chunk merging will be analyzed in detail later). Therefore, when free chunks are stored in fast bins, the system reserves the usage flag bit to avoid automatic merging.


## 3.2 Small Bin
Small bins are used to manage small chunks. For example, on a 64-bit platform, a chunk managed by a small bin is less than 1,024 bytes. Small bins have the following features:
<br>&nbsp;&nbsp;&nbsp;&nbsp;1. There are 62 small bins. Each bin maintains a cyclic doubly-linked list and uses the first in first out (FIFO) algorithm. The memory release operation adds the newly released chunk to the front of the linked list, and the allocation operation obtains the chunk from the tail of the linked list.
<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Each small bin has chunks of the same size. 
<br>&nbsp;&nbsp;&nbsp;&nbsp;3. Adjacent free chunks can be merged into a large free chunk.

The following macro can be used to determine whether a chunk belongs to a small bin and the index of the chunk in the small bin:
```
#define NSMALLBINS         64
#define SMALLBIN_WIDTH    MALLOC_ALIGNMENT
#define SMALLBIN_CORRECTION (MALLOC_ALIGNMENT > 2 * SIZE_SZ)
#define MIN_LARGE_SIZE    ((NSMALLBINS - SMALLBIN_CORRECTION) * SMALLBIN_WIDTH)

#define in_smallbin_range(sz)  \
  ((unsigned long) (sz) < (unsigned long) MIN_LARGE_SIZE)

...

#define smallbin_index(sz) \
  ((SMALLBIN_WIDTH == 16 ? (((unsigned) (sz)) >> 4) : (((unsigned) (sz)) >> 3))\
   + SMALLBIN_CORRECTION)
```
On a 64-bit platform, the chunk size in the first small bin is 32 to 47 bytes, and the chunk size in each subsequent small bin is increased by 16 bytes, that is, the minimum chunk value of the last small bin is 32 + 62 x 16 = 1008 bytes.


## 3.3 Large Bin
Large bins are used to manage large chunks. For example, on a 64-bit platform, a large bin manages chunks whose size is greater than or equal to 1024 bytes. Large bins have the following features:
<br>&nbsp;&nbsp;&nbsp;&nbsp;1. There are 63 large bins. A large bin is similar to a small bin. The differences are that the sizes of chunks in a large bin can be different but must be within a specified range, and a large chunk can be added to or deleted from any position of the large bin.
<br>&nbsp;&nbsp;&nbsp;&nbsp;2. The merge operation of large bins is similar to that of small bins.

The following macro can be used to determine whether a chunk belongs to a large bin and the index of the chunk in the large bin:
```
#define largebin_index_32(sz)                                                \
  (((((unsigned long) (sz)) >> 6) <= 38) ?  56 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

#define largebin_index_32_big(sz)                                            \
  (((((unsigned long) (sz)) >> 6) <= 45) ?  49 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

// XXX It remains to be seen whether it is good to keep the widths of
// XXX the buckets the same or whether it should be scaled by a factor
// XXX of two as well.
#define largebin_index_64(sz)                                                \
  (((((unsigned long) (sz)) >> 6) <= 48) ?  48 + (((unsigned long) (sz)) >> 6) :\
   ((((unsigned long) (sz)) >> 9) <= 20) ?  91 + (((unsigned long) (sz)) >> 9) :\
   ((((unsigned long) (sz)) >> 12) <= 10) ? 110 + (((unsigned long) (sz)) >> 12) :\
   ((((unsigned long) (sz)) >> 15) <= 4) ? 119 + (((unsigned long) (sz)) >> 15) :\
   ((((unsigned long) (sz)) >> 18) <= 2) ? 124 + (((unsigned long) (sz)) >> 18) :\
   126)

#define largebin_index(sz) \
  (SIZE_SZ == 8 ? largebin_index_64 (sz)                                     \
   : MALLOC_ALIGNMENT == 16 ? largebin_index_32_big (sz)                     \
   : largebin_index_32 (sz))
```
According to the preceding definition, the size of the chunk linked list in a large bin does not increase by degrees. On a 64-bit platform, the chunk size of the first 32 large bins is increased by 64 bytes, that is, the chunk size of the first large bin ranges from 1,024 bytes to 1,087 bytes and the chunk size of the second large bin ranges from 1,088 bytes to 1,151 bytes... The chunk size of bins 33 to 48 is increased by 512 bytes. The chunk size of bins 49 to 56 is increased by 4,096 bytes. The chunk size of bins 57 to 60 is increased by 32,768 bytes. The chunk size of bins 61 and 62 is increased by 262,144 bytes. The rest chunks are stored in the last large bin. The chunk size in a large bin may be different. Therefore, to speed up memory allocation and release, all chunks in the large bin are arranged in descending order of chunk size. The largest chunk is stored at the head of the linked list, and the smallest chunk is stored at the end of the linked list.

When the size requested by a user exceeds the maximum value of small bins, the large bin determination logic is used. Specifically, the system finds the large bin in which the size of the largest chunk is greater than the requested size. And then the system traverses the large bin from the end, finds the first chunk whose size is the same as or close to the requested size, and allocates the chunk to the user. If the size of the smallest chunk at the tail is greater than the requested size, the chunk is split into two chunks, that is, the chunk with a size equal to the requested size is allocated to the user and the remaining chunk is added to an unsorted bin as a new chunk.

In addition, to improve the retrieval speed, binmap is introduced in glibc malloc. The definition and usage of binmap are as follows:
```
  /* Bitmap of bins */
  unsigned int binmap[BINMAPSIZE];

...

#define mark_bin(m, i)    ((m)->binmap[idx2block (i)] |= idx2bit (i))
#define unmark_bin(m, i)  ((m)->binmap[idx2block (i)] &= ~(idx2bit (i)))
#define get_binmap(m, i)  ((m)->binmap[idx2block (i)] & idx2bit (i))
```
The binmap records whether a bin is empty. It uses the bitmap algorithm to avoid retrieving empty bins. If a non-empty large bin is found through the binmap, the chunk is allocated according to the method in the previous paragraph. Otherwise, the top chunk is used to allocate memory. The allocation method of the top chunk will be described in detail later.


## 3.4 Unsorted Bin
An unsorted bin is a bin linked list with chunks of different sizes. When small or large chunks are released but not added to the corresponding bins, the system adds the chunks to the unsorted bin. Unsorted bins can speed up memory allocation and release because there is no need to search for proper bins. The features of the unsorted bin are as follows:
<br>&nbsp;&nbsp;&nbsp;&nbsp;1. There is only 1 unsorted bin, which is a cyclic doubly-linked list consisting of free chunks.
<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Different from other bins, the unsorted bin has no restriction on the chunk size. Chunks of any size can be stored in the unsorted bin.

The process of access to the unsorted chunk is as follows. To facilitate the management, glibc malloc sets `bin[1]` in the bin linked list as the linked list header of unsorted chunks.
```
/*
   Unsorted chunks

    All remainders from chunk splits, as well as all returned chunks,
    are first placed in the "unsorted" bin. They are then placed
    in regular bins after malloc gives them ONE chance to be used before
    binning. So, basically, the unsorted_chunks list acts as a queue,
    with chunks being placed on it in free (and malloc_consolidate),
    and taken off (to be either used or placed in bins) in malloc.

    The NON_MAIN_ARENA flag is never set for unsorted chunks, so it
    does not have to be taken into account in size comparisons.
 */

/* The otherwise unindexable 1-bin is used to hold unsorted chunks. */
#define unsorted_chunks(M)          (bin_at (M, 1))
```




# 4. Arena
The arena is used to reduce fierce lock contention in the SMP multi-thread environment. Each process has one main arena and multiple thread arenas. glibc malloc dynamically increases the number of thread arenas when the contention for arenas is fierce. Once the number of arenas increases, it does not decrease. The main arena can access the heap area and mmap mapping area of the process. That is, the main arena can use sbrk and mmap to apply for virtual memory from the operating system. The thread arenas can access only the mmap mapping area of the process. The thread arenas use mmap() to wholesale the virtual memory of `HEAP_MAX_SIZE` (64 MB by default in a 64-bit system) from the operating system and then retail small memory chunks upon user requests, reducing the system invoking overhead.
```
/*
   have_fastchunks indicates that there are probably some fastbin chunks.
   It is set true on entering a chunk into any fastbin, and cleared early in
   malloc_consolidate.  The value is approximate since it may be set when there
   are no fastbin chunks, or it may be clear even if there are fastbin chunks
   available.  Given it's sole purpose is to reduce number of redundant calls to
   malloc_consolidate, it does not affect correctness.  As a result we can safely
   use relaxed atomic accesses.
 */


struct malloc_state
{
  /* Serialize access.  */
  __libc_lock_define (, mutex);

  /* Flags (formerly in max_fast).  */
  int flags;

  /* Set if the fastbin chunks contain recently inserted free blocks.  */
  /* Note this is a bool but not all targets support atomics on booleans.  */
  int have_fastchunks;

  /* Fastbins */
  mfastbinptr fastbinsY[NFASTBINS];

  /* Base of the topmost chunk -- not otherwise kept in a bin */
  mchunkptr top;

  /* The remainder from the most recent split of a small request */
  mchunkptr last_remainder;

  /* Normal bins packed as described above */
  mchunkptr bins[NBINS * 2 - 2];

  /* Bitmap of bins */
  unsigned int binmap[BINMAPSIZE];

  /* Linked list */
  struct malloc_state *next;

  /* Linked list for free arenas.  Access to this field is serialized
     by free_list_lock in arena.c.  */
  struct malloc_state *next_free;

  /* Number of threads attached to this arena.  0 if the arena is on
     the free list.  Access to this field is serialized by
     free_list_lock in arena.c.  */
  INTERNAL_SIZE_T attached_threads;

  /* Memory allocated from the system in this arena.  */
  INTERNAL_SIZE_T system_mem;
  INTERNAL_SIZE_T max_system_mem;
};
```
Arenas are the root management structure of glibc malloc data. Memory chunks of different sizes are stored in different types of linked lists to meet different memory requirements of users and reach a compromise between memory fragments and performance.

Each arena has a top chunk located at the top of the arena (that is, at the highest memory address). This chunk does not belong to any bin. When all free chunks of the current heap cannot meet the memory size requested by a user, the chunk is allocated to the user. If the size of the top chunk is larger than the size requested by the user, the top chunk is divided into two parts: the chunk requested by the user and the remaining part which becomes the new top chunk. Otherwise, the heap needs to be expanded through sbrk in the main arena or a new heap needs to be allocated through mmap in the thread arenas.

```
/*
   Top

    The top-most available chunk (i.e., the one bordering the end of
    available memory) is treated specially. It is never included in
    any bin, is used only if no other chunk is available, and is
    released back to the system if it is very large (see
    M_TRIM_THRESHOLD).  Because top initially
    points to its own bin with initial zero size, thus forcing
    extension on the first malloc request, we avoid having any special
    code in malloc to check whether it even exists yet. But we still
    need to do so when getting memory from system, so we make
    initial_top treat the bin as a legal but unusable chunk during the
    interval between initialization and the first call to
    sysmalloc. (This is somewhat delicate, since it relies on
    the 2 preceding words to be zero during this interval as well.)
 */

/* Conveniently, the unsorted bin can be used as dummy top on first call */
#define initial_top(M)              (unsorted_chunks (M))
```
According to the initialization definition of the top chunk, glibc considers the top chunk unsorted for initialization. However, glibc still considers that the top chunk does not belong to any bin.


# 5. Heap
As mentioned above, the thread arenas use mmap() to wholesale the virtual memory of `HEAP_MAX_SIZE` (64 MB by default in a 64-bit system) from the operating system. This part of memory is called a heap in glibc. It should be noted that the heap herein is not a heap in the virtual memory space of the process in a broad sense, but a memory space that the sub-thread applies for from the operating system by invoking mmap. A heap is managed by `heap_info`. The definition is as follows:
```
/* A heap is a single contiguous memory region holding (coalesceable)
   malloc_chunks.  It is allocated with mmap() and always starts at an
   address aligned to HEAP_MAX_SIZE.  */
        
typedef struct _heap_info
{         
  mstate ar_ptr; /* Arena for this heap. */
  struct _heap_info *prev; /* Previous heap. */
  size_t size;   /* Current size in bytes. */
  size_t mprotect_size; /* Size in bytes that has been mprotected
                           PROT_READ|PROT_WRITE.  */
  /* Make sure the following data is properly aligned, particularly
     that sizeof (heap_info) + 2 * SIZE_SZ is a multiple of
     MALLOC_ALIGNMENT. */
  char pad[-6 * SIZE_SZ & MALLOC_ALIGN_MASK];
} heap_info;
```
When the current heap is insufficient, malloc invokes the mmap function to apply for a new heap. At least one heap exists in a thread arena. Heaps are connected to each other through a linked list. When a heap is released, glibc reclaims it.


# 6. Tcache
Tcache is introduced in version 2.26 (see this [commit](https://sourceware.org/git/?p=glibc.git;a=commitdiff;h=d5c3fafc4307c9b7a4c7d5cb381fcdbfad340bcc) for details). This mechanism creates a cache for each thread to implement the lock-free allocation algorithm and improve performance. Currently, the tcache mechanism is enabled in glibc of openEuler by default. You can use `USE_TCACHE` to enable or disable the tcache mechanism during compilation.

Tcache introduces two new data structures: `tcache_entry` and `tcache_perthread_struct`. The definitions are as follows:
```
#if USE_TCACHE

/* We overlay this structure on the user-data portion of a chunk when
   the chunk is stored in the per-thread cache.  */
typedef struct tcache_entry
{
  struct tcache_entry *next;
  /* This field exists to detect double frees.  */
  struct tcache_perthread_struct *key;
} tcache_entry;

/* There is one of these for each thread, which contains the
   per-thread cache (hence "tcache_perthread_struct").  Keeping
   overall size low is mildly important.  Note that COUNTS and ENTRIES
   are redundant (we could have just counted the linked list each
   time), this is for performance reasons.  */
typedef struct tcache_perthread_struct
{
  char counts[TCACHE_MAX_BINS];
  tcache_entry *entries[TCACHE_MAX_BINS];
} tcache_perthread_struct;

static __thread bool tcache_shutting_down = false;
static __thread tcache_perthread_struct *tcache = NULL;

...

#endif
```

`tcache_perthread_struct` contains an array `entries` for storing bins. By default, 64 bins can be stored. The number of bins is defined as follows. The array `counts` stores the number of chunks in each bin. Each chunk in the bin contains a `tcache_entry` (FD pointer) in the user data, which points to the next chunk in the same bin to form a singly linked list.

By default, each thread uses 64 bins in the singly linked list. Each bin can store a maximum of seven chunks. The size of chunks increases by 16 bytes on a 64-bit machine, ranging from 24 bytes to 1,032 bytes. On a 32-bit machine, the value increases by 8 bytes, ranging from 12 bytes to 512 bytes. Therefore, tcache bins store only non-large chunks.
```
#if USE_TCACHE
/* We want 64 entries.  This is an arbitrary limit, which tunables can reduce.  */
# define TCACHE_MAX_BINS        64
# define MAX_TCACHE_SIZE    tidx2usize (TCACHE_MAX_BINS-1)

/* Only used to pre-fill the tunables.  */
# define tidx2usize(idx)    (((size_t) idx) * MALLOC_ALIGNMENT + MINSIZE - SIZE_SZ)

/* When "x" is from chunksize().  */
# define csize2tidx(x) (((x) - MINSIZE + MALLOC_ALIGNMENT - 1) / MALLOC_ALIGNMENT)
/* When "x" is a user-provided size.  */
# define usize2tidx(x) csize2tidx (request2size (x))

/* With rounding and alignment, the bins are...
   idx 0   bytes 0..24 (64-bit) or 0..12 (32-bit)
   idx 1   bytes 25..40 or 13..20
   idx 2   bytes 41..56 or 21..28
   etc.  */

/* This is another arbitrary limit, which tunables can change.  Each
   tcache bin will hold at most this number of chunks.  */
# define TCACHE_FILL_COUNT 7
#endif
```


# References
Ptmalloc2 source code analysis (Huating i.e. Zhuang Mingqiang)

In-depth analysis of Linux heap memory management: https://murphypei.github.io/blog/2019/01/linux-heap

glibc tcache: https://firmianay.gitbooks.io/ctf-all-in-one/content/doc/4.14_glibc_tcache.html
