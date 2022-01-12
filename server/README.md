openEuler server
===========================
###项目框架

1. 目录结构描述

		├── README.md                   // 描述
		├── app                         // 应用启动配置文件
		├── config                      // 配置文件夹
		│   ├── apiConfig.js
		│   ├── filePathConfig.js
		│   ├── mysqlConfig.js
		│   ├── searchConfig.js
		├── logs
		├── mysql                         // 数据库操作配置
		├── public\data                   // 公共文件放置
		├── routes                        // 路由文件
		├── scripts                       // 服务器更新脚本
		├── search                        // 搜索引擎
		├── util                          // 公共方法
		├── views                         // 视图文件

2. 接口描述

    1. 博客模块接口

       /blog/visit            // 访问量统计
	
       /blog/list             // 访问量列表
	
       /blog/one              // 单条博客访问量

    2. 新闻模块接口

       /news/visit            // 访问量统计
	
       /news/list             // 访问量列表
	
       /news/one              // 单条新闻访问量

    3. 包搜索接口

       /repo/search

    4. 邮件列表接口

       /mail/list

    5. 邮件订阅接口

       /mail/one

    6. 全局搜索接口

       /search/keyword

    7. 创建搜索索引数据接口

       /search/insert

    8. sig组列表接口

      /sig/group

###环境依赖
node v12.18.3+

###部署步骤

1. 安装node运行环境

   npm install

2. 安装依赖项

    > npm install file-stream-rotator

    > npm install helmet

    > npm install request

    > npm install mysql

    > npm install cheerio

3. 配置环境变量

   调用后端接口用户名与密码

   export API_USER_PASS=xxxxxx:xxxxxx

   调用邮件列表接口用户名与密码

   export MAIL_USER_PASS=xxxxxx:xxxxxx

   SIG组列表URL

   export SIG_API=http://xxx.xxx.xxx.xxx/groups/

   ES服务url

   export ES_URL=https://xxx.xxx.xxx:port/

   调用ES接口用户名与密码

   export ES_USER_PASS=admin:openeuler

   数据库名称

   export MYSQL_DATABASE=xxx

   数据库密码

   export MYSQL_PWD=xxx

   数据库安装地址
     
   export MYSQL_URL=xxx.xxx.xxx.xxx

4. 启动服务

  > npm run start

  > npm run dev

5. 服务器发布

   1. 进入项目目录

      cd /home/openeuler/website-v2/server

   2. 构建docker镜像

      docker build -t openeulerserver .

   3. 启动docker容器

      docker run -e API_USER_PASS -e MAIL_USER_PASS -e SIG_API -e ES_URL -e ES_USER_PASS -e MYSQL_DATABASE -e MYSQL_PWD -e MYSQL_URL -p 8090:8090 -d openeulerserver
