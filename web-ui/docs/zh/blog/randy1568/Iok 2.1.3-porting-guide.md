---
title: Iok 2.1.3 移植指南（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - lok
    - Porting Guide
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything you'll need to  migrate the lok 2.1.3 
---

# Iok 2.1.3 移植指南 (openEuler 20.03 LTS SP1)

## 简介

>Iok是一款在屏幕上显示印度语言的键盘映射应用

### 选用版本

> 2.1.3

### 安装指南

> https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html

### 检查当前系统版本信息

```shell
cat /etc/os-release
```

![系统信息](https://images.gitee.com/uploads/images/2021/0322/113838_bccd0727_7919994.png "系统信息")

### 兼容性检查

- 下载iok-2.1.3 SRPM

```
wget http://mirror.centos.org/centos/7/os/x86_64/Packages/iok-2.1.3-6.el7.x86_64.rpm
```

> 使用x2openEuler对工具目录中的iok-2.1.3 RPM包进行分析

```
x2openEuler scan iok-2.1.3-6.el7.x86_64.rpm
```

- 查看兼容报告

> 根据依赖报告可知，移植到openEuler 20.03 LTS SP1需要解决unique3依赖问题

## 依赖包引入

- 在openEuler/oec-application仓库中发起issue

> 仓库地址：https://gitee.com/openeuler/oec-application

![输入图片说明](https://images.gitee.com/uploads/images/2021/0324/161603_5b559f56_7919994.png "issue")

- 持续追踪issue至缺失的依赖包被引入openEuler 20.03 LTS SP1 的YUM repo中

## 构建流程

> 当缺失的依赖包被引入后可进行

- 获取iok的Centos 7.6.1810 SRPM包
- 在openEuler 20.03 LTS SP1上构建二进制包

###构建二进制包

```shell
yum install -y rpm-build
```

> 提供rpmbuild命令

- 从网络安装SRPM包

```shell
rpm -i https://vault.centos.org/7.6.1810/os/Source/SPackages/iok-2.1.3-6.el7.src.rpm
```

- 安装依赖

```shell
yum-builddep -y ~/rpmbuild/SPECS/iok.spec
```

- 构建二进制包

```shell
rpmbuild -bb ~/rpmbuild/SPECS/iok.spec
```

- 二进制包安装

```
rpm -i ~/rpmbuild/RPMS/x86_64/*.rpm
```

- 查看二进制文件

```
which iok
```