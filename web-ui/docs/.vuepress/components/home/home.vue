<template>
    <div class="home">
        
    </div>
</template>

<script>
    
    let that = null;
    let remoteMethods = {
        meetingList () {
            meetingList()
            .then(data => {
                that.calenderData = data.tableData;
            })
            .catch(data => {
                that.$message.error(data);
            });
        }
    }
    export default {
        name: "home",
        data() {
            that = this;
            return {
                info: 'aaa',
                flag: true,
                height: "380px",
                banner1: "/img/home/Banner1.gif",
                activeImg: "/img/home/homeActive.gif",
                startIndex: 0,
                endIndex: 4,
                blogList: null,
                newsList: null,
                currentRoom: 0,
                roomName: [],
                rooms1: true,
                rooms2: false,
                rooms3: false,
                calenderData: [],
                autoPlay: true,
                videoCtrlParams:{
                    element: '',
                    isShow: false,  //默认不显示控制器
                },
                isNowPlay: false,
                isShowCard: false,  //是否显示移动端点击体验的卡片
                mobilePlayBtnDisplay: true,
                swiperOption: {
                    loop: true
                },
                mobileSwiperInterval: null,
                mobilePagenationIndex: 1,
                developerList: []
            }
        },
        mounted() {
            
        },
        beforeDestroy () {
            
        },
        computed: {
            
        },
        components: {
            
        },
        methods: {
            
        }
    }
</script>

<style lang="less">
    .home-banner .el-carousel__button {
        height: 10px;
        width: 10px;
        background-color: #000;
        border-radius: 50%;
    }
    .el-carousel__container {
        height: 500px;
    }
    .el-carousel__button{
        opacity: 0.2;
    }
    .room-card .el-carousel__container {
        height: 360px;
    }

    @media screen and (max-width: 1000px) {
        .el-carousel__container {
            height: 369px;
        }
        .room-card {
            display: none;
        }
    }
</style>

