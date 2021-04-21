<template>
    <div class="containter">
        <div>
            <img :src="'/img/hdc/2021-developer/banner-'+deviceText" class="banner" />
        </div>
        <img :src="'/img/hdc/2021-developer/first-title-'+deviceText" class="first-title" />
        <div class="first-desc">
            <p>
                华为开发者· openEuler 赛道是面向openEuler
                社区的开发者个人赛。开发者可以通过参加大赛，加速 openEuler
                社区修复项目漏洞，参与 openEuler
                社区的最新特性开发，掌握操作系统领域的最新技术方向。您的名字会铭刻在
                openEuler 社区发展的伟大进程之中。赶快来openEuler
                社区的参与代码贡献吧，让我们携手共建最具活力的操作系统开源社区。
            </p>
            <p>
                openEuler
                是一个开源、免费的Linux发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。
            </p>
        </div>
        <img :src="'/img/hdc/2021-developer/second-title-'+deviceText" class="second-title" />
        <div class="second-wrapper">
            <a href="" target="_blank" class="link">
                <img :src="'/img/hdc/2021-developer/left-link-'+deviceText" />
            </a>
            <a href="" target="_blank" class="link">
                <img :src="'/img/hdc/2021-developer/right-link-'+deviceText" />
            </a>
        </div>
        <img :src="'/img/hdc/2021-developer/third-title-'+deviceText" class="third-title" />
        <div class="third-wrapper">
            <div class="left">
                <p>
                    openEuler 社区了创建了一个赛事交流的微信群，添加 openEuler
                    小助手备注“华为开发者大赛”即可入群。
                </p>
                <p>
                    微信号“openEuler小助手”：openeuler123，小助手会为参赛者实时进行答疑解惑的贴心服务，及时为参赛者解决问题。
                </p>
                <p>小助手在线时间：每天9:00~18:00。</p>
            </div>
            <img :src="'/img/hdc/2021-developer/qrcode-'+deviceText" class="right" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deviceText: ''
        };
    },
    methods: {},
    mounted: function() {
        this.deviceText = this.isShowH5 ? 'h5.png' : 'pc.png';
    }
};
</script>

<style lang="less" scoped>
.containter {
    width: 1120px;
    margin: 0 auto 200px;
    text-align: center;
    @media screen and (max-width: 1000px) {
        margin-bottom: 80px;
        width: 100%;
    }
    .banner {
        margin-bottom: 60px;
        @media screen and (max-width: 1000px) {
            width: 375px;
            height: 300px;
            margin-bottom: 40px;
        }
    }
    .first-title {
        margin: 0 auto 30px;
        @media screen and (max-width: 1000px) {
            margin-bottom: 20px;
        }
    }
    .first-desc {
        margin-bottom: 50px;
        font-size: 18px;
        line-height: 40px;
        color: #000;
        text-align: left;
        @media screen and (max-width: 1000px) {
            padding: 0 30px;
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 30px;
        }
    }
    .second-title {
        margin: 0 auto 30px;
    }
    .second-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
            padding: 0 30px;
            margin-bottom: 40px;
            .link:nth-of-type(1) {
                margin-bottom: 30px;
            }
        }
    }
    .third-title {
        margin: 0 auto 30px;
        @media screen and (max-width: 1000px) {
            margin-bottom: 20px;
        }
    }
    .third-wrapper {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        line-height: 40px;
        color: #000;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
            padding: 0 30px;
            font-size: 16px;
            line-height: 30px;
        }
        .left {
            width: 805px;
            flex-shrink: 1;
            @media screen and (max-width: 1000px) {
                width: unset;
                flex-shrink: unset;
            }
            text-align: left;
        }
    }
}
</style>