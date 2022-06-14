---
title: 'Glibc Malloc Source Code Analysis (3)'
date: 2021-03-01
tags: 
    - glibc
    - malloc
archives: 2021-03
author: wangshuo
Summary: The glibc malloc principle is further analyzed based on the source code. This article analyzes the free code process.
---
# **1. Introduction**
This document uses the source code to explain the glibc free execution process.

The software information is as follows:
| Item | Version                |
| :------------------------------------:| :------------------------------------------------------: |
| OS     | openEuler 20.03 (LTS)    |
| Kernel | 4.19.90-2003.4.0.0036.oe1 |
| Glibc | 2.28                     |
| GCC | 7.3.0                    |
<br>

# 2. Execution Process
## 2.1 Overall Process
The glibc free process is as follows:
```
void
__libc_free (void *mem)
{
  mstate ar_ptr;
  mchunkptr p;                          /* chunk corresponding to mem */

  void (*hook) (void *, const void *)
    = atomic_forced_read (__free_hook);
  if (__builtin_expect (hook != NULL, 0))
    {    
      (*hook)(mem, RETURN_ADDRESS (0));
      return;
    }    

  if (mem == 0)                              /* free(0) has no effect */
    return;

  p = mem2chunk (mem);

  if (chunk_is_mmapped (p))                       /* release mmapped memory. */
    {    
      /* See if the dynamic brk/mmap threshold needs adjusting.
     Dumped fake mmapped chunks do not affect the threshold.  */
      if (!mp_.no_dyn_threshold
          && chunksize_nomask (p) > mp_.mmap_threshold
          && chunksize_nomask (p) <= DEFAULT_MMAP_THRESHOLD_MAX
      && !DUMPED_MAIN_ARENA_CHUNK (p)) 
        {    
          mp_.mmap_threshold = chunksize (p); 
          mp_.trim_threshold = 2 * mp_.mmap_threshold;
          LIBC_PROBE (memory_mallopt_free_dyn_thresholds, 2,
                      mp_.mmap_threshold, mp_.trim_threshold);
        }    
      munmap_chunk (p); 
      return;
    }    

  MAYBE_INIT_TCACHE ();

  ar_ptr = arena_for_chunk (p); 
  _int_free (ar_ptr, p, 0);
}
libc_hidden_def (__libc_free)
```
<br>

The **__free_hook** function is called (if available) together with **malloc_hook** to implement the debugging function of mtrace. **mem2chunk** is used to convert the pointer **mem** of the virtual memory to the chunk pointer **p**.
```
#define mem2chunk(mem) ((mchunkptr)((char*)(mem) - 2*SIZE_SZ))
```
<br>
**chunk_is_mmapped** is used to check the flag of the lowest three bits of size to determine whether the chunk is allocated by mmap. If allocated, **munmap_chunk** is called to release the chunk and return. Before **munmap_chunk** is called, the global mmap threshold and shrinking threshold are updated. The **MAYBE_INIT_TCACHE** macro defined below is used to preferentially store memory in tcache. If tcache is enabled, the code will not be executed.

```
# define MAYBE_INIT_TCACHE() \
  if (__glibc_unlikely (tcache == NULL)) \
    tcache_init();
  
#else  /* !USE_TCACHE */
# define MAYBE_INIT_TCACHE()
```
<br>

If the chunk is not allocated by mmap, the arena pointer **ar_ptr** is obtained through **arena_for_chunk**, which is defined as follows:
```
#define arena_for_chunk(ptr) \
  (chunk_main_arena (ptr) ? &main_arena : heap_for_ptr (ptr)->ar_ptr)
```
<br>

After the arena pointer is obtained, **_int_free** is called to release the memory. **_int_free** will be analyzed in detail later. The **munmap_chunk** function source code is as follows:
```
static void
munmap_chunk (mchunkptr p)
{
  INTERNAL_SIZE_T size = chunksize (p);

  assert (chunk_is_mmapped (p));

  /* Do nothing if the chunk is a faked mmapped chunk in the dumped
     main arena.  We never free this memory.  */
  if (DUMPED_MAIN_ARENA_CHUNK (p))
    return;

  uintptr_t block = (uintptr_t) p - prev_size (p);
  size_t total_size = prev_size (p) + size;
  /* Unfortunately we have to do the compilers job by hand here.  Normally
     we would test BLOCK and TOTAL-SIZE separately for compliance with the
     page size.  But gcc does not recognize the optimization possibility
     (in the moment at least) so we combine the two values into one before
     the bit test.  */
  if (__builtin_expect (((block | total_size) & (GLRO (dl_pagesize) - 1)) != 0, 0))
    malloc_printerr ("munmap_chunk(): invalid pointer");

  atomic_decrement (&mp_.n_mmaps);
  atomic_add (&mp_.mmapped_mem, -total_size);

  /* If munmap failed the process virtual memory address space is in a
     bad shape.  Just leave the block hanging around, the process will
     terminate shortly anyway since not much can be done.  */
  __munmap ((char *) block, total_size);
}
```
<br>

