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
          <img class="middle-img mobile-middle-img" src="/img/blog/edit.png" alt />
          <span @click="goPostBlog" class="blog-write">{{i18n.community.BLOG.BLOGGING}}</span>
        </el-form-item>
      </el-form>
      <div>
        <div class="blog-item" v-for="(item, index) in currentBlogListData" :key="index">
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
            <p>
              <img class="middle-img mobile-middle-img" src="/img/blog/visibility.svg" alt />
              <span>{{i18n.community.BLOG.BROWSE}}</span>
              <span>{{item.count}}</span>
              <span>{{i18n.community.BLOG.VIEWED}}</span>
            </p>
          </div>
          <div class="blog-item-right">
            <p @click="go(item.path)" class="blog-item-title">{{item.frontmatter.title}}</p>
            <p class="blog-item-content">{{item.frontmatter.summary}}</p>
            <p @click="go(item.path)" class="blog-item-all">{{i18n.community.BLOG.READ_MORE}}</p>
            <p class="blog-item-tag">
              <span>{{i18n.community.BLOG.LABEL}}:</span>
              <span v-for="(tag, index) in item.frontmatter.tags" :key="index">
                <span @click="clickTagItem(tag)" class="tag-item">{{tag}}</span>
                <span v-if="index != (item.frontmatter.tags.length - 1)">、</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="paginationClass">
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
import {blogVisitList,blogVisitDetail,addVisit} from "../../api/blogCount"

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
      CELECT_LABEL: "",
      CELECT_FILE: "",
      visitCount: {
        blogTitle:'',
        blogDate:'',
        pageLang:''
      },
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
    for(let i = 0;  i<this.currentBlogListData.length;i++){
        this.visitCount.blogTitle=this.currentBlogListData[i].frontmatter.title;
        this.visitCount.blogDate=this.currentBlogListData[i].frontmatter.date;
    }
    this.visitCount.pageLang=this.$lang;
  },
  methods: {
    // 增加博客访问量的方法
      addBlogList(){
           addVisit(this.visitCount)
           .then(response => {})
         },
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
      if (this.formData.tag === null) {
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

      if (this.formData.time === null) {
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
      return this.$sitePages.filter((item) => {
        if(item.path.indexOf("/" + this.$lang + "/blog/") === 0){
          item.count=0;
          this.countList.forEach(itemCount=>{
            if(itemCount.title==item.title){
              item.count=itemCount.count;
            }
          })
          return true;
        }
      });
    },
    go(path) {
      if (path) {
        this.$router.push(path);
         this.addBlogList();
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
      font-size: 24px;
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
    padding: 75px 15px 0;
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
