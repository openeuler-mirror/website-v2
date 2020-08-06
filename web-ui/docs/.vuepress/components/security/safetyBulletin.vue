<template>
    <div class="safety-bulletin-content">
        <common-banner 
        :pc-src="'/img/security/notice-banner.png'" 
        :mobile-src="'/img/security/notice-banner.png'"
        :inside-name="'SECURITY'"
        :outside-name="i18n.security.SECURITY_ADVISORIES"
        ></common-banner>
        <div class="bulltin-list-wrapper">
            <el-form
                :inline="true"
                class="form"
            >
                <el-form-item :label="i18n.security.SEARCH">
                    <el-input
                        v-model="formData.keyword"
                        class="pc-search"
                    >
                        <i slot="append" class="icon-search" @click="initData(1)"></i>
                    </el-input>
                    <el-input
                        v-model="formData.keyword"
                        class="mobile-search"
                        :placeholder="i18n.security.SEARCH"
                    >
                        <i slot="append" class="icon-search" @click="initData(1)"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-radio-group v-model="formData.type" @change="initData(1)">
                        <el-radio-button v-for="(item, index) in i18n.security.SEVERITY_LIST" :key="index" :label="item.LABEL">{{ item.NAME }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="i18n.security.YEAR">
                    <el-select class="pc-select" v-model="formData.year" @change="initData(1)">
                        <el-option
                        :label="i18n.security.ALL"
                        value="0">
                        </el-option>
                        <el-option
                        label="2019"
                        :value="2019">
                        </el-option>
                        <el-option
                        label="2020"
                        :value="2020">
                        </el-option>
                    </el-select>
                    <el-select class="mobile-select" :placeholder="i18n.security.YEAR" v-model="formData.year" @change="initData(1)">
                        <el-option
                        :label="i18n.security.ALL"
                        value="0">
                        </el-option>
                        <el-option
                        label="2019"
                        :value="2019">
                        </el-option>
                        <el-option
                        label="2020"
                        :value="2020">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table
            v-loading.fullscreen="tableLoading"
            class="safety-bulletin-list"
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="securityNoticeNo"
                :label="i18n.security.ADVISORY">
                <template slot-scope="scope">
                    <a class="table-link" @click="go(scope.row.securityNoticeNo)">{{ scope.row.securityNoticeNo }}</a>
                </template>
                </el-table-column>
                <el-table-column
                prop="summary"
                :label="i18n.security.SYNOPSIS">
                </el-table-column>
                <el-table-column
                prop="type"
                :label="i18n.security.SEVERITY">
                </el-table-column>
                <el-table-column
                prop="affectedProduct"
                :label="i18n.security.AFFECTED_PRODUCTS">
                </el-table-column>
                <el-table-column
                prop="affectedComponent"
                :label="i18n.security.AFFECTED_COMPONENTS">
                </el-table-column>
                <el-table-column
                prop="announcementTime"
                :label="i18n.security.RELEASE_DATE">
                </el-table-column>
            </el-table>
            <ul class="mobile-list" v-loading.fullscreen="tableLoading">
                <li class="item" v-for="(item, index) in tableData" :key="index">
                    <ul>
                        <li><span>{{i18n.security.ADVISORY}}:</span><a class="table-link" @click="go(item.securityNoticeNo)">{{item.securityNoticeNo}}</a></li>
                        <li><span>{{i18n.security.SYNOPSIS}}:</span>{{item.summary}}</li>
                        <li><span>{{i18n.security.SEVERITY}}:</span>{{item.type}}</li>
                        <li><span>{{i18n.security.AFFECTED_PRODUCTS}}:</span>{{item.affectedProduct}}</li>
                        <li><span>{{i18n.security.AFFECTED_COMPONENTS}}:</span>{{item.affectedComponent}}</li>
                        <li><span>{{i18n.security.RELEASE_DATE}}:</span>{{item.announcementTime}}</li>
                    </ul>
                </li>
            </ul>
            <el-pagination
            class="safety-bulletin-pagination"
            :current-page.sync="formData.page"
            :page-size="formData.pageSize"
            layout="total, prev, pager, next, jumper"
            @current-change="initData"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { securityList } from "../../api/security";
import commonBanner from './../common/banner.vue';
let that = null;

const locationMethods = {
    getSecurityList (flag) {
        that.tableLoading = true;
        that.formData.page = flag;
        securityList(that.formData)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords){
                that.total = data.totalRecords;
                that.tableData = data.list;
            } else {
                that.total = 0;
                that.tableData = [];
            }
        })
        .catch(data => {
            that.$message.error(data);
            that.tableLoading = false;
        });
    }
}
export default {
    data() {
        that = this;
        return {
            formData: {
                keyword: '',
                type: '',
                year: '',
                page: 1,
                pageSize: 10
            },
            tableData : [],
            total: 0,
            tableLoading: false
        };
    },
    components: {
        commonBanner
    },
    created () {
        this.initData(1);
    },
    methods: {
        initData (flag) {
            locationMethods.getSecurityList(flag);
        },
        go (id){
            this.$router.push({
                path: this.resolvePath('/security/safety-bulletin/detail.html'),
                query: {id}
            })
        }
    }
};
</script>
<style lang="less">
.safety-bulletin-content {
    .el-select {
        @media (max-width: 1000px) {
            width: 100%;
        }
    }
    .el-input__icon {
        line-height: 32px;
    }
    .el-pagination {
        color: #282b33;
        font-family: FZLTHJW;
    }
    .el-pagination__jump {
        color: #282b33;;
    }
    .el-pager li.active {
        color: #002fa7;
    }
    .el-form-item__label {
        color: #000;
        font-size: 18px;
        font-family: FZLTXIHJW;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        color: #FFF;
        background-color: #002fa7;
        border-color: rgba(0, 0, 0, .5);
    }
    .el-radio-button__inner {
        color: rgba(0, 0, 0, .5);
        border-color: rgba(0, 0, 0, .5);
        font-size: 18px;
        font-family: FZLTXIHJW;
        padding: 6px 20px;
        @media (max-width: 1000px) {
            padding: 6px 15px;
        }
    }
    .el-radio-button__inner:hover {
        color: rgba(0, 0, 0, .5);
    }
    .el-radio-button:first-child .el-radio-button__inner {
        border-left: 1px solid rgba(0, 0, 0, .5);
    }
    .el-form-item__label {
        line-height: 32px;
        font-size: 18px;
        font-family: FZLTXIHJW;
        @media (max-width: 1000px) {
            display: none !important;
        }
    }
    .el-form-item__content {
        line-height: 32px;
        @media (max-width: 1000px) {
            width: 100%;
        }
    }
    .el-input__inner {
        height: 32px;
        line-height: 32px;
        border: 1px solid rgba(0, 0, 0, .5);
        color: #000;
    }
    .el-select-dropdown__item.selected {
        color: #002fa7;
    }
    .el-select-dropdown__item {
        color: #000;
    }
    .el-input-group__append {
        border: 1px solid rgba(0, 0, 0, .5);
        border-left: 0;
        background-color: unset;
        padding: 0;
        color: #000;
        font-size: 18px;
        cursor: pointer;
        i:hover {
            color: #002fa7;
        }
        i {
            padding: 0 10px;
        }
    }
    .el-table {
        color: rgba(0, 0, 0, .85);
    }
    .el-table thead {
        color: #000;
            font-size: 16px;    
    }
    .el-table th {
        background-color: rgba(0, 0, 0, .05);
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background-color: rgba(0, 0, 0, .05);
    }
    .el-table td, .el-table th {
        padding: 31px 0;
    }
    .el-pagination__total {
        color: #282b33;
        font-size: 14px;
        font-family: FZLTXIHJW;
    }    
}
    
