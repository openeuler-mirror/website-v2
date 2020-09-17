<template>
    <div class="sig-list-content" v-loading.fullscreen="loading">
        <common-banner 
        :pc-src="'/img/sig/sig-banner.png'"
        :mobile-src="'/img/sig/sig-banner.png'"
        :inside-name="'SIG'"
        :outside-name="'SIG'"
        ></common-banner>
        <ul class="sig-list" v-fade v-if="list.length">
            <li class="sig-item fade-in" v-for="(item ,index) in list">
                <h2 @click="toDetail(item)">{{item.group_name}}</h2>
                <ul class="info-list">
                    <li class="mibile-hidden">
                        <img src="/img/sig/home.svg" alt="">
                        <span><a target="_blank" :href="item.home_page">{{i18n.sig.SIG_LIST.HOME_PAGE}}</a></span>
                    </li>
                    <li>
                        <img src="/img/sig/mail.svg" alt="">
                        <span>{{i18n.sig.SIG_LIST.MAIL}}：<a :href="'mailto:'+item.maillist">{{item.maillist}}</a></span>
                    </li>
                    <li>
                        <img src="/img/sig/chanel.svg" alt="">
                        <span>{{i18n.sig.SIG_LIST.IRC}}：{{item.irc}}</span>
                    </li>
                    <li>
                        <img src="/img/sig/members.svg" alt="">
                        <span>{{i18n.sig.SIG_LIST.MANAGER}}</span>
                    </li>
                </ul>
                <ul class="administrators">
                    <li v-for="(avatarItem, avatarIndex) in item.owners" v-if="avatarIndex < 4">
                        <img :src="avatarItem.avatar_url" class="avatar">
                        <span class="name" :title="avatarItem.gitee_id">{{avatarItem.gitee_id}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { sigList } from "../../api/sig";
import commonBanner from './../common/banner.vue';
let that = null;
let remoteMethods = {
    getSigList() {
        that.loading = true;
        sigList()
        .then(data => {
            data = localMethods.shuffle(data);
            data.forEach(item => {
                item.owners = localMethods.shuffle(JSON.parse(item.owners));
            })
            that.list = data;
            that.loading = false;
        })
        .catch(data => {
            that.$message.error(data);
            that.loading = false;
        });
    }
}
let localMethods = {
    shuffle (array) {

        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
export default {
    data() {
        that = this;
        return {
            list: [],
            loading: false
        };
    },
    created() {
        remoteMethods.getSigList();
    },
    methods: {
        toDetail(item) {
            this.$router.push({
                path: this.resolvePath('/sig/sig-list/sig-detail.html'),
                query: { 
                    id: item.id,
                    name: item.group_name,
                    mail: item.maillist
                }
            })
        }
    },
    components: {
        commonBanner
    }
};
</script>
<style lang="less" scoped>
.sig-list-content {
    width: 1120px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 15px;
    }
    .sig-list-banner {
        height: 600px;
        background-color: #002FA7;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .sig-list-banner-mobile {
        display: none;
        margin-top: 40px;
        h3 {
            text-align: center;
            font-size: 24px;
            font-family: FZLTHJW;
            margin-bottom: 10px;
            height: 34px;
            line-height: 34px;
        }
        div {
            width: 100%;
            height: 200px;
            background-color: #002FA7;
        }
        @media (max-width: 1000px) {
            display: block;
        }
    }
    .sig-list {
        column-count: 2;
        column-gap: 50px;
        margin-bottom: 200px;
        @media (max-width: 1000px) {
            margin-top: 40px;
            column-count: 1;
            column-gap: 0;
            margin-bottom: 40px;
            padding: 0 15px;
        }
        .sig-item {
            > h2 {
                cursor: pointer;
            }
            width: 530px;
            box-shadow: 0 6px 30px 0 rgba(0, 0, 0, .1);
            border-radius: 8px;
            margin-bottom: 60px;
            break-inside: avoid;
            transform: translate3d(0, 0, 0);
            padding: 36px 54px;
            @media (max-width: 1000px) {
                width: 100%;
                padding: 30px;
                margin-bottom: 40px;
            }
            .info-list {
                @media (max-width: 1000px) {
                    margin-top: 10px;
                    margin-bottom: 8px;
                }
                .mibile-hidden {
                    @media (max-width: 1000px) {
                        display: none;
                    }
                }
                li {
                    margin-top: 26px;
                    font-family: FZLTXIHJW;
                    font-size: 16px;
                    line-height: 20px;
                    @media (max-width: 1000px) {
                        margin-top: 10px;
                        font-size: 14px;
                        line-height: 24px;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        vertical-align: middle;
                        @media (max-width: 1000px) {
                            display: none;
                        }
                    }
                }
            }
            .administrators {
                padding: 0 10px;
                display: flex;
                justify-content: start;
                flex-wrap: wrap;
                li {
                    flex: 0 0 25%;
                    text-align: center;
                    margin-top: 16px;
                    @media (max-width: 1000px) {
                        flex: 0 0 33.3333333333333%;
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                    img {
                        width: 70px;
                        height: 70px;
                        display: block;
                        margin: 0 auto;
                        border-radius: 50%;
                        @media (max-width: 1000px) {
                            width: 36px;
                            height: 36px;
                        }
                    }
                    span {
                        margin-top: 12px;
                        @media (min-width: 1000px) {
                            flex-shrink: 0;
                            width: 95px;
                            display: inline-block;
                            white-space: nowrap; 
                            overflow: hidden;
                            text-overflow:ellipsis;
                        }
                        @media (max-width: 1000px) {
                            margin-top: 5px;
                        }
                    }
                }
            }
            a {
                color: #002fa7;
                text-decoration: none;
            }
            h2 {
                font-size: 30px;
                line-height: 32px;
                font-family: HuaweiSans-Medium;
                @media (max-width: 1000px) {
                    font-size: 18px;
                    line-height: 26px;
                    font-family: HuaweiSans-Bold;
                    color: #002fa7;
                }
            }
        }
    }
}
</style>
