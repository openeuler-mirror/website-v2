<template>
    <div class="search">
        <div class="search-banner">
            <img src="/img/other/search/search.png" alt="">
            <div class="search-area">
                <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="formData.keyword">
                    <i slot="suffix" @click="initData(1)"><img src="/img/other/search/search-icon.svg" alt=""></i>
                </el-input>
            </div>
        </div>
        <div class="search-tag">
            <div class="tag-title">
                <ul>
                    <li class="active"><span>全部（218）</span></li>
                    <li><span>文档（180）</span></li>
                    <li><span>新闻（5）</span></li>
                    <li><span>博客（23）</span></li>
                </ul>
            </div>
            <div class="tag-content">
                <div class="tag-left">
                    <div class="tags-info">
                        <h3><a href="">浅谈<em>openEuler</em>开源社区运营度量分析系统造型</a></h3>
                        <p>openEuler开源社区建立后，我们采取了一系列的运营措施，可是如何知道这些运营措施是有效的，如何才能知道哪些措施更优呢，如何判断一次运营活动真正带来了多少用户呢？为了解决这一系列问题…</p>
                        <p class="articla-from"><span>{{ i18n.search.TAG_NAME.FROM }}：</span><span class="artical-tag">博客</span></p>
                    </div>
                    <div class="tags-info">
                        <h3><a href="">浅谈<em>openEuler</em>开源社区运营度量分析系统造型</a></h3>
                        <p>openEuler开源社区建立后，我们采取了一系列的运营措施，可是如何知道这些运营措施是有效的，如何才能知道哪些措施更优呢，如何判断一次运营活动真正带来了多少用户呢？为了解决这一系列问题…</p>
                        <p class="articla-from"><span>{{ i18n.search.TAG_NAME.FROM }}：</span><span class="artical-tag">博客</span></p>
                    </div>
                    <div class="tags-info">
                        <h3><a href="">浅谈<em>openEuler</em>开源社区运营度量分析系统造型</a></h3>
                        <p>openEuler开源社区建立后，我们采取了一系列的运营措施，可是如何知道这些运营措施是有效的，如何才能知道哪些措施更优呢，如何判断一次运营活动真正带来了多少用户呢？为了解决这一系列问题…</p>
                        <p class="articla-from"><span>{{ i18n.search.TAG_NAME.FROM }}：</span><span class="artical-tag">博客</span></p>
                    </div>
                </div>
                <div class="tag-right">
                    <h4>相关软件包</h4>
                    <el-scrollbar>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                        <div class="package">
                            <p class="pkg-title">openEuler 20.03 LTS-iso</p>
                            <p>软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息软件包信息…</p>
                        </div>
                    </el-scrollbar>
                </div>
            </div>

            <div class="tag-page">
                <el-pagination
                        class="search-pagination"
                        :current-page.sync="formData.page"
                        :page-size="5"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :total="100">
                </el-pagination>
                <el-pagination
                        class="search-pagination-mobile"
                        :current-page.sync="formData.page"
                        :page-size="5"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :total="100">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import { search } from "../../api/search";
    let that = null;

    const locationMethods = {
        getSearchPage (flag) {
            that.formData.page = flag;
            search(this.formData)
                .then(response => {
                    that.tagTitle = response.data.total;
                    that.total = response.data.totalNum;
                    that.allDatas = response.data.records;
                })
                .catch(response => {
                    that.$message.error(response);
                });
        }
    }
    export default {
        name: "search",
        data() {
            that = this;
            return {
                searchInput: "",
                formData: {
                    keyword: "",
                    model: "",
                    indexEs: "",
                    openeulerArticles: "",
                    page: 1,
                },
                total: 0,
                tagTitle: [],
                allDatas: [],
            }
        },
        mounted() {
            this.formData.keyword = this.$route.query.id
            this.formData.indexEs = this.$lang
            this.formData.model = 'all'
            locationMethods.getSearchPage(1);
        },
        methods: {
            initData(flag) {
                locationMethods.getSearchPage(flag)
            },
            handleCurrentChange(val) {
                this.currentPage=val
            },
        }
    }
</script>

<style lang="less">
    .search-area .el-input__inner {
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        font-family: FZLTHJW;
        color: #000;
        border: 2px solid #000;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    }
    .search-area .el-input__inner:hover {
        border: 2px solid #002FA7;
    }
    .tag-right .el-scrollbar {
        height: 1135px;
    }
    .tag-left .el-scrollbar__wrap {
        width: calc(~"100% + 17px");
        height: calc(~"100% + 17px");
    }
    .search-tag .el-tab-pane {
        width: 730px;
        min-height: 1300px;
        padding-right: 30px;
        border-right: 1px solid #D8D8D8;
    }
</style>
<style scoped>
    .search-pagination {
        display: block;
    }
    .search-pagination-mobile {
        display: none;
    }
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
    .search-area {
        width: 400px;
        height: 60px;
        margin: 0 auto 80px;
    }
    .search-area img {
        width: 27px;
        height: 27px;
        vertical-align: middle;
        margin: 18px 25px;
    }
    .search-tag {
        width: 1120px;
        margin: 0 auto 180px;
    }
    .tag-content {
        width: 1120px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .tag-title {
        height: 40px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
    .tag-title::after {
        content: "";
        clear: both;
    }
    .tag-title span {
        font-size: 16px;
        font-family: FZLTXIHJW;
        cursor: pointer;
    }
    .tag-title li {
        float: left;
        width: 130px;
        text-align: center;
        padding-bottom: 15px;
    }
    .tag-left {
        border-right: 1px solid #D8D8D8;
        padding-right: 30px;
        margin-right: 30px;
    }
    .tag-left a {
        font-size: 20px;
        font-family: FZLTHJW;
        text-decoration: none;
        color: #000;
    }
    .tag-left em {
        color: #002FA7;
    }
    .tag-left p {
        font-size: 14px;
        font-family: FZLTXIHJW;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
    }
    .tags-info {
        margin-top: 40px;
    }
    .tags-info:first-child {
        margin-top: 20px;
    }
    .articla-from {
        font-size: 12px;
    }
    .artical-tag {
        color: #000;
    }
    .tag-right {
        margin-top: 20px;
    }
    h4 {
        font-size: 20px;
        font-family: FZLTCHJW;
        margin-bottom: 15px;
    }
    p {
        font-size: 14px;
        font-family: FZLTXIHJW;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        margin: 10px 0 20px;
    }
    .pkg-title {
        font-size: 14px;
        font-family: FZLTXIHJW;
        font-weight: normal;
        color: #002FA7;
    }
</style>