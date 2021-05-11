# website-v2

#### 介绍
自2020年10月起，website-v2替代原website仓库，作为openEuler社区官网（https://openeuler.org/zh/）的源码仓库。

#### 软件架构
官网使用vuepress+node.js作为前后端的基础框架搭建。大部分功能仅通过静态文件渲染，只有少部分功能模块（日历、CVE、搜索）需要后端部署配合运行。
各目录解释如下：

website-v2
    ├─ data    //此目录存放由特定责任人独立维护的模块数据，例如目前存放的是兼容性查询所需的数据。
    ├─ script  //此目录存放文档、博客、新闻导入ES(elasticsearch)所需的脚本。
    ├─ server  //此目录存放后端部署和运行所需代码，详细介绍请参考此目录下的README.md文件。
    ├─ web-ui  //此目录存放前端部署和运行所需代码，详细介绍请参考此目录下的README.md文件。

#### 本地部署教程

1. 前端工程部署请参考website-v2/web-ui/目录下的README.md文件。
2. 后端工程部署请参考website-v2/server/目录下的README.md文件。

#### 参与贡献

1.  点击本仓库Gitee主页右上角的Fork按钮，创建个人Fork仓
2.  使用git工具把代码拉取到本地
3.  新建 Feat_xxx 分支进行开发
3.  开发完成后，提交代码到个人Fork仓
4.  新建pull request,把修改以PR形式提交到本仓库


