<!-- 峰会首页 -->
<template>
    <div :class="['summit',mobilePadding?'mobile-padding':'']">
        <div class="summit-nav" v-show="isShowNav" v-if="!isShowH5">
            <div class="box-line">
                <img class="gif" src="/img/summit/home/nav.gif" alt="" />
                <img class="line" src="/img/summit/home/line.png" alt="" />
            </div>
            <div class="nav-text">
                <ul>
                    <li v-for="(item,index) in i18n.interaction.SUMMIT.NAV_LIST" @click="goTitle(index)" :class="index === activeIndex?'active':''">
                        <div><div class="inside"></div></div>
                        <div>{{ item }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <h3 v-if="isShowH5">{{ i18n.interaction.SUMMIT.SUMMIT }}</h3>
        <div class="top-banner" v-if="!isShowH5" @click="go('https://jinshuju.net/f/PEFJht?x_field_1=openeuler')">
            <video autoplay loop muted width="700px" height="380px" id="summit-mp4">
                <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler%20Summit%202020%20mov.mp4"  type="video/mp4">
            </video>
            <img class="top-img" :src="i18n.interaction.SUMMIT.SUMMIT_WEB_IMG" alt="" />
        </div>
        <img class="mobile-img" :src="i18n.interaction.SUMMIT.SUMMIT_H5_IMG" alt="" v-else @click="go('https://jinshuju.net/f/PEFJht?x_field_1=openeuler')" />
        <div class="summit-content">
            <div class="summit-explain">
                <p :class="$lang === 'en'?'font-regular':''" v-for="(item,index) in i18n.interaction.SUMMIT.SUMMITCONTENT">{{ item }}</p>
            </div>
            <p class="tip" v-if="$lang === 'zh'">{{ i18n.interaction.SUMMIT.SUMMITTIP.slice(0,31) }}
                <a href="https://jinshuju.net/f/PEFJht?x_field_1=openeuler" target="_blank">
                {{ i18n.interaction.SUMMIT.SUMMITTIP.slice(31,35) }}</a>
                {{ i18n.interaction.SUMMIT.SUMMITTIP.slice(35) }}
            </p>
            <p class="tip font-bold" v-else>{{ i18n.interaction.SUMMIT.SUMMITTIP.slice(0,10) }}
                <a href="https://jinshuju.net/f/PEFJht?x_field_1=openeuler" target="_blank">
                {{ i18n.interaction.SUMMIT.SUMMITTIP.slice(10,14) }}</a>
                {{ i18n.interaction.SUMMIT.SUMMITTIP.slice(14) }}
            </p>
            <div class="summit-message">
                <div class="agenda" title-id="agenda">
                    <div :class="['title',$lang === 'en'?'en-title':'']">
                         <img :src="agendaData.WEB_TITLE" alt="" v-if="!isShowH5" />
                         <img :src="agendaData.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="time-box">
                        <el-tabs v-model="showTab" @tab-click="tabClick">
                            <el-tab-pane :label="dateArr[0]" name="twenty-four"></el-tab-pane>
                            <el-tab-pane :label="dateArr[1]" name="twenty-five"></el-tab-pane>
                        </el-tabs>
                        <el-radio-group v-model="showBtn" @change="changeTime" v-show="isShowBtn">
                            <el-radio-button label="forenoon">{{ dateArr[2] }}</el-radio-button>
                            <el-radio-button label="afternoon">{{ dateArr[3] }}</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="calendar-content" v-show="!isShowcarousel">
                        <el-table
                        :data="agendaTableData"
                        :show-header=false
                        style="width: 100%" v-if="!isShowH5">
                            <el-table-column
                                prop="icon"
                                width="50">
                                <i class="el-icon-time"></i>
                            </el-table-column>
                            <el-table-column
                                prop="TIME"
                                width="190">
                            </el-table-column>
                            <el-table-column
                                prop="THEME"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="SPEAKER"
                                width="230">
                            </el-table-column>
                            <el-table-column
                                prop="POSITION"
                                width="250">
                            </el-table-column>
                        </el-table>
                        <div class="mobile-table" v-if="isShowH5">
                            <div class="item" v-for="(item,index) in agendaTableData" :key="index">
                                <div class="time">{{ item.TIME }}</div>
                                <div class="agenda">
                                    <p>{{ item.THEME }}</p>
                                    <p>
                                        <span>{{ item.SPEAKER }}</span>
                                        <span>{{ item.POSITION }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <carousel v-show="isShowcarousel"></carousel>
                </div>
                <div class="lecturer" title-id="lecturer">
                    <div class="title">
                        <img :src="lecturerObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="lecturerObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="lecturer-box" v-fade v-if="lecturerList.length && !isShowH5">
                        <div class="item fade-in"  v-for="(item,index) in lecturerList" :key="index">
                            <img :src="item.IMG" alt="" />
                            <p>{{ item.NAME }}</p>
                            <p>{{ item.POSITION }}</p>
                        </div>
                    </div>
                    <div class="lecturer-box" v-fade v-if="lecturerList.length && isShowH5">
                        <div :class="['item','fade-in',index > 7 && flag?'hidden':'']"  v-for="(item,index) in lecturerList" :key="index">
                            <img :src="item.IMG" alt="" />
                            <p>{{ item.NAME }}</p>
                            <p>{{ item.POSITION }}</p>
                        </div>
                    </div>
                    <div class="show-all" @click="showAll" v-if="isShowH5">
                        <p>{{ flag?i18n.home.EXPAND:i18n.home.RETRACT }}</p>
                        <img v-if="flag" src="/img/home/arrow.svg" alt="">
                        <img v-if="!flag" src="/img/home/arrowUp.svg" alt="">
                    </div>
                </div>
                <div class="host-unit" title-id="host-unit">
                    <div class="title">
                        <img :src="hostUnitObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="hostUnitObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="img-list">
                        <img :src="item.IMG" alt="" v-for="(item,index) in hostUnitObj.LIST" />
                    </div>
                </div>
                <div class="undertaker">
                    <div class="title">
                        <img :src="undertakerObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="undertakerObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img :src="item.IMG" alt="" v-for="(item,index) in undertakerObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="co-organizer">
                    <div class="title">
                        <img :src="coOrgObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="coOrgObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img :src="item.IMG" alt="" v-for="(item,index) in coOrgObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="foundation">
                    <div class="title">
                        <img :src="foundationObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="foundationObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img :src="item.IMG" alt="" v-for="(item,index) in foundationObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="media">
                    <div class="title">
                        <img :src="mediaObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="mediaObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="media-box">
                        <img :src="item.IMG" alt="" v-for="(item,index) in mediaObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="review" title-id="review">
                    <div class="title">
                        <img :src="reviewObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img :src="reviewObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <img class="review-banner card-hover" src="/img/summit/home/review/review-img.png" alt="" @click="go('/interaction/summit-list/list/')" v-if="!isShowH5"/>
                    <img class="review-banner" src="/img/summit/home/review/mobile-review-img.png" alt="" @click="go('/interaction/summit-list/list/')" v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import carousel from './carousel.vue';
export default {
    data () {
        return {
            showTab: 'twenty-five',
            showBtn: 'forenoon',
            agendaData: {},
            dateArr: [],
            agendaTableData: [],
            isShowcarousel: false,
            isShowBtn: true,
            mobilePadding: false,
            hostUnitObj: {},
            coOrgObj: {},
            foundationObj: {},
            undertakerObj: {},
            lecturerObj: {},
            lecturerList: [],
            mediaObj: {},
            reviewObj: {},
            flag: true,
            dataObj: {},
            navTitleScroll: [600,1977,5177,7977],
            activeIndex: -1,
            isShowNav: false
        }
    },
    mounted() {
        this.dataObj = this.i18n.interaction.SUMMIT.SUMMIT_HOME_DATA;
        this.agendaData = this.dataObj.AGENDA;
        this.dateArr = this.agendaData.DATE;
        this.mediaObj = this.dataObj.MEDIA;
        this.hostUnitObj = this.dataObj.HOST;
        this.undertakerObj = this.dataObj.UNDERTAKER;
        this.coOrgObj = this.dataObj.CO_ORGANIZER;
        this.foundationObj = this.dataObj.FOUNDATION;
        this.agendaTableData = this.agendaData.FORENOON_AGENDA_25;
        this.lecturerObj = this.dataObj.LECTURER;
        this.lecturerList = this.lecturerObj.LECTURERLIST;
        this.reviewObj = this.dataObj.REVIEW;
        let screenWidth = document.body.clientWidth;
        if(screenWidth < 400) {
            this.mobilePadding = true;
        }
        window.addEventListener('scroll',this.scroTop);
    },
    methods: {
        toReviewList () {
            let routeUrl = this.$router.resolve(this.resolvePath('/interaction/summit-list/list/'));
            window.open(routeUrl.href);
        },
        go(path) {
            if(path) {
                if(path && path.includes("http")) {
                    window.open(path);
                }else{
                    this.$router.push('/' + this.$lang + path);
                }
            }else {
                return false;
            }
        },
        showAll() {
            this.flag = !this.flag;
        },
        tabClick(tab) {
            if(tab.name === 'twenty-four') {
                this.isShowcarousel = false;
                this.agendaTableData = this.agendaData.AFTERNOON_AGENDA_24;
                this.isShowBtn = false;
            }else if(tab.name === 'twenty-five') {
                this.isShowcarousel = false;
                this.isShowBtn = true;
                this.agendaTableData = this.agendaData.FORENOON_AGENDA_25;
                this.showBtn = 'forenoon';
            }else {
                return false;
            }
        },
        changeTime(tab) {
            if(tab === 'forenoon') {
                this.agendaTableData = this.agendaData.FORENOON_AGENDA_25;
                this.isShowcarousel = false;
            }else if(tab === 'afternoon'){
                this.isShowcarousel = true;
            }else {
                return false;
            }
        },
        goTitle(index) {
            document.documentElement.scrollTop = this.navTitleScroll[index];
        },
        scroTop(param) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 500) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 600 && scrollTop <800) {
                this.activeIndex = 0;
            }else if(scrollTop > 1800 && scrollTop < 3000) {
                this.activeIndex = 1;
            }else if(scrollTop > 5000 && scrollTop < 6200) {
                this.activeIndex = 2;
            }else if(scrollTop > 7800) {
                this.activeIndex = 3;
            }else {
                return false;
            }
        }
    },
    components: {
        carousel
    },
    destroyed () { 
        window.removeEventListener('scroll', this.scroTop)
    } 
}

