<template>
    <div class="common-banner">
        <div class="banner">
            <img :src="pcSrc">
            <span class="inside">{{insideName}}</span>
            <span class="outside">{{outsideName}}</span>
        </div>
        <div class="banner-mobile">
            <h3>{{ outsideName }}</h3>
            <img :src="mobileSrc">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: ['insideName', 'outsideName', 'pcSrc', 'mobileSrc']
};
</script>

<style lang="less" scoped>
.common-banner {
    width: 1200px;
    margin: 0 auto;
    height: 560px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 55px;
        height: unset;
    }
    .banner {
        height: 100%;
        width: 100%;
        position: relative;
        @media (max-width: 1000px) {
            display: none;
        }
        img {
            height: 420px;
            width: 554px;
            position: absolute;
            right: 0;
            top: 70px;
        }
        .inside {
            position: absolute;
            left: 0;
            top: 170px;
            font-size: 80px;
            line-height: 80px;
            font-family: HuaweiSans-Medium;
            color: rgba(0, 0, 0, .05);
        }
        .outside {
            position: absolute;
            left: 0;
            top: 220px;
            font-size: 72px;
            line-height: 72px;
            font-family: FZLTXIHJW, HuaweiSans-Medium;
            color: #000;
            font-weight: normal;
        }
    }
    .banner-mobile {
        display: none;
        @media (max-width: 1000px) {
            display: block;
        }
        width: 100%;
        h3 {
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            font-family: FZLTHJW;
            margin-top: 40px;
        }
        img {
            margin-top: 10px;
            width: 100%;
        }
    }
}
</style>
