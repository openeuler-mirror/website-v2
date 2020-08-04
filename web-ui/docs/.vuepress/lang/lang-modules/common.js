/**
 * @file  公共模块国际化配置入口
 * */

module.exports = {
    cn: {
        SEARCH_PLACE_HOLDER: '输入内容',
        NAV_ROUTER_CONFIG: [{
                PATH: '/download/',
                NAME: '下载',
                CHILDREN: [],
                CLASS: []
            },
            {
                PATH: '/documentation/',
                NAME: '文档',
                CHILDREN: [],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '互动',
                CHILDREN: [
                    {
                        NAME: '新闻',
                        PATH: '/interaction/news-list/'
                    },
                    {
                        NAME: '博客',
                        PATH: '/interaction/blog-list/'
                    },
                    {
                        NAME: '直播',
                        PATH: '/interaction/live-list/'
                    },
                    {
                        NAME: '沙龙',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: '峰会',
                        PATH: '/interaction/summit-list/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '社区',
                CHILDREN: [{
                        NAME: '贡献攻略',
                        PATH: '/community/contribution/'
                    },
                    {
                        NAME: '行为守则',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: '邮件列表',
                        PATH: '/community/mailing-list/'
                    },
                    {
                        NAME: '认证服务',
                        PATH: '/community/certification-services/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [
                    {
                        NAME: '查看SIG',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: '申请流程',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: '角色说明',
                        PATH: '/sig/role-description/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '安全',
                CHILDREN: [
                    {
                        NAME: '漏洞上报',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: '安全公告',
                        PATH: '/security/safety-bulletin/'
                    },
                    {
                        NAME: 'CVE',
                        PATH: '/security/cve/'
                    }
                ],
                CLASS: []
            }
        ],
        LANG: 'EN',
        SEARCH: '搜索',
        GITTE: '源码',
        FOOTER: {
            MAIL: 'contact@openeuler.org',
            COPY_RIGHT: '版权所有 © 2020 openeuler 保留一切权利',
            RIGHT_LIST: ['品牌', '法律声明', '隐私政策'],
            QR_CODE: '扫码关注公众号'
        }
    },
    en: {
        SEARCH_PLACE_HOLDER: 'Input content',
        NAV_ROUTER_CONFIG: [{
            PATH: '/download/',
            NAME: 'Download',
            CHILDREN: [],
            CLASS: []
        },
        {
            PATH: '/documentation/',
            NAME: 'Docs',
            CHILDREN: [],
            CLASS: []
        },
        {
            PATH: '',
            NAME: 'Interaction',
            CHILDREN: [
                {
                    NAME: 'News',
                    PATH: '/interaction/news-list/'
                },
                {
                    NAME: 'Blog',
                    PATH: '/interaction/blog-list/'
                },
                {
                    NAME: 'Live',
                    PATH: '/interaction/live-list/'
                },
                {
                    NAME: 'Salon',
                    PATH: '/interaction/salon-list/'
                },
                {
                    NAME: 'Summit',
                    PATH: '/interaction/summit-list/'
                }
            ],
            CLASS: []
        },
        {
            PATH: '',
            NAME: 'Community',
            CHILDREN: [{
                    NAME: 'Contribution',
                    PATH: '/community/contribution/'
                },
                {
                    NAME: 'Conduct',
                    PATH: '/community/conduct/'
                },
                {
                    NAME: 'Mailing list',
                    PATH: '/community/mailing-list/'
                },
                {
                    NAME: 'Certification services',
                    PATH: '/community/certification-services/'
                }
            ],
            CLASS: []
        },
        {
            PATH: '',
            NAME: 'SIG',
            CHILDREN: [
                {
                    NAME: 'View SIG',
                    PATH: '/sig/sig-list/'
                },
                {
                    NAME: 'SIG guidance',
                    PATH: '/sig/sig-guidance/'
                },
                {
                    NAME: 'Role description',
                    PATH: '/sig/role-description/'
                }
            ],
            CLASS: []
        },
        {
            PATH: '',
            NAME: 'Security',
            CHILDREN: [
                {
                    NAME: 'Vulnerability reporting',
                    PATH: '/security/vulnerability-reporting/'
                },
                {
                    NAME: 'Safety bulletin',
                    PATH: '/security/safety-bulletin/'
                },
                {
                    NAME: 'CVE',
                    PATH: '/security/cve/'
                }
            ],
            CLASS: []
        }
    ],
        LANG: '中',
        SEARCH: 'search',
        GITTE: 'Source code',
        FOOTER: {
            MAIL: 'contact@openeuler.org',
            COPY_RIGHT: 'Copyright © 2020 openEuler. All rights reserved.',
            RIGHT_LIST: ['TradeMark', 'Legal', 'Privacy'],
            QR_CODE: 'Wechat Subscription'
        }
    }
};