The **munmap_chunk** function obtains the pointer block of the previous chunk, combines the sizes of the two chunks into **total_size**, sets the global structure **mp_**, and releases the two chunks through munmap. The source code of malloc shows that the chunks allocated by mmap are independent. In most cases, **p->prev_size** is 0, meaning only one chunk is released. However, in certain situations, two chunks are released. For details, see the code in **_int_malloc**. 
<br><br>

## 2.2 _int_free
**_int_free** is the core function of glibc free. The first part of the source code is as follows:

```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

  ...

  size = chunksize (p);

  /* Little security check which won't hurt performance: the
     allocator never wrapps around at the end of the address space.
     Therefore we can exclude some size values which might appear
     here by accident or by "design" from some intruder.  */
  if (__builtin_expect ((uintptr_t) p > (uintptr_t) -size, 0)
      || __builtin_expect (misaligned_chunk (p), 0))
    malloc_printerr ("free(): invalid pointer");
  /* We know that each chunk is at least MINSIZE bytes in size or a
     multiple of MALLOC_ALIGNMENT.  */
  if (__glibc_unlikely (size < MINSIZE || !aligned_OK (size)))
    malloc_printerr ("free(): invalid size");

  check_inuse_chunk(av, p);

#if USE_TCACHE

  ...

#endif

  /*
    If eligible, place chunk on a fastbin so it can be found
    and used quickly in malloc.
  */

  if ((unsigned long)(size) <= (unsigned long)(get_max_fast ())

#if TRIM_FASTBINS
      /*
    If TRIM_FASTBINS set, don't place chunks
    bordering top into fastbins
      */
      && (chunk_at_offset(p, size) != av->top)
#endif
      ) {

    if (__builtin_expect (chunksize_nomask (chunk_at_offset (p, size))
              <= 2 * SIZE_SZ, 0)
    || __builtin_expect (chunksize (chunk_at_offset (p, size))
                 >= av->system_mem, 0))
      {
    bool fail = true;
    /* We might not have a lock at this point and concurrent modifications
       of system_mem might result in a false positive.  Redo the test after
       getting the lock.  */
    if (!have_lock)
      {
        __libc_lock_lock (av->mutex);
        fail = (chunksize_nomask (chunk_at_offset (p, size)) <= 2 * SIZE_SZ
            || chunksize (chunk_at_offset (p, size)) >= av->system_mem);
        __libc_lock_unlock (av->mutex);
      }

    if (fail)
      malloc_printerr ("free(): invalid next size (fast)");
      }

    free_perturb (chunk2mem(p), size - 2 * SIZE_SZ);

    atomic_store_relaxed (&av->have_fastchunks, true);
    unsigned int idx = fastbin_index(size);
    fb = &fastbin (av, idx);

    /* Atomically link P to its fastbin: P->FD = *FB; *FB = P;  */
    mchunkptr old = *fb, old2;

    if (SINGLE_THREAD_P)
      {
    /* Check that the top of the bin is not the record we are going to
       add (i.e., double free).  */
    if (__builtin_expect (old == p, 0))
      malloc_printerr ("double free or corruption (fasttop)");
    p->fd = old;
    *fb = p;
      }
    else
      do
    {
      /* Check that the top of the bin is not the record we are going to
         add (i.e., double free).  */
      if (__builtin_expect (old == p, 0))
        malloc_printerr ("double free or corruption (fasttop)");
      p->fd = old2 = old;
    }
      while ((old = catomic_compare_and_exchange_val_rel (fb, p, old2))
         != old2);

    ...

  }

  ...

}         
```
<br>

