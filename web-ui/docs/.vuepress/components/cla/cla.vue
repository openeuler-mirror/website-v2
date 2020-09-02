<template>
    <div class="cla-mobile-content">
        <div class="cla-content">
            <div class="radio">
                <el-radio-group v-model="reverse">
                    <el-radio :label="true" @change="isShowPerson">{{
                        i18n.cla.PERSONAL
                    }}</el-radio>
                    <el-radio :label="false" @change="isShowPerson">{{
                        i18n.cla.LAW
                    }}</el-radio>
                </el-radio-group>
            </div>
            <div class="web">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="isShow"
                >
                    <p class="contribute-words">
                        {{ i18n.cla.PERSONAL_WORDS }}
                    </p>
                    <el-form-item prop="name">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/name.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.name"
                                placeholder="您的姓名"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/email.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.email"
                                placeholder="您的电子邮箱"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/phone.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.phone"
                                placeholder="您的电话"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="printer">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/printer.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.printer"
                                placeholder="您的传真"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="location">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/position.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.location"
                                placeholder="您的地址"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/date.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.date"
                                placeholder="2020-07-28"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <p class="contribute-words">{{ i18n.cla.NECESSARY }}</p>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="submitForm('ruleForm')"
                            >{{ i18n.cla.EDIT }}</el-button
                        >
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            @click="resetForm('ruleForm')"
                            >{{ i18n.cla.DELEAT }}</el-button
                        >
                    </el-form-item>
                </el-form>
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-if="!isShow"
                >
                    <p class="contribute-words">{{ i18n.cla.LEGAL_WORD }}</p>
                    <el-form-item prop="name">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/name.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.name"
                                placeholder="授权代表（姓名）"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="contribute">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/contribute.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.contribute"
                                placeholder="授权贡献者（姓名）"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="position">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/name.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.position"
                                placeholder="您的职位"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="office">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/office.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.office"
                                placeholder="您的公司名称"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="location">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/position.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.location"
                                placeholder="您的地址"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/email.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.email"
                                placeholder="您的电子邮件"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/phone.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.phone"
                                placeholder="您的电话"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="printer">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img
                                    src="../../public/img/cla/printer.svg"
                                    alt
                                />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.printer"
                                placeholder="您的传真"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/date.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="ruleForm.date"
                                placeholder="2020-07-28"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <p class="contribute-words">{{ i18n.cla.NECESSARY }}</p>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="submitForm('ruleForm')"
                            >{{ i18n.cla.EDIT }}</el-button
                        >
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            @click="resetForm('ruleForm')"
                            >{{ i18n.cla.DELEAT }}</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>

            <!-- 移动端 -->
            <div class="mobile">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    v-if="isShow"
                >
                    <p class="contribute-words">
                        {{ i18n.cla.PERSONAL_WORDS }}
                    </p>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.name"
                                placeholder="您的姓名*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.email"
                                placeholder="您的电子邮箱*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.phone"
                                placeholder="您的电话"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="printer">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.printer"
                                placeholder="您的传真"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="location">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.location"
                                placeholder="您的地址*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.date"
                                placeholder="2020-07-28*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    v-if="!isShow"
                >
                    <p class="contribute-words">{{ i18n.cla.LEGAL_WORD }}</p>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.name"
                                placeholder="授权代表（姓名*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="contribute">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.contribute"
                                placeholder="授权贡献者（姓名*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="position">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.position"
                                placeholder="您的职位*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="office">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.office"
                                placeholder="您的公司名称*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="location">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.location"
                                placeholder="您的地址*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.email"
                                placeholder="您的电子邮件*"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.phone"
                                placeholder="您的电话"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="printer">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.printer"
                                placeholder="您的传真"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="24">
                            <el-input
                                v-model="ruleForm.date"
                                placeholder="2020-07-28*"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { JSO, Fetcher } from "jso";
