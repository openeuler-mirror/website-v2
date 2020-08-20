<!-- 直播 -->
<template>
  <div class="moblie-content">
    <common-banner
      :pc-src="'/img/live/live-banner.png'"
      :mobile-src="'/img/live/live-banner.png'"
      :inside-name="'CONNECT'"
      :outside-name="i18n.interaction.LIVE.LIVE"
    ></common-banner>
    <div class="live_ist">
      <div class="now_start">
        <div class="now_start_title">{{i18n.interaction.LIVE.WILLPLAYER}}</div>
        <div class="now_start_content">
          <div class="content_box" v-for="(item,key) in nowArr" :key="key">
            <div class="left_content">
              <p class="live_title">{{item.LIVETITLE}}</p>
              <p class="live_teacher">{{item.LIVETEACHER}}</p>
              <p class="live_time">{{item.LIVETIME}}</p>
            </div>
            <div class="right_content">
              <img :src="item.PHOTOPATH" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="replayer">
        <div class="replayer_tile">{{i18n.interaction.LIVE.REPLAYER}}</div>
        <div class="replayer_content">
          <div class="content_box" v-for="(item,key) in formerlyArr" :key="key">
            <div class="left_content">
              <p class="live_title">{{item.LIVETITLE}}</p>
              <p class="live_teacher">{{item.LIVETEACHER}}</p>
              <p class="live_time">{{item.LIVETIME}}</p>
            </div>
            <div class="right_content">
              <img :src="item.PHOTOPATH" alt />
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
      nowArr: [],
      formerlyArr: []
    }
  },
  mounted () {
    this.nowArr = this.i18n.interaction.LIVE.LIVENOW;
    this.formerlyArr = this.i18n.interaction.LIVE.LIVEFORMERLY;
  },
  components: {
    commonBanner
  },
}

</script>

<style lang='less'>
@urlhead: "/img/live/";
.background_css(@url,@repeat,@position,@size) {
  background-image: url(@url);
  background-repeat: @repeat;
  background-position: @position;
  background-size: @size;
}
@mr_left: left;
@mr_right: right;
@mr_bottom: bottom;
@mr_top: top;
.mr(@position,@px) when (@position = @mr_top) {
  margin-top: @px;
}
.mr(@position,@px) when (@position = @mr_right) {
  margin-right: @px;
}
.mr(@position,@px) when (@position = @mr_bottom) {
  margin-bottom: @px;
}
.mr(@position,@px) when (@position = @mr_left) {
  margin-left: @px;
}
.mr_All(@mr) {
  margin: @mr;
}
.word_common_css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
  font-size: @fontSize;
  font-family: @fontFamily1, @fontFamily2;
  font-weight: @fontWeight;
  color: @color;
  line-height: @lineHeight;
}
.title_css {
  .word_common_css(24px,FZLTHJW--GB1-0, FZLTHJW--GB1,normal,rgba(0, 0, 0, 1),34px);
  @media (max-width: 1000px) {
    .word_common_css(16px,FZLTHJW--GB1-0, FZLTHJW--GB1,550,rgba(11, 22, 43, 1),26px);
    margin-bottom: 10px;
  }
}
.the_content_css {
  display: flex;
  .mr(left,5px);
  @media (max-width: 1000px) {
    .mr(left,0);
  }
}
.content_box_css {
  cursor: pointer;
  .wid_and_hei(350px,200px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .mr_All(30px 0 0 25px);
  &:first-of-type {
    .mr(left,0);
  }
  @media (min-width: 1000px) and (max-width: 1680px) {
    &:nth-of-type(4n + 0) {
      .mr(left,0);
    }
  }
  @media (min-width: 1680px) {
    &:nth-of-type(5n + 0) {
      .mr(left,0);
    }
  }
  @media (max-width: 1000px) {
    .wid_and_hei(315px,166px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
    margin: 30px 0 0 0;
  }
}
.wid_and_hei(@width,@height) {
  width: @width;
  height: @height;
}
.right_content_css {
  float: left;
  .wid_and_hei(145px,200px);
  .background_css("@{urlhead}Fill.svg",no-repeat,0 0,contain);
  img {
    .wid_and_hei(109px,109px);
    .mr_All(62px 12px 29px 24px);
  }
  @media (max-width: 1000px) {
    float: left;
    .wid_and_hei(130px,166px);
    .background_css("@{urlhead}Fill.svg",no-repeat,3px -8px,contain);
    img {
      .wid_and_hei(90px,90px);
      .mr_All(50px 18px 39px 22px);
    }
  }
}
.left_content_css {
  float: left;
  width: 205px;
  @media (max-width: 1000px) {
    float: left;
    width: 185px;
  }
}
.mobile_word_css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
  @media (max-width: 1000px) {
    max-width: 129px;
    max-height: 52px;
    font-size: @fontSize;
    font-family: @fontFamily1, @fontFamily2;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
  }
}
// 具体样式从这里开始
.live_ist {
  .background_css("@{urlhead}ball-background.png",no-repeat,center center,contain);
  margin-top: 68px;
  @media (max-width: 1000px) {
    background: none;
    .mr_All(40px 0 80px 0);
  }
  .block {
    height: 200px;
    @media (max-width: 1000px) {
      height: 0;
    }
  }
}
.live_ist .now_start {
  .mr(left,200px);
  @media (max-width: 1000px) {
    .mr(left,30px);
  }
  .now_start_title {
    .title_css;
  }
  .now_start_content {
    .the_content_css;
    flex-direction: row;
    @media (max-width: 1000px) {
      flex-direction: column;
    }
    .content_box {
      .content_box_css;
      .left_content {
        .left_content_css;
        p {
          .mr_All(24px 0 0 20px);
          &:last-of-type {
            .mr(top,12px);
          }
        }
        .live_title {
          max-width: 180px;
          max-height: 60px;
          .word_common_css(20px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0, 0, 0, 1),30px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),26px);
            max-width: 129px;
            max-height: 52px;
          }
        }
        .live_teacher {
          .word_common_css(14px,PingFangSC-Regular,PingFang SC,400,rgba(0, 0, 0, 1),14px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,0.5),24px);
          }
        }
        .live_time {
          .word_common_css(14px,PingFangSC-Regular,PingFang SC,400,rgba(0, 0, 0, 1),14px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,0.5),24px);
          }
        }
      }
      .right_content {
        .right_content_css;
      }
    }
  }
}

.live_ist .replayer {
  .mr_All(50px 0 0 200px);
  @media (max-width: 1000px) {
    .mr_All(40px 0 0 30px);
  }
  .replayer_tile {
    .title_css;
  }
  .replayer_content {
    .the_content_css;
    flex-wrap: wrap;
    .content_box {
      .content_box_css;
      .left_content {
        .left_content_css;
        p {
          .mr_All(24px 0 0 20px);
          &:last-of-type {
            .mr(top,12px);
          }
        }
        .live_title {
          max-width: 180px;
          max-height: 60px;
          .word_common_css(20px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0, 0, 0, 1),30px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),26px);
            max-width: 129px;
            max-height: 52px;
          }
        }
        .live_teacher {
          .word_common_css(14px,PingFangSC-Regular,PingFang SC,400,rgba(0, 0, 0, 1),14px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,0.5),24px);
          }
        }
        .live_time {
          .word_common_css(14px,PingFangSC-Regular,PingFang SC,400,rgba(0, 0, 0, 1),14px);
          @media (max-width: 1000px) {
            .word_common_css(14px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,0.5),24px);
          }
        }
      }
      .right_content {
        .right_content_css;
      }
    }
  }
}
</style>
