---
title: 'TBOX Installation and Operation on openEuler'
category: blog
date: 2022-08-10
tags:
    - openEuler
    - TBOX
archives: 2020-08
author:
    - zihao
summary: TBOX installation and operation on openEuler.
---

# TBOX Installation and Operation on openEuler

This blog describes how to install TBOX on openEuler and test and use its modules.

## TBOX Introduction

TBOX is a cross-platform C library. By encapsulating unified interfaces for different platforms, it simplifies common development operations. TBOX allows you to focus on actual applications during development instead of interface compatibility issues, and optimizes performance based on specific features of each platform.

## 1. Installing TBOX

The entire TBOX project is maintained by Xmake, a cross-platform build utility. To compile the TBOX source code, you need to install [Xmake](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fxmake-io%2Fxmake) first.

1.1 Installing Xmake

```
# Install with the script directly.
bash <(curl -fsSL https://raw.githubusercontent.com/xmake-io/xmake/master/scripts/get.sh)Copy to clipboardErrorCopied
 
# Or install with wget.
bash <(wget https://raw.githubusercontent.com/xmake-io/xmake/master/scripts/get.sh -O -)
Copy to clipboardErrorCopied
 
# Run the xmake update command to ensure that the latest version is used.
xmake update
```

1.2 Downloading the source code and compiling it

```
git clone https://gitee.com/tboox/tbox.git
cd tbox
xmake
```

To directly create an empty project model with TBOX, you can run the `xmake create -t console_box dir_name` command to quickly integrate, compile, and use TBOX.

During the installation on openEuler, compilation problems may occur in TBOX.

```
[ydyk@localhost ~]$ cd tbox/
[ydyk@localhost tbox]$ xmake
checking for platform ... linux
checking for architecture ... x86_64
……
checking for libc_strlcpy ... no
checking for libc_wcscasestr ... no
checking for libm_sincos ... ok
checking for posix_pthread_setaffinity_np ... ok
checking for libc_setjmp ... ok
checking for posix_open ... ok
checking for libm_fmod ... ok
checking for libc_strchr ... ok
checking for libc_fwrite ... ok
checking for libc_wcscat ... ok
checking for libc_memcmp ... ok
checking for wchar ... no
……
checking for libc_wcslcpy ... no
……
generating src/tbox/tbox.config.h.in ... ok
[  0%]: ccache compiling.release src/tbox/tbox.c
[  0%]: ccache compiling.release src/tbox/hash/adler32.c
……
[  0%]: ccache compiling.release src/tbox/math/impl/math.c
error: src/tbox/hash/../prefix/type.h:100:9: error: unknown type name ‘__WCHAR_TYPE__’
  100 | typedef __WCHAR_TYPE__              tb_wchar_t;
      |         ^~~~~~~~~~~~~~
src/tbox/hash/../prefix/type.h:157:9: error: unknown type name ‘__tb_volatile__’
  157 | typedef __tb_volatile__  __tb_aligned__(4) tb_int32_t   tb_atomic32_t;
      |         ^~~~~~~~~~~~~~~
src/tbox/hash/../prefix/type.h:157:41: error: expected declaration specifiers or ‘...’ before numeric constant
  157 | typedef __tb_volatile__  __tb_aligned__(4) tb_int32_t   tb_atomic32_t;
      |                                         ^
src/tbox/hash/../prefix/type.h:164:9: error: unknown type name ‘__tb_volatile__’
  164 | typedef __tb_volatile__ __tb_aligned__(8) tb_int64_t    tb_atomic64_t;
      |         ^~~~~~~~~~~~~~~
src/tbox/hash/../prefix/type.h:164:40: error: expected declaration specifiers or ‘...’ before numeric constant
  164 | typedef __tb_volatile__ __tb_aligned__(8) tb_int64_t    tb_atomic64_t;
      |                                        ^
src/tbox/hash/../prefix/type.h:169:9: error: unknown type name ‘tb_atomic64_t’
  169 | typedef tb_atomic64_t                                   tb_atomic_t;
  > in src/tbox/hash/adler32.c
```

If the problem occurs, download TBOX again for compilation, or run the `xmake f -c` command and recompile TBOX.

1.3  Running and test

