<template>
    <div class="nav-fill">
        <div class="nav-wrapper">
            <div class="nav-bar">
                <img src="@/assets/images/openeuler.png" alt="" class="nav-logo" @click="go('/')">
                <ul class="nav-menu">
                    <li v-for="(item, index) in $t('common.navRouterConfig')" :key="index" @mouseenter="showSub(item.class)" @mouseleave="hideSub(item.class)" :class="item.class">
                        <a @click="go(item.path)" :class="{'menu-link': true, 'menu-active': menuActiveFn(item)}">{{ item.name }}</a>
                        <div @mouseenter="showSub(item.class)" @mouseleave="hideSub(item.class)" :class="{'sub-menu':true, 'sig-menu':item.subPath=='/sig/sig-guidance'}" v-if="item.children.length">
                            <div class="sub-menu-wrapper">
                                <div class="sub-menu-left" @click="go(item.subPath)">
                                    <img :src="item.subImg" class="sub-menu-img">
                                    <h3 class="sub-menu-name">{{ item.subName }}</h3>
                                </div>
                                <ul v-if="item.subPath=='/community/community-guidance'" class="sub-menu-right community-sub-menu">
                                    <li v-for="(subItem, subItemIndex) in item.children" :key="subItemIndex" @click="go(subItem.path)">
                                        {{ subItem.name }}
                                    </li>
                                </ul>
                                <div v-else class="sub-menu-right sig-sub-menu">
                                    <div class="sub-menu-head">{{ item.name }}<a @click="go(item.viewAllPath)">{{ item.viewAllName }}</a></div>
                                    <ul class="sig-menu-content">
                                        <li v-for="(subItem, subItemIndex) in item.children" :key="subItemIndex" @click="go(subItem.path)">{{ subItem.name }}</li>
                                    </ul>
                                </div>    
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="nav-other">
                    <li class="lang" @click="toggleLang">
                        <img src="" alt="">
                        <span>{{ $t("common.lang") }}</span>
                    </li>
                    <li class="lang">
                        <img src="" alt="">
                        <span>{{ $t("common.search") }}</span>
                    </li>
                    <li class="lang">
                        <img src="" alt="">
                        <span>{{ $t("common.gitte") }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            toggleSubMenu: [],
            menuActivePath: ''
        };
    },
    mounted () {
        
    },
    methods: {
        go (path) {
            path && this.$router.push(path);
        },
        showSub (toggleClass) {
            toggleClass.push('show-sub-menu');
        },
        hideSub (toggleClass) {
            toggleClass.pop();
        },
        toggleLang () {
            this.$i18n.locale = this.$i18n.locale === "zh-cn" ? "zh-en" : "zh-cn";
            window.localStorage.setItem('locale', this.$i18n.locale);
        },
        menuActiveFn (item) {
            let $route = this.$route;
            return $route.path===item.path || $route.path===item.subPath || $route.path===item.viewAllPath || item.children.some((item) => item.path === $route.path);
        }
    }
};
</script>

<style lang="less" scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
        top: -110px;
    }
    100% {
        opacity: 1;
        top: 0;
    }
}
@keyframes slide-down {
    0% {
        display: block;
        opacity: 0;
        top: -352px;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        top: 110px;
        display: block;
    }
}
.menu-active {
    border-bottom: 5px solid @primary-color;
}
.nav-fill {
    height: 110px;
    .nav-wrapper {
        background-color: #fff;
        animation: fade-in;
        animation-duration: .5s;
        height: 110px;
        width: 100%;
        position: fixed;
        .nav-bar {
            width: 62.5%;
            min-width: 1000px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            ul li {
                display: inline-block;
            }
            .nav-logo {
                flex: 1;
                margin-right: 50px;
                cursor: pointer;
            }
            .nav-menu {
                height: 100%;
                flex: 3;
                .ff-h();
                color: @text-dark;
                .fz20();
                display: flex;
                align-items: center;
                .show-sub-menu {
                    .sub-menu {
                        animation: slide-down;
                        animation-duration: .5s;
                        top: 110px;
                        display: block;
                    }
                    
                }
                .sub-menu {
                    position: absolute;
                    left: -100%;
                    height: 242px;
                    width: 364px;
                    display: none;
                    border: 1px solid @primary-color;
                    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    .sub-menu-wrapper {
                        height: 100%;
                        display: flex;
                        
                        .sub-menu-left {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            flex: 3;
                            background-color: rgba(0, 0, 0, .05);
                            height: 100%;
                            &:hover {
                                cursor: pointer;
                                color: @primary-color2;
                            }
                            .sub-menu-img {
                                width: 100%;
                                flex: 3;
                            }
                            .sub-menu-name {
                                text-align: center;
                                flex: 1;
                            }
                        }
                        .sub-menu-right {
                            display: inline-block;
                            flex: 2;
                        }
                        .community-sub-menu {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-around;
                            li {
                                line-height: 20px;
                                &:hover {
                                    cursor: pointer;
                                    color: @primary-color2;
                                }
                            }
                        } 
                        
                    }
                    
                }
                .sig-menu {
                    width: 572px;
                    .sub-menu-left {
                        flex: 2 !important;
                    }
                    .sig-sub-menu {
                        padding-left: 30px;
                        flex: 3 !important;
                        .sub-menu-head {
                            height: 60px;
                            line-height: 60px;
                            a {
                                margin-left: 10px;
                                &:hover {
                                    cursor: pointer;
                                    color: @primary-color;
                                }
                            }
                        }
                        .sig-menu-content {
                            height: 182px;
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            li {
                                line-height: 20px;
                                margin-bottom: 15px;
                                &:hover {
                                    cursor: pointer;
                                    color: @primary-color;
                                }
                            }
                        }
                    }
                }
                & > li{
                    position: relative;
                    padding-right: 50px;
                    height: 100%;
                    line-height: 110px;
                    & > a {
                        display: inline-block;
                        height: 100%;
                        cursor: pointer;
                        &:hover {
                            border-bottom: 5px solid @primary-color;
                        }
                    }
                }
            }
            .nav-other {
                flex: 1;
                height: 100%;
                .fz16();
                color: @text-dark;
                .ff-xih();
                line-height: 110px;
                li {
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
        }
    }
    
}
</style>
