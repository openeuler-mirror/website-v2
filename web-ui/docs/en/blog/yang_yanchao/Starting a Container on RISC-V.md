---
title: How to Build a RISC-V-based openEuler System, Deploy runc, and Run Containers
date: 2021-03-11
tags: 
    - RISC-V
    - Container
    - runc
archives: 2021-03
author: yang_yanchao
summary: This article describes how to build an openEuler system based on RISC-V, deploy runc, and run containers.
---

# How to Build a RISC-V-based openEuler System, Deploy runc, and Run Containers

RISC-V is an open source instruction set architecture (ISA) based on reduced instruction set computing (RISC). openEuler has made some explorations on RISC-V:

[^]: The following information is selected from https://gitee.com/openeuler/RISC-V.

- In June 2020, openEuler released the first version of the root file system (rootfs) and kernel image that supports RISC-V.
- In August 2020, the openEuler RISC-V software package is built using the Open Build Service (OBS).
- In September 2020, Huawei released openEuler RISC-V at HUAWEI CONNECT 2020, the first RISC-V Linux system in China.
- In October 2020, the Chinese Academy of Sciences successfully ported openEuler RISC-V to Nutshell.
- In November 2020, the second version of rootfs and kernel image is released in the openEuler image repository. You can start the image in QEMU and experience the ported openEuler RISC-V.

The container technology has become a new trend, and technology companies are actively embracing containers. How to use QEMU to start the ported openEuler RISC-V and run containers in it? This article may give you an answer.

### Environment Requirements

- Operating environment: Linux
- Required file: openEuler RISC-V system image. For details, see "Obtaining the Ported openEuler RISC-V System Image" below.
- Software environment: 4.0.0 ≤ QEMU ≤ 5.0.1. For details, see "Obtaining the Ported openEuler RISC-V System Image."

#### Obtaining the Ported openEuler RISC-V System Image

You can obtain the latest openEuler RISC-V image and the REPO source of the ported openEuler RISC-V from the openEuler official website.
```https
https://repo.openeuler.org/openEuler-preview/RISC-V/Image/
```
The following two files are required for starting the ported openEuler RISC-V:
- **fw_payload_oe_docker.elf**: image (for QEMU-based startup) built using the kernel-5.5 image as the payload through the Open Source Supervisor Binary Interface (OpenSBI). In addition, it includes Docker-related startup configurations.
- **openEuler-preview.riscv64.qcow2**: rootfs image of the ported openEuler RISC-V

#### Starting openEuler RISC-V Using QEMU
Ensure that the qemu-system-riscv64 binary program exists in your host Linux environment. If the REPO source of your Linux environment does not provide this binary program, manually build it from the QEMU source code. For details, see the QEMU official guide.

