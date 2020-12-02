<template>
    <div class="agenda-carousel">
        <div class="agenda-msg">
            <div class="time-list">
                <div v-for="(item,index) in carouselObj.TIME_LIST" :key="index">{{ item }}</div>
            </div>
            <div class="card-list">
                <button
                    class="left"
                    @click="handleBtn('left')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <button
                    class="right"
                    @click="handleBtn('right')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <div class="shade-remind" v-if="isShowDetail" @click="hideDetail()"></div>
                <div class="msg-detail" @click="showDetail('1')" v-if="isShowDetail">
                    <div class="time-box">
                        <p><i></i>{{ detailMsg.TIME }}</p>
                        <p>{{ detailMsg.THEME }}</p>
                    </div>
                    <div class="speaker-box">
                        <i v-if="detailMsg.SPEAKER"></i>
                        <p v-for="(value,key) in detailMsg.SPEAKER" :key="key">{{ value }}</p>
                    </div>
                    <div class="desc-box">
                        <i v-if="detailMsg.DESC"></i>
                        <p v-for="(item,index) in detailMsg.DESC" :key="index" v-if="item">{{ item }}</p>
                    </div>
                </div>
                <div class="card-box">
                    <ul class="card-list" :style="{transform: 'translateX(' + cardPosition + 'px)'}">
                        <li v-for="(item,index) in carouselObj.CARD_LIST" :key="index">
                            <p class="section" v-for="(values,keys) in item.TITLE">{{ values }}</p>
                            <div :class="value.THEME?'card-item':'null-item'" v-for="(value,key) in item.ITEM_LIST" :key="key" @click="showDetail(value)">
                                <p>{{ value.THEME }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prev: "/img/home/prev.svg",
            carouselObj: {},
            cardPosition: 0,
            cardIndex: 0,
            isShowDetail: false,
            detailMsg: {}
        }
    },
    mounted() {
        let agendaObj = this.i18n.interaction.SUMMIT.SUMMIT_HOME_DATA;
        agendaObj = agendaObj.AGENDA;
        this.carouselObj = agendaObj.AFTERNOON_AGENDA_25;
    },
    methods: {
        handleBtn(direction) {
            if(direction === 'left') {
                if(this.cardIndex <= 0) {
                    this.cardIndex = 0;
                }else {
                    this.cardIndex = this.cardIndex - 1;
                    this.isShowH5?this.cardPosition = this.cardPosition + 220:this.cardPosition = this.cardPosition + 317;
                }
            }else{
                if(this.cardIndex >= 5) {
                    this.cardIndex = 5;
                }else {
                    this.cardIndex = this.cardIndex + 1;
                    this.isShowH5?this.cardPosition = this.cardPosition - 220:this.cardPosition = this.cardPosition - 317;
                }
            }
        },
        showDetail(item) {
            if(item.THEME){
                this.detailMsg = {};
                this.isShowDetail = true;
                this.detailMsg = item;
            }else {
                return false;
            }

        },
        hideDetail() {
            this.isShowDetail = false;
        }
    }
}
</script>

