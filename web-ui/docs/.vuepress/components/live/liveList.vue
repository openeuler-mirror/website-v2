<!-- 直播 -->
<template>
  <div class="moblie-content">
    <common-banner
      :pc-src="'/img/live/live-banner.png'"
      :mobile-src="'/img/live/live-banner.png'"
      :inside-name="'CONNECT'"
      :outside-name="i18n.interaction.LIVE.LIVE"
    ></common-banner>
    <div class="liveList">
      <div class="now-start">
        <div class="now-start-tile">{{i18n.interaction.LIVE.WILLPLAYER}}</div>
        <div class="now-start-content">
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/zhllesson.png" alt />
              <img src="/img/live/teacher-zhl.png" alt />
              <img src="/img/live/player730.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/zhl.png" alt />
            </div>
          </div>
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/czdlesson.png" alt />
              <img src="/img/live/teacher-czd.png" alt />
              <img src="/img/live/player730.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/czd.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="replayer">
        <div class="replayer-tile">{{i18n.interaction.LIVE.REPLAYER}}</div>
        <div class="replayer-content">
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/zyplesson.png" alt />
              <img src="/img/live/teacher-zyp.png" alt />
              <img src="/img/live/replayer728.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/zyp.png" alt />
            </div>
          </div>
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/ftlesson.png" alt />
              <img src="/img/live/teacher-ft.png" alt />
              <img src="/img/live/replayer728.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/ft.png" alt />
            </div>
          </div>
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/syylesson.png" alt />
              <img src="/img/live/teacher-syy.png" alt />
              <img src="/img/live/replayer728.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/syy.png" alt />
            </div>
          </div>
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/zjwlesson.png" alt />
              <img src="/img/live/teacher-zjw.png" alt />
              <img src="/img/live/replayer728.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/zjw.png" alt />
            </div>
          </div>
          <div class="content-box">
            <div class="left-content">
              <img src="/img/live/hxwlesson.png" alt />
              <img src="/img/live/teacher-hxw.png" alt />
              <img src="/img/live/replayer728.png" alt />
            </div>
            <div class="right-content">
              <img src="/img/live/hxw.png" alt />
            </div>
          </div>
        </div>
      </div>
      <!-- 此div用于增加高度来到达背景图能够完全显示的效果 -->
      <div class="block"></div>
    </div>
  </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
export default {
  data () {
    return {

    }
  },
  components: {
    commonBanner
  },
}

</script>

<style lang='less'>
.liveList {
  background: url("/img/live/ball-background.png") no-repeat;
  background-size: contain;
  background-position: center center;
  margin-top: 68px;
  @media (max-width: 1000px) {
    background: none;
    margin: 40px 0 80px 0;
  }
  .block {
    height: 200px;
    @media (max-width: 1000px) {
      height: 0;
    }
  }
}
.liveList .now-start {
  margin-left: 200px;
  @media (max-width: 1000px) {
    margin-left: 30px;
  }
  .now-start-tile {
    font-size: 24px;
    font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 1);
    line-height: 34px;
    margin-bottom: 30px;
    @media (max-width: 1000px) {
      font-size: 16px;
      font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
      font-weight: normal;
      color: rgba(11, 22, 43, 1);
      line-height: 26px;
      font-weight: 550;
      margin-bottom: 10px;
    }
  }
  .now-start-content {
    display: flex;
    flex-direction: row;
    margin-left: 5px;
    @media (max-width: 1000px) {
      flex-direction: column;
      margin-left: 0;
    }
    .content-box {
      cursor: pointer;
      width: 350px;
      height: 200px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-left: 25px;
      &:first-of-type {
        margin-left: 0;
      }
      @media (max-width: 1000px) {
        width: 315px;
        height: 166px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        margin: 30px 0 0 0;
      }
      .left-content {
        float: left;
        width: 205px;
        img {
          margin: 24px 0 0 20px;
          &:first-of-type {
            width: 140px;
            height: 30px;
          }
          &:nth-of-type(2) {
            width: 84px;
            height: 14px;
          }
          &:last-of-type {
            width: 142px;
            height: 14px;
            margin-top: 12px;
          }
        }
        @media (max-width: 1000px) {
          float: left;
          width: 185px;
          img {
            margin: 24px 0 0 20px;
            &:first-of-type {
              width: 101px;
              height: 26px;
            }
            &:nth-of-type(2) {
              width: 84px;
              height: 24px;
            }
            &:last-of-type {
              width: 142px;
              height: 24px;
              margin-top: 10px;
            }
          }
        }
      }
      .right-content {
        float: left;
        width: 145px;
        height: 200px;
        background: url("/img/live/Fill2.svg") no-repeat;
        background-size: contain;
        img {
          width: 109px;
          height: 109px;
          margin: 62px 12px 29px 24px;
        }
        @media (max-width: 1000px) {
          float: left;
          width: 130px;
          height: 166px;
          background: url("/img/live/Fill2.svg") no-repeat;
          background-size: contain;
          background-position: 3px -8px;
          img {
            width: 90px;
            height: 90px;
            margin: 50px 18px 39px 22px;
          }
        }
      }
    }
  }
}

.liveList .replayer {
  margin: 50px 0 0 200px;
  @media (max-width: 1000px) {
    margin: 40px 0 0 30px;
  }
  .replayer-tile {
    font-size: 24px;
    font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 1);
    line-height: 34px;
    margin-bottom: 30px;
    @media (max-width: 1000px) {
      font-size: 16px;
      font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
      font-weight: normal;
      color: rgba(11, 22, 43, 1);
      line-height: 26px;
      font-weight: 550;
      margin-bottom: 10px;
    }
  }
  .replayer-content {
    display: flex;
    margin-left: 5px;
    flex-wrap: wrap;
    @media (max-width: 1000px) {
      margin-left: 0;
    }
    .content-box {
      cursor: pointer;
      width: 350px;
      height: 200px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-left: 25px;
      &:first-of-type {
        margin-left: 0;
      }
      &:nth-of-type(4) {
        margin: 30px 0 0 0;
      }
      &:last-of-type {
        margin-top: 30px;
      }
      @media (max-width: 1000px) {
        width: 315px;
        height: 166px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        margin: 30px 0 0 0;
        content: "";
        clear: both;
        display: block;
      }
      .left-content {
        float: left;
        width: 205px;
        img {
          margin: 24px 0 0 20px;
          &:first-of-type {
            width: 140px;
            height: 30px;
          }
          &:nth-of-type(2) {
            width: 84px;
            height: 14px;
          }
          &:last-of-type {
            width: 142px;
            height: 14px;
            margin-top: 12px;
          }
        }
        @media (max-width: 1000px) {
          float: left;
          width: 185px;
          img {
            margin: 24px 0 0 20px;
            &:first-of-type {
              width: 101px;
              height: 26px;
            }
            &:nth-of-type(2) {
              width: 84px;
              height: 24px;
            }
            &:last-of-type {
              width: 142px;
              height: 24px;
              margin-top: 10px;
            }
          }
        }
      }
      .right-content {
        float: left;
        width: 145px;
        height: 200px;
        background: url("/img/live/Fill.svg") no-repeat;
        background-size: contain;
        img {
          width: 109px;
          height: 109px;
          margin: 62px 12px 29px 24px;
        }
        @media (max-width: 1000px) {
          float: left;
          width: 130px;
          height: 166px;
          background: url("/img/live/Fill.svg") no-repeat;
          background-size: contain;
          background-position: 3px -8px;
          img {
            width: 90px;
            height: 90px;
            margin: 50px 18px 39px 22px;
          }
        }
      }
    }
  }
}
</style>
