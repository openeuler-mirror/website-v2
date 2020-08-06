<template>
    <div class="cve-list-content">
        <common-banner 
        :pc-src="'/img/security/cve-banner.png'" 
        :mobile-src="'/img/security/cve-banner.png'"
        :inside-name="'SECURITY'"
        :outside-name="'CVE'"
        ></common-banner>
        <div class="cve-list-wrapper">
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
                        :placeholder="i18n.security.INPUT_CVE_ID"
                    >
                        <i slot="append" class="icon-search" @click="initData(1)"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-table
            v-loading.fullscreen="tableLoading"
            tooltip-effect="light"
            class="cve-list-list"
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="cveId"
                label="CVE">
                <template slot-scope="scope">
                    <a class="table-link" @click="go(scope.row.cveId)">{{ scope.row.cveId }}</a>
                </template>
                </el-table-column>
                <el-table-column
                width="450"
                show-overflow-tooltip
                prop="summary"
                :label="i18n.security.SYNOPSIS">
                </el-table-column>
                <el-table-column
                prop="cvssScoreOE"
                :label="i18n.security.CVSS_SCORE">
                </el-table-column>
                <el-table-column
                prop="announcementTime"
                :label="i18n.security.RELEASE_DATE">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                :label="i18n.security.MODIFIED_TIME">
                </el-table-column>
                <el-table-column
                :label="i18n.security.OPERATION">
                <template slot-scope="scope">
                    <a class="table-link" @click="go(scope.row.cveId)">{{ i18n.security.DETAIL }}</a>
                </template>
                </el-table-column>
            </el-table>
            <ul class="mobile-list" v-loading.fullscreen="tableLoading">
                <li class="item" v-for="(item, index) in tableData" :key="index">
                    <ul>
                        <li><span>CVE:</span><a class="table-link" @click="go(item.cveId)">{{item.cveId}}</a></li>
                        <li>
                            <span class="title">{{i18n.security.SYNOPSIS}}:</span>
                            <span :class="{'content': true, 'overflow': !item.overflow}">{{item.summary}}</span>
                            <a v-show="!item.overflow" class="table-link" @click="item.overflow = !item.overflow">>></a>
                        </li>
                        <li><span>{{i18n.security.CVSS_SCORE}}:</span>{{item.cvssScoreOE}}</li>
                        <li><span>{{i18n.security.RELEASE_DATE}}:</span>{{item.announcementTime}}</li>
                        <li><span>{{i18n.security.MODIFIED_TIME}}:</span>{{item.updateTime}}</li>
                        <li><span>{{i18n.security.OPERATION}}:</span><a class="table-link" @click="go(item.cveId)">{{i18n.security.DETAIL}}</a></li>
                    </ul>
                </li>
            </ul>
            <el-pagination
            class="cve-list-pagination"
            :current-page.sync="formData.page"
            :page-size="formData.pageSize"
            layout="total, prev, pager, next, jumper"
            @current-change="initData"
            :total="total">
            </el-pagination>
            <el-pagination
            :pager-count="5"
            class="cve-list-pagination-mobile"
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
import { cveList } from "../../api/security";
import commonBanner from './../common/banner.vue';
let that = null;

const locationMethods = {
    getCveList (flag) {
        that.tableLoading = true;
        that.formData.page = flag;
        cveList(that.formData)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords){
                that.total = data.totalRecords;
                data.list.forEach(element => {
                    element.overflow = false;
                });
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
                page: 1,
                pageSize: 10
            },
            tableData : [],
            total: 0,
            tableLoading: false
        };
    },
    created () {
        this.initData (1);
    },
    methods: {
        initData (flag) {
            locationMethods.getCveList(flag);
        },
        go (id){
            this.$router.push({
                path: this.resolvePath('/security/cve/detail.html'),
                query: {id}
            })
        }
    },
    components: {
        commonBanner
    }
};
</script>
<style lang="less">
.cve-list-content {
    .el-pagination {
        color: #282b33;
        font-family: FZLTHJW;
        .el-pager {
            li {
                @media (max-width: 1000px) {
                    &:not(.active) {
                        display: none;
                    }
                }
            }
        }
    }
    .el-pagination__jump {
        color: #282b33;;
    }
    .el-pager li.active {
        color: #002fa7;
    }
    .el-tooltip__popper {
        width: 500px;
        font-size: 14px;
    }
    .el-form-item__label {
        color: #000;
        font-size: 18px;
        font-family: FZLTXIHJW;
        @media (max-width: 1000px) {
            display: none !important;
        }
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
    }
    .el-radio-button__inner:hover {
        color: rgba(0, 0, 0, .5);
    }
    .el-radio-button:first-child .el-radio-button__inner {
        border-left: 1px solid rgba(0, 0, 0, .5);
    }
    .el-form-item__label {
        line-height: 32px;
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
.cve-list-content {
    width: 1200px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
    }
    .cve-list-pagination {
        margin-bottom: 200px;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .cve-list-pagination-mobile {
        @media (max-width: 1000px) {
            margin-bottom: 80px;
        }
    }
    .cve-list-pagination-mobile {
        display: none;
        @media (max-width: 1000px) {
            display: block;
        }
    }
    .cve-list-banner {
        height: 600px;
        background-color: #002fa7;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .cve-list-banner-mobile {
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
    .cve-list-wrapper {
        .form {
            margin: 20px 0 28px;
            @media (max-width: 1000px) {
                margin: 40px 0;
            }
            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                @media (max-width: 1000px) {
                    width: 100%;
                }
            }
            .pc-search {
                @media (max-width: 1000px) {
                    display: none;
                }
            }
            .mobile-search {
                display: none;
                @media (max-width: 1000px) {
                    display: inline-table;;
                }
            }
        }
        .cve-list-list {
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
                    span:first-child {
                        color: #000;
                        margin-right: 4px;
                    }

                }
                li:last-child {
                    margin-bottom: 0;
                }
                li:nth-child(2){
                    display: flex;
				    position: relative;
                    .title {
                        flex-shrink: 0;
                    };
                    .content {
                        flex: 1;
                        text-align: justify;
                    };
                    .table-link {
                        align-self: flex-end;
                    }
                }
                .overflow{
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>
