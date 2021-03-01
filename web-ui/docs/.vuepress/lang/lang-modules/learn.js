/**
 * @file  学习模块国际化配置入口
 * */
module.exports = {
    cn: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA:require('./../../data/learn').cn.COURSE_LIST
    },
    en: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA:require('./../../data/learn').en.COURSE_LIST
    },
    ru: {
        MOOC: '慕课',
        MOOC_COURSE: [
            {
                ID: '1',
                IMG: '/img/learn/hcia/hcia.png',
                TITLE: 'HCIA-openEuler 认证培训课程',
                DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
                APPLY_LINK: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 '
            }
        ],
        BTN_LEARN: '课程学习',
        BTN_APPLY: '考试报名',
        MOOC_CATALOG: '目录',
        COURSE_DOWNLOAD: '课件下载',
        TEACHER_TEAM: '讲师团队',
        MOOC_LIST_ROUTRE: '慕课',
        PREV_TEXT: '上一篇',
        NEXT_TEXT: '下一篇',
        MOOC_DATA:require('./../../data/learn').ru.COURSE_LIST
    }
}
