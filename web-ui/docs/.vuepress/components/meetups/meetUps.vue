<!-- 沙龙 -->
<template>
  <div class="meetups">
    <common-banner
      :pc-src="'/img/meetups/meetups-banner.png'"
      :mobile-src="'/img/meetups/meetups-banner.png'"
      :inside-name="'CONNECT'"
      :outside-name="i18n.interaction.MEETUPS.MEETUPS"
    >
      <p class="pc-message" slot="pc-slot">{{i18n.interaction.MEETUPS.MESSAGE}}</p>
      <p class="mobile-message" slot="mobile-slot">{{i18n.interaction.MEETUPS.MESSAGE}}</p>
    </common-banner>
  </div>
</template>

<script>
import commonBanner from './../common/banner.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    commonBanner
  }
}

</script>

<style lang='less'>
@mr-left: left;
@mr-right: right;
@mr-bottom: bottom;
@mr-top: top;

.mr(@position,@px) when (@position = @mr-top) {
  margin-top: @px;
}
.mr(@position,@px) when (@position = @mr-right) {
  margin-right: @px;
}
.mr(@position,@px) when (@position = @mr-bottom) {
  margin-bottom: @px;
}
.mr(@position,@px) when (@position = @mr-left) {
  margin-left: @px;
}
.mr-All(@mr) {
  margin: @mr;
}
.word-common-css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
  font-size: @fontSize;
  font-family: @fontFamily1, @fontFamily2;
  font-weight: @fontWeight;
  color: @color;
  line-height: @lineHeight;
}
.meetups {
  padding-bottom: 200px;
  @media (max-width: 1000px) {
    padding-bottom: 76px;
  }
  .pc-message {
    .word-common-css(30px,PingFangSC-Regular,PingFang SC,400,rgba(0,0,0,1),30px);
    position: absolute;
    top: 260px;
  }
  .mobile-message {
    .word-common-css(16px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),26px);
    .mr(left,112px);
  }
}
</style>