**_int_free** first checks the validity of the **size** variable, and then **get_max_fast()** is compared to confirm the size is within the range of **fastbin**. **set_fastchunks** is used to set the flag bit of the arena to indicate that **fastbin** has free chunks. The index **idx** of the chunk to be added in **fastbin** is obtained based on the size, while the head pointer **fb** is then obtained based on the index. Then, the chunk is added to **fastbin** by performing the CAS operation. Note that the chunks are stored in **fastbin** in the form of one-way linked list. The content of the tcache macro is as follows. The logic is placing the required memory into the tcache.

```
#if USE_TCACHE
  {
    size_t tc_idx = csize2tidx (size);
    if (tcache != NULL && tc_idx < mp_.tcache_bins)
      {    
    /* Check to see if it's already in the tcache.  */
    tcache_entry *e = (tcache_entry *) chunk2mem (p); 

    /* This test succeeds on double free.  However, we don't 100%
       trust it (it also matches random payload data at a 1 in
       2^<size_t> chance), so verify it's not an unlikely
       coincidence before aborting.  */
    if (__glibc_unlikely (e->key == tcache))
      {    
        tcache_entry *tmp;
        LIBC_PROBE (memory_tcache_double_free, 2, e, tc_idx);
        for (tmp = tcache->entries[tc_idx];
         tmp;
         tmp = tmp->next)
          if (tmp == e)
        malloc_printerr ("free(): double free detected in tcache 2");
        /* If we get here, it was a coincidence.  We've wasted a
           few cycles, but don't abort.  */
      }

    if (tcache->counts[tc_idx] < mp_.tcache_count)
      {
        tcache_put (p, tc_idx);
        return;
      }
      }
  }
#endif
```
<br>

The second part of the source code is as follows. If the chunk to be released does not belong to **fastbin** and is not allocated by mmap, the pointer **nextchunk** and size **nextsize** of the next chunk are obtained. If the previous chunk is idle, the chunk to be released combines with the previous chunk, and the previous chunk is removed from the free linked list through **unlink**. Then, if the next chunk released is also idle and is not a top chunk, the combination continues; otherwise, the chunk is set to idle. Next, the head pointer of **unsortedbin** is extracted, the combined chunk is inserted into the head of the **unsortedbin** linked list, and corresponding settings are set. If the next chunk is a top chunk, the chunk to be released is combined into the top chunk.
```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

  ...

  if ((unsigned long)(size) <= (unsigned long)(get_max_fast ()) {
    ...
  }
  else if (!chunk_is_mmapped(p)) {

    /* If we're single-threaded, don't lock the arena.  */
    if (SINGLE_THREAD_P)
      have_lock = true;

    if (!have_lock)
      __libc_lock_lock (av->mutex);

    nextchunk = chunk_at_offset(p, size);

    /* Lightweight tests: check whether the block is already the
       top block.  */
    if (__glibc_unlikely (p == av->top))
      malloc_printerr ("double free or corruption (top)");
    /* Or whether the next chunk is beyond the boundaries of the arena.  */
    if (__builtin_expect (contiguous (av)
              && (char *) nextchunk
              >= ((char *) av->top + chunksize(av->top)), 0))
    malloc_printerr ("double free or corruption (out)");
    /* Or whether the block is actually not marked used.  */
    if (__glibc_unlikely (!prev_inuse(nextchunk)))
      malloc_printerr ("double free or corruption (!prev)");

    nextsize = chunksize(nextchunk);
    if (__builtin_expect (chunksize_nomask (nextchunk) <= 2 * SIZE_SZ, 0)
    || __builtin_expect (nextsize >= av->system_mem, 0))
      malloc_printerr ("free(): invalid next size (normal)");

    free_perturb (chunk2mem(p), size - 2 * SIZE_SZ);

    /* consolidate backward */
    if (!prev_inuse(p)) {
      prevsize = prev_size (p); 
      size += prevsize;
      p = chunk_at_offset(p, -((long) prevsize));
      if (__glibc_unlikely (chunksize(p) != prevsize))
        malloc_printerr ("corrupted size vs. prev_size while consolidating");
      unlink(av, p, bck, fwd);
    }    

    if (nextchunk != av->top) {
      /* get and clear inuse bit */
      nextinuse = inuse_bit_at_offset(nextchunk, nextsize);

      /* consolidate forward */
      if (!nextinuse) {
    unlink(av, nextchunk, bck, fwd);
    size += nextsize;
      } else 
    clear_inuse_bit_at_offset(nextchunk, 0);

      /*   
    Place the chunk in unsorted chunk list. Chunks are
    not placed into regular bins until after they have
    been given one chance to be used in malloc.
      */

      bck = unsorted_chunks(av);
      fwd = bck->fd;
      if (__glibc_unlikely (fwd->bk != bck))
    malloc_printerr ("free(): corrupted unsorted chunks");
      p->fd = fwd; 
      p->bk = bck; 
      if (!in_smallbin_range(size))
    {    
      p->fd_nextsize = NULL;
      p->bk_nextsize = NULL;
    }    
      bck->fd = p;
      fwd->bk = p;

      set_head(p, size | PREV_INUSE);
      set_foot(p, size);

      check_free_chunk(av, p);
    }

    /*
      If the chunk borders the current high end of memory,
      consolidate into top
    */

    else {
      size += nextsize;
      set_head(p, size | PREV_INUSE);
      av->top = p;
      check_chunk(av, p);
    }
  
    ...

    }
    ...
}
```
<br>

