/**
 * @file  sig模块国际化配置入口
 * */

module.exports = {
    cn: {
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE: "SIG申请流程",
                TITLE: "申请流程",
                LINE_CONTENT: [{
                        LEFT: {
                            LEFT_INFO: "个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目。",
                            LEFT_CIRCLE: "寻人",
                            LEFT_IMG: "/img/sig/sig1.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "按照成立 SIG 组的成立流程，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。",
                            RIGHT_CIRCLE: "申请",
                            LEFT_IMG: "/img/sig/sig2.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。",
                            LEFT_CIRCLE: "沟通",
                            LEFT_IMG: "/img/sig/sig3.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。",
                            RIGHT_CIRCLE: "获批",
                            LEFT_IMG: "/img/sig/sig4.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。",
                            LEFT_CIRCLE: "运作",
                            LEFT_IMG: "/img/sig/sig5.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会周期 Review SIG 的运作情况，给出指导意见。",
                            RIGHT_CIRCLE: "改进",
                            LEFT_IMG: "/img/sig/sig6.png"
                        }
                    },
                ]
            }
        },
        SIG_LIST: {
            HOME_PAGE: '前往gitee首页',
            MAIL: '邮件',
            IRC: 'IRC频道',
            MANAGER: '管理员'
        },
        SIG_DETAIL: {
            NO_MEETINGS: '暂无会议',
            ORGANIZING_MEETINGS: '组织会议',
            MEMBERS: '项目成员',
            CONTACT: '联系方式',
            MAIL_LIST: '邮件列表'
        },
        ROLE_DESCRIPTION:{
            ROLE_DESCRIPTION:'角色说明',
            TABLE_TITLE:'社区成员',
            TABLE_DESCRIPTION:'本文简要描述了openEuler社区中贡献者角色的各种职责。大部分角色的职责限于这些SIG(Special Interest Group)内：',
            TABLE_THEAD:["角色","职责范围（简要描述）","要求","定义的文件"],
            TABLE_TBODY:[
                {
                    ROLE:'Contributor',
                    RESPONSIBILITIES:'项目的贡献者',
                    REQUIREMENT:'',
                    DEFINED_DOCUMENT:'Gitee注册成员'
                },
                {
                    ROLE:'Committer',
                    RESPONSIBILITIES:'审核其他成员的贡献',
                    REQUIREMENT:'SIG的积极贡献者，经验丰富，愿意投入精力参与到审核工作',
                    DEFINED_DOCUMENT:'openEuler SIG拥有的存储库中OWNERS文件中的Committer条目。'
                },
                {
                    ROLE:'Maintainer',
                    RESPONSIBILITIES:'项目Owner',
                    REQUIREMENT:'经验丰富，富有责任心、出色的技术能力和管理能力',
                    DEFINED_DOCUMENT:'openEuler SIG拥有的存储库中OWNERS文件中的Maintainer条目。'
                }
            ]
        }
    },
    en: {
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE: "SIG申请流程",
                TITLE: "Application Process",
                LINE_CONTENT: [{
                        LEFT: {
                            LEFT_INFO: "Individuals or companies find two or three persons with common goals in the openEuler community to discuss and set up a SIG, which aims to maintain a specific type of software package in the openEuler community or to initiate an incubation project.",
                            LEFT_CIRCLE: "01",
                            MOBILE_CIRCLE: 'Find',
                            LEFT_IMG: "/img/sig/sig1.png",
                            LEFT_DESC: 'Find'
                        },
                        RIGHT: {
                            RIGHT_INFO: "Create an application file on Gitee and initiate a pull request (PR) according to the procedure for setting up a SIG. Make an appointment for attending the Technical Committee meeting. ",
                            RIGHT_CIRCLE: "02",
                            MOBILE_CIRCLE: 'Apply',
                            LEFT_IMG: "/img/sig/sig2.png",
                            RIGHT_DESC: 'Apply'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "At the regular Technical Committee (TC) meeting, discuss and reach an agreement on the technical scope and maintenance objectives of the SIG.",
                            LEFT_CIRCLE: "03",
                            MOBILE_CIRCLE: 'Discuss',
                            LEFT_IMG: "/img/sig/sig3.png",
                            LEFT_DESC: 'Discuss'
                        },
                        RIGHT: {
                            RIGHT_INFO: "The TC approves the establishment of the SIG. The corresponding PR is integrated into the code repository, and the infrastructure automatically establishes the corresponding repository.",
                            RIGHT_CIRCLE: "04",
                            MOBILE_CIRCLE: 'Approve',
                            LEFT_IMG: "/img/sig/sig4.png",
                            RIGHT_DESC: 'Approve'
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "The SIG starts to operate. Members use the mailing list and regular meetings for discussion and operation.",
                            LEFT_CIRCLE: "05",
                            MOBILE_CIRCLE: 'Operate',
                            LEFT_IMG: "/img/sig/sig5.png",
                            LEFT_DESC: 'Operate'
                        },
                        RIGHT: {
                            RIGHT_INFO: "The TC periodically reviews the SIG operation and provides guidance.",
                            RIGHT_CIRCLE: "06",
                            MOBILE_CIRCLE: 'Improve',
                            LEFT_IMG: "/img/sig/sig6.png",
                            RIGHT_DESC: 'Improve'
                        }
                    },
                ]
            }
        },
        SIG_LIST: {
            HOME_PAGE: 'Go to gitee home page',
            MAIL: 'mail',
            IRC: 'IRC Channel',
            MANAGER: 'Administrators'
        },
        SIG_DETAIL: {
            NO_MEETINGS: 'Not available now',
            ORGANIZING_MEETINGS: 'organizing meetings',
            MEMBERS: 'project members',
            CONTACT: 'contact',
            MAIL_LIST: 'maillist'
        },
        ROLE_DESCRIPTION:{
            ROLE_DESCRIPTION:'Role-description',
            TABLE_TITLE:'Community Member',
            TABLE_DESCRIPTION:'This article briefly describes the responsibilities and privilege of the contributor in the openEuler community. The responsibilities of most contributor are limited to SIG (Special Interest groups) :',
            TABLE_THEAD:["Role","Responsibilities","Requirement","Defined Document"],
            TABLE_TBODY:[
                {
                    ROLE:'Contributor',
                    RESPONSIBILITIES:'Contributors of the project',
                    REQUIREMENT:'',
                    DEFINED_DOCUMENT:'Registered members on Gitee'
                },
                {
                    ROLE:'Committer',
                    RESPONSIBILITIES:'Review and approve the contributions submitted',
                    REQUIREMENT:'Frequently contributing to SIG, experienced,and willing to undertake review work',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                },
                {
                    ROLE:'Maintainer',
                    RESPONSIBILITIES:'Owner of the project',
                    REQUIREMENT:'Experienced, responsible, outstanding technologies and management skills',
                    DEFINED_DOCUMENT:'developer entry in the OWNERS file owned by openEuler SIG'
                }
            ]
        }
    }
};