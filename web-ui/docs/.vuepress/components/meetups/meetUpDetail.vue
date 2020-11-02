<template>
    <div id="meetUpDetail">
         <div class="link-container" @click="goMeetUps">
            <p class="MeetUps-link">{{ i18n.interaction.MEETUPS.MEETUPS }}\</p>
        </div>
        <div class="top-content">
            <h3 :class="$lang === 'en'?'font-bold':''">{{ detailObj.MEETUPS_TITLE }}</h3>
            <p :class="$lang === 'en'?'font-bold':''">{{ detailObj.MEETUPS_DATE }}</p>
        </div>
        <div class="description">
            <p :class="['title',$lang === 'en'?'font-regular':'']">{{ i18n.interaction.MEETUPS.DETAIL_DESC }}</p>
            <p :class="['desc-content',$lang === 'en'?'font-regular':'']">{{ detailObj.MEETUPS_DESC }}</p>
        </div>
        <div class="meet-flowPath">
            <p class="title">{{ i18n.interaction.MEETUPS.DETAIL_FLOW }}</p>
            <div class="flowPath-img" v-if="!isShowH5">
                <div class="maillist-divider-mail" :style="{ height:flowPathList.length*113 + 'px' }">
                    <div class="maillist-icon-comm"></div>
                </div>
                <div class="mail-guide" v-for="(item,index) in flowPathList">
                    <div v-if="index % 2 === 0" class="step-left">
                        <div class="mail-box">
                            <div class="step-left-box">
                                <div :class="['inner-box',$lang == 'en'?'en-box':'']">
                                    <p :title="item.FLOW_PATH_NAME">{{ item.FLOW_PATH_NAME }}</p>
                                </div>
                            </div>
                            <div :class="['step-left-num',$lang == 'en'?'left-en':'']">
                                <span>{{ item.FLOW_PATH_TIME }}</span>
                            </div>
                            <div class="step-line"></div>
                        </div>
                    </div>
                    <div v-if="index % 2 !== 0" class="step-right">
                        <div class="mail-box">
                            <div class="step-line"></div>
                            <div :class="['step-right-num',$lang == 'en'?'right-en':'']">
                                <span>{{ item.FLOW_PATH_TIME }}</span>
                            </div>
                            <div class="step-right-box right-box-en">
                                <div :class="['inner-box',$lang == 'en'?'en-box':'']">
                                    <p :title="item.FLOW_PATH_NAME">{{ item.FLOW_PATH_NAME }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flowPath-img-mobile" v-else>
                <div class="mail-guide" v-for="(item, index) in flowPathList" :key="index">
                    <div class="step-H5 step-left-H5">
                        <div :class="$lang == 'en'?'step-en':''">
                            <span>{{ item.FLOW_PATH_TIME }}</span>
                        </div>
                        <p  :class="$lang == 'en'?'en-p-box':''">{{ item.FLOW_PATH_NAME }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="meet-message">
            <p :class="['title',$lang === 'en'?'font-regular':'']">{{ i18n.interaction.MEETUPS.DETAIL_MEET }}</p>
            <div :class="['meet-address',$lang === 'en'?'en-address':'']">
                <div class="address-message">
                    <img v-if="addressObj" :src="addressObj.ADDRESS_IMG" alt />
                    <div class="address-text">
                        <i class="location"></i>
                        <p v-if="addressObj">{{ detailObj.MEETINGS_INFO.ADDRESS_UP }}</p>
                        <p v-if="addressObj" v-for="(item,index) in addressObj.ADDRESS_DOWN" :key="index">{{ item }}</p>
                    </div>
                </div>
                <div class="scan-qrcode">
                    <i class="qrcode"></i>
                    <p>{{ i18n.interaction.MEETUPS.DETAIL_QRCODE_TEXT }}</p>
                    <img v-if="addressObj" :src="addressObj.APPLY_QRCODE" alt />
                </div>
            </div>
            <img class="map" v-if="addressObj" :src="addressObj.MAP_IMG" alt />
        </div>
    </div>
</template>

<script>
export default {
    name: "meetUpDetail",
    data() {
        return {
            flowPathList: [],
            detailObj: {},
            addressObj: {}
        };
    },
    mounted (){
        this.detailContent();
    },
    methods: {
        goMeetUps() {
            this.$router.push('/' + this.$lang + "/interaction/salon-list/");
        },
        detailContent() {
            let  listData= this.i18n.interaction.MEETUPS.MEETUPS_DATA;
            listData.forEach((item)=>{
                if(item.ID == this.$route.query.id){
                    this.detailObj = item;
                    this.flowPathList = item.MEETUPS_FLOW_PATH;
                    this.addressObj = item.MEETINGS_INFO;
                }
            })
        }
    }

}
</script>

<style lang="less" scoped>
#meetUpDetail {
    .link-container{
        width: 1120px;
        margin: 0 auto;
        .MeetUps-link{
            font-size: 20px;
            color: #002fa7;
            cursor: pointer;
            margin: 34px 0 16px 0;
            padding: 0;
        }
    }
    .top-content{
        width: 100%;
        height: 220px;
        background-image: url('/img/home/homeActive.gif');
        overflow: hidden;
        color: #fff;
        font-family: FZLTHJW;
        h3{
            font-size: 30px;
            text-align: center;
            margin: 67px 0 28px 0;
        }
        p{
            text-align: center;
            font-size: 18px;
        }
    }
    .title{
            text-align: center;
            font-size: 30px;
            color: #000000;
            margin-bottom: 50px;
            font-family: FZLTHJW;
            line-height: 46px;
    }
    .description{
        margin-top: 60px;
        .desc-content{
            width: 1020px;
            font-size: 18px;
            color: rgba(0,0,0,.5);
            margin: 0 auto;
            line-height: 40px;
            margin-bottom: 60px;
            text-align: center;
        }
    }
    .meet-flowPath{
        .flowPath-img{
            width: 1120px;
            margin: 0 auto;
        }
    }
    .maillist-divider-mail {
    width: 2px;
    left: 50%;
    background-image: linear-gradient(
        to top,
        #002fa7 0%,
        #002fa7 50%,
        transparent 50%
    );
    background-size: 2px 11px;
    background-repeat: repeat-y;
    position: absolute;
    }
    .maillist-icon-comm {
        width: 0;
        height: 0;
        border-width: 15px;
        border-style: solid;
        border-color: #002fa7 transparent transparent transparent;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
    }
    .step-right-box,
    .step-left-box {
        display: inline-block;
        vertical-align: middle;
        text-align: left;
    }
    .step-left-box {
        width: 200px;
        margin-right: 36px;
        min-height: 74px;
        padding-top: 9px;
        .en-box{
            width: 370px;
            margin-left: -160px;
            p{
                font-family: Roboto-Regular, Roboto;
            }
        }
    }
    .step-right-box {
        width: 540px;
        vertical-align: top;
        .inner-box {
            width: 240px;
            margin-right: 0px;
            margin-left: 30px;
        }
        .en-box{
            width: 370px;
            p{
                font-family: Roboto-Regular, Roboto;
            }
        }
    }
    .step-left {
        z-index: 20;
    }
    .step-right {
        margin: -30px 0;
        margin-left: 406px;
    }
    .step-left-num,
    .step-right-num {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 50%;
        background-color: #002fa7;
        display: inline-block;
    }
    .step-left-num span,
    .step-right-num span {
        color: #fff;
        font-size: 18px;
        font-family: Roboto-BoldCondensed;
    }
    .mail-box .left-en,.mail-box .right-en{
        font-family: Roboto-BoldCondensed, Roboto;
    }
    .step-line {
        width: 100px;
        height: 2px;
        display: inline-block;
        vertical-align: middle;
        border-spacing: 24px;
        background-image: linear-gradient(
            to right,
            #002fa7 0%,
            #002fa7 50%,
            transparent 50%
        );
        background-size: 8px 2px;
        background-repeat: repeat-x;
    }
    .mail-box {
        padding: 0;
        padding-top: 60px;
        padding-left: 156px;
        .right-box-en{
            margin: -60px 0 0 160px;
        }
    }
    .mail-box p {
        font-size: 16px;
        font-weight: normal;
        line-height: 60px;
        display: inline-block;
        width: calc(100% - 63px);
        height: 60px;
        overflow: hidden;
    }
    .inner-box {
        height: 60px;
        width: 210px;
        margin-right: 36px;
        margin-bottom: 14px;
        align-items: center;
        box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
    .inner-box img {
        margin: 0 10px 20px 16px;
        width: 22px;
        height: 26px;
        vertical-align: sub;
    }
    .meet-message{
        margin-top: 60px;
        margin-bottom: 128px;
        .meet-address{
            width: 920px;
            height: 270px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            padding: 50px 0 77px 50px;
            background: #ffffff;
            box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            border-bottom: 3px solid #002fa7;
            .address-message{
                display: flex;
                flex-direction: row;
                img{
                    width: 224px;
                    height: 143px;
                }
                .address-text{
                    margin-left: 40px;
                    position: relative;
                    .location{
                        position: absolute;
                        width: 18px;
                        height: 20px;
                        background-image: url('/img/meetups/location.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    p{
                        font-size: 16px;
                        font-family: FZLTHJW;
                        color: #000000;
                        line-height: 24px;
                        margin-bottom: 12px;
                        &:first-of-type{
                            color: #002FA7;
                            font-size: 20px;
                            margin: 0 0 20px 30px;
                        }
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .scan-qrcode{
                margin-left: 161px;
                position: relative;
                .qrcode{
                        position: absolute;
                        width: 20px;
                        height: 18px;
                        background-image: url('/img/meetups/link.png');
                        background-size: contain;
                        background-repeat: no-repeat;
                        left: -30px;
                        top: 4px;
                }
                p{
                    color: #002FA7;
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                img{
                    position: absolute;
                    right: -10px;
                    width: 100px;
                    height: 100px;
                }
            }
        }
        .en-address{
            width: 978px;
            p{
                font-family: Roboto-Regular !important;
            }
            .scan-qrcode{
                margin-left: 70px;
            }
        }
        .map{
            display: block;
            width: 1120px;
            height: 373px;
            margin: -50px auto 0 auto;
            position: relative;
            z-index: -1;
        }
    }
    .font-regular{
        font-family: Roboto-Regular !important;
    }
    .font-bold{
        font-weight: bold !important;
        font-family: Roboto-Bold !important;
    }
    @media screen and (max-width: 1000px) {
        .link-container{
            display: none;
        }
        .top-content{
            h3{
                font-size: 25px;
            }
            p{
                font-size: 16px;
            }
        }
        .title{
            text-align: left;
            font-size: 25px;
            color: #000000;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .description{
            padding: 0 30px;
            margin-top: 40px;
            .desc-content{
                width: 100%;
                font-size: 16px;
            }
        }
        .meet-flowPath{
            padding: 0 30px;
        }
        .step-H5 {
            margin: 30px auto;
        }
        .step-left-H5{
            text-align: center;
        }
        .step-H5 .step-en span{
            font-family: Roboto-BoldCondensed !important;
        }
        .step-num span {
            color: #000000;
            font-size: 17px;
            font-family: FZLTXIHJW;
        }
        .step-H5 .en-p-box{
            width: 256px;
            height: auto;
            font-family: Roboto-Regular;
        }
        .step-H5 p {
            font-size: 16px;
            width:100%;
            height:40px;
            line-height: 40px;
            background:rgba(255,255,255,1);
            box-shadow:0px 3px 10px 0px rgba(0,0,0,0.1);
            border-radius:8px;
            text-align: center;
            margin: 20px auto 0 auto;
        }
        .meet-message{
            padding: 0 30px;
            margin-bottom: 80px;
            .meet-address{
                flex-direction: column;
                width: 100%;
                padding: 40px;
                border-bottom: none;
                width: 100%;
                height: 550px;
                .address-message{
                    flex-direction: column;
                    img{
                        margin: 0 auto;        
                    }
                    .address-text{
                        margin-left: 0;
                        .location{
                            display: none;
                        }
                        p{
                            text-align: center;
                            font-size: 14px;
                             &:first-of-type{
                                margin: 20px 0 10px 0;
                                font-size: 16px;
                            }
                        }
                    }
                }
                .scan-qrcode{
                    margin: 40px auto 0 auto;
                    .qrcode{
                        display: none;
                    }
                    p{
                        width: 100%;
                        text-align: center;
                        margin-bottom: 0;
                        margin-top: 110px;
                    }
                    img{
                        top: 0;
                        left: 50%;
                        margin-left: -50px;
                    }
                }
            }
            .title{
                font-size: 17px;
            }
            .map{
                display: none;
            }
            .en-address{
                height: auto !important;
            }
        }
    }
}

</style>