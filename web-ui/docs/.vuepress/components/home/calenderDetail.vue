<template>
    <div id="showDetail">
        <div class="bg" @click="handleClose"></div>
        <div class="cadenderSinge active">
            <h1 class="calenderH1">{{item3.name}}</h1>
            <span class="meetingTime">{{i18n.common.MEETINGS_TIME}}{{item3.startTime+"-"+item3.endTime}}</span>
            <div class="meetDetail clearfix">
                <img :src="item3.url" :alt="item3.creator"/>
                <div class="meetDetailDe">
                <h2>{{item3.creator}}</h2>
                <p>{{item3.detail}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'calenderDetail',
    props: {
        item3: {
            type: Object,
        }
    },
    data(){
        return{

        }
    },
    methods: {
        handleClose(){
            this.$emit('close-detail')
        },
    }
    
}
</script>
<style lang="less" scoped>
#showDetail{
    position: absolute;;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    text-align: left;
}
.bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10000%;
    background: #000;
    opacity:  0.5;
    z-index: 1;
}
.cadenderSinge{
    @media screen and (max-width: 1000px) {
        max-width: 180px;
    }
    width: 260px;
    min-height: 140px;
    border-radius: 4px;
    height: 92px;
    padding: 12px 20px 15px;
    position:  absolute;
    top: 50%;
    left: 50%;
    transform:  translate(-50%, -50%);
    /*margin: -96px 0 0 -35px;*/
    z-index: 10;
    background: #fff;
    
  }
  .meetDetail {
    margin-top: 10px;
    display: flex;
    justify-content: start;
  }
  .meetDetail img{
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .meetDetailDe{
    width: 140px;
    padding-left: 10px;
  }
  .meetingTime{
    line-height: 14px;
    font-size: 12px;
    color: #000;
    margin-bottom: 10px;
  }
  h1{
    margin: 0;
    font-size: 16px;
  }
  
  .meetDetailDe h2{
    line-height: 20px;
  }
   .meetDetailDe p{
    line-height: 18px;
    font-size: 12px;
    margin: 0;
  }
  .cadenderSinge.active{
    padding: 15px 20px;
  }
  h2{
    margin: 0;
    font-size: 14px;
  }
</style>