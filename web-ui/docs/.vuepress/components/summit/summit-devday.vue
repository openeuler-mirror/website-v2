<template>
    <div class="container">
        <div class="banner">
            <div class="title-wrapper">
                <div class="title">openEuler Developer Day 2021</div>
                <div class="date">5月21日 北京</div>
            </div>
            <img src="/img/summit/devday-2021/devday-2021.png">
        </div>
        <div class="h5-banner">
            <div class="title">峰会</div>
            <img src="/img/summit/devday-2021/banner-h5.png">
        </div>
        <div class="text-wrapper">
            <p class="text">openEuler Developer Day 2021 是由 openEuler 社区发起，面向社区开发者的一场技术盛会。旨在推动 openEuler 社区在多样性计算、云原生全栈、全场景协同等技术发展方向的持续探索和创新。本次大会以开放工作会议以及小组讨论等形式，让开发者找到关注的技术小组、快速融入社区、围绕下一版本发布，热点技术方向，用户核心需求，展开面对面的头脑风暴。每一个开发者都是 openEuler 社区的一颗星，一滴水，最终点点滴滴汇聚成科技创新的星辰大海。</p>
            <p class="title">openEuler 开放工作会议介绍：</p>
            <p class="text">openEuler 技术委员会开放工作会议：会议将集中探讨 openEuler 技术路线和下一版本的发布计划</p>
            <p class="text">openEuler 用户委员会开放工作会议：会议将集中收集用户在技术落地应用中碰到的问题，以及系统迁移路径的实践和分享</p>
            <p class="text">openEuler 品牌委员会开放工作会议：会议将对 openEuler 社区的营销传播推广工作进行梳理和介绍</p>
            <p class="text">openEuler SIG 小组开放工作会：在社区公开招募 20-30 个 SIG，小组成员在 SIG Maintainer 的带领下，召开现场工作会议，落实兴趣小组的工作重点、接受社区公开需求、完成下一个版本的开发路线规划。</p>
        </div>
        <div class="link-wrapper">
            <a href="https://shimo.im/forms/KgXxt8JCYKYtVXHx/fill" target="_blank"><img src="/img/summit/devday-2021/link-img1.png"></a>
            <a href="https://shimo.im/forms/vwCC68q3pQvvR3Yc/fill" target="_blank"><img src="/img/summit/devday-2021/link-img2.png"></a>
            <a href="https://shimo.im/forms/x6vXyW8QHCGK9QJD/fill" target="_blank"><img src="/img/summit/devday-2021/link-img3.png"></a>
            <a href="https://shimo.im/forms/PQTvWKjHgg96DjD8/fill" target="_blank"><img src="/img/summit/devday-2021/link-img4.png"></a>
        </div>
        <div class="review-wrapper">
            <div class="title">
                <span>精彩回顾</span>
                <img src="/img/summit/devday-2021/review.png">
            </div>
            <div @click="go('/interaction/summit-list/')" class="link">openEuler Summit 2020</div>
            <div @click="go('/interaction/summit-list/list/')" class="link">openEuler Virtual Summit 2020</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        go(url) {
            const routeUrl = this.$router.resolve(this.resolvePath(url));
            window.open(routeUrl.href);
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 100px;
    @media screen and (max-width: 1000px) {
        margin-bottom: 60px;
        padding: 0 30px;
        width: 100%;
    }
    .banner {
        @media screen and (max-width: 1000px) {
            display: none;
        }
        height: 380px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
        .title-wrapper {
            height: 100%;
            .title {
                margin-top: 153px;
                color: #000;
                font-size: 38px;
                line-height: 50px;
            }
            .date {
                margin-top: 50px;
                font-size: 26px;
                line-height: 30px;
                color: #000;
            }
        }
        img {
            width: 500px;
            height: 360px;
        }
    }
    .h5-banner {
        display: none;
        margin-bottom: 40px;
        .title {
            text-align: center;
            font-size: 24px;
            line-height: 34px;
            margin-top: 40px;
            margin-bottom: 10px;
        }
        img {
            width: 291px;
            height: 200px;
            margin: 0 auto;
            display: block;
        }
        @media screen and (max-width: 1000px) {
            display: block;
        }
    }
    .text-wrapper {
        margin-bottom: 50px;
        color: #000;
        font-size: 20px;
        line-height: 40px;
        @media screen and (max-width: 1000px) {
            font-size: 14px;
            line-height: 26px;
        }
    }
    .link-wrapper {
        margin-bottom: 60px;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1000px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 0;
        }
        img {
            height: 234px;
            width: 246px;
            border-radius: 8px;
            @media screen and (max-width: 1000px) {
                margin-bottom: 30px;
            }
        }
    }
    .review-wrapper {
        .title {
            font-size: 26px;
            margin-bottom: 32px;
            @media screen and (max-width: 1000px) {
                margin-bottom: 10px;
            }
            span {
                vertical-align: middle;
                @media screen and (max-width: 1000px) {
                    font-size: 16px;
                }
            }
            img {
                @media screen and (max-width: 1000px) {
                    display: none;
                }
                width: 28px;
                height: 28px;
                vertical-align: middle;
            }
        }
        .link {
            color: #002fa7;
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 24px;
            cursor: pointer;
            @media screen and (max-width: 1000px) {
                margin-bottom: 12px;
                font-size: 14px;
            }
        }
    }
}

</style>