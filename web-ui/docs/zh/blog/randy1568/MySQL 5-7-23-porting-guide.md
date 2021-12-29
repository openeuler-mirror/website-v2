---
title: MySQL 5.7.23 Porting Case（openEuler 20.03 LTS SP1）
date: 2021-12-29
tags: 
    - MySQL
    - Porting Case
sig: sig-Compatibility-Infra
archives: 2021-12
author: randy1568
summary: Just about everything of the MySQL 5.7.23 porting case
---

# MySQL 5.7.23 移植案例（openEuler 20.03 LTS SP1）

# 介绍

## 简要介绍

MySQL 是一款安全、跨平台、高效的，并与 PHP、Java 等主流编程语言紧密结合的数据库系统。
本案例使用x86_64架构虚拟机，通过评估工具x2openEuler评估MySQL 5.7.23软件移植到openEuler操作系统的兼容性，并根据评估结果完成软件移植。

开发语言：C

## 建议的版本
建议使用版本为MySQL 5.7.23。

> 说明:
> 本文档适用于MySQL 5.7.23，其他版本的MySQL移植步骤也可参考本文档。


# 环境要求
##  操作系统要求
| 操作系统 | 版本  |
|---|---|
| openEuler  | 20.03 LTS SP1 |
| CentOS  |  7.6 |

## 安装操作系统

   如果是全新安装操作系统，安装方式建议不要使用最小化安装，否则很多软件包需要手动安装，可选择“Server with GUI”安装方式。
安装openEuler操作系统请参考：https://openeuler.org/zh/docs/20.03_LTS_SP1/docs/Installation/installation.html。

# 兼容性评估

评估工具：x2openEuler
评估环境：CentOS7.6

## 获取mysql的RPM包到/opt目录下
```
wget -P /opt https://downloads.mysql.com/archives/get/p/23/file/mysql-5.7.23-1.el7.x86_64.rpm-bundle.tar
```
## 解压RPM到 /opt/mysql
```
cd /opt/
mkdir mysql
tar -xf mysql-5.7.23-1.el7.x86_64.rpm-bundle.tar -C mysql
```

## 解压rpm到/opt/mysql/mysql-5.7.23
```
cd /opt/mysql &amp;&amp; mkdir mysql-5.7.23 &amp;&amp; cd mysql-5.7.23
rpm2cpio ../mysql-community-server-5.7.23-1.el7.x86_64.rpm |cpio -ivd
rpm2cpio ../mysql-community-client-5.7.23-1.el7.x86_64.rpm |cpio -ivd
rpm2cpio ../mysql-community-libs-5.7.23-1.el7.x86_64.rpm |cpio -ivd
rpm2cpio ../mysql-community-common-5.7.23-1.el7.x86_64.rpm |cpio -ivd
```
### 获取工具到/opt/mysql
```
xxx
```
### 配置工具
```
cd /opt/mysql
rpm -ivh x2openEuler-1.0-1.noarch.rpm
注意：安装rpm时需要使用root用户，且目前需要网络（用于下载安装依赖）
```
### 初始化工具
```
su x2openEuler
cd 
x2openEuler redis-db -init
依次录入redis数据库的ip、端口、数据库索引号（0-16）、密码（工具会对密码加密处理）
如果redis密码没有设置或者为空时，直接回车即可
x2openEuler使用rpm安装完成后会在/opt/x2openEuler目录下带有source_centos7.6-openEuler20.03-LTS-SP1.tar.gz这个默认资源包
需要支持centos8.2到openEuler20.03-LTS-SP1的评估，则需获取对应的静态资源包导入，如对应的资源包为source_centos8.2-openEuler20.03-LTS-SP1.tar.gz，导入此包命令：`x2openEuler init source_centos8.2-openEuler20.03-LTS-SP1.tar.gz`，请示情况选择对应的资源包
```
```
x2openEuler scan /opt/mysql/mysql-5.7.23
注意要分析的移植文件需要有能够让x2openEuler用户可以读取的权限
```
## 查看评估结果
##***`注意：兼容行评估结果显示有多个接口变更，请自行评估接口变更对迁移的影响`***


# 使用rpm命令安装MySQL 5.7.23
```
rpm -ivh mysql-community-common-5.7.23-1.el7.x86_64.rpm
rpm -ivh mysql-community-libs-5.7.23-1.el7.x86_64.rpm
rpm -ivh mysql-community-client-5.7.23-1.el7.x86_64.rpm
rpm -ivh mysql-community-server-5.7.23-1.el7.x86_64.rpm
```

# 运行和验证

## 创建data目录并赋予权限
```
mkdir -p /data/mysql/data
chown -R mysql:mysql /data
```

## 初始化数据库
```
/usr/sbin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql/ --datadir=/data/mysql/data --explicit_defaults_for_timestamp=true
```

## 启动服务
```
systemctl start mysqld
```

## 查看服务
```
systemctl status mysqld
```

## 验证版本
### 查看初始密码
```
cat /var/log/mysqld.log | grep password
```
![输入图片说明](https://images.gitee.com/uploads/images/2021/0402/153434_7ba70fbe_8039520.png "屏幕截图.png")

### 键入初始化密码查看版本
```
mysql -uroot -pCbDSc+hAd46q
```
![输入图片说明](https://images.gitee.com/uploads/images/2021/0402/153449_0926c924_8039520.png "屏幕截图.png")

