<!-- 峰会 -->
<template>
    <div class="summit">
        <h3 v-if="isShowH5">{{ i18n.interaction.SUMMIT.SUMMIT }}</h3>
        <img class="top-img" :src="i18n.interaction.SUMMIT.SUMMIT_WEB_IMG" alt="" v-if="!isShowH5" />
        <img class="mobile-img" :src="i18n.interaction.SUMMIT.SUMMIT_H5_IMG" alt="" v-else />
        <div :class="['summit-explain',$lang == 'en'?'en-explain':'']">
            <p :class="$lang === 'en'?'font-regular':''" v-for="(item,index) in i18n.interaction.SUMMIT.SUMMITCONTENT">{{ item }}</p>
        </div>
        <div class="bottom-content">
            <p :class="['tip',$lang === 'en'?'font-bold':'']">{{ i18n.interaction.SUMMIT.SUMMITTIP }}</p>
            <p :class="['apply-title',$lang === 'en'?'font-bold':'']">{{ i18n.interaction.SUMMIT.APPLY_TITLE }}</p>
            <div class="apply-process">
                <div class="process" @click="go(item.CALL_LINK)" v-for="(item,index) in  i18n.interaction.SUMMIT.CALL_LIST" :key="index" :style="{background: item.BACKGROUND_COLOR}">
                    <img :src="item.CALL_IMG" alt="" />
                    <p :style="{color: item.FONT_COLOR}">{{ item.CALL_TEXT }}</p>
                </div>
            </div>
            <div :class="['review',$lang === 'en'?'en-font':'']">
                <i :class="['icon-video',$lang === 'en'?'en-position':'']"></i>
                <p :class="$lang === 'en'?'font-regular':''">{{ i18n.interaction.SUMMIT.HOMETITLE }}</p>
                <p :class="$lang === 'en'?'font-bold':''" @click="toReviewList">{{ i18n.interaction.SUMMIT.REVIEW_TEXT }}</p>
            </div>
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
        },
        go(path) {
            window.open(path);
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
.word-common-css(@fontSize,@fontFamily,@fontWeight,@color,@lineHeight) {
    font-size: @fontSize;
    font-family: @fontFamily;
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
    .word-common-css(36px,FZLTHJW,normal,rgba(0,0,0,1),46px);
    .mr-All( 0 auto);
}

// 具体样式从这里开始
.summit {
    padding-bottom: 180px;
    .top-img{
        .wid-and-hei(1120px,380px);
        display: block;
        .mr-All(0 auto);
    }
    @media screen and (max-width: 1000px) {
        padding: 40px 30px 126px 30px;
        h3{
            text-align: center;
            font-size: 24px;
            font-family: FZLTHJW;
            font-weight: normal;
            color: #000000;
            line-height: 34px;
        }
        .mobile-img{
            width: 100%;
        }
    }
}
.summit .summit-explain {
    width: 1120px;
    .mr-All(60px auto 24px auto);
    .word-common-css(20px,PingFangSC-Regular,400,rgba(0, 0, 0, 1),40px);
    @media screen and (max-width: 1000px) {
        width: 100%;
        .mr-All(40px 0 30px 0);
        .word-common-css(14px,FZLTHJW,normal,rgba(0, 0, 0, 1),24px);
    }
    p{
        margin-bottom: 30px;
        text-align:justify;
    }
}
.summit .en-explain{
    .word-common-css(20px,Roboto-Regular,400,#000000,40px);
    @media screen and (max-width: 1000px) {
        .word-common-css(14px,Roboto-Regular,normal,#000000,26px);
    }
    
}
.summit .bottom-content{
    width: 1120px;
    margin: 0 auto;
    .tip{
        font-size: 20px;
        font-family: FZLTCHJW;
        color: #333333;
        line-height: 40px;
        font-weight: bold;
        margin-bottom: 60px;
    }
    .apply-title{
        font-size: 32px;
        font-family: FZLTCHJW;
        font-weight: bold;
        color: #002FA7;
        line-height: 39px;
        margin-bottom: 36px;
        text-align: center;
    }
    .apply-process{
        width: 870px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .process{
            width: 400px;
            height: 160px;
            display: flex;
            
            align-items: center;
            cursor: pointer;
            box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-bottom: 36px;
            img{
                .wid-and-hei(160px,130px);
                margin-left: 10px;
            }
            p{
                font-size: 24px;
                font-family: Roboto-Bold;
                font-weight: bold;
                line-height: 24px;
                margin-left: 17px;
            }
        }
    }
    .review{
        margin-top: 26px;
        position: relative;
        .icon-video{
            position: absolute;
            .wid-and-hei(28px,20px);
            background-image: url('/img/summit/icon-video.png');
            background-repeat: no-repeat;
            background-size: contain;
            left: 124px;
            top: 3px;
        }
        .en-position{
            left: 223px;
            top: 6px;
        }
        p{
            font-size: 26px;
            font-family: FZLTHJW;
            font-weight: bold;
            color: #000000;
            line-height: 30px;
            &:last-of-type{
                color: #002FA7;
                line-height: 24px;
                font-size: 20px;
                margin-top: 30px;
                font-family: FZLTCHJW;
                cursor: pointer;
            }
        }
    }
    .font-regular{
        font-family: Roboto-Regular !important;
    }
    .font-bold{
        font-weight: bold !important;
        font-family: Roboto-Bold !important;
        @media screen and (max-width: 1000px) {
            text-align: justify;
        }
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
        .tip{
            font-size: 14px;
            line-height: 26px;
            margin-bottom: 30px;
        }
        .apply-title{
            font-size: 18px;
            line-height: 21px;
        }
        .apply-process{
            width: 100%;
            justify-content: flex-start;
            flex-direction: column;
            .process{
                width: 256px;
                height: 102px;
                margin: 0 auto 30px auto;
                img{
                    .wid-and-hei(102px,84px);
                }
                p{
                    line-height: 16px;
                    font-size: 14px;
                }
            }
        }
        .review{
             margin-top: 10px;
             .icon-video{
                 display: none;
             }
             p{
                font-size: 16px;
                 &:last-of-type{
                     font-size: 14px;
                     line-height: 17px;
                     margin-top: 10px;
                 }
             }
        }
    }
}
</style>
