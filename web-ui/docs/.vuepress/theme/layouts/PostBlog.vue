<template>
  <div id="post-blog">
    <div class="blog-link" @click="goBlog">{{i18n.community.BLOG.BLOG}}\</div>
    <div class="blog-title">{{$frontmatter.title}}</div>
    <Content id="blog_content" />
    <div class="bottom-height"></div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      targetLocale: "",
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  methods: {
    goBlog() {
      this.$router.push(this.targetLocale + "interaction/blog-list/");
    },
  },
};
</script>

<style lang="less">
#post-blog {
  width: 1200px;
  margin: 0 auto;
}
.blog-link {
  font-size: 20px;
  color: #002fa7;
  cursor: pointer;
  margin: 34px 0 16px 0;
  padding: 0;
}
.blog-title{
  font-size:36px;
  font-weight: bold;
  color: #000;
  margin-bottom: 36px;
}
#blog_content{
  p{
    line-height: 42px;
    a{
      color: #002FA7;
      text-decoration: none;
    }
    img{
      width: 100%;
    }
  }
  h1,h2,h3,h4,h5{
    font-size:20px;
    font-weight: bold;
    margin: 40px 0 25px 0;
    a{
      display: none;
    }
  }
  ol{
    list-style-type: decimal;
    padding-left: 50px;
    li{
      line-height: 32px;
      ol{
        padding-left: 20px;
      }
    }
  }
  ol+p{
    padding-left: 50px;
  }
  div[class*="language-"]{
    background:rgba(225,230,238,0.3);
    border:1px solid rgba(151,151,151,1);
    border-radius: 0;
    code[class*="language-"], pre[class*="language-"]{
      color:rgba(0,0,0,0.5);
    }
  }
  ul{
    padding-left: 50px;
    li{
      line-height: 32px;
      a{
        color: #002FA7;
        text-decoration: none;
      }
    }
  }
  ul+div[class*="language-"],ol+div[class*="language-"]{
    margin-left: 50px;
  }
}
</style>