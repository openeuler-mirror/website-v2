<template>
    <div class="contribution">
        <div class="methods isPC">
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                 :key="index">
                <div class="step">
                    <div class="step-num">
                        <span>{{ item.BUTTON }}</span>
                    </div>
                    <img :src="item.IMG" alt="">
                </div>
            </div>
        </div>
        <div class="isH5 mail-list-H5">
            <h3 class="isH5">{{ i18n.community.CONTRIBUTION_H5.MOBILE_TITLE }}</h3>
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                 :key="index">
                <div class="step-H5">
                    <div class="step-num">
                        <span>{{ item.BUTTON}}</span>
                    </div>
                    <img :src="item.IMG" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contribution"
    }
</script>

<style scoped>
    .isH5 {
        display: none;
    }
    .isPC {
        display: block;
    }
    .step-num {
        display: inline-block;
        padding: 10px 15px;
        text-align: center;
        border-radius: 4px;
        background-color: #002FA7;
        margin: 0 auto;
    }
    .step-num span {
        color: #fff;
        font-size: 16px;
    }
    .step img {
        display: block;
        margin: 30px auto 0;
    }
    @media screen and (max-width: 1000px){
        .isPC {
            display: none;
        }
        .isH5 {
            display: block;
        }
        h3 {
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            margin: 40px 0 10px;
        }
        .mail-list-H5 {
            margin-bottom: 80px;
        }
        .step-H5 {
            margin: 40px auto;
            text-align: center;
        }
        .step-H5 img {
            display: block;
            margin: 30px auto 0;
        }
        .step-H5 p {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            lin-height: 24px;
            margin: 10px 30px;
            text-align: left;
        }
    }
</style>