</script>

<style lang='less' scoped>
.font-regular {
    font-family: Roboto-Regular;
}
.font-bold {
    font-family: Roboto-BoldCondensed;
}
.card-hover:hover {
    box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
    cursor: pointer;
}
.mobile-padding {
    @media screen and (max-width: 1000px) {
        padding: 40px 15px 126px 15px !important;
    }
}
.summit {
    padding-bottom: 180px;
    .top-banner {
        width: 1120px;
        height: 380px;
        position: relative;
        margin: 0 auto;
        cursor: pointer;
        #summit-mp4 {
            position: absolute;
            left: -70px;
        }
        .top-img{
            width: 430px;
            height: 380px;
            right: 50px;
            position: absolute;
        }
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
.summit .summit-nav {
    position: fixed;
    cursor: pointer;
    top: 170px;
    right: 70px;
    z-index: 1000;
    display: block;
    font-family: FZLTHJW;
    .box-line {
        width: 70px;
        margin-left: -26px;
        .gif {
            width: 70px;
            height: 70px;
            margin: 0 auto -30px auto;
            position: relative;
            z-index: 20;
        }
        .line {
            display: block;
            width: 2px;
            height: 401px;
            margin: 0 auto;
        }
    }
    .nav-text {
        position: relative;
        margin-top: -330px;
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
.summit .summit-content .title {
    width: 900px;
    position: relative;
    margin: 0 auto;
    img {
        width: 900px;
        height: 76px;
    }
    @media screen and (max-width: 1000px) {
        width: 335px;
        img {
            width: 335px;
            height: 38px;
        }
    }
}
.summit-content .tip{ 
    font-size: 20px;
    font-family: FZLTCHJW;
    color: #000000;
    line-height: 40px;
    font-weight: 400;
    margin-bottom: 30px;
    text-align: center;
    a{
        color: #002fa7;
    }
    @media screen and (max-width: 1000px) {
        font-size: 14px;
        line-height: 26px;
        margin-bottom: 30px;
        text-align: left;
    }
}
.summit-content .font-bold{ 
    font-weight: bold !important;
    font-family: Roboto-Bold !important;
    @media screen and (max-width: 1000px) {
        text-align: justify;
    }
}
.summit-content {
    font-family: FZLTHJW;
    .summit-message {
        width: 1120px;
        position: relative;
        margin: 0 auto;
    }
    @media screen and (max-width: 1000px) {
        .summit-message {
            width: 100%;
        }
    }
}
.summit-content .summit-explain {
    width: 1120px;
    margin: 0 auto;
    font-size: 20px;
    font-family: FZLTXIHJW;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    line-height: 40px;
    @media screen and (max-width: 1000px) {
        width: 100%;
        margin: 0 0 30px 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
    }
    p {
        text-align:justify;
    }
}
.summit-content .en-explain {
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #000000;
    @media screen and (max-width: 1000px) {
        font-weight: normal;
        line-height: 26px;
    }
}
.summit-message .agenda {
    .time-box {
        margin-top: 56px;
        /deep/ .el-tabs__nav-scroll div{
            font-size: 22px;
        }
        /deep/ .el-radio-group span{   
            font-family: FZLTXIHJW;  
            font-size: 16px;
            line-height: 18px;
        }
        /deep/ .el-tabs__nav-wrap::after {
            background-color: white;
        }
        /deep/ .el-radio-group .el-radio-button:focus {
            outline: 0 !important;
        }
    }
    .calendar-content {
        margin-top: 43px;
        /deep/ .el-table tbody tr { 
            pointer-events:none;
            height: 100px; 
        }
        /deep/ .el-table tbody tr td {
            font-size: 18px;           
            line-height: 20px;
            color: rgba(0, 0, 0, 0.5);
            &:last-of-type {
                font-size: 14px;  
            }
            &:nth-of-type(4) {
                text-align: center;
            }
            &:nth-of-type(1) {
                text-align: right;
            }
            &:nth-of-type(3),&:nth-of-type(4) {
                color: #000000;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .time-box {
            margin-top: 33px;
            /deep/ .el-tabs__nav-scroll div{
                font-size: 16px;
            }
            /deep/ .el-radio-group span{   
                font-size: 14px;
            }
            /deep/ .el-radio-group .el-radio-button__inner {
                padding:6px 15px;
            }
        }
        .calendar-content {
            margin-top: 30px;
            /deep/ .el-table tbody tr td {
                font-size: 12px;
                &:last-of-type {
                    font-size: 12px;  
                }
            }
            .mobile-table {
                .item {
                    width: 100%;
                    display: flex;
                    flex-basis: row;
                    margin-bottom: 20px;
                    border-bottom: 1px solid  rgba(0, 0, 0, 0.15);
                    &:nth-of-type(8) {
                        .agenda {
                            p {
                                span {
                                    &:first-of-type {
                                        white-space:nowrap;
                                    }
                                }
                            }
                        }
                    }
                    .time {
                        width: 82px;
                        height: 20px;
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.5);
                        line-height: 20px;
                        font-family: FZLTXIHJW;
                        margin: 20px 29px 0 0;
                    }
                    .agenda {
                        p {
                            font-family: FZLTXIHJW;
                            color: #000000;
                            line-height: 20px;
                            font-size: 12px;
                            margin-bottom: 20px;
                            &:first-of-type {
                                font-family: FZLTHJW;
                                width: 209px;
                            }
                            span {
                                &:first-of-type {
                                    margin-right: 25px;
                                    width: 41px;
                                    vertical-align: top;
                                }
                                &:first-of-type,&:last-of-type {
                                    display: inline-block;
                                }
                                &:last-of-type {
                                    width: 139px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.summit-content .summit-message .host-unit {
    margin-top: 100px;
    .img-list {
        margin-top: 50px;
        width: 100%;
        img {
            width: 280px;
            height: 80px;
            margin: 0 auto;
            display: block;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .img-list {
            margin-top: 20px;
            width: 100%;
            img {
                width: 140px;
                height: 40px;
                margin: 0 auto;
            }
        }
    }
}
.summit-content .summit-message .undertaker {
    margin-top: 100px;
    .img-list {
        margin-top: 20px;
        width: 100%;
        img {
            width: 280px;
            height: 80px;
            cursor: pointer;
            margin: 0 auto;
            display: block;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .img-list {
            margin-top: 20px;
            width: 100%;
            img {
                width: 140px;
                height: 40px;
                margin: 0 auto;
            }
        }
    }
}
.summit-content .summit-message .co-organizer {
    margin-top: 100px;
    .img-list {
        margin: 50px auto 0 auto;
        width: 920px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        img {
            width: 280px;
            height: 80px;
            margin: 0 40px 40px 0;
            cursor: pointer;
            display: block;
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .img-list {
            margin-top: 20px;
            width: 100%;
            flex-direction: column;
            img {
                width: 140px;
                height: 40px;
                margin: 20px auto 0 auto;
                &:nth-of-type(3n) {
                    margin-right: auto;
                }
            }
        }
    }
}
.summit-content .summit-message .foundation {
    margin-top: 100px;
    .img-list {
        margin: 50px auto 0 auto;
        width: 920px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        img {
            width: 280px;
            height: 80px;
            margin: 0 40px 40px 0;
            cursor: pointer;
            display: block;
            &:nth-of-type(3n) {
                    margin-right: auto;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .img-list {
            margin-top: 20px;
            width: 100%;
            flex-direction: column;
            img {
                width: 140px;
                height: 40px;
                margin: 20px auto 0 auto;
            }
        }
    }
}
.summit-content .summit-message .lecturer {
    width: 1029px;
    margin: 100px auto 0 auto;
    .lecturer-box {
        margin-top: 44px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        .item {
            width: 180px;
            margin: 0 103px 30px 0;
            &:nth-of-type(4n) {
                margin-right: 0;
            }
            img {
                width: 120px;
                height: 120px;
                margin: 0 auto;
                display: block;
            }
            p {
                font-size: 16px;
                font-family: FZLTHJW;
                color: #002FA7;
                line-height: 16px;
                margin-top: 20px;
                width: 180px;
                text-align: center;
                &:last-of-type {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #000000;
                    line-height: 20px;
                }
            }
        }
    }
    @media screen and (max-width: 1000px) {
        width: 345px;
        margin: 40px auto 0 auto;
        .lecturer-box {
            margin-top: 20px;
            .hidden {
                display: none;
            }
            .item {
                width: 140px;
                margin-right: 65px;
                &:nth-of-type(2n) {
                    margin-right: 0;
                }
                p {
                    width: 140px;
                }
            }
        }
        .show-all {
            display: block;
            text-align: center;
            margin-top: 20px;
            p{
                color: #002fa7;
            }
        }
    }
}
.summit-content .summit-message .media {
    margin-top: 100px;
    .media-box {
        width: 920px;
        margin: 44px auto 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        img {
            width: 280px;
            height: 80px;
            display: block;
            cursor: pointer;
            margin: 0 40px 40px 0;
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .media-box {
            width: 100%;
            margin-top: 20px;
            flex-direction: column;
            img {
                width: 140px;
                height: 40px;
                margin: 20px auto 0 auto;
                &:nth-of-type(3n) {
                    margin-right: auto;
                }
            }
        }
    }
}
.summit-content .summit-message .review {
    margin-top: 100px;
    .review-banner {
        height: 280px;
        display: block;
        margin-top: 54px;
        width: 100%;
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .review-banner {
            height: 180px;
            margin-top: 33px;
        }
    }
}
</style>
