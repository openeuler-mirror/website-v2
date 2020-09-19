<!-- 沙龙 -->
<template>
    <div class="meetups">
        <div class="banner">
            <img src="/img/meetups/meetups-banner.png" />
            <span class="inside">{{i18n.interaction.MEETUPS.INSIDENAME}}</span>
            <span :class="['outside', $isCn ? 'font-xihjw' : 'font-hwmedium']">{{i18n.interaction.MEETUPS.MEETUPS}}</span>
            <p class="pc-message">{{i18n.interaction.MEETUPS.MESSAGE}}</p>
        </div>

        <div class="banner-mobile">
            <h3>{{i18n.interaction.MEETUPS.MEETUPS}}</h3>
            <p class="mobile-message">{{i18n.interaction.MEETUPS.MESSAGE}}</p>
            <img src="/img/meetups/meetups-banner.png" />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}

</script>

<style lang='less' scoped>
.word-common-css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-family: @fontFamily1, @fontFamily2;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
}
.mr-All(@mr) {
    margin: @mr;
}
.wid-and-hei(@width,@height) {
    width: @width;
    height: @height;
}
//具体样式从这里开始
.meetups {
    width: 1120px;
    margin: 0 auto;
    height: 780px;
    padding-bottom:200px ;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 41px 76px 41px;
        height: unset;
    }
    .banner {
        height: 100%;
        width: 100%;
        position: relative;
        @media (max-width: 1000px) {
            display: none;
        }
        .pc-message{
            .word-common-css(25px,PingFangSC-Regular,PingFang SC,400,#000000,30px);
            position: absolute;
            top: 260px;
        }
        img {
            height: 400px;
            width: 400px;
            position: absolute;
            right: 0;
            top: 180px;
        }
        .inside {
            position: absolute;
            left: 0;
            top: 120px;
            font-size: 60px;
            line-height: 60px;
            font-family: HuaweiSans-Medium;
            color: rgba(0, 0, 0, 0.05);
        }
        .outside {
            position: absolute;
            left: 0;
            top: 156px;
            font-size: 48px;
            line-height: 48px;
            color: #000;
            font-weight: normal;
        }
    }
    .banner-mobile {
        display: none;
        @media (max-width: 1000px) {
            display: block;
        }
        .mobile-message{
            .mr-All(20px auto 40px auto);
            width: 100%;
            text-align: center;
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
