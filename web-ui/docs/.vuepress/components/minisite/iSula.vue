<template>
    <div class="i-Sula">
        <div class="title-nav" v-show="isShowNav" v-if="!isShowH5">
            <div class="box-line">
                <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
                <img class="line" v-lazy="'/img/minisite/isula/isula-line.png'" alt="" />
            </div>
            <div class="nav-text">
                <ul>
                    <li v-for="(item,index) in i18n.minisite.ISULA_NAV_TEXT" @click="goTitle(index)" :class="index === activeIndex?'active':''">
                        <div><div class="inside"></div></div>
                        <div>{{ item }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="isula-banner">
            <div class="text">
                <div>
                    <p v-for="(item,index) in i18n.minisite.ISULA_BANNER_TEXT" :key="index">{{ item }}</p>
                </div>
            </div>
            <video
            preload="auto"
            playsinline="true"
            autoplay="autoplay" loop="loop" muted="muted" id="isula-video" v-if="!isShowH5">
                <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/iSula.mp4"  type="video/mp4">
            </video>
            <img :src="i18n.minisite.ISULA_BANNER_IMG" alt="" v-else />
        </div>
        <div class="desc-box">
            <div class="isula-desc">
                <div class="up-text">
                    <p>{{ i18n.minisite.ISULA_DESC_UP }}</p>
                    <img :src="i18n.minisite.ISULA_LOGO" alt="" />
                </div>
                <div class="link">
                    <div v-for="(item,index) in i18n.minisite.ISULA_LINK" :key="index" @click="go(item.LINK)" >
                        <img :src="item.IMG" alt="" />
                        <div class="guide" v-if="isShowTip && item.SHOW">
                            <div class="d3"></div>
                            <p v-if="!isShowH5">{{ i18n.minisite.ISULA_MAIL }}</p>
                            <p v-else><span>{{ mailList[0] }}</span><br><span>{{ mailList[1] }}</span></p>
                        </div>
                    </div>
                </div>
                <p v-for="(item,index) in i18n.minisite.ISULA_DESC_DOWN" :key="index">{{ item }}</p>
                <img :src="i18n.minisite.ISULA_DESC_IMG" alt="" />
            </div>
        </div>
        <div class="framework-box">
            <p class="title">{{ i18n.minisite.ISULA_FRAMEWORK.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ISULA_FRAMEWORK.TITLE_INSIDE }}</span></p>
            <div class="framework-desc">
                <div class="tab-list">
                    <div :class="['item',frameworkIndex === index?'active':'']" v-for="(item,index) in i18n.minisite.ISULA_FRAMEWORK.TAB" @click="changeTab(item.KEY,index,0)">{{ item.VALUE }}</div>
                </div>
                <div :class="['description',frameworkIndex == 0?'indent':'']">
                    <p v-for="(item,index) in frameworkData.DESC_LIST" :key="index">{{ item }}</p>
                </div>
            </div>
            <div class="framework-img">
                <p>{{ frameworkData.FRAMEWORK_TITLE }}</p>
                <img :class="[frameworkIndex === 1?'img-2':'',frameworkIndex === 2?'img-3':'']" :src="frameworkData.FRAMEWORK_IMG" alt="" />
            </div>
        </div>
        <div class="document">
            <p class="title">{{ i18n.minisite.ISULA_DOCUMENT.TITLE_OUTSIDE }}<span>{{ i18n.minisite.ISULA_DOCUMENT.TITLE_INSIDE }}</span></p>
            <div class="tab-list">
                <div :class="['item',documentIndex === index?'active':'']" v-for="(item,index) in i18n.minisite.ISULA_DOCUMENT.TAB" :key="index" @click="changeTab(item.KEY,index,1)">{{ item.VALUE }}</div>
            </div>
            <div class="doc-list">
                <div class="item" v-for="(item,index) in documentData" :key="index">
                    <img :src="item.IMG" alt="" />
                    <div>
                        <p v-for="value in item.DESC" @click="go(value.LINK)">{{ value.TEXT }}</p>
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
            frameworkData: {},
            documentData: [],
            frameworkIndex: 0,
            documentIndex: 0,
            isShowTip: false,
            mailList: [],
            activeIndex: -1,
            navTitleScroll: [1200,2600],
            isShowNav: false
        }
    },
    mounted (){
        this.frameworkData = this.i18n.minisite.ISULA_FRAMEWORK['ISULAD'];
        this.documentData = this.i18n.minisite.ISULA_DOCUMENT['ISULAD'];
        this.mailList = this.i18n.minisite.ISULA_MB_MAIL;
        window.addEventListener('scroll',this.isulaScroll);
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
        changeTab(key,index,which) {
            if(key) {
                if(which === 0) {
                    this.frameworkData = this.i18n.minisite.ISULA_FRAMEWORK[key];
                    this.frameworkIndex = index;
                }else {
                    this.documentData = this.i18n.minisite.ISULA_DOCUMENT[key];
                    this.documentIndex = index;
                }
            }
        },
        isulaScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 300) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 1000 && scrollTop < 2200) {
                this.activeIndex = 0;
            }else if(scrollTop > 2400){
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
        window.removeEventListener('scroll', this.isulaScroll);
    } 
}
</script>

