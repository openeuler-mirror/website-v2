/**
 * @file  首页模块国际化配置入口
 * */

module.exports = {
    cn: {
        HOME_CAROUSEL_DATA: [{
            TITLE: "OpenEuler Summit 2020",
            LINK: "/interaction/summit-list/",
            DES: "OpenEuler Virtual Summit 2020 是 openEuler 在发布 20.03 LTS 版本后第一次举行的峰会，本次大会邀请了华为的资深专家、社区 Committer 和多家 openEuler 社区合作厂商的重量嘉宾贡献多场精彩的演讲，不容错过。",
        },
            {
                TITLE: "iSula",
                LINK: "https://live.bilibili.com/22290444",
                DES: "iSula是一种云原生轻量级容器解决方案，可通过统一、灵活的架构满足ICT领域端、边、云场景的多种需求。",
            },
            {
                TITLE: "A-Tune",
                LINK: "https://gitee.com/openeuler/A-Tune",
                DES: "A-Tune是智能性能优化系统软件，即通过机器学习引擎对业务应用建立精准模型, 再根据业务负载智能匹配最佳操作系统配置参数组合，实现系统整体运行效率提升。",
            }
        ],
        HOME_OPENEULER_NEW:{
            SMALL_IMG: '/img/home/HC-Banner.png',
            HC_MOBILE_IMG: "url('/img/home/HC-Mobile.png')",
            CENTER_WORD: {
                BIG_WORD: 'NEW VALUE TOGETHER',
                SMALL_WORD: '共创行业新价值'
            },
            BOTTOM_WORD: {
                UP_WORD: '华为全联接2020',
                DOWN_WORD: '2020年9月23-26日 | 中国，上海'
            },
            BACKGROUND_IMG: "url('/img/home/HC-Banner.gif')",
            HC_ADRESSION: 'https://e.huawei.com/cn/solutions/hic?utm_campaign=04MHQHQ20W6R9P&utm_medium=pm-display&utm_source=openeluer&source=openeluer&utm_content=hic_hc_2020',
            BASE_SOFTWARE_PCIMG: "url('/img/home/banner/zh-pc-base.jpg')",
            BASE_SOFTWARE_MOBILEIMG: "url('/img/home/banner/zh-mobile-base.jpg')",
            BASE_SOFTWARE_LINK: 'http://live.huawei.com/huaweiconnect/meeting/cn/5786.html',
            TRAIN_PC_IMG: '/img/home/banner/zh-pc-train.png',
            TRAIN_PC_GIF: '/img/home/banner/BannerS.gif',
            TRAIN_MOBILE_IMG: "url('/img/home/banner/zh-mobile-train.png')",
            TRAIN_LINK: 'http://live.huawei.com/huaweiconnect/meeting/cn/5859.html'
        },
        HOME_INTRODUCE: {
            INTRO_TITLE: "The Most Innovated OS Open Source Community",
            INTRO_HEAD: "开始openEuler之旅吧！",
            INTRO_DESCRIPTION: "openEuler通过社区合作，打造创新平台，构建支持多处理架构、统一和开放的操作系统，推动软硬件应用生态繁荣发展。",
            INTRO_IMG_URL: "",
            INTRO_MAP: [
                {
                    NAME: "下载",
                    TITLE: "openEuler ISO",
                    IMG: "/img/home/step1.png",
                    GIF: "/img/home/step-move-1.gif",
                    LINK: "/download/",
                },
                {
                    NAME: "体验",
                    TITLE: "openEuler系统",
                    IMG: "/img/home/step2.png",
                    GIF: "/img/home/step-move-2.gif",
                    LINK: "",
                },
                {
                    NAME: "查阅",
                    TITLE: "openEuler文档",
                    IMG: "/img/home/step3.png",
                    GIF: "/img/home/step-move-3.gif",
                    LINK: "/documentation",
                },
                {
                    NAME: "贡献",
                    TITLE: "openEuler社区",
                    IMG: "/img/home/step4.png",
                    GIF: "/img/home/step-move-4.gif",
                    LINK: "/community/contribution/",
                },

            ],
            INTRO_MAP_SND: {
                NAME: "体验",
                TITLE: "openEuler系统",
                IMG: "/img/home/step2.png",
                LINK: "javascript:;",
                GIF: "/img/home/step-move-2.gif"
            },
            INTRO_GUIDE: {
                INFO: "选择您喜欢的体验方式",
                GUIDE_WAY: [
                    {
                        TITLE: "树莓派",
                        IMG: "/img/home/areaPai.png",
                        LINK:"https://gitee.com/openeuler/raspberrypi"
                    },
                    {
                        TITLE: "硬件",
                        IMG: "/img/home/areaHardware.svg",
                        LINK:"/zh/docs/20.03_LTS/docs/Installation/installation.html"
                    },
                    {
                        TITLE: "虚拟机",
                        IMG: "/img/home/areaVirtual.svg",
                        LINK:"/zh/docs/20.03_LTS/docs/Virtualization/virtualization.html"
                    },
                    {
                        TITLE: "ECS",
                        IMG: "/img/home/areaECS.svg",
                        LINK:"https://huaweicloud.com/product/ecs.html"
                    }
                ]
            }
        },
        HOME_ACTIVE: {
            ACTIVE_TITLE: "好玩的活动停不下来",
            ACTIVE_DESCRIPTION: "openEuler社区不定期举办各种workshop、SIG讨论、线下活动、社区峰会，精彩动态随时掌握。"
        },
        HOME_ROOMS: {
            ROOM_NAME: ["最新活动", "博客", "新闻"],
            EVENT_NAME: "最新活动",
            BLOG_NAME: "博客",
            NEWS_NAME: "新闻",
            EVENT_LIST: [
                {
                    TAG: "事件",
                    DATE: "2020-06-07",
                    CONTENT: "吹响开源集结号——”点亮“暑假2020"
                },
                {
                    TAG: "事件",
                    DATE: "2020-01-04",
                    CONTENT: "去HDC.Cloud 2020 参加黑客松， 玩儿openEuler，赢取大礼"
                },
                {
                    TAG: "事件",
                    DATE: "2020-12-10",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            BLOG_LIST: [
                {
                    TAG: "openEuler Blog Maintainer",
                    DATE: "2020-05-08",
                    CONTENT: "A-Tune让系统更智能"
                },
                {
                    TAG: "zhongjun",
                    DATE: "2020-05-07",
                    CONTENT: "浅谈openEuler开源社区经营度量分析系统选型"
                },
                {
                    TAG: "Ivye",
                    DATE: "2020-05-06",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            NEWS_LIST: [
                {
                    TAG: "极云IT杂谈",
                    DATE: "2020-05-09",
                    CONTENT: "华为OpenEuler操作系统强势来袭，正式开源时代来了？"
                },
                {
                    TAG: "中国网科学频道",
                    DATE: "2020-05-06",
                    CONTENT: "华为联合产业伙伴openEuler2020年峰会成功召开"
                },
                {
                    TAG: "新浪",
                    DATE: "2020-04-12",
                    CONTENT: "openEuler开源路带来多样性计算计算技术与产业生态共荣"
                },
            ],
        },
        HOME_DEV: {
            DEV_TITLE: "相见恨晚的Developer",
            DEV_DESCRIPTION: "这里汇聚了无数精英大咖，快找找您感兴趣的Developer吧！",
            DEV_INFO: [
                {
                    NAME: "胡峰",
                    TITLE: "Application、System-tool、",
                    RANK: "Packaging SIG maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/hufen.png"
                },
                {
                    NAME: "杜开田",
                    TITLE: "Application、CICD SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "dukaitian@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/dukaitian.png"
                },
                {
                    NAME: "何晓文",
                    TITLE: "Packaging SIG、Base-",
                    RANK: "service SIG maintainer",
                    MAIL_LINK: "hexiaowen@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/hexiaowen.png"
                },
                {
                    NAME: "朱春意",
                    TITLE: "Packaging SIG、Base-",
                    RANK: "service SIG maintainer",
                    MAIL_LINK: "zhuchunyi@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhuchunyi",
                    IMG: "/img/home/developer/zhuchunyi.png"
                },
                {
                    NAME: "谢秀奇",
                    TITLE: "Kenel SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "xiexiuqi@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiexiuqi",
                    IMG: "/img/home/developer/xiexiuqi.png"
                },
                {
                    NAME: "董剑",
                    TITLE: "Packaging SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "dongjian13@huawei.com",
                    GITEE_LINK: "https://gitee.com/dogsheng",
                    IMG: "/img/home/developer/dongjian.png"
                },
                {
                    NAME: "蔡灏旻",
                    TITLE: "iSulad SIG",
                    RANK: " maintainer",
                    MAIL_LINK: "caihaomin@huawei.com",
                    GITEE_LINK: "https://gitee.com/caihaomin",
                    IMG: "/img/home/developer/caihaomin.png"
                },
                {
                    NAME: "李峰",
                    TITLE: "Container SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "lifeng68@huawei.com",
                    GITEE_LINK: "https://gitee.com/lifeng2221dd1",
                    IMG: "/img/home/developer/lifeng.png"
                },
                {
                    NAME: "张海亮",
                    TITLE: "Virt SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "zhang.zhanghailiang@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhanghailiang_lucky",
                    IMG: "/img/home/developer/zhanghailiang.png"
                },
                {
                    NAME: "郑弦",
                    TITLE: "sig-ai-bigdata SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "sinever@126.com",
                    GITEE_LINK: "gitee.com/sinever",
                    IMG: "/img/home/developer/zhengxian.png"
                },
                {
                    NAME: "朱健伟",
                    TITLE: "Base-Service SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "zhujianwei7@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhujianwei001",
                    IMG: "/img/home/developer/zhujianwei.png"
                },
                {
                    NAME: "谢志鹏",
                    TITLE: "A-Tune SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "xiezhipeng1@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiezhipeng1",
                    IMG: "/img/home/developer/xiezhipeng.png"
                },
                {
                    NAME: "熊伟",
                    TITLE: "sig-perl-modules/ sig-perl-",
                    RANK: "modules SIG maintainer",
                    MAIL_LINK: "xiongwei888@huawei.com",
                    GITEE_LINK: "https://gitee.com/myeuler",
                    IMG: "/img/home/developer/xiongwei.png"
                },
                {
                    NAME: "朱延朋",
                    TITLE: "sig-release-management",
                    RANK: "SIG maintainer",
                    MAIL_LINK: "zhuyanpeng@huawei.com",
                    GITEE_LINK: "https://gitee.com/zyp-rock",
                    IMG: "/img/home/developer/zhuyanpeng.png"
                },
                {
                    NAME: "刘志强",
                    TITLE: "Storage SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "lzhq28@mail.ustc.edu.cn",
                    GITEE_LINK: "https://gitee.com/liuzhiqiang26",
                    IMG: "/img/home/developer/liuzhiqiang.png"
                },
                {
                    NAME: "吴波",
                    TITLE: "Storage SIG",
                    RANK: "maintainer",
                    MAIL_LINK: "wubo009@163.com",
                    GITEE_LINK: "https://gitee.com/wubo009",
                    IMG: "/img/home/developer/wubo.png"
                },
            ]
        },
        HOME_AUTH: {
            AUTH_TITLE: "集成与认证",
            AUTH_DESCRIPTION: "集成与认证，就是通过测试，保证上述软件在openEuler操作系统上正常使用，并互相认可（互认证）。",
            AUTH_HARDWARE: "硬件驱动",
            AUTH_OPEN_SOURCE: "开源软件",
            AUTH_FREE: "免费软件",
            AUTH_BUSINESS: "商业软件"
        },
        HOME_SOURCE: {
            SOURCE_TITLE: "获取更多资源",
            SOURCE_APPLY: {
                TITLE: "测试资源申请",
                DES: "如果缺乏测试设备，可以尝试",
                APPLY: "在此申请。",
                SPONSOR: "感谢鹏城实验室赞助",
                SPONSORLINK:'https://dw.pcl.ac.cn/#/home/index'
            },
            SOURCE_MAIL: {
                TITLE: "邮件订阅",
                DES: "任何社区话题都可以在这里讨论。",
                SUBSCRIBE: "更多订阅请点击",
                LINK: "邮件列表",
                MAIL: "community@openeuler.org"
            },
            SOURCE_PUBLISH_TITLE: "基于openEuler的OS发行版",
            SOURCE_LINK_TITLE: "友情链接",
        },
        MORE: "更多",
        EXPAND: "展开全部",
        RETRACT: "收起全部"
    },
    en: {
        HOME_CAROUSEL_DATA: [{
            TITLE: "OpenEuler Summit 2020",
            LINK: "/interaction/summit-list/",
            DES: "openEuler Virtual Summit 2020 is the first summit after the release of the openEuler 20.03 LTS version. Senior experts from Huawei, community committers and weight guests from several open Euler community partners were invited to give a number of wonderful speeches, which should not be missed.",
        },
            {
                TITLE: "iSula",
                LINK: "https://live.bilibili.com/22290444",
                DES: "A cloud-native lightweight container solution that can meet the needs of device, edge, and cloud scenarios in ICT domain with a unified and flexible architecture.",
            },
            {
                TITLE: "A-Tune",
                LINK: "https://gitee.com/openeuler/A-Tune",
                DES: "A system software to auto-optimize the system adaptively to multiple scenarios with embedded AI-engine.",
            }
        ],
        HOME_OPENEULER_NEW:{
            SMALL_IMG: '/img/home/HC-Banner.png',
            HC_MOBILE_IMG: "url('/img/home/HC-Mobile.png')",
            CENTER_WORD: {
                BIG_WORD: 'NEW VALUE TOGETHER',
                SMALL_WORD: ''
            },
            BOTTOM_WORD: {
                UP_WORD: 'HUAWEI CONNECT 2020',
                DOWN_WORD: 'September 23-26（Shanghai）'
            },
            BACKGROUND_IMG: "url('/img/home/HC-Banner.gif')",
            HC_ADRESSION: 'https://e.huawei.com/cn/solutions/hic?utm_campaign=04MHQHQ20W6R9P&utm_medium=pm-display&utm_source=openeluer&source=openeluer&utm_content=hic_hc_2020',
            BASE_SOFTWARE_PCIMG: "url('/img/home/banner/en-pc-base.jpg')",
            BASE_SOFTWARE_MOBILEIMG: "url('/img/home/banner/en-mobile-base.jpg')",
            BASE_SOFTWARE_LINK: 'http://live.huawei.com/huaweiconnect/meeting/cn/5786.html',
            TRAIN_PC_IMG: '/img/home/banner/en-pc-train.png',
            TRAIN_PC_GIF: '/img/home/banner/BannerS.gif',
            TRAIN_MOBILE_IMG: "url('/img/home/banner/en-mobile-train.png')",
            TRAIN_LINK: 'http://live.huawei.com/huaweiconnect/meeting/cn/5859.html'
        },
        HOME_INTRODUCE: {
            INTRO_TITLE: "The Most Innovated OS Open Source Community",
            INTRO_HEAD: "Start your journey in openEuler",
            INTRO_DESCRIPTION: "openEuler is an innovative platform nurtured by community collaboration. It aims to build a unified and open OS that supports multiple processor architectures, and to advance the hardware/software application ecosystem.",
            INTRO_IMG_URL: "",
            INTRO_MAP: [
                {
                    NAME: "01",
                    TITLE: " Download openEuler ISO",
                    IMG: "/img/home/step1.png",
                    GIF: "/img/home/step-move-1.gif",
                    LINK: "/download/",
                },
                {
                    NAME: "02",
                    TITLE: "Experience openEuler System",
                    IMG: "/img/home/step2.png",
                    GIF: "/img/home/step-move-2.gif",
                    LINK: "",
                },
                {
                    NAME: "03",
                    TITLE: "Query openEuler Documentation",
                    IMG: "/img/home/step3.png",
                    GIF: "/img/home/step-move-3.gif",
                    LINK: "/documentation",
                },
                {
                    NAME: "04",
                    TITLE: "Contribution openEuler Community",
                    IMG: "/img/home/step4.png",
                    GIF: "/img/home/step-move-4.gif",
                    LINK: "/community/contribution/",
                },

            ],
            INTRO_MAP_SND: {
                NAME: "02",
                TITLE: "Experience openEuler System",
                IMG: "/img/home/step2.png",
                LINK: "",
                GIF: "/img/home/step-move-2.gif"
            },
            INTRO_GUIDE: {
                INFO: "Choose your favorite experience mode",
                GUIDE_WAY: [
                    {
                        TITLE: "Raspberry Pi",
                        IMG: "/img/home/areaPai.png",
                        LINK:"https://gitee.com/openeuler/raspberrypi"
                    },
                    {
                        TITLE: "Hardware",
                        IMG: "/img/home/areaHardware.svg",
                        LINK:"/en/docs/20.03_LTS/docs/Installation/installation.html"
                    },
                    {
                        TITLE: "VM",
                        IMG: "/img/home/areaVirtual.svg",
                        LINK:"/en/docs/20.03_LTS/docs/Virtualization/virtualization.html"
                    },
                    {
                        TITLE: "ECS",
                        IMG: "/img/home/areaECS.svg",
                        LINK:"https://huaweicloud.com/product/ecs.html"
                    }
                ]
            }
        },
        HOME_ACTIVE: {
            ACTIVE_TITLE: "Join our community activities",
            ACTIVE_DESCRIPTION: "Join us in workshops, SIG discussions, offline activities, and community summits to keep abreast of the latest trend."
        },
        HOME_ROOMS: {
            ROOM_NAME: ["Latest Activity", "Blog", "News"],
            EVENT_NAME: "Latest Activity",
            BLOG_NAME: "Blog",
            NEWS_NAME: "News",
            EVENT_LIST: [
                {
                    TAG: "事件",
                    DATE: "2020-06-07",
                    CONTENT: "吹响开源集结号——”点亮“暑假2020"
                },
                {
                    TAG: "事件",
                    DATE: "2020-01-04",
                    CONTENT: "去HDC.Cloud 2020 参加黑客松， 玩儿openEuler，赢取大礼"
                },
                {
                    TAG: "事件",
                    DATE: "2020-12-10",
                    CONTENT: "HDC.Cloud | openEuler黑客马拉松"
                },
            ],
            NEWS_LIST: [
                {
                    TAG: "极云IT杂谈",
                    DATE: "2020-05-09",
                    CONTENT: "华为OpenEuler操作系统强势来袭，正式开源时代来了？"
                },
                {
                    TAG: "中国网科学频道",
                    DATE: "2020-05-06",
                    CONTENT: "华为联合产业伙伴openEuler2020年峰会成功召开"
                },
                {
                    TAG: "新浪",
                    DATE: "2020-04-12",
                    CONTENT: "openEuler开源路带来多样性计算计算技术与产业生态共荣"
                },
            ],
        },
        HOME_DEV: {
            DEV_TITLE: "Like-Minded Developers",
            DEV_DESCRIPTION: "Gather Here Find the elite developers you are interested in.",
            DEV_INFO: [
                {
                    NAME: "Feng Hu",
                    TITLE: "Application、System-tool、",
                    RANK: "Packaging SIG Maintainer",
                    MAIL_LINK: "solar.hu@huawei.com",
                    GITEE_LINK: "https://gitee.com/solarhu",
                    IMG: "/img/home/developer/hufen.png"
                },
                {
                    NAME: "Kaitian Du",
                    TITLE: "Application、CICD SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dukaitian@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/dukaitian.png"
                },
                {
                    NAME: "Xiaowen He",
                    TITLE: "Packaging SIG、Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "hexiaowen@huawei.com",
                    GITEE_LINK: "https://gitee.com/jimmy_hero",
                    IMG: "/img/home/developer/hexiaowen.png"
                },
                {
                    NAME: "Chunyi Zhu",
                    TITLE: "Packaging SIG、Base-",
                    RANK: "service SIG Maintainer",
                    MAIL_LINK: "zhuchunyi@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhuchunyi",
                    IMG: "/img/home/developer/zhuchunyi.png"
                },
                {
                    NAME: "Xiuqi Xie",
                    TITLE: "Kenel SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiexiuqi@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiexiuqi",
                    IMG: "/img/home/developer/xiexiuqi.png"
                },
                {
                    NAME: "Jian Dong",
                    TITLE: "Packaging SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "dongjian13@huawei.com",
                    GITEE_LINK: "https://gitee.com/dogsheng",
                    IMG: "/img/home/developer/dongjian.png"
                },
                {
                    NAME: "Haomin Tsai",
                    TITLE: "iSulad SIG",
                    RANK: " Maintainer",
                    MAIL_LINK: "caihaomin@huawei.com",
                    GITEE_LINK: "https://gitee.com/caihaomin",
                    IMG: "/img/home/developer/caihaomin.png"
                },
                {
                    NAME: "Feng Li",
                    TITLE: "Container SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lifeng68@huawei.com",
                    GITEE_LINK: "https://gitee.com/lifeng2221dd1",
                    IMG: "/img/home/developer/lifeng.png"
                },
                {
                    NAME: "Hailiang Zhang",
                    TITLE: "Virt SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhang.zhanghailiang@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhanghailiang_lucky",
                    IMG: "/img/home/developer/zhanghailiang.png"
                },
                {
                    NAME: "Xuan Zheng",
                    TITLE: "sig-ai-bigdata SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "sinever@126.com",
                    GITEE_LINK: "gitee.com/sinever",
                    IMG: "/img/home/developer/zhengxian.png"
                },
                {
                    NAME: "Jianwei Zhu",
                    TITLE: "Base-Service SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "zhujianwei7@huawei.com",
                    GITEE_LINK: "https://gitee.com/zhujianwei001",
                    IMG: "/img/home/developer/zhujianwei.png"
                },
                {
                    NAME: "Zhipeng Xie",
                    TITLE: "A-Tune SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "xiezhipeng1@huawei.com",
                    GITEE_LINK: "https://gitee.com/xiezhipeng1",
                    IMG: "/img/home/developer/xiezhipeng.png"
                },
                {
                    NAME: "Wei Xiong",
                    TITLE: "sig-perl-modules/ sig-perl-",
                    RANK: "Modules SIG maintainer",
                    MAIL_LINK: "xiongwei888@huawei.com",
                    GITEE_LINK: "https://gitee.com/myeuler",
                    IMG: "/img/home/developer/xiongwei.png"
                },
                {
                    NAME: "Yanpeng Zhu",
                    TITLE: "sig-release-management",
                    RANK: "SIG Maintainer",
                    MAIL_LINK: "zhuyanpeng@huawei.com",
                    GITEE_LINK: "https://gitee.com/zyp-rock",
                    IMG: "/img/home/developer/zhuyanpeng.png"
                },
                {
                    NAME: "Zhiqiang Liu",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "lzhq28@mail.ustc.edu.cn",
                    GITEE_LINK: "https://gitee.com/liuzhiqiang26",
                    IMG: "/img/home/developer/liuzhiqiang.png"
                },
                {
                    NAME: "Bo Wu",
                    TITLE: "Storage SIG",
                    RANK: "Maintainer",
                    MAIL_LINK: "wubo009@163.com",
                    GITEE_LINK: "https://gitee.com/wubo009",
                    IMG: "/img/home/developer/wubo.png"
                },
            ]
        },
        HOME_AUTH: {
            AUTH_TITLE: "集成与认证",
            AUTH_DESCRIPTION: "集成与认证，就是通过测试，保证上述软件在openEuler操作系统上正常使用，并互相认可（互认证）。",
            AUTH_HARDWARE: "硬件驱动",
            AUTH_OPEN_SOURCE: "开源软件",
            AUTH_FREE: "免费软件",
            AUTH_BUSINESS: "商业软件"
        },
        HOME_SOURCE: {
            SOURCE_TITLE: "More Resources",
            SOURCE_APPLY: {
                TITLE: "Test Resource Application",
                DES: "If there is no test device, you can apply for resources.",
                APPLY: "Here",
                SPONSOR: "Thanks for the sponsorship of Peng Cheng Laboratory.",
                SPONSORLINK:'https://dw.pcl.ac.cn/#/home/index'
            },
            SOURCE_MAIL: {
                TITLE: "E-mail Subscription",
                DES: "Discuss any community topic here.",
                SUBSCRIBE: "For more subscriptions, please click on the ",
                LINK: "mailing list",
                MAIL: "community@openeuler.org"
            },
            SOURCE_PUBLISH_TITLE: "openEuler-based OS Release",
            SOURCE_LINK_TITLE: "Reference Link",
        },
        MORE: "Read More",
        EXPAND: "展开全部",
        RETRACT: "收起全部"
    }
};