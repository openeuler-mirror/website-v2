<template>
    <div class="contribution">
        <common-banner
        :inside-name="'COMMUNITY'"
        :outside-name="i18n.community.CONTRIBUTION_H5.TITLE"
        class="is-pc"
        ></common-banner>
        <div class="bgc is-pc" v-if="!isShowH5">
            <div class="methods is-pc">
                <div class="mail-guide"
                     v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                     :key="index">
                    <div class="step" :class="{'over-flow': index === 4}">
                        <a class="step-num" @click="go(item.LINK)">
                            <span :class="{'over-flow': index === 4}">{{ item.BUTTON }}</span>
                        </a>
                        <img :src="item.IMG" alt="">
                        <img :src="item.VIDEO" class="is-hidden" :class="{'over-flow': index === 4}">
                    </div>
                    <div :class="['guidance',ishide?'is-hide':'']" v-if="item.LINK?false:true">
                        <div class="angle"></div>
                        <p class="link-title">{{item.LINKADRESSLIST.TITLE}}</p>
                        <div class="linkbox">
                            <div class="linkList" v-for="(item,index) in item.LINKADRESSLIST.LINKMESSAGE" @click="go(item.LINKADRESS)">
                                <i :style="{backgroundImage:item.ICONIMAGE}"></i>
                                <span>{{item.TEXT}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map-rode">
                    <img class="is-pc rode-1" src="/img/community/contribution/rode1.svg" alt="">
                    <img class="is-pc plane-1" src="/img/community/contribution/plane1.svg" alt="">
                    <img class="is-pc rode-2" src="/img/community/contribution/rode2.svg" alt="">
                    <img class="is-pc plane-2" src="/img/community/contribution/plane2.svg" alt="">
                    <img class="is-pc rode-3" src="/img/community/contribution/rode3.svg" alt="">
                    <img class="is-pc plane-3" src="/img/community/contribution/plane3.svg" alt="">
                    <img class="is-pc rode-4" src="/img/community/contribution/rode4.svg" alt="">
                    <img class="is-pc plane-4" src="/img/community/contribution/plane4.svg" alt="">
                </div>
            </div>
        </div>

        <div class="is-h5 mail-list-H5" v-else>
            <h3 class="is-h5">{{ i18n.community.CONTRIBUTION_H5.MOBILE_TITLE }}</h3>
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                 :key="index">
                <div class="step-H5">
                    <div class="step-num"  @touchstart="go(item.LINK, isShowH5)">
                        <span>{{ item.BUTTON}}</span>
                    </div>
                    <img :src="item.MOBILEIMG" alt="">
                </div>
                <div :class="['guidance',ishide?'is-hide':'']" v-if="item.LINK?false:true">
                        <div class="angle"></div>
                        <p class="link-title">{{item.LINKADRESSLIST.TITLE}}</p>
                        <div class="linkbox">
                            <div class="linkList" v-for="(item,index) in item.LINKADRESSLIST.LINKMESSAGE" @click="go(item.LINKADRESS, isShowH5)">
                                <i :style="{backgroundImage:item.ICONIMAGE}"></i>
                                <span>{{item.TEXT}}</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contribution",
        data () {
            return {
                bkgImg: "/img/community/contribution/bkg-community.png",
                ishide:true
            }
        },
        mounted() {

        },
        methods: {
            es(selector) {
                let es = document.querySelectorAll(selector)
                if (es.length === 0) {
                    return null;
                } else {
                    return es;
                }
            },
            go(path, isH5) {
                if(path == ''){
                    this.ishide = !this.ishide;
                    return;
                }
                if(path.includes('https')){
                    if (isH5) {
                        window.location.href = path;
                    } else {
                        window.open(path);
                    }
                }else if(path.includes('cla')){
                    let routeUrl = this.$router.resolve(this.resolvePath(path));
                        window.open(routeUrl.href);
                }else{
                    if(path){
                        this.$router.push({
                            path: this.resolvePath(path)
                        });
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .contribution .common-banner .banner img {
        width: 0!important;
    }
    .is-pc .methods .mail-guide .step:hover {
        img {
            &:first-of-type {
                display: none;
            }
            &:last-of-type {
                display: block;
            }
        }
    }
</style>
<style scoped>
    .is-h5 {
        display: none;
    }
    .is-pc {
        display: block;
    }
    .methods {
        width: 1120px;
        margin: 0 auto;
    }
    .bgc.is-pc {
        background: url("/img/community/contribution/bkg-community.png");
        background-size: 100%;
        height: 780px;
        width: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
    }
    .mail-guide {
        max-width: 1120px;
        margin: 0 auto;
        position: relative;
    }
    .mail-guide .guidance{
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        padding: 10px 23px 23px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
        text-align: left;
        width: 200px;
        position: absolute;
        left: 36%;
        bottom: -87%;
    }
    .mail-guide .guidance .angle{
        margin-left: 30px;
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
    .mail-guide .is-hide{
        display: none;
    }
    .mail-guide .guidance .link-title{
        font-size: 14px;
        
        font-weight: normal;
        color: #000000;
        line-height: 18px;
    }
    .mail-guide .guidance .linkbox{
        width: 140px;
        height: 60px;
        display: flex;
        justify-content: space-between;
    }
    .mail-guide .guidance .linkbox .linkList{
        cursor: pointer;
         z-index: 10;
    }
    .mail-guide .guidance .linkbox .linkList i,.mail-guide .guidance .linkbox .linkList span{
        display: block;
    }
    .mail-guide .guidance .linkbox .linkList i{
       width:40px;
       height:40px;
       background-size: cover;
    }
    .mail-guide .guidance .linkbox .linkList span{
        font-size: 12px;
        
        font-weight: normal;
        color: #000000;
        line-height: 12px;
        text-align: center;
    }
    .step {
        width: 200px;
        text-align: right;
        position: relative;
    }
    .mail-guide:nth-child(1) .step {
        top: 30px;
        text-align: left;
    }
    .mail-guide:nth-child(2) .step {
        top: 180px;
        left: 20%;
        z-index: 200;
    }
    .mail-guide:nth-child(3) .step {
        top: -340px;
        left: 45%;
    }
    .mail-guide:nth-child(4) .step {
        top: -160px;
        left: 54%;
    }
    .mail-guide:nth-child(5) .step {
        top: -720px;
        left: 80%;
    }

    .step-num {
        display: inline-block;
        padding: 10px 15px;
        text-align: center;
        border-radius: 4px;
        background-color: #002FA7;
        margin: 0 auto;
        text-decoration: none;
        cursor: pointer;
    }
    .step.over-flow {
        width: 210px;
    }
    .step-num .over-flow {
        display: inline-block;
        max-width: 180px;
        text-align: left;
    }
    .step .is-hidden {
        display: none;
    }
    .lang-en .over-flow.is-hovered {
        top: 61px;
    }
    .step .is-hovered {
        display: block;
        position: absolute;
        top: 45px;
    }
    .step-num span {
        color: #fff;
        font-size: 16px;
    }
    .step img {
        display: block;
        height: 150px;
        width: 150px;
    }
    .map-rode {
        position: relative;
        top: -800px;
    }
    .rode-1 {
        position: absolute;
        left: 70px;
        top: 70px;
        z-index: -10;
    }
    .plane-1 {
        position: absolute;
        left: 30px;
        top: 170px;
        z-index: -10;
     }
    .rode-2 {
        position: absolute;
        left: 360px;
        top: 30px;
        z-index: -10;
    }
    .plane-2 {
        position: absolute;
        left: 320px;
        top: 85px;
        z-index: -10;
    }
    .rode-3 {
        position: absolute;
        left: 598px;
        top: 110px;
        z-index: -10;
    }
    .plane-3 {
        position: absolute;
        left: 541px;
        top: 184px;
        z-index: -12;
    }
    .rode-4 {
        position: absolute;
        left: 792px;
        top: 85px;
        z-index: -10;
    }
    .plane-4 {
        position: absolute;
        left: 876px;
        top: 195px;
        z-index: -10;
    }
    @media screen and (max-width: 1000px){
        .is-pc {
            display: none;
        }
        .is-h5 {
            display: block;
        }
        h3 {
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            margin: 40px 0 10px;
        }
        .mail-list-H5 {
            margin-bottom: 80px;
        }
        .step-H5 {
            margin: 40px auto;
            text-align: center;
        }
        .step-H5 img {
            display: block;
            width: 200px;
            height: 140px;
            margin: 10px auto 0;
        }
        .step-H5 p {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 24px;
            margin: 10px 30px;
            text-align: left;
        }
        .mail-guide .guidance{
            left:26%;
            bottom: 4%;
        }
    }
</style>