<template>
  <div id="news_header">
    <div class="news-link" @click="goNews">{{i18n.community.NEWS.NEWS}}\</div>
    <div class="news-title">{{$frontmatter.title}}</div>
    <div class="news-time">
      <p>
        <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
        <span class="news-date">{{$frontmatter.date}}</span>
      </p>
      <p>
        <img class="mobile-middle-img" src="/img/blog/visibility.svg" alt />
        <span class="news-date">
          <span id="busuanzi_container_page_pv">
            <span>{{i18n.community.BLOG.BROWSE}}</span>
            <span id="busuanzi_value_page_pv"></span>
            <span>{{i18n.community.BLOG.VIEWED}}</span>
          </span>
        </span>
      </p>
    </div>
    <p class="news-time-bottom-line"></p>
  </div>
</template>

<script>
export default {
  name: "postnews",
  data() {
    return {
      targetLocale: "",
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  methods: {
    goNews() {
      this.$router.push(this.targetLocale + "interaction/news-list/");
    },
  },
};
</script>

<style lang="less">
#news_header {
  width: 1120px;
  margin: 0 auto;
}
.news-link {
  font-size: 20px;
  color: #002fa7;
  cursor: pointer;
  margin: 34px 0 16px 0;
  padding: 0;
}
.news-title {
  font-size: 36px;
  font-weight: normal;
  color: #000;
  margin-bottom: 36px;
}
.news-time{
  margin-top: 5px;
  p{
    display: inline-block;
    margin-right: 51px;
  }
}
.news-date{
  color:rgba(0,0,0,0.4);
  font-size: 12px;
}
.news-time-bottom-line{
  margin: 18px 0 30px 0;
  border-bottom: 1px solid;
  border-color:rgba(0,0,0,0.5);
}
@media screen and (max-width: 1000px) {
  #news_header {
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }
  .news-link{
    display: none;
  }
  .news-title {
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 40px;
  }
  .news-time{
    margin-top: 0px;
  }
  .news-time-bottom-line{
    margin: 30px 0 30px 0;
  }
}
</style>