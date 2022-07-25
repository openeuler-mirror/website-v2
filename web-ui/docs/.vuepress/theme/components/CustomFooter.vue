<script setup>
import { ref, computed, onMounted, watch } from 'vue';

import LogoFooter from '../../public/img/footer/footer-logo2.png';
import LogoAtom from '../../public/img/footer/atom-logo.svg';
// 中文友情链接
import LogoBilibili from '../../public/img/footer/bilibili.png';
import LogoInfoq from '../../public/img/footer/infoq.png';
import LogoJuejin from '../../public/img/footer/juejin.png';
import LogoOschina from '../../public/img/footer/oschina.png';
import LogoCsdn from '../../public/img/footer/csdn.png';
import Logo51cto from '../../public/img/footer/51cto.png';

// 英文、俄文友情链接
import LogoRedditSquare from '../../public/img/footer/reddit-square@2x.png';
import LogoBilibili2 from '../../public/img/footer/bilibili@2x.png';
import LogoLinkedin from '../../public/img/footer/linkedin@2x.png';
import LogoYoutube from '../../public/img/footer/youtube@2x.png';
import LogoTwitter from '../../public/img/footer/twitter@2x.png';

// 公众号、小助手
import CodeTitleXzs from '../../public/img/footer/img-xzs.png';
import CodeTitleGzh from '../../public/img/footer/img-gzh.png';
import CodeImgXzs from '../../public/img/footer/code-xzs.png';
import CodeImgZgz from '../../public/img/footer/code-zgz.png';


const isHomePage = ref(false);
// 友情链接
const linksData = {
  zh: [
    {
      path: 'https://my.oschina.net/openeuler',
      logo: LogoOschina,
      id: 'oschina',
    },
    {
      path: 'https://blog.csdn.net/openEuler_?spm=1000.2115.3001.5343',
      logo: LogoCsdn,
      id: 'csdn',
    },
    {
      path: 'https://juejin.cn/user/3183782863845454',
      logo: LogoJuejin,
      id: 'juejin',
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili,
      id: 'bilibili',
    },
    {
      path: 'https://www.infoq.cn/profile/6E6CE3E2316F28/publish',
      logo: LogoInfoq,
      id: 'infoq',
    },
    {
      path: 'https://blog.51cto.com/u_14948868',
      logo: Logo51cto,
      id: '51cto',
    },
  ],
  en: [
    {
      path: 'https://www.reddit.com/r/openEuler/',
      logo: LogoRedditSquare,
      id: 'reddit-square',
    },
    {
      path: 'https://www.linkedin.com/company/openeuler',
      logo: LogoLinkedin,
      id: 'linkedin',
    },
    {
      path: 'https://twitter.com/openEuler',
      logo: LogoTwitter,
      id: 'twitter',
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili2,
      id: 'bilibili',
    },
    {
      path: 'https://www.youtube.com/channel/UCPzSqXqCgmJmdIicbY7GAeA',
      logo: LogoYoutube,
      id: 'youtube',
    },
  ],
  ru: [
    {
      path: 'https://www.reddit.com/r/openEuler/',
      logo: LogoRedditSquare,
      id: 'reddit-square',
    },
    {
      path: 'https://www.linkedin.com/company/openeuler',
      logo: LogoLinkedin,
      id: 'linkedin',
    },
    {
      path: 'https://twitter.com/openEuler',
      logo: LogoTwitter,
      id: 'twitter',
    },
    {
      path: 'https://space.bilibili.com/527064077/channel/series',
      logo: LogoBilibili2,
      id: 'bilibili',
    },
    {
      path: 'https://www.youtube.com/channel/UCPzSqXqCgmJmdIicbY7GAeA',
      logo: LogoYoutube,
      id: 'youtube',
    },
  ],
};

const footerCodeList = [
  {
    img: CodeTitleXzs,
    code: CodeImgXzs,
    // label: i18n.value.common.FOOTER.QR_CODE,
  },
  {
    img: CodeTitleGzh,
    code: CodeImgZgz,
    // label: i18n.value.common.FOOTER.QR_ASSISTANT,
  },
];

const handleNavClick = (path) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
// const path = computed(() => {
//   return window.location.pathname
// })

// watch(
//   () => window.history,
//   (val) => {
//     console.log(val);
//   },
//   {
//     immediate:true,
//     deep:true
//   }
// );
</script>

