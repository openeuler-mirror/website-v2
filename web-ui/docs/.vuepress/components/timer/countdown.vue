<template>
    <div class="count-down" :style="{backgroundImage: 'url(' + timeImage + ')'}">
        <div class="started">
            <p class="timeText">{{ i18n.timer.TIMETEXT.STARTED }}</p>
            <p class="timeValue">
                <span class="day">{{ showTime.day }}</span>
                <span>:</span>
                <span class="hour">{{ showTime.hour }}</span>
                <span>:</span>
                <span class="minute">{{ showTime.minute }}</span>
                <span>:</span>
                <span class="second">{{ showTime.second }}</span>
            </p>
            <p class="timeDesc">
                <span v-for="(item,index) in i18n.timer.TIMEDESC">{{ item }}</span>
            </p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            timeText: '',
            showTime: {
                day: '',
                hour: '',
                minute: '',
                second: ''
            },
            timer: null,
            targetValue:0
        }
    },
    //开始时间和结束时间形式：2020-(年|/|.)12-(月|/|.)23(日) 12:()00
    props: ["targetTime","startTime","timeImage"],
    created() {
        this.getTargetTime();
    },
    mounted() {
        this.calculateTime();
        this.timer = setInterval(()=> {
            this.calculateTime();
        },1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods:{
        getTargetTime() {
            //new Date(year,month,day,hour,min,sec) 得到某日期的日期对象 month:0~11
            let timeArr = this.targetTime.split(" ");
            let year = timeArr[0].slice(0,4);
            let month = 0;
            let day = 0;
            let hour = 0;
            let min = 0;
            if(isNaN(timeArr[0].slice(6,7))) {
                month = timeArr[0].slice(5,6) - 1;
                day = timeArr[0].slice(7,9);
            }else {
                month = timeArr[0].slice(5,7) - 1;
                day = timeArr[0].slice(8,10);
            }
            if(isNaN(timeArr[1].slice(1,2))) {
                hour = timeArr[1].slice(0,1);
                min = timeArr[1].slice(2,4);
            }else {
                hour = timeArr[1].slice(0,2);
                min = timeArr[1].slice(3,5);
            }
            let time2 = new Date(year,month,day,hour,min,0);
            this.targetValue = parseInt(time2.getTime());
        },
        calculateTime() {
            let currentTime = new Date().getTime();
            let result = (this.targetValue - currentTime) / 1000;
            let resDay = Math.floor(result / (3600 * 24));
            result = result % (3600 * 24);
            let resHour = Math.floor(result / 3600);
            result = result % 3600;
            let resMinute = Math.floor(result / 60);
            result = result % 60;
            let resSecond = result;
            this.showTime.day = this.addZero(resDay);
            this.showTime.hour = this.addZero(resHour);
            this.showTime.minute = this.addZero(resMinute);
            this.showTime.second = this.addZero(Math.floor(resSecond));
        },
        addZero(value) {
            return Math.abs(value) < 10? '0' + value:value;
        }
    }
}
</script>

<style lang='less' scoped>
.count-down {
    width: 400px;
    height: 150px;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    color: white;
    .started {
        p{
        margin-bottom: 20px;
            text-align: center;
        }
        .timeText{
            font-size: 18px;
        }
        .timeValue{
            span{
                font-size: 30px;
                display: inline-block;
                margin-right: 9px;
            }
        }
        .timeDesc{
            span{
                font-size: 16px;
                display: inline-block;
                margin-right: 15px;
            }
        }
    }
    
}
</style>