```
[ydyk@localhost tbox]$ xmake run demo math_random
[demo]: time: 16, average: 800, range: 600 - 1000
[demo]: time: 15, average: 149, range: 100 - 200
[demo]: time: 15, average: 201, range: -600 - 1000
[demo]: time: 16, average: -200, range: -600 - 200
[demo]: time: 16, average: -400, range: -600 - -200
[demo]: time: 15, average: 0.499821, range: 0.000000 - 1.000000
[demo]: time: 17, average: 100.094902, range: 0.000000 - 200.000000
[demo]: time: 15, average: 100.011360, range: -200.000000 - 0.000000
[demo]: time: 16, average: 199.802993, range: -200.000000 - 200.000000
```

## 2. Basic Knowledge

This section describes the special modules of TBOX.

**Stream collection library**: provides a unified interface for reading and writing stream data such as HTTP, file, socket, and data, supporting blocking and non-blocking read and write modes. Multi-layer filters can be added to filter and convert data between streams. In this way, during data reads, you can also perform operations internally including decompression, coding conversion, and encryption, greatly reducing memory usage. In the current version, the coroutine mode can be used to implement asynchronous I/O development.

TBOX provides the following modules:

- `stream`: common non-blocking stream, which is used to process single-channel blocking and non-blocking I/Os. It supports general data flow protocols and has built-in cache. It is powerful but heavyweight.
- `static_stream`: static stream optimized for the static data buffer. It is used only to maintain the static data buffer, read, write, and parse operations. It is lightweight and efficient.

Multiple filters can be mounted to the modules to filter and transform data between streams. The following filters are supported:

1. **zip_filter:** compression and decompression filter for gzip and zlib.

2. **charset_filter**: filter for character set encoding.

3. **chunked_filter**: decoding filter for HTTP chunked encoding.

There are also **stream-based transfers**:

1. **transfer**: a transfer based on two streams, which can be used for simple HTTP download, upload, and replication between files.

## 3. Getting Started

This section briefly describes how to use the stream module.

### 3.1 Stream initialization

```
// Initialize the HTTP stream.
tb_stream_ref_t stream = tb_stream_init_from_url("https://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/ISO/x86_64/openEuler-20.03-LTS-SP3-everything-debug-x86_64-dvd.iso");
// Alternatively, access through the port.
tb_stream_ref_t stream = tb_stream_init_from_http("www.xxxx.com", 80, "/file?args=xxx",tb_false );
```

### 3.2 Input end – Read in non-blocking mode

```
if(stream){
    // Block open stream.
    if(tb_stream_open(stream)){
        tb_byte_t_data[TB_STREAM_BLOCK_MAXN];
        
 // Use the beof command to determine whether the stream reading is complete.
        while(tb_stream_beof(stream)){
            // Read the stream data in non-blocking mode. The real bit indicates the actual read size. If the read fails, -1 is returned.
            tb_long_t real = tb_stream_read(stream, data, TB_STREAM_BLOCK_MAXN);     
 
            
            if(!real){
                            // The stream data cannot be read currently. Read the stream data after the specified interval.
                real = tb_stream_wait(stream, TB_STREAM_WAITREAD, tb_stream_timeout(stream));
               
                // If reading still fails, -1 is returned. If waiting times out, 0 is returned, and the reading is ended.
                tb_check_break(real > 0);
            }
            else if (real < 0) break;
        }
        tb_stream_clos(stream);
    }
    tb_stream_exit(stream);
}
```

### 3.3 Input end – Write in non-blocking mode

```
tb_long_t real real = tb_stream_writ(stream, data, size);
```

### 3.4 Read and parsing

```
// Read a big-endian 16-bit value from the data stream.
tb_uint16_t value;
if (tb_stream_bread_u16_be(stream, &value))
{
    tb_trace_i("%x", value);
}
```

In addition, big-endian read, little-endian read, local read, floating-point read, and double-precision read are supported.

If the data amount is too large, the built-in automatic cache read and write of Stream can fully optimize the I/O read and write performance and cut frequent operations when many values are parsed.

The blog only introduces usage. You may customize streams as required based on reality.

## 4. References

- [GitHub - tboox/tbox: 🎁 A glib-like multi-platform c library](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Ftboox%2Ftbox)
- [Stream Library - TBOX 1.5.x Tutorial - BookStack](https://gitee.com/link?target=https%3A%2F%2Fwww.bookstack.cn%2Fread%2Ftboox-1.5.x%2F%E6%B5%81%E5%BA%93.md)
- [Usage of the TBOX Data Bit Operation Interface](https://tboox.org/cn/2016/08/12/bits-operation/)