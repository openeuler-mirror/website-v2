---  
title: 如何退订openEuler的邮件列表  
date: 2021-10-14  
tags:   
    - openEuler  
    - 邮件列表  
    - 退订  
sig: sig-Gatekeeper  
archives: 2021-10  
author: liuqi<469227928@qq.com>
summary: 本博客介绍了两种退订openEuler邮件列表的方式 

---  

### 用户界面退订
如果你已是openEuler邮件列表的注册用户(当前注册接口未开放)，可直接登录[**postorius**](https://mailweb.openeuler.org/postorius/lists/)，  
进入需要退订的邮件列表，点击unsubscribe即可

<img src='./2021-10-14-unsubscribe-maling-list-01.png' width=750 alt='Web UI退订'>
  
### 发送邮件退订
发送邮件以退订tc@openeuler.org为例
使用订阅邮箱给tc-leave@openeuler.org发送一封邮件，标题和内容不限
<img src='./2021-10-14-unsubscribe-maling-list-02.png' width=750 alt='发送退订邮件'>

随后，你会收到一封标题以tc-confirm开头的邮件，如果确定退订，直接回复即可
<img src='./2021-10-14-unsubscribe-maling-list-03.png' width=750 alt='退订确认'>

最后，你会收到一封tc-bounces发送的退订成功告知邮件
<img src='./2021-10-14-unsubscribe-maling-list-04.png' width=750 alt='退订成功'>

### 更多
更多社区邮件列表相关问题可参考[**Mailweb List FAQ**](https://osinfra.cn/faq/mailinglist.html)
