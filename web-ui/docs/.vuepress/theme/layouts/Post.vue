<template>
  <div id="vuepress-theme-blog__post-layout">
    <div class="blog-link-post" @click="goBlog">{{i18n.community.BLOG.BLOG}}\</div>
    <div class="post-left">
      <p class="blog-img">
        <img class="middle-img" src="/img/blog/blog_user.png" alt />
      </p>
      <p>
        <img class="mobile-middle-img" src="/img/blog/account.svg" alt />
        <span class="blog-author">{{$frontmatter.author}}</span>
      </p>
      <p>
        <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
        <span class="blog-date">{{resolvePostDate($frontmatter.date)}}</span>
      </p>
      <p>
        <img class="mobile-middle-img" src="/img/blog/visibility.svg" alt />
        <span class="blog-date">
          <span id="busuanzi_container_page_pv">
            <span>{{i18n.community.BLOG.BROWSE}}</span>
            <span>{{this.blogVisit}}</span>
            <span>{{i18n.community.BLOG.VIEWED}}</span>
          </span>
        </span>
      </p>
      <p class="bottom-line bottom-line-none"></p>
      <p v-if="otherBlog.length" class="other-blog">{{i18n.community.BLOG.OTHER_BLOG}}</p>
      <p class="other-blog-item">
        <span
          @click="goOtherBlog(item.path)"
          v-for="(item, index) in otherBlog"
          :key="index"
        >{{item.frontmatter.title}}</span>
      </p>
    </div>
    <div class="post-right">
      <p class="blog-title">{{$frontmatter.title}}</p>
      <div class="mobile-auther">
        <p class="blog-img">
          <img class="middle-img" src="/img/blog/blog_user.png" alt />
        </p>
        <p>
          <img class="mobile-middle-img" src="/img/blog/account.svg" alt />
          <span class="blog-author">{{$frontmatter.author}}</span>
        </p>
        <p>
          <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
          <span class="blog-date">{{resolvePostDate($frontmatter.date)}}</span>
        </p>
        <p>
          <img class="mobile-middle-img" src="/img/blog/visibility.svg" alt />
          <span class="blog-date">
            <span id="busuanzi_container_page_pv">
              <span>{{i18n.community.BLOG.BROWSE}}</span>
             <span>{{this.blogVisit}}</span>
              <span>{{i18n.community.BLOG.VIEWED}}</span>
            </span>
          </span>
        </p>
      </div>
      <p class="blog-item-tag">
        <span style="color:#00000080">{{i18n.community.BLOG.LABEL}}:</span>
        <span v-for="(tag, index) in $frontmatter.tags" :key="index" style="color:#002fa7">
          <span class="tag-item">{{tag}}</span>
          <span v-if="index != ($frontmatter.tags.length - 1)">、</span>
        </span>
      </p>
      <p class="bottom-line bottom-line-none"></p>
      <Content id="blog_content" />
    </div>
    <div class="bottom-line"></div>
    <div class="disclaimer">{{i18n.community.BLOG.DISCLAIMER_ZH}}</div>
    <div class="disclaimer bottom-height">{{i18n.community.BLOG.DISCLAIMER_EN}}</div>
  </div>
</template>

