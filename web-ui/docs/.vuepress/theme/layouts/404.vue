<template>
    <div class="theme-container">
        <CustomHeader></CustomHeader>
            <div class="common-banner">
                <div class="banner">
                    <img src="/img/404/404-banner.png" />
                    <span :class="['outside', $isCn ? 'font-xihjw' : 'font-hwmedium']">{{i18n.common.NOTFOUND.NOTFOUND}}</span>
                    <p class="pc-message">{{i18n.common.NOTFOUND.MESSAGE}}</p>
                </div>
                <div class="banner-mobile">
                    <h3>{{i18n.common.NOTFOUND.NOTFOUND}}</h3>
                    <p class="mobile-message">{{i18n.common.NOTFOUND.MESSAGE}}</p>
                    <img src="/img/404/404-banner.png" />
                </div>
            </div>
        <CustomFooter></CustomFooter>
    </div>
</template>

<script>
import CustomHeader from "./../components/CustomHeader";
import CustomFooter from "./../components/CustomFooter";

export default {
    components: {
        CustomHeader,
        CustomFooter
    },
  methods: {
  },
  watch: {
      '$route.path': {
          immediate: true,
          handler (val) {
              if(val === '/') {
                  window.location.href = '/zh/';
              }
          }
      }
  }
}
</script>

<style lang="less" scoped>
.common-banner {
    width: 1120px;
    margin: 0 auto;
    height: 840px;
    padding-bottom: 200px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 55px;
        height: unset;
        margin: 0 auto 80px auto;
    }
    .banner {
        height: 100%;
        width: 100%;
        position: relative;
        @media (max-width: 1000px) {
            display: none;
        }
        .pc-message{
            width: 130px;
            height: 30px;
            font-size: 24px;
            font-family: FZLTHJW, FZLTHJW;
            font-weight: normal;
            color: #000000;
            line-height: 30px;
            position: absolute;
            top: 260px;
        }
        img {
            height: 400px;
            width: 400px;
            position: absolute;
            right: 0;
            top: 240px;
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
