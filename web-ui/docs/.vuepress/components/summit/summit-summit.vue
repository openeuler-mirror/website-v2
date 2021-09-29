<template>
  <div>
    <div class="banner">
      <a href="https://e-campaign.huawei.com/m/mIzQFr" target="_blank"><img src="/img/summit/summit2021/summit2021-pc.png"></a>
    </div>
    <div class="h5-banner">
      <a href="https://e-campaign.huawei.com/m/mIzQFr" target="_blank"><img src="/img/summit/summit2021/summit2021-mo.png"></a>
    </div>
    <div class="container">
      <div class="text-wrapper">
        <p class="text">openEuler Summit 是由欧拉开源社区举办的开发者峰会。openEuler从服务器操作系统，升级为数字基础设施的操作系统，支持IT、CT、OT等数字基础设施全场景，覆盖服务器、云、边、嵌入式等各种形态的需求。伴随21.09版本的发布 openEuler 已经包含了服务器、云原生、边缘计算和嵌入式的四大应用场景。openEuler 通过开源开放，不断探索科技创新的边界，驱动物理世界与数字世界的深度融合。开发者、用户、社区贡献者、软件爱好者在 openEuler Summit 汇聚，驱动无止境的创新与拓展，闪耀数字时代星辰大海。</p>
        <div class="link-wrapper">
          <a href="https://shimowendang.com/forms/X6X9jj9KPcdQwVr8/fill" target="_blank"><img src="/img/summit/summit2021/call-speaker.png"></a>
          <a href="https://shimowendang.com/forms/X6X9jj9KPcdQwVr8/fill" target="_blank"><img src="/img/summit/summit2021/call-sponsor.png"></a>
          <a href="https://shimowendang.com/forms/LjHs8JlsLSsW92kl/fill" target="_blank"><img src="/img/summit/summit2021/call-demo.png"></a>
        </div>
      </div>
      <div class="review-wrapper">
        <div class="title">
          <span>精彩回顾</span>
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
  img {
    width: 100%;
    height: 100%;
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