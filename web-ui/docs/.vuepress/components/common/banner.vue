<template>
  <div class="common-banner">
    <div class="banner">
      <img :src="pcSrc" />
      <span class="inside">{{insideName}}</span>
      <span :class="['outside', $isCn ? 'font-xihjw' : 'font-hwmedium']">{{outsideName}}</span>
      <div class="paragraph">
        <div>{{p1}}</div>
        <div>{{p2}}</div>
      </div>
      <slot name="pc-slot"></slot>
    </div>

    <div class="banner-mobile">
      <h3>{{ outsideName }}</h3>
      <slot name="mobile-slot"></slot>
      <img :src="mobileSrc" />
      <div class="mobile-paragraph">
        <div>{{p1}}</div>
        <div>{{p2}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  props: ['insideName', 'outsideName', 'pcSrc', 'mobileSrc','p1','p2']
};
</script>

<style lang="less" scoped>
.common-banner {
  width: 1120px;
  margin: 0 auto;
  height: 380px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0 30px;
    height: unset;
  }
  .banner {
    height: 100%;
    width: 100%;
    position: relative;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    img {
      height: 360px;
      width: 500px;
      position: absolute;
      right: 0;
      top: 10px;
    }
    .inside {
      position: absolute;
      left: 0;
      top: 120px;
      font-size: 60px;
      line-height: 60px;
      color: rgba(0, 0, 0, 0.05);
    }
    .outside {
      position: absolute;
      left: 0;
      top: 156px;
      font-size: 48px;
      line-height: 48px;
      color: #000;
      font-weight: normal;
    }
    .paragraph{
      position: absolute;
      left: 0;
      top: 228px;
      width: calc(100% - 500px);
      font-size: 16px;
      line-height: 32px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .banner-mobile {
    display: none;
    @media screen and (max-width: 1000px) {
      display: block;
    }
    width: 100%;
    h3 {
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      margin-top: 40px;
    }
    img {
      margin: 10px auto 0 auto;
      width: 260px;
      height: 200px;
      display: block;
    }
    .mobile-paragraph{
      margin: 0 -30px  !important;
      line-height: 24px;
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 1000px) and (max-width: 1120px){
    .common-banner {
        width: 100% !important;
    }
}
</style>
