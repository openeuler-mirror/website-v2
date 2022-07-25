<script setup lang="ts">
import { ref } from 'vue';

import { getShowCaseData } from '../../api/home';

getShowCaseData().then((res) => {
  console.log(res);
})

const active = ref(0);

const changeActive = (index) => {
  active.value = index;
};
</script>

<template>
  <div>
    <h3>{{ i18n.home.USER_CASE.TITLE }}</h3>
    <el-collapse v-model="active" accordion class="case-mobile">
      <el-collapse-item
        v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
        :key="index"
        class="case-mobile-list"
        :name="index"
      >
        <template #title>
          <div class="case-mobile-card-content">
            <div class="case-mobile-title">
              <img class="case-mobile-img" :src="item.URL" />
              <div class="case-mobile-word">
                {{ item.TYPE }}
              </div>
            </div>
          </div>
        </template>
        <div class="user-mobile">
          <div
            v-for="(user, index2) in i18n.home.USER_CASE.CASE_LIST[index]
              .CONTENT"
            :key="index2"
            class="user-card"
          >
            <div class="user-title">{{ user.NAME }}</div>
            <div class="user-word">{{ user.WORD }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="case">
      <el-card class="case-card">
        <div class="case-tab">
          <div
            v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
            :key="index"
            class="case-tab-item"
            @click="changeActive(index)"
          >
            <img
              class="case-img"
              :src="active === index ? item.ACTIVE_URL : item.URL"
            />
            <div
              :class="['case-word', active === index ? 'active' : '']"
              @click="changeActive(index)"
            >
              {{ item.TYPE }}
            </div>
          </div>
        </div>
        <div class="case-user">
          <a
            v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST[active]
              .CONTENT"
            :key="index"
            class="user-card"
            target="_blank"
            :href="item.URL"
          >
            <div class="user-title">{{ item.NAME }}</div>
            <div class="user-word">{{ item.WORD }}</div>
          </a>
        </div>
        <div class="statistics">
          <!-- // TODO: -->
          <a target="_blank" :href="i18n.home.HOME_ROUND.VIEW_DETAIL_LINK">
            {{ i18n.home.USER_CASE.VIEW_MORE }}
            <img src="/img/home/icon-right.png" alt="" />
          </a>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
a {
  text-decoration: none;
}
h3 {
  font-size: var(--o-font-size-h3);
  font-family: 'PingFangSC-Light, PingFang SC';
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
.statistics {
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
.case-mobile {
  display: none;
  @media (max-width: 1080px) {
    border-top: none;
    display: block;
  }

  &-list {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    :deep(.el-collapse-item__content) {
      padding-bottom: 0px;
    }

    :deep(.el-collapse-item__header) {
      height: 100%;
      padding: var(--o-spacing-h5);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h8);
      }
    }
  }

  &-title {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  &-word {
    margin-left: var(--o-spacing-h8);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    font-weight: 400;
    color: var(--o-color-text2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      font-weight: 300;
      line-height: var(--o-line-height-text);
    }
  }

  &-img {
    width: 40px;
    height: 40px;
    color: var(--o-color-text2);
  }

  &-card {
    margin-top: var(--o-spacing-h5);
    width: 100%;
    border-left: 2px solid var(--o-color-brand);
    &-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-icon {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text3);
  }
}
.user {
  &-mobile {
    padding: var(--o-spacing-h8);
    background-color: var(--o-color-bg3);
    > :nth-child(1) {
      margin-top: 0px;
    }
  }
  &-card {
    cursor: pointer;
    padding: var(--o-spacing-h5);
    width: 100%;
    background: var(--o-color-bg2);
    border: 1px solid rgba(0, 0, 0, 0);
    border-left: 2px solid var(--o-color-brand);
    @media (max-width: 1080px) {
      background: var(--o-color-bg);
      margin-top: var(--o-spacing-h8);
    }

    @media (max-width: 768px) {
      padding: var(--o-spacing-h8);
    }
  }

  &-card:hover {
    @media (min-width: 1080px) {
      background-color: var(--o-color-bg);
      border: 1px solid var(--o-color-brand);
      box-shadow: var(--o-shadow-secondary);
      border-left: 2px solid var(--o-color-brand);
      transition: 0.3s all;
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
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
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.case {
  display: block;
  @media (max-width: 1080px) {
    display: none;
  }
  &-more {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    margin-top: var(--o-spacing-h2);
    &-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
      margin-left: var(--o-spacing-h8);
    }
  }

  &-user {
    margin-top: var(--o-spacing-h2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: var(--o-spacing-h2);
    grid-gap: var(--o-spacing-h4) var(--o-spacing-h2);
    border-bottom: 1px solid var(--o-color-division);
  }

  &-card {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    padding: 20px;
  }

  &-img {
    margin-top: var(--o-spacing-h5);
    width: 80px;
    height: 80px;
    color: white;
  }

  &-word {
    font-size: var(--o-font-size-h5);
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h5);
    margin-top: 2px;
  }

  &-tab {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    &-item {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin: 0px 28px;
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
