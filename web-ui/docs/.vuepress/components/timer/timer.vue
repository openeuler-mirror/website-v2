<template>
    <div class="count-down">
        <p class="timeText">距离活动开始还有：</p>
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
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MIN</span>
            <span>SEC</span>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            targetTime: {
                year: 2020,
                month: 11,
                day: 24,
                hour: 0,
                minute: 0,
                second: 0,
                time: 0
            },
            showTime: {
                day: '',
                hour: '',
                minute: '',
                second: ''
            },
            timer: null
        }
    },
    created() {
        this.getTargetTime();
    },
    mounted() {
        this.calculateTime();
        this.timer = setInterval(()=> {
            this.calculateTime();
        },1000);
    },
    methods:{
        getTargetTime() {
            //new Date(year,month,day,hour,min,sec) 得到某日期的日期对象
            let year = this.targetTime.year;
            let month = this.targetTime.month;
            let day = this.targetTime.day;
            let hour = this.targetTime.hour;
            let min = this.targetTime.minute;
            let sec = this.targetTime.second;
            let time2 = new Date(year,month,day,hour,min,sec);
            this.targetTime.time = parseInt(time2.getTime());
        },
        calculateTime() {
            let currentTime = new Date().getTime();
            let result = (this.targetTime.time - currentTime) / 1000;
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
    width: 300px;
    height: 150px;
    margin: 0 auto;
    p{
        margin-bottom: 20px;
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
            &:nth-of-type(3) {
                margin-right: 28px;
            }
        }
    }
}
</style>