<!-- 视频控制组件 -->
<template>
    <!-- 父组件上请用.playControll的display实现hover，show-controll支持的是一直显示的情景 -->
    <div :class="['playControll',ctrlObj.isShow?'show-controll':'']">
        <div :class="['play-pause', isPlay?'pause-icon':'play-icon']" @click="isPlay=!isPlay"></div>
        <div class="timebar" @click="controllBar()" ref="progress"><span :style="{width:barPercentage + '%'}"></span></div>
        <div :class="['voice-mute', isMuted?'mute-icon':'voice-icon']" @click="isMuted=!isMuted"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isPlay:false,
            isMuted:false,
            realTimeUpdate:null,
            barPercentage:0,    //进度条进度
        }
    },
    props:['ctrlObj'],
    watch: {
        isPlay:function(){
            if(this.isPlay==true){
                this.ctrlObj.element.play();
                this.realTimeUpdate = setInterval(()=>{
                    this.progressBar();
                }, 200) ;
                this.$emit('playStatus',true)
            }else{
                this.ctrlObj.element.pause();
                clearInterval(this.realTimeUpdate);
                this.$emit('playStatus',false)
            }
        },
        isMuted:function(){
            if(this.isMuted==false){
                this.ctrlObj.element.muted=false;
            }else{
                this.ctrlObj.element.muted=true;
            }
        }
    },
    methods: {
        progressBar(){
            let duration = this.ctrlObj.element.duration;  //  获取视频总长度
            let currentTime = this.ctrlObj.element.currentTime; //  获取当前播放时间
            let ratio = parseFloat(currentTime/duration);
            if(this.ctrlObj.element.readyState <= 0) {  //  判断视频是否能够正常读取
                this.barPercentage = 0;
                return;
            }
            if(currentTime >= duration){
                ratio = 1;
                clearInterval(this.realTimeUpdate);
                this.isPlay = true;
            }
            this.barPercentage = Math.floor(ratio*100);
        },
        controllBar(e){
            //点击进度条快进或后退
            e = e || window.event;
            let nowProgress = e.offsetX;
            let nowDuration = this.ctrlObj.element.duration;
            this.barPercentage = Math.floor(parseFloat(nowProgress/300)*100);
            this.ctrlObj.element.currentTime = parseFloat(parseFloat(nowProgress/300) * nowDuration);
        }
    },
    destroyed () {
        clearInterval(this.realTimeUpdate);
    }
}

</script>

<style lang='less' scoped>
.playControll{
    display: none;
    width: 390px;
    height: 40px;
    background: #AAAAAA;
    position: absolute;
    bottom: 35px;
    left: 50%;
    margin-left: -195px;
    z-index: 999999999;
    border-radius: 25px;
    opacity: 0.5;
    .play-pause{
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5px;
        left: 10px;
        cursor: pointer;
        background-size: cover;
    }
    .play-icon{
        background-image: url('/img/home/icon-play.svg');
    }
    .pause-icon{
        background-image: url('/img/home/icon-pause.svg');
    }
    .timebar{
        position: absolute;
        top: 16px;
        left: 45px;
        width: 300px;
        height: 6px;
        background: #222222;
        border-radius: 5px;
        cursor: pointer;
        span{
            display: block;
            height: 100%;
            overflow: hidden;
            background: white;
            border-radius: 5px;
        }
    }
    .voice-mute{
        width: 26px;
        height: 25px;
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
        background-size: cover;
    }
    .voice-icon{
        background-image: url('/img/home/icon-voice.svg');
    }
    .mute-icon{
        background-image: url('/img/home/icon-mute.svg');
    }
}
.hide-Frist{
    display: block;
}
</style>
