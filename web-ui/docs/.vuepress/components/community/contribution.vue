<template>
    <div class="contribution">
        <common-banner
                :inside-name="'COMMUNITY'"
                :outside-name="i18n.community.CONTRIBUTION_H5.TITLE"
                class="is-pc"
        ></common-banner>
        <div class="methods is-pc">
            <div class="mail-guide"
                 v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                 :key="index">
                <div class="step">
                    <div class="step-num">
                        <span>{{ item.BUTTON }}</span>
                    </div>
                    <img :src="item.IMG" alt="">
                    <img :src="item.VIDEO" class="is-hidden">
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
        name: "contribution",
        data () {
            return {

            }
        },
        mounted() {
            this.toggleHover();
        },
        methods: {
            es(selector) {
                let es = document.querySelectorAll(selector)
                if (es.length === 0) {
                    return null;
                } else {
                    return es;
                }
            },
            toggleHover() {
                let hovers = this.es('.step');
                for (let i = 0; i < hovers.length; i++) {
                    let hover = hovers[i];
                    hover.addEventListener('mouseenter', function () {
                        let video = hover.querySelectorAll('img')[1];
                        video.classList.add('is-hovered');
                    })
                    hover.addEventListener('mouseleave', function () {
                        let video = hover.querySelectorAll('img')[1];
                        video.classList.remove('is-hovered');
                    })
                }
            },
        }
    }
</script>
<style lang="less">
    .contribution .common-banner .banner img {
        width: 0!important;
    }
</style>
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
    .step .is-hidden {
        display: none;
    }
    .step .is-hovered {
        display: block;
        position: absolute;
        top: 60px;
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