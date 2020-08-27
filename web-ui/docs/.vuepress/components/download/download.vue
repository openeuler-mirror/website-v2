<template>
  <div class="download-content">
    <common-banner
      :pc-src="'/img/download/download-banner.png'"
      :mobile-src="'/img/download/download-banner.png'"
      :inside-name="'DOWNLOAD'"
      :outside-name="i18n.download.DOWNLOAD_BTN_NAME"
    ></common-banner>
    <div class="download-list-wrapper">
      <el-form :inline="true" :model="formData" class="download-filter">
        <el-form-item :label="i18n.download.MANUFACTURER">
          <el-select v-model="formData.manufacturer" multiple placeholder>
            <el-option
              v-for="(item, index) in i18n.download
                                .MANUFACTURER_LIST"
              :key="index"
              :label="item.NAME"
              :value="item.VALUE"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="i18n.download.PUBLISH_DATE">
          <el-select v-model="formData.publishDate" multiple placeholder>
            <el-option
              v-for="(item, index) in i18n.download
                                .PUBLISH_DATE_LIST"
              :key="index"
              :label="item.NAME"
              :value="item.VALUE"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="LTS">
          <el-checkbox v-model="formData.lts"></el-checkbox>
        </el-form-item>
      </el-form>
      <ul class="filter-tags">
        <li
          v-for="(item, index) in filterTags"
          v-show="
                        (formData.lts && item === 'LTS') ||
                            formData.publishDate.indexOf(item.VALUE) > -1 ||
                            formData.manufacturer.indexOf(item.VALUE) > -1
                    "
        >
          {{ item.NAME || item }}
          <span @click="delTag(item)">×</span>
        </li>
      </ul>
      <ul class="download-list">
        <li class="download-item" v-for="(item, index) in downloadList" :key="index">
          <h3 class="title">{{ item.NAME }}</h3>
          <el-button
            size="medium"
            class="download-btn"
            type="primary"
            icon="el-icon-download"
            @click="download(item.DOWNLOAD_URL)"
          >{{ i18n.download.DOWNLOAD_BTN_NAME }}</el-button>
          <p>{{ item.DESC }}</p>
          <div class="url-list-wrapper">
            <ul class="url-list">
              <li>
                <img src="/img/download/release.svg" alt />
                <a target="_blank" :href="item.RELEASE_DESC_URL">{{ i18n.download.RELEASE_DESC }}</a>
              </li>
              <li>
                <img src="/img/download/release.svg" alt />
                <a
                  target="_blank"
                  :href="item.INSTALL_GUIDENCE_URL"
                >{{ i18n.download.INSTALL_GUIDENCE }}</a>
              </li>
            </ul>
            <ul class="url-list">
              <li>
                <img src="/img/download/release.svg" alt />
                <a target="_blank" :href="item.SEEK_HELP_URL">
                  {{
                  i18n.download.SEEK_HELP
                  }}
                </a>
              </li>
              <li>
                <img src="/img/download/release.svg" alt />
                <a target="_blank" :href="item.GET_ISO_URL">
                  {{
                  i18n.download.GET_ISO
                  }}
                </a>
              </li>
            </ul>
            <ul class="url-list">
              <li>
                <img src="/img/download/release.svg" alt />
                <a target="_blank" :href="item.LIFE_CYCLE_URL">{{ i18n.download.LIFE_CYCLE }}</a>
              </li>
            </ul>
          </div>

          <div class="btn-mobile-wrapper">
            <el-button
              size="medium"
              class="download-btn-mobile"
              type="primary"
              @click="download(item.DOWNLOAD_URL)"
            >{{ i18n.download.DOWNLOAD_BTN_NAME }}</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { downloadList } from "../../api/download";
import commonBanner from "./../common/banner.vue";
let that = null;

export default {
  data () {
    that = this;
    return {
      formData: {
        manufacturer: [],
        publishDate: [],
        lts: false
      },
      list: []
    };
  },
  components: {
    commonBanner
  },
  mounted () {
    this.list = this.i18n.download.DOWNLOAD_LIST;
  },
  computed: {
    filterTags () {
      let allTags = this.i18n.download.MANUFACTURER_LIST.concat(
        this.i18n.download.PUBLISH_DATE_LIST,
        ["LTS"]
      );
      return allTags;
    },
    downloadList () {
      if (
        !this.formData.manufacturer.length &&
        !this.formData.publishDate.length
      ) {
        return this.list.filter(item => {
          return this.formData.lts
            ? item.LTS === this.formData.lts
            : true;
        });
      } else if (!this.formData.manufacturer.length) {
        return this.list.filter(item => {
          return (
            this.formData.publishDate.indexOf(item.PUBLISH_DATE) >
            -1 &&
            (this.formData.lts
              ? item.LTS === this.formData.lts
              : true)
          );
        });
      } else if (!this.formData.publishDate.length) {
        return this.list.filter(item => {
          return (
            this.formData.manufacturer.indexOf(item.MANUFACTURER) >
            -1 &&
            (this.formData.lts
              ? item.LTS === this.formData.lts
              : true)
          );
        });
      } else {
        return this.list.filter(item => {
          return (
            this.formData.publishDate.indexOf(item.PUBLISH_DATE) >
            -1 &&
            this.formData.manufacturer.indexOf(item.MANUFACTURER) >
            -1 &&
            (this.formData.lts
              ? item.LTS === this.formData.lts
              : true)
          );
        });
      }
    }
  },
  methods: {
    download (url) {
      window.open(url);
    },
    delTag (tag) {
      if (tag === 'LTS') {
        this.formData.lts = false;
      } else {
        const publishDateIndex = this.formData.publishDate.indexOf(tag.VALUE);
        const manufacturerIndex = this.formData.manufacturer.indexOf(tag.VALUE);
        (publishDateIndex > -1) ? (this.formData.publishDate.splice(publishDateIndex, 1)) : (this.formData.manufacturer.splice(manufacturerIndex, 1));
      }
    }
  }
};
</script>

