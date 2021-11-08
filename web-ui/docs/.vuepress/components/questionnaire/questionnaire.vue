<template>
  <div class="questionnaire-content">
    <div class="questionnaire">
      <a
        class="joinsoon"
        href="https://huaweicompute.wjx.cn/vm/OS0Ja5G.aspx?udsid=318969"
      ></a>
      <img
        src="/img/other/questionnaire/questionnaire.png"
        alt=""
        v-if="!isShowH5"
      />
      <img src="/img/other/questionnaire/questionnaire_mo.png" alt="" v-else />
    </div>
    <ul class="prize" v-if="!isShowH5">
      <li v-for="(item, index) in i18n.questionnaire.PRIZE_LIST" :key="index">
        <img :src="item" alt="" />
      </li>
    </ul>
    <ul class="prize" v-if="isShowH5">
      <li
        v-for="(item, index) in i18n.questionnaire.PRIZE_LIST_MO"
        :key="index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
    <div class="rule">
      <h3 class="rule-title">
        {{ i18n.questionnaire.RULE_TITLE }}
      </h3>
      <p>
        {{ i18n.questionnaire.FIRST }}
        <span class="red">{{ i18n.questionnaire.TIME }}</span>
      </p>
      <p v-for="(item, index) in i18n.questionnaire.RULE_TEXT" :key="index">
        {{ item
        }}<span v-if="index == 8">
          <span class="blue" @click="goFooterUrl('/other/legal/')">{{ i18n.questionnaire.LAW }}</span
          >及<span class="blue"  @click="goFooterUrl('/other/privacy/')">{{ i18n.questionnaire.PRIVACY }}</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goFooterUrl(url) {
      console.log();
      if (url.includes("https")) {
        window.open(url);
      } else {
        console.log(this.$router);
        this.$router.push({
          path: this.resolvePath(url),
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.red {
  color: #a70000;
}
.blue {
  cursor: pointer;
  color: #002fa7;
}
.questionnaire-content {
  max-width: 1120px;
  margin: 0 auto;
  .questionnaire {
    position: relative;
    margin: 40px 0;
    height: 370px;
    text-align: center;
    .joinsoon {
      position: absolute;
      left: 50px;
      bottom: 50px;
      width: 180px;
      height: 40px;
    }
    img {
      height: 100%;
      box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .prize {
    display: flex;
    margin-bottom: 60px;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      width: 270px;
      height: 354px;
      border-radius: 8px;
      box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
      &:first-of-type {
        margin-bottom: 60px;
        width: 100%;
        height: 200px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    li:hover {
      transition: all 0.3s;
      transform: translateY(-8px);
    }
  }
  .rule {
    margin-bottom: 170px;
    .rule-title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 36px;
    }
    p {
      line-height: 30px;
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .questionnaire-content {
    .questionnaire {
      .joinsoon {
        left: 139px;
        bottom: 79px;
        width: 100px;
        height: 30px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    .prize {
      align-items: center;
      flex-direction: column;
      justify-content: center;
      li {
        margin-bottom: 30px;
        width: 315px;
        height: 300px;
      }
      li:first-of-type {
        margin-bottom: 30px;
        width: 315px;
        height: 300px;
      }
    }
    .rule {
      margin-bottom: 80px;
      .rule-title {
        font-size: 18px;
      }
      padding: 0 30px;
    }
  }
}
</style>
