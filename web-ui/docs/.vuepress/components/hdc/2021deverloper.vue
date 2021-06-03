<template>
    <div class="containter">
        <div>
            <img :src="'/img/hdc/2021-developer/banner-'+deviceText" class="banner" />
        </div>
        <img :src="'/img/hdc/2021-developer/first-title-'+deviceText" class="first-title" />
        <div class="first-desc">
            <p>
                华为开发者· openEuler 赛道是面向openEuler
                社区的开发者个人赛。开发者可以通过参加大赛，加速 openEuler
                社区修复项目漏洞，参与 openEuler
                社区的最新特性开发，掌握操作系统领域的最新技术方向。您的名字会铭刻在
                openEuler 社区发展的伟大进程之中。赶快来openEuler
                社区的参与代码贡献吧，让我们携手共建最具活力的操作系统开源社区。
            </p>
            <p>
                openEuler
                是一个开源、免费的Linux发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。
            </p>
        </div>
        <img :src="'/img/hdc/2021-developer/second-title-'+deviceText" class="second-title" />
        <div class="channel">
            <div class="channel-left">
                    <div class="info-box">
                        <h4>任务打榜赛</h4>
                        <p>参赛对象：个人开发者</p>
                        <img class="isH5" src="/img/hdc/2021-developer/h5-mission.png" alt="">
                        <a href="https://competition.huaweicloud.com/information/1000041420/introduction" target="_blank">全国统一报名入口</a>
                    </div>
                    <img class="isPc" src="/img/hdc/2021-developer/pc-mission.png" alt="">
            </div>
            <div class="channel-right">
                <div class="channel-info">
                    <div class="r-top">
                        <div class="info-box">
                            <h4>特性命题赛</h4>
                            <p>参赛对象：开发者团队</p>
                            <img class="isH5" src="/img/hdc/2021-developer/h5-feature.png" alt="">
                            <p class="btn2">区域报名入口
                                <img src="/img/hdc/2021-developer/open.svg" alt="">
                            </p>
                        </div>
                        <img class="isPc" src="/img/hdc/2021-developer/pc-feature.png" alt="">
                    </div>
                    <p class="r-ps">注：请按所属地区点击以下入口报名参赛（按首字母顺序排列）</p>
                    <div class="join-city">
                        <a class="city-item" target="_blank" :style="{backgroundImage: item.img}" v-for="(item,index) in cityData" :key="index" @click="go(item.link)" v-if="item.link">
                            
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <img :src="'/img/hdc/2021-developer/fourth-title-'+deviceText" class="fourth-title" />
        <div class="fourth-wrapper" v-if="score[curKey]">
            <div class="pc" v-if="!isShowH5">
                <div class="tabs">
                    <div :class="'item ' + (curKey==='weekly'?'active':'')" @click="swichTab('weekly')">
                        <div class="title">周榜单</div>
                        <div class="date">{{score.weeklyRange}}</div>
                    </div>
                    <div :class="'item ' + (curKey==='monthly'?'active':'')" @click="swichTab('monthly')">
                        <div class="title">月榜单</div>
                        <div class="date">{{score.monthlyRange}}</div>
                    </div>
                    <div :class="'item ' + (curKey==='total'?'active':'')" @click="swichTab('total')">
                        <div class="title">总榜单</div>
                        <div class="date">{{score.totalRange}}</div>
                    </div>
                </div>
                <div class="score-list">
                    <div class="top-three">
                        <div class="top-item second">
                            <div class="user-info">
                                <div class="name" @click="go(score[curKey][1].name==='虚位以待'?'':giteeUrl+score[curKey][1].name)">
                                    {{score[curKey][1].name}}
                                </div>
                                <div class="score">
                                    <span>{{score[curKey][1].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第二名</div>
                        </div>
                        <div class="top-item first">
                            <div class="user-info">
                                <div class="name" @click="go(score[curKey][0].name==='虚位以待'?'':giteeUrl+score[curKey][0].name)">
                                    {{score[curKey][0].name}}
                                </div>
                                <div class="score">
                                    <span>{{score[curKey][0].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第一名</div>
                        </div>
                        <div class="top-item three">
                            <div class="user-info">
                                <div class="name" @click="go(score[curKey][2].name==='虚位以待'?'':giteeUrl+score[curKey][2].name)">
                                    {{score[curKey][2].name}}
                                </div>
                                <div class="score">
                                    <span>{{score[curKey][2].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第三名</div>
                        </div>
                    </div>
                    <ul class="other">
                        <li v-for="(item, index) in score[curKey].slice(3)" :key="index">
                            <div class="left">
                                <span class="index">{{index+4<10?'0'+(index+4):(index+4)}}</span>
                                <span class="name" @click="go(item.name==='虚位以待'?'':giteeUrl+item.name)">{{item.name}}</span>
                            </div>
                            <div class="right">
                                <span class="score">{{item.score||'-'}}</span>
                                <span>积分</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pc"v-if="isShowH5">
                <div class="tabs">
                    <div class="title">
                        周榜单
                    </div>
                    <div class="date">
                        {{score.weeklyRange}}
                    </div>
                </div>
                <div class="score-list">
                    <div class="top-three">
                        <div class="top-item second">
                            <div class="user-info">
                                <div class="name" @click="go(score.weekly[1].name==='虚位以待'?'':giteeUrl+score.weekly[1].name)">
                                    {{score.weekly[1].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.weekly[1].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第二名</div>
                        </div>
                        <div class="top-item first">
                            <div class="user-info">
                                <div class="name" @click="go(score.weekly[0].name==='虚位以待'?'':giteeUrl+score.weekly[0].name)">
                                    {{score.weekly[0].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.weekly[0].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第一名</div>
                        </div>
                        <div class="top-item three">
                            <div class="user-info">
                                <div class="name" @click="go(score.weekly[2].name==='虚位以待'?'':giteeUrl+score.weekly[2].name)">
                                    {{score.weekly[2].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.weekly[2].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第三名</div>
                        </div>
                    </div>
                    <ul class="other">
                        <li v-for="(item, index) in score.weekly.slice(3)" :key="index">
                            <div class="left">
                                <span class="index">{{index+4<10?'0'+(index+4):(index+4)}}</span>
                                <span class="name" @click="go(item.name==='虚位以待'?'':giteeUrl+item.name)">{{item.name}}</span>
                            </div>
                            <div class="right">
                                <span class="score">{{item.score||'-'}}</span>
                                <span>积分</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pc"v-if="isShowH5">
                <div class="tabs">
                    <div class="title">
                        月榜单
                    </div>
                    <div class="date">
                        {{score.monthlyRange}}
                    </div>
                </div>
                <div class="score-list">
                    <div class="top-three">
                        <div class="top-item second">
                            <div class="user-info">
                                <div class="name" @click="go(score.monthly[1].name==='虚位以待'?'':giteeUrl+score.monthly[1].name)">
                                    {{score.monthly[1].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.monthly[1].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第二名</div>
                        </div>
                        <div class="top-item first">
                            <div class="user-info">
                                <div class="name" @click="go(score.monthly[0].name==='虚位以待'?'':giteeUrl+score.monthly[0].name)">
                                    {{score.monthly[0].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.monthly[0].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第一名</div>
                        </div>
                        <div class="top-item three">
                            <div class="user-info">
                                <div class="name" @click="go(score.monthly[2].name==='虚位以待'?'':giteeUrl+score.monthly[2].name)">
                                    {{score.monthly[2].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.monthly[2].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第三名</div>
                        </div>
                    </div>
                    <ul class="other">
                        <li v-for="(item, index) in score.monthly.slice(3)" :key="index">
                            <div class="left">
                                <span class="index">{{index+4<10?'0'+(index+4):(index+4)}}</span>
                                <span class="name" @click="go(item.name==='虚位以待'?'':giteeUrl+item.name)">{{item.name}}</span>
                            </div>
                            <div class="right">
                                <span class="score">{{item.score||'-'}}</span>
                                <span>积分</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pc"v-if="isShowH5">
                <div class="tabs">
                    <div class="title">
                        总榜单
                    </div>
                    <div class="date">
                        {{score.totalRange}}
                    </div>
                </div>
                <div class="score-list">
                    <div class="top-three">
                        <div class="top-item second">
                            <div class="user-info">
                                <div class="name" @click="go(score.total[1].name==='虚位以待'?'':giteeUrl+score.total[1].name)">
                                    {{score.total[1].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.total[1].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第二名</div>
                        </div>
                        <div class="top-item first">
                            <div class="user-info">
                                <div class="name" @click="go(score.total[0].name==='虚位以待'?'':giteeUrl+score.total[0].name)">
                                    {{score.total[0].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.total[0].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第一名</div>
                        </div>
                        <div class="top-item three">
                            <div class="user-info">
                                <div class="name" @click="go(score.total[2].name==='虚位以待'?'':giteeUrl+score.total[2].name)">
                                    {{score.total[2].name}}
                                </div>
                                <div class="score">
                                    <span>{{score.total[2].score||'-'}}</span>积分
                                </div>
                            </div>
                            <div class="floor">第三名</div>
                        </div>
                    </div>
                    <ul class="other">
                        <li v-for="(item, index) in score.total.slice(3)" :key="index">
                            <div class="left">
                                <span class="index">{{index+4<10?'0'+(index+4):(index+4)}}</span>
                                <span class="name" @click="go(item.name==='虚位以待'?'':giteeUrl+item.name)">{{item.name}}</span>
                            </div>
                            <div class="right">
                                <span class="score">{{item.score||'-'}}</span>
                                <span>积分</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <img :src="'/img/hdc/2021-developer/third-title-'+deviceText" class="third-title" />
        <div class="third-wrapper">
            <div class="left">
                <p>
                    openEuler 社区创建了一个赛事交流的微信群，添加 openEuler
                    小助手备注“华为开发者大赛”即可入群。
                </p>
                <p>
                    微信号“openEuler小助手”：SoftCorePro，小助手会为参赛者实时进行答疑解惑的贴心服务，及时为参赛者解决问题。
                </p>
                <p>小助手在线时间：每天9:00~18:00。</p>
            </div>
            <img src="/img/hdc/2021-developer/qrcode.png" class="right" />
        </div>
    </div>
</template>

<script>
import {getGiteeJson} from "./../../api/common";

export default {
    data() {
        return {
            deviceText: '',
            cityData: [
                {
                    city: '北京',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_beijing.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041447/introduction'
                },
                {
                    city: '重庆',
                    open: '即将开放',
                    img: 'url("/img/hdc/2021-developer/img_chongqing.png")',
                    link: ''
                },
                {
                    city: '福建',
                    open: '即将开放',
                    img: 'url("/img/hdc/2021-developer/img_fujian.png")',
                    link: ''
                },
                {
                    city: '广西',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_guangxi.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041437/introduction'
                },
                {
                    city: '广州',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_guangzhou.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041451/introduction'
                },
                {
                    city: '河北',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_hebei.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041424/introduction'
                },
                {
                    city: '河南',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_henan.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041454/introduction'
                },
                {
                    city: '湖北',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_hubei.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041422/introduction'
                },
                {
                    city: '湖南',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_hunan.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041466/introduction'
                },
                {
                    city: '吉林',
                    open: '即将开放',
                    img: 'url("/img/hdc/2021-developer/img_jilin.png")',
                    link: ''
                },
                {
                    city: '江苏',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_jiangsu.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041443/introduction'
                },
                {
                    city: '辽宁',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_liaoning.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041442/introduction'
                },
                {
                    city: '山东',
                    open: '即将开放',
                    img: 'url("/img/hdc/2021-developer/img_shandong.png")',
                    link: ''
                },
                {
                    city: '山西',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_shanxi.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041471/circumstance'
                },
                {
                    city: '陕西',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_shanxi3.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041473/introduction'
                },
                {
                    city: '上海',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_shanghai.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041433/introduction'
                },
                {
                    city: '深圳',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_shenzhen.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041448/introduction'
                },
                {
                    city: '四川',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_sichuan.png")',
                    link: ''
                },
                {
                    city: '浙江',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_hangzhou.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041430/introduction'
                },
                {
                    city: '贵州',
                    open: '立即报名',
                    img: 'url("/img/hdc/2021-developer/img_guizhou.png")',
                    link: 'https://competition.huaweicloud.com/information/1000041494/cirumastance'
                },
            ],
            score: {},
            curKey: 'weekly',
            giteeUrl:'https://gitee.com/'
        };
    },
    methods: {
        go(link) {
            if (link == '') {
                return false;
            } else {
                window.open(link);
            }
        },
        swichTab(str) {
            this.curKey = str;
        }
    },
    mounted: function() {
        this.deviceText = this.isShowH5 ? 'h5.png' : 'pc.png';
        getGiteeJson('hdc-2021-developer/score.json').then((res) => {
            this.score = res;
        });
    }
};
</script>

<style lang="less" scoped>
.containter {
    width: 1120px;
    margin: 0 auto 200px;
    text-align: center;
    @media screen and (max-width: 1120px){
        margin-bottom: 80px;
        width: 100%;
    }
    .banner {
        margin-bottom: 60px;
        @media screen and (max-width: 1000px) {
            width: 375px;
            height: 300px;
            margin-bottom: 40px;
        }
    }
    .first-title {
        margin: 0 auto 30px;
        @media screen and (max-width: 1000px) {
            margin-bottom: 20px;
        }
    }
    .first-desc {
        margin-bottom: 50px;
        font-size: 18px;
        line-height: 40px;
        color: #000;
        text-align: left;
        @media screen and (max-width: 1000px) {
            padding: 0 30px;
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 30px;
        }
    }
    .second-title {
        margin: 0 auto 30px;
    }
    .isPc {
        display: block;
    }
    .isH5 {
        display: none;
    }
    .channel h4 {
        font-weight: normal;
        font-size: 32px;
        color: #002FA7;
        margin-top: 24px;
    }
    .channel-left {
        display: flex;
        justify-content: space-between;
        width: 660px;
        background: #FEB32A;
        border-radius: 8px;
    }
    .channel-left .isPc,.channel-right .isPc {
        width: 260px;
        height: 140px;
    }
    .channel a {
        display: block;
    }

    .channel a {
        text-decoration: none;
    }
    .channel-right,
    .channel-left {
        padding: 0 40px;
        margin: 0 auto 40px;
    }

    .channel-left p{
        color: #000000!important;
        margin: 8px 0;
    }
    .channel-right p {
        color: #FFFFFF!important;
        margin: 8px 0;
    }

    .channel-left a {
        width: 160px;
        height: 40px;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
        background: #002FA7;
        border-radius: 4px;
        margin-bottom: 16px;
        text-decoration: none;
    }
    .channel-right {
        background: #002FA7;
        width: 660px;
        border-radius: 8px;
    }
    .channel-right .btn2 {
        width: 160px;
        height: 40px;
        background: #FEB32A;
        border-radius: 4px;
        margin-bottom: 16px;
        color: #002fa7 !important;
        text-align: center;
        line-height: 40px!important;
    }
    .r-top {
        display: flex;
        justify-content: space-between;
    }
    .r-top h4 {
        color: #FEB32A;
    }
    .r-ps {
        font-size: 12px!important;
    }
    .join-city {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
    .hdc-code {
        width: 100%;
        text-align: center;
    }
    .city-item {
        width: 75px;
        height: 90px;
        margin-bottom: 20px;
        margin-right: 46px;
        cursor: pointer;
        background-size: contain;
    }
    .city-item:nth-child(5n) {
        margin-right: 0;
    }
    .btn2 img {
        margin-left: 18px;
    }
    @media screen and (max-width: 1000px) {
        .isPc {
            display: none;
        }
        .isH5 {
            display: block;
        }
        .channel {
            display: block;
            text-align: center;
            padding: 0 15px;
        }
        #hdc-2021 h1 {
            margin-bottom: 30px;
        }
        .hdc-code img {
            margin-top: 30px;
            width: 200px;
        }
        .channel-right,
        .channel-left {
            width: 100%;
        }
        .channel-left .info-box>img,
        .channel-right .info-box>img {
            width: 120px;
            height: 100px;
            display: block;
            margin: 0 auto;
        }
        .channel-right .btn2 {
            margin: 0 auto 16px;
        }
        .channel-right, .channel-left {
            padding: 0;
        }
        .info-box {
            margin: 0 auto;
        }
        .join-city {
            text-align: left;
            display: block;
            padding: 0 10px;
            font-size: 14px;
            -webkit-text-size-adjust:none;
            padding-bottom: 12px;
        }
        .channel a {
            display: inline-block;
        }
    }
    @media screen and (min-width: 620px) and (max-width: 1000px) {
        .join-city {
            width: 580px;
            margin: 0 auto;
        }
    }
    @media screen and (min-width: 500px) and (max-width: 620px) {
        .join-city {
            width: 460px;
            margin: 0 auto;
        }
        .city-item:nth-child(5n) {
            margin-bottom: 20px;
            margin-right: 46px;
        }
        .city-item:nth-child(4n) {
            margin-right: 0;
        }
    }
    @media screen and (min-width: 360px) and (max-width: 500px) {
        .join-city {
            width: 340px;
            margin: 0 auto;
        }
        .city-item:nth-child(5n) {
            margin-bottom: 20px;
            margin-right: 46px;
        }
        .city-item:nth-child(3n) {
            margin-right: 0;
        }
    }
    @media screen and (max-width: 360px) {
        .banner {
            width: 300px;
            height: 240px;
        }
        .join-city {
            width: 220px;
            margin: 0 auto;
        }
        .city-item:nth-child(5n) {
            margin-bottom: 20px;
            margin-right: 46px;
        }
        .city-item:nth-child(2n) {
            margin-right: 0;
        }
    }

    .third-title {
        margin: 0 auto 30px;
        @media screen and (max-width: 1000px) {
            margin-bottom: 20px;
        }
    }
    .third-wrapper {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        line-height: 40px;
        color: #000;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
            padding: 0 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .left {
            width: 805px;
            flex-shrink: 1;
            @media screen and (max-width: 1000px) {
                width: unset;
                flex-shrink: unset;
                margin-bottom: 20px;
            }
            text-align: left;
        }
        .right {
            width: 200px;
            height: 200px;
        }
    }

    .fourth-title {
        margin: 0 auto 30px;
    }

    .fourth-wrapper {
        width: 660px;
        margin: 0 auto 55px;
        @media screen and (max-width: 1000px) {
            width: 100%;
            padding: 0 15px;
            .pc {
                margin-bottom: 30px;
            }
        }
        
        .pc .tabs {
            height: 160px;
            background-color: #3165e8;
            border-radius: 8px 8px 0 0;
            display: flex;
            @media screen and (max-width: 1000px) {
                display: block;
                height: 160px;
                text-align: left;
                background-image: url("/img/hdc/2021-developer/score-bg-h5.png");
                background-size: 100% 100%;
                padding-top: 47px;
                .title {
                    margin: 0 0 2px 32px;
                    color: #002fa7;
                    font-size: 32px;
                    line-height: 32px;
                }
                .date {
                    margin: 0 0 0 32px;
                    color: #000;
                    font-size: 14px;
                    line-height: 32px;
                }
            }
            .item {
                cursor: pointer;
                height: 160px;
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .title {
                    font-size: 32px;
                    line-height: 32px;
                    margin-bottom: 2px;
                    color: #feb32a;
                }
                .date {
                    font-size: 14px;
                    line-height: 32px;
                    color: #feb32a;
                }
            }
            .active {
                height: 174px;
                border-radius: 8px 8px 0 0;
                background-image: url("/img/hdc/2021-developer/score-bg-pc.png");
                background-size: 100% 100%;
                margin-top: -14px;
                .title {
                    font-size: 32px;
                    line-height: 32px;
                    margin-bottom: 2px;
                    color: #002fa7;
                }
                .date {
                    font-size: 14px;
                    line-height: 32px;
                    color: #000;
                }
            }
        }
        .pc .score-list {
            padding: 50px 40px;
            border-radius: 0 0 8px 8px;
            background-color: #002fa7;
            .top-three {
                padding: 0 36px 50px;
                display: flex;
                .top-item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    .user-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        .name {
                            font-size: 14px;
                            line-height: 16px;
                            margin-bottom: 10px;
                            cursor: pointer;
                            @media screen and (max-width: 1000px) {
                                font-size: 12px;
                            }
                        }
                        .score {
                            font-size: 14px;
                            line-height: 16px;
                            margin-bottom: 20px;
                            span {
                                color: #f9762d;
                                font-size: 18px;
                                margin-right: 10px;
                            }
                            @media screen and (max-width: 1000px) {
                                font-size: 12px;
                                margin-bottom: 10px;
                            }
                        }
                    }
                    .floor {
                        font-size: 24px;
                        color: #feb32a;
                        @media screen and (max-width: 1000px) {
                            font-size: 16px;
                        }
                    }
                }
                .second .floor {
                    height: 66px;
                    line-height: 66px;
                    border-left: 1px solid #feb32a;
                    border-top: 1px solid #feb32a;
                    border-bottom: 1px solid #feb32a;
                    @media screen and (max-width: 1000px) {
                        height: 60px;
                        line-height: 60px;
                    }
                }
                .first .floor {
                    line-height: 106px;
                    height: 104px;
                    border: 1px solid #feb32a;
                    @media screen and (max-width: 1000px) {
                        height: 85px;
                        line-height: 85px;
                    }
                }
                .three .floor {
                    line-height: 48px;
                    height: 48px;
                    border-right: 1px solid #feb32a;
                    border-top: 1px solid #feb32a;
                    border-bottom: 1px solid #feb32a;
                    @media screen and (max-width: 1000px) {
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
            .other li {
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                color: #fff;
                border-top: 1px dashed #3165eb;
                @media screen and (max-width: 1000px) {
                    height: 44px;
                    font-size: 12px;
                }
                .left .index {
                    font-size: 24px;
                    color: #feb32a;
                    margin-right: 20px;
                    @media screen and (max-width: 1000px) {
                        font-size: 16px;
                        margin-right: 10px;
                    }
                }
                .left .name {
                    cursor: pointer;
                }
                .right .score {
                    font-size: 18px;
                    color: #f9762d;
                    margin-right: 30px;
                    @media screen and (max-width: 1000px) {
                        font-size: 14px;
                        margin-right: 6px;
                    }
                }
            }
            @media screen and (max-width: 1000px) {
                padding: 20px;
                .top-three {
                    padding: 0 0 20px;
                }
            }
        }
    }
}
</style>