<script>
let script;
import dayjs from "dayjs";
import {blogVisitList,blogVisitDetail,addVisit} from "../../api/blogCount"
export default {
  name: "Post",
  data() {
    return {
      targetLocale: "",
      allBlogListData: [],
      otherBlog: [],
      i18n: {
          community: {
              BLOG: {}
          }
      },
      // 访问量
      blogVisit:'',
       visitCount: {
        blogTitle:'',
        blogDate:'',
        pageLang:''
      },
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
    this.getBlogCount();
  },
  mounted() {
    script = require("busuanzi.pure.js");
    this.allBlogListData = this.blogList();
    this.otherBlog = this.getOtherBlog(this.allBlogListData);
    this.visitCount.blogTitle=this.$frontmatter.title;
    this.visitCount.blogDate=this.$frontmatter.date;
    this.visitCount.pageLang=this.$lang;
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        script.fetch();
      }
    },
  },

  methods: {
    goBlog() {
      this.$router.push(this.targetLocale + "interaction/blog-list/");
    },
    goOtherBlog(path) {
      this.$router.push(path);
    },
    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },
    blogList() {
      return this.$sitePages.filter((item) => {
        return item.path.indexOf("/" + this.$lang + "/blog/") === 0;
      });
    },
    getOtherBlog(data) {
      return data.filter((item) => {
        return (
          item.frontmatter.author === this.$frontmatter.author &&
          item.frontmatter.title !== this.$frontmatter.title
        );
      });
    },
     getBlogCount() {
      blogVisitDetail(this.visitCount)
      .then(response => {
          this.blogVisit = response.data[0] || 1;
        })
    }
  },
};
</script>

<style lang="less">
#vuepress-theme-blog__post-layout {
  width: 1120px;
  margin: 0 auto;
}
.blog-link-post {
  font-size: 20px;
  color: #002fa7;
  cursor: pointer;
  margin: 34px 0 16px 0;
  padding-left: 235px;
}
.post-left {
  display: inline-block;
  width: 200px;
  vertical-align: top;
  p {
    margin-bottom: 20px;
  }
}
.mobile-auther{
    display: none;
  }
.bottom-line {
  height: 1px;
  margin: 30px 0;
  background: rgba(0, 0, 0, 0.5);
}
.other-blog {
  font-size: 16px;
  text-align: center;
  color: #000;
}
.other-blog-item {
  span {
    display: block;
    cursor: pointer;
    color: rgba(0, 47, 167, 1);
  }
}
.post-right {
  display: inline-block;
  margin-left: 30px;
  width: calc(100% - 250px);
}
.blog-title {
  font-size: 36px;
  font-weight: bold;
  color: #000;
  margin-bottom: 36px;
}
.disclaimer {
  font-size: 16px;
  line-height: 26px;
  color: #002fa7;
  margin-bottom: 30px;
}
.bottom-height {
  margin-bottom: 200px;
}
#blog_content {
  p {
    line-height: 42px;
    a {
      color: #002fa7;
      text-decoration: none;
    }
    img {
      width: 100%;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: 20px;
    font-weight: bold;
    margin: 40px 0 25px 0;
    a {
      display: none;
    }
  }
  ol {
    li {
      line-height: 32px;
      ol {
        padding-left: 20px;
      }
    }
  }
  ul {
    li {
      line-height: 32px;
      a {
        color: #002fa7;
        text-decoration: none;
      }
    }
  }
}
@media (max-width: 1000px) {
  #vuepress-theme-blog__post-layout {
    width: 100%;
    padding: 0 30px;
    position: relative;
  }
  .blog-link-post {
    display: none;
  }
  .post-left {
    display: none;
  }
  .mobile-middle-img {
    display: none;
  }
  .mobile-auther{
    display: block;
    margin: 20px 0 30px 0;
    width: 100%;
    p {
      display: inline-block;
      margin-bottom: 0px;
      img{
        width: 26px;
        vertical-align: middle;
      }
    }
  }


  .bottom-line-none {
    display: none;
  }
  .other-blog-item {
    span {
      display: block;
      cursor: pointer;
      color: rgba(0, 47, 167, 1);
    }
  }
  .post-right {
    display: inline-block;
    margin-left: 0;
    width: 100%;
  }
  .blog-title {
    font-size: 24px;
    line-height: 34px;
    font-weight: bold;
    color: #000;
    margin-bottom: 0px;
    margin-top: 40px;
  }
  .blog-item-tag {
      display: none;
    }
  .disclaimer {
    font-size: 16px;
    line-height: 26px;
    color: #002fa7;
    margin-bottom: 30px;
  }
  .bottom-height {
    margin-bottom: 80px;
  }
}
</style>
