<!-- 建设中页面 -->
<template>
  <div class="building">
      <div class="banner">
            <img src="/img/building/building-banner.png" />
            <span :class="['outside', $isCn ? 'font-xihjw' : 'font-hwmedium']">{{i18n.common.BUILDING.BUILDING}}</span>
            <p class="pc-message">{{i18n.common.BUILDING.BUILDINGMES}}</p>
        </div>

        <div class="banner-mobile">
            <h3>{{i18n.common.BUILDING.BUILDING}}</h3>
            <p class="mobile-message">{{i18n.common.BUILDING.BUILDINGMES}}</p>
            <img src="/img/building/building-banner.png" />
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>

<style lang='less'>
.building {
  width: 1120px;
  margin: 0 auto;
  height: 840px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 55px;
    height: unset;
  }
  .banner {
    height: 100%;
    width: 100%;
    position: relative;
    @media (max-width: 1000px) {
      display: none;
    }
    img {
      height: 400px;
      width: 400px;
      position: absolute;
      right: 0;
      top: 240px;
    }
    .pc-message{
        width: 130px;
        height: 30px;
        font-size: 24px;
        font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
        font-weight: normal;
        color: #000000;
        line-height: 30px;
        position: absolute;
        top: 260px;
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
  }
  .banner-mobile {
    display: none;
    @media (max-width: 1000px) {
      display: block;
    }
    width: 100%;
    h3 {
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      font-family: FZLTHJW;
      margin-top: 40px;
    }
    img {
      margin-top: 10px;
      width: 100%;
    }
    .mobile-message{
        margin-left:120px;
    }
  }
}
</style>