<style lang="less" scoped>
.agenda-carousel {
    position: relative;
    margin-top: 50px;
    display: block;
    button {
        width: 20px;
        height: 40px;
        z-index: 10;
        background: none;
        display: block;
        border: 0;
        outline: none;
        cursor: pointer;
        position: absolute;
        transition: transform 0.5s ease-in-out;
        top: 13px;
    }
    .agenda-msg {
        display: flex;
        flex-direction: row;
        .time-list {
            margin-top: 50px;
            position: relative;
            z-index: 10;
            background-color: white;
            margin-right: -20px;
            div {
                width: 150px;
                height: 156px;
                line-height: 156px;
                margin-top: 40px;
                font-size: 18px;
                color: rgba(0, 0, 0, 0.5);
            }
        }
        .card-list {
            position: relative;
            width: calc(100% - 150px);
            display: block;
            margin-top: 25px;
            .shade-remind {
                z-index: 10;
                width: 100%;
                height: 919px;
                background: rgba(84, 129, 163, 0.2);
                position: absolute;
                top: 86px;
            }        
            .msg-detail {
                font-size: 14px;
                font-family: FZLTHJW;
                color: #000000;
                line-height: 26px;
                z-index: 20;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -168px;
                margin-top: -150px;
                overflow-y: scroll;
                &::-webkit-scrollbar-track {
                    border-radius:10px;
                    background-color:#F1F1F1;
                }
                &::-webkit-scrollbar {
                    width:4px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius:10px;
                    background-color:#AFBFE8;
                }
                width: 336px;
                height: 370px;
                background: #FFFFFF;
                box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
                border-radius: 4px;
                padding: 26px;
                .time-box {
                    margin-bottom: 18px;
                    p {
                        &:first-of-type {
                            color: rgba(0, 0, 0, 0.5);
                            line-height: 20px;
                            i {
                                width: 14px;
                                height: 14px;
                                display: inline-block;
                                margin-right: 9px;
                                background: url('/img/summit/home/time.svg') no-repeat center center;
                                margin-bottom: -2px;
                            }
                        }
                        &:last-of-type {
                            font-size: 16px;
                        }
                    }
                }
                .speaker-box {
                    margin-bottom: 16px;
                    i {
                        width: 16px;
                        height: 16px;
                        display: block;
                        margin-bottom: 8px;
                        background: url('/img/summit/home/speaker.svg') no-repeat center center;
                    }
                }
                .desc-box {
                    p {
                        width: 284px;
                    }
                    i {
                        width: 18px;
                        height: 18px;
                        display: block;
                        margin-bottom: 8px;
                        background: url('/img/summit/home/desc.svg') no-repeat center center;
                    }
                }
            }
            .left {
                left: 45px;
            }
            .right {
                right: 15px;
                transform: rotateZ(-180deg);
            }
            .card-box {
                width: 100%;
                overflow: hidden;
                .card-list {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    margin-top: 8px;
                    transition: 0.5s ease-in-out;
                    li {
                        margin-left: 47px;
                        .null-item {
                            width: 260px;
                            height: 156px;
                        }
                        .section {
                            font-size: 20px;
                            font-family: HuaweiSansMedium;
                            color: #000000;
                            line-height: 29px;
                            text-align: center;
                            &:last-of-type {
                                margin-bottom: 30px;
                            }
                        }
                        .card-item {
                            width: 270px;
                            height: 150px;
                            border-radius: 8px;
                            overflow: hidden;
                            margin-bottom: 36px;
                            box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);
                            cursor: pointer;
                            &:hover {
                                box-shadow: 0px 6px 20px 0px rgba(0, 47, 167, 0.2);
                            }
                            p {
                                font-size: 18px;
                                color: rgba(0, 0, 0, 0.85);
                                line-height: 30px;
                                font-family: FZLTXIHJW;
                                margin: 30px;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                height: 90px;
                                width: 210px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 400px) {
    .agenda-carousel {
        .agenda-msg {
            .card-list {
                .msg-detail {
                    margin-left: -95px !important;
                }
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .agenda-carousel {
        .more-msg {
            display: none;
        }
        .agenda-msg {
            .card-list {
                width: calc(100% - 120px);
                .left {
                    left: 10px;
                }
                .right {
                    right: -3px;
                }
                .shade-remind {
                    width: 250px;
                    height: 536px;
                    top: 63px;
                    font-size: 12px;
                    line-height: 24px;
                }
                .msg-detail {
                    width: 220px;
                    height: 357px;
                    padding: 20px;
                    margin-left: -101px;
                    margin-top: -140px;
                    font-size: 10px;
                    .speaker-box,.time-box {
                        margin-bottom: 12px;
                    }
                    .time-box {
                        p {
                            &:last-of-type {
                                font-size: 12px;
                            }
                        }
                    }
                    .desc-box {
                        p {
                            width: 100%;
                            word-wrap: break-word;
                        }
                    }
                }
                .card-box {
                    .card-list {
                        li {
                            margin-left: 25px;
                            .section {
                                font-size: 14px;
                                &:last-of-type {
                                    margin-bottom: 10px;
                                }
                            }
                            .null-item {
                                width: 195px;
                                height: 90px;
                            }
                            .card-item {
                                &:hover {
                                    box-shadow: none;
                                }
                                width: 195px;
                                height: 90px;
                                margin-bottom: 15px;
                                p {
                                    font-size: 12px;
                                    line-height: 18px;
                                    margin: 18px;
                                    width: 160px;
                                    height: 54px;
                                }
                            }
                        }
                    }
                }
            }
            .time-list {
                margin-right: -10px;
                div {
                    font-size: 12px;
                    width: 120px;
                    height: 90px;
                    line-height: 90px;
                    margin-top: 20px;
                    &:first-of-type {
                        margin-top: 35px;
                    }
                }
                /deep/ .el-tabs__nav-scroll div{
                    font-size: 16px;
                }
                /deep/ .el-radio-group span {
                    font-size: 14px;
                }   
            }
        }
    }
}
</style>