<!-- 峰会 -->
<template>
    <div class="summit">
        <common-banner
        :pc-src="'/img/summit/summit-banner.png'"
        :mobile-src="'/img/summit/summit-banner.png'"
        :inside-name="'CONNECT'"
        :outside-name="i18n.interaction.SUMMIT.SUMMIT"
        >
        <div class="review" slot="pc-slot" @click="toReviewList()">
            <h2
            class="review-home"
            >{{i18n.interaction.SUMMIT.HOMETITLE}}</h2>
            <i class="icon-camera"></i>
        </div>
        <div class="review" slot="mobile-slot">
            <h2
            class="review-home"
            @click="toReviewList()">{{i18n.interaction.SUMMIT.HOMETITLE}}</h2>
        </div>
        </common-banner>
        <div :class="['summit-explain',$lang == 'en'?'en-explain':'']">
            <p>{{i18n.interaction.SUMMIT.SUMMITCONTENT}}</p>
        </div>
    </div>
</template>

<script>
import commonBanner from './../common/banner'
export default {
    data () {
        return {
        }
    },
    methods: {
        toReviewList () {
            let routeUrl = this.$router.resolve(this.resolvePath('/interaction/summit-list/list/'));
            window.open(routeUrl.href);
        }
    },
    components: {
        commonBanner
    }
}

</script>

<style lang='less' scoped>
@mr-left: left;
@mr-right: right;
@mr-bottom: bottom;
@mr-top: top;

.mr(@position,@px) when (@position = @mr-top) {
    margin-top: @px;
}
.mr(@position,@px) when (@position = @mr-right) {
    margin-right: @px;
}
.mr(@position,@px) when (@position = @mr-bottom) {
    margin-bottom: @px;
}
.mr(@position,@px) when (@position = @mr-left) {
    margin-left: @px;
}
.mr-All(@mr) {
    margin: @mr;
}
.wid-and-hei(@width,@height) {
    width: @width;
    height: @height;
}
.max-wid-hei(@width,@height){
    max-width:@width ;
    max-height: @height;
}
.word-common-css(@fontSize,@fontFamily1,@fontFamily2,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-family: @fontFamily1, @fontFamily2;
    font-weight: @fontWeight;
    color: @color;
    line-height: @lineHeight;
}
.background-size(@size) {
    background-size: @size;
}
.icon-css(@width,@height,@url,@size) {
    display: inline-block;
    width: @width;
    height: @height;
    background-image: url(@url);
    .background-size(@size);
}
.back-shadow-radius(@background,@shadow,@radius) {
    background: @background;
    box-shadow: @shadow;
    border-radius: @radius;
}
//主题的高度和宽度固定
.theme-css(@width,@height) {
    width: @width;
    height: @height;
    .word-common-css(36px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),46px);
    .mr-All( 0 auto);
}

// 具体样式从这里开始
.summit {
    padding-bottom: 180px;
    @media (max-width: 1000px) {
        padding: 40px 15px 80px 15px;
    }
    .review {
        .review-home {
            cursor: pointer;
            display: inline-block;
            .word-common-css(26px,FZLTHJW,FZLTHJW,normal,rgba(0,47,167,1),30px);
            .mr(top,262px);
            @media (max-width: 1000px) {
                .word-common-css(16px,FZLTHJW,FZLTHJW,normal,rgba(0,47,167,1),26px);
                width: 100%;
                .mr(top,0);
                text-align: center;
            }
        }
        .review-list {
            display: inline-block;
            .word-common-css(25px,PingFangSC-Regular,PingFang SC,400,rgba(0,0,0,1),30px);
            .mr(top,262px);
            @media (max-width: 1000px) {
                .word-common-css(16px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal, #000000,26px);
                width: 100%;
                .mr(top,0);
                text-align: center;
            }
        }
        .list-time {
            @media (max-width: 1000px) {
                .mr-All(10px 0 0 0);
                width: 100%;
                text-align: center;
                .word-common-css(16px,FZLTHJW--GB1-0,FZLTHJW--GB1,normal,rgba(0,0,0,1),26px);
            }
        }
        .icon-camera {
        .icon-css(28px,20px,"/img/summit/camera.svg",auto);
        .mr(left,14px);
        }
    }
}

.summit .summit-explain {
    width: 1120px;
    .mr-All(60px auto 0 auto);
    .word-common-css(20px,PingFangSC-Regular, PingFang SC,400,rgba(0, 0, 0, 1),40px);
    @media (max-width: 1000px) {
        width: 315px;
        .word-common-css(16px,FZLTHJW,FZLTHJW,normal,rgba(0, 0, 0, 1),26px);
    }
}
.summit .en-explain{
    .word-common-css(20px,Roboto-Regular, Roboto,400,#000000,40px);
    @media (max-width: 1000px) {
        .word-common-css(16px,Roboto-Regular, Roboto,normal,#000000,26px);
    }
}
.summit .en-review-home{
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #002FA7;
    line-height: 30px;
    @media (max-width: 1000px) {
        font-size: 16px;
        line-height: 26px;
    }
}
</style>
