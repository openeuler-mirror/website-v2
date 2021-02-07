<template>
    <div class="A-Tune">
        <div class="title-nav" v-show="isShowNav" v-if="!isShowH5">
            <div class="box-line">
                <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
                <img class="line" v-lazy="'/img/minisite/atune/atune-line.png'" alt="" />
            </div>
            <div class="nav-text">
                <ul>
                    <li v-for="(item,index) in i18n.minisite.ATUNE_NAV_TEXT" @click="goTitle(index)" :class="index === activeIndex?'active':''">
                        <div><div class="inside"></div></div>
                        <div>{{ item }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tune-banner">
            <div class="text">
                <p v-for="(item,index) in i18n.minisite.ATUNE_BANNER_TEXT" :key="index">{{ item }}</p>
            </div>
            <video
            preload="auto"
            playsinline="true"
            autoplay="autoplay" loop="loop" muted="muted" id="aTune-video" v-if="!isShowH5">
                <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/A-Tune.mp4"  type="video/mp4">
            </video>
            <img :src="i18n.minisite.ATUNE_BANNER_IMG" alt="" v-else />
        </div>
        <div class="atune-center">
            <div class="tune-desc">
                <p>
                    {{ i18n.minisite.ATUNE_DESC }}
                </p>
            </div>
            <div class="link">
                <div v-for="(item,index) in i18n.minisite.ATUNE_LINK" :key="index" @click="go(item.LINK)" >
                    <img :src="item.IMG" alt="" />
                    <div class="guide" v-if="isShowTip && item.SHOW">
                        <div class="d3"></div>
                        <p v-if="!isShowH5">{{ i18n.minisite.ATUNE_MAIL }}</p>
                        <p v-else><span>{{ mailList[0] }}</span><br><span>{{ mailList[1] }}</span></p>
                    </div>
                </div>
            </div>
            <div class="framework-box">
               <div class="framework">
                    <p class="title">{{ i18n.minisite.ATUNE_FRAMEWORK.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ATUNE_FRAMEWORK.TITLE_INSIDE }}</span></p>
                    <div class="framework-desc">
                        <p v-for="(item,index) in i18n.minisite.ATUNE_FRAMEWORK.DESC_LIST" :key="index">{{ item }}</p>
                    </div>
                    <img :src="i18n.minisite.ATUNE_FRAMEWORK.FRAMEWORK_IMG" alt="" />
               </div>
            </div>
        </div>
        <div class="document">
            <p class="title">{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ATUNE_DOCUMENT.TITLE_INSIDE }}</span></p>
            <div class="doc-list">
                <div class="item" v-for="(item,index) in i18n.minisite.ATUNE_DOCUMENT.DOCS_LIST" :key="index" @click="go(item.LINK)">
                    <img :src="item.IMG" alt="" />
                    <div>
                        <p>{{ item.TITLE }}</p>
                        <p>{{ item.DESC }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mailList: [],
            isShowTip: false,
            activeIndex: -1,
            navTitleScroll: [900,2000],
            isShowNav: false
        }
    },
    mounted() {
        this.mailList = this.i18n.minisite.ATUNE_MB_MAIL;
        window.addEventListener('scroll',this.atuneScroll);
    },
    methods:{
        go(path) {
            if(path) {
                if(path === 'mail') {
                    this.isShowTip = ! this.isShowTip;
                }else {
                    window.open(path);
                }
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
        goTitle(index) {
            document.documentElement.scrollTop = this.navTitleScroll[index];
        },
    },
    destroyed () { 
        window.removeEventListener('scroll', this.atuneScroll);
    } 
}
</script>

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
.A-Tune .title-nav {
    position: fixed;
    cursor: pointer;
    top: 170px;
    right: 70px;
    z-index: 1000;
    display: block;
    
    .box-line {
        width: 70px;
        margin-left: -26px;
        .gif {
            width: 60px;
            height: 60px;
            margin: 0 auto -30px 5px;
            position: relative;
            z-index: 20;
        }
        .line {
            display: block;
            width: 2px;
            height: 252px;
            margin: 0 auto;
        }
    }
    .nav-text {
        position: relative;
        margin-top: -200px;
        ul li>div {
            display: inline-block;
            &:first-of-type {
                margin-right: 17px;
                border-radius: 50%;
                width: 18px;
                position: relative;
                background: #FFFFFF;
                height: 18px;
                border: 1px solid #979797;
                div {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #D8D8D8;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -7px;
                    margin-top: -7px;
                }
            }
            &:last-of-type {
                font-size: 20px;
                color: #000000;
                line-height: 30px;
            }
        }
        ul li {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
        }
        ul .active {
            &>div {
                color: #002FA7 !important;
            }
            .inside {
                background: #002FA7;
            }
        }
    }
}
.A-Tune .tune-banner{
    width: 850px;
    margin: 78px auto;
    display: flex;
    flex-direction: row;
    .text {
        p {
            color: #000000;
            font-size: 28px;
            line-height: 48px;
            font-weight: bold;
            &:first-of-type {
                font-size: 50px;
                line-height: 60px;
                margin: 37px 0 40px 0;
            }
        }
    }
    #aTune-video {
        margin-left: 229px;
        width: 223px;
        height: 224px;
    }
}
.A-Tune .atune-center {
    width: 100%;
    .tune-desc {
        width: 100%;
        height: 244px;
        background-image: url('/img/minisite/atune/desc-bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            width: 877px;
            color: #FFFFFF;
            line-height: 48px;
            font-size: 18px;
        }
    }
    .link {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 908px;
        margin: 50px auto;
        &>div {
            position: relative;
        }
        img {
            width: 196px;
            height: 157px;
            display: block;
            cursor: pointer;
        }
        p {
            font-size: 18px;
            color: #000000;
            line-height: 60px;
            padding-bottom: 10px;
        }
        .guide {
            position: absolute;
            box-sizing: border-box;
            border: 1px solid rgba(0, 47, 167, .5);
            width: 300px;
            padding: 10px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
            text-align: left;
            left: 20%;
            top: 94%;
            .d3{
                margin-left: 10px;
                width: 15px;
                height: 15px;
                transform: rotate(45deg);
                border-left: 1px solid rgba(0, 47, 167, .5);
                border-top: 1px solid rgba(0, 47, 167, .5);
                box-sizing: border-box;
                position: relative;
                top: -18px;
                background: #fff;
            }
        }
    }
    .framework-box {
        width: 100%;
        height: 1082px;
        overflow: hidden;
        background: linear-gradient(180deg, #F8FBFF 0%, #FCFDFF 100%);
        .framework {
            margin-top: 74px;
            .framework-desc {
                width: 1120px;
                margin: 30px auto;
                p {
                    font-size: 18px;
                    color: rgba(0, 0, 0, 0.7);
                    line-height: 48px;
                }
            }
            img {
                width: 1117px;
                height: 610px;
                margin: 0 auto;
                display: block;
            }
        }
    }
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
    .A-Tune .tune-banner{
        width: 345px;
        margin: 36px auto 40px auto;
        flex-direction: column-reverse;
        position: relative;
        img {
            width: 260px;
            height: 200px;
            display: block;
            margin: 58px auto 52px auto;
        }
        .text {
            p {
                font-size: 18px;
                line-height: 20px;
                text-align: center;
                margin-top: 16px;
                color: #002FA7;
                &:first-of-type {
                    font-size: 28px;
                    line-height: 30px;
                    margin: 0;
                    color: #000000;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    .A-Tune .atune-center {
        .tune-desc {
            height: 290px;
            background-image: url('/img/minisite/atune/desc-mobile.png');
            p {
                width: 315px;
                line-height: 30px;
                font-size: 16px;
                text-align: center;
            }
        }
        .link {
            flex-direction: column;
            width: 315px;
            align-items: center;
            margin: 40px auto;
            &>div {
                margin-bottom: 21px;
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
            img {
                width: 176px;
                height: 141px;
            }
            p {
                font-size: 16px;
                line-height: 30px;
                &:last-of-type {
                    white-space: nowrap;
                }
            }
            .guide {
                width: 220px;
                z-index: 10;
            }
        }
        .framework-box {
            height: 713px;
            .framework {
                margin-top: 57px;
                .framework-desc {
                    width: 100%;
                    margin: 30px 0 20px 0;
                    padding: 0 30px;
                    p {
                        font-size: 16px;
                        color: rgba(0, 0, 0, 0.75);
                        line-height: 30px;  
                    }
                }
                img {
                    width: 330px;
                    height: 180px;
                }
            }
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
</style>