[Build QEMU for Platforms/RISCV](https://wiki.qemu.org/Documentation/Platforms/RISCV)

The following is an example:

```
git clone https://gitee.com/openeuler/qemu.git
cd qemu
./configure --target-list=riscv64-softmmu && make
cp riscv64-softmmu/qemu-system-riscv64 /bin
```
Run the following commands to start QEMU. In this example, the network function is implemented through host port forwarding.
```
$ qemu-system-riscv64 \
  -nographic -machine virt \
  -smp 8 -m 2G \
  -kernel fw_payload_oe_docker.elf \
  -drive file=openEuler-preview.riscv64.qcow2,format=qcow2,id=hd0 \
  -object rng-random,filename=/dev/urandom,id=rng0 \
  -device virtio-rng-device,rng=rng0 \
  -device virtio-blk-device,drive=hd0 \
  -device virtio-net-device,netdev=usernet \
  -netdev user,id=usernet,hostfwd=tcp::12055-:22 \
  -append 'root=/dev/vda1 rw console=ttyS0 systemd.default_timeout_start_sec=600 selinux=0 highres=off mem=4096M earlycon'
```
After the system is started, you can log in to the guest OS using an SSH tool and access the Internet in the emulator. The default user name and password for the login are **root** and **openEuler12#$**, respectively.
```shell
 ssh -p 12055 root@localhost
```


### Deploying runc and Running Containers

Note: The following operations are performed on the guest OS, which is openEuler RISC-V, running on an emulator.

#### Installing the runc Software Package

The openEuler RISC-V REPO source contains the runc software package. Run the following commands to configure the REPO source and install runc:

```shell
# yum-config-manager --add-repo https://repo.openeuler.org/openEuler-preview/RISC-V/everything/
# yum install docker-runc
```

#### Preparing a Container Image

1. Prepare a working directory.

   Before the deployment, prepare a working directory, for example, **mycontainer**. All subsequent operations in this article are performed in this directory.

   ```shell
   mkdir mycontainer
   cd mycontainer
   ```

2. Prepare a container startup image.

   Use a self-made rootfs as the container startup image. If GCC (or other software based on your site requirements) is required in the self-made file system, run the following commands:

   ```shell
   mkdir rootfs
   yum install gcc --installroot=`pwd`/rootfs
   ```

#### Using runc to Run the Container

After rootfs is prepared, you need to generate a `config.json` file based on the Open Container Initiative (OCI). This file describes how to run a container, including the commands, permissions, and environment variables. runc provides the `spec` command to generate the configuration file:

```bash
[root@openEuler-RISCV-rare mycontainer]# runc spec
[root@openEuler-RISCV-rare mycontainer]# ls
config.json  rootfs
```

In this way, an [OCI runtime bundle](https://github.com/opencontainers/runtime-spec/blob/master/bundle.md) is created. The bundle is simple and consists of the **config.json** file and rootfs. The `config.json` file contains a large amount of information and no modification is required. Use the file generated by default. With the configuration file and rootfs, you can use runc to run a container. The first method is to run `runc run` (root permissions required). It creates and starts a container.

```bash
[root@openEuler-RISCV-rare mycontainer]# runc run openEuler_container
sh-5.0# ls
bin  boot  dev	etc  home  lib	lib64  media  mnt  opt	proc  root  run  sbin  srv  sys  tmp  usr  var
sh-5.0# whoami
root
sh-5.0# pwd
/
sh-5.0# echo hello container
hello container
```

The last parameter is the container name, which must be unique on the host. After the container is started, the `sh` shell of the container is displayed. Since no network settings are configured for the container, it only has a default `lo` interface and cannot communicate with the external network. Other functions are normal.

In this case, you can open another terminal to view the information about the running container.

```bash
[root@openEuler-RISCV-rare ~]# runc list
ID                    PID         STATUS      BUNDLE              CREATED                        OWNER
openEuler_container   17318       running     /home/mycontainer   2019-09-03T15:27:25.5978852Z   root

```

Another method is to use the **specs** lifecycle operations to create and manage containers. Directly using this method will start containers in the background. Therefore, before that, modify the `config.json` file: Change the value of `terminal` to `false` and the value of `args` to `sleep 20`. The value of `args ` is only an example. You can modify it based on the site requirements.

```json
"process": {
		"terminal": false,
		"consoleSize": {
			"height": 0,
			"width": 0
		},
		"user": {
			"uid": 0,
			"gid": 0
		},
		"args": [
			"sleep", "20"
		],
		···
}
```

After that, you can use runc to change the status of containers.

1. Run `create` to create a container. In this case, the container is not running, but all running environments are prepared. Run `list` to view the container status. The container status is `created`.

   Assume that the container name is **openEuler**. Run the following commands:

```bash
[root@openEuler-RISCV-rare mycontainer]# runc create openEuler
[root@openEuler-RISCV-rare mycontainer]# runc list
ID          PID         STATUS      BUNDLE              CREATED                        OWNER
openEuler   17402       created     /home/mycontainer   2019-09-03T15:37:46.6289281Z   root
```

2. Start the container. The startup command `sleep 20` is executed. Run `list` to check the container status. The container is in `running` state.

```shell
[root@openEuler-RISCV-rare mycontainer]# runc start openEuler
[root@openEuler-RISCV-rare mycontainer]# runc list
ID          PID         STATUS      BUNDLE              CREATED                        OWNER
openEuler   17402       running     /home/mycontainer   2019-09-03T15:37:46.6289281Z   root
```
3. After the container runs for 20 seconds, the container is stopped and is in `stop` state.

```shell
[root@openEuler-RISCV-rare mycontainer]# runc list
ID          PID         STATUS      BUNDLE              CREATED                        OWNER
openEuler   0           stopped     /home/mycontainer   2019-09-03T15:37:46.6289281Z   root
```

4. After the container is deleted, the container information does not exist.

```shell
[root@openEuler-RISCV-rare mycontainer]# runc delete openEuler
[root@openEuler-RISCV-rare mycontainer]# runc list
ID          PID         STATUS      BUNDLE      CREATED     OWNER
```

For more information about how to use runc, run the `runc -h` command. openEuler RISC-V Docker will also be enabled in the future.
For more information about openEuler RISC-V, visit:

```https
https://gitee.com/openeuler/RISC-V
```
