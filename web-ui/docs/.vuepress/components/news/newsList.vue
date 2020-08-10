<template>
  <div class="moblie-content">
    <common-banner
      :pc-src="'/img/news/news-banner.png'"
      :mobile-src="'/img/news/news-banner.png'"
      :inside-name="'NEWS'"
      :outside-name="i18n.community.NEWS.NEWS"
    ></common-banner>
    <div class="news-content">
      <div class="news-items" v-for="(items, key) in showNewsList">
        <div class="news-month">{{i18n.community.NEWS.MONTHS[items[0].month]}}</div>
        <div class="news-item" v-for="item in items">
          <div @click="go(item.path)" class="new-img">
            <img :src="'/' + item.frontmatter.banner" alt />
          </div>
          <div class="news-info">
            <div class="news-time">
              <p>
                <img class="mobile-middle-img" src="/blog/date.png" alt />
                <span class="news-date">{{item.frontmatter.date}}</span>
              </p>
              <p>
                <img class="mobile-middle-img" src="/blog/visibility.png" alt />
                <span class="news-date">
                  <span id="busuanzi_container_page_pv">
                    <span>{{i18n.community.BLOG.BROWSE}}</span>
                    <span id="busuanzi_value_page_pv"></span>
                    <span>{{i18n.community.BLOG.VIEWED}}</span>
                  </span>
                </span>
              </p>
            </div>
            <div @click="go(item.path)" class="news-title">{{item.frontmatter.title}}</div>
            <div class="news-time-mobile">
              <p>
                <img class="mobile-middle-img" src="/blog/date.png" alt />
                <span class="news-date">{{item.frontmatter.date}}</span>
              </p>
              <p>
                <img class="mobile-middle-img" src="/blog/visibility.png" alt />
                <span class="news-date">
                  <span id="busuanzi_container_page_pv">
                    <span>{{i18n.community.BLOG.BROWSE}}</span>
                    <span id="busuanzi_value_page_pv"></span>
                    <span>{{i18n.community.BLOG.VIEWED}}</span>
                  </span>
                </span>
              </p>
            </div>
            <div class="news-summary">{{item.frontmatter.summary}}</div>
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
import dayjs from "dayjs";
import commonBanner from "./../common/banner.vue";
export default {
  data() {
    return {
      totalSize: 0,
      currentPage: 1,
      PAGESIZE: 6,
      allNewsList: [],
      currentNewsList: [],
      showNewsList: {}
    };
  },
  components: {
    commonBanner,
  },
  computed: {},

  created() {},
  mounted() {
    this.allNewsList = this.newsList();
    this.totalSize = this.allNewsList.length;
    this.allNewsList = this.sortNewsList(this.allNewsList);
    this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      this.currentNewsList = this.allNewsList.slice(
        (val - 1) * this.PAGESIZE,
        val * this.PAGESIZE
      );

      let listObj = {};
      this.currentNewsList.forEach((item) => {
        if (!listObj[item.yearAndmonth]) {
          listObj[item.yearAndmonth] = [];
        }
        listObj[item.yearAndmonth].push(item);
      });

      this.showNewsList = listObj;

      scrollTo(0, 0);
    },
    sortNewsList(array) {
      let temp = array;
      temp.forEach((item) => {
        item.month = new Date(item.frontmatter.date).getMonth();
        item.yearAndmonth =
          new Date(item.frontmatter.date).getFullYear() + "-" + item.month;
      });
      temp.sort(function (a, b) {
        return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
      });
      return temp;
    },
    newsList() {
      return this.$sitePages.filter((item) => {
        return item.path.indexOf("/" + this.$lang + "/news/") === 0;
      });
    },
    go(path) {
      if (path) {
        this.$router.push(path);
      }
    },

    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },
  },
};
</script>

<style lang="less">
.news-content {
  width: 1120px;
  margin: 0 auto;
}
.paginationClass {
  margin: 20px 0 200px 0;
}
.news-items {
  margin: 50px 0;
}
.news-item {
  margin-top: 30px;
}
.new-img {
  cursor: pointer;
  width: 400px;
  display: inline-block;
  img {
    width: 400px;
  }
}
.news-month {
  font-size: 24px;
}
.news-info {
  display: inline-block;
  margin-left: 60px;
  width: calc(100% - 465px);
  vertical-align: top;
}
.news-time {
  margin-top: 5px;
  p {
    display: inline-block;
    margin-right: 51px;
  }
}
.news-time-mobile {
  display: none;
}
.news-date {
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
}
.news-title {
  cursor: pointer;
  font-size: 24px;
  margin: 21px 0 16px 0;
}
.news-summary {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
@media screen and (max-width: 1000px) {
  .moblie-content {
    padding: 40px 30px 80px 30px;
  }
  .news-content {
    width: 100%;
  }
  .paginationClass {
    margin: 40px 0 0 0;
  }
  .news-items {
    margin: 0;
  }
  .news-item {
    margin-top: 40px;
    width:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 10px 0px rgba(0,0,0,0.2);
    border-radius:8px;
  }
  .new-img {
    cursor: pointer;
    width: 100%;
    margin: 22px 0;
    text-align: center;
    img {
      max-width: 270px;
    }
  }
  .news-month {
    display: none;
  }
  .news-info {
    display: inline-block;
    margin-left: 0px;
    padding: 0 22px 30px;
    width: 100%;
    vertical-align: top;
  }
  .news-time {
    display: none;
  }
  .news-time-mobile {
    display: inline-block;
    p {
      display: inline-block;
      margin-right: 17px;
    }
  }
  .news-date {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
  }
  .news-title {
    cursor: pointer;
    font-size: 16px;
    margin: 0px 0 10px 0;
  }
  .news-summary {
    display: none;
  }
}
</style>
