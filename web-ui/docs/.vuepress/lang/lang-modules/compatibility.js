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
            DRIVE_NAME: 'Driver Name',
            VERSION: 'Version',
            TYPE: 'Type',
            DRIVE_DATE: 'Driver Date',
            SHA_256_DRIVER: 'SHA 256 Driver',
            SIZE: 'Size (Byte)',
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
    }
};