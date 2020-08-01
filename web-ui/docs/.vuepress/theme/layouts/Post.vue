<template>
  <div id="vuepress-theme-blog__post-layout">
    <div class="blog-link-post" @click="goBlog">{{i18n.community.BLOG.BLOG}}\</div>
    <div class="post-left">
      <p class="blog-img">
        <img class="middle-img" src="/blog/blog_user.png" alt />
      </p>
      <p>
        <img class="middle-img" src="/blog/account.png" alt />
        <span class="blog-author">{{$frontmatter.author}}</span>
      </p>
      <p>
        <img class="middle-img" src="/blog/date.png" alt />
        <span class="blog-date">{{resolvePostDate($frontmatter.date)}}</span>
      </p>
      <p>
        <img class="middle-img" src="/blog/visibility.png" alt />
        <span class="blog-date">
          <span id="busuanzi_container_page_pv">
            本文总阅读量
            <span id="busuanzi_value_page_pv"></span>次
          </span>
          <span id="busuanzi_container_site_pv">
            本站总访问量
            <span id="busuanzi_value_site_pv"></span>次
          </span>
          <span id="busuanzi_container_site_uv">
            本站访客数
            <span id="busuanzi_value_site_uv"></span>人次
          </span>
        </span>
      </p>
      <p class="bottom-line"></p>
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
      <p class="blog-item-tag">
        #
        <span v-for="(tag, index) in $frontmatter.tags" :key="index">{{tag}}、</span>
      </p>
      <p class="bottom-line"></p>
      <Content id="blog_content" />
    </div>
    <div class="bottom-line"></div>
    <div class="disclaimer">{{i18n.community.BLOG.DISCLAIMER_ZH}}</div>
    <div class="disclaimer bottom-height">{{i18n.community.BLOG.DISCLAIMER_EN}}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Post",
  data() {
    return {
      targetLocale: "",
      allBlogListData: [],
      otherBlog: [],
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  mounted() {
    this.allBlogListData = this.blogList();
    this.otherBlog = this.getOtherBlog(this.allBlogListData);
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
  },
};
</script>

<style lang="less">
#vuepress-theme-blog__post-layout {
  width: 1200px;
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
  width: calc(100% - 235px);
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
</style>
