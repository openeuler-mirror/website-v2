<template>
    <div class="moblie-content">
        <common-banner
        :pc-src="'/img/blog/blog_banner.png'"
        :mobile-src="'/img/blog/blog_banner.png'"
        :inside-name="'CONNECT'"
        :outside-name="i18n.community.BLOG.BLOG"
        ></common-banner>
        <div class="blog-content">
            <el-form :inline="true" :model="formData" class="blog-filter">
                <el-form-item :label="i18n.community.BLOG.LABEL">
                    <el-select v-model="formData.tag" @change="selectChange" :placeholder="CELECT_LABEL">
                        <el-option
                        v-for="(item, index) in formData.tags"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="i18n.community.BLOG.FILE">
                    <el-select v-model="formData.time" @change="selectChange" :placeholder="CELECT_FILE">
                        <el-option
                        v-for="(item, index) in formData.times"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="mobile-blog-write">
                    <div class="write-blog-btn">
                        <img class="middle-img mobile-middle-img" src="/img/blog/edit.svg" alt />
                        <span @click="goPostBlog" class="blog-write">{{i18n.community.BLOG.BLOGGING}}</span>    
                    </div>
                </el-form-item>
            </el-form>
            <div>
                <div class="blog-item" v-for="(item, index) in currentBlogListData" :key="'info'+index">
                    <div class="blog-item-left">
                        <p class="blog-img">
                            <img class="middle-img" src="/img/blog/blog_user.png" alt />
                        </p>
                        <p>
                            <img class="middle-img mobile-middle-img" src="/img/blog/account.svg" alt />
                            <span class="blog-author">{{item.frontmatter.author}}</span>
                        </p>
                        <p>
                            <img class="middle-img mobile-middle-img" src="/img/blog/date.svg" alt />
                            <span class="blog-date">{{resolvePostDate(item.frontmatter.date)}}</span>
                        </p>
                        <p class="fz12">
                            <img class="middle-img mobile-middle-img" src="/img/blog/visibility.svg" alt />
                            <span>{{i18n.community.BLOG.BROWSE}}</span>
                            <span>{{item.count}}</span>
                            <span>{{i18n.community.BLOG.VIEWED}}</span>
                        </p>
                    </div>
                    <div class="blog-item-right">
                        <p @click="go(item.path)" class="blog-item-title word-hover">{{item.frontmatter.title}}</p>
                        <p class="blog-item-content"><span class="summary">{{item.frontmatter.summary}}</span></p>
                        <p @click="go(item.path)" class="blog-item-all">{{i18n.community.BLOG.READ_MORE}}</p>
                        <p class="blog-item-tag">
                            <span class="first-tag">{{i18n.community.BLOG.LABEL}}:</span>
                            <span v-for="(tag, indexTag) in item.frontmatter.tags" :key="indexTag">
                                <span @click="clickTagItem(tag)" class="tag-item">{{tag}}</span>
                                <span v-if="indexTag != (item.frontmatter.tags.length - 1)">、</span>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="blog-item-mobile" v-for="(item, index) in currentBlogListData" :key="index">
                    <div class="item-wraper">
                        <p class="title" @click="go(item.path)">{{item.frontmatter.title}}</p>
                        <div class="user-info">
                            <div class="left">
                                <img src="/img/blog/blog_user.png" alt />
                            </div>
                            <div class="right">
                                <p class="name">{{item.frontmatter.author}}</p>
                                <p class="date-count">
                                    <span class="date">{{resolvePostDate(item.frontmatter.date)}}</span>
                                    <span class="count">{{i18n.community.BLOG.BROWSE}}{{item.count}}{{i18n.community.BLOG.VIEWED}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="summary">{{item.frontmatter.summary}}</div>
                        <div class="more" @click="go(item.path)">{{i18n.community.BLOG.READ_MORE}}</div>
                        <div class="tag">
                            <span>{{i18n.community.BLOG.LABEL}}:</span>
                            <span v-for="(tag, indexTag) in item.frontmatter.tags" :key="indexTag" class="tag-name">
                                <span @click="clickTagItem(tag)" class="tag-item">{{tag}}</span>
                                <span v-if="indexTag != (item.frontmatter.tags.length - 1)">、</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paginationClass" v-show="screenBlogListData.length>1">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="5"
                layout="total, prev, jumper, next"
                :total="totalSize"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import commonBanner from "./../common/banner.vue";
import {blogVisitList} from "../../api/blogCount"

export default {
    data() {
        return {
        // 页面显示数据
        currentBlogListData: [],
        // 筛选结果数据
        screenBlogListData: [],
        // 所有博客数据
        allBlogListData: [],
        totalSize: 0,
        currentPage: 1,
        formData: {
            tag: null,
            time: null,
            tags: [],
            times: [],
        },
        //常量每页显示数量
        PAGESIZE: 5,
        CELECT_LABEL: "",
        CELECT_FILE: ""
        };
    },
    components: {
        commonBanner,
    },
    computed: {},

    created() {
        this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
        this.dataList = this.$sitePages;
    },
    mounted() {
        blogVisitList()
        .then(response => {
        if(response){
            this.countList = response.data;
            this.allBlogListData = this.blogList();
            this.screenBlogListData = this.allBlogListData;
            this.screenChange();
            this.formData.tags = this.getTags();
            this.formData.times = this.getTimes();
            this.CELECT_LABEL = this.i18n.community.BLOG.CELECT_LABEL;
            this.CELECT_FILE = this.i18n.community.BLOG.CELECT_FILE;
        }
        })
    },
    methods: {
        handleCurrentChange(val) {
            this.currentBlogListData = this.screenBlogListData.slice(
            (val - 1) * this.PAGESIZE,
            val * this.PAGESIZE
            );
            scrollTo(0, 0);
        },
        screenChange() {
            if (this.screenBlogListData.length > this.PAGESIZE) {
                this.currentBlogListData = this.screenBlogListData.slice(
                0,
                this.PAGESIZE
                );
            } else {
                this.currentBlogListData = this.screenBlogListData;
            }
            this.totalSize = this.screenBlogListData.length;
            this.currentPage = 1;
        },
        selectChange() {
            let screenTagArr = [];
            let screenTimeArr = [];
            if (this.formData.tag === null || this.formData.tag === '全部') {
                screenTagArr = this.allBlogListData;
            } else {
                this.allBlogListData.forEach((item) => {
                if (!item.frontmatter.tags) {
                    return;
                }
                if (item.frontmatter.tags.indexOf(this.formData.tag) > -1) {
                    screenTagArr.push(item);
                }
                });
            }
            if (this.formData.time === null || this.formData.time === '全部') {
                screenTimeArr = screenTagArr;
            } else {
                screenTagArr.forEach((item) => {
                    if (!item.frontmatter.date) {
                        return;
                    }
                    if (item.frontmatter.date.indexOf(this.formData.time) > -1) {
                        screenTimeArr.push(item);
                    }
                });
            }
            this.screenBlogListData = screenTimeArr;
            this.screenChange();
        },
        clickTagItem(tag) {
            this.formData.tag = tag;
            this.selectChange();
        },
        getTags() {
            let tagsArr = [];
            let tagsArrUniq = [];
            tagsArrUniq.push({value:'全部',label:'all'});
            this.$sitePages.forEach((item) => {
                if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
                    return;
                }
                if (!item.frontmatter.tags) {
                    return;
                }
                tagsArr.push.apply(tagsArr, item.frontmatter.tags);
            });
            tagsArr = this.uniq(tagsArr);
            tagsArr.forEach((item) => {
                let obj = {
                value: item,
                label: item,
                };
                tagsArrUniq.push(obj);
            });
            return tagsArrUniq;
        },
        uniq(array) {
            var temp = [];
            for (var i = 0; i < array.length; i++) {
                if (temp.indexOf(array[i]) == -1) {
                    temp.push(array[i]);
                }
            }
            return temp;
        },
        getTimes() {
            let timesArr = [];
            let timesArrUniq = [];
            timesArrUniq.push({value:'全部',label:'all'});
            this.$sitePages.forEach((item) => {
                if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
                    return;
                }
                if (!item.frontmatter.date) {
                    return;
                }
                timesArr.push(item.frontmatter.date.slice(0, 7));
            });
            timesArr = this.uniq(timesArr);
            timesArr.forEach((item) => {
                let obj = {
                    value: item,
                    label: item,
                };
                timesArrUniq.push(obj);
            });
            return timesArrUniq;
        },
        blogList() {
            let list = this.$sitePages.filter((item) => {
                if(item.path.indexOf("/" + this.$lang + "/blog/") === 0){
                item.count=0;
                this.countList.forEach(itemCount=>{
                    if(itemCount.title==item.frontmatter.title){
                        item.count=itemCount.count;
                    }
                })
                return true;
                }
            });
            return list.sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
            
        },
        go(path) {
            if (path) {
                this.$router.push(path);
            }
        },
        getBlogDataByLang(data) {
            let blogData = [];
            let langID = this.$lang === "zh" ? "zh" : "en";
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === langID) {
                    blogData.push(data[i]);
                }
            }
            return blogData;
        },
        resolvePostDate(date) {
            return dayjs(date).format(
                this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
            );
        },

        resolvePostTags(tags) {
            if (!tags || Array.isArray(tags)) return tags;
            return [tags];
        },
        goPostBlog() {
            this.$router.push(this.targetLocale + "interaction/post-blog/");
        },
    },
};
</script>

