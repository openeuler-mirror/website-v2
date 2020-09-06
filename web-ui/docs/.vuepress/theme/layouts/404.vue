<template>
    <div class="theme-container">
        <CustomHeader></CustomHeader>
            <mesbanner class="not-found-top"
            :outsideName="i18n.common.NOTFOUND.NOTFOUND"
            :pcSrc="'/img/404/404-banner.png'"
            :mobileSrc="'/img/404/404-banner.png'"
            :isOther="true"
            :pcMessage="i18n.common.NOTFOUND.MESSAGE"
            :mobileMessage="i18n.common.NOTFOUND.MESSAGE"
            >
            </mesbanner>
        <CustomFooter></CustomFooter>
    </div>
</template>

<script>
import CustomHeader from "./../components/CustomHeader";
import CustomFooter from "./../components/CustomFooter";
import mesbanner from './../../components/common/mesbanner';
export default {
    components: {
        CustomHeader,
        CustomFooter,
        mesbanner
    },
  methods: {
  },
  watch: {
      '$route.path': {
          immediate: true,
          handler (val) {
              if(val === '/') {
                  window.location.href = '/zh/';
              }
          }
      }
  }
}
</script>

<style lang="less" scoped>
.not-found-top{
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        margin-bottom: 80px;
    }
}
</style>
