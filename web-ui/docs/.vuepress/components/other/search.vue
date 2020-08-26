<template>
    <div class="search">
        <div class="search-banner">
            <img src="/img/security/cve-banner.png" alt="">
            <div class="search-input">
                <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="searchInput">
                    <i slot="suffix" @click="searchInfo"><img src="/img/other/search/search-icon.svg" alt=""></i>
                </el-input>
            </div>
        </div>
        <div class="search-tag">
            <div class="tag-title">
                <span> 全部 ( {{ this.total }} )</span>
                <span v-for="(item, index) in tagTitle" :key="index"> {{ item.key }} ( {{ item.doc_count }} )</span>
            </div>
            <div class="tag-content" v-loading.fullscreen="contentLoading">
                <div class="tag-right">

<!--                    <el-pagination
                            class="cve-list-pagination"
                            :current-page.sync="formData.page"
                            :page-size="10"
                            layout="total, prev, pager, next, jumper"
                            @current-change="initData"
                            :total="total">
                    </el-pagination>
                    <el-pagination
                            :pager-count="5"
                            class="cve-list-pagination-mobile"
                            :current-page.sync="formData.page"
                            :page-size="10"
                            layout="total, prev, pager, next, jumper"
                            @current-change="initData"
                            :total="total">
                    </el-pagination>-->
                </div>
                <div class="tag-left">
                    <el-scrollbar>

                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { search } from "../../api/search"
    export default {
        name: "search",
        data() {
            return {
                searchInput: "",
                formData: {
                    keyword: "华为",
                    model: "",
                    indexEs: "",
                    openeuler_articles: "",
                    page: "1",
                },
                total: 0,
                tagTitle: "",
                contentLoading: false
            }
        },
        mounted() {
            search(this.formData)
                .then(response => {
                    console.log('data', response)
                    // this.formData.indexEs = this.$lang
                    this.tagTitle = response.data.total;
                    this.total = response.data.totalNum;
                })
                .catch(response => {
                    this.$message.error('数据加载错误');
                });
        },
        methods: {
            searchInfo() {
            }
        }
    }
</script>

<style lang="less">
    .search-input .el-input__inner {
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        font-family: FZLTHJW;
        color: #000;
        border: 2px solid #000;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    }
    .search-input .el-input__inner:hover {
        border: 2px solid #002FA7;
    }
    .el-scrollbar{
        height: 100%;
    }
    .el-scrollbar__wrap {
        width: calc(~"100% + 17px");
        height: calc(~"100% + 17px");
    }
</style>
<style scoped>
    .search-banner {
        width: 1080px;
        text-align: center;
        margin: 0 auto;
    }
    .search-banner img {
        width: 175px;
        height: 200px;
        margin: 30px 0 40px;
    }
    .search-input {
        width: 400px;
        height: 60px;
        margin: 0 auto 80px;
    }
    .search-input img {
        width: 27px;
        height: 27px;
        vertical-align: middle;
        margin: 18px 25px;
    }
    .search-tag {
        width: 1080px;
        margin: 0 auto;
    }
    .tag-title {
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
    .tag-title span {
        font-size: 16px;
        font-family: FZLTXIHJW;
        margin-right: 30px;
        cursor: pointer;
    }
    .tag-title span:first-child {
        margin-left: 20px;
    }
    .tag-right {
        display: inline-block;
        width: 695px;
        margin-top: 20px;
        padding-right: 30px;
        margin-right: 30px;
        border-right: 1px solid #D8D8D8;
    }
    .tag-left {
        display: inline-block;
        width: 350px;
        height: 80px;
    }
</style>