let that = null;
let localMethods = {
    oauthLogin() {
        let config = {
            providerID: "openeuler_bot",
            client_id: "d00e9b289d8cf8f98e2fc68a9c240304f6413007d82d30701cd1da7e937db75c",
            redirect_uri: window.location.origin + "/cla",
            response_type: "code",
            authorization: "https://gitee.com/oauth/authorize",
            scopes: {
                request: ["user_info", "emails"]
            }
        };

        let client = new JSO(config);
        client.callback();

        let f = new Fetcher(client);
        let url = "https://gitee.com/v5/user";
        f.fetch(url, {})
            .then(data => {
                return data.json();
            })
            .then(data => {
                that.$message.error(data);
            })
            .catch(err => {
                that.$message.error(err);
            });
    },
    readCookie(name) {
        var namePrefix = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(namePrefix) == 0) {
                return c.substring(namePrefix.length, c.length);
            }
        }
        return null;
    }
};
export default {
    data() {
        that = this;
        return {
            isShow: true,
            ruleForm: {
                name: "",
                email: "",
                phone: "",
                printer: "",
                location: "",
                date: "",
                contribute: "",
                office: "",
                position: "",
                type: []
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入您的姓名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请输入您的邮箱",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                location: [
                    {
                        required: true,
                        message: "请输入您的地址",
                        trigger: "blur"
                    }
                ],
                contribute: [
                    {
                        required: true,
                        message: "请输入授权贡献者（姓名）",
                        trigger: "blur"
                    }
                ],
                position: [
                    {
                        required: true,
                        message: "请输入您的职位",
                        trigger: "blur"
                    }
                ],
                office: [
                    {
                        required: true,
                        message: "请输入您的公司名称",
                        trigger: "blur"
                    }
                ],
                date: [
                    { required: true, message: "请输入日期", trigger: "blur" }
                ]
            },
            reverse: true,
            activities: [
                {
                    content: "活动按期开始",
                    timestamp: "2018-04-15"
                },
                {
                    content: "通过审核",
                    timestamp: "2018-04-13"
                },
                {
                    content: "创建成功",
                    timestamp: "2018-04-11"
                }
            ]
        };
    },
    mounted() {
        let cla = localMethods.readCookie('cla-info');
        if (!cla || cla === '') {
            // localMethods.oauthLogin();
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$message("恭喜你签署成功！");
                } else {
                    this.$message("重置成功！");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        isShowPerson() {
            this.isShow = !this.isShow;
            this.$refs.ruleForm.resetFields();
        }
    }
};
</script>
<style lang="less">
.cla {
    h1 {
        font-size: 36px;
        margin: 60px 0;
        font-family: FZLTHJW;
        line-height: 46px;
    }
    p {
        margin-bottom: 20px;
    }
    margin-bottom: 0;
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 1000px) {
    .cla-mobile-content {
        padding: 40px 30px 40px 30px;
        /deep/.mobile {
            display: block;
        }
        .cla-content {
            width: 315px;
            margin: 0 auto;
            .demo-ruleForm {
                width: 616px;
                margin: 0 auto;
            }
            .cla-title {
                width: 79px;
                height: 28px;
                font-size: 18px;
                font-family: FZLTCHJW;
                font-weight: normal;
                color: #000000;
                line-height: 28px;
                margin-top: 0px;
                margin-bottom: 40px;
            }
            .cla-all-word {
                width: 315px;
                height: 1536px;
                font-size: 14px;
                font-family: FZLTXIHJW;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.5);
                line-height: 24px;

                p {
                    margin-bottom: 20px;
                }
            }
            .radio {
                width: 315px;
                height: 40px;
                padding-top: 0px;
                text-align: center;
                border-bottom: 0px solid rgba(0, 0, 0, 0.5);
                /deep/.el-radio__label {
                    width: 112px;
                    height: 26px;
                    font-size: 16px;
                    font-family: FZLTXIHJW;
                    font-weight: normal;
                    color: #000000;
                    line-height: 18px;
                }
                /deep/.el-radio {
                    margin-right: 20px;
                    &:last-of-type {
                        margin-right: 0px;
                        border-left: solid 1px #979797ff;
                        padding-left: 20px;
                    }
                }
            }
            .contribute-words {
                width: 315px;
                height: 40px;
                font-size: 14px;
                font-family: FZLTXIHJW;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.5);
                line-height: 20px;

                text-align: center;
                margin-top: 19px;
                margin-bottom: 28px;
            }
            /deep/.el-input__inner {
                width: 315px;
            }
            /deep/.el-form-item {
                margin-bottom: 17px;
                margin-left: -78px;
            }
            /deep/input::-webkit-input-placeholder {
                color: rgba(0, 0, 0, 0.25);
            }
        }
    }
    .web {
        display: none;
    }
}
/deep/.mobile {
    display: none;
}
.cla-content {
    width: 1120px;
    margin: 0 auto;
    .demo-ruleForm {
        width: 616px;
        margin: 0 auto;
    }
    .cla-title {
        width: 152px;
        height: 46px;
        font-size: 36px;
        font-family: FZLTHJW;
        font-weight: normal;
        color: #000000;
        line-height: 46px;
        margin-top: 60px;
        margin-bottom: 60px;
    }
    .cla-all-word {
        width: 1120px;
        height: 520px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
    }
    .radio {
        width: 1120px;
        height: 90px;
        padding-top: 50px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        /deep/.el-radio__label {
            width: 126px;
            height: 18px;
            font-size: 18px;
            font-family: FZLTXIHJW;
            font-weight: normal;
            color: #000000;
            line-height: 18px;
        }
        /deep/.el-radio {
            margin-right: 120px;
            &:last-of-type {
                margin-right: 0px;
                border-left: solid 1px #979797ff;
                padding-left: 120px;
            }
        }
    }
    .contribute-words {
        height: 24px;
        font-size: 14px;
        font-family: FZLTXIHJW;
        font-weight: normal;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        text-align: center;
        margin-top: 19px;
        margin-bottom: 28px;
    }
    /deep/.el-input__inner {
        margin-left: 16px;
    }
    /deep/.el-form-item {
        margin-bottom: 17px;
        margin-left: 17px;
    }
    /deep/.el-form-item__content {
        margin-left: -70px;
        text-align: center;
        transform: translateX(-37px);
    }
    /deep/input::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.25);
    }
    /deep/.el-button {
        margin-right: 50px;
        margin-bottom: 200px;
    }
    .cla-iocn {
        img {
            width: 100%;
        }
    }
}
</style>