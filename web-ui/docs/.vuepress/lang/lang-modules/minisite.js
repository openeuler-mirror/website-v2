/**
 * @file  minisite页面国际化配置入口
 * */

module.exports = {
    cn: {
        ATUNE_BANNER_TEXT: ['A-Tune','一款基于AI开发的智能优化引擎'],
        ATUNE_BANNER_IMG: '/img/minisite/atune/mobile-banner.png',
        ATUNE_DESC: 'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。',
        ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
        ATUNE_MB_MAIL: ['mail to:','a-tune@openeuler.org'],
        ATUNE_NAV_TEXT: ['架构','文档'],
        ATUNE_LINK: [
            {
                IMG:'/img/minisite/atune/zh-start.png',
                LINK:'https://gitee.com/openeuler/A-Tune',
                SHOW: false
            },
            {
                IMG:'/img/minisite/atune/zh-speak.png',
                LINK:'mail',
                SHOW: true
            },
            {
                IMG:'/img/minisite/atune/zh-join.png',
                LINK:'https://gitee.com/openeuler/A-Tune-UI',
                SHOW: false
            }
        ],
        ATUNE_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            DESC_LIST: [
                'A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。',
                '智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。',
                '系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。',
                '交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。',
                '优化模型库：包含10大类20+款应用场景的优化配置'
            ],
            FRAMEWORK_IMG: '/img/minisite/atune/framework.png'
        },
        ATUNE_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            DOCS_LIST: [
                {
                    IMG: '/img/minisite/atune/know.png',
                    TITLE: '认识A-Tune',
                    DESC: '查看A-Tune的简介、架构。了解其支持特性与业务模型。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md'
                },
                {
                    IMG: '/img/minisite/atune/install.png',
                    TITLE: '安装与部署',
                    DESC: '了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md'
                },
                {
                    IMG: '/img/minisite/atune/use.png',
                    TITLE: '使用方法',
                    DESC: '本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md'
                },
                {
                    IMG: '/img/minisite/atune/problem.png',
                    TITLE: '常见问题',
                    DESC: '点击查看A-Tune常见问题，在这里您可以获取解决方案。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md'
                }
            ]
        },

        ISULA_BANNER_TEXT: ['iSula','小个头 大能量'],
        ISULA_BANNER_IMG: '/img/minisite/isula/mobile-banner.png',
        ISULA_LOGO: '/img/minisite/isula/isula-logo.png',
        ISULA_DESC_UP: "iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。",
        ISULA_DESC_DOWN: ['目前 iSula 家族提供了如下组件:','iSulad：容器引擎，提供容器的全生命周期管理，北向兼容Kubernetes的CRI接口，南向兼容OCI 生态。','isula-build：容器镜像构建工具，提供快速构建容器镜像的能力。','isula-transform：容器迁移工具，提供Docker容器冷迁移至iSulad的能力。'],
        ISULA_DESC_IMG: '/img/minisite/isula/zh-desc.png',
        ISULA_MAIL: 'mail to:isulad@openeuler.org',
        ISULA_MB_MAIL: ['mail to:','isulad@openeuler.org'],
        ISULA_NAV_TEXT: ['架构','文档'],
        ISULA_LINK: [
            {
                IMG:'/img/minisite/isula/zh-start.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
                SHOW: false
            },
            {
                IMG:'/img/minisite/isula/zh-speak.png',
                LINK:'mail',
                SHOW: true
            }
        ],
        ISULA_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }    
            ],
            ISULAD: {
                DESC_LIST: [
                    'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
                    'iSulad 的特点如下:',
                    '轻量语言：C/C++，Rust on the way',
                    '北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行',
                    '南向接口：支持OCI runtime和镜像规范，支持平滑替换',
                    '容器形态：支持系统容器、虚机容器等多种容器形态',
                    '扩展能力：提供插件化架构，可根据用户需要开发定制化插件',
                    '以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。'
                ],
                FRAMEWORK_TITLE: 'iSulad 系统架构如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-1.png'
            },
            ISULAD_BUILD: {
                DESC_LIST: ['isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。','构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。'],
                FRAMEWORK_TITLE: 'isula-build的架构图如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-2.png'
            },
            ISULAD_TRANSFORM: {
                DESC_LIST: ['isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。'],
                FRAMEWORK_IMG: '/img/minisite/isula/isula-3.png'
            }
        },
        ISULA_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }
            ],
            ISULAD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/desc.png',
                    DESC: [
                        {
                            TEXT:'架构说明',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/compile.png',
                    DESC: [
                        {
                            TEXT:'编译手册',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md'
                        },
                        {
                            TEXT:'在risc-v上面',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md'
                        },
                        {
                            TEXT:'与k8s/CNI集成',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md'
                        }
                    ]
                }
            ],
            ISULAD_BUILD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/use.png',
                    DESC: [
                        {
                            TEXT:'使用手册',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md'
                        }
                    ]
                }
            ],
            ISULAD_TRANSFORM: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md'
                        }
                    ]
                }
            ]
        },

        SVIRT_BANNER_TEXT: ['StratoVirt','面向云数据中心的企业级虚拟化平台'],
        SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
        SVIRT_DESC: ['StratoVirt是面向云数据中心的企业级虚拟化平台，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。','StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。'],
        SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
        SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
        SVIRT_NAV_TEXT: ['特征','架构','文档'],
        SVIRT_LINK: [
            {
                IMG:'/img/minisite/svirt/zh-start.png',
                LINK:'https://gitee.com/openeuler/stratovirt'
            },
            {
                IMG:'/img/minisite/svirt/zh-speak.png',
                LINK:'https://gitee.com/openeuler/stratovirt/issues'
            },
            {
                IMG:'/img/minisite/svirt/zh-join.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/Virt'
            }],
        SVIRT_CHARACTER: {
            TITLE_OUTSIDE: '特征',
            TITLE_INSIDE: 'FEATURE',
            CHARACTER_TEXT: 'StratoVirt是openEuler最稳定、最坚固的保护层。它重构了openEuler虚拟化底座，具有以下六大技术特点。',
            CHARACTER_LIST: [
                {
                    IMG: '/img/minisite/svirt/safety.png',
                    TITLE: '强安全性',
                    DESC: '采用Rust语言，支持seccomp，实现多租户安全隔离'
                },
                {
                    IMG: '/img/minisite/svirt/low-noise.png',
                    TITLE: '轻量低噪',
                    DESC: '采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载'
                },
                {
                    IMG: '/img/minisite/svirt/flex.png',
                    TITLE: '极速伸缩',
                    DESC: '毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力'
                },
                {
                    IMG: '/img/minisite/svirt/with.png',
                    TITLE: '软硬协同',
                    DESC: '同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速'
                },
                {
                    IMG: '/img/minisite/svirt/extend.png',
                    TITLE: '高扩展性',
                    DESC: '设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机'
                },
                {
                    IMG: '/img/minisite/svirt/strengthen.png',
                    TITLE: '异构增强',
                    DESC: '除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配'
                }
            ]
        },
        SVIRT_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            LEFT_IMG: '/img/minisite/svirt/pc-fwork.png',
            RIGHT_TEXT: ['StratoVirt核心架构自顶向下分为三层：','OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。','BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。','MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。']
        },
        SVIRT_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            LIST: [
                {
                    ICON: '/img/minisite/svirt/doc-introduct.png',
                    TEXT: 'StratoVirt介绍',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-install.png',
                    TEXT: '安装StratoVirt',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-ready.png',
                    TEXT: '准备使用环境',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-virtual.png',
                    TEXT: '虚拟机配置',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-source.png',
                    TEXT: '虚拟机管理',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-box.png',
                    TEXT: '对接iSula安全容器',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md'
                }
            ]
        }

    },
    en: {
        ATUNE_BANNER_TEXT: ['A-Tune','一款基于AI开发的智能优化引擎'],
        ATUNE_BANNER_IMG: '/img/minisite/atune/mobile-banner.png',
        ATUNE_DESC: 'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。',
        ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
        ATUNE_MB_MAIL: ['mail to:','a-tune@openeuler.org'],
        ATUNE_NAV_TEXT: ['架构','文档'],
        ATUNE_LINK: [
            {
                IMG:'/img/minisite/atune/zh-start.png',
                LINK:'https://gitee.com/openeuler/A-Tune',
                SHOW: false
            },
            {
                IMG:'/img/minisite/atune/zh-speak.png',
                LINK:'mail',
                SHOW: true
            },
            {
                IMG:'/img/minisite/atune/zh-join.png',
                LINK:'https://gitee.com/openeuler/A-Tune-UI',
                SHOW: false
            }
        ],
        ATUNE_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            DESC_LIST: [
                'A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。',
                '智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。',
                '系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。',
                '交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。',
                '优化模型库：包含10大类20+款应用场景的优化配置'
            ],
            FRAMEWORK_IMG: '/img/minisite/atune/framework.png'
        },
        ATUNE_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            DOCS_LIST: [
                {
                    IMG: '/img/minisite/atune/know.png',
                    TITLE: '认识A-Tune',
                    DESC: '查看A-Tune的简介、架构。了解其支持特性与业务模型。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md'
                },
                {
                    IMG: '/img/minisite/atune/install.png',
                    TITLE: '安装与部署',
                    DESC: '了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md'
                },
                {
                    IMG: '/img/minisite/atune/use.png',
                    TITLE: '使用方法',
                    DESC: '本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md'
                },
                {
                    IMG: '/img/minisite/atune/problem.png',
                    TITLE: '常见问题',
                    DESC: '点击查看A-Tune常见问题，在这里您可以获取解决方案。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md'
                }
            ]
        },

        ISULA_BANNER_TEXT: ['iSula','小个头 大能量'],
        ISULA_BANNER_IMG: '/img/minisite/isula/mobile-banner.png',
        ISULA_LOGO: '/img/minisite/isula/isula-logo.png',
        ISULA_DESC_UP: "iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。",
        ISULA_DESC_DOWN: ['目前 iSula 家族提供了如下组件:','iSulad：容器引擎，提供容器的全生命周期管理，北向兼容Kubernetes的CRI接口，南向兼容OCI 生态。','isula-build：容器镜像构建工具，提供快速构建容器镜像的能力。','isula-transform：容器迁移工具，提供Docker容器冷迁移至iSulad的能力。'],
        ISULA_DESC_IMG: '/img/minisite/isula/zh-desc.png',
        ISULA_MAIL: 'mail to:isulad@openeuler.org',
        ISULA_MB_MAIL: ['mail to:','isulad@openeuler.org'],
        ISULA_NAV_TEXT: ['架构','文档'],
        ISULA_LINK: [
            {
                IMG:'/img/minisite/isula/zh-start.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
                SHOW: false
            },
            {
                IMG:'/img/minisite/isula/zh-speak.png',
                LINK:'mail',
                SHOW: true
            }
        ],
        ISULA_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }    
            ],
            ISULAD: {
                DESC_LIST: [
                    'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
                    'iSulad 的特点如下:',
                    '轻量语言：C/C++，Rust on the way',
                    '北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行',
                    '南向接口：支持OCI runtime和镜像规范，支持平滑替换',
                    '容器形态：支持系统容器、虚机容器等多种容器形态',
                    '扩展能力：提供插件化架构，可根据用户需要开发定制化插件',
                    '以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。'
                ],
                FRAMEWORK_TITLE: 'iSulad 系统架构如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-1.png'
            },
            ISULAD_BUILD: {
                DESC_LIST: ['isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。','构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。'],
                FRAMEWORK_TITLE: 'isula-build的架构图如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-2.png'
            },
            ISULAD_TRANSFORM: {
                DESC_LIST: ['isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。'],
                FRAMEWORK_IMG: '/img/minisite/isula/isula-3.png'
            }
        },
        ISULA_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }
            ],
            ISULAD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/desc.png',
                    DESC: [
                        {
                            TEXT:'架构说明',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/compile.png',
                    DESC: [
                        {
                            TEXT:'编译手册',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md'
                        },
                        {
                            TEXT:'在risc-v上面',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md'
                        },
                        {
                            TEXT:'与k8s/CNI集成',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md'
                        }
                    ]
                }
            ],
            ISULAD_BUILD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/use.png',
                    DESC: [
                        {
                            TEXT:'使用手册',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md'
                        }
                    ]
                }
            ],
            ISULAD_TRANSFORM: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md'
                        }
                    ]
                }
            ]
        },

        SVIRT_BANNER_TEXT: ['StratoVirt','面向云数据中心的企业级虚拟化平台'],
        SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
        SVIRT_DESC: ['StratoVirt是面向云数据中心的企业级虚拟化平台，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。','StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。'],
        SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
        SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
        SVIRT_NAV_TEXT: ['特征','架构','文档'],
        SVIRT_LINK: [
            {
                IMG:'/img/minisite/svirt/zh-start.png',
                LINK:'https://gitee.com/openeuler/stratovirt'
            },
            {
                IMG:'/img/minisite/svirt/zh-speak.png',
                LINK:'https://gitee.com/openeuler/stratovirt/issues'
            },
            {
                IMG:'/img/minisite/svirt/zh-join.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/Virt'
            }],
        SVIRT_CHARACTER: {
            TITLE_OUTSIDE: '特征',
            TITLE_INSIDE: 'FEATURE',
            CHARACTER_TEXT: 'StratoVirt是openEuler最稳定、最坚固的保护层。它重构了openEuler虚拟化底座，具有以下六大技术特点。',
            CHARACTER_LIST: [
                {
                    IMG: '/img/minisite/svirt/safety.png',
                    TITLE: '强安全性',
                    DESC: '采用Rust语言，支持seccomp，实现多租户安全隔离'
                },
                {
                    IMG: '/img/minisite/svirt/low-noise.png',
                    TITLE: '轻量低噪',
                    DESC: '采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载'
                },
                {
                    IMG: '/img/minisite/svirt/flex.png',
                    TITLE: '极速伸缩',
                    DESC: '毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力'
                },
                {
                    IMG: '/img/minisite/svirt/with.png',
                    TITLE: '软硬协同',
                    DESC: '同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速'
                },
                {
                    IMG: '/img/minisite/svirt/extend.png',
                    TITLE: '高扩展性',
                    DESC: '设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机'
                },
                {
                    IMG: '/img/minisite/svirt/strengthen.png',
                    TITLE: '异构增强',
                    DESC: '除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配'
                }
            ]
        },
        SVIRT_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            LEFT_IMG: '/img/minisite/svirt/pc-fwork.png',
            RIGHT_TEXT: ['StratoVirt核心架构自顶向下分为三层：','OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。','BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。','MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。']
        },
        SVIRT_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            LIST: [
                {
                    ICON: '/img/minisite/svirt/doc-introduct.png',
                    TEXT: 'StratoVirt介绍',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-install.png',
                    TEXT: '安装StratoVirt',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-ready.png',
                    TEXT: '准备使用环境',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-virtual.png',
                    TEXT: '虚拟机配置',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-source.png',
                    TEXT: '虚拟机管理',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-box.png',
                    TEXT: '对接iSula安全容器',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md'
                }
            ]
        }
    },
    ru: {
        ATUNE_BANNER_TEXT: ['A-Tune','一款基于AI开发的智能优化引擎'],
        ATUNE_BANNER_IMG: '/img/minisite/atune/mobile-banner.png',
        ATUNE_DESC: 'A-Tune是一款基于openEuler开发的，自动化、智能化性能调优引擎。它利用人工智能技术，对运行在操作系统上的业务建立精准模型，动态感知业务特征并推理出具体应用，根据业务负载情况动态调节并给出最佳的参数配置组合，从而使业务处于最佳运行状态。',
        ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
        ATUNE_MB_MAIL: ['mail to:','a-tune@openeuler.org'],
        ATUNE_NAV_TEXT: ['架构','文档'],
        ATUNE_LINK: [
            {
                IMG:'/img/minisite/atune/zh-start.png',
                LINK:'https://gitee.com/openeuler/A-Tune',
                SHOW: false
            },
            {
                IMG:'/img/minisite/atune/zh-speak.png',
                LINK:'mail',
                SHOW: true
            },
            {
                IMG:'/img/minisite/atune/zh-join.png',
                LINK:'https://gitee.com/openeuler/A-Tune-UI',
                SHOW: false
            }
        ],
        ATUNE_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            DESC_LIST: [
                'A-Tune主要包括在线时静态调优和离线时动态调优两大核心能力，整体架构包括智能决策、系统画像和交互系统三层。',
                '智能决策层：包含感知和决策两个子系统，分别完成对应用的智能感知和对系统的调优决策。',
                '系统画像层：主要包括自动特征工程和两层分类模型，自动特征工程用于业务特征的自动选择，两层分类模型用于业务模型的学习和分类。',
                '交互系统层：用于各类系统资源的监控和配置，调优策略执行在本层进行。',
                '优化模型库：包含10大类20+款应用场景的优化配置'
            ],
            FRAMEWORK_IMG: '/img/minisite/atune/framework.png'
        },
        ATUNE_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            DOCS_LIST: [
                {
                    IMG: '/img/minisite/atune/know.png',
                    TITLE: '认识A-Tune',
                    DESC: '查看A-Tune的简介、架构。了解其支持特性与业务模型。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md'
                },
                {
                    IMG: '/img/minisite/atune/install.png',
                    TITLE: '安装与部署',
                    DESC: '了解安装A-Tune的软硬件要求与环境准备，学习安装、部署和启动A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md'
                },
                {
                    IMG: '/img/minisite/atune/use.png',
                    TITLE: '使用方法',
                    DESC: '本章介绍A-Tune客户端包含的功能和使用方法。学习用命令行使用A-Tune。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md'
                },
                {
                    IMG: '/img/minisite/atune/problem.png',
                    TITLE: '常见问题',
                    DESC: '点击查看A-Tune常见问题，在这里您可以获取解决方案。',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md'
                }
            ]
        },

        ISULA_BANNER_TEXT: ['iSula','小个头 大能量'],
        ISULA_BANNER_IMG: '/img/minisite/isula/mobile-banner.png',
        ISULA_LOGO: '/img/minisite/isula/isula-logo.png',
        ISULA_DESC_UP: "iSula /'i.zu.la/，华为容器技术方案品牌。其原意是一种非常强大的蚂蚁，学术上称为“子弹蚁”，因为被它咬一口，犹如被子弹打到那般疼痛。iSula是世界上强大的昆虫之一。华为容器技术方案品牌因其“小个头、大能量”的含义而取名。",
        ISULA_DESC_DOWN: ['目前 iSula 家族提供了如下组件:','iSulad：容器引擎，提供容器的全生命周期管理，北向兼容Kubernetes的CRI接口，南向兼容OCI 生态。','isula-build：容器镜像构建工具，提供快速构建容器镜像的能力。','isula-transform：容器迁移工具，提供Docker容器冷迁移至iSulad的能力。'],
        ISULA_DESC_IMG: '/img/minisite/isula/zh-desc.png',
        ISULA_MAIL: 'mail to:isulad@openeuler.org',
        ISULA_MB_MAIL: ['mail to:','isulad@openeuler.org'],
        ISULA_NAV_TEXT: ['架构','文档'],
        ISULA_LINK: [
            {
                IMG:'/img/minisite/isula/zh-start.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
                SHOW: false
            },
            {
                IMG:'/img/minisite/isula/zh-speak.png',
                LINK:'mail',
                SHOW: true
            }
        ],
        ISULA_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }    
            ],
            ISULAD: {
                DESC_LIST: [
                    'iSulad 是一个新的通用容器引擎，提供统一的架构设计来满足CT和IT领域的不同需求。它具有轻、快、 易、灵的特点，这与子弹蚂蚁"小个头、大能量"的形象不谋而合。',
                    'iSulad 的特点如下:',
                    '轻量语言：C/C++，Rust on the way',
                    '北向接口：提供CRI接口，支持对接Kubernets;同时提供便捷使用的命令行',
                    '南向接口：支持OCI runtime和镜像规范，支持平滑替换',
                    '容器形态：支持系统容器、虚机容器等多种容器形态',
                    '扩展能力：提供插件化架构，可根据用户需要开发定制化插件',
                    '以上的特点使得 iSulad 可以不受硬件规格和架构的限制，更小的底噪开销也使得它的可应用领域更为广泛。'
                ],
                FRAMEWORK_TITLE: 'iSulad 系统架构如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-1.png'
            },
            ISULAD_BUILD: {
                DESC_LIST: ['isula-build 通常运行于构建侧环境，为运行侧环境提供构建好的容器镜像。','构建时，isula-build读取Dockerfile作为输入，快速构建符合Docker镜像和OCI镜像规范的容器镜像，最后将镜像分发至同节点的iSulad/docker、本地tar包或远端容器镜像仓库。'],
                FRAMEWORK_TITLE: 'isula-build的架构图如下：',
                FRAMEWORK_IMG: '/img/minisite/isula/isula-2.png'
            },
            ISULAD_TRANSFORM: {
                DESC_LIST: ['isula-transform 配合 iSulad 2.0 推出，支持将 Docker 容器引擎管理的容器转换、迁移给 iSulad 引擎进行管理。迁移完成后，就可以通过 iSulad 完成容器的生命周期管理功能。'],
                FRAMEWORK_IMG: '/img/minisite/isula/isula-3.png'
            }
        },
        ISULA_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            TAB: [
                {
                    KEY: 'ISULAD',
                    VALUE: 'iSulad'
                },
                {
                    KEY: 'ISULAD_BUILD',
                    VALUE: 'isula-build'
                },
                {
                    KEY: 'ISULAD_TRANSFORM',
                    VALUE: 'isula-transform'
                }
            ],
            ISULAD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/desc.png',
                    DESC: [
                        {
                            TEXT:'架构说明',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/architecture_zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/compile.png',
                    DESC: [
                        {
                            TEXT:'编译手册',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_zh.md'
                        },
                        {
                            TEXT:'在risc-v上面',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide_riscv.md'
                        },
                        {
                            TEXT:'与k8s/CNI集成',
                            LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/integration.md'
                        }
                    ]
                }
            ],
            ISULAD_BUILD: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md'
                        }
                    ]
                },
                {
                    IMG: '/img/minisite/isula/use.png',
                    DESC: [
                        {
                            TEXT:'使用手册',
                            LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md'
                        }
                    ]
                }
            ],
            ISULAD_TRANSFORM: [
                {
                    IMG: '/img/minisite/isula/readme.png',
                    DESC: [
                        {
                            TEXT:'README',
                            LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md'
                        }
                    ]
                }
            ]
        },

        SVIRT_BANNER_TEXT: ['StratoVirt','面向云数据中心的企业级虚拟化平台'],
        SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
        SVIRT_DESC: ['StratoVirt是面向云数据中心的企业级虚拟化平台，实现一套架构对虚拟机、容器、Serverless三种场景的统一支持。在轻量低噪、软硬协同、Rust语言级安全等方面具备关键技术竞争优势。','StratoVirt在架构设计上预留了组件化拼装的能力和接口，可以按需灵活组装高级特性直至演化到支持标准虚拟化，在特性需求、应用场景和轻快灵巧之间找到最佳的平衡点。'],
        SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
        SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
        SVIRT_NAV_TEXT: ['特征','架构','文档'],
        SVIRT_LINK: [
            {
                IMG:'/img/minisite/svirt/zh-start.png',
                LINK:'https://gitee.com/openeuler/stratovirt'
            },
            {
                IMG:'/img/minisite/svirt/zh-speak.png',
                LINK:'https://gitee.com/openeuler/stratovirt/issues'
            },
            {
                IMG:'/img/minisite/svirt/zh-join.png',
                LINK:'https://gitee.com/openeuler/community/tree/master/sig/Virt'
            }],
        SVIRT_CHARACTER: {
            TITLE_OUTSIDE: '特征',
            TITLE_INSIDE: 'FEATURE',
            CHARACTER_TEXT: 'StratoVirt是openEuler最稳定、最坚固的保护层。它重构了openEuler虚拟化底座，具有以下六大技术特点。',
            CHARACTER_LIST: [
                {
                    IMG: '/img/minisite/svirt/safety.png',
                    TITLE: '强安全性',
                    DESC: '采用Rust语言，支持seccomp，实现多租户安全隔离'
                },
                {
                    IMG: '/img/minisite/svirt/low-noise.png',
                    TITLE: '轻量低噪',
                    DESC: '采用极简设备模型时，启动时间<50ms，内存底噪<4M，支持Serverless负载'
                },
                {
                    IMG: '/img/minisite/svirt/flex.png',
                    TITLE: '极速伸缩',
                    DESC: '毫秒级设备扩缩能力，为轻量化负载提供灵活的资源伸缩能力'
                },
                {
                    IMG: '/img/minisite/svirt/with.png',
                    TITLE: '软硬协同',
                    DESC: '同时支持x86的VT和鲲鹏的Kunpeng-V，实现多体系硬件加速'
                },
                {
                    IMG: '/img/minisite/svirt/extend.png',
                    TITLE: '高扩展性',
                    DESC: '设备模型可扩展，支持PCI等复杂设备规范，实现标准虚拟机'
                },
                {
                    IMG: '/img/minisite/svirt/strengthen.png',
                    TITLE: '异构增强',
                    DESC: '除支持常用的硬件SR-IOV直通方案，结合昇腾软件定义能力，实现更灵活异构算力分配'
                }
            ]
        },
        SVIRT_FRAMEWORK: {
            TITLE_OUTSIDE: '架构',
            TITLE_INSIDE: 'ARCHITECTURE',
            LEFT_IMG: '/img/minisite/svirt/pc-fwork.png',
            RIGHT_TEXT: ['StratoVirt核心架构自顶向下分为三层：','OCI兼容接口：兼容QMP（QEMU Machine Protocol）协议，具有完备的OCI兼容能力。','BootLoader：抛弃传统BIOS+GRUB的启动模式，实现了更轻更快的启动流程。','MicroVM：虚拟化层，充分利用软硬协同能力，精简化设备模型；低时延资源伸缩能力。']
        },
        SVIRT_DOCUMENT: {
            TITLE_OUTSIDE: '文档',
            TITLE_INSIDE: 'DOCUMENTATION',
            LIST: [
                {
                    ICON: '/img/minisite/svirt/doc-introduct.png',
                    TEXT: 'StratoVirt介绍',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-install.png',
                    TEXT: '安装StratoVirt',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-ready.png',
                    TEXT: '准备使用环境',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-virtual.png',
                    TEXT: '虚拟机配置',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-source.png',
                    TEXT: '虚拟机管理',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md'
                },
                {
                    ICON: '/img/minisite/svirt/doc-box.png',
                    TEXT: '对接iSula安全容器',
                    LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md'
                }
            ]
        }
    }
}