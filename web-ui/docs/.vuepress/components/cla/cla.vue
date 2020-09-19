<template>
    <div class="cla-mobile-content">
        <div :class="['cla-content', isMobile?'cla-mobile':'cla-pc']">
            <div class="radio">
                <el-radio-group v-model="type">
                    <el-radio :label="0">{{
                        i18n.cla.PERSONAL
                    }}</el-radio>
                    <el-radio :label="1">{{
                        i18n.cla.LAW
                    }}</el-radio>
                </el-radio-group>
            </div>
            <div class="web">
                <el-form
                    :model="individual"
                    :rules="individualRules"
                    ref="individual"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-show="!type"
                    v-if="!isMobile"
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
                                v-model="individual.name"
                                :placeholder="i18n.cla.NAME"
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
                                v-model="individual.email"
                                :placeholder="i18n.cla.EMAIL"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="telephone">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/phone.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="individual.telephone"
                                :placeholder="i18n.cla.PHONE"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="fax">
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
                                v-model="individual.fax"
                                :placeholder="i18n.cla.FAX"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="address">
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
                                v-model="individual.address"
                                :placeholder="i18n.cla.ADDRESS"
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
                                v-model="individual.date"
                                :disabled="true"
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
                            @click="submitForm"
                            >{{ i18n.cla.EDIT }}</el-button
                        >
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            @click="resetForm"
                            >{{ i18n.cla.DELEAT }}</el-button
                        >
                    </el-form-item>
                </el-form>
                <el-form
                    :model="legal"
                    :rules="legalRules"
                    ref="legal"
                    label-width="100px"
                    class="demo-ruleForm"
                    v-show="type"
                    v-if="!isMobile"
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
                                v-model="legal.name"
                                :placeholder="i18n.cla.AUTH_NAME"
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
                                v-model="legal.contribute"
                                :placeholder="i18n.cla.DONATE_NAME"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="title">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/name.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="legal.title"
                                :placeholder="i18n.cla.TITLE"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="corporation">
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
                                v-model="legal.corporation"
                                :placeholder="i18n.cla.CORPORATION"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                    </el-form-item>
                    <el-form-item prop="address">
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
                                v-model="legal.address"
                                :placeholder="i18n.cla.ADDRESS"
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
                                v-model="legal.email"
                                :placeholder="i18n.cla.EMAIL"
                            ></el-input>
                        </el-col>
                        <el-col :span="2" class="star"
                            >&nbsp&nbsp&nbsp&nbsp*</el-col
                        >
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="telephone">
                        <el-col :span="1">
                            <div class="cla-iocn">
                                <img src="../../public/img/cla/phone.svg" alt />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-input
                                v-model="legal.telephone"
                                :placeholder="i18n.cla.PHONE"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="fax">
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
                                v-model="legal.fax"
                                :placeholder="i18n.cla.FAX"
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
                                v-model="legal.date"
                                :disabled="true"
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
                    :model="individual"
                    :rules="individualRules"
                    ref="individual"
                    label-width="100px"
                    v-show="!type"
                    v-if="isMobile"
                >
                    <p class="contribute-words">
                        {{ i18n.cla.PERSONAL_WORDS }}
                    </p>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.name"
                                :placeholder="i18n.cla.NAME+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.email"
                                :placeholder="i18n.cla.EMAIL+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="telephone">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.telephone"
                                :placeholder="i18n.cla.PHONE"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="fax">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.fax"
                                :placeholder="i18n.cla.FAX"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="address">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.address"
                                :placeholder="i18n.cla.ADDRESS+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="24">
                            <el-input
                                v-model="individual.date"
                                :disabled="true"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <div class="mobile-btn">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="medium"
                            @click="submitForm"
                            >{{ i18n.cla.EDIT }}</el-button
                        >
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            size="medium"
                            @click="resetForm"
                            >{{ i18n.cla.DELEAT }}</el-button
                        >
                    </div>
                </el-form>
                <el-form
                    :model="legal"
                    :rules="legalRules"
                    ref="legal"
                    label-width="100px"
                    v-show="type"
                    v-if="isMobile"
                >
                    <p class="contribute-words">{{ i18n.cla.LEGAL_WORD }}</p>
                    <el-form-item prop="name">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.name"
                                :placeholder="i18n.cla.AUTH_NAME+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="contribute">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.contribute"
                                :placeholder="i18n.cla.DONATE_NAME+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="title">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.title"
                                :placeholder="i18n.cla.TITLE+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="corporation">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.corporation"
                                :placeholder="i18n.cla.CORPORATION+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="address">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.address"
                                :placeholder="i18n.cla.ADDRESS+'*'"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.email"
                                :placeholder="i18n.cla.EMAIL+'*'"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="telephone">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.telephone"
                                :placeholder="i18n.cla.PHONE"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="fax">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.fax"
                                :placeholder="i18n.cla.FAX"
                            ></el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                    </el-form-item>
                    <el-form-item prop="date">
                        <el-col :span="24">
                            <el-input
                                v-model="legal.date"
                                :disabled="true"
                            ></el-input>
                        </el-col>
                    </el-form-item>
                    <div class="mobile-btn">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            size="medium"
                            @click="submitForm"
                            >{{ i18n.cla.EDIT }}</el-button
                        >
                        <el-button
                            type="primary"
                            icon="el-icon-delete"
                            size="medium"
                            @click="resetForm"
                            >{{ i18n.cla.DELEAT }}</el-button
                        >
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { signCla } from './../../api/cla'
let that = null;
let clienId = 'd00e9b289d8cf8f98e2fc68a9c240304f6413007d82d30701cd1da7e937db75c';

