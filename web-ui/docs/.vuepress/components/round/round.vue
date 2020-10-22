<!--使用时请给父元素添加除static定位外的定位样式-->
<template>
    <div class="round" :class="styleParams.backimage === 'blue'?'blueback':'pinkback'"
         :style="{width:styleParams.width + 'px',height:styleParams.height + 'px'}">
        <img :src="pcImage" alt="" />
        <p>{{value}}</p>
        <p>{{description}}</p>
    </div>
</template>

<script>
export default {
    name: "round",
    data() {
        return {}
    },
    props:['pcImage','value','description','styleParams']
}
</script>

<style lang="less" scoped>
.blueback{
    background-image: url('/img/round/ROUND-BLUE.png');
}
.pinkback{
    background-image: url('/img/round/ROUND-PINK.png');
}
.round{
    width: 294px;
    height: 294px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    position: absolute;
    img{
        display: block;
        width: 68px;
        height: 68px;
        margin: 70px auto 0 auto;
    }
    p{
        font-family: FZLTHJW;
        font-weight: normal;
        margin-top: 10px;
        text-align: center;
        &:first-of-type{
            font-size: 34px;
            color: #0B162B;
            line-height: 40px;
        }
        &:last-of-type{
            font-size: 18px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 21px;
        }      
    }
}
</style>