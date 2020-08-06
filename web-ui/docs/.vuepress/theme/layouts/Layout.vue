<template>
  <div id="euler-app" :class="{'lang-en': $lang == 'en'}">
    <CustomHeader />
    <Content v-if="!isPost()" class="content" />
    <Post v-if="isPost()" class="content" />
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from "@theme/components/CustomHeader.vue";
import CustomFooter from "@theme/components/CustomFooter.vue";
import Post from "@theme/layouts/Post.vue";

export default {
  name: "Layout",

  components: {
    CustomHeader,
    CustomFooter,
    Post
  },

  data() {
    return {
      targetLocale: "",
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  methods: {
    isPost() {
      let currentPath = this.$route.path;
      return currentPath.indexOf(this.targetLocale + "blog/") > -1
        ? true
        : false;
    },
    isPostBlog() {
      let currentPath = this.$route.path;
      return currentPath.indexOf(this.targetLocale + "interaction/post-blog/") > -1
        ? true
        : false;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
    min-height: calc(100vh - 90px - 176px);
    @media (max-width: 1000px) {
        min-height: calc(100vh - 70px - 328px);
    }
}
</style>