<style lang="less">
.download-content {
  .el-select__tags {
    display: none;
  }
  .el-input__icon {
    line-height: 32px;
  }
  .el-form-item__label {
    line-height: 32px;
  }
  .el-form-item__content {
    line-height: 32px;
    @media (max-width: 1000px) {
      width: 100%;
    }
    .el-checkbox__inner {
      border-radius: 50%;
    }
  }
  .el-input__inner {
    height: 32px;
    line-height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #000;
  }
  .el-select__tags {
    min-width: 140px !important;
  }
  .el-form-item__label {
    font-size: 18px;
    color: #000;
    font-family: FZLTXIHJW;
  }

  .el-input__inner {
    font-size: 14px;
    color: #000;
    font-family: FZLTXIHJW;
  }

  .el-select-dropdown__item {
    color: #000;
    font-family: FZLTXIHJW;
  }

  .el-form-item {
    margin-right: 50px !important;
  }

  .el-form-item__content {
    min-width: 140px;
    min-height: 32px;
  }

  .el-button--primary {
    background-color: #002fa7;
  }

  .el-button--primary:focus,
  .el-button--primary:hover {
    background-color: #002fa7;
  }
  .el-input {
    width: unset;
    margin: unset;
  }
}
</style>
<style lang="less" scoped>
.download-content {
  width: 1120px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 15px;
  }
  .download-banner {
    height: 600px;
    background-color: #002fa7;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  .download-banner-mobile {
    display: none;
    margin-top: 40px;
    h3 {
      text-align: center;
      font-size: 24px;
      font-family: FZLTHJW;
      margin-bottom: 10px;
      height: 34px;
      line-height: 34px;
    }
    div {
      width: 100%;
      height: 200px;
      background-color: #002fa7;
    }
    @media (max-width: 1000px) {
      display: block;
    }
  }
  .download-list-wrapper {
    .download-filter {
      margin-top: 22px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      @media (max-width: 1000px) {
        display: none;
      }
    }
    .filter-tags {
      @media (max-width: 1000px) {
        display: none;
      }
      margin-top: 19px;
      li {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        font-family: FZLTXIHJW;
        padding: 9px 16px;
        border: 1px solid #002fa7;
        border-radius: 32px 32px 32px 32px;
        margin-right: 20px;
        span {
          margin-left: 10px;
          color: #002fa7;
          cursor: pointer;
        }
      }
    }
    .download-list {
      padding-top: 30px;
      margin-bottom: 150px;
      @media (max-width: 1000px) {
        padding-top: 0;
        border-top: unset;
        margin-bottom: 60px;
      }
      .download-item {
        width: 350px;
        margin: 0 25px 30px 0;
        height: 252px;
        box-sizing: border-box;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: inline-block;
        padding: 20px 10px 26px 20px;
        @media (max-width: 1000px) {
          display: block;
          margin: 40px auto !important;
          width: 315px;
          height: 282px;
          padding: 30px 22px 30px 23px;
        }
        .title {
          font-size: 20px;
          margin-bottom: 16px;
          font-family: HuaweiSansMedium;
          @media (max-width: 1000px) {
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
          }
        }
        .download-btn {
          margin-bottom: 20px;
          width: 74px;
          height: 24px;
          font-size: 12px;
          font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          padding: 0;
          @media (max-width: 1000px) {
            display: none;
          }
        }
        .btn-mobile-wrapper {
          text-align: center;
        }
        .download-btn-mobile {
          width: 68px;
          height: 28px;
          display: none;
          @media (max-width: 1000px) {
            display: inline-block;
            line-height: 8px;
          }
        }
        p {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          font-family: FZLTXIHJW;
          margin-bottom: 22px;
          line-height: 24px;
          @media (max-width: 1000px) {
            line-height: 20px;
            margin-bottom: 30px;
          }
        }
        .url-list-wrapper {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          a {
            text-decoration: none;
            color: #002fa7;
          }
          .url-list {
            display: flex;
            flex-direction: column;
            align-items: space-between;
            li {
              margin-bottom: 16px;
              @media (max-width: 1000px) {
                margin-bottom: 20px;
                &:last-of-type {
                  margin-bottom: 30px;
                }
              }
              img {
                width: 14px;
                height: 16px;
                vertical-align: middle;
                margin-right: 10px;
                @media (max-width: 1000px) {
                  display: none;
                }
              }
            }
          }
        }
      }
      .download-item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
