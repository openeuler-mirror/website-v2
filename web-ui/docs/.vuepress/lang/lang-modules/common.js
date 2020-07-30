/**
 * @file  公共模块国际化配置入口
 * */

module.exports = {
    cn: {
        searchPlaceholder: '输入内容',
        navRouterConfig: [{
                path: '/download/download',
                name: '下载',
                children: [],
                class: []
            },
            {
                path: '/documentation/documentation',
                name: '文档',
                children: [],
                class: []
            },
            {
                path: '',
                name: '互动',
                children: [
                    {
                        name: '新闻',
                        path: '/interaction/news-list'
                    },
                    {
                        name: '博客',
                        path: '/interaction/blog-list'
                    },
                    {
                        name: '直播',
                        path: '/interaction/live-list'
                    },
                    {
                        name: '沙龙',
                        path: '/interaction/salon-list'
                    },
                    {
                        name: '峰会',
                        path: '/interaction/summit-list'
                    }
                ],
                class: []
            },
            {
                path: '',
                name: '社区',
                children: [{
                        name: '贡献攻略',
                        path: '/community/contribution'
                    },
                    {
                        name: '行为守则',
                        path: '/community/conduct'
                    },
                    {
                        name: '邮件列表',
                        path: '/community/mailing-list'
                    },
                    {
                        name: '认证服务',
                        path: '/community/certification-services'
                    }
                ],
                class: []
            },
            {
                path: '',
                name: 'SIG',
                children: [
                    {
                        name: '查看SIG',
                        path: '/sig/sig-list'
                    },
                    {
                        name: '申请流程',
                        path: '/sig/sig-guidance'
                    },
                    {
                        name: '角色说明',
                        path: '/sig/role-description'
                    }
                ],
                class: []
            },
            {
                path: '',
                name: '安全',
                children: [
                    {
                        name: '漏洞上报',
                        path: '/security/vulnerability-reporting'
                    },
                    {
                        name: '安全公告',
                        path: '/security/safety-bulletin'
                    },
                    {
                        name: 'CVE',
                        path: '/security/cve'
                    }
                ],
                class: []
            }
        ],
        lang: 'EN',
        search: '搜索',
        gitte: '码云',
        footer: {
            leftLogo: 'openEuler',
            mail: 'contact@openeuler.org',
            copyright: '版权所有 © 2020 openeuler 保留一切权利',
            rightList: ['品牌', '法律声明', '隐私政策']
        }
    },
    en: {
        searchPlaceholder: 'Input content',
        navRouterConfig: [{
            path: '/download/download',
            name: 'Download',
            children: [],
            class: []
        },
        {
            path: '/documentation/documentation',
            name: 'Docs',
            children: [],
            class: []
        },
        {
            path: '',
            name: 'Interaction',
            children: [
                {
                    name: 'News',
                    path: '/interaction/news-list'
                },
                {
                    name: 'Blog',
                    path: '/interaction/blog-list'
                },
                {
                    name: 'Live',
                    path: '/interaction/live-list'
                },
                {
                    name: 'Salon',
                    path: '/interaction/salon-list'
                },
                {
                    name: 'Summit',
                    path: '/interaction/summit-list'
                }
            ],
            class: []
        },
        {
            path: '',
            name: 'Community',
            children: [{
                    name: 'Contribution',
                    path: '/community/contribution'
                },
                {
                    name: 'Conduct',
                    path: '/community/conduct'
                },
                {
                    name: 'Mailing list',
                    path: '/community/mailing-list'
                },
                {
                    name: 'Certification services',
                    path: '/community/certification-services'
                }
            ],
            class: []
        },
        {
            path: '',
            name: 'SIG',
            children: [
                {
                    name: 'View SIG',
                    path: '/sig/sig-list'
                },
                {
                    name: 'SIG guidance',
                    path: '/sig/sig-guidance'
                },
                {
                    name: 'Role description',
                    path: '/sig/role-description'
                }
            ],
            class: []
        },
        {
            path: '',
            name: 'Security',
            children: [
                {
                    name: 'Vulnerability reporting',
                    path: '/security/vulnerability-reporting'
                },
                {
                    name: 'Safety bulletin',
                    path: '/security/safety-bulletin'
                },
                {
                    name: 'CVE',
                    path: '/security/cve'
                }
            ],
            class: []
        }
    ],
        lang: '中',
        search: 'search',
        gitte: 'gitte',
        footer: {
            mail: 'contact@openeuler.org',
            copyright: 'Copyright © 2020 openEuler. All rights reserved.',
            rightList: ['TradeMark', 'Legal', 'Privacy']
        }
    }
};