<template>
  <div class="home">
    <HomeBanner />
    <div class="wraper">
      <div class="home-nav">
        <div
          class="nav-item"
          v-for="item in i18n.home.HOME_NAV"
          @click="go(item.LINK)"
          :key="item.LINK"
        >
          <div class="nav-icon">
            <img :src="item.IMG" alt="" class="nav-item-icon" />
            <img :src="item.IMG_HOVER" alt="" class="nav-item-icon-hover" />
          </div>
          <div class="nav-text">
            <h4 :class="$lang === 'zh'?'nav-title':'nav-title-en'">{{ item.TITLE }}</h4>
            <p class="nav-descriptive">{{ item.DSSCRIPTIVE }}</p>
          </div>
        </div>
      </div>
      <HomeCarousel />
      <UserCase v-if="$lang === 'zh'" />
      <div class="home-calendar" v-if="calenderData.length">
        <h3>{{ i18n.home.HOME_CALENDAR }}</h3>
        <calender :table-data="calenderData" />
      </div>
      <div class="home-newsroom">
        <div class="title-list">
          <el-tabs v-model="tabType">
            <el-tab-pane
              v-for="item in roomName"
              :key="item.ID"
              :label="item.NAME"
              :name="item.ID"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="room-contain-new" :class="{ isShow: tabType === 'blog' }">
          <h4 class="type-title">{{ i18n.home.HOME_ROOMS.BLOG_NAME }}</h4>
          <div class="room-box">
            <div
              class="room-item"
              v-for="(item, index) in blogList"
              :key="index"
            >
              <div class="room-item-pc">
                <div class="room-item-left">
                  <span class="day">{{ item.frontmatter.date[2] }}</span>
                  <div class="left-bottom">
                    <span class="month">{{ item.frontmatter.date[1] }}</span>
                    <span class="year">{{ item.frontmatter.date[0] }}</span>
                  </div>
                </div>
                <div class="room-item-right">
                  <div class="room-top">
                    <h4 :title="item.frontmatter.title">
                      {{ item.frontmatter.title }}
                    </h4>
                    <p>{{ item.frontmatter.author }}</p>
                  </div>
                  <div class="room-bottom">
                    <router-link
                      class="word-hover"
                      :title="item.frontmatter.summary"
                      :to="item.path"
                      >{{ item.frontmatter.summary }}</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="room-item-mo">
                <span class="author">{{ item.frontmatter.author }}</span>
                <router-link
                  class="word-hover"
                  :title="item.frontmatter.summary"
                  :to="item.path"
                  >{{ item.frontmatter.summary }}</router-link
                >
              </div>
            </div>
          </div>
          <div class="statistics">
            <a target="_blank" href="interaction/blog-list/">
              {{ i18n.home.USER_CASE.VIEW_MORE }}
              <img src="/img/home/icon-right.png" alt="" />
            </a>
          </div>
        </div>
        <div class="room-contain-new" :class="{ isShow: tabType === 'news' }">
          <h4 class="type-title">{{ i18n.home.HOME_ROOMS.NEWS_NAME }}</h4>
          <div class="room-box">
            <div
              class="room-item"
              v-for="(item, index) in newsList"
              :key="index"
            >
              <div class="room-item-pc">
                <div class="room-item-left">
                  <span class="day">{{ item.frontmatter.date[2] }}</span>
                  <div class="left-bottom">
                    <span class="month">{{ item.frontmatter.date[1] }}</span>
                    <span class="year">{{ item.frontmatter.date[0] }}</span>
                  </div>
                </div>
                <div class="room-item-right">
                  <div class="room-top">
                    <h4 :title="item.frontmatter.title">
                      {{ item.frontmatter.title }}
                    </h4>
                    <p>{{ item.frontmatter.author }}</p>
                  </div>
                  <div class="room-bottom">
                    <router-link
                      class="word-hover"
                      :title="item.frontmatter.summary"
                      :to="item.path"
                      >{{ item.frontmatter.summary }}</router-link
                    >
                  </div>
                </div>
              </div>
              <div class="room-item-mo">
                <span class="author">{{ item.frontmatter.author }}</span>
                <router-link
                  class="word-hover"
                  :title="item.frontmatter.summary"
                  :to="item.path"
                  >{{ item.frontmatter.summary }}</router-link
                >
              </div>
            </div>
          </div>
          <div class="statistics">
            <a target="_blank" href="interaction/news-list/">
              {{ i18n.home.USER_CASE.VIEW_MORE }}
              <img src="/img/home/icon-right.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <CommunityActivity v-if="roundList.length" :round-list="roundList" />
      <HomePlayground />
      <div class="home-source">
        <div class="source-publish-link publish diff-pc-mobile">
          <h3 :class="$lang == 'en' ? 'en-h3' : ''">
            {{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}
          </h3>
          <div class="publish-edition">
            <a
              :href="item.LINK"
              v-for="item in i18n.home.HOME_SOURCE_EDITION"
              :key="item.LINK"
              target="_blank"
            >
              <img class="pc-img" v-lazy="item.PC" alt="" />
              <img class="mobile-img" v-lazy="item.MOBILE" alt="" />
            </a>
          </div>
        </div>
        <div class="source-publish-link diff-pc-mobile">
          <h3 :class="$lang == 'en' ? 'en-h3' : ''">
            {{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}
          </h3>
          <div class="publish-edition">
            <a
              :href="item.LINK"
              v-for="item in i18n.home.FRIENDSHIP_LINK_LIST"
              :key="item.LINK"
              target="_blank"
            >
              <img class="pc-img" v-lazy="item.PC" alt="" />
              <img class="mobile-img" v-lazy="item.MOBILE" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import 'swiper/css/swiper.css';
import { meetingList, statisticsList } from "../../api/home";
import dayjs from "dayjs";
import calender from "./calender.vue";
import UserCase from "./UserCase.vue";
import HomePlayground from "./HomePlayground.vue";
import CommunityActivity from "./CommunityActivity.vue";
import HomeBanner from "./HomeBanner.vue";
import HomeCarousel from "./HomeCarousel.vue";
import OButton from "./OButton.vue";
import round from "./../round/round";
let that = null;
let remoteMethods = {
  meetingList() {
    meetingList()
      .then((data) => {
        that.calenderData = data.tableData;
      })
      .catch((data) => {
        that.$message.error(data);
      });
  },
  statisticsList() {
    statisticsList(that.statisticParams)
      .then((data) => {
        if (data.code === 200) {
          let dataObj = data.data;
          that.roundValueObj = dataObj;
          that.roundList = that.addValue(that.i18n.home.HOME_ROUND.ROUND_LIST);
        }
      })
      .catch((data) => {
        that.roundList = that.addValue(that.i18n.home.HOME_ROUND.ROUND_LIST);
        that.$message.error(data);
      });
  },
};
export default {
  name: "home",
  components: {
    calender,
    UserCase,
    OButton,
    HomeBanner,
    HomeCarousel,
    HomePlayground,
    round,
    CommunityActivity,
  },
  data() {
    that = this;
    return {
      codingData: [
        "Last metadata expiration check: 0:02:16 ago ",
        "on Wed Dec 22 09:00:02 2021.",
        "Dependencies resolved.",
        "Nothing to do.",
        "Complete!",
        "➜ / ",
      ],
      tabType: "blog",
      textBlock: false,
      changeTime: 5000,
      isMuted: true,
      flag: true,
      height: "380px",
      activeImg: "/img/home/homeActive.gif",
      startIndex: 0,
      endIndex: 4,
      blogList: null,
      newsList: null,
      currentRoom: 0,
      roomName: [],
      rooms1: true,
      rooms2: false,
      rooms3: false,
      calenderData: [],
      autoPlay: true,
      videoCtrlParams: {
        element: "",
        isShow: true, //是否使用大控件
        barWidth: null,
      },
      isNowPlay: false,
      isShowCard: false, //是否显示移动端点击体验的卡片
      mobilePlayBtnDisplay: true,
      swiperOption: {
        loop: false,
      },
      mobileSwiperInterval: null,
      mobilePagenationIndex: 1,
      developerList: [],
      bannerAmount: 1,
      statisticParams: {
        type: "openEuler",
      },
      roundValueObj: {},
      roundList: [],
      isMasked: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scroTop);
    this.videoCtrlParams.element = document.getElementById("home-video");
    remoteMethods.meetingList();
    remoteMethods.statisticsList();
    this.roomName = this.i18n.home.HOME_ROOMS.ROOM_NAME;
    this.getRoomsData();
    let lang = this.$lang;
    this.bannerAmount = lang === "zh" ? 1 : 1;
  },
  methods: {
    carouselChange(index) {
      index !== 1 ? (this.changeTime = 5000) : (this.changeTime = 30000);
    },
    slideChange() {
      this.mobilePagenationIndex = this.$refs.mySwiper.$swiper.realIndex + 1;
    },
    go(path) {
      if (path && !path.includes("http")) {
        this.$router.push({
          path: this.resolvePath(path),
        });
      } else if (path.includes("http")) {
        window.open(path);
      } else {
        this.isShowCard = !this.isShowCard;
      }
    },
    newWindow(url) {
      window.open(this.resolvePath(url));
    },
    goInstall(path) {
      if (path.includes("http") || path.includes("https")) {
        window.open(path);
      } else {
        this.$router.push(path);
      }
    },
    addClassAll(className) {
      let selector = "." + className;
      let elements = document.querySelectorAll(selector);
      for (let i = 0; i < elements.length; i++) {
        let e = elements[i];
        e.classList.add("hidden");
      }
    },
    removeClassAll(className) {
      let selector = "." + className;
      let elements = this.es(selector);
      for (let i = 0; i < elements.length; i++) {
        let e = elements[i];
        e.classList.remove(className);
      }
    },
    changeTab() {
      console.log(this.tabType);
    },
    showAll() {
      if (this.flag) {
        this.removeClassAll("hidden");
        let text = this.e(".show-all");
        let p = text.querySelector("p");
        p.innerHTML = this.i18n.home.RETRACT;
        this.flag = !this.flag;
      } else {
        this.addClassAll("dev-dever");
        let text = this.e(".show-all");
        let p = text.querySelector("p");
        p.innerHTML = this.i18n.home.EXPAND;
        this.flag = !this.flag;
      }
    },
    clickDownload() {
      let box = this.e(".snd-guidance");
      if (this.flag) {
        box.classList.add("is-show");
        this.flag = !this.flag;
      } else {
        box.classList.remove("is-show");
        this.flag = !this.flag;
      }
    },
    getRoomsData() {
      let datas = JSON.parse(JSON.stringify(this.$sitePages));
      let lang = this.$lang;
      let blogData = [];
      let newsData = [];
      if (lang === "zh") {
        blogData = this.filterSiteData(datas, "/zh/blog/");
        newsData = this.filterSiteData(datas, "/zh/news/");
      } else {
        blogData = this.filterSiteData(datas, "/en/blog/");
        newsData = this.filterSiteData(datas, "/en/news/");
      }
      this.blogList = blogData;
      this.newsList = newsData;
    },
    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },
    filterSiteData(datas, string) {
      let newData = datas.filter((data) => data.path.includes(string));
      let englishMonth = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Spt",
        "Oct",
        "Nov",
        "Dec",
      ];
      newData.sort(function (date1, date2) {
        let origin1 = date1.frontmatter.date;
        let origin2 = date2.frontmatter.date;

        let parsed1 = Date.parse(origin1);
        let parsed2 = Date.parse(origin2);

        return parsed2 - parsed1;
      });
      newData = newData.slice(0, 4);
      newData.forEach((item) => {
        let date = item.frontmatter.date;
        date = this.resolvePostDate(date).split("-");
        date.forEach((arrItem, index) => {
          if (arrItem[0] === "0") {
            date[index] = arrItem.substring(1);
          }
        });
        date[1] = englishMonth[date[1] - 1];
        item.frontmatter.date = date;
      });
      return newData;
    },
    vueToggle(index) {
      this.currentRoom = index;
    },
    eventChange() {
      this.$refs.playctrlEle.isPlay = false;
      this.isNowPlay = false;
    },
    playHomeVideo() {
      this.$refs.playctrlEle.isPlay = true;
      this.isNowPlay = true;
    },
    checkStatus(status) {
      if (status == true) {
        this.isNowPlay = true;
        this.autoPlay = false;
      } else {
        this.isNowPlay = false;
        this.autoPlay = true;
      }
    },
    changeArr(arr, count) {
      //打乱数组顺序
      for (let i = 0, len = arr.length; i < len; i++) {
        let currentRandom = parseInt(Math.random() * (len - 1));
        let current = arr[i];
        arr[i] = arr[currentRandom];
        arr[currentRandom] = current;
      }
      return arr.slice(0, count);
    },
    addValue(arr) {
      let temp = arr;
      temp.forEach((item) => {
        item.ROUND_VALUE = that.roundValueObj[item.ROUND_KEY];
      });
      return temp;
    },
  },
};
</script>

