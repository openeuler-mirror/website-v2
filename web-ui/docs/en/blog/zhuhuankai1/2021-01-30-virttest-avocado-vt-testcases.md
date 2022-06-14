---
title: How to Compile Avocado-VT Test Cases
date: 2021-01-30
tags: 
    - virttest
    - avocado-vt
archives: 2021-01
author: zhuhuankai
summary: This article uses vmtop test cases as an example to describe how to compile and execute Avocado-VT test cases.
---

# Overview

This article uses vmtop test cases as an example to describe how to use the Avocado-VT framework to compile test cases and perform tests. If you haven't completed environment deployment, see "How to Install and Deploy the Avocado-VT Virtualization Test Framework."

# Test Case Execution Process

- Obtain parameters.

  Default parameters configured in the framework and customized parameters.

- Prepare the environment based on the parameters.

  For example, environment for creating or deleting a VM instance.

- Perform the test.

  Use the configured parameters to perform the test. Generally, when a test point triggers a TestFail exception, the test fails; otherwise, the test is passed.

- Clean up the environment after the test.

  Clean up the environment based on the test result, for example, destroying the VM or deleting the image.
  
# Cartesian Configuration

- Keys and values

  The Avocado-VT framework uses <key> = <value> to define keys. For example, in the following code segment, **test_type** in line 16 is a key, and **start** is the value.  
  Note that the Avocado-VT framework parses parameters in top-down order. Therefore, a later key overwrites the previous key.  

- Variants

  Variants are of high importance for parameter configuration. A **variants** stanza can contain multiple parameters of the same level.

  The output of two **variants** stanzas will be all possible combinations of both variant contents.

  As shown in the following code segment, the **variants** stanza in line 10 contains two branches: positive_test and negative_test. The two branches are independent and represent positive test cases and negative test cases, respectively. The positive_test branch contains two **variants** stanzas. The first one contains five elements: life_cycle, data_events, cmdline_d, multivmtop, and vcpu_hotplug. The second one contains two elements: single_vm and multi_vms. The two **variants** stanzas of the same level can output a maximum of 10 combinations.

  life_cycle also contains a **variants** stanza, which contains four elements: start, destroy, reboot, and pause_resume. Therefore, a maximum of 16 combinations can be obtained theoretically. The combination name is in the format of **positive_test.single_vm.life_cycle.start**.

- Filters

  Filter statements help filter case combinations. There are two common filters: **only** and **no**. In the following code segment, the **only** filter in line 41 limits the variant combinations. multi_vms is combined only with life_cycle.start, and nine positive_test combinations can be obtained.
  
```
- vmtop:
    type = vmtop
    start_vm = "no"
    output_file = "vmtop_output"
    vcpu_max = 8
    vcpu_cur = 4
    vcpu_live = 6
    vm_num = 1
    only aarch64
    variants:
        - positive_test:
            variants:
                - life_cycle:
                    variants:
                        - start:
                            test_type = start
                        - destroy:
                            test_type = destroy
                        - reboot:
                            test_type = reboot
                        - pause_resume:
                            test_type = pause
                - data_events:
                    test_type = data_events
                - cmdline_d:
                    option = "d"
                    interval = 2
                - multivmtop:
                    test_type = multivmtop
                    vmtopnum = 6
                - vcpu_hotplug:
                    test_type = vcpu_hotplug
                    vcpu_placement = "static"
            variants:
                - single_vm:
                    test_type = single_vm
                    vm_num = 1
                - multi_vms:
                    test_type = multi_vms
                    vm_num = 3
                    only life_cycle.start
        - negative_test:
            variants:
                - invalid_cmdline:
                    option = "x"
```

# Test Case Highlights

- Dependency libraries

  Python and Avocado-VT provide a large number of encapsulated libraries. Making good use of these libraries can greatly improve the test case compilation efficiency, simplify the test case code, and improve the readability.

```python
import os
import logging

from avocado.utils import process
from avocado.utils import path
from avocado.core import exceptions

import virttest.utils_libguestfs as lgf
from virttest.utils_test import libvirt
from virttest.libvirt_xml import vm_xml
from virttest import virsh
from virttest import data_dir
```


- run Function

  The run function is an indispensable part of Avocado-VT test cases. By adding test logic to the run function using **test**, **params**, and **env** parameters provided by this function, we can perform a large number of operations on VM instances and design and implement test points.

  **test**: avocado/avocado/core/test.py  
  **params**: avocado-vt/virttest/utils_params.py  
  **env**: avocado-vt/virttest/utils_env.py

