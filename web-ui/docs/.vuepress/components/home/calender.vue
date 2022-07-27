<template>
  <div class="wrapper">
    <div class="head-title">
      <div class="left-title">
        <svg
          version="1.1"
          class="o-icon"
          @click="changeMonth(0)"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M10.96 16.96c-0.188-0.187-0.293-0.442-0.293-0.707v-0.507c0.003-0.265 0.108-0.518 0.293-0.707l6.853-6.84c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l0.947 0.947c0.125 0.123 0.196 0.291 0.196 0.467s-0.071 0.344-0.196 0.467l-5.933 5.92 5.933 5.92c0.126 0.125 0.197 0.296 0.197 0.473s-0.071 0.348-0.197 0.473l-0.947 0.933c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-6.853-6.84z"
          ></path>
        </svg>
        <span class="month-date">{{ monthDate }}</span>
        <svg
          version="1.1"
          class="o-icon"
          @click="changeMonth(2)"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          data-v-4cf11efe=""
        >
          <title></title>
          <path
            fill="currentColor"
            d="M21.040 15.040c0.188 0.187 0.293 0.442 0.293 0.707v0.507c-0.003 0.265-0.108 0.518-0.293 0.707l-6.853 6.84c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-0.947-0.947c-0.125-0.123-0.196-0.291-0.196-0.467s0.071-0.344 0.196-0.467l5.933-5.92-5.933-5.92c-0.126-0.125-0.197-0.296-0.197-0.473s0.071-0.348 0.197-0.473l0.947-0.933c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l6.853 6.84z"
          ></path>
        </svg>
      </div>
      <div class="right-title">
        <div class="title-list">
          <!-- <div
            v-for="(item, index) in titleList"
            :key="item"
            :class="{ active: index === activeIndex }"
            class="title-item"
            @click="changeTab(index)"
          >
            {{ item }}
          </div> -->
          <el-tabs v-model="tabType" @tab-click="changeTab">
            <el-tab-pane
              v-for="item in titleList"
              :key="item"
              :label="item"
              :name="item"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="main-body" ref="activeBoxs">
      <el-calendar v-if="!isShowH5" class="calender calender-pc">
        <template slot="dateCell" slot-scope="{ data }">
          <div
            class="out-box"
            :class="{ 'be-active': getMeetTimes(data.day) }"
            @click="meetClick(data.day)"
          >
            <div class="day-box">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                class="date-calender"
              >
                {{ data.day.split('-').slice(2)[0] }}
              </p>
            </div>
          </div>
        </template>
      </el-calendar>
      <el-collapse v-else class="calender-mo">
        <div class="collapse-box-mo">
          <el-collapse-item>
            <template #title>
              <div class="mo-collapse">
                <svg id="icon-icon-calendar" viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    style="fill: var(--color1, #555)"
                    d="M25.333 5.333h-1.333v-2c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v2h-10.667v-2c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v2h-1.333c-1.473 0-2.667 1.194-2.667 2.667v17.333c0 1.473 1.194 2.667 2.667 2.667h18.667c1.473 0 2.667-1.194 2.667-2.667v-17.333c0-1.473-1.194-2.667-2.667-2.667zM25.333 25.333h-18.667v-14.667h18.667v14.667zM15.333 16h1.333c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667zM20.667 16h1.333c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667zM10 16h1.333c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667zM15.333 21.333h1.333c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667zM10 21.333h1.333c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667z"
                  ></path>
                </svg>
                <span class="month-date">{{ getNowFormatDate() }}</span>
              </div>
            </template>
            <div class="meet-detail">
              <template>
                <div class="left-title">
                  <svg
                    version="1.1"
                    class="o-icon"
                    @click="changeMonth(0)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M10.96 16.96c-0.188-0.187-0.293-0.442-0.293-0.707v-0.507c0.003-0.265 0.108-0.518 0.293-0.707l6.853-6.84c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l0.947 0.947c0.125 0.123 0.196 0.291 0.196 0.467s-0.071 0.344-0.196 0.467l-5.933 5.92 5.933 5.92c0.126 0.125 0.197 0.296 0.197 0.473s-0.071 0.348-0.197 0.473l-0.947 0.933c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-6.853-6.84z"
                    ></path>
                  </svg>
                  <span class="month-date">{{ monthDate }}</span>
                  <svg
                    version="1.1"
                    class="o-icon"
                    @click="changeMonth(2)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    data-v-4cf11efe=""
                  >
                    <title></title>
                    <path
                      fill="currentColor"
                      d="M21.040 15.040c0.188 0.187 0.293 0.442 0.293 0.707v0.507c-0.003 0.265-0.108 0.518-0.293 0.707l-6.853 6.84c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-0.947-0.947c-0.125-0.123-0.196-0.291-0.196-0.467s0.071-0.344 0.196-0.467l5.933-5.92-5.933-5.92c-0.126-0.125-0.197-0.296-0.197-0.473s0.071-0.348 0.197-0.473l0.947-0.933c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l6.853 6.84z"
                    ></path>
                  </svg>
                </div>
                <el-calendar class="calender">
                  <template slot="dateCell" slot-scope="{ data }">
                    <div
                      class="out-box"
                      :class="{ 'be-active': getMeetTimes(data.day) }"
                      @click="meetClick(data.day)"
                    >
                      <div class="day-box">
                        <p
                          :class="data.isSelected ? 'is-selected' : ''"
                          class="date-calender"
                        >
                          {{ data.day.split('-').slice(2)[0] }}
                        </p>
                      </div>
                    </div>
                  </template>
                </el-calendar>
              </template>
            </div>
          </el-collapse-item>
        </div>
      </el-collapse>
      <div class="detailList">
        <div class="detailHead">
          <span>最新日程：</span>
          <span>{{ currentDay }}</span>
        </div>
        <div class="meetList">
          <div v-if="isMeeting" class="demo-collapse">
            <el-collapse
              v-model="activeName"
              accordion
              @change="changeCollapse()"
            >
              <div
                v-for="(item, index) in renderData.timeData"
                :key="item.id"
                class="collapse-box"
              >
                <el-collapse-item :name="index">
                  <template #title>
                    <div class="meet-item">
                      <div class="meet-left">
                        <div class="left-top">
                          <p class="meet-name">{{ item.name || item.title }}</p>
                          <!-- <p v-if="item.schedules" class="introduce">
                            {{ titleList[item.activity_category + 1] }}
                          </p>
                          <p v-else class="introduce">会议</p> -->
                        </div>
                        <div
                          v-if="item.schedules"
                          class="more-detail"
                          @click.stop="goDetail(index)"
                        >
                          了解更多
                          <img
                            class="o-icon"
                            @click="changeMonth(2)"
                            src="/img/home/icon-right.svg"
                            alt=""
                          />
                        </div>
                        <div
                          v-if="item.group_name"
                          class="group-name more-detail"
                        >
                          SIG组: {{ item.group_name }}
                        </div>
                      </div>
                      <div class="item-right">
                        <div class="detail-time">
                          <span class="start-time">{{
                            item.startTime || item.start_date
                          }}</span>
                          <span v-if="isShowH5">-</span>
                          <span class="end-time">{{
                            item.endTime || item.end_date
                          }}</span>
                        </div>
                        <div class="extend">
                          <img
                            class="o-icon"
                            :class="{
                              reversal: isCollapse && activeName === index,
                            }"
                            src="/img/home/chevron-down.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="meet-detail">
                    <template v-for="keys in detailItem">
                      <div
                        v-if="item[keys.key]"
                        class="meeting-item"
                        :key="keys.key"
                      >
                        <div class="item-title">{{ keys.text }}:</div>
                        <p
                          v-if="
                            !keys.isLink &&
                            keys.key !== 'activity_type' &&
                            keys.key !== 'date'
                          "
                        >
                          {{ item[keys.key] }}
                        </p>
                        <p
                          v-else-if="
                            keys.isLink &&
                            item[keys.key] &&
                            !item[keys.key].includes('http')
                          "
                        >
                          {{ item[keys.key] }}
                        </p>
                        <a
                          v-else-if="keys.isLink"
                          :href="item[keys.key]"
                          target="_blank"
                          >{{ item[keys.key] }}</a
                        >
                        <p v-else-if="keys.key === 'activity_type'">
                          {{ activityType[item.activity_type - 1] }}
                        </p>
                        <p v-else>{{ currentDay }}</p>
                      </div>
                    </template>
                  </div>
                </el-collapse-item>
              </div>
            </el-collapse>
          </div>
          <div v-else class="empty">
            <img src="/img/home/404.png" alt="" />
            <p>当日没有活动，敬请期待</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      detailItem: [
        { text: '会议详情', key: 'detail', isLink: false },
        { text: '发起人', key: 'creator', isLink: false },
        { text: '会议日期', key: 'date', isLink: false },
        { text: '会议时间', key: 'duration_time', isLink: false },
        { text: '会议ID', key: 'meeting_id', isLink: false },
        { text: '会议链接', key: 'join_url', isLink: true },
        { text: 'Etherpad链接', key: 'etherpad', isLink: true },
        { text: '活动介绍', key: 'synopsis', isLink: false },
        { text: '起始日期', key: 'start_date', isLink: false },
        { text: '结束日期', key: 'end_date', isLink: false },
        { text: '活动形式', key: 'activity_type', isLink: false },
        { text: '线上链接', key: 'online_url', isLink: true },
        { text: '报名链接', key: 'register_url', isLink: true },
        { text: '回放链接', key: 'replay_url', isLink: true },
      ],
      isMeeting: false,
      currentDay: '',
      currentMeet: [],
      renderData: [],
      activeName: '',
      monthDate: '',
      toDay: '',
      activeIndex: 0,
      isCollapse: false,
      activityType: ['线下', '线上', '线上 + 线下'],
      titleList: ['全部', '会议', '活动', '峰会'],
      tabType: '全部',
    };
  },
  props: ['tableData'],
  mounted() {},
  methods: {
    changeTab(item) {
      let index = item.index - 0;
      this.activeIndex = index;
      try {
        // 0、全部 1、会议 其他活动
        if (index === 0) {
          this.renderData.timeData = this.currentMeet.timeData;
        } else if (index === 1) {
          this.renderData.timeData = this.currentMeet.timeData.filter(
            (item) => {
              return item.etherpad;
            }
          );
        } else {
          this.renderData.timeData = this.currentMeet.timeData.filter(
            (item) => {
              return item.activity_category === index - 1;
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
      if (!this.renderData.timeData.length) {
        this.isMeeting = false;
      } else {
        this.isMeeting = true;
      }
    },
    meetClick(day) {
      this.currentDay = day;
      this.activeIndex = 0;
      try {
        this.tableData.forEach((item) => {
          this.isCollapse = false;
          if (item.date === day || item.start_date === day) {
            this.isMeeting = true;
            // 深拷贝
            this.currentMeet = JSON.parse(JSON.stringify(item));
            this.renderData = item;
            // 只有一个会议默认展开
            if (item.timeData.length === 1) {
              this.activeName = '0';
              this.$nextTick(() => {
                document.querySelector('.meet-item').click();
              });
            } else {
              // 多个会议按时间排序
              this.activeName = '';
              item.timeData.sort((a, b) => {
                return (
                  parseInt(a.startTime.replace(':', '')) -
                  parseInt(b.startTime.replace(':', ''))
                );
              });
            }
            throw new Error();
          } else {
            this.isMeeting = false;
          }
        });
      } catch (error) {
        console.error();
      }
    },
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = '-';
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getMeetTimes(day) {
      let times = 0;
      this.tableData.forEach((item) => {
        if (item.date === day || item.start_date === day) {
          times = item.timeData.length;
          return;
        }
      });
      return times;
    },
    changeMonth(index) {
      document.querySelectorAll('.el-button-group button')[index].click();
    },
    watchChange(element) {
      let that = this;
      let observe = new MutationObserver(function () {
        that.monthDate = element.innerHTML;
      });
      observe.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  mounted() {
    // document.querySelector('.is-today .day-box').click();
    // dom加载完成展开最近的活动
    setTimeout(() => {
      let activeBoxs =
        document.querySelector('.is-today .be-active');
      if (activeBoxs) {
        activeBoxs.click();
      }
    }, 100);
    this.toDay = document.querySelector('is');
    const element = document.querySelector('.el-calendar__title');
    this.monthDate = element.innerHTML;
    this.watchChange(element);
  },
};
</script>

<style lang="less" scoped>
@themeColor: #002fa7;
@backgroundColor: #e5e8f0;
@orange: #406fe7;

h4 {
  margin: 5px 0;
}
a {
  text-decoration: none;
  color: @themeColor;
}
p::before,
p::after {
  display: none;
}
.wrapper {
  margin: 0 auto;
  // padding: 0 16px;
  max-width: 1448px;
  .calendar-title {
    text-align: center;
    font-size: 36px;
    font-weight: 400;
  }
  .head-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 40px 0;
    .left-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      .o-icon {
        width: 24px;
        color: #000;
      }
    }
    .month-date {
      padding: 0 8px;
    }
    @media screen and (max-width: 1000px) {
      .left-title {
        display: none;
      }
    }
    /deep/ .title-list {
      padding: 0;
      display: flex;
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__nav-scroll {
        @media screen and (max-width: 1000px) {
          display: flex;
          justify-content: center;
        }
      }
      .el-tabs__item {
        font-size: 16px;
        @media screen and (max-width: 1000px) {
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
          color: @themeColor;
        }
      }
      .active {
        background-color: @themeColor;
        color: #fff !important;
      }
    }
    .o-icon {
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      color: #000;
      transition: color 0.2s;
      &:hover {
        color: @themeColor;
        svg {
          color: #002fa7;
          fill: #002fa7;
        }
      }
    }
  }
  .main-body {
    display: flex;
    .el-collapse-item__content {
      padding: 0;
    }
    .collapse-box-mo {
      //  /deep/ .el-collapse-item__header {
      //     display: none;
      //   }
      .left-title {
        display: none;
      }
    }
    @media screen and (max-width: 1000px) {
      .collapse-box-mo {
        .el-collapse-item {
          padding: 0 8px;
          width: 345px;
          /deep/ .el-collapse-item__content {
            padding: 0;
          }
          .meet-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .left-title {
              display: flex;
              padding: 8px 64px;
              align-items: center;
              justify-content: space-between;
              svg {
                cursor: pointer;
                width: 16px;
              }
            }
          }
        }
        .mo-collapse {
          display: flex;
          align-items: center;
          width: 100%;
          svg {
            width: 16px;
          }
          .month-date {
            padding-left: 8px;
            font-size: 12px;
            color: #000;
            line-height: 16px;
          }
        }
      }
      /deep/.el-icon-arrow-right {
        font-weight: 700;
        transform: rotate(90deg);
        &::before {
          color: #000;
        }
      }
      /deep/.el-icon-arrow-right.is-active {
        transform: rotate(270deg);
      }
    }
    /deep/ .calender {
      max-width: 500px;
      text-align: center;
      .el-calendar__header {
        display: none;
        .el-button-group {
          display: none;
        }
      }
      thead {
        th {
          text-align: center;
        }
        background-color: @backgroundColor;
      }
      @media screen and (max-width: 1000px) {
        display: none;
      }

      .is-today {
        .el-calendar-day {
          .day-box {
            color: #555555;
            background-color: @backgroundColor;
          }
        }
      }
      .is-selected {
        color: white;
        .el-calendar-day {
          .day-box {
            background-color: @themeColor;
          }
        }
      }
      .el-calendar__body {
        padding: 0;
        .el-calendar-table__row {
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
          font-size: 12px;
          td.prev,
          td.next {
            color: #999;
          }
          .el-calendar-day {
            display: flex;
            justify-content: center;
            padding: 0;
            height: 66px;
            .out-box {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
            .be-active {
              position: relative;
              overflow: hidden;
            }
            .be-active::after {
              position: absolute;
              top: -6px;
              right: -6px;
              content: '';
              width: 20px;
              height: 20px;
              border-radius: 0 0 0 20px;
              background-color: @orange;
              @media screen and (max-width: 1000px) {
                width: 12px;
                height: 12px;
                top: -4px;
                right: -4px;
                border-radius: 0 0 0 12px;
              }
            }
            .day-box {
              display: flex;
              box-sizing: border-box;
              justify-content: center;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              align-items: center;
              .date-calender {
                line-height: 21px;
                font-size: 16px;
              }
            }
          }
          @media screen and (max-width: 1000px) {
            .el-calendar-day {
              // width: 32px;
              height: 47px;
              .day-box {
                .date-calender {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    /deep/ .calender-mo {
      display: none;
      @media screen and (max-width: 1000px) {
        display: flex;
        // width: 300px;
        .calender {
          display: block;
        }
        thead {
          th {
            padding: 7px 0;
            font-size: 12px;
          }
        }
        tbody {
          width: 300px;
        }
        tr {
          td {
            border: none;
            // display: flex;
            justify-content: center;
          }
        }
        .current {
          // display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
    /deep/ .detailList {
      width: 100%;
      .detailHead {
        padding: 12px 0 12.5px;
        text-align: center;
        color: #555555;
        background-color: @backgroundColor;
        @media screen and (max-width: 1000px) {
          padding: 8px 0;
          font-size: 12px;
        }
      }
      .el-collapse {
        border: none;
        --el-collapse-header-height: 96px;
        .collapse-box:last-child {
          .el-collapse-item {
            margin-bottom: 0;
          }
        }
        .el-collapse-item {
          margin-bottom: 8px;
          .el-collapse-item__header {
            display: block;
            border: none;
            height: 100%;
          }
        }
        .el-collapse-item__wrap {
          border: none;
          padding: 0 24px;
          background-color: #eef0f4;
          @media screen and (max-width: 1000px) {
            background-color: #f5f6f8;
          }
        }
      }
      .meetList {
        padding: 8px 0 0 8px;
        height: 402px;
        background-color: #fff;
        border-right: 1px solid #e5e8f0;
        border-bottom: 1px solid #e5e8f0;
        overflow-y: scroll;
        @media screen and (max-width: 1000px) {
          padding: 8px;
          height: fit-content;
          overflow: auto;
          // max-height: 250px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background-color: #fff;
        }

        &::-webkit-scrollbar {
          width: 6px;
          background-color: #fff;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #ccc;
        }
        .el-collapse-item__arrow {
          display: none;
        }
        .el-collapse-item__content {
          padding-bottom: 0;
          @media screen and (max-width: 1000px) {
            font-size: 12px;
          }
        }
        .meet-item {
          display: flex;
          justify-content: space-between;
          padding: 16px 24px;
          width: 100%;
          height: 100%;
          background-color: #f5f6f8ff;
          border: 1px solid #e5e8f0;
          border-left: 2px solid #406fe7ff;
          .meet-left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            .left-top {
              display: flex;
              align-items: center;
              .meet-name {
                margin-right: 16px;
                max-width: 400px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 18px;
                color: #000;
                line-height: 24px;
              }
              .el-collapse-item__content {
                padding: 0 20px;
              }
              p {
                margin: 0;
                height: fit-content;
                justify-content: center;
                align-items: center;
                line-height: normal;
              }
              // .introduce {
              //   padding: 1px 7px;
              //   display: -webkit-box;
              //   -webkit-box-orient: vertical;
              //   -webkit-line-clamp: 1;
              //   overflow: hidden;
              //   color: #fff;
              //   background: linear-gradient(225deg, #feb32a 0%, #f6d365 100%);
              // }
            }
            .more-detail {
              display: flex;
              flex-shrink: 0;
              align-items: center;
              width: fit-content;
              height: 24px;
              font-size: 16px;
              line-height: 24px;
              .o-icon {
                margin: 0 5px;
                color: @themeColor;
                font-size: 24px;
                transition: all 0.3s;
                svg {
                  color: #0d8dff;
                }
              }
              &:hover {
                .o-icon {
                  transform: translateX(5px);
                }
              }
            }
          }
          .item-right {
            display: flex;
            font-size: 14px;

            .detail-time {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding: 0 24px;
              font-weight: normal;
              text-align: center;
              font-size: 16px;
              span {
                line-height: 15px;
              }
              // .start-time {
              //   color: #6189ff;
              // }
            }
            .extend {
              display: flex;
              align-items: center;
              width: 24px;
              .o-icon {
                color: #000;
                transition: all 0.3s;
              }
              .reversal {
                transform: rotate(180deg);
              }
            }
          }
          @media screen and (max-width: 1000px) {
            background-color: #fff;
            padding: 12px;
            border-left-width: 2px;
            .meet-left {
              max-width: 190px;
              .left-top {
                .meet-name {
                  font-size: 14px;
                  font-weight: 700;
                }
              }
              .group-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #555;
              }
            }
            .item-right {
              .detail-time {
                flex-direction: row;
                align-items: flex-end;
                padding: 0 7px;
                font-size: 12px;
              }
              .extend {
                align-items: flex-end;
              }
              .o-icon {
                width: 16px;
              }
            }
          }
        }
        .meet-detail {
          color: #555555;
          padding-top: 10px;
          .meeting-item {
            display: flex;
            padding-bottom: 8px;
            line-height: 18px;
            word-break: break-all;
            .item-title {
              flex-shrink: 0;
              width: 90px;
            }
            // .meet-title {
            //   width: 90px;
            // }
            .creator {
              display: flex;
              align-items: center;
              .head-logo {
                width: 60px;
                border-radius: 50%;
                overflow: hidden;
              }
              .creator-name {
                padding-left: 15px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 16px;
        img {
          width: 346px;
          // min-height: 300px;
        }
        p {
          margin-top: 16px;
        }
        @media screen and (max-width: 1000px) {
          img {
            width: 100%;
          }
          p {
            padding-bottom: 16px;
            font-size: 12px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .head-title {
      flex-direction: column;
      padding-bottom: 16px;
    }
    .main-body {
      margin: 0 auto;
      width: 345px;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
    }
  }
}
</style>
