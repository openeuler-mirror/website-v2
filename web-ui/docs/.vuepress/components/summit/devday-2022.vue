<template>
    <div class="developer-2022">
        <div class="banner">
            <a :href="i18n.devday2022.SUMMIT_BANNER.LINK" target="_blank">
                <img class="main" :src="i18n.devday2022.SUMMIT_BANNER.PC_IMG" />
            </a>
        </div>
        <div class="h5-banner">
            <a href>
                <img :src="i18n.devday2022.SUMMIT_BANNER.MOBILE_IMG" />
            </a>
        </div>
        <div class="container">
            <div class="text-wrapper">
                <p class="text">{{ i18n.devday2022.SUMMIT_INTRODUCE }}</p>
            </div>
            <div class="call-for-list">
                <a
                    :href="item.LINK"
                    target="_blank"
                    class="call-item"
                    v-for="item in i18n.devday2022.COLLECT_LIST"
                    :key="item.IMG"
                >
                    <img :src="item.IMG" alt />
                </a>
            </div>
            <div class="review-wrapper">
                <div class="title">
                    <span>{{ i18n.summit.HIGHLIGHTS }}</span>
                    <img src="/img/summit/devday-2021/review.png" />
                </div>
                <div
                    @click="go('/interaction/summit-list/summit2021/')"
                    class="link"
                >openEuler Summit 2021</div>
                <div
                    @click="go('/interaction/summit-list/devday2021/')"
                    class="link"
                >openEuler Developer Day 2021</div>
                <div @click="go('/interaction/summit-list/')" class="link">openEuler Summit 2020</div>
                <div
                    @click="go('/interaction/summit-list/list/')"
                    class="link"
                >openEuler Virtual Summit 2020</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        go(url) {
            const routeUrl = this.$router.resolve(this.resolvePath(url));
            window.open(routeUrl.href);
        },
    }
};
</script>
<style lang="less" scoped>
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
        display: block;
        width: 375px;
        margin: 0 auto;
    }
    @media screen and (max-width: 1000px) {
        display: block;
    }
}
.banner {
    @media screen and (max-width: 1000px) {
        display: none;
    }
    height: 380px;
    width: 100%;
    margin-bottom: 50px;
    a {
        display: inline-block;
        width: 100%;
        text-align: center;
        @media screen and (min-width: 2500px) {
            display: flex;
            justify-content: space-around;
        }
        .main {
            max-width: 1920px;
            width: 100%;
            height: 100%;
        }
    }
}
.container {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 100px;
    @media screen and (max-width: 1000px) {
        margin-bottom: 60px;
        padding: 0 10px;
        width: 100%;
    }
    .text-wrapper {
        margin-bottom: 50px;
        color: #000;
        font-size: 20px;
        line-height: 40px;
        @media screen and (max-width: 1000px) {
            padding: 0 20px;
            font-size: 14px;
            line-height: 26px;
            margin-bottom: 40px;
        }
    }
    .call-for-list {
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;
        @media screen and (max-width: 1000px) {
            align-items: center;
            flex-direction: column;
            justify-content: center;
            .call-item {
                margin-bottom: 30px;
            }
            .call-item:last-child {
                margin: 0;
            }
        }
    }
    .review-wrapper {
        padding: 0 20px;
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