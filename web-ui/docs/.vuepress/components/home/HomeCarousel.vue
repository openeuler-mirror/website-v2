<script setup >
import { ref } from "vue";

const active = ref(0);
const activeMobile = ref(0);

const changeActive = (index) => {
  active.value = index;
  activeMobile.value = index;
};

const changeActiveMobile = (activeNames) => {
  if (activeNames !== "") {
    active.value = activeNames;
  }
};
</script>

<template>
  <div class="carousel">
    <h3>{{ i18n.home.IMG_CAROUSE.TITLE }}</h3>
    <div class="carousel-pc">
      <el-card class="carousel-pc-card" :style="{ padding: '0px' }">
        <div class="carousel-pc-content">
          <div class="carousel-pc-list">
            <div
              v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
              :key="index"
              :class="['carousel-pc-title', active === index ? 'active' : '']"
              @click="changeActive(index)"
            >
              {{ item.TITLE }}
            </div>
          </div>
          <div class="carousel-pc-img">
            <img :src="i18n.home.IMG_CAROUSE.LIST[active].IMG_URL" />
          </div>
        </div>
        <div class="carousel-pc-button">
          <a target="_blank" :href="i18n.home.IMG_CAROUSE.TRY_URL">
            {{ i18n.home.IMG_CAROUSE.BUTTON }}
            <img src="/img/home/icon-right.png" alt="" />
          </a>
        </div>
      </el-card>
    </div>
    <el-collapse
      class="carousel-mobile"
      v-model="activeMobile"
      @change="changeActiveMobile"
      accordion
    >
      <el-collapse-item
        v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
        :key="index"
        :name="index"
        class="carousel-mobile-card"
      >
        <template #title>
          <div class="carousel-mobile-content">
            <div class="carousel-mobile-title">
              {{ item.TITLE }}
            </div>
          </div>
        </template>
        <div class="carousel-mobile-img">
          <img :src="i18n.home.IMG_CAROUSE.LIST[index].IMG_URL" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="less" scoped>
.carousel {
  max-width: 1504px;
  padding: 40px;
  margin: 0 auto;
  padding: 0;
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
    }
  }

  &-mobile {
    margin-top: var(--o-spacing-h5);
    display: none;
    @media (max-width: 1080px) {
      display: flex;
      flex-flow: column;
    }
    &-card {
      :deep(.el-collapse-item__content) {
        padding-bottom: 0px;
      }

      :deep(.el-collapse-item__header) {
        height: 100%;
        padding: var(--o-spacing-h4);
        @media (max-width: 768px) {
          padding: var(--o-spacing-h8);
        }
      }

      :deep(.el-collapse-item__wrap) {
        margin: var(--o-spacing-h5) 0;
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      // justify-content: space-between;
      // align-items: center;
    }

    &-img {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      cursor: pointer;
      font-size: var(--o-font-size-h5);
      font-weight: 500;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    &-icon {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text3);
    }
  }
  &-pc {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1080px) {
      display: none;
    }
    &-card {
      :deep(.el-card__body) {
        padding: var(--o-spacing-h1) var(--o-spacing-h1) var(--o-spacing-h2);
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      // justify-content: space-between;
      // align-items: center;
      padding-bottom: var(--o-spacing-h2);
      border-bottom: 1px solid var(--o-color-division);
    }

    &-list {
      display: flex;
      flex-flow: column;
      margin-right: var(--o-spacing-h1);
      // justify-content: space-between;
      height: 300px;
      align-items: center;
      @media (max-width: 1280px) {
        height: 320px;
      }
      :nth-child(3) {
        border-bottom: 0px !important;
        padding-bottom: 0px !important;
      }
    }

    &-img {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      cursor: pointer;
      font-size: var(--o-font-size-h4);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h4);
      text-align: start;
      border-bottom: 1px solid var(--o-color-division);
      padding: var(--o-spacing-h3) 0;
      @media (max-width: 1280px) {
        padding-bottom: var(--o-spacing-h2);
      }
    }
    &-title:first-child {
      padding-top: 0;
    }
    &-button {
      display: flex;
      padding-top: 42px;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 1000px) {
        padding: 20px 0;
        font-size: 12px;
      }
      img {
        margin-left: 8px;
        width: 16px;
        transition: all 0.3s;
      }
      a {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #000;
        transition: all 0.3s;
        &:hover {
          color: var(--o-color-brand);
          img {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}
/deep/.el-icon-arrow-right {
  font-weight: 700;
  transform: rotate(90deg);
  &::before {
    color: #000;
  }
}
/deep/.el-icon-arrow-right.is-active {
  transform: rotate(270deg);
}
.active {
  color: var(--o-color-brand);
}
</style>