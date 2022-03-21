<template>
    <div class="developer-2022">
        <div class="banner">
            <a :href="i18n.devday2022.SUMMIT_BANNER.LINK" target="_blank">
                <img class="main" :src="i18n.devday2022.SUMMIT_BANNER.PC_IMG" />
            </a>
        </div>
        <div class="h5-banner">
            <a :href="i18n.devday2022.SUMMIT_BANNER.LINK" target="_balnk">
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
            <div class="agenda">
                <div class="title">
                    <img class="pc" :src="i18n.devday2022.AGENDA.TITLE_IMG_PC" alt />
                    <img class="mo" :src="i18n.devday2022.AGENDA.TITLE_IMG_MO" alt />
                </div>
                <div class="agenda-data">
                    <div class="data-item">
                        <div class="agenda-title">{{ i18n.devday2022.AGENDA.AGENDA_DATA_13.TITLE }}</div>
                        <div class="schedule">
                            <div
                                class="schedule-detail agenda-title"
                                v-for="item in i18n.devday2022.AGENDA.AGENDA_DATA_13.SCHEDULE"
                                :key="item"
                            >{{ item }}</div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="agenda-title">{{ i18n.devday2022.AGENDA.AGENDA_DATA_14.TITLE }}</div>
                        <div class="schedule1">
                            <div
                                class="schedule-detail1"
                                v-for="item in i18n.devday2022.AGENDA.AGENDA_DATA_14.SCHEDULE"
                                :key="item"
                            >{{ item }}</div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="agenda-title">{{ i18n.devday2022.AGENDA.AGENDA_DATA_15.TITLE }}</div>
                        <div class="schedule2">
                            <div
                                class="schedule-detail2"
                                v-for="item in i18n.devday2022.AGENDA.AGENDA_DATA_15.SCHEDULE"
                                :key="item"
                            >
                                <div
                                    class="first"
                                    v-for="item2 in item.FIRST"
                                    :key="item2"
                                >{{ item2 }}</div>
                                <div
                                    class="seconed"
                                    v-for="(item2, index2) in item.SECOND"
                                    :key="index2"
                                >{{ item2 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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
    .agenda {
        .title {
            cursor: pointer;
            margin-bottom: 15px;
            text-align: center;
            .pc {
                @media screen and (max-width: 1000px) {
                    display: none;
                }
            }
            .mo {
                display: none;
                @media screen and (max-width: 1000px) {
                    display: inline-block;
                }
            }
        }
        .agenda-data {
            display: flex;
            justify-content: space-between;
            margin-bottom: 32px;
            @media screen and (max-width: 1000px) {
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .data-item {
                width: 360px;
                .agenda-title {
                    cursor: pointer;
                    padding: 15px 30px;
                    margin-bottom: 16px;
                    text-align: center;
                    color: white;
                    background-color: #002fa7;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    @media screen and (max-width: 1000px) {
                        margin-bottom: 10px;
                    }
                }
                @media screen and (max-width: 1000px) {
                    width: 315px;
                    font-size: 12px;
                }
                .schedule {
                    .schedule-detail {
                        color: #000;
                        background-color: white;
                    }
                    @media screen and (max-width: 1000px) {
                        margin-bottom: 30px;
                    }
                }
                .schedule1 {
                    text-align: center;
                    height: 319px;
                    padding: 15px 30px;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    @media screen and (max-width: 1000px) {
                        height: 175px;
                    }
                    .schedule-detail1 {
                        cursor: pointer;
                        text-align: center;
                        padding-bottom: 8px;
                    }
                    .schedule-detail1:nth-child(2) {
                        padding-bottom: 20px;
                    }
                    @media screen and (max-width: 1000px) {
                        margin-bottom: 30px;
                    }
                }
                .schedule2 {
                    text-align: center;
                    height: 319px;
                    @media screen and (max-width: 1000px) {
                        height: 220px;
                    }
                    .schedule-detail2 {
                        cursor: pointer;
                        text-align: center;
                        padding: 15px 30px;
                        margin-bottom: 16px;
                        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
                        border-radius: 4px;
                    }
                    .schedule-detail2:nth-child(2) {
                        height: 234px;
                        @media screen and (max-width: 1000px) {
                            .seconed {
                                margin-bottom: 5px;
                            }
                            height: 150px;
                        }
                    }
                }
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