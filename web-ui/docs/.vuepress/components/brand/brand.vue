<template>
  <div class="download-content">
    <common-banner
      :pc-src="'/img/other/brand/brand-banner.png'"
      :mobile-src="'/img/other/brand/brand-banner.png'"
      :inside-name="'BRAND'"
      :outside-name="i18n.brand.BRAND"
    ></common-banner>
    <div class="brand-all-word">
      <h3 class="brand-title">{{i18n.brand.NOTICE}}</h3>
      <p class="brand-word">{{i18n.brand.WORDS}}</p>
    </div>
    <!-- 六个带有下载功能的卡片 -->
    <div class="brand-six-cards">
      <p class="title-vertical">Vertical</p>
      <p class="mobile-title">{{i18n.brand.MOBILETITLE}}</p>
      <ul class="card-vertical">
        <li class="vertical-left">
          <h3>Standard</h3>
          <img src="/img/other/brand/vertical-left.png" alt />
          <!-- 三个下载按钮 -->
          <a href="/img/other/brand/vertical-left.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/vertical-left.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/vertical-left.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
        <li class="vertical-center">
          <h3>Monochrome</h3>
          <img src="/img/other/brand/vertical-center.png" alt />
          <a href="/img/other/brand/vertical-center.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/vertical-center.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/vertical-center.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
        <li class="vertical-right">
          <h3>Black</h3>
          <img src="/img/other/brand/vertical-right.png" alt />
          <a href="/img/other/brand/vertical-right.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/vertical-right.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/vertical-right.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
      </ul>
      <p class="title-horizontal">Horizontal</p>
      <ul class="card-horizontal">
        <li class="horizontal-left">
          <h3>Standard</h3>
          <img src="/img/other/brand/horizontal-left.png" alt />
          <a href="/img/other/brand/horizontal-left.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-left.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-left.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
        <li class="horizontal-center">
          <h3>White</h3>
          <img src="/img/other/brand/horizontal-center.png" alt />
          <a href="/img/other/brand/horizontal-center.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-center.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-center.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
        <li class="horizontal-right">
          <h3>Black</h3>
          <img src="/img/other/brand/horizontal-right.png" alt />
          <a href="/img/other/brand/horizontal-right.png" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PNG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-right.svg" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">SVG</el-button>
          </a>
          <a href="/img/other/brand/horizontal-right.pdf" target="_blank" download>
            <el-button size="medium" class="card-btn" type="primary" icon="el-icon-download">PDF</el-button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.brand-all-word {
  width: 1120px;
  margin: 0 auto;
  padding-top: 60px;
  @media (max-width: 1000px) {
     width: 300px;
    }
  .brand-title {
    width: 48px;
    height: 24px;
    font-size: 24px;
    font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
  }
  .brand-word {
    width: 1120px;
    font-size: 14px;
    font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    line-height: 32px;
    margin-top: 20px;
    @media (max-width: 1000px) {
      width: 315px;
      font-size: 14px;
      font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
    }
  }
}
.brand-six-cards {
  width: 1120px;
  margin: 0 auto;
  margin-top: 80px;
   @media (max-width: 1000px) {
     width: 300px;
    }
  .card-vertical,
  .card-horizontal {
    display: flex;
    @media (max-width: 1000px) {
      flex-direction: column;
      width: 300px;
    }
  }
  .card-horizontal {
    margin-bottom: 200px;
    @media (max-width: 1000px) {
      margin-bottom: 80px;
    }
  }
  .title-vertical,
  .title-horizontal {
    width: 93px;
    height: 24px;
    font-size: 24px;
    font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
    font-weight: normal;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  .title-horizontal {
    width: 124px;
  }
  .mobile-title {
    display: none;
    @media (max-width: 1000px) {
      display: block;
      width: 315px;
      height: 26px;
      font-size: 16px;
      font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
      font-weight: normal;
      color: rgba(0, 0, 0, 1);
      line-height: 26px;
    }
  }
  .vertical-left,
  .vertical-center,
  .vertical-right,
  .horizontal-left,
  .horizontal-center,
  .horizontal-right {
    width: 350px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    flex: 1;
    padding-top: 32px;
    margin: 20px 25px 20px 0;
     @media (max-width: 1000px) {
     width:315px;
    height:282px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 10px 0px rgba(0,0,0,0.2);
    border-radius:8px;
    }
  }
  ul h3 {
    width: 99px;
    height: 24px;
    font-size: 24px;
    font-family: HuaweiSans;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin: 0 auto;
  }
  ul img {
    display: block;
    margin: 0 auto;
    padding-top: 39px;
  }
  .horizontal-left img {
    padding-top: 45px;
    padding-bottom: 50px;
  }
  .horizontal-center img {
    padding-bottom: 27px;
  }
  .horizontal-right img {
    padding-top: 45px;
    padding-bottom: 50px;
  }
  .card-btn {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 120px;
    width: 78px;
    height: 32px;
    padding: 2px;
    @media (max-width: 1000px) {
      margin-bottom: 30px;
    }
  }
}
</style>
