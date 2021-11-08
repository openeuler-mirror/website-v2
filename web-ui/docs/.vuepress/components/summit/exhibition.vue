<template>
  <div class="exhibition">
    <div class="title">
      <img src="/img/summit/summit2021/exhirition-title.png" alt="" />
    </div>
    <div class="container">
      <a @click="mapClick(item)" v-for="(item) in link" :key="item"></a>
      <img src="/img/summit/summit2021/exhibition-map.png" />
      <div class="banner-video" v-if="isMasked">
        <div class="video-mask" @click="maskClicked"></div>
        <div class="video-box">
          <video width="100%" controls autoplay>
            <source
              :src="videoLink"
            />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLink:'',
      isMasked: false,
      link: [
        "https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler-summit-2021/booth-videos/os-industry-overview/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E4%BA%A7%E4%B8%9A%E6%80%BB%E8%A7%88.mp4",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    videoClicked() {
      this.isMasked = true;
      console.log("clicked");
    },
    maskClicked() {
      this.isMasked = false;
    },
    mapClick(link) {
        this.videoLink=link;
        this.isMasked=true;
    }
  },
};
</script>
<style lang="less" scpoed>
.exhibition {
  width: 1120px;
  margin: 70px auto 0;
  .banner-video {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 11;
    @media screen and (max-width: 1000px) {
      z-index: 100;
    }
    .video-mask {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
    }
    .video-box {
      width: 900px;
      top: 50%;
      left: 50%;
      position: relative;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    line-height: 34px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .container {
      position: relative;
    img {
      width: 100%;
    }
    a {
        position: absolute;
    }
    a:nth-of-type(1) {
        width: 40px;
        height: 60px;
        top: 261px;
        left: 179px;
    }
  }
}
</style>