<style lang="less">
.blog-header {
    height: 560px;
    .blog-title {
        width: 1120px;
        height: 560px;
        margin: 0 auto;
        font-size: 48px;
        line-height: 560px;
        font-weight: normal;
        position: relative;
    }
}
.blog-connect {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.05);
    position: absolute;
    top: -50px;
    left: 0px;
}
.word-hover{
    &:hover{
        color: #002FA7;
    }
}
.blog-banner-img {
    position: absolute;
    top: 70px;
    right: 0;
}
.middle-img {
    vertical-align: middle;
}
.blog-filter {
    margin-bottom: 8px;
}
.blog-content {
    width: 1120px;
    margin: 0 auto;
    .el-select__tags {
        min-width: 140px !important;
    }
    .el-form-item__label {
        font-size: 18px;
        color: #000;
        font-family: FZLTXIHJW;
    }

    .el-input__inner {
        font-size: 16px;
        height: 32px;
        color: #000;
        font-family: FZLTXIHJW;
    }

    .el-select-dropdown__item {
        color: #000;
        font-family: FZLTXIHJW;
    }

    .el-form-item {
        margin-right: 50px !important;
    }

    .el-form-item__content {
        min-width: 140px;
        min-height: 32px;
    }
}
.blog-write {
    font-size: 18px;
    font-weight: 400;
    color: #002fa7;
    margin-left: 13px;
    cursor: pointer;
    font-family: PingFangSC-Regular, PingFang SC;
}
.blog-item {
    height: 335px;
    border-top: 1px solid;
    border-color: rgba(0, 0, 0, 0.25);
    padding: 40px 0 40px 0;
    @media (max-width: 1000px) {
        display: none;
    }
}
.blog-item-left {
    display: inline-block;
    width: 190px;
    p {
        margin-bottom: 18px;
    }
}
.blog-item-right {
    display: inline-block;
    width: calc(100% - 210px);
    vertical-align: top;
}
.tag-item {
    cursor: pointer;
}
.blog-img {
    img {
        width: 100px;
        height: 100px;
    }
}
.blog-author {
    font-size: 16px;
    font-weight: bold;
    font-family:HuaweiSans-Bold,HuaweiSans;
}
.blog-date {
    font-size: 12px;
}
.fz12 {
    font-size: 12px;
}
.blog-item-title {
    font-size: 24px;
    margin-bottom: 36px;
    cursor: pointer;
}
.blog-item-content {
    height: 100px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
}
.summary {
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.blog-item-all {
    margin: 12px 0 24px 0;
    font-size: 14px;
    color: #002fa7;
    text-align: right;
    cursor: pointer;
}
.blog-item-tag {
    font-size: 14px;
    color: #002fa7;
    .first-tag{
      color: #00000080;
    }
}
.blog-item-mobile {
    display: none;
    @media (max-width: 1000px){
        margin-top: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid #e6e6e6;
        display: block;
        .item-wraper {
            .title {
                font-size: 16px;
                line-height: 26px;
                font-family: FZLTHJW;
            }
            .user-info {
                height: 65px;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                img {
                    width: 26px;
                    height: 26px;
                    border-radius: 100%;
                    margin-right: 11px;
                }
                .right {
                    .name {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 14px;
                        line-height: 24px;
                        font-family: HuaweiSans-Bold;
                    }
                    .date-count {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 12px;
                        line-height: 16px;
                        font-family: FZLTXIHJW;
                        .date {
                            margin-right: 16px;
                        }
                    }
                }
            }
            .summary {
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
                line-height: 24px;
                font-family: FZLTXIHJW;
                text-align: justify;
                margin-bottom: 10px;
            }
            .more {
                text-align: right;
                font-size: 14px;
                line-height: 24px;
                color: #002fa7;
                margin-bottom: 10px;
            }
            .tag {
                font-size: 14px;
                line-height: 24px;
                font-family: FZLTXIHJW;
                color: rgba(0, 0, 0, 0.5);
                .tag-name {
                    color: #002fa7;
                }
            }
        }
    }
}
.paginationClass {
    margin: 20px 0 200px 0;
}
.blog-content .write-blog-btn {
    background-color: #002fa7;
    height: 32px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    display: inline-block;
    @media (min-width: 1000px) {
        margin-top: 4px;
        display: flex;
    }
    
    .blog-write {
        color: #fff;
        line-height: 25px;
        vertical-align: middle;
        @media (min-width: 1000px) {
            margin-top: -2px;
        }
    }
    .middle-img {
        width: 20px;
        height: 20px;
    }
}
@media screen and (max-width: 1000px) {
    .moblie-content {
        padding: 40px 30px 80px 30px;
    }
    .blog-header {
        height: auto;
        .blog-title {
            width: 100%;
            height: auto;
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
            line-height: 34px;
            position: relative;
        }
    }
    .blog-connect {
        display: none;
    }
    .blog-banner-img {
        position: relative;
        top: 0px;
        right: 0;
        height: 200px;
        margin: 10px auto;
        display: block;
    }
    .middle-img {
        vertical-align: middle;
    }
    .mobile-middle-img {
        display: none;
    }
    .blog-filter {
        margin: 40px auto;
        padding: 75px 0 0;
        position: relative;
    }
    .blog-content {
        width: 100%;
        .el-select__tags {
            min-width: 140px !important;
        }
        .el-form-item__label {
            display: none !important;
        }
        .el-input__inner {
            font-size: 14px;
            color: #000;
            font-family: FZLTXIHJW;
        }
        .el-select-dropdown__item {
            color: #000;
            font-family: FZLTXIHJW;
        }
        .el-form-item {
            margin-right: 0px !important;
            width: 100%;
        }
        .el-select {
            width: 100%;
        }
        .el-form-item__content {
            min-width: 140px;
            min-height: 32px;
            line-height: 32px;
            width: 100%;
            text-align: center;
        }
        .el-input__inner {
            height: 32px;
            line-height: 32px;
        }
        .el-input__icon {
            line-height: 32px;
        }
    }
    .blog-write {
        display: inline-block;
        width: 82px;
        height: 28px;
        line-height: 28px;
        color: #fff;
        font-size: 14px;
        background: rgba(0, 47, 167, 1);
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-left: 0;
    }
    .mobile-blog-write {
        position: absolute;
        top: 0;
        left: 0;
    }
    .blog-item {
        height: auto;
        border-top: 0;
        border-bottom: 1px solid;
        border-color: rgba(0, 0, 0, 0.25);
        padding: 0px 15px;
        margin-bottom: 40px;
        position: relative;
    }
    .blog-item-left {
        display: inline-block;
        position: absolute;
        top: 40px;
        width: 100%;
        p {
            display: inline-block;
            margin-bottom: 0px;
        }
    }
    .blog-item-right {
        display: inline-block;
        width: 100%;
        vertical-align: top;
        position: relative;
    }
    .blog-img {
        width: 26px;
        height: 26px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .blog-author {
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        margin-left: 10px;
    }
    .blog-date {
        font-size: 12px;
        display: inline-block;
        margin-left: 15px;
    }
    .blog-item-title {
        font-size: 16px;
        margin-bottom: 76px;
        cursor: pointer;
    }
    .blog-item-content {
        height: auto;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 54px;
    }
    .blog-item-all {
        margin: 0 0 30px 0;
        font-size: 14px;
        color: #002fa7;
        text-align: right;
        cursor: pointer;
    }
    .blog-item-tag {
        font-size: 14px;
        color: #002fa7;
        position: absolute;
        bottom: 54px;
    }
    .paginationClass {
        margin: 40px 0 0 0;
    }
}
</style>
