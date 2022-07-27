--- 
title: Gitee通知设置
date: 2022-07-22
tags:
    - Gitee
    - 通知
    - 通知设置
sig: sig-Gatekeeper
archives: 2022-07
author: liuqi
summary: 本博客介绍了如何在Gitee配置邮件通知

---

### 背景
在不久前举办的**欧拉Talk·开发者说**会议中，openEuler社区多个SIG组的maintainers和developers反馈了许多宝贵意见与建议，其中一条反馈的内容
为当前Gitee的通知只限于Gitee界面，如果消息过多，使用者无法第一时间获取到有用信息（如PR、issue的指派，PR合入等）。

在调研Gitee设置后，我们发现Gitee的消息通知不仅支持站内信，还支持邮件通知和微信通知，具体选择何种消息通知方式因人而异，本文主要介绍如何配置邮件通知。

### 设置
访问Gitee的[个人设置](https://gitee.com/profile/account_information)，选择消息中心的通知设置。
你可以根据个人喜好或需求选择某项设置的通知方式，也可以选择多种通知方式。

<div align="center"><img src="./2022-07-22-gitee-notification-settings-01.png" width=600 alt="01.png"/></div>

<div align="center"><font size=1>Gitee通知设置</font></div><br/>

### 通知
以下所有场景的通知都基于上述图片中的设置。
- 场景一：本人创建的Pull Request被他人合入

  **PR状态变更** 选择通知方式为站内信和邮件，本人创建的PR被他人合入

<div align="center"><img src="./2022-07-22-gitee-notification-settings-02.png" width=600 alt="02.png"/></div>

<div align="center"><font size=2>Gitee站内信通知</font></div><br/>

<div align="center"><img src="./2022-07-22-gitee-notification-settings-03.png" width=600 alt="03.png"/></div>

<div align="center"><font size=2>邮件通知</font></div><br/>

- 场景二：被指派issue

  **有新的任务指派给我** 选择通知方式为邮件，被指派issue

<div align="center"><img src="./2022-07-22-gitee-notification-settings-04.png" width=600 alt="04.png"/></div>

<div align="center"><font size=2>邮件通知</font></div><br/>

- 场景三：被指派的issue发生状态变更

  **任务状态变更** 选择通知方式为站内信和邮件，被指派的issue发生状态变更

<div align="center"><img src="./2022-07-22-gitee-notification-settings-05.png" width=600 alt="05.png"/></div>

<div align="center"><font size=2>Gitee站内信通知</font></div><br/>

<div align="center"><img src="./2022-07-22-gitee-notification-settings-06.png" width=600 alt="06.png"/></div>

<div align="center"><font size=2>邮件通知</font></div><br/>

- 场景四：被@

  **提到我的 @** 选择通知方式为站内信和邮件，被@

<div align="center"><img src="./2022-07-22-gitee-notification-settings-07.png" width=600 alt="07.png"/></div>
<div align="center"><font size=2>Gitee站内信通知</font></div><br/>

<div align="center"><img src="./2022-07-22-gitee-notification-settings-08.png" width=600 alt="08.png"/></div>
<div align="center"><font size=2>邮件通知</font></div><br/>

**Tips**：需要注意的是，以上场景均为非本人触发，若本人做如上操作，不会收到对应的通知。而@操作也需要被@用户有访问权限，否则不会通知被@的用户。