The third part of the source code is as follows. If the released chunk is large, processing is required. The chunks in **fastbin** are combined and added to **unsortedbin**. For the main arena, its top chunk is shrunk through **systrim**. For the thread arena, the **heap_info** pointer of the non-main area corresponding to the top chunk is obtained and the heap is shrunk through **heap_trim**. If the chunk is allocated through mmap, **munmap_chunk** is called to release the chunk.
```
static void
_int_free (mstate av, mchunkptr p, int have_lock)
{

    ...

    if ((unsigned long) (size) <= (unsigned long) (get_max_fast ())) {
        ...
    }
    else if (!chunk_is_mmapped(p)) {

        ...

    /*   
      If freeing a large space, consolidate possibly-surrounding
      chunks. Then, if the total unused topmost memory exceeds trim
      threshold, ask malloc_trim to reduce top.

      Unless max_fast is 0, we don't know if there are fastbins
      bordering top, so we cannot tell for sure whether threshold
      has been reached unless fastbins are consolidated.  But we
      don't want to consolidate on each free.  As a compromise,
      consolidation is performed if FASTBIN_CONSOLIDATION_THRESHOLD
      is reached.
    */

    if ((unsigned long)(size) >= FASTBIN_CONSOLIDATION_THRESHOLD) {
      if (atomic_load_relaxed (&av->have_fastchunks))
    malloc_consolidate(av);

      if (av == &main_arena) {
#ifndef MORECORE_CANNOT_TRIM
    if ((unsigned long)(chunksize(av->top)) >=
        (unsigned long)(mp_.trim_threshold))
      systrim(mp_.top_pad, av); 
#endif
      } else {
    /* Always try heap_trim(), even if the top chunk is not
       large, because the corresponding heap might go away.  */
    heap_info *heap = heap_for_ptr(top(av));

    assert(heap->ar_ptr == av);
    heap_trim(heap, mp_.top_pad);
      }
    }

    if (!have_lock)
      __libc_lock_unlock (av->mutex);
  }
  /*
    If the chunk was allocated via mmap, release via munmap().
  */

  else {
    munmap_chunk (p);
  }
}
```
<br>

## 2.3 systrim
The systrim function is used to reduce the size of the top chunk in the main arena. The source code is as follows:
```
/*
   systrim is an inverse of sorts to sysmalloc.  It gives memory back
   to the system (via negative arguments to sbrk) if there is unused
   memory at the `high' end of the malloc pool. It is called
   automatically by free() when top space exceeds the trim
   threshold. It is also called by the public malloc_trim routine.  It
   returns 1 if it actually released any memory, else 0.
 */

