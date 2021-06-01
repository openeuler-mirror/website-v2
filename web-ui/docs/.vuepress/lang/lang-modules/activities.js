/**
 * @file  下载模块国际化配置入口
 * */

module.exports = {
    cn: {
        NO_DATA_INFO: '还没有符合条件的任务呢，请持续关注哦！',
        BANNER_TITLE: '开源软件供应链点亮计划',
        BANNER_BTN: '创建任务',
        DESCRIPTION_1: '开源软件供应链点亮计划 - 暑期 2021（以下简称 暑期 2021）是由中国科学院软件研究所与openEuler社区共同举办的一项面向高校学生的暑期活动，旨在鼓励在校学生积极参与开源软件的开发维护，促进优秀开源软件社区的蓬勃发展。我们将联合各大开源社区，针对重要开源软件的开发与维护提供项目，并向全球高校学生开放报名。',
        DESCRIPTION_2: '学生自由选择项目，与社区导师沟通实现方案并撰写项目计划书。被选中的学生将在社区导师指导下，按计划完成开发工作，并将成果贡献给社区。根据项目的难易程度和完成情况，参与者将获取由主办方发放的项目奖金。',
        DESCRIPTION_3: 'openEuler 社区将出具150+项目任务供大家选择，涉及到openEuler 操作系统基础开发、新特性开发、开源基础设施建设等丰富多样的项目任务，一起来丰富openEuler的世界吧！',
        STEP_TITLE: '参与步骤',
        NAV_TEXT: ['参与步骤','选择任务'],
        STEP_1: {
            CONTENT_1: '了解自己感兴趣的任务。',
            CONTENT_2: '可在',
            A_LINK: '本页面',
            CONTENT_3: '根据不同方向、标签、难度查找任务，点击任务卡片查看详情。可通过邮件向对应的任务导师进一步咨询你感兴趣的任务。',
            TITLE: '邮件格式：',
            TITLE_TITLE: '标题：',
            TITLE_CONTENT: '【暑期2021项目咨询】学生姓名+ 咨询项目任务名称',
            MAIL_TITLE: '邮件内容：',
            MAIL_CONTENT_1: '介绍自己的基本情况，包括学校、专业、年级；',
            MAIL_CONTENT_2: '清楚描述你想咨询的问题。'
        },
        STEP_2: {
            CONTENT_1: '确定自己想选择的项目，并开始准备项目申请方案。',
            CONTENT_2: '可参照',
            A_LINK: '项目申请模板'
        },
        STEP_3: {
            CONTENT_1:'报名并提交项目申请方案。在',
            A_LINK: '暑期2021报名官网',
            CONTENT_2:'找到对应的题目选择报名并提交项目申请方案。',
            TITLE: '报名与方案提交时间：',
            TIME: '2021年5月24日-2021年6月13日。'
        },
        STEP_4: {
            CONTENT: '等待方案评选结果公布后开始进行项目开发。在项目开发期间保持至少每两周向导师汇报进度，有问题及时和导师沟通，8月中旬通过中期评审可获得一半奖金。',
            TITLE: '开发周期：',
            TIME: '2021年7月1日-2021年9月30日。',
        },
        STEP_5: {
            TIME:'2021年9月30日',
            CONTENT: '前提交作品，等待结项评审。结项评审通过后即可获得全部奖金、证书、奖品等奖励，表现优秀者将参与年度优秀学生评选。'
        },
        GUIDE_LABEL: '学生参与详情可进一步查看活动官方的',
        GUIDE_LINK: '学生指南',
        OFFICIAL_WEBSITE_LABLE: '活动整体详情可以访问',
        OFFICIAL_WEBSITE_LINK: '暑期2021活动官网',
        PERIOD: '。',
        DESCRIPTION_4: '扫码添加openEuler小助手微信，备注“暑期2021”，邀请你进暑期2021 openEuler 项目交流群，活动重要信息将第一时间在群内通知。',
        FILTER_TITLE: '选择任务',
        FILTER: {
            LABEL_1: '技术方向',
            LABEL_2: '技术标签',
            LABEL_3: '难度',
            DIFFICULTY_OPTIONS: ['高', '中', '低']
        },
        ACTIVITIES_LIST: require('././../../data/activities/zh.json'),
        ACTIVETIES_LIST_LABLE_1: '方向',
        ACTIVETIES_LIST_LABLE_2: '标签'
    }
};