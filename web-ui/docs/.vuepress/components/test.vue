<template>
  <div>
    <button @click="change">{{i18n.home.test[0].test}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i18n: {}
    };
  },
  mounted() {
        const locales  = this.$site;
        const locale = this.$lang === "zh-CN" ? "/zh/" : "/";
        this.i18n = locales.themeConfig.locales[locale].lang;
    },
  methods: {
    change() {
      console.log(111);
    }
  }
};
</script>