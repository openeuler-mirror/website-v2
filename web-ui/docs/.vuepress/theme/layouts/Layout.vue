<template>
  <div id="euler-app" :class="{'lang-en': $lang == 'en'}">
    <CustomHeader />
    <Content v-if="!isPost() && !isPostBlog()" class="content" />
    <Post v-if="isPost()" class="content" />
    <PostBlog v-if="isPostBlog()" class="content" />
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from "@theme/components/CustomHeader.vue";
import CustomFooter from "@theme/components/CustomFooter.vue";
import Post from "@theme/layouts/Post.vue";
import PostBlog from "@theme/layouts/PostBlog.vue";

export default {
  name: "Layout",

  components: {
    CustomHeader,
    CustomFooter,
    Post,
    PostBlog
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
  min-height: calc(100vh - 110px - 176px);
  @media (max-width: 1000px) {
    min-height: calc(100vh - 70px - 328px);
  }
}
</style>
