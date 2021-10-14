<template>
  <div>
    <div class="banner">
      <a href="https://e-campaign.huawei.com/m/FjEF3q" target="_blank">
        <img
          class="extend"
          src="/img/summit/summit2021/left-longer.png"
          alt=""
        />
        <img class="main" :src="i18n.summit.SUMMIT_BANNER.PC_IMG" />
        <img
          class="extend"
          src="/img/summit/summit2021/right-longer.png"
          alt=""
        />
      </a>
    </div>
    <div class="h5-banner">
      <a href="https://e-campaign.huawei.com/m/FjEF3q" target="_blank"
        ><img :src="i18n.summit.SUMMIT_BANNER.MOBILE_IMG"
      /></a>
    </div>
    <div class="container">
      <div class="text-wrapper">
        <p class="text">{{ i18n.summit.SUMMIT_INTRODUCE }}</p>
        <div class="link-wrapper">
          <a
            href="https://shimowendang.com/forms/X6X9jj9KPcdQwVr8/fill"
            target="_blank"
            ><img :src="i18n.interaction.SUMMIT_2021.SPEACKER"
          /></a>
          <a
            href="https://shimowendang.com/forms/k76zTLKvumYwRdsP/fill"
            target="_blank"
            ><img :src="i18n.interaction.SUMMIT_2021.SPEONSOR"
          /></a>
          <a
            href="https://shimowendang.com/forms/LjHs8JlsLSsW92kl/fill"
            target="_blank"
            ><img :src="i18n.interaction.SUMMIT_2021.DEMO"
          /></a>
        </div>
      </div>
      <div class="agenda" id="agenda">
        <div :class="['title', $lang === 'en' ? 'en-title' : '']">
          <img v-lazy="agendaData.WEB_TITLE" alt="" v-if="!isShowH5" />
          <img v-lazy="agendaData.MOBILE_TITLE" alt="" v-else />
        </div>
        <div class="time-box">
          <el-tabs v-model="showTab" @tab-click="tabClick">
            <el-tab-pane :label="dateArr[0]" name="nine"></el-tab-pane>
            <el-tab-pane :label="dateArr[1]" name="ten"></el-tab-pane>
          </el-tabs>
        </div>
        <div
          :class="[
            'calendar-content',
            showTab === 'nine' ? 'center-p' : '',
          ]"
          v-show="!isShowcarousel"
        >
          <el-table
            :data="agendaTableData"
            :show-header="false"
            :span-method="objectSpanMethod"
            :class="showTab === 'nine' ? 'hideIcon' : ''"
            style="width: 100%"
            v-if="!isShowH5"
            empty-text="敬请期待"
          >
            <el-table-column prop="icon" width="30">
              <i class="el-icon-time"></i>
            </el-table-column>
            <el-table-column prop="TIME" width="200"> </el-table-column>
            <el-table-column prop="THEME" width="470"> </el-table-column>
            <el-table-column prop="SPEAKER" width="90"> </el-table-column>
            <el-table-column prop="POSITION" width="330"> </el-table-column>
          </el-table>
          <div class="mobile-table" v-if="isShowH5">
            <div class="wait" v-if="showTab === 'nine'">敬请期待</div>
            <div
              class="item"
              v-for="(item, index) in agendaTableData"
              :key="index"
            >
              <div class="time">{{ item.TIME }}</div>
              <div class="agenda">
                <p>{{ item.THEME }}</p>
                <p v-if="item.SPEAKER || item.POSITION">
                  <span>{{ item.SPEAKER }}</span>
                  <span>{{ item.POSITION }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <carousel v-show="isShowcarousel"></carousel> -->
      </div>
      <div class="review-wrapper">
        <div class="title">
          <span>{{ i18n.summit.HIGHLIGHTS }}</span>
          <img src="/img/summit/devday-2021/review.png" />
        </div>
        <div @click="go('/interaction/summit-list/devday2021/')" class="link">
          openEuler Developer Day 2021
        </div>
        <div @click="go('/interaction/summit-list/')" class="link">
          openEuler Summit 2020
        </div>
        <div @click="go('/interaction/summit-list/list/')" class="link">
          openEuler Virtual Summit 2020
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import carousel from "./carousel.vue";
export default {
  components: {
    // carousel,
  },
  data() {
    return {
      agendaData: {},
      dateArr: [],
      showTab: "ten",
      showBtn: "forenoon",
      agendaData: {},
      dateArr: [],
      agendaTableData: [],
      isShowcarousel: false,
      isShowBtn: true,
    };
  },
  mounted() {
    this.agendaData = this.i18n.summit.AGENDA;
    this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
    this.dateArr = this.agendaData.DATE;
  },
  methods: {
    go(url) {
      const routeUrl = this.$router.resolve(this.resolvePath(url));
      window.open(routeUrl.href);
    },
    showAll() {
      this.flag = !this.flag;
    },
    tabClick(tab) {
      if (tab.name === "nine") {
        this.isShowcarousel = false;
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_9;
        this.isShowBtn = false;
      } else if (tab.name === "ten") {
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
      } else {
        return false;
      }
    },
    changeTime(tab) {
      if (tab === "forenoon") {
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_10;
        this.isShowcarousel = false;
      } else if (tab === "afternoon") {
        this.isShowcarousel = true;
      } else if (tab === "evening") {
      } else {
        return false;
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.showTab === "ten") {
        if (rowIndex === 7 || rowIndex === 5) {
          if (columnIndex === 3) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          }
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.h5-banner {
  display: none;
  margin-bottom: 40px;
  .title {
    text-align: center;
    font-size: 24px;
    line-height: 34px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  img {
    display: block;
    margin: 0 auto;
  }
  @media screen and (max-width: 1000px) {
    display: block;
  }
}
.banner {
  @media screen and (max-width: 1000px) {
    display: none;
  }
  height: 380px;
  width: 100%;
  margin-bottom: 50px;
  a {
    display: inline-block;
    width: 100%;
    text-align: center;
    @media screen and (min-width: 2500px) {
      display: flex;
      justify-content: space-around;
    }
    .extend {
      display: none;
      @media screen and (min-width: 2500px) {
        display: block;
      }
    }
    .main {
      max-width: 1920px;
      width: 100%;
      height: 100%;
    }
  }
}
.container {
  width: 1120px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media screen and (max-width: 1000px) {
    margin-bottom: 60px;
    padding: 0 30px;
    width: 100%;
  }
  .text-wrapper {
    margin-bottom: 50px;
    color: #000;
    font-size: 20px;
    line-height: 40px;
    @media screen and (max-width: 1000px) {
      font-size: 14px;
      line-height: 26px;
      margin-bottom: 40px;
    }
  }

  /deep/#agenda {
    margin-bottom: 50px;
    .el-table {
      font-size: 18px;
      .cell {
        padding: 0;
      }
    }
    .el-tabs__nav-scroll {
      @media screen and (max-width: 1000px) {
       display: flex;
       justify-content: center;
      }
    }
    .el-tabs__item {
      font-size: 22px;
      font-weight: 700;
      font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
      color: rgba(0, 0, 0, 0.5);
      line-height: 28px;
      @media screen and (max-width: 1000px) {
        font-size: 16px;
        line-height: 40px;
      }
    }
    .el-table_1_column_1,
    .el-table_1_column_2,
    .el-table_1_column_5 {
      color: rgba(0, 0, 0, 0.5);
    }
    .el-table_1_column_5 {
      font-size: 16px;
    }
    .el-table_1_column_3,
    .el-table_1_column_4 {
      .cell {
        color: #000;
      }
    }
    .is-active {
      color: #002fa7;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .title {
      width: 900px;
      position: relative;
      margin: 0 auto 30px;
      img {
        width: 900px;
        height: 76px;
      }
      @media screen and (max-width: 1000px) {
        width: 335px;
        img {
          width: 335px;
          height: 38px;
        }
      }
    }
  }
  // 移动端峰会日程
  .mobile-table {
    font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
    .item {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      &:last-of-type {
        border-bottom: 0;
        margin-bottom: 0;
      }
      .time {
        flex-shrink: 0;
        width: 82px;
        height: 20px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 20px;
        margin: 0 27px 0 0;
      }
      .agenda {
        p {
          color: #000000;
          line-height: 20px;
          font-size: 12px;
          margin-bottom: 20px;
          &:first-of-type {
            width: 209px;
          }
          span {
            &:first-of-type {
              margin-right: 25px;
              width: 41px;
              vertical-align: top;
            }
            &:first-of-type,
            &:last-of-type {
              display: inline-block;
            }
            &:last-of-type {
              width: 200px;
            }
          }
        }
      }
    }
    .item:nth-child(-n+9):nth-child(n+6){
      p  span:first-of-type {
        width: 150px;
      }
      p  span:last-of-type {
        width: 0;
      }
    }
  }
  .link-wrapper {
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    width: 80%;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;
    }
    img {
      height: 234px;
      width: 246px;
      border-radius: 8px;
      @media screen and (max-width: 1000px) {
        margin-bottom: 30px;
      }
    }
  }
  .schedule-pc {
    margin-bottom: 50px;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .schedule-h5 {
    display: none;
    margin-bottom: 40px;
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
  .review-wrapper {
    .title {
      font-size: 26px;
      margin-bottom: 32px;
      @media screen and (max-width: 1000px) {
        margin-bottom: 10px;
      }
      span {
        vertical-align: middle;
        @media screen and (max-width: 1000px) {
          font-size: 16px;
        }
      }
      img {
        @media screen and (max-width: 1000px) {
          display: none;
        }
        width: 28px;
        height: 28px;
        vertical-align: middle;
      }
    }
    .link {
      color: #002fa7;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 24px;
      cursor: pointer;
      @media screen and (max-width: 1000px) {
        margin-bottom: 12px;
        font-size: 14px;
      }
    }
  }
}
.wait {
  padding-bottom: 20px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
</style>