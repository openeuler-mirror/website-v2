<template>
  <div>
    <div class="blog-header">
      <p class="blog-title">
        {{i18n.community.BLOG.BLOG}}
        <span class="blog-connect">CONNECT</span>
        <img class="blog-banner-img" src="/blog/blog_banner.png" alt="" />
      </p>
    </div>
    <div class="blog-content">
      <el-form :inline="true" :model="formData" class="blog-filter">
        <el-form-item :label="i18n.community.BLOG.LABEL">
          <el-select v-model="formData.tag" @change="selectChange" placeholder>
            <el-option
              v-for="(item, index) in formData.tags"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18n.community.BLOG.FILE">
          <el-select v-model="formData.time" @change="selectChange" placeholder>
            <el-option
              v-for="(item, index) in formData.times"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <img class="middle-img" src="/blog/edit.png" alt="" />
          <span @click="goPostBlog" class="blog-write">{{i18n.community.BLOG.BLOGGING}}</span>
        </el-form-item>
      </el-form>
      <div>
        <div class="blog-item" v-for="(item, index) in currentBlogListData" :key="index">
          <div class="blog-item-left">
            <p class="blog-img">
              <img class="middle-img" src="/blog/blog_user.png" alt="" />
            </p>
            <p>
              <img class="middle-img" src="/blog/account.png" alt="" />
              <span class="blog-author">{{item.frontmatter.author}}</span>
            </p>
            <p>
              <img class="middle-img" src="/blog/date.png" alt="" />
              <span class="blog-date">{{resolvePostDate(item.frontmatter.date)}}</span>
            </p>
            <p>
              <img class="middle-img" src="/blog/visibility.png" alt="" />
              <span class="blog-date">浏览100次</span>
            </p>
          </div>
          <div class="blog-item-right">
            <p @click="go(item.path)" class="blog-item-title">{{item.frontmatter.title}}</p>
            <p class="blog-item-content">{{item.frontmatter.summary}}</p>
            <p @click="go(item.path)" class="blog-item-all">{{i18n.community.BLOG.READ_MORE}}</p>
            <p class="blog-item-tag">
              #
              <span v-for="(tag, index) in item.frontmatter.tags" :key="index">{{tag}}、</span>
            </p>
          </div>
        </div>
      </div>
      <div class="paginationClass">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="5"
          layout="total, prev, pager, next, jumper"
          :total="totalSize"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
export default {
  data() {
    return {
      // 页面显示数据
      currentBlogListData: [],
      // 筛选结果数据
      screenBlogListData: [],
      // 所以博客数据
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
    };
  },

  computed: {},

  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
    this.dataList = this.$sitePages;
  },
  mounted() {
    this.allBlogListData = this.blogList();
    this.screenBlogListData = this.allBlogListData;
    this.screenChange();
    this.formData.tags = this.getTags();
    this.formData.times = this.getTimes();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentBlogListData = this.screenBlogListData.slice((val - 1)*this.PAGESIZE, (val - 1)*this.PAGESIZE + 5);
      scrollTo(0,0);
    },
    screenChange() {
      if(this.screenBlogListData.length > this.PAGESIZE){
        this.currentBlogListData = this.screenBlogListData.slice(0, this.PAGESIZE);
      }else{
          this.currentBlogListData = this.screenBlogListData;
      }    
      this.totalSize = this.screenBlogListData.length;
      this.currentPage = 1;
    },
    selectChange() {
      let screenTagArr = [];
      let screenTimeArr = [];
      if(this.formData.tag === null){
        screenTagArr = this.allBlogListData;
      }else{
        this.allBlogListData.forEach((item) => {
          if (!item.frontmatter.tags) {
            return;
          }
          if (item.frontmatter.tags.indexOf(this.formData.tag) > -1) {
            screenTagArr.push(item);
          }
        });
      }
      
      if(this.formData.time === null){
        screenTimeArr = screenTagArr;
      }else{
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
    getTags() {
      let tagsArr = [];
      let tagsArrUniq = [];
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
      this.$sitePages.forEach((item) => {
        if (item.path.indexOf("/" + this.$lang + "/blog/") !== 0) {
          return;
        }
        if (!item.frontmatter.date) {
          return;
        }
        timesArr.push(item.frontmatter.date.slice(0,7));
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
      return this.$sitePages.filter((item) => {
        return item.path.indexOf("/" + this.$lang + "/blog/") === 0;
      });
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
    goPostBlog(){
      this.$router.push(this.targetLocale + "interaction/post-blog/");
    }
  },
};
</script>

<style lang="less">
.blog-header {
  height: 560px;
  .blog-title {
    width: 1200px;
    height: 560px;
    margin: 0 auto;
    font-size: 72px;
    line-height: 560px;
    position: relative;
  }
}
.blog-connect{
  font-size: 80px;
  color: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: -50px;
  left: 0px;
}
.blog-banner-img{
  position: absolute;
  top: 70px;
  right: 0;
}
.middle-img{
  vertical-align: middle;
}
.blog-filter {
  margin-bottom: 8px;
}
.blog-content {
  width: 1200px;
  margin: 0 auto;
}
.el-select__tags {
  min-width: 140px !important;
}
.el-form-item__label {
  font-size: 18px;
  color: #000;
  font-family: FZLTXIHJW;
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
  margin-right: 50px !important;
}

.el-form-item__content {
  min-width: 140px;
  min-height: 32px;
}
.blog-write {
  font-size: 18px;
  font-weight: 400;
  color: #002fa7;
  margin-left: 13px;
  cursor: pointer;
}
.blog-item {
  height: 335px;
  border-top: 1px solid;
  border-color: rgba(0, 0, 0, 0.25);
  padding: 40px 0 40px 0;
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
  width: calc(100% - 195px);
  vertical-align: top;
}
.blog-img {
  width: 120px;
  height: 120px;
}
.blog-author {
  font-size: 16px;
  font-weight: bold;
}
.blog-date {
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
}
.paginationClass {
  margin: 20px 0 200px 0;
}
</style>