```python
def run(test, params, env):
```

- Parameter configuration

  Obtain VM instances and preset parameters from the CFG file. It is similar to defining and initializing variables.

```python
vmname = params.get("main_vm", "avocado-vt-vm1")
vm = env.get_vm(vmname)

output = params.get("output_file", "output")
output_path = os.path.join(data_dir.get_tmp_dir(), output)
option = params.get("option")
interval = params.get("interval")
test_type = params.get("test_type", "")
vcpu_placement = params.get("vcpu_placement")
vcpu_cur = int(params.get("vcpu_cur"))
vcpu_max = int(params.get("vcpu_max"))
vcpu_live = int(params.get("vcpu_live"))
vm_num = int(params.get("vm_num"))
vmtopnum = params.get("vmtopnum")
```

- Common library sources for VM instance operations

  libvirt: avocado-vt/virttest/libvirt_vm.py  
avocado-vt/virttest/virsh.py  
qemu: avocado-vt/virttest/qemu_vm.py

# Test Points

- Installing vmtop in the Environment

  Run the **yum install -y vmtop** command on the host OS to install vmtop. process.run is a function provided by Python and is used to run shell commands. If the installation fails, use the try-except syntax to report an exception.
  
```python
#Install vmtop command
install_cmd = "yum install -y vmtop"
process.run(install_cmd, shell=True)
#Find vmtop command
try:
    vmtop = path.find_command("vmtop")
except path.CmdNotFoundError as info:
    raise exceptions.TestSkipError("No vmtop command found - %s" % info)
```

- virsh.start

  The virsh.start function is used to start a libvirt VM instance. Note: For libvirt test cases, you need to define a VM using an XML file.

```python
virsh.start(vmname, ignore_status=True)
```

- test.fail

  Compile a vmtop_info function, obtain the return value, and check whether the return value meets the expectation. If no, the process goes to test.fail, indicating that the test case fails. This is a typical test point.

```python
#Test vmtop when start vm
res = vmtop_info(vmtop, output_path, info_type="Domains")
if int(res) != vm_num:
    test.fail("start failed and the res = %s" % res)
```

- vmtop_info

  This function uses the **vmtop** command and saves the **vmtop** output to the temporary path **output_path** preset in the parameter configuration phase. This capability is provided by the os library to save files generated during test case execution to avoid occupying the drive space.
  Instead of being tested in the run function, this function is tested separately for multiplexing. To verify other information in the **vmtop** output, you only need to add verification logics in the vmtop_info function.

```python
def vmtop_info(vmtop, output_path, info_type):
    """
    Collect and return vmtop infomation
    """
    cmd = "%s -b -H -n 1 > %s" % (vmtop, output_path)
    process.run(cmd, ignore_status=True, shell=True)

    if info_type == "Domains":
        cmd = "cat %s | grep  Domains | awk '{ print $2 }'" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)
    elif info_type == "Cpu":
        cmd = "cat %s | grep /KVM | awk 'END{ print NR }'" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)
    elif info_type == "Data":
        cmd = "cat %s | grep  DID" % output_path
        res = process.run(cmd, ignore_status=True, shell=True)

    return res.stdout_text
```

- Environment clearance

  To ensure that test cases do not affect each other, we need to clean up the environment at the end of the test. For example, destroy VM instances and remove drives.
  
```python
finally:
    # Destroy vm_clone
    if test_type == "multi_vms":
        num = 1
        while num < vm_num:
            if virsh.domain_exists(vm_clone_name[num - 1]):
                if virsh.is_alive(vm_clone_name[num - 1]):
                    virsh.destroy(vm_clone_name[num - 1])
                    virsh.remove_domain(vm_clone_name[num - 1], \
                                        "--remove-all-storage", debug=True)
            num = num + 1

    if vm.is_alive():
        vm.destroy()
    vmxml.sync()
```

- Complete test case source code

  [1. Python file](https://gitee.com/openeuler/tp-libvirt/tree/openEuler-20.03/libvirt/tests/src/virt_cmd/vmtop.py
  )
  [2.CFG file](https://gitee.com/openeuler/tp-libvirt/tree/openEuler-20.03/libvirt/tests/cfg/virt_cmd/vmtop.cfg
  )
