<template>
  <div>
    <div class="banner">
      <a href="https://e-campaign.huawei.com/m/FjEF3q" target="_blank">
      <img class="extend" src="/img/summit/summit2021/left-longer.png" alt="">
      <img class="main" :src="i18n.summit.SUMMIT_BANNER.PC_IMG">
      <img class="extend" src="/img/summit/summit2021/right-longer.png" alt="">
      </a>
    </div>
    <div class="h5-banner">
      <a href="https://e-campaign.huawei.com/m/FjEF3q" target="_blank"><img :src="i18n.summit.SUMMIT_BANNER.MOBILE_IMG"></a>
    </div>
    <div class="container">
      <div class="text-wrapper">
        <p class="text">{{i18n.summit.SUMMIT_INTRODUCE}}</p>
        <div class="link-wrapper">
          <a href="https://shimowendang.com/forms/X6X9jj9KPcdQwVr8/fill" target="_blank"><img src="/img/summit/summit2021/call-speaker.png"></a>
          <a href="https://shimowendang.com/forms/k76zTLKvumYwRdsP/fill" target="_blank"><img src="/img/summit/summit2021/call-sponsor.png"></a>
          <a href="https://shimowendang.com/forms/LjHs8JlsLSsW92kl/fill" target="_blank"><img src="/img/summit/summit2021/call-demo.png"></a>
        </div>
      </div>
      <div class="review-wrapper">
        <div class="title">
          <span>{{i18n.summit.HIGHLIGHTS}}</span>
          <img src="/img/summit/devday-2021/review.png">
        </div>
        <div @click="go('/interaction/summit-list/devday2021/')" class="link">openEuler Developer Day 2021</div>
        <div @click="go('/interaction/summit-list/')" class="link">openEuler Summit 2020</div>
        <div @click="go('/interaction/summit-list/list/')" class="link">openEuler Virtual Summit 2020</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    go(url) {
      const routeUrl = this.$router.resolve(this.resolvePath(url));
      window.open(routeUrl.href);
    }
  }
}
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
    @media screen and (min-width:2500px) {
        display: flex;
        justify-content: space-around;
      }
    .extend {
      display: none;
      @media screen and (min-width:2500px) {
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

</style>