<template>
    <div class="calender is-pc">
        <div class="calendar-top">
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
            <div class="calenderSliderTopMain">
                <div
                    class="calenderSliderTopMainswiper"
                    :style="'width:' + (tableData.length * 260) + 'px;transform:translateX(' + l + 'px)'"
                >
                    <span
                        v-for="(item,key) in dealData"
                        :key="key"
                        :class="{ active: item.date == currentDate }"
                    >{{ item.date }}</span>
                </div>
            </div>
        </div>
        <div class="calenderMain">
            <div class="calenderLeft">
                <button
                    class="top"
                    @click="handleBtn('top')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <button
                    class="bottom"
                    @click="handleBtn('bottom')"
                    :style="{ background: 'url(' + prev + ') no-repeat center' }"
                ></button>
                <div class="calenderLeftTime">
                    <div
                        class="calendarLeftTimeSwiper"
                        :style="'width: ' + (tableData.length * 260) + 'px;transform: translateY(' + t + 'px)'"
                    >
                        <span
                            v-for="(item, key) in timeData"
                            :key="key"
                            :class="{ active: item == currentTime }"
                        >{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="calendarSlide">
                <calenderDetail :item3="saveItem" @close-detail="close" v-if="isShowDetail" />
                <div class="calendarSlideItem" :style="'transform: translateX(' + l + 'px)'">
                    <template v-for="(item, key) in dealData">
                        <div
                            class="calenderslideItemInside"
                            :key="key"
                            :style="'transform: translateY(' + (item.timeDate.length == 1 && item.timeDate[0].duration >= 16 ? 0: t) + 'px)'"
                        >
                            <template v-for="(item1, index1) in item.timeDate">
                                <div
                                    :class="'calenderslideItemInsideItem' + (item1.duration >= 16 ? ' all' : '')"
                                    :key="index1"
                                    :style="returnHeight(item1)"
                                >
                                    <template v-for="(item2, index2) in item1.dealDate">
                                        <div
                                            :key="index2"
                                            class="calenderListSinge"
                                            :style="returnInsideH(item2)"
                                            v-if="item1.duration < 16"
                                        >
                                            <button
                                                class="left btnMy"
                                                v-if="item2.data.length > 1"
                                                @click="handleBtnMysef('left', key, index1, index2, dealData)"
                                                :style="{ background: 'url(' + prevDetail + ') no-repeat center' }"
                                            ></button>
                                            <button
                                                class="right btnMy"
                                                v-if="item2.data.length > 1"
                                                @click="handleBtnMysef('right', key, index1, index2, dealData)"
                                                :style="{ background: 'url(' + prevDetail + ') no-repeat center' }"
                                            ></button>
                                            <span
                                                v-if="item2.data.length > 1"
                                                class="calenderCurrentIndex"
                                            >{{ item2.index }} / {{ item2.data.length }}</span>
                                            <div
                                                class="calenderInsideAll"
                                                :style="'transform: translateX(' + (-230 * (item2.index - 1)) + 'px)'"
                                            >
                                                <div
                                                    v-for="(item3, index3) in item2.data"
                                                    :key="index3"
                                                    :class="'cadenderSinge' + (item1.duration > 1 && item3.duration == item1.duration ? ' active': '')"
                                                    @click="handleShowDetail(item1, item3)"
                                                >
                                                    <h1 class="calenderH1">{{ item3.name }}</h1>
                                                    <div
                                                        class="meetDetail"
                                                        v-if="item1.duration > 1 && item3.duration == item1.duration"
                                                    >
                                                        <span
                                                            class="meetingTime"
                                                        >会议时间：{{ item3.startTime + "-" + item3.endTime }}</span>
                                                        <img :src="item3.url" :alt="item3.creator" />
                                                        <div class="meetDetailDe">
                                                            <h2>{{ item3.creator }}</h2>
                                                            <p>{{ item3.detail }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import calenderDetail from "./calenderDetail.vue";
export default {
    name: "HelloWorld",
    data() {
        return {
            t: 0,
            l: 0,
            Ml: 0,
            indexX: 0,
            indexY: 2,
            currentDate: "",
            currentTime: "",
            dealData: [],
            timeData: [
                "6:00-7:00",
                "7:00-8:00",
                "8:00-9:00",
                "9:00-10:00",
                "10:00-11:00",
                "11:00-12:00",
                "12:00-13:00",
                "13:00-14:00",
                "14:00-15:00",
                "15:00-16:00",
                "16:00-17:00",
                "17:00-18:00",
                "18:00-19:00",
                "19:00-20:00",
                "20:00-21:00",
                "21:00-22:00"
            ],
            saveItem: {},
            isShowDetail: false,
            prev: "/img/home/prev.svg",
            prevDetail: "/img/home/prev-detail.svg",
            flag: false
        };
    },
    components: {
        calenderDetail
    },
    props: ["tableData"],
    watch: {
        tableData: function() {
            if (!this.flag) {
                this.getOriginData(this.tableData);
            }
            this.flag = true;
        }
    },
    methods: {
        handleBtn(val) {
            if (val === "left" || val === "right") {
                let len = this.tableData.length;
                if (val === "left") {
                    if (this.indexX <= 0) {
                        this.indexX = 0;
                    } else {
                        this.indexX--;
                    }
                } else {
                    if (this.indexX >= len - 4) {
                        this.indexX = len - 4;
                    } else {
                        this.indexX++;
                    }
                }
                // this.l =-260*this.indexX
                this.l = -245 * this.indexX;
            }
            if (val === "top" || val === "bottom") {
                let len = this.timeData.length;
                if (val === "top") {
                    if (this.indexY <= 0) {
                        this.indexY = 0;
                    } else {
                        this.indexY--;
                    }
                } else {
                    if (this.indexY >= len - 10) {
                        this.indexY = len - 10;
                    } else {
                        this.indexY++;
                    }
                }
                this.t = -76 * this.indexY;
            }
        },
        //数组去重
        unique(arr) {
            return Array.from(new Set(arr));
        },
        toTwo(n) {
            return n < 10 ? "0" + n : n;
        },
        returnDate(string) {
            let times = new Date();
            let y = times.getFullYear();
            let M = times.getMonth() + 1;
            let d = times.getDate();
            let h = times.getHours();
            let m = times.getMinutes();
            let s = times.getSeconds();
            let currentDate = M + "月" + d + "日";
            let currentTime = h + ":00" + "-" + (h + 1) + ":00";
            let nowTime =
                y +
                "-" +
                this.toTwo(M) +
                "-" +
                this.toTwo(d) +
                " " +
                this.toTwo(h) +
                ":" +
                this.toTwo(m) +
                ":" +
                this.toTwo(s);
            let nowDate = y + "-" + this.toTwo(M) + "-" + this.toTwo(d);
            if (string === "dateTime") {
                return currentDate;
            } else if (string === "currentTime") {
                return currentTime;
            } else if (string === "nowTime") {
                return nowTime;
            } else {
                return nowDate;
            }
        },
        returnHeight(item) {
            let str = "";
            let h = 0;
            let t = 0;
            if (item.duration >= 16) {
                str = false;
            } else {
                let currentIndex = 0;
                this.timeData.forEach((items, i) => {
                    let times = items.split("-")[0];
                    let itemTime =
                        parseInt(item.duration_time.split("-")[0]) + ":00";
                    if (times === itemTime) {
                        currentIndex = i;
                    }
                });
                h = 76 * parseInt(item.duration) - 20;
                if (item.duration < 16) {
                    t = 76 * parseInt(currentIndex);
                } else {
                    t = 0;
                }
                str = `height: ${h}px;top: ${t}px;`;
            }
            return str;
        },
        returnInsideH(item) {
            let str = "";
            let h = 0;

            let index = 0;

            item.data.forEach(items => {
                index = items.duration;
            });
            h = 76 * parseInt(index) - 20;

            str = `height: ${h}px;`;
            return str;
        },
        handleShowDetail(item1, item3) {
            if (item1.duration > 1 && item3.duration == item1.duration) {
                return false;
            } else {
                this.saveItem = item3;
                this.isShowDetail = true;
            }
        },
        close() {
            this.isShowDetail = false;
        },
        handleBtnMysef(str, key, index1, index2, datas) {
            let { index, data } = datas[key].timeDate[index1].dealDate[index2];
            let len = data.length;
            if (str === "left") {
                if (index <= 1) {
                    index = 1;
                } else {
                    datas[key].timeDate[index1].dealDate[index2].index--;
                }
            } else {
                if (index >= len) {
                    index = len;
                } else {
                    datas[key].timeDate[index1].dealDate[index2].index++;
                }
            }
            this.dealData = [];

            this.dealData = datas;
        },
        getOriginData(data) {
            data.forEach(item => {
                item.timeDate.forEach(item1 => {
                    item1.dealDate = {};
                    let flags = true;
                    item1.meetingData.forEach(meetItem => {
                        if (
                            meetItem.duration !== item1.duration &&
                            meetItem.startTime !== item1.startTime
                        ) {
                            flags = false;
                        }
                    });
                    if (!flags) {
                        for (let i = 0; i < item1.duration; i++) {
                            let times = parseInt(item1.startTime) + i + ":00";
                            item1.dealDate[times] = [];
                        }
                        item1.meetingData.forEach(item2 => {
                            if (item2.startTime === item1.startTime) {
                                for (const key in item1.dealDate) {
                                    if (key === item2.startTime) {
                                        item1.dealDate[key].push(item2);
                                    }
                                }
                            }
                            for (
                                let i = parseInt(item2.startTime);
                                i < parseInt(item2.endTime);
                                i++
                            ) {
                                let times = i + ":00";
                                for (const key in item1.dealDate) {
                                    if (key === times) {
                                        item1.dealDate[key].push(item2);
                                    }
                                }
                            }
                        });
                        //去重
                        for (const key in item1.dealDate) {
                            let datas = this.unique(item1.dealDate[key]);
                            item1.dealDate[key] = datas;
                        }
                    } else {
                        let times = parseInt(item1.startTime) + ":00";
                        item1.dealDate[times] = item1.meetingData;
                    }
                    let flag = true;
                    item1.meetingData.forEach(items => {
                        if (items.duration !== item1.duration) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        for (const key in item1.dealDate) {
                            if (key !== item1.startTime && !flags) {
                                delete item1.dealDate[key];
                            }
                        }
                    } else {
                        for (const key in item1.dealDate) {
                            item1.dealDate[key].forEach(items => {
                                items.duration = 1;
                            });
                        }
                    }
                    for (const key in item1.dealDate) {
                        let datas = item1.dealDate[key];
                        item1.dealDate[key] = {};
                        item1.dealDate[key].index = 1;
                        item1.dealDate[key].data = datas;
                    }
                    this.dealData = data;
                });
            });
        }
    },
    created() {
        this.t = -76 * this.indexY;
        this.currentDate = this.returnDate("nowDate");
        this.currentTime = this.returnDate("currentTime");
    }
};
</script>
<style scoped>
h1,
p,
span,
li,
a {
    font-family: FZLTHJW;
}
div::after {
    content: "";
    display: block;
    clear: both;
}
.is-pc {
    display: block;
}
.calender {
    /* width: 1170px; */
    width: 1100px;
    margin: 65px auto 0;
    position: relative;
    top: 0;
    left: 0;
}
.calendar-top {
    /* width: 1030px; */
    width: 970px;
    position: relative;
    top: 0;
    /* left: 150px; */
    left: 100px;
}
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
}
.calenderSliderTopMainswiper {
    transition: transform 0.5s ease-in-out;
}
.calendarLeftTimeSwiper {
    transition: transform 0.5s ease-in-out;
}
.left {
    top: 0;
    left: -20px;
}
.right {
    top: 0;
    right: -20px;
    transform: rotateZ(-180deg);
}
.top {
    top: -20px;
    height: 20px;

    left: 50%;
    margin-left: -10px;
    transform: rotateZ(90deg);
}
.bottom {
    bottom: -20px;
    height: 20px;
    left: 50%;
    margin-left: -10px;
    transform: rotateZ(-90deg);
}
.calenderSliderTopMain {
    /* width: 1030px; */
    width: 985px;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
}
.calenderSliderTopMain span {
    /* width: 240px; */
    width: 230px;
    /* margin-right: 20px; */
    margin-right: 15px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    display: block;
    float: left;
    font-family: FZLTCHJW;
}
.calenderMain {
    position: relative;
    top: 20px;
    height: 740px;
    left: 0;
}
.calenderLeft {
    height: 740px;
    position: absolute;
    top: 0;
    left: 0;
}
.calenderLeftTime {
    /* width: 130px; */
    width: 90px;
    height: 740px;
    overflow: hidden;
}
.calenderLeftTime span {
    /* width: 130px; */
    width: 90px;
    margin-bottom: 20px;
    height: 56px;
    line-height: 56px;
    display: block;
    font-size: 14px;
    text-align: center;
    font-family: FZLTHJW;
}
.calenderLeftTime span.active {
    color: blue;
}
.calenderSliderTopMain span.active {
    color: blue;
}
.calendarSlide {
    padding: 10px 0 0 10px;
    /* width: 1030px; */
    width: 985px;
    height: 760px;
    overflow: hidden;
    position: absolute;
    top: -10px;
    /* left: 140px; */
    left: 100px;
}
.calenderslideItemInside {
    float: left;
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    /* width: 260px; */
    width: 245px;
    transition: transform 0.5s ease-in-out;
}
.calendarSlideItem {
    position: relative;
    top: 0;
    left: 0;
    width: 1000000px;
    height: 1000000px;
    transition: transform 0.5s ease-in-out;
}
.calenderslideItemInsideItem {
    /* width: 240px;
        margin-right: 20px; */
    width: 230px;
    margin-right: 20px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    /* padding-bottom: 20px; */
    padding-bottom: 20px;
}
.calenderslideItemInsideItem.all {
    /* width: 240px; */
    width: 230px;
    height: 740px;
    transition: transform 0.5s ease-in-out;
    background: blue;
}
.calenderListSinge {
    /* width: 240px; */
    width: 230px;
    box-shadow: 0px 4px 10px #ececec;
    margin-bottom: 20px;
    overflow: hidden;
}
.calenderInsideAll {
    width: 10000000px;
    position: relative;
    top: 0;
    left: 0;
    transition: transform 0.5s ease-in-out;
}
.cadenderSinge {
    /* width: 240px; */
    width: 230px;
    min-height: 56px;
    border-radius: 4px;
    padding: 12px 20px 15px;
    position: relative;
    top: 0;
    cursor: pointer;
    float: left;
}
.meetDetail img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    float: left;
}
.meetDetailDe {
    width: 140px;
    padding-left: 60px;
}
.meetDetail .meetingTime {
    position: absolute;
    top: 45px;
    left: 20px;
    line-height: 14px;
    font-size: 12px;
    color: #dfdfdf;
}
h1 {
    margin: 0;
    font-size: 16px;
}

.meetDetailDe h2 {
    line-height: 20px;
}
.meetDetailDe p {
    line-height: 18px;
    font-size: 12px;
    margin: 0;
}
.calenderH1 {
    line-height: 30px;
}
.cadenderSinge.active {
    padding: 15px 20px;
    cursor: auto;
}
.cadenderSinge.active .calenderH1 {
    padding-bottom: 20px;
}
h2 {
    margin: 0;
    font-size: 14px;
}
.btnMy {
    top: 50%;
    margin-top: -20px;
    opacity: 0.5;
}
.left.btnMy {
    left: 0;
}
.right.btnMy {
    right: 0;
}
.calenderListSinge {
    position: relative;
    top: 0;
    left: 0;
}
.calenderListSinge:hover .btnMy {
    opacity: 1;
}
.calenderCurrentIndex {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 80px;
    display: block;
    text-align: center;
    margin-left: -40px;
    font-size: 12px;
    color: #999;
}
@media screen and (max-width: 1000px) {
    .is-pc {
        display: none;
    }
}
</style>
