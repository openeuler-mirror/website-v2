# DAOS ARM64调测之旅

## 背景概述

 从IO500榜单上了解到，前10名有一半是DAOS，这是什么样一款存储软件，能如此优秀？从HDD到SSD，仅仅是性能提升、延迟降低，从SSD到SCM，不仅仅是性能提升，还支持按字节事务性访问，异常后回滚。SCM不带DMA，访问过程消耗大量的CPU资源，从软件架构上优化，就是想办法减少拷贝过程，诞生了RDMA零拷贝；从硬件上优化，intel推出了DSA加速器。DAOS+SCM新架构值得在ARM64上尝试。

## 编译问题

 DAOS官网上明确说仅支持x86+Optane内存+NVMe SSD商用化，同时提供了用内存模拟Optane内存的实验特性。ARM64跑DAOS就有了可能。我们首先进行了版本编译，碰到了静态检查结构体大小报错。通过分析发现根因是pthread_mutex在不同平台上，长度是不一样的，x86 64是40字节，ARM64是48字节，多了8字节，触发了结构体大小断言报错。提问题单，社区帮忙调整数据结构解决了断言错误。接下来就是依赖的SPDK组件编译报错，DAOS设置spdk_arch是x86，修改为读编译主机arch，是ARM64就使用native方式编译，解决了SPDK编译报错问题。再下来是缺少libipmctl.so，ipmctl是intel Optane的管理工具，只有x86版本，ARM64需要去掉libipmctl依赖，增加ipmctl空接口后，解决了依赖报错问题。telemetry的go代码限制只有amd64编译，修改为amd64、arm64都编译。最后一个问题是Dup2在ARM64上不支持，使用Dup3来支持Dup2。

## IO500调测

 版本编译出来后，在ARM64上部署测试，一跑就挂死，调用栈是问号，打开所有调试信息，每次挂死前都是在mercury网络模块，无法进一步定位。直觉判定可能是内核页大小问题导致的，x86只支持4K页，ARM64支持4K、16K、64K页，改成4K页后，就能正常跑起来不挂死了。又出现了新问题，找不到网络接口，异常退出了。看日志，不支持bond、vlan等虚拟网络设备，改成使用物理网卡后，网络正常识别，集群正常起来。不一会就出现网络超时故障，查看日志有的是4秒超时，有的是请求发出去立即就超时了，看起来是集群间时间没有同步，对端收到后时间差超过超时门限，触发超时流程，时间同步后，几秒超时问题消失。跑一段时间后还是出现超时，且系统明显卡顿，查看CPU并不忙，查看内存free情况，发现内存很少，perf抓火焰图，发现内存申请走了慢路径申请，减少模拟Optane的内存大小后，网络超时问题消失。IO500测试60~70秒左右，就出现集群空间满，测试终止。查看SCM空间已用完，NVMe空间剩余还很大。上社区论坛查到，元数据只保留在SCM上，SCM空间不足也不会转存到NVMe中，直接上报空间不足错误。只能加大物理内存，从256GB加到512GB后，保留了更多的内存，IO500能测试到200秒左右还是耗光了SCM，IO500需要测试300秒，成绩才是有效的，因此需要想办法减少SCM空间使用。从DAOS架构图上看到SCM内存用来存放元数据、非对齐的数据、小块数据，查看代码，小块数据默认是4K以下就存SCM。修改容器属性，io门限值降低到2K，这样IO500终于能测试完。增加target个数，增加并发度，又出现了SCM耗尽，仔细读DAOS文档，提到每个target会预留SCM、NVMe内存做聚合使用，查看代码找到了SCM会保留2GB、NVMe保留10GB，没有设置接口，直接修改代码SCM保留512MB，每个target节省了1.5GB，一个rank 16个target共节省了24GB内存，每个rank总共分配了90GB，节省了26%的内存。IO500跑完再没出现过SCM耗尽，性能也得到了大幅提升。逐步增加客户端个数，发现mdtest部分测试项随着并发度增加能一直增加，说明客户端有瓶颈，10台客户端里有4台性能较差，更换性能更好的客户端后，性能进一步提升。开启端到端校验后测试，发现sha512新建容器大概率失败，X86每次都是成功的。执行isal_crypto下的sha512测试用例，都是通过的。看github问题列表，发现2021年就有人上报了在ARM64上sha512值错误并提供了测试程序。分析sha512代码，发现缺少了多次更新不足一块数据的追加处理，修复后，测试程序通过，DAOS端到端sha512校验也通过了。

## 功能验证

 由于IO500只跑性能，没有校验数据是否正确，我们通过复制大量不同大小的文件到DAOS文件系统，重启DAOS集群后，再复制回来，检查前后的md5值是否一致，来校验数据是否正确。前后md5值是一致的，确认数据一致性没有问题。压力测试大概率出现复制回来过程中，服务端coredump，看log是池版本号为NULL触发断言，待分析。扩展测试了2/3副本、EC 2+1 2+2 4+2，数据校验均正确。

 在社区上看到DAOS计划用容器来支持块设备，目前容器不支持预先指定容量。DAOS提供dfs插件支持fio测试，实际还是文件系统，并不是块设备。fio测试了单IO时延，写4K随机写110us、读160us、混合读写150us，接近100us。单台服务器4K多并发随机写测试420K IOPS。fusionstorage、阿里云已经能做到50us，100万IOPS，看来还有优化空间。

 ARM64运行DAOS还有哪些问题？我们执行了daos_test、run_test.sh，跟x86对比测试，发现ARM64上出现vos小io测试错误、epoch错误、对象检查错误，分析测试代码，发现是测试代码本身的问题，x86能通过是因为局部变量初始值是0，ARM64初始值是随机的，修改测试代码后，这三个用例能通过。还发现EC一个用例失败，正在分析中，其他测试都跟x86一致。

## 总结展望

 DAOS ARM64调测过程总体来说，比较顺利，主要是断言比较多，能快速定位问题。大量使用spdk、isal、isal_ctypto,pmdk模块，ARM64已经很好的适配过这些模块，因此很少补丁改动，即可在arm64上编译通过，运行稳定。dashboard使用promethues+grafana，性能测试过程可视化，方便诊断性能。每个target单线程，没有多线程并发冲突问题，也就没有ARM64弱序问题。问题分析过程中，大量参考了DAOS社区问题单，分析步骤详细，提供了分析思路。

 后续重点在社区添加ARM64 CI，覆盖多种OS编译、单元测试，定期取主线版本进行性能测试。使用内存备电验证pmdk刷cache、数据校验正确性验证。社区版本支持UCX、NVMe of RDMA模块后，进行ARM64UCX、NoF功能测试。

## ARM64补丁列表

[DAOS-10569 client: fix build on aarch64](https://github.com/daos-stack/daos/pull/8998)

[DAOS-10148 tse: fix TSE task buffer to account for aarch64](https://github.com/daos-stack/daos/pull/8984)

[DAOS-10871 build: Fix aarch64 build SPDK error](https://github.com/daos-stack/daos/pull/9398)

[DAOS-10872 control: Fix aarch64 build control errors ](https://github.com/daos-stack/daos/pull/9401)

[DAOS-10922 control: Implement ipmctl for aarch64](https://github.com/daos-stack/daos/pull/9505)

[DAOS-10899 test: use expected variable to do assert checking](https://github.com/daos-stack/daos/pull/9487 )

[DAOS-10898 obj: fix the assert in small_io test](https://github.com/daos-stack/daos/pull/9486)

[DAOS-10891 tests: fix incorrect assert in check_oclass](https://github.com/daos-stack/daos/pull/9456 )