<style lang="less" scoped>
.i-Sula {
    width: 100%;
}
.i-Sula .framework-desc,.i-Sula .document,.i-Sula .framework-img,
.i-Sula .title,.i-Sula .isula-desc{
    width: 1120px;
    margin: 0 auto;
}
.i-Sula .title {
    font-size: 36px;
    color: #000000;
    line-height: 48px;
    position: relative;
    margin-top: 74px;
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
.i-Sula .title-nav {
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
.i-Sula .isula-banner{
    width: 900px;
    margin: 78px auto;
    display: flex;
    flex-direction: row;
    .text {
        margin-right: 443px;
        display: flex;
        flex-direction: row;
        &>div {
            width: 180px;
            margin-top: 37px;
        }
        p {
            color: #000000;
            font-size: 28px;
            font-weight: bold;
            line-height: 48px;
            &:first-of-type {
                font-size: 50px;
                line-height: 60px;
                margin-bottom: 40px;
            }
        }
        img {
            width: 139px;
            height: 144px;
            display: block;
            margin: 37px 0 0 30px;
        }
    }
    #isula-video {
        width: 266px;
        height: 220px;
    }
}
.i-Sula .desc-box {
    width: 100%;
    background-image: url('/img/minisite/isula/pc-desc-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    .isula-desc {
        .link {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 552px;
            margin: 0 auto 30px auto;
            &>div {
                position: relative;
            }
            img {
                width: 192px;
                height: 157px;
                display: block;
                cursor: pointer;
            }
            p {
                font-size: 18px;
                color: #000000;
                line-height: 60px;
            }
            .guide {
                position: absolute;
                box-sizing: border-box;
                border: 1px solid rgba(0, 47, 167, .5);
                width: 290px;
                padding: 10px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
                text-align: left;
                left: 20%;
                top: 72%;
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
        p {
            font-size: 18px;
            color: #000000;
            line-height: 48px;
        }
        .up-text {
            margin-bottom: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 40px;
        }
        img {
            width: 720px;
            height: 242px;
            display: block;
            margin: 19px auto 49px auto;
        }
    }
}
.i-Sula .framework-box {
    width: 100%;
    overflow: hidden;
    background: linear-gradient(180deg, #F8FBFF 0%, #FCFDFF 100%);
    .framework-desc {
        .tab-list {
            display: flex;
            flex-direction: row;
            margin: 30px 0 34px 0;
            .item {
                font-size: 20px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 48px;
                margin-right: 50px;
                cursor: pointer;
            }
            .active {
                border-bottom: 4px solid #002FA7;
                color: rgba(0, 0, 0, 0.7);
            }
        }
        .description {
            p {
                font-size: 18px;
                color: rgba(0, 0, 0, 0.7);
                line-height: 48px;
            }
        }
        .indent {
            p {
                text-indent: 10px;
                &:first-of-type,&:nth-of-type(2),&:last-of-type {
                    text-indent: 0;
                }
            }
        }
    }
    .framework-img {
        p {
            font-size: 18px;
            color: rgba(0, 0, 0, 0.7);
            line-height: 48px;
        }
        img {
            width: 736px;
            height: 664px;
            display: block;
            margin: 20px auto 50px auto;
        }
        .img-2 {
            width: 607px;
            height: 720px;
        }
        .img-3 {
            width: 1029px;
            height: 301px;
        }
    }
}
.i-Sula .document {
    margin-bottom: 200px;
    .tab-list {
        display: flex;
        flex-direction: row;
        margin: 30px 0 34px 0;
        .item {
            font-size: 20px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 48px;
            margin-right: 50px;
            cursor: pointer;
        }
        .active {
            border-bottom: 4px solid #002FA7;
            color: rgba(0, 0, 0, 0.7);
        }
    }
    .doc-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 940px;
        margin: 0 auto;
        .item {
            width: 280px;
            height: 150px;
            background: #FFFFFF;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            display: flex;
            border-radius: 8px;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            margin-right: 50px;
            &:nth-of-type(3) {
                margin-right: 0;
                p {
                    font-size: 16px;
                    &:first-of-type {
                        font-size: 18px;
                        margin-bottom: 8px;
                    }
                }
            }
            img {
                width: 100px;
                height: 100px;
                display: block;
                margin: 0 20px 0 30px;
            }
            p {
                color: #002FA7;
                line-height: 28px;
                cursor: pointer;
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .i-Sula .framework-desc,.i-Sula .document,.i-Sula .framework-img,
    .i-Sula .title,.i-Sula .isula-desc{
        width: 100%;
        margin: 0 auto;
    }
    .i-Sula .title {
        width: 315px;
        margin: 37px auto 0 auto;
        font-size: 18px;
        line-height: 18px;
        span {
            font-size: 16px;
            line-height: 26px;
            left: 44%;
            top: -17px;
            white-space:nowrap;
        }
    }
    .i-Sula .isula-banner {
        flex-direction: column-reverse;
        width: 375px;
        margin: 0 auto 20px auto;
        position: relative;
        .text {
            margin: 20px auto 10px auto;
            width: 315px;
            flex-direction: column;
            &>div {
                margin: 0 auto;
            }
            p {
                line-height: 20px;
                text-align: center;
                font-size: 18px;
                color: #002FA7;
                margin-top: 20px;
                &:first-of-type {
                    font-size: 28px;
                    line-height: 30px;
                    margin: 0 0 16px 0;
                    color: #000000;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 38px;
                }
            }
            img {
                margin: 20px auto 0 auto;
                width: 81px;
                height: 84px;
            }
        }
        img {
            width: 260px;
            height: 200px;
            display: block;
            margin: 68px auto 0 auto;
        }
    }
    .i-Sula .desc-box {
        background-image: none;
        .isula-desc {
            .link {
                flex-direction: column;
                width: 315px;
                margin: 0 auto 31px auto;
                align-items: center;
                &>div {
                    margin-bottom: 21px;
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                }
                img {
                    width: 176px;
                    height: 141px;
                    margin: 0 auto;
                }
                p {
                    font-size: 16px;
                    line-height: 30px;
                }
                .guide {
                    width: 200px;
                }
            }
            p {
                width: 315px;
                margin: 0 auto;
            }
            .up-text {
                margin-bottom: 40px;
            }
            img {
                width: 360px;
                height: 122px;
                margin: 19px auto 40px auto;
            }
        }
    }
    .i-Sula .framework-box {
        .framework-desc {
            .tab-list {
                width: 315px;
                margin: 30px auto 34px auto;
                .item {
                    font-size: 16px;
                    line-height: 26px;
                    margin-right: 16px;
                }
                .active {
                    border-bottom: 2px solid #002FA7;
                    color: #000000;
                }
            }
            .description {
                p {
                    font-size: 16px;
                    color: rgba(0, 0, 0, 0.75);
                    line-height: 30px;
                    width: 315px;
                    margin: 0 auto;
                }
            }
            .indent {
                p {
                    text-indent: 0;
                }
            }
        }
        .framework-img {
            p {
                font-size: 16px;
                color: rgba(0, 0, 0, 0.75);
                line-height: 30px;
                width: 315px;
                margin: 0 auto;
            }
            img {
                width: 368px;
                height: 350px;
                margin: 10px auto 20px auto;
            }
            .img-2 {
                width: 365px;
                height: 433px;
            }
            .img-3 {
                width: 371px;
                height: 109px;
            }
        }
    }
    .i-Sula .document {
        margin-bottom: 80px;
        .tab-list {
            width: 315px;
            margin: 30px auto 34px auto;
            .item {
                font-size: 16px;
                line-height: 26px;
                margin-right: 16px;
            }
            .active {
                border-bottom: 2px solid #002FA7;
                color: #000000;
            }
        }
        .doc-list {
            flex-direction: column;
            width: 100%;
            .item {
                margin: 0 auto;
                width: 260px;
                height: 120px;
                margin-bottom: 20px;
                box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                &:nth-of-type(3) {
                    margin: 0 auto 0 auto;
                    p {
                        font-size: 14px;
                        &:first-of-type {
                            font-size: 16px;
                            margin-bottom: 6px;
                        }
                    }
                }
                img {
                    width: 90px;
                    height: 90px;
                }
                p {
                    line-height: 26px;
                }
            }
        }
    }
}
.i-Sula .isula-banner .text > div {
    width: 280px;
}
.i-Sula .desc-box .isula-desc .up-text p {
    width: 880px;
}
.i-Sula .desc-box .isula-desc .up-text img {
    width: 139px;
    height: 144px;
}
</style>