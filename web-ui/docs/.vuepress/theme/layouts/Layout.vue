<template>
  <div
    id="euler-app"
    :class="{'lang-en': $lang == 'en'}"
  >
    <CustomHeader/>
    <Content class="content"/>
     <CustomFooter/>
  </div>
</template>

<script>
import CustomHeader from '@theme/components/CustomHeader.vue'
import CustomFooter from '@theme/components/CustomFooter.vue'

export default {
  name: 'Layout',

  components: {
    CustomHeader,
    CustomFooter
  },

  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.content {
    min-height: calc(100vh - 110px - 176px);
    @media (max-width: 1000px) {
        min-height: calc(100vh - 70px - 280px);
    }
}
</style>
