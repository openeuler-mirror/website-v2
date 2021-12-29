---
title: X86 hardware compatibility evaluation Porting Guide（3008raid）（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - X86 hardware compatibility evaluation 
    - 3008raid
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  evaluate the compatibility of X86 hardware（3008raid）
---

# X86硬件兼容性评估迁移指导(3008raid) (openEuler 20.03 LTS SP1)

# 介绍
3008 raid卡是华为生产的一款raid卡。
# 环境要求
## 硬件要求
 硬件要求如下表所示


项目 | 说明| 
----- | ----- | 
服务器 | 2288H V5 
CPU | Inter(R) Xeon(R) Gold 6266C CPU@3.00GHz 
RAID卡 | LTS SAS 3408 
## 操作系统要求
操作系统要求如下表所示


项目 | 说明 |
----- | ----- |
Centos Linux | 7.9.2009(Core)
Kernel | 3.10.0 x86_64
## 检查当前版本系统信息
cat /etc/os-release

![输入图片说明](https://images.gitee.com/uploads/images/2021/0402/154347_c5ca10a0_8039520.png "屏幕截图.png")
# x2openEuler软件运行和配置信息采集
## 环境信息采集：
    1、安装x2openEuler工具的rpm包
        rpm -ivh x2openEuler-1.0-1.noarch.rpm
    2、进入x2openEuler用户，初始化工具和导入资源包
        su x2openEuler
        cd 
        x2openEuler redis-db -init       
        x2openEuler使用rpm安装完成后会在/opt/x2openEuler目录下带有source_centos7.6-openEuler20.03-LTS-SP1.tar.gz这个默认资源包
        需要支持centos8.2到openEuler20.03-LTS-SP1的评估，则需获取对应的静态资源包导入，如对应的资源包为source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此                
        包命令：`x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz`,视情况选择对应的资源包
    3、执行下面命令开始采集数据
        python3 x2openEuler.pyc collect-conf-info -p ./results
       x2openEuler conf-collect
## 查看采集结果：
  板卡的采集结果保存在输出结果的压缩包中。
  输出位置为`/opt/x2openEuler/output`目录，如下，资源包为`sysconf-时间戳.tar.gz`形式 

# 迁移结果人工分析

   从南向板卡兼容性清单网站(https://gitee.com/openeuler/website-v2/tree/feature-compatibility/data/compatibility)查找3008raid卡信息，如果没有找到，说明openeuler 20.03 LTS SP1 还不支持3008raid卡。请您在 https://gitee.com/openeuler/website-v2/tree/master/data/compatibility 网站上提交issue，openEuler团队sig组会及时进行处理。
# 卸载x2openEuler软件
分析完成后，执行下面命令删除x2openEuler软件包和采集结果

rpm -e x2openEuler

同时，需要手动删除x2openEuler用户