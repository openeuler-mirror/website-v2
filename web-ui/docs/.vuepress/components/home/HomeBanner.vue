<template>
  <swiper ref="mySwiper" :options="swiperOption" class="home-banner">
    <swiper-slide v-for="item in homeBanner" :key="item.link">
      <a class="banner-panel" :href="item.link" target="_blank">
        <div
          class="banner-panel-cover isPCshow"
          :style="{ backgroundImage: 'url(' + item.pcBanner + ')' }"
        >
          <div
            class="banner-panel-content flex-column"
            v-if="item.title !== ''"
          >
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
            <div class="action">
              <OButton class="home-banner-btn" placement="right" ghost>
                {{ item.btn }}
                <template #suffix>
                  <svg class="o-icon" id="icon-right-arrow" viewBox="0 0 32 32">
                    <path
                      fill="currentColor"
                      d="M2.667 16.667v-1.333c0-0.368 0.298-0.667 0.667-0.667h21.56l-5.933-5.92c-0.126-0.125-0.197-0.296-0.197-0.473s0.071-0.348 0.197-0.473l0.947-0.933c0.125-0.126 0.296-0.197 0.473-0.197s0.348 0.071 0.473 0.197l8.187 8.173c0.188 0.187 0.293 0.442 0.293 0.707v0.507c-0.003 0.265-0.108 0.518-0.293 0.707l-8.187 8.173c-0.125 0.126-0.296 0.197-0.473 0.197s-0.348-0.071-0.473-0.197l-0.947-0.947c-0.125-0.123-0.196-0.291-0.196-0.467s0.071-0.344 0.196-0.467l5.933-5.92h-21.56c-0.368 0-0.667-0.298-0.667-0.667z"
                    ></path>
                  </svg>
                </template>
              </OButton>
            </div>
          </div>
        </div>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import OButton from './OButton.vue';
import 'swiper/css/swiper.css';
export default {
  name: 'HomeBanner',
  components: {
    Swiper,
    SwiperSlide,
    OButton,
  },
  data() {
    return {
      homeBanner: [
        {
          pcBanner: '/img/home/banner/atom-pc.png',
          moBanner: '/img/home/banner/atom-mo.png',
          link: `https://openatom.cn/summit`,
          targetTap: 0,
          title: '',
          desc: '',
          btn: '',
        },
        {
          pcBanner: '/img/home/banner/migration-pc.png',
          moBanner: '/img/home/banner/migration-mo.png',
          link: `other/migration/`,
          targetTap: 0,
          title: '一起迁移吧',
          desc: '手把手教你把操作系统替换成openEuler',
          btn: '了解更多',
        },
      ],
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    handleClose() {
      this.$emit('close-detail');
    },
    open(url) {
      if (url) {
        window.open(url);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home-banner-btn {
  border-color: #fff;
  color: #fff;
  .o-icon {
    width: 24px;
    color: #fff;
  }
  @media screen and (max-width: 824px) {
    padding: 5px 12px 5px 16px !important;
    line-height: 22px;
    font-size: 14px;
    .o-icon {
      color: var(--o-color-auxiliary);
      width: 16px;
    }
  }
}
a {
  text-decoration: none;
}
.home-banner {
  height: 480px;
  position: relative;

  .banner-panel {
    position: absolute;
    background-color: var(--o-color-bg);
    display: flex;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.33s;

    &-content {
      max-width: 1416px;
      color: #fff;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      .title {
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        color: #fff;
        font-weight: 600;
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
        }
        @media screen and (max-width: 824px) {
          font-size: var(--o-font-size-h4);
          line-height: var(--o-line-height-h4);
        }
      }
      .desc {
        font-size: var(--o-font-size-h5);
        font-weight: normal;
        // color: var(--o-color-text);
        line-height: var(--o-line-height-h5);
        margin-top: var(--o-spacing-h6);
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
        @media screen and (max-width: 824px) {
          margin-top: var(--o-spacing-h9);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .action {
        margin-top: var(--o-spacing-h3);
        .o-icon {
          color: var(--o-color-text);
        }
        @media screen and (max-width: 824px) {
          margin-top: 0;
        }
      }
      @media screen and (max-width: 1439px) {
        padding: 0 16px;
      }
      @media screen and (max-width: 824px) {
        padding: 72px 16px 50px;
        justify-content: space-between;
        box-sizing: border-box;
        text-align: center;
      }
    }
    &-cover {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
    .isH5show {
      display: none;
      object-fit: cover;
      width: 100%;
      @media screen and (max-width: 824px) {
        display: block;
        height: 300px;
      }
    }

    @media screen and (max-width: 767px) {
      position: static !important;
    }
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 824px) {
    height: 300px;
  }
}

:deep(.swiper-pagination) {
  width: 1416px !important;
  bottom: 84px;
  left: 50% !important;
  transform: translateX(-50%);
  text-align: left;
  .swiper-pagination-bullet {
    width: 40px;
    height: 2px;
    opacity: 1;
    background: rgba(207, 211, 215, 0.6);
    border-radius: 0;
    margin: 0 4px;
  }
  .swiper-pagination-bullet-active {
    background: var(--o-color-auxiliary);
    opacity: 1;
  }
  @media screen and (max-width: 1439px) {
    width: 1080px !important;
    padding: 0 16px;
    left: 0 !important;
    transform: translateX(0);
  }
  @media screen and (max-width: 1100px) {
    width: 100% !important;
    bottom: 72px;
    .swiper-pagination-bullet {
      width: 20px !important;
      margin: 0 4px 0 0;
    }
  }
  @media screen and (max-width: 824px) {
    left: 50% !important;
    transform: translateX(-50%);
    text-align: center;
    bottom: 24px;
  }
}
.swiper-container {
  :deep(.swiper-button-prev) {
    width: 32px;
    height: 32px;
    background: rgba(56, 56, 56, 0.5);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s;
    &:after {
      font-size: 20px;
      color: #fff;
    }
    &.show {
      opacity: 1;
    }
  }
  :deep(.swiper-button-next) {
    width: 32px;
    height: 32px;
    background: rgba(56, 56, 56, 0.5);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s;
    &:after {
      font-size: 20px;
      color: #fff;
    }
    &.show {
      opacity: 1;
    }
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
    }
    @media screen and (max-width: 1416px) {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 0;
      }
    }
  }
}
</style>