let remoteMethods = {
    signCla (postData) {
        signCla(postData)
        .then(data => {
            if (data.isSuccess) {
                that.$message({
                    message: that.i18n.cla.SIGN_SUCCESS,
                    type: 'success'
                });
            }else{
                that.$message.error('error');
            }
        })
        .catch(data => {
            that.$message.error('error');
        });
    }
}

let localMethods = {
    initClaPage () {
        let cla = localMethods.readCookie("cla-info");
        if (!cla || cla == "") {
            localMethods.oauthLogin();
            return;
        }
        localMethods.renderInfo();
    },
    readCookie (name) {
        let namePrefix = name + "=";
        let cookies = document.cookie.split(';');
        for(let i=0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0)==' ') c = c.substring(1, c.length);
            if (c.indexOf(namePrefix) == 0) return c.substring(namePrefix.length, c.length);
        }
        return null;
    },
    oauthLogin () {
        let redirectUri = window.location.origin + '/cla';
        window.location.href = `https://gitee.com/oauth/authorize?client_id=${clienId}&redirect_uri=${encodeURI(redirectUri)}&response_type=code&scope=user_info%20emails`;
    },
    renderInfo () {
        that.type = this.readCookie('type') || 0;
        if(!that.type){
            that.individual.name = this.readCookie('name');
            that.individual.email = this.readCookie('email');
            that.individual.telephone = this.readCookie('telephone');
            that.individual.fax = this.readCookie('fax');
            that.individual.address = this.readCookie('address');
            that.individual.date = this.readCookie('date');
        }

        if(that.type){
            that.legal.name = this.readCookie('name');
            that.legal.email = this.readCookie('email');
            that.legal.telephone = this.readCookie('telephone');
            that.legal.fax = this.readCookie('fax');
            that.legal.address = this.readCookie('address');
            that.legal.date = this.readCookie('date');
            that.legal.corporation = this.readCookie('corporation');
            that.legal.title = this.readCookie('title');
        }
    },
    getCurDate () {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let date = now.getDate();
        month = month + 1;

        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        return year + "-" + month + "-" + date;
        
    }
}

export default {
    data() {
        that = this;
        let validator = (rule, value, callback, source) => {
            let mes = '';
            for(let i in source){
                mes = that.i18n.cla.VALIDATE[i.toUpperCase()];
            }
            if (!value) {
                return callback(new Error(mes));
            }
            return callback();
        }
        return {
            isShow: true,
            individual: {
                name: "",
                email: "",
                telephone: "",
                fax: "",
                address: "",
                date: localMethods.getCurDate()
            },
            legal: {
                name: "",
                email: "",
                telephone: "",
                fax: "",
                address: "",
                date: localMethods.getCurDate(),
                contribute: "",
                corporation: "",
                title: ""
            },
            individualRules: {
                name: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ]
            },
            legalRules: {
                name: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                contribute: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                title: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                corporation: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        validator: validator,
                        trigger: "blur"
                    }
                ]
            },
            type: 0,
            isMobile: false
        };
    },
    mounted() {
        if(document.body.getBoundingClientRect().width < 1000){
            this.isMobile = true;
        }
        localMethods.initClaPage();
    },
    methods: {
        submitForm() {
            let strTemp = '';
            let postData = null;
            if(!this.type){
                strTemp = 'individual';
                postData = this.individual;
            }else {
                strTemp = 'legal';
                postData = this.legal;
            }
            postData.type = this.type;
            postData.lang = this.$lang;
            postData.client = clienId;
            this.$refs[strTemp].validate(valid => {
                if (valid) {
                    remoteMethods.signCla(postData);
                }
            });
        },
        resetForm() {
            let strTemp = '';
            let postData = null;
            if(!this.type){
                strTemp = 'individual';
                postData = this.individual;
            }else {
                strTemp = 'legal';
                postData = this.legal;
            }
            this.$refs[strTemp].resetFields();
            for(let i in this[strTemp]){
                if(i != 'date'){
                    this[strTemp][i] = '';
                }
            }
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
.cla-mobile {
    .el-form .el-form-item__error {
        left: 16px;
        padding-top: 0;
    }
}
.cla-pc {
    .el-form .el-form-item__error {
        left: 39px;
        padding-top: 0;
    }
}
.mobile-btn {
    text-align: center;
}
.mobile-btn .el-button {
    margin-right: 0 !important;
    margin-bottom: 80px !important;
}
.mobile-btn .el-button:first-child {
    margin-right: 40px !important;
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
                width: 100%;
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
            vertical-align: middle;
        }
    }
}
</style>