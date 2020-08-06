<template>
    <div class="contribution">
        <div class="methods is-pc">
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
        <div class="is-h5 mail-list-H5">
            <h3 class="is-h5">{{ i18n.community.CONTRIBUTION_H5.MOBILE_TITLE }}</h3>
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
    .is-h5 {
        display: none;
    }
    .is-pc {
        display: block;
    }
    .mail-guide {
        max-width: 1200px;
        margin: 0 auto;
    }
    .step {
        width: 200px;
        text-align: right;
        position: relative;
    }
    .mail-guide:nth-child(1) .step {
        top: 0;
    }
    .mail-guide:nth-child(2) .step {
        top: 180px;
        left: 20%;
    }
    .mail-guide:nth-child(3) .step {
        top: -340px;
        left: 40%;
    }
    .mail-guide:nth-child(4) .step {
        top: -160px;
        left: 60%;
    }
    .mail-guide:nth-child(5) .step {
        top: -720px;
        left: 80%;
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
    }
    @media screen and (max-width: 1000px){
        .is-pc {
            display: none;
        }
        .is-h5 {
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