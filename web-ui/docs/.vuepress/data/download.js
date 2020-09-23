/**
 * @file  资料组维护数据文件
 * */

module.exports = {
    cn: {
        DOWNLOAD_LIST : [
            {
                NAME: 'openEuler 20.03 LTS',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                DESC: 'openEuler 20.03 LTS 版本是满足开放场景的标准发行版，生命周期四年。',
                RELEASE_DESC_URL: '/zh/docs/20.03_LTS/docs/Releasenotes/release_notes.html',
                INSTALL_GUIDENCE_URL: '/zh/docs/20.03_LTS/docs/Installation/installation.html',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/ISO/',
                LIFE_CYCLE_URL: '/zh/other/lifecycle/',
                MANUFACTURER: 'openEuler社区',
                PUBLISH_DATE: '2020/03',
                LTS: true
            },
            {
                NAME: 'openEuler 1.0 Base',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openeuler1.0/base/',
                DESC: 'openEuler 1.0 Base 版本是基础版本，包含了运行最小系统的核心组件。',
                RELEASE_DESC_URL: '/zh/docs/1.0_Base/docs/Releasenotes/release_notes.html',
                INSTALL_GUIDENCE_URL: '/zh/docs/1.0_Base/docs/Installation/installation.html',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                LIFE_CYCLE_URL: '/zh/other/lifecycle/',
                MANUFACTURER: 'openEuler社区',
                PUBLISH_DATE: '2020/02',
                LTS: false
            }
        ]
    },
    en: {
        DOWNLOAD_LIST : [
            {
                NAME: 'openEuler 20.03 LTS',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                DESC: 'The openEuler 20.03 LTS edition, with a four-year lifecycle, is a standard distribution that meets open scenario requirements, which has a lifecycle of four years.',
                RELEASE_DESC_URL: '/en/docs/20.03_LTS/docs/Releasenotes/release_notes.html',
                INSTALL_GUIDENCE_URL: '/en/docs/20.03_LTS/docs/Installation/installation.html',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                LIFE_CYCLE_URL: '/en/other/lifecycle/',
                MANUFACTURER: 'openEuler community',
                PUBLISH_DATE: '2020/03',
                LTS: true
            },
            {
                NAME: 'openEuler 1.0 Base',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                DESC: 'The openEuler 1.0 Base is the basic version that contains the core components to run the minimum system.',
                INSTALL_GUIDENCE_URL: '/en/docs/1.0_Base/docs/Installation/installation.html',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                LIFE_CYCLE_URL: '/en/other/lifecycle/',
                MANUFACTURER: 'openEuler community',
                PUBLISH_DATE: '2020/02',
                LTS: false
            }
        ]
    }
};