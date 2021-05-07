<template>
    <div class="content-map">
        <div class="position"></div>
        <div class="container">
            <img
                v-if="!isShowH5"
                :src="i18n.community.CONTRIBUTION.BACKGROUND_IMG"
            />
            <img v-else :src="i18n.community.CONTRIBUTION.BACKGROUND_IMG_H5" />
            <a
                v-for="item in i18n.community.CONTRIBUTION.LINK_LIST"
                :href="item"
                target="_blank"
            ></a>
            <a :href="'/'+$lang+'/community/contribution/detail.html'">{{ i18n.community.CONTRIBUTION.LOOK_DESC }}</a>
            <a download="trail-chess.pdf" :href="i18n.community.CONTRIBUTION.DOWLOAD_PDF_URL">{{ i18n.community.CONTRIBUTION.PRINT_MAP }}</a>
        </div>    
    </div>
    
</template>

<script>
export default {
    name: "contribution",
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less" scoped>
.content-map .position {
    height: 0;
      @media screen and (max-width: 1000px) {
        height: 90px;
    }      
}
.container {
    width: 1120px;
    margin: 0 auto 200px;
    position: relative;
    @media screen and (max-width: 1000px) {
        margin-bottom: 80px;
        width: 375px;
    }
    img {
        width: 1120px;
        @media screen and (max-width: 1000px) {
            width: 375px;
        }
    }
    a {
        position: absolute;
    }
    a:nth-of-type(1) {
        width: 40px;
        height: 60px;
        top: 261px;
        left: 179px;
        @media screen and (max-width: 1000px) {
            top: 224px;
            left: 112px;
        }
    }
    a:nth-of-type(2) {
        width: 40px;
        height: 60px;
        top: 261px;
        left: 239px;
        @media screen and (max-width: 1000px) {
            top: 224px;
            left: 172px;
        }
    }
    a:nth-of-type(3) {
        width: 40px;
        height: 60px;
        top: 261px;
        left: 299px;
        @media screen and (max-width: 1000px) {
            top: 224px;
            left: 232px;
        }
    }
    a:nth-of-type(4) {
        width: 40px;
        height: 60px;
        top: 261px;
        left: 359px;
        @media screen and (max-width: 1000px) {
            top: 224px;
            left: 292px;
        }
    }
    a:nth-of-type(5) {
        width: 132px;
        height: 50px;
        top: 397px;
        left: 179px;
        @media screen and (max-width: 1000px) {
            top: 360px;
            left: 112px;
        }
    }
    a:nth-of-type(6) {
        width: 76px;
        height: 50px;
        top: 397px;
        left: 321px;
        @media screen and (max-width: 1000px) {
            top: 360px;
            left: 254px;
        }
    }
    a:nth-of-type(7) {
        width: 106px;
        height: 50px;
        top: 457px;
        left: 291px;
        @media screen and (max-width: 1000px) {
            top: 420px;
            left: 224px;
        }
    }
    a:nth-of-type(8) {
        width: 102px;
        height: 50px;
        top: 457px;
        left: 179px;
        @media screen and (max-width: 1000px) {
            top: 420px;
            left: 112px;
        }
    }
    a:nth-of-type(9) {
        width: 144px;
        height: 50px;
        top: 514px;
        left: 253px;
        @media screen and (max-width: 1000px) {
            top: 447px;
            left: 186px;
        }
    }
    a:nth-of-type(10) {
        width: 218px;
        height: 50px;
        top: 634px;
        left: 179px;
        @media screen and (max-width: 1000px) {
            top: 597px;
            left:112px;
        }
    }
    a:nth-of-type(11) {
        width: 126px;
        height: 50px;
        top: 574px;
        left: 179px;
        @media screen and (max-width: 1000px) {
            top: 537px;
            left:112px;
        }
    }
    a:nth-of-type(12) {
        width: 210px;
        height: 24px;
        top: 869px;
        left: 90px;
        @media screen and (max-width: 1000px) {
            top: 757px;
            left:118px;
        }
    }
    a:nth-of-type(13) {
        width: 50px;
        height: 70px;
        top: 923px;
        left: 90px;
        @media screen and (max-width: 1000px) {
            top: 811px;
            left:118px;
        }
    }
    a:nth-of-type(14) {
        width: 50px;
        height: 70px;
        top: 923px;
        left: 150px;
        @media screen and (max-width: 1000px) {
            top: 811px;
            left:178px;
        }
    }
    a:nth-of-type(15) {
        width: 50px;
        height: 70px;
        top: 923px;
        left: 210px;
        @media screen and (max-width: 1000px) {
            top: 811px;
            left:238px;
        }
    }
    a:nth-of-type(16) {
        width: 70px;
        height: 90px;
        top: 903px;
        left: 591px;
        @media screen and (max-width: 1000px) {
            top: 1019px;
            left:112px;
        }
    }
    a:nth-of-type(17) {
        width: 70px;
        height: 90px;
        top: 903px;
        left: 691px;
        @media screen and (max-width: 1000px) {
            top: 1019px;
            left:232px;
        }
    }
    a:nth-of-type(18) {
        width: 70px;
        height: 90px;
        top: 903px;
        left: 791px;
        @media screen and (max-width: 1000px) {
            top: 1115px;
            left:112px;
        }
    }
    a:nth-of-type(19) {
        width: 70px;
        height: 90px;
        top: 903px;
        left: 891px;
        @media screen and (max-width: 1000px) {
            top: 1115px;
            left:232px;
        }
    }
    a:nth-of-type(20) {
        width: 60px;
        height: 80px;
        top: 747px;
        left: 791px;
        @media screen and (max-width: 1000px) {
            top: 1337px;
            left:114px;
        }
    }
    a:nth-of-type(21) {
        width: 60px;
        height: 80px;
        top: 747px;
        left: 892px;
        @media screen and (max-width: 1000px) {
            top: 1337px;
            left:234px;
        }
    }
    a:nth-of-type(22) {
        width: 80px;
        height: 28px;
        top: 580px;
        left: 627px;
        @media screen and (max-width: 1000px) {
            top: 1549px;
            left:144px;
        }
    }
    a:nth-of-type(23) {
        width: 80px;
        height: 28px;
        top: 627px;
        left: 627px;
        @media screen and (max-width: 1000px) {
            top: 1599px;
            left:270px;
        }
    }
    a:nth-of-type(24) {
        width: 80px;
        height: 28px;
        top: 667px;
        left: 627px;
        @media screen and (max-width: 1000px) {
            top: 1682px;
            left:148px;
        }
    }
    a:nth-of-type(25) {
        width: 80px;
        height: 28px;
        top: 587px;
        left: 763px;
        @media screen and (max-width: 1000px) {
            top: 1550px;
            left:266px;
        }
    }
    a:nth-of-type(26) {
        width: 80px;
        height: 28px;
        top: 627px;
        left: 763px;
        @media screen and (max-width: 1000px) {
            top: 1640px;
            left:148px;
        }
    }
    a:nth-of-type(27) {
        width: 80px;
        height: 28px;
        top: 667px;
        left: 763px;
        @media screen and (max-width: 1000px) {
            top: 1683px;
            left:270px;
        }
    }
    a:nth-of-type(28) {
        width: 80px;
        height: 28px;
        top: 586px;
        left: 909px;
        @media screen and (max-width: 1000px) {
            top: 1591px;
            left:148px;
        }
    }
    a:nth-of-type(29) {
        width: 80px;
        height: 28px;
        top: 627px;
        left: 909px;
        @media screen and (max-width: 1000px) {
            top: 1634px;
            left:270px;
        }
    }
    a:nth-of-type(30) {
        width: 80px;
        height: 28px;
        top: 667px;
        left: 909px;
        @media screen and (max-width: 1000px) {
            top: 1717px;
            left:148px;
        }
    }
    a:nth-of-type(31) {
        width: 84px;
        height: 16px;
        top: 161px;
        left: 700px;
        @media screen and (max-width: 1000px) {
            top: 1836px;
            left:112px;
        }
    }
    a:nth-of-type(32) {
        width: 84px;
        height: 16px;
        top: 259px;
        left: 700px;
        @media screen and (max-width: 1000px) {
            top: 1934px;
            left:112px;
        }
    }
    a:nth-of-type(33) {
        cursor: pointer;
        width: 100px;
        height: 30px;
        top: 22px;
        left: 888px;
        background-color: #fff;
        color: #002fa7;
        border: 1px solid #002da7;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        border-radius: 1px;
        text-decoration: none;
        @media screen and (max-width: 1000px) {
            top: -46px;
            left: 30px;
        }
    }
    a:nth-of-type(34) {
        cursor: pointer;
        width: 100px;
        height: 30px;
        top: 22px;
        left: 998px;
        background-color: #fff;
        color: #002fa7;
        border: 1px solid #002da7;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        border-radius: 1px;
        text-decoration: none;
        @media screen and (max-width: 1000px) {
            display: none;
        }
    }
}
</style>