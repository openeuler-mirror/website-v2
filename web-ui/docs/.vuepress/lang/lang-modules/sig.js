/**
 * @file  sig模块国际化配置入口
 * */

module.exports = {
    cn: {
        test: '测试',
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE:"SIG申请流程",
                TITLE: "申请流程",
                LINE_CONTENT: [
                    {
                        LEFT: {
                            LEFT_INFO: "个人或公司在 openEuler 社区中寻找 2 - 3 个具有共同目标的人讨论决定成立 SIG 组，维护 openEuler 社区中的某一个技术方向软件包或发起孵化项目",
                            LEFT_CIRCLE: "寻人",
                            LEFT_IMG: "/img/sig/sig1.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "按照成立 SIG 组的成立流程，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间",
                            RIGHT_CIRCLE: "申请",
                            LEFT_IMG: "/img/sig/sig2.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致",
                            LEFT_CIRCLE: "沟通",
                            LEFT_IMG: "/img/sig/sig3.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库",
                            RIGHT_INFO: "获批",
                            LEFT_IMG: "/img/sig/sig4.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作",
                            LEFT_CIRCLE: "运作",
                            LEFT_IMG: "/img/sig/sig5.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会周期 Review SIG 的运作情况，给出指导意见",
                            RIGHT_INFO: "改进",
                            LEFT_IMG: "/img/sig/sig6.png"
                        }
                    },
                ]
            }
        },
    },
    en: {
        test: 'test',
        GUIDANCE_LIST: {
            GUIDE: {
                MOBILE_TITLE:"SIG申请流程",
                TITLE: "申请流程",
                LINE_CONTENT: [
                    {
                        LEFT: {
                            LEFT_INFO: "个人或公司在 openEuler 社区中寻找 2 - 3 个具有共同目标的人讨论决定成立 SIG 组，维护 openEuler 社区中的某一个技术方向软件包或发起孵化项目",
                            LEFT_CIRCLE: "寻人",
                            LEFT_IMG: "/img/sig/sig1.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "按照成立 SIG 组的成立流程，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间",
                            RIGHT_CIRCLE: "申请",
                            LEFT_IMG: "/img/sig/sig2.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致",
                            LEFT_CIRCLE: "沟通",
                            LEFT_IMG: "/img/sig/sig3.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库",
                            RIGHT_CIRCLE: "获批",
                            LEFT_IMG: "/img/sig/sig4.png"
                        }
                    },
                    {
                        LEFT: {
                            LEFT_INFO: "SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作",
                            LEFT_CIRCLE: "运作",
                            LEFT_IMG: "/img/sig/sig5.png"
                        },
                        RIGHT: {
                            RIGHT_INFO: "技术委员会周期 Review SIG 的运作情况，给出指导意见",
                            RIGHT_CIRCLE: "改进",
                            LEFT_IMG: "/img/sig/sig6.png"
                        }
                    },
                ]
            }
        },
    }
};