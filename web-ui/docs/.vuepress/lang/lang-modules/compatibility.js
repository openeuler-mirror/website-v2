/**
 * @file  下载模块国际化配置入口
 * */

module.exports = {
    cn: {
        COMPATIBILITY: '兼容性列表',
        HARDWARE: '整机',
        DRIVE: '板卡',
        SOFTWARE:'软件',
        SOFTWARETYPE:'软件类型',
        ADAPTIVE:'操作系统',
        OS: '操作系统',
        ARCHITECTURE: '架构',
        SELECT_PLACEHOLDER: '请选择',
        SEARCH_ALL:'全部',
        SEARCH_LABEL: "搜索",
        HARDWARE_SEARCH_PLACEHOLDER: "厂家、型号、操作系统",
        SOFTWARE_SEARCH_PLACEHOLDER: "软件名称",
        DRIVE_SEARCH_PLACEHOLDER:'驱动名称、板卡型号',
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
            DRIVE_OS: '操作系统',
            VERSION: '版本',
            TYPE: '类型',
            DRIVE_DATE: 'Driver Date',
            SHA_256_DRIVER: 'SHA 256 Driver',
            SIZE: '大小 (Byte)',
            CHIP_VENDOR: '芯片厂家',
            BOARD_MODEL: '板卡型号',
            CHIP_MODEL: '芯片型号'
        },
        SOFTWARE_TABLE_COLUMN: {
            ARCHITECTURE: '架构',
            SOFTWARETYPE: '软件类型',
            SOFTWARENAME: '软件名称',
            VERSION: '版本',
            PROPERTIES: '软件属性',
            DOWNLOADLINK: '下载地址',
            SYSTEM: '操作系统',
            PUBLICKLICENSE: '开源协议'
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
                DRIVE_CHIP_VENDOR: 'Chip Vendor',
                DRIVE_BOARD_MODEL: 'Board Model',
                DRIVE_CHIP_MODEL: 'Chip Model'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见',
            TITLE: 'openEuler 硬件兼容性测试整体介绍',
            DISCRIPTION_TITLE: '简介',
            DISCRIPTION_CONTENT: 'openEuler提供了一系列的工具、文档和操作流程帮助用户测试openEuler与硬件的兼容性。如果您需要对服务器等硬件展开兼容性测试，可参考下文进行。',
            PROCESS_TITLE:'兼容性测试流程',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'申请兼容性测试',
                DESCRIPTION_1:'您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性申请，邮件标题需要注明“申请硬件兼容性测试”。收到邮件后，openEuler团队中sig组会与您沟通进行协议签署。'
            },{
                ID:'02',
                TITLE:'了解兼容性策略',
                DESCRIPTION_1:'在开展兼容性测试前，您需要了解openEuler硬件兼容性策略，',
                A_TEXT:'点击此处获取文档。',
            },{
                ID:'03',
                TITLE:'创建issue',
                DESCRIPTION_1:'完成协议签署后，您需要在openEuler社区（',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:'）的oec-hardware项目下创建issue，将所需要认证的硬件信息在issue中明确。openEuler团队会及时了解issue的信息，并提出建议。'
            },{
                ID:'04',
                TITLE:'测试兼容性',
                DESCRIPTION_1:'完成issue创建后，即可开展兼容性测试。openEuler团队提供了兼容性测试框架以及使用指南，您可以根据使用指南自助完成兼容性测试。点击下载',
                A_TEXT:'兼容性测试工具套件',
                A_TEXT_2:'使用指南',
                DESCRIPTION_2:'|'
            }, {
                ID:'05',
                TITLE:'提交结果审核',
                DESCRIPTION_1:'完成兼容性测试并通过后，需要您把测试结果更新到issue中。并且按照使用指南将对应测试结果发送给公共邮箱：您需要向公共邮箱（',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'）发送兼容性结果审核申请，邮件标题需要注明“xxx硬件兼容性测试结果信息”（其中xxx为社区issue ID）。'
            }, {
                ID:'06',
                TITLE:'结果发布',
                DESCRIPTION_1:'openEuler团队会针对提交结果进行审核，如果通过，会将硬件添加到',
                A_TEXT:'兼容性列表',
                DESCRIPTION_2:'中'
            }]
        },
    },
    en: {
        COMPATIBILITY: 'Compatibility List',
        HARDWARE: 'Server',
        DRIVE: 'Card',
        OS: 'OS',
        ARCHITECTURE: 'Architecture',
        SELECT_PLACEHOLDER: 'Select',
        SEARCH_ALL:'ALL',
        SEARCH_LABEL: "Search",
        HARDWARE_SEARCH_PLACEHOLDER:'Vendor or Model or OS',
        DRIVE_SEARCH_PLACEHOLDER:'Driver Name or Card Model',
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
            DRIVE_OS: 'OS',
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
                DRIVE_CHIP_VENDOR: 'Chip Vendor',
                DRIVE_BOARD_MODEL: 'Board Model',
                DRIVE_CHIP_MODEL: 'Chip Model'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'openEuler provides a complete process and tools for hardware compatibility test. For details, see the ',
            TITLE: 'Overall Introduction to the openEuler Hardware Compatibility Test',
            DISCRIPTION_TITLE: 'Introduction',
            DISCRIPTION_CONTENT: 'Openeuler provides a series of tools, documents and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:',
            PROCESS_TITLE:'Compatibility Test Process',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'Apply for a compatibility test.',
                DESCRIPTION_1:'Send a compatibility test application to the public mailbox (',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the sig team of openEuler will contact you and sign an agreement with you offline.'
            },{
                ID:'02',
                TITLE:'Learn about the compatibility test policies.',
                DESCRIPTION_1:'Before performing the compatibility test, learn about the openEuler hardware compatibility policies.',
                A_TEXT:'Click here to obtain the document.',
            },{
                ID:'03',
                TITLE:'Create an issue.',
                DESCRIPTION_1:'After signing the agreement, create an issue under the oec-hardware project in the openEuler community (',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:') and specify the hardware information in the issue. The openEuler team will give feedback on the issue in a timely manner.'
            },{
                ID:'04',
                TITLE:'Perform the compatibility test.',
                DESCRIPTION_1:'After the issue is created, you can perform the compatibility test. The openEuler team provides the compatibility test framework and user guide that help you complete the test. Click here to download:',
                A_TEXT:'Compatibility test tool suite',
                A_TEXT_2:'User guide.',
                DESCRIPTION_2:' | '
            }, {
                ID:'05',
                TITLE:'Submit the result for review.',
                DESCRIPTION_1:'After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to ',
                A_TEXT:'oecompatibility@openeuler.org.',
                DESCRIPTION_2:' The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.'
            }, {
                ID:'06',
                TITLE:'Release the result.',
                DESCRIPTION_1:'The openEuler team will review the submitted result and add the hardware to the ',
                A_TEXT:'Compatibility List',
                DESCRIPTION_2:' after it is approved.'
            }]
        },
    },
    ru: {
        COMPATIBILITY: 'Compatibility List',
        HARDWARE: 'Server',
        DRIVE: 'Card',
        OS: 'OS',
        ARCHITECTURE: 'Architecture',
        SELECT_PLACEHOLDER: 'Select',
        SEARCH_ALL:'ALL',
        SEARCH_LABEL: "Search",
        HARDWARE_SEARCH_PLACEHOLDER:'Vendor or Model or OS',
        DRIVE_SEARCH_PLACEHOLDER:'Driver Name or Card Model',
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
            DRIVE_OS: 'OS',
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
                DRIVE_CHIP_VENDOR: 'Chip Vendor',
                DRIVE_BOARD_MODEL: 'Board Model',
                DRIVE_CHIP_MODEL: 'Chip Model'
            }
        },
        HARDWARE_OEC_DETAIL: {
            TEXT:'openEuler provides a complete process and tools for hardware compatibility test. For details, see the ',
            TITLE: 'Overall Introduction to the openEuler Hardware Compatibility Test',
            DISCRIPTION_TITLE: 'Introduction',
            DISCRIPTION_CONTENT: 'Openeuler provides a series of tools, documents and operation procedures to help you test the compatibility between openEuler and hardware. If you need to perform compatibility tests on hardware such as servers, perform the following process:',
            PROCESS_TITLE:'Compatibility Test Process',
            ITEM_ARR: [{
                ID:'01',
                TITLE:'Apply for a compatibility test.',
                DESCRIPTION_1:'Send a compatibility test application to the public mailbox (',
                A_TEXT:'oecompatibility@openeuler.org',
                DESCRIPTION_2:'). The email subject must contain "Apply for a Hardware Compatibility Test". After receiving the email, the sig team of openEuler will contact you and sign an agreement with you offline.'
            },{
                ID:'02',
                TITLE:'Learn about the compatibility test policies.',
                DESCRIPTION_1:'Before performing the compatibility test, learn about the openEuler hardware compatibility policies.',
                A_TEXT:'Click here to obtain the document.',
            },{
                ID:'03',
                TITLE:'Create an issue.',
                DESCRIPTION_1:'After signing the agreement, create an issue under the oec-hardware project in the openEuler community (',
                A_TEXT:'https://gitee.com/openeuler/oec-hardware',
                DESCRIPTION_2:') and specify the hardware information in the issue. The openEuler team will give feedback on the issue in a timely manner.'
            },{
                ID:'04',
                TITLE:'Perform the compatibility test.',
                DESCRIPTION_1:'After the issue is created, you can perform the compatibility test. The openEuler team provides the compatibility test framework and user guide that help you complete the test. Click here to download:',
                A_TEXT:'Compatibility test tool suite',
                A_TEXT_2:'User guide.',
                DESCRIPTION_2:' | '
            }, {
                ID:'05',
                TITLE:'Submit the result for review.',
                DESCRIPTION_1:'After the compatibility test is completed and passed, update the test result to the issue. Send the test result to the public mailbox as instructed by the user guide. Send the application for reviewing the compatibility result to ',
                A_TEXT:'oecompatibility@openeuler.org.',
                DESCRIPTION_2:' The email subject must contain "xxx Hardware Compatibility Test Result", where xxx indicates the community issue ID.'
            }, {
                ID:'06',
                TITLE:'Release the result.',
                DESCRIPTION_1:'The openEuler team will review the submitted result and add the hardware to the ',
                A_TEXT:'Compatibility List',
                DESCRIPTION_2:' after it is approved.'
            }]
        },
    }
};