static int
systrim (size_t pad, mstate av)
{

  ...

  pagesize = GLRO (dl_pagesize);
  top_size = chunksize (av->top);

  top_area = top_size - MINSIZE - 1;
  if (top_area <= pad)
    return 0;

  /* Release in pagesize units and round down to the nearest page.  */
  extra = ALIGN_DOWN(top_area - pad, pagesize);

  if (extra == 0)
    return 0;

  /*
     Only proceed if end of memory is where we last set it.
     This avoids problems if there were foreign sbrk calls.
   */
  current_brk = (char *) (MORECORE (0));
  if (current_brk == (char *) (av->top) + top_size)
    {
      /*
         Attempt to release memory. We ignore MORECORE return value,
         and instead call again to find out where new end of memory is.
         This avoids problems if first call releases less than we asked,
         of if failure somehow altered brk value. (We could still
         encounter problems if it altered brk in some very bad way,
         but the only thing we can do is adjust anyway, which will cause
         some downstream failure.)
       */

      MORECORE (-extra);
      /* Call the `morecore' hook if necessary.  */
      void (*hook) (void) = atomic_forced_read (__after_morecore_hook);
      if (__builtin_expect (hook != NULL, 0))
        (*hook)();
      new_brk = (char *) (MORECORE (0));

      LIBC_PROBE (memory_sbrk_less, 2, new_brk, extra);

      if (new_brk != (char *) MORECORE_FAILURE)
        {
          released = (long) (current_brk - new_brk);

          if (released != 0)
            {
              /* Success. Adjust top. */
              av->system_mem -= released;
              set_head (av->top, (top_size - released) | PREV_INUSE);
              check_malloc_state (av);
              return 1;
            }
        }
    }
  return 0;
}
```
<br>

If the top chunk in the main arena has no space, nothing returns; otherwise, the size that can be reduced is saved in **extra**. If the **brk** pointer of the current heap equals the end address of the top chunk, **MORECORE** is used to reduce the heap size. **MORECORE** is the system call of **brk**, and the virtual memory is released through **do_munmap**. The **__after_morecore_hook** function pointer is empty. Then, the released heap pointer is stored in **new_brk**, the size of the released virtual memory released is calculated, the information is updated to the main arena, and the size of the new top chunk is set. 
<br>

## 2.4 heap_trim
**heap_trim** is used to reduce the heap size of the thread arena. The source code is as follows:

```
static int
heap_trim (heap_info *heap, size_t pad)
{
  
  ...

  /* Can this heap go away completely? *
  while (top_chunk == chunk_at_offset (heap, sizeof (*heap)))
    {   
      prev_heap = heap->prev;
      prev_size = prev_heap->size - (MINSIZE - 2 * SIZE_SZ);
      p = chunk_at_offset (prev_heap, prev_size);
      /* fencepost must be properly aligned.  */
      misalign = ((long) p) & MALLOC_ALIGN_MASK;
      p = chunk_at_offset (prev_heap, prev_size - misalign);
      assert (chunksize_nomask (p) == (0 | PREV_INUSE)); /* must be fencepost */
      p = prev_chunk (p);
      new_size = chunksize (p) + (MINSIZE - 2 * SIZE_SZ) + misalign;
      assert (new_size > 0 && new_size < (long) (2 * MINSIZE));
      if (!prev_inuse (p))
        new_size += prev_size (p);
      assert (new_size > 0 && new_size < HEAP_MAX_SIZE);
      if (new_size + (HEAP_MAX_SIZE - prev_heap->size) < pad + MINSIZE + pagesz)
        break;
      ar_ptr->system_mem -= heap->size;
      LIBC_PROBE (memory_heap_free, 2, heap, heap->size);
      delete_heap (heap);
      heap = prev_heap;
      if (!prev_inuse (p)) /* consolidate backward */
        {
          p = prev_chunk (p);
          unlink (ar_ptr, p, bck, fwd);
        }
      assert (((unsigned long) ((char *) p + new_size) & (pagesz - 1)) == 0);
      assert (((char *) p + new_size) == ((char *) heap + heap->size));
      top (ar_ptr) = top_chunk = p;
      set_head (top_chunk, new_size | PREV_INUSE);
      /*check_chunk(ar_ptr, top_chunk);*/
    }

  /* Uses similar logic for per-thread arenas as the main arena with systrim
     and _int_free by preserving the top pad and rounding down to the nearest
     page.  */
  top_size = chunksize (top_chunk);
  if ((unsigned long)(top_size) <
      (unsigned long)(mp_.trim_threshold))
    return 0;

  top_area = top_size - MINSIZE - 1;
  if (top_area < 0 || (size_t) top_area <= pad)
    return 0;

  /* Release in pagesize units and round down to the nearest page.  */
  extra = ALIGN_DOWN(top_area - pad, pagesz);
  if (extra == 0)
    return 0;

  /* Try to shrink. */
  if (shrink_heap (heap, extra) != 0)
    return 0;

  ar_ptr->system_mem -= extra;

  /* Success. Adjust top accordingly. */
  set_head (top_chunk, (top_size - extra) | PREV_INUSE);
  /*check_chunk(ar_ptr, top_chunk);*/
  return 1;
}
```
<br>

The first **while** indicates that if the top chunk pointer is on **heap_info**, the entire heap will be deleted. This is because the heap has one top chunk. Before the heap is deleted, the space of the previous heap is calculated. 
The calculation shows that **newsize** stores the **fencepost** at the high address of the previous heap and the total size of the previous idle chunk. If the sum of **newsize** and the unused memory (**HEAP_MAX_SIZE - prev_heap->size**) of the heap is too small, **break** is executed to exit the loop and cancel the release of the heap; otherwise, after the information is updated, **delete_heap** is called to delete the heap through **__munmap**. **delete_heap** is a macro defined as follows. The size of the heap is **HEAP_MAX_SIZE** with a default value of 64 MB. The following uses a 64-bit platform as an example.

```
#define delete_heap(heap) \
  do {                                        \
      if ((char *) (heap) + HEAP_MAX_SIZE == aligned_heap_area)           \
        aligned_heap_area = NULL;                         \
      __munmap ((char *) (heap), HEAP_MAX_SIZE);                  \
    } while (0)