<template>
  <div class="footer">
    <div class="atom" v-show="$route.path.length === 4">
      <p class="atom-text">{{ i18n.common.FOOTER.ATOM_TEXT }}</p>
      <img :src="LogoAtom" class="atom-logo" alt="" />
    </div>
    <div class="footer-content">
      <div class="inner" :class="{ 'is-home': $route.path.length !== 4 }">
        <div class="footer-logo">
          <img :src="LogoFooter" alt="" />
          <p>
            <a
              class="email"
              :href="'mailto:' + i18n.common.FOOTER.MAIL"
              target="_blank"
            >
              {{ i18n.common.FOOTER.MAIL }}
            </a>
          </p>
        </div>
        <div class="footer-option">
          <div class="footer-option-item">
            <a
              v-for="link in i18n.common.FOOTER.RIGHT_LIST"
              :key="link.URL"
              :href="`/${$lang}${link.URL}`"
              class="link"
              >{{ link.NAME }}</a
            >
          </div>
          <p class="copyright">{{ i18n.common.FOOTER.COPY_RIGHT }}</p>
        </div>
        <div class="footer-right">
          <div v-if="$lang === 'zh'" class="code-box">
            <a
              v-for="(item, index) in footerCodeList"
              :key="index"
              class="code-pop"
              href="javascript:;"
            >
              <img :src="item.img" class="code-img" alt="" />
              <div class="code-layer">
                <img :src="item.code" alt="" />
                <p class="txt">{{ item.label }}</p>
              </div>
            </a>
          </div>
          <div class="footer-links">
            <a
              v-for="item in linksData[$lang]"
              :key="item.id"
              :href="item.path"
              class="img"
              target="_blank"
            >
              <img :src="item.logo" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  background: #121212;
  a {
    text-decoration: none;
  }
  .atom {
    text-align: center;
    max-width: 1416px;
    padding: var(--o-spacing-h3) 0 var(--o-spacing-h4);
    position: relative;
    margin: 0 auto;
    @media (max-width: 1440px) {
      padding: var(--o-spacing-h4) 0;
      margin: 0 var(--o-spacing-h4);
    }

    &-text {
      font-size: var(--o-font-size-h6);
      font-weight: 400;
      color: #fff;
      line-height: var(--o-line-height-h6);
      @media (max-width: 1440px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    &-logo {
      height: 40px;
      margin-top: 16px;
      @media (max-width: 1100px) {
        height: 30px;
      }
    }
    &::after {
      background: rgba(229, 229, 229, 0.12);
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 1416px;
      content: '';
      height: 2px;
      @media (max-width: 1440px) {
        width: 100%;
      }
    }
  }

  &-content {
    background: url('/img/footer/footer-bg.png') no-repeat bottom center;
    .inner {
      max-width: 1416px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 0 32px;
      position: relative;
      min-height: 118px;
      @media (max-width: 1439px) {
        padding: var(--o-spacing-h4);
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .is-home {
      max-width: 1120px;
    }
  }
  &-logo {
    flex: 1;
    img {
      height: 46px;
    }
    @media (max-width: 1439px) {
      text-align: center;
      margin: 16px 0 40px;
    }
  }

  .copyright {
    font-size: var(--o-font-size-text);
    color: #fff;
    margin-top: var(--o-spacing-h5);
    @media (max-width: 1439px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h8);
    }
  }

  .footer-option {
    text-align: center;
    .link {
      color: #fff;
      font-size: var(--o-font-size-text);
      display: inline-block;
      padding: 0 var(--o-spacing-h6);
      border-right: 1px solid #fff;
      &:last-child {
        border-right: 0;
      }
      @media (max-width: 1439px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        padding: 0 var(--o-spacing-h9);
      }
    }
    @media (max-width: 1439px) {
      order: -1;
    }
  }

  .footer-right {
    flex: 1;
    .code-box {
      display: flex;
      justify-content: right;
      gap: 16px;
      margin-bottom: 18px;
      .code-pop {
        position: relative;
        height: 20px;
        display: block;
        > img {
          height: 100%;
          object-fit: cover;
        }
        .code-layer {
          position: absolute;
          top: -105px;
          left: -32px;
          z-index: 99;
          display: none;
          background: #fff;
          padding: 6px;
          img {
            width: 78px;
            height: 78px;
          }
          .txt {
            font-size: 12px;
            color: #fff;
            display: none;
          }
          &::after {
            border: 10px solid transparent;
            content: '';
            border-top-color: #fff;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            display: block;
          }
          @media (max-width: 800px) {
            display: block;
            position: initial;
            background: none;
            padding: 0;
            text-align: center;
            &::after {
              display: none !important;
            }
            .txt {
              display: block;
            }
          }
        }
        &:hover {
          .code-layer {
            display: block;
          }
        }
        @media (max-width: 800px) {
          height: auto;
          > img {
            display: none;
          }
        }
      }
      @media (max-width: 1439px) {
        justify-content: center;
      }
    }
    .footer-links {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 12px;
      .img {
        height: 14px;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
      @media (max-width: 1439px) {
        justify-content: center;
      }
      @media (max-width: 800px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
        margin-top: 40px;
        .img {
          height: 16px;
        }
      }
    }

    p {
      color: #fff;
      font-size: var(--o-font-size-tip);
      margin-top: var(--o-spacing-h8);
    }
  }

  .email {
    color: #fff;
    font-size: 14px;
  }
}
</style>