<style lang="less" scoped>
    .mobile-swiper {
        height: 300px;
    }
    .mobile-home-carousel {
        position: relative;
        .mobile-pagination {
            z-index: 99;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            li {
                margin-right: 10px;
                display: inline-block;
                height: 10px;
                width: 10px;
                border-radius: 50%;
                background-color: #000;
                opacity: .2;
            }
            .mobile-pagination-active {
                opacity: 1;
            }
        }
    }
    .en-weight-family{ 
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
    }
    .en-h3{
        line-height: 34px !important;
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
        color: #000000 !important;
    }
    .en-p{
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
        line-height: 32px !important;
    }
    [v-cloak] {
        display: none !important;
    }
    .home-auth {
        display: none;
    }
    .is-pc {
        display: block;
    }
    .is-h5 {
        display: none;
    }
    .home h1,
    .home h3,
    .home h5,
    .home p,
    .home span,
    .home a {
        font-family: FZLTHJW;
    }
    .home h3 {
        font-size: 30px;
        color: #0b162b;
        text-align: center;
        margin-bottom: 20px;
    }
    .word-hover{
        &:hover{
            color: #002FA7;
        }
    }
    .home p {
        font-size:14px;
        text-align: center;
        line-height: 24px;
        margin: 0 auto;
        color: rgba(0, 0, 0, .5);
    }
    .home-carousel .el-carousel__item h3 {
        font-size: 24px;
        color: #000;
        text-align: left;
        line-height: 48px;
        font-family: FZLTCHJW;
        margin-top: 100px;
    }
    .home-carousel .el-carousel__item span {
        display: inline-block;
        width: 620px;
        font-size: 18px;
        line-height: 40px;
        margin-top: 30px;
    }
    .carousel-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .carousel-item .train-banner-box{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
            &:first-of-type{
                width: 620px;
                height: 400px;
            }
            display: inline-block;
            &:last-of-type{
                margin-left: 211px;
            }
        }
    }
    .carousel-item .card-summer {
        width: 620px;
        margin-top: 100px;
        text-align: center;
    }
    .card-summer img:first-child {
        width: 256px;
        margin-top: 0;
    }
    .banner-gif {
        margin-top: 80px;
    }
    .banner-link {
        cursor: pointer;
        text-decoration: none;
        color: #000;
    }
    .banner-item {
        width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        .download-version{
            width: 74px;
            height: 24px;
            font-size: 12px;
            font-family: FZLTXIHJW;
            margin-top: 60px;
            color: #ffffff;
            line-height: 24px;
            background-color: #002fa7;
            border-radius: 4px;
            text-align: center;
            div{
                display: inline-block;
            }
        }
        .en-version{
            width: 108px;
        }
    }
    .carousel-item .card-summer span {
        margin-left: 0;
        text-align: left;
        width: 100%;
    }
    .carousel-item .base-software-box{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        cursor: pointer;
        @media screen and (max-width: 1000px) {
            background-size: 100% 100%;
        }
    }
    .carousel-item img {
        z-index: -1;
    }
    .carousel-item video {
        position: absolute;
        top: 0;
    }
    .carousel-item .HC-box{
        position: relative;
        cursor: pointer;
        width: 1080px;
        height: 500px;
        margin: 0 auto;
    }
    .carousel-item .HC-left-box{
        position: absolute;
        top: 15%;
        left: 5%;
        img{
            width: 65px;
            height: 47px;
        }
        .center-word{
            margin-top: 57px;
            p{
                text-align: left;
                &:first-of-type{
                    font-size: 45px;
                    font-family: HuaweiSansMedium;
                    color: #1E1E1E;
                    line-height: 61px;
                }
                &:last-of-type{
                    font-size: 32px;
                    font-family: FZLTCHJW;
                    font-weight: normal;
                    color: #1E1E1E;
                    line-height: 39px;
                    letter-spacing: 19px;
                    margin-top: 12px;
                }
            }
        }
        .bottom-word{
            margin-top: 57px;
            p{
                text-align: left;
                font-family: FZLTCHJW;
                font-weight: normal;
                color: #1E1E1E;
                &:first-of-type{
                    line-height: 36px;
                    letter-spacing: 6px;
                }
                &:last-of-type{
                    line-height: 27px;
                    letter-spacing: 2px;
                    margin-top: 14px;
                }
            }
        }
    }
    .carousel-img {
        width: 1080px;
        height: 480px;
        z-index: -1;
    }
    .carousel-video{
        &:hover{
            .playControll{
                display: block;
            }
        }
        .play-btn{
            width: 100px;
            height: 100px;
            position: absolute;
            border-radius: 50px;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -50px -50px;
            background-image: url('/img/home/play-btn.gif');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
        }
    }
    .carousel-video img {
        width: 100%;
        
    }
    .carousel-video video {
        outline: none;
        object-fit: cover;
    }
    .el-carousel__container {
        height: 680px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .home-banner .el-carousel__button {
        height: 10px;
        width: 10px;
        background-color: #000;
        border-radius: 50%;
    }
    .home-introduce {
        padding-top: 100px;
        text-align: center;
        width: 1080px;
        margin: 0 auto;
    }
    .map-rode {
        width: 1080px;
        margin: 0 auto;
        position: relative;
    }
    .rode-left {
        position: absolute;
        left: 95px;
        z-index: -10;
    }
    .rode-middle {
        position: absolute;
        left: 420px;
        top: -310px;
        z-index: -10;
    }
    .rode-right {
        position: absolute;
        left: 760px;
        top: -70px;
        z-index: -10;
    }
    .plane-left {
        position: absolute;
        left: 215px;
        z-index: -10;
    }
    .plane-middle {
        position: absolute;
        left: 595px;
        top: -325px;
        z-index: -10;
    }
    .plane-right {
        position: absolute;
        left: 920px;
        top: -25px;
        z-index: -10;
    }
    .home-introduce .is-h5.mapArea {
        display: none ;
    }
    .home-introduce .is-pc {
        display: block;
    }
    .home-introduce h1 {
        text-align: center;
        font-size: 40px;
        color: #002fa7;
        margin-bottom: 40px;
        font-family: Roboto-BoldCondensed;
    }
    .home-introduce .en-p{
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
    }
    .home-introduce .en-areabox-down{
        top:-82px !important;
        left: 84% !important;
    }
    .home-introduce p {
        max-width: 576px;
        font-family: FZLTXIHJW;
    }
    .home-introduce .mapArea {
        display: inline-block;
        width: 100%;
        height: 280px;
        margin-top: 84px;
        position: relative;
    }
    .area-box.in-pc:nth-child(1) {
        position: absolute;
        top: 88px;
        left: 0;
    }
    .area-box.in-pc:nth-child(2) {
        display: none;
    }
    .area-box.in-pc:nth-child(3) {
        position: absolute;
        top: 90px;
        left: 56%;
    }
    .area-box.in-pc:nth-child(4) {
        position: absolute;
        top: -40px;
        left: 80%;
    }
    .area-box.in-pc:nth-child(5) {
        position: absolute;
        top: 0;
        left: 28%;
    }
    .area-box {
        display: inline-block;
        width: 191px;
    }
    .area-box a {
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
    .area-box .box-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        color: #fff;
        font-size: 20px;
        line-height: 60px;
        background-color: #002fa7;
        border-radius: 50%;
    }
    .area-box .en-areabox-p{
        font-family: Roboto-Condensed, Roboto;
        color: #002FA7;
        line-height: 26px;
        max-width: 138px;
    }
    .area-box p {
        display: inline-block;
        font-size: 16px;
        color: #002fa7;
        margin-left: 10px;
    }
    .area-box img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 10px 0 26px 30px;
    }
    .area-box .en-areabox-gif{
        top: 105px !important;
    }
    .area-box .is-hidden {
        display: none;
        width: 150px;
        height: 150px;
    }
    .area-box .is-hovered {
        display: block;
        position: absolute;
        top: 60px;
    }
    .area-box .down .is-hovered {
        top: 0px;
    }
    .snd-guidance {
        display: none;
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        padding: 10px 23px 23px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
        text-align: left;
        margin-top: 15px;
        margin-left: 25px;
    }
    .snd-guidance.is-show {
        display: block;
        width: 280px;
    }
    .en-snd-guidance{
        padding: 10px !important;
         margin-top: 0 !important;
         @media screen and (max-width: 1000px) {
             p{
                 margin: 0 0 0 8px !important;
             }
         }
    }
    .snd-guidance .en-link-title{
        font-size: 12px !important;
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
        color: #000000 !important;
        line-height: 18px !important;
        position: absolute;
        bottom: 75px;
        width: inherit;
    }
    .d3-guide {
        display: flex;
        justify-content: space-between;
    }
    .d3{
        margin-left: 30px;
        width: 15px;
        height: 15px;
        transform: rotate(45deg);
        border-left: 1px solid rgba(0, 47, 167, .5);
        border-top: 1px solid rgba(0, 47, 167, .5);
        box-sizing: border-box;
        position: relative;
        top: -18px;
        background: #fff;
    }
    .guide-way {
        margin-right: 20px;
        text-align: center;
        font-family: FZLTXIHJW;
    }
    .guide-way:last-child {
        margin: 0;
    }
    .guide-way a {
        text-decoration: none;
        color: #002f33;
        font-size: 12px;
    }
    .en-guide-way {
        &:first-of-type{
            img{
                margin: 10px 0 0 11px !important;
            }
        }
        margin: 0 10px 0 0;
        span{
            font-size: 10px !important;
            font-family: Roboto-Condensed, Roboto !important;
            font-weight: normal !important;
            color: #000000 !important;
            line-height: 12px !important;
        }
    }
    .guide-way img {
        width: 36px;
        height: 36px;
        margin: 10px 0 0;
    }
    .snd-guidance p {
        font-size: 14px;
        line-height: 18px;
        text-align: left;
        margin: 0;
        color: #002f33;
    }
    .home-active {
        width: 100%;
        height: 220px;
        text-align: center;
        margin-top: 120px;
        background-color: rgba(1, 0, 87, .85);
        background-repeat: repeat-x;
        background-size:contain;
    }
    .home-active a {
        display: block;
        width: 100%;
        height: 220px;
        text-decoration: none;
        color: #fff;
    }
    .en-h3-home .en-h3-home{
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
        color: #FFFFFF !important;
        line-height: 34px !important;
    }
    .home-active h3 {
        font-size: 30px;
        color: #fff;
        padding: 70px 0 20px;
        margin: 0;
    }
    .home-active p {
        font-size: 14px;
        margin: 0 35px;
        text-align: center;
        color: rgba(255, 255, 255, .8);
    }
    .home-calendar {
        width: 1080px;
        margin: 90px auto 0;
        @media screen and (max-width: 1000px) {
            margin-top: 30px;
        }
    }
    .time-tab {
        margin-top: 40px;
    }
    .time-active {
        display: flex;
    }
    .calendar-active {
        display: flex;
        justify-content: space-between;
        background: #fff;
    }
    .topBtn,
    .bottomBtn,
    .leftBtn,
    .rightBtn {
        margin-left: -10px;
        width: 0;
        height: 0;
        border-width: 15px;
        border-style: solid;
        border-color: transparent #002fa7 transparent transparent;
    }
    .rightBtn {
        margin-top: 6px;
    }
    .leftBtn {
        margin-top: 6px;
        left: 8px;
        z-index: 1;
        border-color: transparent transparent transparent #002fa7;
    }
    .bottomBtn {
        margin: 0 auto;
        border-color: #002fa7 transparent transparent transparent;
    }
    .topBtn {
        margin: 0 auto;
        border-color: transparent transparent #002fa7 transparent;
    }
    .date-box {
        width: 240px;
        position: relative;
    }
    .calendar-time {
        width: 130px;
    }
    .calendar-time p {
        font-size: 14px;
        height: 56px;
        line-height: 56px;
        margin-bottom: 20px;
    }
    .date-item {
        flex-shrink: 0;
        width: 240px;
        height: 40px;
        margin-left: 20px;
        text-align: center;
        line-height: 40px;
        border: 1px solid black;
    }
    .active-box {
        display: inline-block;
        box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.1);
        border-radius: 4px;
        margin: 12px 20px;
        padding: 6px 20px;
        overflow: hidden;
        position: absolute;
        top: 60px;
    }
    .active-box p {
        font-size: 16px;
    }
    .active-info {
        display: none;
    }
    .active-info span {
        font-size: 14px;
    }
    .home-newsroom {
        width: 1080px;
        margin: 123px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .room-left {
        overflow: hidden;
        width: 622px;
        position: relative;
    }
    .room-contain {
        display: none;
    }
    .flex-room {
        width: 555px;
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 40px;
    }
    .room-contain span {
        font-size: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, .5);
    }
    .room-contain p {
        font-size: 16px;
        line-height: 22px;
        margin: 20px 0 25px;
        text-align: left;
        color: rgba(0, 0, 0, .85);
        overflow: hidden;
        display: -webkit-box;
        word-wrap: break-word;
        word-break: normal;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .room-contain a {
        font-size: 16px;
        line-height: 16px;
        color: #002fa7;
        text-decoration: none;
        font-family: PingFangSC-Regular;
        cursor: pointer;
    }
    .room-title {
        margin-bottom: 35px;
    }
    .room-title a {
        display: inline-block;
        height: 54px;
        font-size: 20px;
        line-height: 54px;
        margin-right: 50px;
        color: rgba(0, 0, 0, .25);
        text-decoration: none;
        cursor: pointer;
    }
    .room-title .active {
        color: #333;
        border-bottom: 2px solid #002fa7;
        border-radius: 2px;
    }
    .room-img {
        width: 420px;
        left: 52px;
        top: 75px;
        box-shadow: 0 6px 30px 0px rgba(0, 0, 0, .1);
        position: absolute;
        z-index: -1;
        cursor: pointer;
    }
    .room-img img {
        width: 420px;
    }
    .room-box a {
        color: #000;
    }
    .room-box img {
        vertical-align: middle;
        width: 18px;
        margin-right: 10px;
    }
    .active{
        display: block;
    }
    .home-developer {
        width: 1080px;
        margin: 60px auto 0;
    }
    .home-developer .en-developer-p{ 
        font-family: Roboto-Regular, Roboto !important;
        font-weight: 400 !important;
        line-height: 20px !important;
    }
    .home-developer .dev-leader {
        width: 1033px;
        margin: 50px auto 0;
    }
    .home-developer .show-all {
        display: none;
    }
    .dev-leader {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .dev-dever:nth-child(-n+4) {
        margin-top: 0;
    }
    .dev-dever {
        display: inline-block;
        text-align: center;
        width: 25%;
        min-width: 25%;
        max-width: 25%;
        margin-top: 30px;
    }
    .dev-dever .dev-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .dev-dever .dever-name {
        color: #005CC7;
        font-size: 16px;
        margin: 20px 0 10px;
        text-transform: uppercase;
        font-family: HuaweiSans-Medium;
    }
    .dev-dever .dever-rank {
        font-size: 16px;
        color: #000;
        line-height: 22px;
    }
    .dev-dever .en-rank {
        font-size: 14px !important;
        font-family: HuaweiSans !important;
        line-height: 20px !important;
    }
    .dev-link {
        margin-top: 20px;
        height: 28px;
        line-height: 28px;
    }
    .dev-link a {
        vertical-align: middle;
    }
    .dev-link img {
        width: 24px;
        height: 24px;
    }
    .dev-link .email-link {
        width: 24px;
        height: 20px;
        margin-right: 16px;
    }
    .home-auth {
        width: 1080px;
        margin: 68px auto 0;
    }
    .medal-logo {
        position: relative;
        top: -5px;
    }
    .auth-product {
        width: 1080px;
        margin: 30px auto 0;
        display: flex;
        justify-content: space-between;
    }
    .product-box {
        display: inline-block;
        width: 240px;
        height: 160px;
        margin-right: 30px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, .1);
    }
    .product-box img {
        width: 80px;
        height: 80px;
        margin: 20px auto 12px;
    }
    .product-box p {
        font-size: 20px;
        line-height: 20px;
    }
    .home-source {
        width: 1080px;
        margin: 60px auto 200px;
    }
    .source-contain {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }
    .source-contain .en-source-title{
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #000000;
        line-height: 32px;
    }
    .home-source .source-title {
        font-size: 24px;
        line-height: 30px;
        color: #000;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .home-source h3 {
        margin-bottom: 50px;
    }
    .home-source a {
        font-size: 18px;
        color: #0041bd;
        text-decoration: none;
    }
    .home-source .source-sponsor {
        font-size: 18px;
        color: #0041BD;
    }
    .source-apply,
    .source-mail {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .apply-img,
    .mail-img {
        width: 120px;
        height: 120px;
        margin-right: 40px;
    }
    .apply-img img,
    .mail-img img{
        width: 120px;
        height: 120px;
    }
    .apply-des p,
    .mail-des p {
        text-align: left;
        font-size: 18px;
        margin-top: 20px;
    }
    .apply-des p{
        &:last-of-type{
            cursor: pointer;
        }
    }
    .mail-des a ,
    .apply-des a {
        cursor: pointer;
    }
    .apply-des .click-here {
        margin-top: 10px;
    }
    .source-publish-link {
        margin-top: 100px;
        font-size: 30px;
    }
    .source-publish-link.publish {
        margin-top: 100px;
    }
    .diff-pc-mobile{
        .mobile-img{
            display: none;
        }
    }
    .source-publish-link h5 {
        text-align: center;
        line-height: 30px;
        margin-bottom: 50px;
        color: rgba(0, 0, 0, .87);
    }
    .publish-edition {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }
    .publish .publish-edition img {
        width: 280px;
        height: 80px;
        margin-right: 70px;
    }
    .publish .publish-edition .empty-a{
        img{
            opacity:0;
            @media screen and (max-width: 1000px){
                display: none;
            }
        }
    }
    .publish-edition img {
        width: 280px;
        height: 80px;
        margin-right: 180px;
    }
    .publish-edition a:last-child img {
        margin-right: 0;
    }
    @media screen and (max-width: 1000px){
        .is-pc {
            display: none;
        }
        .is-h5 {
            display: block;
            .carousel-video{
                .mobile-btn{
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    border-radius: 50px;
                    bottom: 50%;
                    left: 50%;
                    margin: 0 0 -50px -50px;
                    background-image: url('/img/home/play-btn.gif');
                    cursor: pointer;
                    background-size: contain;
                    opacity: 0.6;
                }
            }
            .carousel-item .HC-mobile-box{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            .carousel-item .train-img{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
        }
        .is-pc.mapArea {
            display: none;
        }
        .home-introduce .is-pc {
            display: none;
        }
        .home {
            margin: 0 15px;
        }
        .home-introduce .is-h5.mapArea {
            display: block;
            margin-top: 25px;
            height: 100%;
            position: relative;
            .location{
                position: absolute;
                top: 31%;
                left: 4%;
            }
        }
        .home h3 {
            margin-top: 35px;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .home p {
            font-size: 16px;
            margin: 0 30px;
        }
        .carousel-item .card-summer {
            width: 100%;
            height: 300px;
            line-height: 300px;
            text-align: center;
            margin-top: 0;
        }
        .carousel-img {
            width: 100%;
        }
        .card-summer img {
            vertical-align: middle;
        }
        .home-carousel {
            margin: 0 -15px;
        }
        .home-carousel .el-carousel__item h3 {
            font-size: 18px;
            font-family: FZLTCHJW;
            text-align: center;
            margin-top: 35px;
            margin-bottom: 0;
        }
        .carousel-item-index a {
            text-decoration: none;
        }
        .carousel-item-index img {
            width: 200px;
            height: 200px;
            margin: 0;
            display: block;
            margin: 0 auto;
        }
        .carousel-item-index .mobile-version{
            width: 100%;
            height: 300px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .home-carousel .el-carousel__item span {
            display: inline-block;
            width: 65%;
            font-size: 1.5vw;
            line-height: 24px;
            margin-top: 0;
        }
        .el-carousel__container {
            width: 100%;
            height: 380px;
            font-size: 1vw;
        }
        .home-introduce {
            padding-top: 40px;
            width: 100%;
        }
        .home-introduce h1 {
            font-size: 30px;
            margin-bottom: 40px;
        }
        .area-box .box-icon {
            display: inline-block;
            width: 50px;
            height: 50px;
            color: #fff;
            font-size: 18px;
            line-height: 50px;
            background-color: #002fa7;
            border-radius: 50%;
        }
        .area-box p {
            display: inline-block;
            font-size: 16px;
            color: #002fa7;
            margin-left: 16px;
            font-family: Roboto-Bold;
        }
        .area-box img {
            display: block;
            margin: 10px auto 26px;
        }
        .home-calendar {
            width: 100%;
        }
        .home-active {
            margin-top: 40px;
            background-size: cover;
        }
        .home-active h3 {
            margin-bottom:  20px;
            padding: 40px 0 20px;
        }
        .home-active p {
            margin-bottom:  45px;
        }
        .area-box {
            display: block;
            margin: 0 auto;
            width: 67%;
        }
        .calendar-time p {
            font-size: 14px;
            height: 56px;
            line-height: 56px;
            margin: 0 0 10px;
        }
        .active-box {
            margin: 0;
        }
        .calendar-time {
            width: 110px;
        }
        .home-newsroom {
            width: 100%;
            margin-top: 80px;
        }
        .blog-room {
            margin-top: 40px;
        }
        .newsroom h5 {
            font-size: 18px;
            line-height: 18px;
            color: #333;
            font-weight: 600;
            margin-bottom: 30px;
        }
        .rooms span {
            font-size: 14px;
            line-height: 14px;
            color: rgba(0, 0, 0, .5);
        }
        .rooms p {
            font-size: 16px;
            line-height: 24px;
            text-align: left;
            margin: 10px 0 20px;
            color: rgba(0, 0, 0, .85);
            overflow: hidden;
            display: -webkit-box;
            word-wrap: break-word;
            word-break: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
        .newsroom a {
            font-size: 14px;
            display: inline-block;
            text-decoration: none;
            color: #002fa7;
        }
        .newsroom .room-more {
            margin-bottom: 40px;
        }
        .home-developer {
            width: 100%;
            margin-top: 20px;
        }
        .home-developer .dev-leader {
            width: 100%;
            margin: 0;
        }
        .home-developer .show-all {
            display: block;
            text-align: center;
            margin-top: 40px;
        }
        .show-all p {
            color: #002fa7;
        }
        .dev-dever {
            width: 50%;
            min-width: 50%;
            max-width: 50%;
            margin-top: 35px;
        }
        .dev-dever.hidden {
            display: none;
        }
        .dev-dever .dever-name {
            font-size: 18px;
            font-family: Huawei Sans Medium;
            margin: 0;
        }
        .dev-dever .dever-rank {
            margin: 0;
            font-size: 14px;
            font-family: Huawei Sans;
        }
        .dev-dever:nth-child(-n+4) {
            display: inline-block;
            margin-top: 35px;
        }
        .home-auth {
            width: 100%;
            margin-top: 70px;
        }
        .medal-logo {
            position: relative;
            top: 0px;
        }
        .auth-product {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 0;
        }
        .product-box {
            width: 50%;
            min-width: 47%;
            max-width: 47%;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .2);
            margin: 20px 10px 0 0;
        }
        .product-box:nth-child(even) {
            margin-right: 0;
        }
        .publish-edition {
            display: block;
        }
        .publish .publish-edition img {
            width: 280px;
            height: 60px;
            margin: 5px auto;
        }
        .publish-edition img {
            width: 280px;
            height: 60px;
            margin: 0 auto;
            display: block;
        }
        .publish-edition a:last-child img {
            margin: 0 auto;
        }
        .home-source {
            width: 100%;
            margin-top: 60px;
            margin-bottom: 90px;
        }
        .home-source .source-title {
            font-size: 18px;
            font-weight: 600;
        }
        .home-source a {
            font-size: 16px;
        }
        .source-publish-link {
            margin-top: 30px;
        }
        .source-contain {
            width: 100%;
            display: block;
        }
        .source-apply,
        .source-mail {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
        }
        .source-publish-link.publish {
            margin-top: 50px;
        }
        .diff-pc-mobile{
            .mobile-img{
                display: block;
            }
            .pc-img{
                display: none;
            }
        }
        .source-publish-link h5 {
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            margin-bottom: 0;
        }
        .apply-img,
        .mail-img {
            display: none;
        }
        .apply-des p,
        .mail-des p {
            text-align: center;
        }
    }
</style>