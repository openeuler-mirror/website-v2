/**
 * @file  下载模块国际化配置入口
 * */

module.exports = {
    cn: {
        COMPATIBILITY: '兼容性列表',
        HARDWARE: '硬件',
        DRIVE: '驱动',
        OS: '操作系统',
        ARCHITECTURE: '架构',
        SELECT_PLACEHOLDER: '请选择',
        SEARCH_ALL:'全部',
        SEARCH_LABEL: "搜索",
        HARDWARE_SEARCH_PLACEHOLDER: "请输入关键字",
        DRIVE_SEARCH_PLACEHOLDER:'请输入关键字',
        LINK: 'link',
        HARDWARE_TABLE_COLUMN: {
            VENDOR: '硬件厂家',
            MODEL: '硬件型号',
            OS: '操作系统',
            DATE: '日期',
            COMPATIBILITY_CONFIGURATION: '兼容性配置',
            COMPATIBILITY_CONFIGURATION2: 'Compatibility Configuration',
            REFERRENCE: '友情链接'
        },
        DRIVE_TABLE_COLUMN: {
            ARCHITECTURE: '架构',
            DRIVE_NAME: '驱动名称',
            VERSION: '版本',
            TYPE: '类型',
            DRIVE_DATE: 'Driver Date',
            SHA_256_DRIVER: 'SHA 256 Driver',
            SIZE: '大小 (Byte)',
            CHIP_VENDOR: '芯片厂家',
            BOARD_MODEL: '板卡型号',
            CHIP_MODEL: '芯片型号'
        },
        HARDWARE_DETAIL: {
            TITLE_1: 'Product Information',
            TITLE_2: 'Configuration',
            TITLE_3: 'Adapter and Drivers',
            TIP_LABEL: '此配置为兼容性测试时的配置信息，更多的配置差异兼容性参考',
            TIP_LINK: '《openEuler 兼容性策略文档》',
            LABELS: {
                OS: 'OS/OS Version',
                VENDOR: 'Vendor',
                TEST_TIME: 'Test Time',
                COMMIT_ID: 'Commit ID',
                ARCHITECTURE: 'Architecture',
                MOTHER_BOARD_REVISION: 'Mother Board Revision',
                BIOS_UEFI: 'BIOS/UEFI',
                CPU: 'CPU',
                RAM: 'RAM',
                PORTS_AND_BUS_TYPES: 'Ports and Bus Types',
                VIDEO_ADAPTER: 'Video Adapter',
                HOST_BUS_ADAPTER: 'Host Bus Adapter',
                HARD_DISK_DRIVE: 'Hard Disk Drive',
            },
            TABLE_CULUMN: {
                DRIVE_NAME: 'Driver Name',
                VERSION: 'Version',
                TYPE: 'Type',
                DRIVE_DATE: 'Driver Date',
                SHA_256: 'SHA 256',
                DRIVER_SIZE: 'Size (Byte)'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见',
            TITLE: 'openEuler 硬件兼容性测试整体介绍',
            DISCRIPTION_TITLE: '简介',
            DISCRIPTION_CONTENT: '关于openEuler与硬件兼容性，openEuler提供了一系列的工具、指导文档以及整套流程。如果您需要对服务器等硬件展开兼容性测试。可遵循如下流程进行，整理流程说明如下',
            PROCESS_TITLE:'兼容性测试流程',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'申请兼容性测试',
                DESCRIPTION_1:'您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性申请，邮件标题需要注明“申请硬件兼容性测试”。收到邮件后，openEuler团队会与您沟通并在线下签署协议。'
            },{
                ID:'02',
                TITLE:'了解兼容性策略',
                DESCRIPTION_1:'在开展兼容性测试前，您需要详细了解openEuler硬件兼容性策略的说明，',
                A_TEXT:'点击此处获取文档。',
            },{
                ID:'03',
                TITLE:'创建issue',
                DESCRIPTION_1:'完成协议签署后，您需要在openEuler社区（',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:'）的oech项目下创建issue，将所需要认证的硬件信息在issue中明确。openEuler团队会及时了解issue的信息，并提出建议。'
            },{
                ID:'04',
                TITLE:'测试兼容性',
                DESCRIPTION_1:'完成issue创建后，即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及使用指南，您可以根据使用指南自助完成兼容性测试。',
                A_TEXT:'点击此处下载兼容性测试工具套件',
                A_TEXT_2:'点击此处获取使用指南',
                DESCRIPTION_2:'|'
            }, {
                ID:'05',
                TITLE:'提交结果审核',
                DESCRIPTION_1:'完成兼容性测试套测试并通过后，需要您把测试结果更新到issue中。并且按照兼容性测试指南将对应测试结果发送给公共邮箱：您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”。'
            }, {
                ID:'06',
                TITLE:'结果发布',
                DESCRIPTION_1:'openEuler团队会针对提交结果进行审核，如果通过，会将硬件添加到',
                A_TEXT:'兼容性清单',
                DESCRIPTION_2:'中'
            }]
        },
    },
    en: {
        COMPATIBILITY: 'Compatibility List',
        HARDWARE: 'Hardware',
        DRIVE: 'Drive',
        OS: 'OS',
        ARCHITECTURE: 'Architecture',
        SELECT_PLACEHOLDER: 'Select',
        SEARCH_ALL:'ALL',
        SEARCH_LABEL: "Search",
        HARDWARE_SEARCH_PLACEHOLDER:'Vendor or Model or OS',
        DRIVE_SEARCH_PLACEHOLDER:'Driver Name or Board Size',
        LINK: 'link',
        HARDWARE_TABLE_COLUMN: {
            VENDOR: 'Vendor',
            MODEL: 'Model',
            OS: 'OS',
            DATE: 'Date',
            COMPATIBILITY_CONFIGURATION: 'Compatibility Configuration',
            COMPATIBILITY_CONFIGURATION2: 'Compatibility Configuration',
            REFERRENCE: 'Reference'
        },
        DRIVE_TABLE_COLUMN: {
            ARCHITECTURE: 'Architecture',
            DRIVE_NAME: 'Driver Name',
            VERSION: 'Version',
            TYPE: 'Type',
            DRIVE_DATE: 'Driver Date',
            SHA_256_DRIVER: 'SHA 256 Driver',
            SIZE: 'Size (Byte)',
            CHIP_VENDOR: 'Chip Vendor',
            BOARD_MODEL: 'Plug-in Card Model',
            CHIP_MODEL: 'Chip Model'
        },
        HARDWARE_DETAIL: {
            TITLE_1: 'Product Information',
            TITLE_2: 'Configuration',
            TITLE_3: 'Adapter and Drivers',
            TIP_LABEL: 'This configuration is used during the compatibility test. For details about the configuration differences and the compatibility, see the ',
            TIP_LINK: 'openEuler Compatibility Policy',
            LABELS: {
                OS: 'OS/OS Version',
                VENDOR: 'Vendor',
                TEST_TIME: 'Test Time',
                COMMIT_ID: 'Commit ID',
                ARCHITECTURE: 'Architecture',
                MOTHER_BOARD_REVISION: 'Mother Board Revision',
                BIOS_UEFI: 'BIOS/UEFI',
                CPU: 'CPU',
                RAM: 'RAM',
                PORTS_AND_BUS_TYPES: 'Ports and Bus Types',
                VIDEO_ADAPTER: 'Video Adapter',
                HOST_BUS_ADAPTER: 'Host Bus Adapter',
                HARD_DISK_DRIVE: 'Hard Disk Drive',
            },
            TABLE_CULUMN: {
                DRIVE_NAME: 'Driver Name',
                VERSION: 'Version',
                TYPE: 'Type',
                DRIVE_DATE: 'Driver Date',
                SHA_256: 'SHA 256',
                DRIVER_SIZE: 'Size (Byte)'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见',
            TITLE: 'openEuler 硬件兼容性测试整体介绍',
            DISCRIPTION_TITLE: '简介',
            DISCRIPTION_CONTENT: '关于openEuler与硬件兼容性，openEuler提供了一系列的工具、指导文档以及整套流程。如果您需要对服务器等硬件展开兼容性测试。可遵循如下流程进行，整理流程说明如下',
            PROCESS_TITLE:'兼容性测试流程',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'申请兼容性测试',
                DESCRIPTION_1:'您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性申请，邮件标题需要注明“申请硬件兼容性测试”。收到邮件后，openEuler团队会与您沟通并在线下签署协议。'
            },{
                ID:'02',
                TITLE:'了解兼容性策略',
                DESCRIPTION_1:'在开展兼容性测试前，您需要详细了解openEuler硬件兼容性策略的说明，',
                A_TEXT:'点击此处获取文档。',
            },{
                ID:'03',
                TITLE:'创建issue',
                DESCRIPTION_1:'完成协议签署后，您需要在openEuler社区（',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:'）的oech项目下创建issue，将所需要认证的硬件信息在issue中明确。openEuler团队会及时了解issue的信息，并提出建议。'
            },{
                ID:'04',
                TITLE:'测试兼容性',
                DESCRIPTION_1:'完成issue创建后，即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及使用指南，您可以根据使用指南自助完成兼容性测试。',
                A_TEXT:'点击此处下载兼容性测试工具套件',
                A_TEXT_2:'点击此处获取使用指南',
                DESCRIPTION_2:'|'
            }, {
                ID:'05',
                TITLE:'提交结果审核',
                DESCRIPTION_1:'完成兼容性测试套测试并通过后，需要您把测试结果更新到issue中。并且按照兼容性测试指南将对应测试结果发送给公共邮箱：您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”。'
            }, {
                ID:'06',
                TITLE:'结果发布',
                DESCRIPTION_1:'openEuler团队会针对提交结果进行审核，如果通过，会将硬件添加到',
                A_TEXT:'兼容性清单',
                DESCRIPTION_2:'中'
            }]
        },
    },
    ru: {
        COMPATIBILITY: 'Compatibility List',
        HARDWARE: 'Hardware',
        DRIVE: 'Drive',
        OS: 'OS',
        ARCHITECTURE: 'Architecture',
        SELECT_PLACEHOLDER: 'Select',
        SEARCH_ALL:'ALL',
        SEARCH_LABEL: "Search",
        HARDWARE_SEARCH_PLACEHOLDER:'Vendor or Model or OS',
        DRIVE_SEARCH_PLACEHOLDER:'Driver Name or Board Size',
        LINK: 'link',
        HARDWARE_TABLE_COLUMN: {
            VENDOR: 'Vendor',
            MODEL: 'Model',
            OS: 'OS',
            DATE: 'Date',
            COMPATIBILITY_CONFIGURATION: 'Compatibility Configuration',
            COMPATIBILITY_CONFIGURATION2: 'Compatibility Configuration',
            REFERRENCE: 'Reference'
        },
        DRIVE_TABLE_COLUMN: {
            ARCHITECTURE: 'Architecture',
            DRIVE_NAME: 'Driver Name',
            VERSION: 'Version',
            TYPE: 'Type',
            DRIVE_DATE: 'Driver Date',
            SHA_256_DRIVER: 'SHA 256 Driver',
            SIZE: 'Size (Byte)',
            CHIP_VENDOR: 'Chip Vendor',
            BOARD_MODEL: 'Plug-in Card Model',
            CHIP_MODEL: 'Chip Model'
        },
        HARDWARE_DETAIL: {
            TITLE_1: 'Product Information',
            TITLE_2: 'Configuration',
            TITLE_3: 'Adapter and Drivers',
            TIP_LABEL: 'This configuration is used during the compatibility test. For details about the configuration differences and the compatibility, see the ',
            TIP_LINK: 'openEuler Compatibility Policy',
            LABELS: {
                OS: 'OS/OS Version',
                VENDOR: 'Vendor',
                TEST_TIME: 'Test Time',
                COMMIT_ID: 'Commit ID',
                ARCHITECTURE: 'Architecture',
                MOTHER_BOARD_REVISION: 'Mother Board Revision',
                BIOS_UEFI: 'BIOS/UEFI',
                CPU: 'CPU',
                RAM: 'RAM',
                PORTS_AND_BUS_TYPES: 'Ports and Bus Types',
                VIDEO_ADAPTER: 'Video Adapter',
                HOST_BUS_ADAPTER: 'Host Bus Adapter',
                HARD_DISK_DRIVE: 'Hard Disk Drive',
            },
            TABLE_CULUMN: {
                DRIVE_NAME: 'Driver Name',
                VERSION: 'Version',
                TYPE: 'Type',
                DRIVE_DATE: 'Driver Date',
                SHA_256: 'SHA 256',
                DRIVER_SIZE: 'Size (Byte)'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见',
            TITLE: 'openEuler 硬件兼容性测试整体介绍',
            DISCRIPTION_TITLE: '简介',
            DISCRIPTION_CONTENT: '关于openEuler与硬件兼容性，openEuler提供了一系列的工具、指导文档以及整套流程。如果您需要对服务器等硬件展开兼容性测试。可遵循如下流程进行，整理流程说明如下',
            PROCESS_TITLE:'兼容性测试流程',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'申请兼容性测试',
                DESCRIPTION_1:'您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性申请，邮件标题需要注明“申请硬件兼容性测试”。收到邮件后，openEuler团队会与您沟通并在线下签署协议。'
            },{
                ID:'02',
                TITLE:'了解兼容性策略',
                DESCRIPTION_1:'在开展兼容性测试前，您需要详细了解openEuler硬件兼容性策略的说明，',
                A_TEXT:'点击此处获取文档。',
            },{
                ID:'03',
                TITLE:'创建issue',
                DESCRIPTION_1:'完成协议签署后，您需要在openEuler社区（',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:'）的oech项目下创建issue，将所需要认证的硬件信息在issue中明确。openEuler团队会及时了解issue的信息，并提出建议。'
            },{
                ID:'04',
                TITLE:'测试兼容性',
                DESCRIPTION_1:'完成issue创建后，即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及使用指南，您可以根据使用指南自助完成兼容性测试。',
                A_TEXT:'点击此处下载兼容性测试工具套件',
                A_TEXT_2:'点击此处获取使用指南',
                DESCRIPTION_2:'|'
            }, {
                ID:'05',
                TITLE:'提交结果审核',
                DESCRIPTION_1:'完成兼容性测试套测试并通过后，需要您把测试结果更新到issue中。并且按照兼容性测试指南将对应测试结果发送给公共邮箱：您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”。'
            }, {
                ID:'06',
                TITLE:'结果发布',
                DESCRIPTION_1:'openEuler团队会针对提交结果进行审核，如果通过，会将硬件添加到',
                A_TEXT:'兼容性清单',
                DESCRIPTION_2:'中'
            }]
        },
    }
};