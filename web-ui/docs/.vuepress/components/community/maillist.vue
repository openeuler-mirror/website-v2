<template>
    <div class="mail-list">
        <div class="mail-banner">
            <h3 class="is-h5">{{ i18n.community.MAILING_LIST.TITLE_H5 }}</h3>
        </div>
        <div class="maillist is-pc">
            <div class="maillist-divider-mail is-pc">
                <div class="maillist-icon-comm"></div>
            </div>
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.MAILING_LIST.GUIDE_CONTENT"
                 :key="index">
                <div class="step-left">
                    <div class="mail-box">
                        <div class="step-left-box">
                            <div class="inner-box">
                                <img :src="item.LEFT.LEFT_IMG" alt="">
                                <p>{{ item.LEFT.LEFT_INFO }}</p>
                            </div>
                        </div>
                        <div class="step-left-num">
                            <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
                        </div>
                        <div class="step-line"></div>
                    </div>
                </div>
                <div class="step-right">
                    <div class="mail-box">
                        <div class="step-line"></div>
                        <div class="step-right-num">
                            <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                        </div>
                        <div class="step-right-box">
                            <div class="inner-box">
                                <img :src="item.RIGHT.LEFT_IMG" alt="">
                                <p>{{ item.RIGHT.RIGHT_INFO }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="maillist is-h5">
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.MAILING_LIST.GUIDE_CONTENT"
                 :key="index">
                <div class="step-left">
                    <div class="mail-box">
                        <div class="step-left-box">
                            <div class="step-left-num">
                                <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
                            </div>
                            <div class="inner-box">
                                <img :src="item.LEFT.LEFT_IMG" alt="">
                                <p>{{ item.LEFT.LEFT_INFO }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-right">
                    <div class="mail-box">
                        <div class="step-right-num">
                            <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                        </div>
                        <div class="step-right-box">
                            <div class="inner-box">
                                <img :src="item.RIGHT.LEFT_IMG" alt="">
                                <p>{{ item.RIGHT.RIGHT_INFO }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mail-table is-pc">
            <el-table
                    :data="list"
                    stripe>
                <el-table-column
                        prop="display_name"
                        :label="i18n.community.MAILING_LIST.TABLE.NAME"
                        width="180">
                    <template slot-scope="scope">
                        <a class="list-name">
                            <p class="list-id">{{ scope.row.list_id }}</p>
                            <p>{{ scope.row.display_name }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fqdn_listname"
                        :label="i18n.community.MAILING_LIST.TABLE.EMAIL_ADDRESS"
                        width="260">
                </el-table-column>
                <el-table-column
                        prop="archive"
                        :label="i18n.community.MAILING_LIST.TABLE.ARCHIVE"
                        width="120">
                    <template slot-scope="scope">
                        <a>
                            <p>{{ scope.row.archive }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        :label="i18n.community.MAILING_LIST.TABLE.DESCRIPTION">
                </el-table-column>
            </el-table>
        </div>
        <div class="mail-table is-h5">
            <el-table
                    :data="list"
                    stripe>
                <el-table-column
                        prop="display_name"
                        :label="i18n.community.MAILING_LIST.TABLE.NAME_H5"
                        width="80">
                    <template slot-scope="scope">
                        <a class="list-name">
                            <p class="list-id">{{ scope.row.list_id }}</p>
                            <p>{{ scope.row.display_name }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="archive"
                        :label="i18n.community.MAILING_LIST.TABLE.ARCHIVE_H5"
                        width="80">
                    <template slot-scope="scope">
                        <a>
                            <p>{{ scope.row.archive }}</p>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="description"
                        :label="i18n.community.MAILING_LIST.TABLE.DESCRIPTION">
                </el-table-column>
            </el-table>
        </div>
        <div class="mail-subscribe">
            <h3>{{ i18n.community.MAILING_LIST.SUBSCRIBE.TITLE }}</h3>
            <div class="description">
                <p>{{ i18n.community.MAILING_LIST.SUBSCRIBE.PART_ONE }}</p>
                <p>{{ i18n.community.MAILING_LIST.SUBSCRIBE.PART_TWO }}</p>
                <p>{{ i18n.community.MAILING_LIST.SUBSCRIBE.PART_THREE }}</p>
            </div>
            <form>
                <p>{{ i18n.community.MAILING_LIST.SUBSCRIBE.REMIND }}</p>
                <div class="user-id">
                    <img src="" alt="">
                    <el-input
                        v-model="userInputEmail"
                        :placeholder="i18n.community.MAILING_LIST.SUBSCRIBE.INPUT_ADD"
                        ref="emailZh"></el-input>
                </div>
                <div class="user-name">
                    <img src="" alt="">
                    <el-input
                        v-model="userInputName"
                        :placeholder="i18n.community.MAILING_LIST.SUBSCRIBE.INPUT_NAME"
                        ref="userName"></el-input>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mailList } from "../../api/maillist"
    import { subscribe } from "../../api/mailsubscribe"

    export default {
        name: "maillist",
        data() {
            return {
                inPC: true,
                inEn: true,
                list: null,
                subscribe: null,
                listId: "test.openeuler.org",
                input: "",
                userInputEmail: "",
                userInputName: ""
            }
        },
        mounted() {
            mailList()
                .then(response => {
                    this.list = response.data.entries;
                    this.list.forEach(item => { item.archive = "Archive"});
                })
                .catch(response => {
                    console.log(response);
                });
            subscribe({
                listId: "test.openeuler.org"
            })
                .then(response => {
                    this.subscribe = response.data;
                })
                .catch(response => {
                    console.log(response);
                });
            this.readInput()
        },
        methods: {
            readInput() {
            }
        }
    }
</script>

<style lang="less">
    .mail-table table {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        font-family: 方正兰亭细黑简体;
    }
    .mail-table .el-table {
        width: 80%;
    }
    .mail-table .el-table td {
        border: none;
    }
    .mail-table .el-table th > .cell {
        padding-left: 30px;
    }
    .mail-table .el-table .cell {
        padding-left: 30px;
    }
    .mail-table .el-table thead {
        font-size: 16px;
        color: #000;
        font-family: 方正兰亭黑简体;
    }
    .mail-table .el-table__row td p,
    .mail-table .el-table__row td p {
        color: #002FA7;
        font-size: 14px;
    }
    .mail-table .el-table td, .el-table th.is-leaf {
        border: none;
    }
    .mail-table .el-table th.is-leaf {
        background: rgba(0, 0, 0, 0.05);
    }
    .mail-table .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: rgba(0, 0, 0, 0.03);
    }
    .mail-table .el-table--fit {
        margin: 0 auto;
    }
    .mail-table .el-table--enable-row-hover .el-table__body tr:nth-child(odd):hover>td {
        background: #fff;
    }
    @media screen and (max-width: 768px) {
        .mail-table table {
            font-size: 12px;
        }
        .mail-table .el-table {
            width: 100%;
        }
        .mail-table .el-table__row td p,
        .mail-table .el-table__row td p {
            font-size: 12px;
        }
        .mail-table .el-table .cell:nth-child(1) {
            padding-left: 10px;
        }
        .mail-table .el-table th > .cell:nth-child(1) {
            padding-left: 10px;
        }
        .mail-table .el-table__row td:nth-child(1) .cell p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .mail-table .el-table__row td:nth-child(3) {
            overflow: hidden;
            display: -webkit-box;
            word-wrap: break-word;
            word-break: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
    }
</style>

<style scoped>
    .is-h5 {
        display: none;
    }
    .is-pc {
        display: block;
    }
    p {
        font-size: 16px;
        color: #000;
        font-family: FZLTXIHJW;
    }
    .maillist {
        width: 1200px;
        margin: 80px auto 120px;
    }
    .maillist-divider-mail {
        width: 2px;
        left: 710px;
        height: 605px;
        background-image: linear-gradient(to top, #002FA7 0%, #002FA7 50%, transparent 50%);
        background-size: 2px 11px;
        background-repeat: repeat-y;
        position: absolute;
    }
    .maillist-icon-comm {
        width: 0;
        height: 0;
        border-width: 15px;
        border-style: solid;
        border-color: #002FA7 transparent transparent transparent;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }
    .step-right-box,
    .step-left-box {
        width: 380px;
        height: 200px;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .1);
        border-radius: 8px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
    }
    .step-left-box {
        margin-right: 40px;
    }
    .step-right-box {
        margin-left: 40px;
    }
    .step-left {
        z-index: 20;
    }
    .step-right {
        text-align: right;
        margin: -30px 0;
    }
    .step-left-num,
    .step-right-num {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 50%;
        background-color: #002FA7;
        display: inline-block;
    }
    .step-left-num span,
    .step-right-num span {
        color: #fff;
        font-size: 20px;
    }
    .step-line {
        width: 107px;
        height: 2px;
        display: inline-block;
        vertical-align: middle;
        border-spacing: 24px;
        background-image: linear-gradient(to right, #002FA7 0%, #002FA7 50%, transparent 50%);
        background-size: 8px 2px;
        background-repeat: repeat-x;
    }
    .mail-box {
        padding: 0;
        height: 200px;
    }
    .mail-box p {
        margin: 0 20px;
        line-height: 26px;
        color: rgba(0, 0, 0, 0.5);
    }
    .inner-box {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .inner-box img {
        width: 90px;
        height: 80px;
        margin-left: 20px;
    }
    .mail-table {
        margin-bottom: 200px;
    }
    .list-id {
        display: none;
    }
    @media screen and (max-width: 1000px) {
        .is-h5 {
            display: block;
        }
        .is-pc {
            display: none;
        }
        h3 {
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            margin: 40px 0 10px;
        }
        .maillist {
            width: 100%;
        }
        .maillist-divider-mail {
            display: none;
        }
        .step-line {
            display: none;
        }
        .maillist {
            margin-bottom: 80px;
            margin-top: 0;
        }
        .step-left,
        .step-right {
            margin: 40px 30px;
        }
        .step-right {
            text-align: center;
        }
        .step-left-num,
        .step-right-num {
            width: 48px;
            height: 48px;
            line-height: 48px;
        }
        .step-num span {
            color: #fff;
            font-size: 18px;
        }
        .step-right-box,
        .step-left-box {
            width: 100%;
            height: 100%;
            box-shadow: none;
            border: none;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
        }
        .step-right-box {
            margin-left: 0;
        }
        .mail-box {
            height: 100%;
        }
        .mail-box p {
            text-align: left;
            font-size: 14px;
            line-height: 24px;
        }
        .inner-box,
        .inner-box {
            width: 315px;
            height: 160px;
            margin: 0 auto;
            box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
        }
        .mail-table {
            padding: 0 30px;
        }
        .mail-table {
            margin-bottom: 80px;
        }
    }
</style>