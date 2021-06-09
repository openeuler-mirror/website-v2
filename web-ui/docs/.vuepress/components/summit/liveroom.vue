<template>
    <div class="live-room" v-if="liveData.length" id="liveroom">
        <div class="title">
            <div class="ever" v-if="isPass">
                <img v-lazy="'/img/summit/home/zh-mobile-liveroom.png'" alt="" v-if="isShowH5" />
                <img v-lazy="'/img/summit/home/zh-pc-liveroom.png'" alt="" v-else />
            </div>
            <div class="will" v-else>
                <img v-lazy="'/img/summit/devday-2021/h5-liveroom.png'" alt="" v-if="isShowH5" />
                <img v-lazy="'/img/summit/devday-2021/pc-liveroom.png'" alt="" v-else />
            </div>
        </div>
        <el-select v-model="nowValue" class="live-choose" v-if="isShowH5" @change="tabLiveRoom">
            <el-option
            v-for="(item,index) in liveData"
            :key="index"
            :label="item.OPTION"
            :value="item.LIVEURL">
            <span>{{ item.OPTION }}</span>
            </el-option>
        </el-select>
        <iframe id="livePage" allow="camera *;microphone *;" border="0" scrolling="no" :src="nowLiveSrc" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
        <div class="web-box" v-if="!isShowH5">
            <p>{{ i18n.interaction.SUMMIT.LIVETITLE }}</p>
            <div class="item-box">
                <div :class="['live-item',roomId === index?'activeRoom':'']" v-for="(item,index) in liveData" @click="tabLiveRoom(item.LIVEURL,index)">
                    <p>{{ item.THEME }}</p>
                    <p>{{ item.TIME }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            nowLiveSrc: '',
            nowValue: '',
            roomId: null,
            userName: '',
        }
    },
    props: ['liveData','isPass'],
    created() {
        let digit = Math.round(Math.random() * 10);
        digit > 3?digit:digit = 3;
        this.creatUserId(digit);
    },
    mounted () {
        let liveId = this.$route.query.liveid;
        this.showIframe(liveId);
    },
    methods: {
        showIframe(id) {
            if(id) {
                this.liveData.forEach((item,index,arr) => {
                    if(parseInt(item['ID']) === parseInt(id)) {
                        this.nowLiveSrc = item['LIVEURL'] + this.userName;
                        this.nowValue = item['OPTION'];
                        this.roomId = index;
                    }
                });
            }else {
                this.nowLiveSrc = this.liveData[0]['LIVEURL'] + this.userName;
                this.nowValue = this.liveData[0]['OPTION'];
                this.roomId = 0;
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
            console.log(src);
            if(indexType === 'number') {
                this.nowLiveSrc = src + this.userName;
                this.roomId = index;
            }else {
                this.nowLiveSrc = src + this.userName;
            }
        },
    }
}
</script>
<style>
.live-room .live-choose {
    width: 100%;
    margin-top: 30px;
}
.live-room .live-choose .el-input {
    width: 100%;
}
@media screen and (max-width: 1000px) {
    .el-scrollbar>.el-scrollbar__bar {
        opacity: 1 !important;
    }
}
</style>
<style lang="less" scpoed>
.live-room {
    width: 1120px;
    margin: 40px auto 0 auto;
    .title {
        margin: 100px 0 50px 0;
        img {
            display: block;
            margin: 0 auto;
            width: 900px;
            height: 76px;
        }
        @media screen and (max-width: 1000px) {
            margin: 40px 0 30px 0;
            img {
                width: 335px;
                height: 38px;
            }
        }
    }
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
            justify-content: space-between;
            .live-item {
                width: 160px;
                padding: 10px;
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
</style>