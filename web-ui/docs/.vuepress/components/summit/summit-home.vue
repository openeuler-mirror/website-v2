<!-- 峰会 -->
<template>
    <div :class="['summit',mobilePadding?'mobile-padding':'']">
        <div class="summit-nav" v-show="isShowNav" v-if="!isShowH5">
            <div class="box-line">
                <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
                <img class="line" v-lazy="'/img/summit/home/line.png'" alt="" />
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
        <div class="top-banner" v-if="!isShowH5" @click="go('/interaction/summit-list/')">
            <video autoplay loop muted width="700px" height="380px" id="summit-mp4">
                <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler%20Summit%202020%20mov.mp4"  type="video/mp4">
            </video>
            <img class="top-img" v-lazy="i18n.interaction.SUMMIT.SUMMIT_WEB_IMG" alt="" />
        </div>
        <img class="mobile-img" v-lazy="i18n.interaction.SUMMIT.SUMMIT_H5_IMG" alt="" v-else @click="go('/interaction/summit-list/')" />
        <div class="summit-content">
            <div class="summit-explain">
                <p :class="$lang === 'en'?'font-regular':''" v-for="(item,index) in i18n.interaction.SUMMIT.SUMMITCONTENT">{{ item }}</p>
            </div>

            <div class="live-room" v-if="$lang === 'zh'">
                <div class="title">
                    <img v-lazy="'/img/summit/home/pc-liveroom.png'" alt="" v-if="!isShowH5" />
                    <img v-lazy="'/img/summit/home/mobile-liveroom.png'" alt="" v-else />
                </div>
                <el-select v-model="nowValue" placeholder="请选择直播间" class="live-choose" v-if="isShowH5" @change="tabLiveRoom">
                    <el-option
                    v-for="(item,index) in liveData"
                    :key="index"
                    :label="item.name"
                    :value="item.link">
                    <span>{{ item.name }}</span>
                    </el-option>
                </el-select>
                <iframe id="livePage" allow="camera *;microphone *;" border="0" scrolling="no" :src="nowLiveSrc"></iframe>
                <div class="web-box" v-if="!isShowH5">
                    <p>{{ i18n.interaction.SUMMIT.LIVETITLE }}</p>
                    <div class="item-box">
                        <div :class="['live-item',roomId === index?'activeRoom':'']" v-for="(item,index) in i18n.interaction.SUMMIT.SUMMITLIVE" @click="tabLiveRoom(item.LIVEID,index)">
                            <p>{{ item.THEME }}</p>
                            <p>{{ item.TIME }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="summit-message">
                <div class="agenda" title-id="agenda">
                    <div :class="['title',$lang === 'en'?'en-title':'']">
                         <img v-lazy="agendaData.WEB_TITLE" alt="" v-if="!isShowH5" />
                         <img v-lazy="agendaData.MOBILE_TITLE" alt="" v-else />
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
                    <div :class="['calendar-content',showTab === 'twenty-four'?'center-p':'']" v-show="!isShowcarousel">
                        <el-table
                        :data="agendaTableData"
                        :show-header=false
                        :span-method="objectSpanMethod"
                        :class="showTab === 'twenty-four'?'hideIcon':''"
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
                        <img v-lazy="lecturerObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="lecturerObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="lecturer-box" v-fade v-if="lecturerList.length && !isShowH5">
                        <div class="item fade-in"  v-for="(item,index) in lecturerList" :key="index">
                            <img v-lazy="item.IMG" alt="" />
                            <p>{{ item.NAME }}</p>
                            <p>{{ item.POSITION }}</p>
                        </div>
                    </div>
                    <div class="lecturer-box" v-fade v-if="lecturerList.length && isShowH5">
                        <div :class="['item','fade-in',index > 7 && flag?'hidden':'']"  v-for="(item,index) in lecturerList" :key="index">
                            <img v-lazy="item.IMG" alt="" />
                            <p>{{ item.NAME }}</p>
                            <p>{{ item.POSITION }}</p>
                        </div>
                    </div>
                    <div class="show-all" @click="showAll" v-if="isShowH5">
                        <p>{{ flag?i18n.home.EXPAND:i18n.home.RETRACT }}</p>
                        <img v-if="flag" v-lazy="'/img/home/arrow.svg'" alt="">
                        <img v-if="!flag" v-lazy="'/img/home/arrowUp.svg'" alt="">
                    </div>
                </div>
                <div class="host-unit" title-id="host-unit">
                    <div class="title">
                        <img v-lazy="hostUnitObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="hostUnitObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="img-list">
                        <img v-lazy="item.IMG" alt="" v-for="(item,index) in hostUnitObj.LIST" />
                    </div>
                </div>
                <div class="undertaker">
                    <div class="title">
                        <img v-lazy="undertakerObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="undertakerObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img v-lazy="item.IMG" alt="" v-for="(item,index) in undertakerObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="co-organizer">
                    <div class="title">
                        <img v-lazy="coOrgObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="coOrgObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img v-lazy="item.IMG" alt="" v-for="(item,index) in coOrgObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="foundation">
                    <div class="title">
                        <img v-lazy="foundationObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="foundationObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                     <div class="img-list">
                        <img v-lazy="item.IMG" alt="" v-for="(item,index) in foundationObj.LIST" @click="go(item.LINK)" />
                    </div>
                </div>
                <div class="media">
                    <div class="title">
                        <img v-lazy="mediaObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="mediaObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <div class="media-box">
                        <img v-lazy="item.IMG" alt="" v-for="(item,index) in mediaObj.LIST" @click="go(item.LINK)" />
                    </div>
                    <div class="qrcode-box" v-if="isShowQrcode">
                        <div class="d3"></div>
                        <img v-lazy="'/img/summit/home/media/xianglingshuo.jpg'" alt="" />
                    </div>
                </div>
                <div :class="['review',isShowQrcode?'isqrcode':'']" title-id="review">
                    <div class="title">
                        <img v-lazy="reviewObj.WEB_TITLE" alt="" v-if="!isShowH5" />
                        <img v-lazy="reviewObj.MOBILE_TITLE" alt="" v-else />
                    </div>
                    <img class="review-banner card-hover" v-lazy="'/img/summit/home/review/review-img.png'" alt="" @click="go('/interaction/summit-list/list/')" v-if="!isShowH5"/>
                    <img class="review-banner" v-lazy="'/img/summit/home/review/mobile-review-img.png'" alt="" @click="go('/interaction/summit-list/list/')" v-else />
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
            navTitleScroll: [620,1650,3250,6450,9250],
            activeIndex: -1,
            isShowNav: false,
            isShowQrcode: false,
            userName: '',
            nowLiveSrc: '',
            roomId: null,
            liveData: [
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7095?lang=zh&thirdId=',
                    name: '09:30-11:55 openEuler Summit 2020'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7096?lang=zh&thirdId=',
                    name: '14:00-17:20 操作系统'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7097?lang=zh&thirdId=',
                    name: '14:00-16:55 云和原生云'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7098?lang=zh&thirdId=',
                    name: '14:00-16:55 虚拟化'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7099?lang=zh&thirdId=',
                    name: '14:00-16:55 开源与基础建设'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7100?lang=zh&thirdId=',
                    name: '14:00-17:25 安全与可信'
                },
                {
                    link: 'https://vhall.huawei.com/fe/embed/watch/7101?lang=zh&thirdId=',
                    name: '14:00-17:25 基础软件'
                },
            ],
            nowValue: ''
        }
    },
    created() {
        let digit = Math.round(Math.random() * 10);
        digit > 3?digit:digit = 3;
        this.creatUserId(digit);
        let liveId = this.$route.query.liveid;
        this.showIframe(liveId);
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
                }else if(path && path === 'qrcode') {
                    this.isShowQrcode = ! this.isShowQrcode;
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
            if(scrollTop > 550 && scrollTop < 1000) {
                this.activeIndex = 0;
            }else if(scrollTop > 1620 && scrollTop < 2020) {
                this.activeIndex = 1;
            }else if(scrollTop > 2820 && scrollTop < 3720) {
                this.activeIndex = 2;
            }else if(scrollTop > 5920 && scrollTop < 6920) {
                this.activeIndex = 3;
            }else if(scrollTop > 8720) {
                this.activeIndex = 4;
            }else {
                return false;
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if(this.showTab === 'twenty-four') {
                if (columnIndex === 0 || columnIndex === 1) {
                    if (rowIndex === 1) {
                        return {
                            rowspan: 4,
                            colspan: 1
                        };
                    }
                }
            }else {
                return false;
            }
        },
        creatUserId(num) {
            let returnId = '';
            let charStr = '0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for(var i=0; i<num; i++){
                var index = Math.round(Math.random() * (charStr.length-1));
                returnId += charStr.substring(index,index+1);
            }
            this.userName = returnId;
        },
        tabLiveRoom(src,index) {
            let indexType = typeof index;
            if(indexType === 'number') {
                this.nowLiveSrc = src + this.userName;
                this.roomId = index;
            }else {
                this.nowLiveSrc = src + this.userName;
            }
        },
        showIframe(id) {
            if(id) {
                switch(id) {
                    case '7096':
                        this.nowLiveSrc = this.liveData[1]['link'] + this.userName;
                        this.nowValue = this.liveData[1]['name'];
                        this.roomId = 1;
                        break;
                    case '7097':
                        this.nowLiveSrc = this.liveData[2]['link'] + this.userName;
                        this.nowValue = this.liveData[2]['name'];
                        this.roomId = 2;
                        break;
                    case '7098':
                        this.nowLiveSrc = this.liveData[3]['link'] + this.userName;
                        this.nowValue = this.liveData[3]['name'];
                        this.roomId = 3;
                        break;
                    case '7099':
                        this.nowLiveSrc = this.liveData[4]['link'] + this.userName;
                        this.nowValue = this.liveData[4]['name'];
                        this.roomId = 4;
                        break;
                    case '7100':
                        this.nowLiveSrc = this.liveData[5]['link'] + this.userName;
                        this.nowValue = this.liveData[5]['name'];
                        this.roomId = 5;
                        break;
                    case '7101':
                        this.nowLiveSrc = this.liveData[6]['link'] + this.userName;
                        this.nowValue = this.liveData[6]['name'];
                        this.roomId = 6;
                        break;
                    default:
                        break;
                }
            }else {
                this.nowLiveSrc = this.liveData[0]['link'] + this.userName;
                this.nowValue = this.liveData[0]['name'];
                this.roomId = 0;
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
.summit-content .live-room {
    width: 1120px;
    margin: 0 auto ;
    font-family: FZLTHJW;
    #livePage {
        width: 1120px;
        height: 560px;
        margin: 40px auto 0 auto;
        display: block;
        border: none;
        @media screen and (max-width: 1000px) {
            width: 100%;
            margin-top: 30px;
            height: 500px;
        }
    }
    .web-box {
        &>p {
            font-size: 20px;
            color: #000000;
            line-height: 23px;
            margin: 40px 0 30px 0;
            text-align: center;
        }
        .item-box {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-wrap: wrap;
            .live-item {
                width: 160px;
                height: 76px;
                margin-right: 30px;
                cursor: pointer;
                background: #FFFFFF;
                box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                &:first-of-type {
                    width: 100%;
                    margin: 0 0 30px 0;
                }
                &:last-of-type {
                    margin-right: 0;
                }
                p {
                    margin-top: 10px;
                    color: #002FA7;
                    text-align: center;
                    font-size: 18px;
                    line-height: 18px;
                    &:last-of-type {
                        margin-top: 20px;
                    }
                }
            }
            .activeRoom {
                background-color: #002FA7;
                p {
                    color: #FFFFFF;
                }
            }
        }
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
        /deep/ .live-choose {
            width: 100%;
            margin-top: 30px;
            .el-input {
                width: 100%;
            }
        }
        .web-box {
            &>p {
                font-size: 16px;
                margin: 20px 0 15px 0;
            }
            .item-box {
                flex-direction: column;
                .live-item {
                    margin: 0 auto 20px auto;
                    &:first-of-type {
                        margin: 0 auto 20px auto;
                    }
                    &:last-of-type {
                        margin-right: auto;
                    }
                }
            }
        }
        
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
        &>p {
            font-size: 16px;
             margin: 20px 0 15px 0;
        }
        .item-box {
            flex-direction: column;
            .live-item {
                margin: 0 auto 20px auto;
                &:first-of-type {
                    margin: 0 auto 20px auto;
                }
                &:last-of-type {
                    margin-right: auto;
                }
            }
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
            height: 441px;
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
.summit-content {
    font-family: FZLTHJW;
    .summit-message {
        width: 1120px;
        position: relative;
        margin: 100px auto 0 auto;
    }
    @media screen and (max-width: 1000px) {
        .summit-message {
            width: 100%;
            margin: 40px auto 0 auto;
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
        /deep/ .hideIcon tbody tr:nth-of-type(3) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(4) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(5) td:first-of-type,
        /deep/ .hideIcon tbody tr:nth-of-type(3) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(4) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(5) td:nth-of-type(2)
        {
            display: none;
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
        /deep/ .hideIcon tbody tr:nth-of-type(3) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(4) td:nth-of-type(2),
        /deep/ .hideIcon tbody tr:nth-of-type(5) td:nth-of-type(2)
        {
            display: block;
        }
        /deep/ .hideIcon 
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
        .center-p {
            .mobile-table {
                .item {
                    &:first-of-type {
                        .agenda {
                            margin: 0 0 20px 0;
                        }
                    }
                    &:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4),&:nth-of-type(5),&:nth-of-type(11) {
                        .agenda {
                            margin: 20px 0 0 0;
                        }
                    }
                }
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
        }
        .mobile-table {
            .item {
                width: 100%;
                display: flex;
                flex-basis: row;
                margin-bottom: 20px;
                border-bottom: 1px solid  rgba(0, 0, 0, 0.15);
                &:first-of-type {
                    .agenda {
                        margin: 20px 0 0 0;
                    }
                }
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
    position: relative;
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
    .qrcode-box {
        position: absolute;
        right: 130px;
        bottom: -116px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        padding: 0 15px 10px 15px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
        img {
            width: 140px;
            height: 140px;
        }
        .d3 {
            width: 15px;
            height: 15px;
            transform: rotate(45deg);
            border-left: 1px solid rgba(0, 47, 167, .5);
            border-top: 1px solid rgba(0, 47, 167, .5);
            box-sizing: border-box;
            position: relative;
            top: -8px;
            left: 10px;
            background: #fff;
        }
    }
    @media screen and (max-width: 1000px) {
        margin-top: 40px;
        .qrcode-box {
            right: 100px;
            img {
                width: 80px;
                height: 80px;
            }

        }
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
.summit-content .summit-message .isqrcode {
    @media screen and (max-width: 1000px) {
        margin-top: 140px;
    }
}
</style>
