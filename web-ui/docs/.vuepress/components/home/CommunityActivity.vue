<script setup>
const props = defineProps({
  roundList: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
</script>

<template>
  <div class="community">
    <h3>{{ i18n.home.COMMUNITY_ACTIVITY.TITLE }}</h3>
    <div class="community-list">
      <el-card class="community-card" :style="{ padding: '0px' }">
        <div class="community-title">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.TITLE }}
        </div>
        <div class="community-word">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.CONTENT }}
        </div>
        <a
          :href="i18n.home.COMMUNITY_ACTIVITY.CARD.LINK"
          class="community-detail"
        >
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.VIEW_DETAILS }}
          <img
            class="community-detail-icon"
            src="/img/home/icon-right.png"
            alt=""
          />
        </a>
      </el-card>

      <el-card class="round-card" :style="{ padding: '0px' }">
        <div class="round-list">
          <div
            v-for="(item, index) in roundList"
            :key="index"
            class="round-item"
          >
            <img :src="item.ROUND_IMG" class="round-img" />

            <div class="round-value">{{ item.ROUND_VALUE }}</div>
            <div class="round-title">{{ item.ROUND_TEXT }}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.round {
  &-card {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px;

    :deep(.el-card__body) {
      width: 100%;
      padding: var(--o-spacing-h2);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h4) 0 0 0;
      }
    }
  }

  &-list {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
  &-item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      width: 32%;
      margin-bottom: var(--o-spacing-h4);
    }
  }

  &-value {
    font-size: var(--o-font-size-h5);
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h5);
    margin-top: var(--o-spacing-h5);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h10);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    margin-top: var(--o-spacing-h8);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h10);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  &-img {
    width: 48px;
    @media (max-width: 768px) {
      width: 40px;
    }
  }
}
.community {
  margin-top: var(--o-spacing-h1);
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-family: "PingFangSC-Light, PingFang SC";
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-family: "PingFangSC-Medium, PingFang SC";
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-word {
    font-size: var(--o-font-size-text);
    font-family: "PingFangSC-Regular, PingFang SC";
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h5);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  &-list {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: var(--o-spacing-h2);
    grid-gap: var(--o-spacing-h2);

    @media (max-width: 1080px) {
      display: grid;
      grid-template-columns: 1fr;
      margin-top: var(--o-spacing-h5);
      grid-gap: var(--o-spacing-h5);
    }
  }

  &-detail {
    cursor: pointer;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    &:hover {
      img {
        transform: translateX(3px);
      }
    }
    &-icon {
      transition: all 0.3s;
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
      margin-left: var(--o-spacing-h8);
    }

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h4);
    }
  }

  &-card {
    width: 100%;
    background-image: url("/img/home/round-bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;

    :deep(.el-card__body) {
      padding: var(--o-spacing-h2);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h8);
      }
    }
    &:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
  }
}
</style>