</style>
<style lang="less" scoped>
.table-link {
    color: #002fa7;
    text-decoration: none;
    cursor: pointer;
}
.safety-bulletin-content {
    width: 1200px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
    }
    .safety-bulletin-pagination {
        margin-bottom: 200px;
        @media (max-width: 1000px) {
            margin-bottom: 80px;
        }
    }
    .safety-bulletin-banner {
        height: 600px;
        background-color: #002fa7;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .safety-bulletin-banner-mobile {
        display: none;
        margin-top: 40px;
        h3 {
            text-align: center;
            font-size: 24px;
            font-family: FZLTHJW;
            margin-bottom: 10px;
            height: 34px;
            line-height: 34px;
        }
        div {
            width: 100%;
            height: 200px;
            background-color: #002fa7;
        }
        @media (max-width: 1000px) {
            display: block;
        }
    }
    .bulltin-list-wrapper {
        .form {
            margin: 20px 0 28px 0;
            display: flex;
            justify-content: space-between;
            @media (max-width: 1000px) {
                flex-direction: column;
                margin: 40px 0 20px 0;
            }
            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                @media (max-width: 1000px) {
                    margin-bottom: 20px;
                }
                &:nth-child(2) {
                    @media (max-width: 1000px) {
                        order: 1;
                    }
                }
            }
            .pc-select, .pc-search {
                @media (max-width: 1000px) {
                    display: none;
                }
            }
            .mobile-select, .mobile-search {
                display: none;
                @media (max-width: 1000px) {
                    display: inline-table;;
                }
            }
        }
        .safety-bulletin-list {
            margin-bottom: 60px;
            @media (max-width: 1000px) {
                display: none;
            }
        }
        ul.mobile-list {
            line-height: 16px;
            display: none;
            width: 100%;
            margin-bottom: 60px;
            font-size: 12px;
            font-family: FZLTXIHJW;
            @media (max-width: 1000px) {
                display: block;
            }
            .item {
                padding: 20px;
                &:nth-child(odd){
                    background-color: rgba(0, 0, 0, .05);
                }
                li {
                    margin-bottom: 12px;
                    color: rgba(0, 0, 0, .5);
                    span {
                        color: #000;
                        margin-right: 4px;
                    }

                }
                li:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>