```
<br>

After the heap is deleted, if there is an idle chunk before **fencepost** of the previous heap, the idle chunk is removed from the idle linked list, and then **fencepost** or the address of the idle chunk (if any) is set to the address of the new top chunk whose size is **new_size**. Then, **while** is returned to continue the check. If the new top chunk pointer is on **heap_info**, the heap has only one chunk, that is, the top chunk. In this case, the heap is released. If the remaining space (**top_area**) of the new top chunk is too small, nothing returns. If the remaining space is large and the value of **top_area** is greater than the shrinking threshold, **shrink_heap** is called to reduce the size of the new top chunk by **extra**. The size of the reduced top chunk is then set to **top_size - extra**. In this example, the size variable of **heap_info** is reduced.

```
/* Shrink a heap.  */

static int
shrink_heap (heap_info *h, long diff)
{
  long new_size;

  new_size = (long) h->size - diff;
  if (new_size < (long) sizeof (*h))
    return -1;

  /* Try to re-map the extra heap space freshly to save memory, and make it
     inaccessible.  See malloc-sysdep.h to know when this is true.  */
  if (__glibc_unlikely (check_may_shrink_heap ()))
    {
      if ((char *) MMAP ((char *) h + new_size, diff, PROT_NONE,
                         MAP_FIXED) == (char *) MAP_FAILED)
        return -2;

      h->mprotect_size = new_size;
    }
  else
    __madvise ((char *) h + new_size, diff, MADV_DONTNEED);
  /*fprintf(stderr, "shrink %p %08lx\n", h, new_size);*/

  h->size = new_size;
  LIBC_PROBE (memory_heap_less, 2, h, h->size);
  return 0;
}
```
<br>

There is a problem with the **heap_trim** function in the example. According to the preceding process, if an arena has multiple heaps and the latest heap (that is, the heap where the top chunk is located) has occupied chunks, the break statement is executed. However, if all heaps are idle, memory holes are created (see the following figure).
```
|---------------------|       |---------------------|
|       top chunk     |       |                     |
|---------------------|       |                     |
|   allocated chunk   |       |                     |
|---------------------|       |                     |
|         ...         |       |      free chunk     |
|---------------------|       |                     |
|     free chunk      |       |                     |
|---------------------|       |                     |
|   allocated chunk   |       |                     |
|---------------------|       |---------------------|
|                     |       |                     |
|      heap info      |  ---> |      heap info      |
|                     |       |                     |
|---------------------|       |---------------------|
```
<br>This problem can be explained as follows:

If the intermediate heap is released and large-granularity memory is required, the system needs to apply for memory from the kernel. This will cause a high performance overhead. If the chunk is retained, it will be managed by various bins (specifically, unsorted bins). When memory is applied for, a chunk can be divided from the chunk. In other words, the memory hole is a compromise between performance and space occupation. 

<br><br>

# References
Ptmalloc2 source code analysis (Huating i.e. Zhuang Mingqiang)

In-depth analysis of Linux heap memory management: https://murphypei.github.io/blog/2019/01/linux-heap

glibc tcache mechanism: https://firmianay.gitbooks.io/ctf-all-in-one/content/doc/4.14_glibc_tcache.html

malloc source code analysis: https://introspelliam.github.io/2018/05/21/malloc%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E2%80%94%E2%80%941/

