<template>
    <div class="search">
        <div class="search-banner">
            <img src="/img/other/search/search.png" alt="">
            <div class="search-input">
                <el-input
                        :placeholder="i18n.common.SEARCH_PLACE_HOLDER"
                        v-model="formData.keyword">
                    <i slot="suffix" @click="initData(1)"><img src="/img/other/search/search-icon.svg" alt=""></i>
                </el-input>
            </div>
        </div>
        <div class="search-tag">
            <div class="tag-content" v-loading.fullscreen="contentLoading">
                <div v-if="status">
                    <el-tabs v-model="activeName">
                        <template class="tag-title">
                            <el-tab-pane :label="i18n.search.TAG_NAME.ALL + ' ( ' + getCount('all') + ' )'" name="first">
                                <div class="search-detail">
                                    <div class="tags-info" v-for="(item, index) in allDatas" :key="index">
                                        <h3 v-html="item.title"><a :href="item.path"></a></h3>
                                        <p>{{ item.textContent }}</p>
                                        <p class="articla-from"><span>来源： </span><span class="artical-tag">{{ item.type }}</span></p>
                                    </div>
                                </div>
                                <template>
                                    <el-pagination
                                            class="search-pagination"
                                            :current-page.sync="formData.page"
                                            :page-size="5"
                                            layout="total, prev, pager, next, jumper"
                                            @current-change="handleCurrentChange"
                                            :total="getCount('all')">
                                    </el-pagination>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane :label="i18n.search.TAG_NAME.DOCS + ' ( ' + getCount('docs') + ' )'" name="second">
                                <div class="search-detail">
                                    <div class="tags-info" v-for="(item, index) in filterDatas('文档')" :key="index">
                                        <h3 v-html="item.title"><a :href="item.path"></a></h3>
                                        <p>{{ item.textContent }}</p>
                                        <p class="articla-from"><span>来源： </span><span class="artical-tag">{{ item.type }}</span></p>
                                    </div>
                                </div>
                                <template>
                                    <el-pagination
                                            class="search-pagination"
                                            :current-page.sync="formData.page"
                                            :page-size="5"
                                            layout="total, prev, pager, next, jumper"
                                            @current-change="handleCurrentChange"
                                            :total="getCount('docs')">
                                    </el-pagination>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane :label="i18n.search.TAG_NAME.NEWS + ' ( ' + getCount('news') + ' )'" name="third">
                                <div class="search-detail">
                                    <div class="tags-info" v-for="(item, index) in filterDatas('新闻')" :key="index">
                                        <h3 v-html="item.title"><a :href="item.path"></a></h3>
                                        <p>{{ item.textContent }}</p>
                                        <p class="articla-from"><span>来源： </span><span class="artical-tag">{{ item.type }}</span></p>
                                    </div>
                                </div>
                                <template>
                                    <el-pagination
                                            class="search-pagination"
                                            :current-page.sync="formData.page"
                                            :page-size="5"
                                            layout="total, prev, pager, next, jumper"
                                            @current-change="handleCurrentChange"
                                            :total="getCount('news')">
                                    </el-pagination>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane :label="i18n.search.TAG_NAME.BLOG + ' ( ' + getCount('blog') + ' )'" name="fourth">
                                <div class="search-detail">
                                    <div class="tags-info" v-for="(item, index) in filterDatas('博客')" :key="index">
                                        <h3 v-html="item.title"><a :href="item.path"></a></h3>
                                        <p>{{ item.textContent }}</p>
                                        <p class="articla-from"><span>来源： </span><span class="artical-tag">{{ item.type }}</span></p>
                                    </div>
                                </div>
                                <template>
                                    <el-pagination
                                            class="search-pagination"
                                            :current-page.sync="formData.page"
                                            :page-size="5"
                                            layout="total, prev, pager, next, jumper"
                                            @current-change="handleCurrentChange"
                                            :total="getCount('blog')">
                                    </el-pagination>
                                </template>
                            </el-tab-pane>
                        </template>
                        <template>
                        <!--    todo : 暂时写死数据-->
                            <div class="tag-left">
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
                        </template>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { search } from "../../api/search";
    export default {
        name: "search",
        data() {
            return {
                searchInput: "",
                formData: {
                    // todo: 传参暂时写死
                    keyword: "华为",
                    model: "",
                    indexEs: "",
                    openeuler_articles: "",
                    page: 1,
                },
                total: 0,
                tagTitle: [],
                allDatas: [],
                docsDatas: [],
                newsDatas: [],
                blogDatas: [],
                status: false,
                contentLoading: false,
                currentTag: 0,
                activeName: 'first',
            }
        },
        mounted() {
            this.getSearchPage(1)
        },
        methods: {
            getCount(title) {
                let tags = this.tagTitle
                let tag = []
                let CURRENT = 0
                tag = tags.filter(item => item.key === title)
                return  tag[CURRENT].doc_count
            },
            filterDatas(title) {
                let datas = this.allDatas
                let data = []
                function getDatas(item) {
                    if (item.type === title) {
                        return true
                    }
                 }
                data = datas.filter(getDatas)
                return data
            },
            initData(flag) {
                this.getSearchPage(flag)
            },
            handleCurrentChange(val) {
                this.currentPage=val
            },
            getSearchPage (flag) {
                this.formData.page = flag;
                search(this.formData)
                    .then(response => {
                        this.formData.indexEs = this.$lang
                        this.tagTitle = response.data.total;
                        this.total = response.data.totalNum;
                        this.allDatas = response.data.records;
                        this.status = true
                    })
                    .catch(response => {
                        this.$message.error(response);
                    });
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
    .tag-left .el-scrollbar {
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
    .tag-content {
        margin-bottom: 180px;
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
    .tag-left {
        width: 350px;
        margin-top: 40px;
        padding-left: 30px;
        position: absolute;
        top: 0;
        right: 0;
    }
    h3 {
        font-size: 20px;
        font-family: FZLTHJW;
        margin: 40px 0 15px;
    }
    p {
        font-size: 14px;
        font-family: FZLTXIHJW;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
    }
    .articla-from {
        font-size: 12px;
    }
    .artical-tag {
        color: #000;
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