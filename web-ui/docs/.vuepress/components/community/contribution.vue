<template>
    <div class="contribution">
        <common-banner
                :inside-name="'COMMUNITY'"
                :outside-name="i18n.community.CONTRIBUTION_H5.TITLE"
                class="is-pc"
        ></common-banner>
        <div class="bgc is-pc">
            <div class="methods is-pc" :style="{'background': 'url(' + bkgImg + ')', 'background-size': '100%', 'background-repeat': 'repeat-y'}">
                <div class="mail-guide"
                     v-for="(item, index) in i18n.community.CONTRIBUTION_H5.GUIDE_CONTENT"
                     :key="index">
                    <div class="step" >
                        <a class="step-num" @click="go(item.LINK)">
                            <span>{{ item.BUTTON }}</span>
                        </a>
                        <img :src="item.IMG" alt="">
                        <img :src="item.VIDEO" class="is-hidden">
                    </div>
                </div>
                <div class="map-rode">
                    <img class="is-pc rode-1" src="/img/community/contribution/rode1.svg" alt="">
                    <img class="is-pc plane-1" src="/img/community/contribution/plane1.svg" alt="">
                    <img class="is-pc rode-2" src="/img/community/contribution/rode2.svg" alt="">
                    <img class="is-pc plane-2" src="/img/community/contribution/plane2.svg" alt="">
                    <img class="is-pc rode-3" src="/img/community/contribution/rode3.svg" alt="">
                    <img class="is-pc plane-3" src="/img/community/contribution/plane3.svg" alt="">
                    <img class="is-pc rode-4" src="/img/community/contribution/rode4.svg" alt="">
                    <img class="is-pc plane-4" src="/img/community/contribution/plane4.svg" alt="">
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
                bkgImg: "/img/community/contribution/bkg-community.png"
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
            go(path) {
                if (path) {
                    this.$router.push({
                        path: this.resolvePath(path)
                    });
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
    .methods {
        width: 1120px;
        margin: 0 auto;
    }
    .bgc.is-pc {
        background: url("/web-ui/docs/.vuepress/public/img/community/contribution/bkg-community.png");
        background-repeat: repeat-y;
        background-size: 100%;
    }
    .mail-guide {
        max-width: 1120px;
        margin: 0 auto;
    }
    .step {
        width: 200px;
        text-align: right;
        position: relative;
    }
    .mail-guide:nth-child(1) .step {
        top: 30px;
    }
    .mail-guide:nth-child(2) .step {
        top: 180px;
        left: 20%;
    }
    .mail-guide:nth-child(3) .step {
        top: -340px;
        left: 45%;
    }
    .mail-guide:nth-child(4) .step {
        top: -160px;
        left: 54%;
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
        text-decoration: none;
        cursor: pointer;
    }
    .step .is-hidden {
        display: none;
    }
    .step .is-hovered {
        display: block;
        position: absolute;
        top: 41px;
    }
    .step-num span {
        color: #fff;
        font-size: 16px;
    }
    .step img {
        display: block;
        height: 150px;
        width: 150px;
    }
    .map-rode {
        position: relative;
        top: -800px;
    }
    .rode-1 {
        position: absolute;
        left: 70px;
        top: 70px;
        z-index: -10;
    }
    .plane-1 {
        position: absolute;
        left: 30px;
        top: 170px;
        z-index: -10;
     }
    .rode-2 {
        position: absolute;
        left: 360px;
        top: 30px;
        z-index: -10;
    }
    .plane-2 {
        position: absolute;
        left: 320px;
        top: 85px;
        z-index: -10;
    }
    .rode-3 {
        position: absolute;
        left: 598px;
        top: 110px;
        z-index: -10;
    }
    .plane-3 {
        position: absolute;
        left: 541px;
        top: 184px;
        z-index: -12;
    }
    .rode-4 {
        position: absolute;
        left: 792px;
        top: 85px;
        z-index: -10;
    }
    .plane-4 {
        position: absolute;
        left: 876px;
        top: 195px;
        z-index: -10;
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
            width: 240px;
            height: 240px;
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