<style lang="less"></style>

<style lang="less" scoped>
:deep(.el-card) {
  box-shadow: var(--o-shadow-base);
}
.home {
  background-color: #f5f6f8;
  .home-nav {
    position: relative;
    padding: var(--o-spacing-h4);
    display: grid;
    margin-top: -57px;
    grid-template-columns: repeat(4, minmax(82px, 1fr));
    column-gap: 0;
    row-gap: 0;
    background: #fff;
    box-shadow: var(--o-shadow-base);
    z-index: 99;
    .nav-item {
      cursor: pointer;
      padding-left: var(--o-spacing-h5);
      display: flex;
      align-items: center;
      border-left: 1px solid var(--o-color-division);
      .nav-item-icon-hover {
        display: none !important;
      }
      .nav-item-icon {
        display: block !important;
      }
      .nav-icon {
        width: 50px;
        img {
          display: block;
          width: 100%;
        }
      }
      .nav-text {
        margin-left: var(--o-spacing-h5);
        .nav-title {
          font-size: var(--o-font-size-h5);
        }
        .nav-title-en {
          font-size: var(--o-font-size-h7);
        }
        .nav-descriptive {
          margin-top: var(--o-spacing-h5);
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
          color: var(--o-color-text3);
          text-align: left;
        }
      }
      &:hover {
        .nav-item-icon-hover {
          display: block !important;
        }
        .nav-item-icon {
          display: none !important;
        }
        .nav-text {
          color: var(--o-color-brand);
          .nav-descriptive {
            color: var(--o-color-brand);
          }
        }
      }
    }
    .nav-item:first-child {
      padding: 0;
      border: none;
    }
    @media screen and (max-width: 1416px) {
      margin-top: var(--o-spacing-h2);
      position: relative;
      grid-template-columns: repeat(2, minmax(82px, 1fr));
      column-gap: 60px;
      &::after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50%;
        content: "";
        width: 1px;
        height: calc(100% - 48px);
        background-color: var(--o-color-division);
      }
      .nav-item {
        padding: 0;
        border: none;
        flex-direction: column;
        .nav-icon {
          width: 30px;
        }
        .nav-text {
          margin: 0;
          .nav-title {
            font-size: var(--o-font-size-text);
          }
          .nav-descriptive {
            display: none;
            text-align: left;
          }
        }
      }
      .nav-item:nth-child(3) {
        border: 0;
      }
      .nav-item:nth-child(-n + 2) {
        padding-top:  0;
        padding-bottom: var(--o-spacing-h6);
        border-bottom: 1px solid var(--o-color-division);
      }
      .nav-item:nth-child(2) {
        position: relative;
      }
      .nav-item:nth-child(n + 3) {
        padding-top: var(--o-spacing-h6);
      }
    }
  }
  .wraper {
    max-width: 1448px;
    margin: 0 auto;
    padding: 0 16px;
  }
  h3 {
    margin-top: var(--o-spacing-h1);
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
      margin-bottom: 16px;
    }
  }
}

