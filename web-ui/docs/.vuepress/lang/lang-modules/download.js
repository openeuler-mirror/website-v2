/**
 * @file  下载模块国际化配置入口
 * */

module.exports = {
    cn: {
        RELEASE_DESC: '发行说明',
        INSTALL_GUIDENCE: '安装指南',
        SEEK_HELP: '提问求助',
        GET_ISO: '获取 ISO',
        LIFE_CYCLE: '生命周期',
        DOWNLOAD_BTN_NAME: '下载',
        MANUFACTURER: '厂商',
        PUBLISH_DATE: '发行时间',
        DOWNLOAD_LIST : require('././../../data/download').cn.DOWNLOAD_LIST
    },
    en: {
        RELEASE_DESC: 'Release Description',
        INSTALL_GUIDENCE: 'Installation Guide',
        SEEK_HELP: 'Seek Help',
        GET_ISO: 'Get Iso',
        LIFE_CYCLE: 'Lifecycle',
        DOWNLOAD_BTN_NAME: 'Download',
        MANUFACTURER: 'Manufacturer',
        PUBLISH_DATE: 'Date of Release',
        DOWNLOAD_LIST : require('././../../data/download').en.DOWNLOAD_LIST
    },
    ru: {
        RELEASE_DESC: 'Описание релиза',
        INSTALL_GUIDENCE: 'Руководство по установке',
        SEEK_HELP: 'Справка',
        GET_ISO: 'Получить ISO',
        LIFE_CYCLE: 'Жизненный цикл',
        DOWNLOAD_BTN_NAME: 'Загрузить',
        MANUFACTURER: 'Поставщик',
        PUBLISH_DATE: 'Дата выпуска релиза  ',
        DOWNLOAD_LIST : require('././../../data/download').ru.DOWNLOAD_LIST
    }
};