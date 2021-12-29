<template>
    <div class="A-Tune">
        <titlenav v-show="isShowNav" :currentIndex="activeIndex" :dataList="i18n.minisite.NAV_TEXT"></titlenav>
        <minibanner :themeArr="i18n.minisite.MIGRATION_BANNER_TEXT" :mobileImg="i18n.minisite.ATUNE_BANNER_IMG" 
        videoUrl="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/A-Tune.mp4"></minibanner>
        <div class="atune-center">
            <minidesc :isOther="true" :descArr="i18n.minisite.MIGRATION_DESC"></minidesc>
            <miniframe :outsideStr="i18n.minisite.MIGRATION_FRAMEWORK.TITLE_OUTSIDE" :insideStr="i18n.minisite.MIGRATION_FRAMEWORK.TITLE_INSIDE"
            :descList="i18n.minisite.MIGRATION_FRAMEWORK.DESC_LIST" :frameImg="i18n.minisite.MIGRATION_FRAMEWORK.FRAMEWORK_IMG" id="framework"></miniframe>
        </div>
        <div class="document" id="document">
            <p class="title">{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_INSIDE }}</span></p>
        </div>
        
        <div class="reference">
            <p class="title">{{ i18n.minisite.BISHENG_REFERENCE.TITLE_OUTSIDE }}<span>{{ i18n.minisite.BISHENG_REFERENCE.TITLE_INSIDE }}</span></p>
            <div class="h5-link" v-if="isShowH5">
                <a :href="item.LINK" v-for="(item,index) in i18n.minisite.BISHENG_REFERENCE.LINK_LIST" :key="index" target="__blank">{{ item.TEXT }}</a>
            </div>
            <div class="link-list list" v-else>
                <div class="item" v-for="(item,index) in i18n.minisite.BISHENG_REFERENCE.LINK_LIST" :key="index" @click="go(item.LINK)">{{ item.TEXT }}</div>
            </div>
        </div>

    </div>
</template>
<script>
import titlenav from './../summit/titleNav.vue';
import minibanner from './banner.vue';
import miniimg from './imglink.vue';
import minidesc from './description.vue';
import miniframe from './framework.vue';
export default {
    data() {
        return {
            activeIndex: -1,
            isShowNav: false
        }
    },
    mounted() {
        if(!this.isShowH5) {
            window.addEventListener('scroll',this.atuneScroll);
        }
    },
    methods:{
        go(path) {
            if(path) {
                window.open(path);
            }
        },
        atuneScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 600) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 800 && scrollTop < 1800) {
                this.activeIndex = 0;
            }else if(scrollTop > 1800){
                this.activeIndex = 1;
            }else {
                return false;
            }
        },
    },
    destroyed () { 
        window.removeEventListener('scroll', this.atuneScroll);
    },
    components: {
        titlenav,
        minibanner,
        miniimg,
        minidesc,
        miniframe
    },
}
</script>
<style>
.A-Tune .banner-box {
    width: 850px;
}
.A-Tune .banner-box #video {
    margin-left: 229px;
}
@media screen and (max-width: 1120px) {
    .A-Tune .banner-box {
        width: 315px;
    }
}
</style>
<style lang="less" scoped>
.A-Tune {
    width: 100%;
}
.A-Tune .title {
    width: 1120px;
    margin: 0 auto;
    font-size: 36px;
    color: #000000;
    line-height: 48px;
    position: relative;
    text-align: center;
    span {
        font-size: 36px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.05);
        line-height: 48px;
        position: absolute;
        left: 47%;
        top: -24px;
    }
}
.A-Tune .atune-center {
    width: 100%;
}
html[lang="ru"] .A-Tune .atune-center .tune-desc {
    height: unset;
}
.A-Tune .document {
    width: 1120px;
    margin: 74px auto 200px auto;
    .doc-list {
        margin: 30px auto 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 940px;
        .item {
            width: 410px;
            height: 194px;
            background: #FFFFFF;
            cursor: pointer;
            border-radius: 8px;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            flex-direction: row;
            padding-left: 30px;
            &:nth-of-type(2),&:first-of-type {
                margin-bottom: 30px;
            }
            &:nth-of-type(2),&:last-of-type {
                margin-left: 80px;
            }
            img {
                width: 120px;
                height: 120px;
                display: block;
            }
            div {
                width: 200px;
                margin-left: 30px;
                p {                  
                    font-size: 18px;
                    color: #000000;
                    line-height: 28px;
                    &:last-of-type {
                        color: rgba(0, 0, 0, 0.5);
                        line-height: 30px;
                        font-size: 16px;
                        margin-top: 16px;
                        display: none;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .A-Tune .title {
        width: 315px;
        font-size: 18px;
        line-height: 18px;
        span {
            font-size: 16px;
            line-height: 26px;
            left: 45%;
            top: -17px;
        }
    }
    .A-Tune .document {
        width: 100%;
        margin: 37px auto 80px auto;
        .doc-list {
            flex-direction: column;
            width: 310px;
            .item {
                width: 310px;
                height: 158px;
                margin-bottom: 30px;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                &:nth-of-type(2),&:last-of-type {
                    margin-left: 0;
                }
                &:last-of-type {
                    margin-bottom: 0;
                }
                img {
                    width: 90px;
                    height: 90px;
                }
                div {
                    width: 160px;
                    margin-left: 20px;
                    p {
                        font-size: 16px;
                        line-height: 30px;
                        &:last-of-type {
                            line-height: 26px;
                            font-size: 14px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
}

.A-Tune .reference {
    padding-top: 124px;
    .link-list {
        .item {
            cursor: pointer;
            width: 410px;
            padding: 16px 0;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-size: 18px;
            color: #000000;
            text-align: center;
            line-height: 28px;
            &:hover {
                color: #FFFFFF;
                background: #002FA7;
            }
        }
    }
    @media screen and (max-width: 1120px) {
        padding-top: 57px;
        .h5-link {
            margin-top: 37px;
            a {
                display: block;
                color: #002FA7;
                text-align: center;
                margin-bottom: 30px;
                text-decoration: none;
                font-size: 16px;
                line-height: 30px;
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>