#summit-video {
  background-color: white !important;
  margin-left: -100px;
}
.mobile-home-carousel {
  position: relative;
  .mobile-pagination {
    z-index: 99;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    li {
      margin-right: 10px;
      display: inline-block;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: #000;
      opacity: 0;
    }
    .mobile-pagination-active {
      opacity: 0;
    }
  }
}
.en-weight-family {
  font-weight: 400 !important;
}
.en-h3 {
  line-height: 34px !important;

  font-weight: 400 !important;
  color: #000000 !important;
}
.en-p {
  font-weight: 400 !important;
  line-height: 32px !important;
}
[v-cloak] {
  display: none !important;
}

.home .open-begin {
  margin-bottom: 40px;
}
.word-hover {
  &:hover {
    color: #002fa7;
  }
}
.card-hover:hover {
  box-shadow: 0px 6px 15px 0px rgba(0, 47, 167, 0.2);
}
.home p {
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.5);
}
.home-carousel .el-carousel__item h3 {
  font-size: 24px;
  color: #000;
  text-align: left;
  line-height: 48px;

  margin-top: 100px;
}
.home-carousel .el-carousel__item span {
  display: inline-block;
  width: 620px;
  font-size: 20px;
  line-height: 40px;
  margin-top: 48px;
}

.home .data-round {
  width: 1120px;
  margin: 64px auto;

  .round-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // justify-content: center;
    margin-top: 42px;
    padding: 40px 100px;
    background: #fff;
    box-shadow: var(--o-shadow-base);
    // .round-item {
    //     margin-left: 170px;
    //     &:first-of-type {
    //         margin-left: 0;
    //     }
    //     &:nth-of-type(4),&:last-of-type {
    //         margin-top: 80px;
    //     }
    // }
  }
  @media screen and (max-width: 1416px) {
    width: 100%;
    margin: 61px auto 58px auto;
    .round-box {
      max-width: 375px;
      margin: 32px auto 0 auto;
      padding: 24px;
      flex-wrap: wrap;
      justify-content: center;
      .round-item {
        width: 80px;
        margin-left: 28px;
        &:first-of-type {
          margin-left: 0;
        }
        &:nth-of-type(4) {
          margin: 30px 0 0 0;
        }
        &:last-of-type {
          margin: 30px 0 0 18px;
        }
      }
    }
  }
}
.carousel-item {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}
.carousel-item .train-banner-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    &:first-of-type {
      width: 620px;
      height: 400px;
    }
    display: inline-block;
    &:last-of-type {
      margin-left: 211px;
    }
  }
}
.carousel-item .card-summer {
  width: 620px;
  margin-top: 100px;
  text-align: center;
}
.card-summer img:first-child {
  width: 256px;
  margin-top: 0;
}
.banner-gif {
  margin-top: 80px;
}
.banner-link {
  cursor: pointer;
  text-decoration: none;
  color: #000;
  .minisite {
    justify-content: space-between;
    #minisite-video {
      position: relative;
      margin-top: 80px;
    }
  }
}
.activities-banner {
  width: 1120px;
  margin: 0 auto;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
.activities-banner.full-fill {
  width: 100%;
}
.banner-item {
  width: 1080px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  .download-version {
    width: 120px;
    height: 36px;
    font-size: 18px;

    margin-top: 60px;
    color: #ffffff;
    line-height: 24px;
    background-color: #002fa7;
    border-radius: 4px;
    text-align: center;
    div {
      line-height: 36px;
    }
  }
  .en-version {
    width: 120px;
  }
}
.carousel-item .card-summer span {
  margin-left: 0;
  text-align: left;
  width: 100%;
}
.carousel-item .base-software-box {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
  @media screen and (max-width: 1416px) {
    background-size: 100% 100%;
  }
}
.carousel-item img {
  z-index: -1;
}
.carousel-item video {
  position: absolute;
  top: 0;
}

.carousel-video img {
  width: 100%;
}
.carousel-video video {
  outline: none;
  object-fit: cover;
}
.el-carousel__container {
  height: 680px;
}

.el-carousel__item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.video-banner {
  position: relative;
  height: fit-content !important;
  video {
    max-width: 1920px;
    width: 100%;
  }
  .voice-box {
    position: absolute;
    cursor: pointer;
    right: 50px;
    bottom: 50px;
    z-index: 1;
  }
}

.map-rode {
  width: 1080px;
  margin: 0 auto;
  position: relative;
}
.rode-left {
  position: absolute;
  left: 95px;
  z-index: -10;
}
.rode-middle {
  position: absolute;
  left: 420px;
  top: -310px;
  z-index: -10;
}
.rode-right {
  position: absolute;
  left: 760px;
  top: -70px;
  z-index: -10;
}
.plane-left {
  position: absolute;
  left: 215px;
  z-index: -10;
}
.plane-middle {
  position: absolute;
  left: 595px;
  top: -325px;
  z-index: -10;
}
.plane-right {
  position: absolute;
  left: 920px;
  top: -25px;
  z-index: -10;
}
.area-box.in-pc:nth-child(1) {
  position: absolute;
  top: 88px;
  left: 0;
}
.area-box.in-pc:nth-child(2) {
  display: none;
}
.area-box.in-pc:nth-child(3) {
  position: absolute;
  top: 90px;
  left: 56%;
}
.area-box.in-pc:nth-child(4) {
  position: absolute;
  top: -40px;
  left: 80%;
}
.lang-ru .area-box.in-pc:nth-child(4) {
  top: -80px;
  left: 84%;
}
.area-box.in-pc:nth-child(5) {
  position: absolute;
  top: 0;
  left: 28%;
}
.area-box {
  display: inline-block;
  width: 191px;
}
.area-box a {
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.area-box .box-icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
  background-color: #002fa7;
  border-radius: 50%;
}
.area-box .en-areabox-p {
  color: #002fa7;
  line-height: 26px;
  max-width: 181px;
}
.area-box p {
  display: inline-block;
  font-size: 16px;
  color: #002fa7;
  margin-left: 8px;
}
.area-box img {
  width: 150px;
  height: 150px;
  display: block;
  margin: 10px 0 26px 30px;
}
.area-box .en-areabox-gif {
  top: 105px !important;
}
.area-box .is-hidden {
  display: none;
  width: 150px;
  height: 150px;
}
.area-box .is-hovered {
  display: block;
  position: absolute;
  top: 60px;
}
.area-box .down .is-hovered {
  top: 0px;
}
.snd-guidance {
  display: none;
  box-sizing: border-box;
  border: 1px solid rgba(0, 47, 167, 0.5);
  padding: 10px 23px 23px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-top: 15px;
  margin-left: 25px;
}
.snd-guidance.is-show {
  display: block;
  width: 280px;
}
.en-snd-guidance {
  padding: 10px !important;
  margin-top: 0 !important;
  @media screen and (max-width: 1416px) {
    p {
      margin: 0 0 0 8px !important;
    }
  }
}
.snd-guidance .en-link-title {
  font-size: 12px !important;

  font-weight: 400 !important;
  color: #000000 !important;
  line-height: 18px !important;
  position: absolute;
  bottom: 75px;
  width: inherit;
}
.d3-guide {
  display: flex;
  justify-content: space-between;
}
.d3 {
  margin-left: 30px;
  width: 15px;
  height: 15px;
  transform: rotate(45deg);
  border-left: 1px solid rgba(0, 47, 167, 0.5);
  border-top: 1px solid rgba(0, 47, 167, 0.5);
  box-sizing: border-box;
  position: relative;
  top: -18px;
  background: #fff;
}
.guide-way {
  margin-right: 20px;
  text-align: center;
}
.guide-way:last-child {
  margin: 0;
}
.guide-way a {
  text-decoration: none;
  color: #002f33;
  font-size: 12px;
}
.en-guide-way {
  &:first-of-type {
    img {
      margin: 10px 0 0 11px !important;
    }
  }
  margin: 0 10px 0 0;
  span {
    font-size: 10px !important;

    font-weight: normal !important;
    color: #000000 !important;
    line-height: 12px !important;
  }
}
.guide-way img {
  width: 36px;
  height: 36px;
  margin: 10px 0 0;
}
.snd-guidance p {
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  margin: 0;
  color: #002f33;
}
.home-active {
  width: 100%;
  height: 220px;
  text-align: center;
  margin-top: 50px;
  background-color: rgba(1, 0, 87, 0.85);
  background-repeat: repeat-x;
  background-size: contain;
}
.home-active a {
  display: block;
  width: 100%;
  height: 220px;
  text-decoration: none;
  color: #fff;
}
.en-h3-home .en-h3-home {
  font-weight: 400 !important;
  color: #ffffff !important;
  line-height: 34px !important;
}
.home-active h3 {
  font-size: 30px;
  color: #fff;
  padding: 70px 0 20px;
  margin: 0;
}
.home-active p {
  font-size: 14px;
  margin: 0 35px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}
// .home-calendar {
//   // width: 1120px;
//   margin: 64px auto 0;
//   h3 {
//     margin-bottom: 40px;
//   }
//   @media screen and (max-width: 1416px) {
//     margin-top: 40px;
//     h3 {
//       margin-bottom: 0 !important;
//     }
//   }
// }
.statistics {
  display: flex;
  padding-top: 42px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1416px) {
    padding: 20px 0;
    font-size: 12px;
  }
  img {
    margin-left: 8px;
    width: 16px;
    transition: all 0.3s;
  }
  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
    transition: all 0.3s;
    &:hover {
      color: var(--o-color-brand);
      img {
        transform: translateX(3px);
      }
    }
  }
}
.time-tab {
  margin-top: 40px;
}
.time-active {
  display: flex;
}
.calendar-active {
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.topBtn,
.bottomBtn,
.leftBtn,
.rightBtn {
  margin-left: -10px;
  width: 0;
  height: 0;
  border-width: 15px;
  border-style: solid;
  border-color: transparent #002fa7 transparent transparent;
}
.rightBtn {
  margin-top: 6px;
}
.leftBtn {
  margin-top: 6px;
  left: 8px;
  z-index: 1;
  border-color: transparent transparent transparent #002fa7;
}
.bottomBtn {
  margin: 0 auto;
  border-color: #002fa7 transparent transparent transparent;
}
.topBtn {
  margin: 0 auto;
  border-color: transparent transparent #002fa7 transparent;
}
.date-box {
  width: 240px;
  position: relative;
}
.calendar-time {
  width: 130px;
}
.calendar-time p {
  font-size: 14px;
  height: 56px;
  line-height: 56px;
  margin-bottom: 20px;
}
.date-item {
  flex-shrink: 0;
  width: 240px;
  height: 40px;
  margin-left: 20px;
  text-align: center;
  line-height: 40px;
  border: 1px solid black;
}
.active-box {
  display: inline-block;
  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 12px 20px;
  padding: 6px 20px;
  overflow: hidden;
  position: absolute;
  top: 60px;
}
.active-box p {
  font-size: 16px;
}
.active-info {
  display: none;
}
.active-info span {
  font-size: 14px;
}
.home-newsroom {
  // width: 1120px;
  margin: 64px auto 0;
  .room-contain-new {
    display: none;
    padding: var(--o-spacing-h2);
    background-color: #fff;
    box-shadow: var(--o-shadow-base);
    .type-title {
      font-size: var(--o-font-size-h7);
    }
    .room-box {
      display: grid;
      margin-top: var(--o-spacing-h2);
      grid-template-columns: repeat(2, minmax(82px, 1fr));
      column-gap: var(--o-spacing-h2);
      row-gap: var(--o-spacing-h2);
      .room-item-pc {
        display: flex;
        padding-bottom: var(--o-spacing-h2);
        border-bottom: 1px solid var(--o-color-division);
        p {
          text-align: left;
        }
        .room-item-left {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          margin-right: var(--o-spacing-h4);
          width: 100px;
          height: 110px;
          background-color: rgb(226, 231, 245);
          .day {
            margin-bottom: var(--o-spacing-h8);
            font-size: var(--o-font-size-h4);
          }
          .left-bottom {
            font-size: var(--o-font-size-tip);
          }
        }
        .room-item-right {
          display: flex;
          flex: 1;
          min-width: 0;
          font-size: var(--o-font-size-text);
          justify-content: space-between;
          flex-direction: column;
          .room-top {
            h4 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 500;
              font-size: var(--o-font-size-h7);
            }
            p {
              margin-top: var(--o-spacing-h9);
              color: #000;
            }
          }
          .room-bottom {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              text-decoration: none;
            }
          }
        }
      }
      .room-item-mo {
        display: none;
      }
    }
    @media screen and (max-width: 1416px) {
      padding: var(--o-spacing-h6);
      .statistics {
        padding: var(--o-spacing-h6) 0;
        padding-bottom: var(--o-spacing-h10);
      }
      .type-title {
        display: none;
      }
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        .room-item {
          border-bottom: 1px solid var(--o-color-division);
          .room-item-pc {
            border-bottom: none;
            padding-bottom: var(--o-spacing-h5);
            .room-item-left {
              margin-right: var(--o-spacing-h6);
              width: 48px;
              height: 48px;
              .day {
                margin: 0;
                font-size: var(--o-font-size-text);
              }
              .left-bottom {
                display: flex;
                transform: scale(0.5);
                .year {
                  padding-left: 2px;
                }
              }
            }
            .room-item-right {
              .room-top {
                h4 {
                  display: -webkit-box;
                  white-space: inherit;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: 22px;
                  font-size: var(--o-font-size-text);
                }
                p {
                  display: none;
                  margin: 0;
                }
              }
              .room-bottom {
                display: none;
              }
            }
          }
          .room-item-mo {
            display: flex;
            flex-direction: column;
            font-size: var(--o-font-size-tip);
            color: var(--o-color-text3);
            .author {
              padding-bottom: var(--o-spacing-h8);
            }
            a {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-bottom: var(--o-spacing-h5);
              color: inherit;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .isShow {
    display: block;
  }
}
.room-left {
  overflow: hidden;
  width: 622px;
  position: relative;
}
.room-contain {
  display: none;
}
.flex-room {
  width: 555px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 40px;
}
.room-contain span {
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.5);
}
.room-contain p {
  font-size: 16px;
  line-height: 22px;
  margin: 20px 0 25px;
  text-align: left;
  color: rgba(0, 0, 0, 0.85);
  overflow: hidden;
  display: -webkit-box;
  word-wrap: break-word;
  word-break: normal;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.room-contain a {
  font-size: 16px;
  line-height: 16px;
  color: #002fa7;
  text-decoration: none;

  cursor: pointer;
}
 /deep/.title-list {
  display: flex;
  padding-bottom: 40px;
  justify-content: flex-end;
  .el-tabs__header {
    margin: 0;
  }
  @media screen and (max-width: 1416px) {
    padding-bottom: 16px;
    justify-content: center;
  }
  .el-tabs__nav-scroll {
    @media screen and (max-width: 1416px) {
      display: flex;
      justify-content: center;
    }
  }
  .el-tabs__item {
    font-size: 16px;
    @media screen and (max-width: 1416px) {
      font-size: 14px;
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .title-item {
    cursor: pointer;
    padding: 12px;
    &:hover {
      color: var(--o-color-brand);
    }
  }
  .active {
    background-color: var(--o-color-brand);
    color: #fff !important;
  }
}
.room-img {
  width: 420px;
  left: 52px;
  top: 75px;
  position: absolute;
  z-index: -1;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 6px 30px 0px rgba(0, 0, 0, 0.1);
}
.room-img img {
  display: block;
  width: 100%;
}
.room-box a {
  color: #000;
}
.room-box img {
  vertical-align: middle;
  width: 18px;
  margin-right: 10px;
}
.active {
  display: block;
}
.home-developer {
  width: 1080px;
  margin: 60px auto 0;
}
.home-developer .en-developer-p {
  font-weight: 400 !important;
  line-height: 20px !important;
}
.home-developer .dev-leader {
  width: 1033px;
  margin: 50px auto 0;
}
.home-developer .show-all {
  display: none;
}
.dev-leader {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dev-dever:nth-child(-n + 4) {
  margin-top: 0;
}
.dev-dever {
  display: inline-block;
  text-align: center;
  width: 25%;
  min-width: 25%;
  max-width: 25%;
  margin-top: 30px;
}
.dev-dever .dev-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.dev-dever .dever-name {
  color: #005cc7;
  font-size: 16px;
  margin: 20px 0 10px;
  text-transform: uppercase;
}
.dev-dever .dever-rank {
  font-size: 16px;
  color: #000;
  line-height: 22px;
}
.dev-dever .en-rank {
  font-size: 14px !important;

  line-height: 20px !important;
}
.dev-link {
  margin-top: 20px;
  height: 28px;
  line-height: 28px;
}
.dev-link a {
  vertical-align: middle;
}
.dev-link img {
  width: 24px;
  height: 24px;
}
.dev-link .email-link {
  width: 24px;
  height: 20px;
  margin-right: 16px;
}
.medal-logo {
  position: relative;
  top: -5px;
}
.home-source {
  padding-bottom: var(--o-spacing-h1);
  @media screen and (max-width: 1416px) {
    padding-bottom: var(--o-spacing-h2);
  }
}
.source-contain {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
.source-contain .en-source-title {
  font-weight: 400;
  color: #000000;
  line-height: 32px;
}
.home-source .source-title {
  font-size: 24px;
  line-height: 30px;
  color: #000;
  margin-top: 0;
  margin-bottom: 20px;
}
.home-source a {
  font-size: 18px;
  color: #0041bd;
  text-decoration: none;
}
.home-source .source-sponsor {
  font-size: 18px;
  color: #0041bd;
}
.source-apply,
.source-mail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.apply-img,
.mail-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-right: 40px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
}
.apply-img img,
.mail-img img {
  display: block;
  flex-basis: 125px;
  flex-shrink: 0;
  width: 125px;
  height: 125px;
}
.apply-des p,
.mail-des p {
  text-align: left;
  font-size: 18px;
  margin-top: 20px;
}
.apply-des p {
  &:last-of-type {
    cursor: pointer;
  }
}
.mail-des a,
.apply-des a {
  cursor: pointer;
}
.apply-des .click-here {
  margin-top: 10px;
}
.source-publish-link {
  margin-top: 64px;
  font-size: 30px;
}
.diff-pc-mobile {
  .mobile-img {
    display: none;
  }
}
html[lang="zh"] .source-publish-link h5 {
  text-align: center;
  line-height: 30px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.87);
}
.source-publish-link h5 {
  text-align: center;
  line-height: 30px;
  margin-bottom: 50px;
  color: rgba(0, 0, 0, 0.87);
}
.source-publish-link .publish-rank {
  margin-bottom: 50px;
}
.source-more {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 0;
  .source-card-left,
  .source-card-right {
    background-image: url(/img/home/source-bg.png);
    background-repeat: no-repeat;
    background-position: bottom right;
    background-color: #fff;
    padding: 40px;
    transition: all 0.3s;
    box-shadow: var(--o-shadow-base);
    &:hover {
      box-shadow: 0px 6px 18px 0px rgba(0, 47, 167, 0.14);
    }
    .card-title {
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 500;
    }
    .card-body {
      margin: 0;
      min-height: 48px;
      color: #000;
      text-align: left;
      font-size: 14px;
      line-height: 22px;
      overflow: hidden;
      word-wrap: break-word;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .button-box {
      margin-top: 50px;
      display: flex;
      .button-left,
      .button-right {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 8px 12px;
        line-height: 24px;
        color: #fff;
        font-size: 14px;
        outline: none;
        border: none;
        transition: all 0.2s;
        background-color: #002fa7;
        img {
          margin-left: 6px;
          width: 24px;
          transition: all 0.3s;
        }
      }
      .button-left:hover {
        background-color: #0c41c9;
        img {
          transform: translateX(5px);
        }
      }
      .button-left {
        img {
          width: 16px;
        }
      }
      .button-right {
        margin-left: 24px;
        color: #000;
        background-color: inherit;
        transition: all 0.2s;
        &:hover {
          img {
            transform: translateX(5px);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1416px) {
    grid-template-columns: repeat(1, minmax(300px, 1fr));
    column-gap: 0;
    row-gap: 16px;
    .source-card-left,
    .source-card-right {
      background-size: 170px 107px;
      padding: 16px 12px;
      .card-title {
        margin-bottom: 8px;
        font-size: 14px;
      }
      .card-body {
        min-height: 44px;
        font-size: 12px;
        color: #555;
      }
      .button-box {
        width: fit-content;
        flex-direction: column;
        margin-top: 24px;
        .button-right,
        .button-left {
          padding: 4px 12px;
        }
        .button-right {
          margin: 0;
          margin-top: 8px;
        }
      }
    }
  }
}
.publish-edition {
  display: grid;
  margin-top: var(--o-spacing-h2);
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  a {
    display: flex;
    align-items: center;
    margin: 0px -1px -1px 0px;
    padding: 24px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    max-height: 120px;
    img {
      display: block;
      width: 100%;
    }
  }
  @media screen and (max-width: 1416px) {
    margin-top: 16px;
    grid-template-columns: repeat(2, minmax(82px, 270px));
    justify-content: center;
    a {
      padding: 10px 0;
      min-height: 40px;
    }
  }
}
@media screen and (max-width: 1416px) {
  .is-pc {
    display: none;
  }
  .is-h5 {
    display: block;
    .carousel-video {
      .mobile-btn {
        width: 100px;
        height: 100px;
        position: absolute;
        border-radius: 50px;
        bottom: 50%;
        left: 50%;
        margin: 0 0 -50px -50px;
        background-image: url("/img/home/play-btn.gif");
        background-size: contain;
        opacity: 0.6;
      }
    }
    .carousel-item .HC-mobile-box {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .carousel-item .train-img {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
  .is-pc.mapArea {
    display: none;
  }
  .home-introduce .is-pc {
    display: none;
  }
  .home-introduce .is-h5.mapArea {
    display: block;
    margin-top: 25px;
    height: 100%;
    position: relative;
    .location {
      position: absolute;
      top: 31%;
      left: 4%;
    }
  }
  .home p {
    font-size: 16px;
    margin: 0 30px;
  }
  .carousel-item .card-summer {
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
    margin-top: 0;
  }
  .carousel-img {
    width: 100%;
  }
  .card-summer img {
    vertical-align: middle;
  }
  .home-carousel {
    position: relative;
    margin: 0 -15px;
    .nav-migration {
      position: absolute;
      bottom: 22px;
      right: 12px;
      width: 108px;
      z-index: 10;
      img {
        width: 100%;
      }
    }
  }
  .home-carousel .el-carousel__item h3 {
    font-size: 18px;
    text-align: center;
    margin-top: 35px;
    margin-bottom: 0;
  }
  .carousel-item-index .mobile-version {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    video {
      width: 375px;
      height: 300px;
    }
  }
  .carousel-item-index {
    display: flex;
    align-items: center;
    justify-content: center;
    .video-banner {
      position: relative;
      text-align: center;
      width: 375px;
      height: 300px;
      .bg-banner {
        width: 100% !important;
        height: 100%;
      }
      .open-video {
        position: absolute;
        overflow: hidden;
        border-radius: 50%;
        width: 56px;
        top: 50%;
        left: 50%;
        animation: breathe 1200ms infinite alternate;
        transform: translate(-50%, -50%);
      }
    }
  }
  .home-carousel .el-carousel__item span {
    display: inline-block;
    width: 65%;
    font-size: 1.5vw;
    line-height: 24px;
    margin-top: 0;
  }
  .el-carousel__container {
    width: 100%;
    height: 380px;
    font-size: 1vw;
  }
  .home-introduce {
    padding-top: 40px;
    width: 100%;
  }
  .home-introduce h1 {
    width: 228px;
    height: 60px;
    background-image: url("/img/home/mobile-h1.png");
  }
  .area-box .box-icon {
    display: inline-block;
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 18px;
    line-height: 50px;
    background-color: #002fa7;
    border-radius: 50%;
  }
  .area-box p {
    display: inline-block;
    font-size: 16px;
    color: #002fa7;
    margin-left: 16px;
  }
  .area-box .lang-en {
    display: block;
    margin: 4px 0 0 25px;
    font-weight: bold;
  }
  .area-box img {
    display: block;
    margin: 10px auto 26px;
  }
  .home-calendar {
    width: 100%;
  }
  .home-active {
    margin-top: 40px;
    background-size: cover;
  }
  .home-active h3 {
    margin-bottom: 20px;
    padding: 40px 0 20px;
  }
  html[lang="ru"] .home-active {
    height: 250px;
  }
  html[lang="ru"] .home-active p {
    margin-top: -10px;
  }
  .home-active p {
    margin-bottom: 45px;
  }
  .area-box {
    display: block;
    margin: 0 auto;
    width: 67%;
  }
  .calendar-time p {
    font-size: 14px;
    height: 56px;
    line-height: 56px;
    margin: 0 0 10px;
  }
  .active-box {
    margin: 0;
  }
  .calendar-time {
    width: 110px;
  }
  .home-newsroom {
    width: 100%;
    margin-top: 40px;
  }
  .blog-room {
    margin-top: 40px;
  }
  .newsroom h5 {
    font-size: 18px;
    line-height: 18px;
    color: #333;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .rooms span {
    font-size: 14px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.5);
  }
  .rooms p {
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    margin: 10px 0 20px;
    color: rgba(0, 0, 0, 0.85);
    overflow: hidden;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .newsroom a {
    font-size: 14px;
    display: inline-block;
    text-decoration: none;
    color: #002fa7;
  }
  .newsroom .room-more {
    margin-bottom: 40px;
  }
  .home-developer {
    width: 100%;
    margin-top: 20px;
  }
  .home-developer .dev-leader {
    width: 100%;
    margin: 0;
  }
  .home-developer .show-all {
    display: block;
    text-align: center;
    margin-top: 40px;
  }
  .show-all p {
    color: #002fa7;
  }
  .dev-dever {
    width: 50%;
    min-width: 50%;
    max-width: 50%;
    margin-top: 35px;
  }
  .dev-dever.hidden {
    display: none;
  }
  .dev-dever .dever-name {
    font-size: 18px;

    margin: 0;
  }
  .dev-dever .dever-rank {
    margin: 0;
    font-size: 14px;
  }
  .dev-dever:nth-child(-n + 4) {
    display: inline-block;
    margin-top: 35px;
  }
  .medal-logo {
    position: relative;
    top: 0px;
  }
  .home-source .source-title {
    font-size: 18px;
    font-weight: 600;
  }
  .home-source a {
    font-size: 16px;
  }
  .source-publish-link {
    margin-top: 30px;
  }
  .source-contain {
    width: 100%;
    display: block;
  }
  .source-apply,
  .source-mail {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
  .diff-pc-mobile {
    .mobile-img {
      display: block;
    }
    .pc-img {
      display: none;
    }
  }
  html[lang="zh"] .source-publish-link h5 {
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    margin-bottom: 0px;
  }
  .source-publish-link h5 {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    margin-bottom: 0;
  }
  .source-publish-link .publish-rank {
    margin-bottom: 30px;
  }
  html[lang="ru"] .source-publish-link h5 {
    line-height: 34px;
  }
  .apply-img,
  .mail-img {
    display: none;
  }
  .apply-des p,
  .mail-des p {
    text-align: center;
  }
}
</style>
