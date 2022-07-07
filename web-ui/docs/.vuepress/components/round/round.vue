<!--数据球-->
<template>
  <div :class="['round', styleParams.backcolor]">
    <img :src="image" alt="" />
    <p class="num-data">{{ value || '--' }}</p>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'round',
  data() {
    return {
      isOsv: null,
    };
  },
  props: ['image', 'value', 'description', 'styleParams'],
  mounted() {
    if (this.image.indexOf('osv') > -1) {
      this.isOsv = true;
    } else {
      this.isOsv = false;
    }
  },
};
</script>

<style lang="less" scoped>
.round {
  text-align: center;
  .num-data {
    margin: 15px 0 10px;
    font-size: 24px;
  }
  .description {
    font-size: 18px;
  }
  img {
    width: 40px;
  }
  @media screen and (max-width: 1000px) {
    .description {
      font-size: 12px;
    }
    img {
      width: 33px;
    }
    .num-data {
      margin: 10px 0 4px;
      font-size: 14px;
    }
  }
}
</style>
