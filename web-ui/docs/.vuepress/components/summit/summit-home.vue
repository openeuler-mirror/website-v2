<!-- 峰会首页 -->
<template>
    <div class="summit">
        <h3 v-if="isShowH5">{{ i18n.interaction.SUMMIT.SUMMIT }}</h3>
        <div class="top-banner" v-if="!isShowH5" @click="go('https://jinshuju.net/f/PEFJht?x_field_1=openeuler')">
            <video autoplay loop muted width="700px" height="380px" id="summit-mp4">
                <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler%20Summit%202020%20mov.mp4"  type="video/mp4">
            </video>
            <img class="top-img" :src="i18n.interaction.SUMMIT.SUMMIT_WEB_IMG" alt="" />
        </div>
        <img class="mobile-img" :src="i18n.interaction.SUMMIT.SUMMIT_H5_IMG" alt="" v-else @click="go('https://jinshuju.net/f/PEFJht?x_field_1=openeuler')" />
        <div class="summit-content">
            <div :class="['summit-explain',$lang == 'en'?'en-explain':'']">
                <p :class="$lang === 'en'?'font-regular':''" v-for="(item,index) in i18n.interaction.SUMMIT.SUMMITCONTENT">{{ item }}</p>
            </div>
            <p :class="['tip',$lang === 'en'?'font-bold':'']">{{ i18n.interaction.SUMMIT.SUMMITTIP.slice(0,31) }}<a href="https://jinshuju.net/f/PEFJht?x_field_1=openeuler" target="_blank">{{ i18n.interaction.SUMMIT.SUMMITTIP.slice(31,35) }}</a>{{ i18n.interaction.SUMMIT.SUMMITTIP.slice(35) }}</p>
            <div class="summit-message">
                <div class="agenda">
                    <div class="title">
                        <h3>{{ agendaData.OUTSIDE_TEXT }}</h3>
                        <span>{{ agendaData.INSIDE_TEXT }}</span>
                    </div>
                    <div class="time-box">
                        <el-tabs v-model="showTab" @tab-click="tabClick">
                            <el-tab-pane :label="agendaData.DATE[0]" name="twenty-four"></el-tab-pane>
                            <el-tab-pane :label="agendaData.DATE[1]" name="twenty-five"></el-tab-pane>
                        </el-tabs>
                        <el-radio-group v-model="showBtn" @change="changeTime" v-show="isShowBtn">
                            <el-radio-button label="forenoon">{{ agendaData.DATE[2] }}</el-radio-button>
                            <el-radio-button label="afternoon">{{ agendaData.DATE[3] }}</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="calendar-content" v-show="!isShowcarousel">
                        <el-table
                        :data="agendaTableData"
                        :show-header=false
                        style="width: 100%">
                        <el-table-column
                            prop="icon"
                            width="35">
                            <i class="el-icon-time"></i>
                        </el-table-column>
                        <el-table-column
                            prop="TIME"
                            width="205">
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
                    </div>
                    <carousel v-show="isShowcarousel"></carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonBanner from './../common/banner';
import carousel from './carousel.vue';
export default {
    data () {
        return {
            showTab: 'twenty-four',
            showBtn: 'forenoon',
            agendaData: {},
            agendaTableData: [],
            isShowcarousel: false,
            isShowBtn: false
        }
    },
    mounted() {
        let dataObj = this.i18n.interaction.SUMMIT.SUMMIT_HOME_DATA;
        this.agendaData = dataObj.AGENDA;
        this.agendaTableData = this.agendaData.AFTERNOON_AGENDA_24;
    },
    methods: {
        toReviewList () {
            let routeUrl = this.$router.resolve(this.resolvePath('/interaction/summit-list/list/'));
            window.open(routeUrl.href);
        },
        go(path) {
            if(path && path.includes("https")) {
                window.open(path);
            }else{
                this.$router.push('/' + this.$lang + path);
            }
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
        }
    },
    components: {
        commonBanner,
        carousel
    }
}

</script>

<style lang='less' scoped>
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
            left: -220px;
        }
        .top-img{
            width: 565px;
            height: 380px;
            right: 0;
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
.summit .summit-content .title {
    width: 215px;
    margin: 67px auto 0 auto;
    position: relative;
    h3 {
        width: 215px;
        height: 53px;
        background-image: url('/img/summit/home/title-background.png');
        background-size: contain;
        font-size: 36px;
        font-family: FZLTHJW;
        font-weight: normal;
        color: #000000;
        line-height: 46px;
        text-align: center;
    }
    span {   
        font-size: 60px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.05);
        line-height: 60px;
        position: absolute;
        top: -25px;
        left: 70px;
    }
    @media screen and (max-width: 1000px) {
        width: 107px;
        margin: 50px auto 0 auto;
        h3 {
            width: 107px;
            height: 26px;
            font-size: 18px;
            line-height: 23px;
        }
        span {
            font-size: 30px;
            line-height: 30px;
            top: -15px;
            left: 54px;
        }
    }
}
.summit-content .tip{ 
    font-size: 20px;
    font-family: FZLTCHJW;
    color: #000000;
    line-height: 40px;
    font-weight: 400;
    margin-bottom: 60px;
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
    margin-top: 50px;
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
    margin: 60px auto 24px auto;
    font-size: 20px;
    font-family: FZLTXIHJW;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.85);
    line-height: 40px;
    @media screen and (max-width: 1000px) {
        width: 100%;
        margin: 40px 0 30px 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
    }
    p {
        margin-bottom: 30px;
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
        }
        .calendar-content {
            /deep/ .el-table tbody tr td {
                font-size: 12px;
                &:last-of-type {
                    font-size: 12px;  
                }
            }
        }
    }
}
</style>
