/**
 * @file  资料组维护数据文件
 * */

module.exports = {
    cn: {
        MANUFACTURER_LIST: [
            {
                NAME: '厂商一',
                VALUE: 1
            },
            {
                NAME: '厂商二',
                VALUE: 2
            }
        ],
        PUBLISH_DATE_LIST: [
            {
                NAME: '2020/03/26',
                VALUE: '2020/03/26'
            },
            {
                NAME: '2020/02/11',
                VALUE: '2020/02/11'
            }
        ],
        DOWNLOAD_LIST : [
            {
                NAME: 'openEuler 20.03 LTS',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                DESC: 'openEuler 20.03 LTS 版本是满足开放场景的标准发行版，生命周期四年。',
                RELEASE_DESC_URL: 'sss',
                INSTALL_GUIDENCE_URL: 'acacs',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                LIFE_CYCLE_URL: 'vevreverv',
                MANUFACTURER: 1,
                PUBLISH_DATE: '2020/03/26',
                LTS: true
            },
            {
                NAME: 'openEuler 1.0 Base',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                DESC: 'openEuler 20.03 Base 版本是满足开放场景的标准发行版，生命周期四年。',
                RELEASE_DESC_URL: 'sss',
                INSTALL_GUIDENCE_URL: 'acacs',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                LIFE_CYCLE_URL: 'vevreverv',
                MANUFACTURER: 1,
                PUBLISH_DATE: '2020/02/11',
                LTS: false
            }
        ]
    },
    en: {
        MANUFACTURER_LIST: [
            {
                NAME: 'manufacturer1',
                VALUE: 1
            },
            {
                NAME: 'manufacturer2',
                VALUE: 2
            }
        ],
        PUBLISH_DATE_LIST: [
            {
                NAME: '2020/03/26',
                VALUE: '2020/03/26'
            },
            {
                NAME: '2020/02/11',
                VALUE: '2020/02/11'
            }
        ],
        DOWNLOAD_LIST : [
            {
                NAME: 'openEuler 20.03 LTS',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                DESC: 'The openEuler 20.03 LTS version is a standard release version that meets open scenario requirements, which has a lifecycle of four years.',
                RELEASE_DESC_URL: 'sss',
                INSTALL_GUIDENCE_URL: 'acacs',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openEuler-20.03-LTS/',
                LIFE_CYCLE_URL: 'vevreverv',
                MANUFACTURER: 1,
                PUBLISH_DATE: '2020/03/26',
                LTS: true
            },
            {
                NAME: 'openEuler 1.0 Base',
                DOWNLOAD_URL : 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                DESC: 'The openEuler 20.03 Base version is a standard release version that meets open scenario requirements, which has a lifecycle of four years.',
                RELEASE_DESC_URL: 'sss',
                INSTALL_GUIDENCE_URL: 'acacs',
                SEEK_HELP_URL: 'https://gitee.com/openeuler/community-issue',
                GET_ISO_URL: 'https://repo.openeuler.org/openeuler1.0/base/iso/',
                LIFE_CYCLE_URL: 'vevreverv',
                MANUFACTURER: 2,
                PUBLISH_DATE: '2020/02/11',
                LTS: false
            }
        ]
    }
};