/**
 * @file  公共模块国际化配置入口
 * */

module.exports = {
    cn: {
        MEETINGS_TIME: '会议时间：',
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
                OTHER_CHILDREN: [
                    {
                        PATH: '/docs/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: '互动',
                CHILDREN: [{
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
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
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
                CHILDREN: [{
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
                CHILDREN: [{
                        NAME: '漏洞管理',
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
        LANG: '中',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: '源码',
        CODE: '代码',
        GITTE_RESOURCE_LIST: [{
                NAME: '代码仓',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: '软件包仓',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'GitHub镜像仓',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            MAIL: 'contact@openeuler.io',
            COPY_RIGHT: '版权所有 © 2021 openEuler 保留一切权利',
            RIGHT_LIST: [{
                    NAME: '品牌',
                    URL: '/other/brand/'
                },
                {
                    NAME: '隐私政策',
                    URL: '/other/privacy/'
                },
                {
                    NAME: '法律声明',
                    URL: '/other/legal/'
                }
            ],
            QR_CODE: '扫码关注公众号'
        },
        BUILDING:{
            BUILDING:'建设中',
            BUILDINGMES:'敬请期待...'
        }
    },
    en: {
        MEETINGS_TIME: 'Time: ',
        SEARCH_PLACE_HOLDER: 'Input content',
        NAV_ROUTER_CONFIG: [{
                PATH: '/download/',
                NAME: 'Download',
                CHILDREN: [],
                CLASS: []
            },
            {
                PATH: '/documentation/',
                NAME: 'Documentation',
                CHILDREN: [],
                OTHER_CHILDREN: [
                    {
                        PATH: '/docs/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Connect',
                CHILDREN: [{
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
                        NAME: 'Meetups',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: 'Summit',
                        PATH: '/interaction/summit-list/'
                    }
                ],
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
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
                        NAME: 'Convention',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: 'Mailing Lists',
                        PATH: '/community/mailing-list/'
                    },
                    {
                        NAME: 'Certification',
                        PATH: '/community/certification-services/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [{
                        NAME: 'SIG Lists',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: 'Application',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: 'Roles',
                        PATH: '/sig/role-description/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Security',
                CHILDREN: [{
                        NAME: 'Vulnerability Management',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: 'Security Advisories',
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
        LANG: 'English',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: 'Source code',
        CODE: 'CODE',
        GITTE_RESOURCE_LIST: [{
                NAME: 'Code Sources',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: 'Package Sources',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'GitHub Mirror',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            MAIL: 'contact@openeuler.io',
            COPY_RIGHT: 'Copyright © 2021 openEuler. All rights reserved.',
            RIGHT_LIST: [{
                    NAME: 'Trademark',
                    URL: '/other/brand/'
                },
                {
                    NAME: 'Legal Notice',
                    URL: '/other/legal/'
                },
                {
                    NAME: 'Privacy Policy',
                    URL: '/other/privacy/'
                }
            ],
            QR_CODE: 'WeChat Subscription'
        },
        BUILDING:{
            BUILDING:'Building',
            BUILDINGMES:'Coming soon…'
        }
    },
    ru: {
        MEETINGS_TIME: 'Time: ',
        SEARCH_PLACE_HOLDER: 'Введите текст',
        NAV_ROUTER_CONFIG: [{
                PATH: '/download/',
                NAME: 'Загрузить',
                CHILDREN: [],
                CLASS: []
            },
            {
                PATH: '/documentation/',
                NAME: 'Документация',
                CHILDREN: [],
                OTHER_CHILDREN: [
                    {
                        PATH: '/docs/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Подключиться',
                CHILDREN: [{
                        NAME: 'Новости',
                        PATH: '/interaction/news-list/'
                    },
                    {
                        NAME: 'Блог',
                        PATH: '/interaction/blog-list/'
                    },
                    {
                        NAME: 'Прямой эфир',
                        PATH: '/interaction/live-list/'
                    },
                    {
                        NAME: 'Семинары',
                        PATH: '/interaction/salon-list/'
                    },
                    {
                        NAME: 'Саммит',
                        PATH: '/interaction/summit-list/'
                    }
                ],
                OTHER_CHILDREN: [
                    {
                        PATH: '/news/'
                    },
                    {
                        PATH: '/blog/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Сообщество',
                CHILDREN: [{
                        NAME: 'Участие',
                        PATH: '/community/contribution/'
                    },
                    {
                        NAME: 'Кодекс',
                        PATH: '/community/conduct/'
                    },
                    {
                        NAME: 'Списки рассылок',
                        PATH: '/community/mailing-list/'
                    },
                    {
                        NAME: 'Сертификация',
                        PATH: '/community/certification-services/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'SIG',
                CHILDREN: [{
                        NAME: 'Списки SIG',
                        PATH: '/sig/sig-list/'
                    },
                    {
                        NAME: 'Заявка',
                        PATH: '/sig/sig-guidance/'
                    },
                    {
                        NAME: 'Роли',
                        PATH: '/sig/role-description/'
                    }
                ],
                CLASS: []
            },
            {
                PATH: '',
                NAME: 'Безопасность',
                CHILDREN: [{
                        NAME: 'Управление уязвимостями',
                        PATH: '/security/vulnerability-reporting/'
                    },
                    {
                        NAME: 'Консультанты по безопасности',
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
        LANG: 'Русский',
        LANG_LIST: ['中文','English','Русский'],
        GITTE: 'Source code',
        CODE: 'Код',
        GITTE_RESOURCE_LIST: [{
                NAME: 'Источники кода',
                URL: 'https://gitee.com/openeuler'
            },
            {
                NAME: 'Источники пакетов',
                URL: 'https://gitee.com/src-openeuler'
            },
            {
                NAME: 'Зеркало GitHub',
                URL: 'https://github.com/openeuler-mirror'
            }
        ],
        FOOTER: {
            MAIL: 'contact@openeuler.org',
            COPY_RIGHT: 'Авторские права © openEuler 2021. Все права защищены.',
            RIGHT_LIST: [{
                    NAME: 'Товарный знак',
                    URL: '/other/brand/'
                },
                {
                    NAME: 'Правовое уведомление',
                    URL: '/other/legal/'
                },
                {
                    NAME: 'Политика конфиденциальности',
                    URL: '/other/privacy/'
                }
            ],
            QR_CODE: 'Подписка на WeChat'
        },
        BUILDING:{
            BUILDING:'Создание',
            BUILDINGMES:'Ожидается...'
        }
    }
};