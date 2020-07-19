<template>
    <div class="nav-fill">
        <div class="nav-wrapper">
            <div class="nav-bar">
                <img
                    src="/openeuler.png"
                    alt=""
                    class="nav-logo"
                    @click="goHome()"
                />
                <img
                    src="/logo-mobile.png"
                    alt=""
                    class="nav-logo nav-logo-mobile"
                    @click="goHome()"
                />
                <ul class="nav-menu">
                    <li
                        v-for="(item, index) in i18n.common.navRouterConfig"
                        :key="index"
                        @mouseenter="showSub(item.class)"
                        @mouseleave="hideSub(item.class)"
                        :class="item.class"
                    >
                        <a
                            @click="go(item.path)"
                            :class="{
                                'menu-link': true,
                                'menu-active': menuActiveFn(item)
                            }"
                            >{{ item.name }}</a
                        >
                        <div
                            @mouseenter="showSub(item.class)"
                            @mouseleave="hideSub(item.class)"
                            :class="{
                                'sub-menu': true,
                                'sig-menu': item.subPath == '/sig/sig-guidance'
                            }"
                            v-if="item.children.length"
                        >
                            <div class="sub-menu-wrapper">
                                <div
                                    class="sub-menu-left"
                                    @click="go(item.subPath)"
                                >
                                    <img
                                        :src="item.subImg"
                                        class="sub-menu-img"
                                    />
                                    <h3 class="sub-menu-name">
                                        {{ item.subName }}
                                    </h3>
                                </div>
                                <ul
                                    v-if="
                                        item.subPath ==
                                            '/community/community-guidance'
                                    "
                                    class="sub-menu-right community-sub-menu"
                                >
                                    <li
                                        v-for="(subItem,
                                        subItemIndex) in item.children"
                                        :key="subItemIndex"
                                        @click="go(subItem.path)"
                                    >
                                        {{ subItem.name }}
                                    </li>
                                </ul>
                                <div v-else class="sub-menu-right sig-sub-menu">
                                    <div class="sub-menu-head">
                                        {{ item.name
                                        }}<a @click="go(item.viewAllPath)">{{
                                            item.viewAllName
                                        }}</a>
                                    </div>
                                    <ul class="sig-menu-content">
                                        <li
                                            v-for="(subItem,
                                            subItemIndex) in item.children"
                                            :key="subItemIndex"
                                            @click="go(subItem.path)"
                                        >
                                            {{ subItem.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul
                    :class="{
                        'nav-menu-mobile': true,
                        'menu-mobile-active': menuMobileFlag
                    }"
                >
                    <li
                        v-for="(item, index) in i18n.common.navRouterConfig"
                        :key="index"
                    >
                        <a
                            :class="{
                                'menu-link': true,
                                'menu-active': menuActiveFn(item)
                            }"
                            @click="toggleSub(item)"
                            >{{ item.name
                            }}<i
                                :class="{
                                    'icon-arrow': true,
                                    'arrow-active':
                                        item.class.indexOf('arrow-active') >
                                            -1 ||
                                        $route.path === item.path ||
                                        $route.path === item.subPath ||
                                        $route.path === item.viewAllPath ||
                                        item.children.some(
                                            item => item.path === $route.path
                                        )
                                }"
                                v-if="item.children.length"
                            ></i
                        ></a>
                        <ul
                            :class="{
                                'sub-menu': true,
                                show:
                                    item.class.indexOf('arrow-active') > -1 ||
                                    $route.path === item.path ||
                                    $route.path === item.subPath ||
                                    $route.path === item.viewAllPath ||
                                    item.children.some(
                                        item => item.path === $route.path
                                    )
                            }"
                        >
                            <li
                                v-if="item.subName"
                                :class="{
                                    'sub-menu-color-active':
                                        item.subPath == $route.path
                                }"
                                @click="go(item.subPath)"
                            >
                                #{{ item.subName }}#
                            </li>
                            <li
                                @click="go(item.viewAllPath)"
                                :class="{
                                    'sub-menu-color-active':
                                        item.viewAllPath == $route.path
                                }"
                                v-if="item.viewAllName"
                            >
                                #{{ item.viewAllName }}#
                            </li>
                            <li
                                v-for="(subItem, subIndex) in item.children"
                                :class="{
                                    'sub-menu-color-active':
                                        subItem.path == $route.path
                                }"
                                :key="subIndex"
                                @click="go(subItem.path)"
                            >
                                {{ subItem.name }}
                            </li>
                        </ul>
                    </li>
                </ul>
                <div
                    :class="{ mask: menuMobileFlag }"
                    @click="menuMobileFlag = false"
                ></div>
                <div :class="{ 'search-mobile': true, show: searchFlag }">
                    <el-input
                        :placeholder="i18n.common.searchPlaceholder"
                        v-model="searchData"
                        clearable
                    ></el-input>
                </div>
                <ul class="nav-other">
                    <li class="lang" @click="toggleLang">
                        <img src="/lang.png" alt="" />
                        <span>{{i18n.common.lang}}</span>
                    </li>
                    <li class="search">
                        <img src="/search.png" alt="" />
                        <span>{{i18n.common.search}}</span>
                    </li>
                    <li>
                        <img src="/Gitee.png" alt="" />
                        <span>{{i18n.common.gitte}}</span>
                    </li>
                </ul>
                <ul class="nav-other-mobile">
                    <li class="lang" @click="toggleLang">
                        <span>{{i18n.common.lang}}</span>
                    </li>
                    <li
                        :class="{ search: true, 'search-active': searchFlag }"
                        @click="toggleSearchMobile"
                    >
                        <!-- <span class="icon-arrow"></span> -->
                        <span class="icon-search"></span>
                    </li>
                    <li
                        :class="{
                            menu: true,
                            'menu-icon-active': menuMobileFlag
                        }"
                        @click="toggleMenuMobile"
                    >
                        <i class="icon-menu"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toggleSubMenu: [],
            menuActivePath: "",
            menuMobileFlag: false,
            searchData: "",
            searchFlag: false,
            i18n: {}  
        };
    },
    mounted() {
        const locales  = this.$site;
        const locale = this.$lang === "zh-CN" ? "/zh/" : "/";
        this.i18n = locales.themeConfig.locales[locale].lang;
    },
    methods: {
        goHome() {
            const targetLocale = this.$lang === "zh-CN" ? "/zh/" : "/";
            this.$router.push(targetLocale);
            this.menuMobileFlag = false;
        },
        go(path) {
            if (path) {
                const targetLocale = this.$lang === "zh-CN" ? "/zh" : "";
                this.$router.push(targetLocale + path + '.html');
                this.menuMobileFlag = false;
            }
        },
        showSub(toggleClass) {
            toggleClass.push("show-sub-menu");
        },
        hideSub(toggleClass) {
            toggleClass.pop();
        },
        toggleLang() {
            const locale = this.$lang === "zh-CN" ? "en-US" : "zh-CN";
            const targetLocale = this.$lang === "zh-CN" ? "/" : "/zh/";
            window.localStorage.setItem("locale", locale);
            let currentLink = this.$page.path;
            if(currentLink.substring(0,4) === '/zh/') {
                currentLink =  currentLink.substring(3);
            } else{
                currentLink = '/zh' + currentLink;
            }
            this.$router.push(currentLink);
            this.i18n = this.$site.themeConfig.locales[targetLocale].lang;
        },
        menuActiveFn(item) {
            let $route = this.$route;
            return (
                $route.path === item.path ||
                $route.path === item.subPath ||
                $route.path === item.viewAllPath ||
                item.children.some(item => item.path === $route.path)
            );
        },
        toggleMenuMobile() {
            this.searchFlag = false;
            this.menuMobileFlag = !this.menuMobileFlag;
        },
        toggleSub(item) {
            if (item.path) {
                this.$router.push(item.path);
                this.menuMobileFlag = false;
                return;
            }
            if (item.class.length) {
                item.class.pop();
            } else {
                item.class.push("arrow-active");
            }
        },
        subMenuMobileFn(item) {
            let $route = this.$route;
            return (
                item.class.indexOf("arrow-active") > 0 ||
                $route.path === item.path ||
                $route.path === item.subPath ||
                $route.path === item.viewAllPath ||
                item.children.some(item => item.path === $route.path)
            );
        },
        toggleSearchMobile() {
            this.menuMobileFlag = false;
            this.searchFlag = !this.searchFlag;
        }
    }
};
</script>
<style lang="less" scoped>
.el-input {
    width: 80%;
    margin: 9px;
}
</style>
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
    border-bottom: 5px solid #002FA7;
}
.menu-mobile-active {
    display: block !important;
}
.show {
    display: block !important;
}
.search-active {
    color: #0041bd;
}
.mask {
    position: fixed;
    top: 72px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
.nav-fill {
    height: 110px;
    @media (max-width: 1000px) {
        height: 70px;
    }
    .nav-wrapper {
        background-color: #fff;
        animation: fade-in;
        animation-duration: 0.5s;
        height: 110px;
        width: 100%;
        position: fixed;
        z-index: 999;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
        @media (max-width: 1000px) {
            height: 70px;
        }
        .nav-bar {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: 1000px) {
                width: 100%;
                padding: 0 15px;
            }
            ul li {
                display: inline-block;
            }
            .nav-logo {
                flex-shrink: 0;
                width: 193px;
                margin-right: 25px;
                cursor: pointer;
            }
            .nav-logo-mobile {
                display: none;
                width: 142px;
            }
            .nav-other-mobile {
                display: none;
                height: 100%;
                .menu-icon-active {
                    color: #0041bd;
                }
                li {
                    height: 100%;
                    line-height: 70px;
                    vertical-align: middle;
                    margin-left: 20px;
                    cursor: pointer;
                }
                .lang {
                    font-size: 16px;
                }
                .search {
                    font-size: 25px;
                }
                .menu {
                    font-size: 22px;
                }
            }
            .nav-menu-mobile {
                display: none;
                max-height: calc(100vh - 70px);
                overflow-y: scroll;
                background-color: #fff;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                padding: 10px 30px;
                z-index: 998;
                & > li {
                    display: block;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
                    padding: 10px 0;
                    a {
                        border: none;
                        font-size: 16px;
                        font-family: FZLTHJW;
                        height: 26px;
                        line-height: 26px;
                        display: inline-block;
                        width: 100%;
                        position: relative;
                        .arrow-active {
                            color: #0041bd;
                            transform: rotate(90deg);
                        }
                        i {
                            position: absolute;
                            right: 7px;
                            top: 5px;
                        }
                    }
                    .sub-menu {
                        margin-left: 15px;
                        display: none;
                        .sub-menu-color-active {
                            color: #0041bd;
                        }
                        li {
                            display: block;
                            height: 26px;
                            line-height: 26px;
                            font-size: 14px;
                            font-family: FZLTXIHJW;
                            color: rgba(0, 0, 0, 0.7);
                            margin: 6px 0;
                        }
                    }
                }
            }
            .nav-menu {
                height: 100%;
                flex: 3;
                font-family: FZLTHJW;
                color: #000;
                font-size: 20px;
                display: flex;
                align-items: center;
                @media (max-width: 1000px) {
                    display: none;
                }
                .show-sub-menu {
                    .sub-menu {
                        animation: slide-down;
                        animation-duration: 0.5s;
                        top: 110px;
                        display: block;
                    }
                }
                .sub-menu {
                    background-color: #fff;
                    position: absolute;
                    left: -100%;
                    height: 242px;
                    width: 364px;
                    display: none;
                    border: 1px solid #002FA7;
                    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    .sub-menu-wrapper {
                        height: 100%;
                        display: flex;

                        .sub-menu-left {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            flex: 3;
                            background-color: rgba(0, 0, 0, 0.05);
                            height: 100%;
                            &:hover {
                                cursor: pointer;
                                color: #0041BD;
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
                                    color: #0041BD;
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
                                    color: #002FA7;
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
                                    color: #002FA7;
                                }
                            }
                        }
                    }
                }
                & > li {
                    position: relative;
                    padding: 0 25px;
                    height: 100%;
                    line-height: 110px;
                    @media (max-width: 1000px) {
                        line-height: 70px;
                    }
                    & > a {
                        display: inline-block;
                        height: 100%;
                        cursor: pointer;
                        &:hover {
                            border-bottom: 5px solid #002FA7;
                        }
                    }
                }
            }
            .nav-other {
                flex: 1;
                height: 100%;
                font-size: 16px;
                color: #000;
                font-family: FZLTXIHJW;
                display: flex;
                justify-content: flex-end;
                @media (max-width: 1000px) {
                    display: none;
                }
                li {
                    margin-left: 36px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    span {
                        margin-top: 10px;
                    }
                }
            }
            .search-mobile {
                display: none;
                text-align: center;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: #fff;
            }
            @media (max-width: 1000px) {
                .nav-logo {
                    display: none;
                }
                .nav-logo-mobile {
                    display: inline-block;
                }
                .nav-other-mobile {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
