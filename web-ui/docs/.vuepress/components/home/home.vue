<template>
    <div class="home">
        <div class="is-pc home-carousel" v-if="!isShowH5">
            <el-carousel class="home-banner" trigger="click" :autoplay="autoPlay" :interval="5000" @change="eventChange()">
                <el-carousel-item v-if="$lang === 'zh'">
                    <div class="activities-banner" 
                        :style="{backgroundImage: i18n.home.HOME_ACTIVETIES.PC_IMG}"
                        @click="go(i18n.home.HOME_ACTIVETIES.LINK)"
                    ></div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="carousel-video">
                        <video poster="/img/home/BannerVideo.png" loop width="100%" height="500px" id="home-video">
                            <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler_MG%2BAnimate_1920x500_0128.mp4"  type="video/mp4">
                        </video>
                        <playcontroll :ctrl-obj="videoCtrlParams" ref="playctrlEle" @playStatus="checkStatus"></playcontroll>
                        <div class="play-btn" v-if="!isNowPlay" @click="playHomeVideo()">
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item class="carousel-item">
                    <div class="banner-link" @click="go($site.themeConfig.docsUrl+i18n.home.HOME_FIRST_BANNER.LINK)">
                        <div class="banner-item">
                            <div class="item-info">
                            <h3>{{ i18n.home.HOME_FIRST_BANNER.TITLE }}</h3>
                            <span>{{ i18n.home.HOME_FIRST_BANNER.DES }}</span>
                            <div class="download-version" :class="$lang === 'en'?'en-version':''">
                                <div>{{i18n.home.HOME_FIRST_BANNER.DOWNLOAD}}</div>
                            </div>
                            </div>
                            <img class="banner-gif" v-lazy="i18n.home.HOME_FIRST_BANNER.IMG">
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item v-for="(item,index) in i18n.home.HOME_OTHER_BANNER">
                    <div class="carousel-banner summmit-banner" @click="go(item.BANNER_LINK)" v-if="index === 0">
                        <video autoplay loop muted width="700px" height="500px" id="summit-video">
                            <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler%20Summit%202020%20mov.mp4"  type="video/mp4">
                        </video>
                        <img :src="item.BANNER_PC_IMG" alt="" />
                    </div>
                    <div class="carousel-banner" :style="{backgroundImage: item.BANNER_PC_IMG}" @click="go(item.BANNER_LINK)" v-else>
                    </div>
                </el-carousel-item>
                <el-carousel-item
                        class="carousel-item"
                        v-for="(item, index) in i18n.home.HOME_CAROUSEL_DATA"
                        :key="index">
                    <a class="banner-link" @click="go(item.LINK)">
                        <div class="banner-item minisite">
                            <div class="item-info">
                                <h3>{{ item.TITLE }}</h3>
                                <span>{{ item.DES }}</span>
                            </div>
                            <img class="banner-gif" v-lazy="item.IMG" v-if="isShowH5">
                            <video autoplay loop muted width="300px" height="300px" id="minisite-video" v-else>
                                <source :src="item.VIDEO_URL"  type="video/mp4">
                            </video>
                        </div>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="is-h5 home-carousel mobile-home-carousel" v-if="isShowH5">
            <swiper ref="mySwiper" class="home-banner mobile-swiper" :options="swiperOption" @slideChange="slideChange">
                 <swiper-slide class="carousel-item-index" v-if="$lang === 'zh'">
                    <div class="mobile-version" @click="go(i18n.home.HOME_ACTIVETIES.LINK)" :style="{backgroundImage:i18n.home.HOME_ACTIVETIES.MOBILE_IMG}"></div>
                </swiper-slide>
                <swiper-slide>
                    <div class="carousel-video">
                        <video poster="/img/home/BannerVideo.png"
                                loop
                                muted
                                width="100%"
                                height="300px"
                                ref="video"
                                @click="playVideo">
                            <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/openEuler_MG%2BAnimate_1080P_20210128.mp4"  type="video/mp4">
                        </video>
                        <div class="mobile-btn" v-show="mobilePlayBtnDisplay" @click="playVideo"></div>
                    </div>
                </swiper-slide>
                <swiper-slide class="carousel-item-index">
                    <div class="mobile-version" @click="go($site.themeConfig.docsUrl+i18n.home.HOME_FIRST_BANNER.LINK)" :style="{backgroundImage:i18n.home.HOME_FIRST_BANNER.MOBILE_IMG}"></div>
                </swiper-slide>
                    <swiper-slide v-for="(item,index) in i18n.home.HOME_OTHER_BANNER">
                        <div class="carousel-banner mobile-banner" :style="{backgroundImage: item.BANNER_MOBILE_IMG}" @click="go(item.BANNER_LINK)">
                        </div>
                    </swiper-slide>
                    <swiper-slide
                            class="carousel-item-index"
                            v-for="(item, index) in i18n.home.HOME_CAROUSEL_DATA"
                            :key="index">
                        <div @click="go(item.LINK)" :key="index"> 
                            <h3>{{ item.TITLE }}</h3>
                            <img v-lazy="item.IMG">
                        </div>
                    </swiper-slide>
            </swiper>
            <ul class="mobile-pagination">
                <li v-for="item in bannerAmount" :class="{'mobile-pagination-active': mobilePagenationIndex===item}"></li>
            </ul>
        </div>
        <div class="home-introduce">
            <h1></h1>
            <h3 :class="$lang == 'en'?'en-h3':''">{{ i18n.home.HOME_INTRODUCE.INTRO_HEAD }}</h3>
            <p :class="$lang == 'en'?'en-p':''">{{ i18n.home.HOME_INTRODUCE.INTRO_DESCRIPTION }}</p>
            <div class="is-pc mapArea" :class="$lang === 'ru'?'lang-ru':''" v-if="!isShowH5">
                <div :class="['area-box map-flow','in-pc',$lang == 'en' && index == 3?'en-areabox-down':'']" v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_MAP" :key="index">
                    <a v-if="(index !== 3)" @click="go(item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.OTHER_LINK:item.LINK)" target="_blank">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p :class="$lang == 'en'?'en-areabox-p':''">{{ item.TITLE }}</p>
                        <img v-lazy="item.IMG" alt="">
                        <img :src="item.GIF" alt="" :class="[$lang == 'en'?'en-areabox-gif':'']">
                    </a>
                    <a class="down" v-if="(index === 3)" @click="go(item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.OTHER_LINK:item.LINK)" target="_blank">
                        <img v-lazy="item.IMG" alt="">
                        <img :src="item.GIF" alt="" class="is-hidden">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p :class="$lang == 'en'?'en-areabox-p':''">{{ item.TITLE }}</p>
                    </a>
                </div>
                <div class="area-box bottom in-pc" @click="clickDownload">
                    <a class="down">
                        <img v-lazy="'/img/home/step2.png'" alt="">
                        <img :src="'/img/home/step-move-2.gif'" alt="" class="is-hidden">
                        <div class="box-icon">{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.NAME }}</div>
                        <p :class="$lang == 'en'?'en-areabox-p':''">{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.TITLE }}</p>
                    </a>
                    <div class="snd-guidance" :class="$lang == 'en'?'en-snd-guidance':''">
                        <div class="d3"></div>
                        <p :class="$lang == 'en'?'en-link-title':''">{{ i18n.home.HOME_INTRODUCE.INTRO_GUIDE.INFO }}</p>
                        <div class="d3-guide">
                            <div
                                    class="guide-way"
                                    :class="$lang == 'en'?'en-guide-way':''"
                                    v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_GUIDE.GUIDE_WAY"
                                    :key="index">
                                <a @click="goInstall(item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.LINK:item.LINK)" target="_blank">
                                    <img v-lazy="item.IMG" alt="">
                                    <span>{{ item.TITLE }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map-rode">
                <img class="is-pc rode-left" v-lazy="'/img/home/rodeLeft.svg'" alt="">
                <img class="is-pc plane-left" v-lazy="'/img/home/planeLeft.svg'" alt="">
                <img class="is-pc rode-middle" v-lazy="'/img/home/rodeMiddle.svg'" alt="">
                <img class="is-pc plane-middle" v-lazy="'/img/home/planeMiddle.svg'" alt="">
                <img class="is-pc rode-right" v-lazy="'/img/home/rodeRight.svg'" alt="">
                <img class="is-pc plane-right" v-lazy="'/img/home/planeRight.svg'" alt="">
            </div>
            <div class="is-h5 mapArea" v-if="isShowH5">
                <div
                    class="area-box"
                    v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_MAP"
                    :key="index"
                    >
                        <div class="box-icon" @touchstart="go(item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.LINK:item.LINK)">{{ item.NAME }}</div>
                        <p @touchstart="go(item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.OTHER_LINK:item.LINK)" :class="$lang === 'en'?'lang-en':''">{{ item.TITLE }}</p>
                        <img v-lazy="item.IMG" alt=""/>
                </div>
                <div :class="['snd-guidance','location',isShowCard?'is-show':'',$lang == 'en'?'en-snd-guidance':'']">
                    <div class="d3"></div>
                    <p :class="$lang == 'en'?'en-link-title':''">{{ i18n.home.HOME_INTRODUCE.INTRO_GUIDE.INFO }}</p>
                    <div class="d3-guide">
                        <div
                            class="guide-way"
                            :class="$lang == 'en'?'en-guide-way':''"
                            v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_GUIDE.GUIDE_WAY"
                            :key="index">
                                <a :href="item.LINK.includes('/docs/')?$site.themeConfig.docsUrl+item.LINK:item.LINK">
                                    <img v-lazy="item.IMG" alt="">
                                    <span>{{ item.TITLE }}</span>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-active" :style="{ backgroundImage:'url('+activeImg+')' }">
            <h3 :class="$lang == 'en'?'en-h3-home':''">{{ i18n.home.HOME_ACTIVE.ACTIVE_TITLE }}</h3>
            <p :class="$lang == 'en'?'en-weight-family':''">{{ i18n.home.HOME_ACTIVE.ACTIVE_DESCRIPTION }}</p>
        </div>

        <div class="home-calendar" v-if="calenderData.length">
            <calender :table-data="calenderData" />
        </div>

        <div class="home-newsroom">
            <div class="is-pc room-right" v-if="!isShowH5">
                <div class="room-title">
                    <a v-for="(item, index) in roomName" :key="index" :class="{'active': currentRoom === index,'en-weight-family':$lang == 'en'}" @click="vueToggle(index)">{{ item }} </a>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 0}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in newsList"
                             :key="index">
                            <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                            <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.title }}</router-link></p>
                        </div>
                        <span></span>
                    </div>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 1}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in blogList"
                             :key="index">
                            <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                            <span>|</span>
                            <span>{{ item.frontmatter.author }}</span>
                            <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.summary }}</router-link></p>
                        </div>
                        <span><a @click="go('/interaction/blog-list/')">{{ i18n.home.MORE }}</a></span>
                    </div>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 2}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in newsList"
                             :key="index">
                            <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                            <span>|</span>
                            <span>{{ item.frontmatter.author }}</span>
                            <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.title }}</router-link></p>
                        </div>
                        <span><a @click="go('/interaction/news-list/')">{{ i18n.home.MORE }}</a></span>
                    </div>
                </div>
            </div>
            <div class="is-pc room-left" v-if="!isShowH5">
                <template>
                    <el-carousel indicator-position="none" :autoplay="false" arrow="never" ref="newsroomCard" class="room-card">
                        <el-carousel-item v-for="(item,index) in i18n.home.ROOM_LEFT_IMG" :key="index">
                            <a class="room-img active card-hover">
                                <img v-lazy="item.IMG" @click="go(item.LINK)" alt="">
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </template>

            </div>
            <div class="is-h5 newsroom" v-if="isShowH5">
                <div class="event-room">
                    <h5>{{ i18n.home.HOME_ROOMS.EVENT_NAME }}</h5>
                    <div class="rooms"
                        v-for="(item, index) in newsList"
                        :key="index">
                        <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                        <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.title }}</router-link></p>
                    </div>
                </div>
                <div class="blog-room">
                    <h5>{{ i18n.home.HOME_ROOMS.BLOG_NAME }}</h5>
                    <div class="rooms"
                         v-for="(item, index) in blogList"
                         :key="index">
                        <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                        <span>|</span>
                        <span>{{ item.frontmatter.author }}</span>
                        <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.summary }}</router-link></p>
                    </div>
                    <span><a class="room-more" @click="go('/interaction/blog-list/')">{{ i18n.home.MORE }}</a></span>
                </div>
                <div class="news-room">
                    <h5>{{ i18n.home.HOME_ROOMS.NEWS_NAME }}</h5>
                    <div class="rooms" 
                            v-for="(item, index) in newsList"
                            :key="index">
                        <span>{{ resolvePostDate(item.frontmatter.date) }}</span>
                        <span>|</span>
                        <span>{{ item.frontmatter.author }}</span>
                        <p><router-link class="word-hover" :to="item.path">{{ item.frontmatter.title }}</router-link></p>
                    </div>
                    <span><a class="room-more" @click="go('/interaction/news-list/')">{{ i18n.home.MORE }}</a></span>
                </div>
            </div>
        </div>

        <div class="home-developer">
            <h3 :class="$lang == 'en'?'en-h3':''">{{ i18n.home.HOME_DEV.DEV_TITLE }}</h3>
            <p :class="$lang == 'en'?'en-developer-p':''">{{ i18n.home.HOME_DEV.DEV_DESCRIPTION }}</p>
            <div class="dev-leader" v-fade v-if="developerList.length">
                <div class="dev-dever hidden fade-in" v-for="(value, index) in developerList" :key="index" >
                    <img class="dev-img" v-lazy="value.IMG">
                    <p class="dever-name">{{ value.NAME }}</p>
                    <p :class="['dever-rank',$lang == 'en'?'en-rank':'']">{{ value.TITLE }}</p>
                    <p :class="['dever-rank',$lang == 'en'?'en-rank':'']">{{ value.RANK }}</p>
                    <div class="dev-link">
                        <a :href="'mailto:' + value.MAIL_LINK" target="_blank">
                            <img class="email-link" v-lazy="'/img/home/email.png'" alt="">
                        </a>
                        <a :href="value.GITEE_LINK" target="_blank">
                            <img v-lazy="'/img/home/Gitee.png'" alt="">
                        </a>
                    </div>
                </div>
            </div>
            <div class="show-all" @click="showAll">
                <p>{{ i18n.home.EXPAND }}</p>
                <img v-if="flag" v-lazy="'/img/home/arrow.svg'" alt="">
                <img v-if="!flag" v-lazy="'/img/home/arrowUp.svg'" alt="">
            </div>
        </div>

        <div class="data-round">
            <h3>{{ i18n.home.HOME_ROUND.ROUND_TITLE }}</h3>
            <div class="round-box">
                <round class="round-item" :image="item.ROUND_IMG" :value="item.ROUND_VALUE" :description="item.ROUND_TEXT" 
                    :styleParams="item.ROUND_STYLE" v-for="(item,index) in roundList"></round>
            </div>
        </div>

        <div class="home-source">
            <h3 :class="$lang == 'en'?'en-h3':''">{{ i18n.home.HOME_SOURCE.SOURCE_TITLE }}</h3>
            <div class="source-contain">
                <div class="source-apply">
                    <div class="apply-img">
                        <img v-lazy="'/img/home/sourceApply.gif'" alt="">
                    </div>
                    <div class="apply-des">
                        <p :class="['source-title',$lang == 'en'?'en-source-title':'']">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.TITLE }}</p>
                        <p :class="$lang == 'en'?'en-p':''">
                            {{ i18n.home.HOME_SOURCE.SOURCE_APPLY.DES }}
                        </p>
                        <p class="click-here"><a :class="$lang == 'en'?'en-p':''" @click="go('/blog/fred_li/2020-03-25-apply-for-vm-from-pcl.html')">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.APPLY }}</a></p>
                        <p><span :class="['source-sponsor',$lang == 'en'?'en-p':'']" @click="go(i18n.home.HOME_SOURCE.SOURCE_APPLY.SPONSORLINK)">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.SPONSOR }}</span></p>
                    </div>
                </div>
                <div class="source-mail">
                    <div class="mail-img">
                        <img v-lazy="'/img/home/sourceMail.gif'" alt="">
                    </div>
                    <div class="mail-des">
                        <p :class="['source-title',$lang == 'en'?'en-source-title':'']">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.TITLE }}</p>
                        <p><a :class="$lang == 'en'?'en-p':''" href="mailto:community@openeuler.org">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.MAIL }}</a></p>
                        <p :class="$lang == 'en'?'en-p':''">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.DES }}</p>
                        <p :class="$lang == 'en'?'en-p':''">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.SUBSCRIBE }}<a :class="$lang == 'en'?'en-p':''" @click="go('/community/mailing-list/')">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.LINK }}</a></p>
                    </div>
                </div>
            </div>
            <div class="source-publish-link publish diff-pc-mobile">
                <h5 :class="$lang == 'en'?'en-h3':''">{{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}</h5>
                <div class="publish-edition" v-for="(item,index) in i18n.home.HOME_SOURCE_EDITION">
                    <a :href="item.LEFT_IMG_LINK" target="_blank">
                        <img class="pc-img" v-lazy="item.LEFT_IMG_PC" alt="">
                        <img class="mobile-img" v-lazy="item.LEFT_IMG_MOBILE" alt="">
                    </a>
                    <a :href="item.RIGHT_IMG_LINK" target="_blank" :class="item.RIGHT_IMG_LINK?'':'empty-a'">
                        <img class="pc-img" v-lazy="item.RIGHT_IMG_PC" alt="">
                        <img class="mobile-img" v-lazy="item.RIGHT_IMG_MOBILE" alt="">
                    </a>
                </div>
            </div>
            <div class="source-publish-link diff-pc-mobile">
                <h5 :class="$lang == 'en'?'en-h3':''">{{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}</h5>
                <div class="publish-edition" v-for="(item,index) in i18n.home.FRIENDSHIP_LINK_LIST">
                    <a :href="item.LEFT_IMG_LINK" target="_blank">
                        <img class="pc-img" v-lazy="item.LEFT_IMG_PC" alt="">
                        <img class="mobile-img" v-lazy="item.LEFT_IMG_MOBILE" alt="">
                    </a>
                    <a :href="item.RIGHT_IMG_LINK" target="_blank" :class="item.RIGHT_IMG_LINK?'':'empty-a'">
                        <img class="pc-img" v-lazy="item.RIGHT_IMG_PC" alt="">
                        <img class="mobile-img" v-lazy="item.RIGHT_IMG_MOBILE" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
    import 'swiper/css/swiper.css';
    import { meetingList, statisticsList } from "../../api/home";
    import dayjs from "dayjs";
    import calender from "./calender";
    import playcontroll from './../controll/videoctrl';
    import round from './../round/round';
    let that = null;
    let remoteMethods = {
        meetingList () {
            meetingList()
            .then(data => {
                that.calenderData = data.tableData;
            })
            .catch(data => {
                that.$message.error(data);
            });
        },
        statisticsList () {
            statisticsList(that.statisticParams)
            .then(data => {
                if(data.code === 200) {
                    let dataObj = data.data;
                    that.roundValueObj = dataObj;
                    that.roundList = that.addValue(that.i18n.home.HOME_ROUND.ROUND_LIST);
                }
            })
            .catch(data => {
                that.$message.error(data);
            })
        }   
    }
    export default {
        name: "home",
        data() {
            that = this;
            return {
                info: 'aaa',
                flag: true,
                height: "380px",
                banner1: "/img/home/Banner1.gif",
                activeImg: "/img/home/homeActive.gif",
                startIndex: 0,
                endIndex: 4,
                blogList: null,
                newsList: null,
                currentRoom: 0,
                roomName: [],
                rooms1: true,
                rooms2: false,
                rooms3: false,
                calenderData: [],
                autoPlay: true,
                videoCtrlParams:{
                    element: '',
                    isShow: false,  //是否使用大控件
                    barWidth: 300  
                },
                isNowPlay: false,
                isShowCard: false,  //是否显示移动端点击体验的卡片
                mobilePlayBtnDisplay: true,
                swiperOption: {
                    loop: true
                },
                mobileSwiperInterval: null,
                mobilePagenationIndex: 1,
                developerList: [],
                bannerAmount: 7,
                statisticParams: {
                    type: 'openEuler'
                },
                roundValueObj: {},
                roundList: []
            }
        },
        mounted() {
            this.videoCtrlParams.element = document.getElementById('home-video');
            remoteMethods.meetingList();
            remoteMethods.statisticsList();
            this.roomName = this.i18n.home.HOME_ROOMS.ROOM_NAME
            this.getRoomsData();
            if(this.isShowH5){
                this.$nextTick(() => {
                    this.mobileSwiperInterval = setInterval(() => {
                        this.swiper.slideNext();
                    }, 5000);
                })
            }
            this.developerList = this.changeArr(this.i18n.home.HOME_DEV.DEV_INFO,16);
        },
        beforeDestroy () {
            this.mobileSwiperInterval && clearInterval(this.mobileSwiperInterval);
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper;
            }
        },
        components: {
            calender,
            playcontroll,
            Swiper, 
            SwiperSlide,
            round
        },
        methods: {
            slideChange () {
                this.mobilePagenationIndex = this.$refs.mySwiper.$swiper.realIndex + 1;
            },
            go(path) {
                if (path && !path.includes("http")) {
                    this.$router.push({
                        path: this.resolvePath(path)
                    });
                }else if(path.includes("http")){
                    window.open(path);
                }else{
                    this.isShowCard = !this.isShowCard;
                }
            },
            goInstall(path) {
                if (path.includes("http") || path.includes("https")) {
                    window.open(path);
                } else {
                    this.$router.push(path);
                }
            },
            e(selector) {
                let e = document.querySelector(selector)
                if (e === null) {
                    return null;
                } else {
                    return e;
                }
            },
            es(selector) {
                let es = document.querySelectorAll(selector)
                if (es.length === 0) {
                    return null;
                } else {
                    return es;
                }
            },
            playVideo() {
                this.mobilePlayBtnDisplay = false;
                clearInterval(this.mobileSwiperInterval);
                this.$refs.video.play()
            },
            addClassAll(className) {
                let selector = '.' + className;
                let elements = document.querySelectorAll(selector);
                for (let i = 0; i < elements.length; i++) {
                    let e = elements[i];
                    e.classList.add('hidden');
                }
            },
            removeClassAll(className) {
                let selector = '.' + className
                let elements = this.es(selector)
                for (let i = 0; i < elements.length; i++) {
                    let e = elements[i]
                    e.classList.remove(className)
                }
            },
            showAll() {
                if (this.flag) {
                    this.removeClassAll('hidden');
                    let text = this.e('.show-all');
                    let p = text.querySelector('p');
                    p.innerHTML = this.i18n.home.RETRACT;
                    this.flag = !this.flag;
                } else {
                    this.addClassAll('dev-dever');
                    let text = this.e('.show-all');
                    let p = text.querySelector('p');
                    p.innerHTML = this.i18n.home.EXPAND;
                    this.flag = !this.flag;
                }
            },
            clickDownload() {
                let box = this.e('.snd-guidance');
                if (this.flag) {
                    box .classList.add('is-show');
                    this.flag = !this.flag;
                } else  {
                    box.classList.remove('is-show');
                    this.flag = !this.flag;
                }
            },
            getRoomsData() {
                let datas = this.$sitePages;
                let lang = this.$lang
                let blogData = []
                let newsData = []
                if (lang === "zh") {
                    blogData = this.filterSiteData(datas, "/zh/blog/");
                    newsData = this.filterSiteData(datas, "/zh/news/");
                } else {
                    blogData = this.filterSiteData(datas, "/en/blog/");
                    newsData = this.filterSiteData(datas, "/en/news/");
                }
                this.blogList = blogData;
                this.newsList = newsData;
            },
            resolvePostDate(date) {
                return dayjs(date).format(
                    this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
                );
            },
            filterSiteData(datas, string) {
                let newData = datas.filter(data => data.path.includes(string));
                newData.sort(function (date1, date2) {
                    let origin1 = date1.frontmatter.date
                    let origin2 = date2.frontmatter.date

                    let parsed1 = Date.parse(origin1)
                    let parsed2 = Date.parse(origin2)

                    return(parsed2 - parsed1);
                })
                newData = newData.slice(0, 3);
                return newData;
            },
            vueToggle(index) {
                this.currentRoom = index;
                this.$refs.newsroomCard.setActiveItem(index);
            },
            eventChange(){
                this.$refs.playctrlEle.isPlay = false;
                this.isNowPlay = false;
            },
            playHomeVideo(){
                this.$refs.playctrlEle.isPlay = true;
                this.isNowPlay = true;
            },
            checkStatus(status){
                if(status == true){
                    this.isNowPlay = true;
                    this.autoPlay = false;
                }else{
                    this.isNowPlay = false;
                    this.autoPlay = true;
                }
            },
            changeArr(arr,count){
                //打乱数组顺序
                for(let i = 0,len = arr.length;i < len;i++){
                    let currentRandom = parseInt(Math.random() * (len-1));
                    let current = arr[i];
                    arr[i] = arr[currentRandom];
                    arr[currentRandom] = current;
                }
                return arr.slice(0,count);
            },
            addValue(arr) {
                let temp = arr;
                temp.forEach(item => {
                    if(item.ROUND_KEY === 'businessosv') {
                        item.ROUND_VALUE = 9;
                    }else{
                        item.ROUND_VALUE = that.roundValueObj[item.ROUND_KEY];
                    }
                });
                return temp;
            }
        }
    }
</script>

<style lang="less">
    .home-banner .el-carousel__button {
        height: 10px;
        width: 10px;
        background-color: #000;
        border-radius: 50%;
    }
    .el-carousel__container {
        height: 500px;
    }
    .el-carousel__button{
        opacity: 0.2;
    }
    .room-card .el-carousel__container {
        height: 360px;
    }

    @media screen and (max-width: 1000px) {
        .el-carousel__container {
            height: 369px;
        }
        .room-card {
            display: none;
        }
    }
</style>

<style lang="less" scoped>
    #summit-video {
        background-color: white !important;
        margin-left: -100px;
    }
    .mobile-swiper {
        height: 300px;
    }
    .mobile-home-carousel {
        position: relative;
        .mobile-pagination {
            z-index: 99;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            li {
                margin-right: 10px;
                display: inline-block;
                height: 10px;
                width: 10px;
                border-radius: 50%;
                background-color: #000;
                opacity: .2;
            }
            .mobile-pagination-active {
                opacity: 1;
            }
        }
    }
    .en-weight-family{ 
        
        font-weight: 400 !important;
    }
    .en-h3{
        line-height: 34px !important;
        
        font-weight: 400 !important;
        color: #000000 !important;
    }
    .en-p{
        
        font-weight: 400 !important;
        line-height: 32px !important;
    }
    [v-cloak] {
        display: none !important;
    }
    .is-pc {
        display: block;
    }
    .is-h5 {
        display: none;
    }
    .home h3 {
        font-size: 30px;
        color: #0b162b;
        text-align: center;
        margin-bottom: 20px;
    }
    .word-hover{
        &:hover{
            color: #002FA7;
        }
    }
    .card-hover:hover {
        box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
    }
    .home p {
        font-size:14px;
        text-align: center;
        line-height: 24px;
        margin: 0 auto;
        color: rgba(0, 0, 0, .5);
    }
    .home-carousel .el-carousel__item h3 {
        font-size: 24px;
        color: #000;
        text-align: left;
        line-height: 48px;
        
        margin-top: 100px;
    }
    .home-carousel .el-carousel__item span {
        display: inline-block;
        width: 620px;
        font-size: 20px;
        line-height: 40px;
        margin-top: 48px;
    }
    .home .data-round {
        width: 1120px;
        margin: 120px auto;
        height: 713px;
        .round-box{
            width: 1033px;
            margin: 90px auto 0 auto;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            .round-item {
                margin-left: 170px;
                &:first-of-type {
                    margin-left: 0;
                }
                &:nth-of-type(4),&:last-of-type {
                    margin-top: 80px;
                }
            }
        }
        @media screen and (max-width: 1000px){
            width: 336px;
            height: 300px;
            margin: 61px auto 58px auto;
            .round-box{
                width: 100%;
                margin: 32px auto 0 auto;
                .round-item {
                    margin-left: 18px;
                    &:first-of-type {
                        margin-left: 0;
                    }
                    &:nth-of-type(4) {
                        margin: 30px 0 0 60px;
                    }
                    &:last-of-type {
                        margin: 30px 0 0 24px;
                    }
                }
            }
        }
    }
    .carousel-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .carousel-item .train-banner-box{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{
            &:first-of-type{
                width: 620px;
                height: 400px;
            }
            display: inline-block;
            &:last-of-type{
                margin-left: 211px;
            }
        }
    }
    .carousel-item .card-summer {
        width: 620px;
        margin-top: 100px;
        text-align: center;
    }
    .card-summer img:first-child {
        width: 256px;
        margin-top: 0;
    }
    .banner-gif {
        margin-top: 80px;
    }
    .banner-link {
        cursor: pointer;
        text-decoration: none;
        color: #000;
        .minisite {
            justify-content: space-between;
            #minisite-video {
                position: relative;
                margin-top: 80px;
            }
        }
    }
    .activities-banner {
        width: 1120px;
        margin: 0 auto; 
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .banner-item {
        width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        .download-version{
            width: 120px;
            height: 36px;
            font-size: 18px;
            
            margin-top: 60px;
            color: #ffffff;
            line-height: 24px;
            background-color: #002fa7;
            border-radius: 4px;
            text-align: center;
            div{
              line-height: 36px;
            }
        }
        .en-version{
            width: 120px;
            
        }
    }
    .carousel-item .card-summer span {
        margin-left: 0;
        text-align: left;
        width: 100%;
    }
    .carousel-item .base-software-box{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        cursor: pointer;
        @media screen and (max-width: 1000px) {
            background-size: 100% 100%;
        }
    }
    .carousel-item img {
        z-index: -1;
    }
    .carousel-item video {
        position: absolute;
        top: 0;
    }
    .carousel-item .HC-box{
        position: relative;
        cursor: pointer;
        width: 1080px;
        height: 500px;
        margin: 0 auto;
    }
    .carousel-item .HC-left-box{
        position: absolute;
        top: 15%;
        left: 5%;
        img{
            width: 65px;
            height: 47px;
        }
        .center-word{
            margin-top: 57px;
            p{
                text-align: left;
                &:first-of-type{
                    font-size: 45px;
                    
                    color: #1E1E1E;
                    line-height: 61px;
                }
                &:last-of-type{
                    font-size: 32px;
                    
                    font-weight: normal;
                    color: #1E1E1E;
                    line-height: 39px;
                    letter-spacing: 19px;
                    margin-top: 12px;
                }
            }
        }
        .bottom-word{
            margin-top: 57px;
            p{
                text-align: left;
                
                font-weight: normal;
                color: #1E1E1E;
                &:first-of-type{
                    line-height: 36px;
                    letter-spacing: 6px;
                }
                &:last-of-type{
                    line-height: 27px;
                    letter-spacing: 2px;
                    margin-top: 14px;
                }
            }
        }
    }
    .carousel-img {
        width: 1080px;
        height: 480px;
        z-index: -1;
    }
    .carousel-video{
        &:hover{
            .playControll{
                display: block;
            }
        }
        .play-btn{
            width: 100px;
            height: 100px;
            position: absolute;
            border-radius: 50px;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -50px -50px;
            background-image: url('/img/home/play-btn.gif');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
        }
    }
    .carousel-video img {
        width: 100%;
        
    }
    .carousel-video video {
        outline: none;
        object-fit: cover;
    }
    .el-carousel__container {
        height: 680px;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .home-banner .el-carousel__button {
        height: 10px;
        width: 10px;
        background-color: #000;
        border-radius: 50%;
    }
    .home-banner .carousel-banner {
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: relative;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        @media screen and (max-width: 1000px) {
            background-size: 100% 100%;
        }
    }
    .home-banner .summmit-banner{
        width: 1120px !important;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img{
            width: 430px;
            height: 380px;
        }
    }
    .home-banner .mobile-banner {
        @media screen and (max-width: 1000px) {
            background-size: contain !important;
            height: 100%;
        }
    }
    .home-introduce {
        padding-top: 100px;
        text-align: center;
        width: 1080px;
        margin: 0 auto;
    }
    .map-rode {
        width: 1080px;
        margin: 0 auto;
        position: relative;
    }
    .rode-left {
        position: absolute;
        left: 95px;
        z-index: -10;
    }
    .rode-middle {
        position: absolute;
        left: 420px;
        top: -310px;
        z-index: -10;
    }
    .rode-right {
        position: absolute;
        left: 760px;
        top: -70px;
        z-index: -10;
    }
    .plane-left {
        position: absolute;
        left: 215px;
        z-index: -10;
    }
    .plane-middle {
        position: absolute;
        left: 595px;
        top: -325px;
        z-index: -10;
    }
    .plane-right {
        position: absolute;
        left: 920px;
        top: -25px;
        z-index: -10;
    }
    .home-introduce .is-h5.mapArea {
        display: none ;
    }
    .home-introduce .is-pc {
        display: block;
    }
    .home-introduce h1 {
        width: 771px;
        height: 40px;
        background-image: url('/img/home/pc-h1.png');
        background-size: contain;
        margin-bottom: 40px;
        margin: 0 auto 40px auto;
    }
    .home-introduce .en-p{
        
        font-weight: 400;
    }
    .home-introduce .en-areabox-down{
        top:-82px !important;
        left: 84% !important;
    }
    .home-introduce p {
        max-width: 576px;
        
    }
    .home-introduce .mapArea {
        display: inline-block;
        width: 100%;
        height: 280px;
        margin-top: 84px;
        position: relative;
    }
    .home-introduce .mapArea .map-flow,.home-introduce .mapArea .bottom .down {
        img {
            &:last-of-type {
                display: none;
            }
        }
    }
    .home-introduce .mapArea .map-flow:hover {
        img {
            &:first-of-type {
                display: none;
            }
            &:last-of-type {
                display: block;
            }
        }
    }
    .home-introduce .mapArea .bottom:hover {
        .down {
            img {
                &:first-of-type {
                    display: none;
                }
                &:last-of-type {
                    display: block;
                }
            }
        }
    }
    .area-box.in-pc:nth-child(1) {
        position: absolute;
        top: 88px;
        left: 0;
    }
    .area-box.in-pc:nth-child(2) {
        display: none;
    }
    .area-box.in-pc:nth-child(3) {
        position: absolute;
        top: 90px;
        left: 56%;
    }
    .area-box.in-pc:nth-child(4) {
        position: absolute;
        top: -40px;
        left: 80%;
    }
    .lang-ru .area-box.in-pc:nth-child(4) {
        top: -80px;
        left: 84%;
    }
    .area-box.in-pc:nth-child(5) {
        position: absolute;
        top: 0;
        left: 28%;
    }
    .area-box {
        display: inline-block;
        width: 191px;
    }
    .area-box a {
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
    .area-box .box-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        color: #fff;
        font-size: 20px;
        line-height: 60px;
        background-color: #002fa7;
        border-radius: 50%;
    }
    .area-box .en-areabox-p{
        color: #002FA7;
        line-height: 26px;
        max-width: 181px;
    }
    .area-box p {
        display: inline-block;
        font-size: 16px;
        color: #002fa7;
        margin-left: 8px;
    }
    .area-box img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 10px 0 26px 30px;
    }
    .area-box .en-areabox-gif{
        top: 105px !important;
    }
    .area-box .is-hidden {
        display: none;
        width: 150px;
        height: 150px;
    }
    .area-box .is-hovered {
        display: block;
        position: absolute;
        top: 60px;
    }
    .area-box .down .is-hovered {
        top: 0px;
    }
    .snd-guidance {
        display: none;
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        padding: 10px 23px 23px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
        text-align: left;
        margin-top: 15px;
        margin-left: 25px;
    }
    .snd-guidance.is-show {
        display: block;
        width: 280px;
    }
    .en-snd-guidance{
        padding: 10px !important;
         margin-top: 0 !important;
         @media screen and (max-width: 1000px) {
             p{
                 margin: 0 0 0 8px !important;
             }
         }
    }
    .snd-guidance .en-link-title{
        font-size: 12px !important;
        
        font-weight: 400 !important;
        color: #000000 !important;
        line-height: 18px !important;
        position: absolute;
        bottom: 75px;
        width: inherit;
    }
    .d3-guide {
        display: flex;
        justify-content: space-between;
    }
    .d3{
        margin-left: 30px;
        width: 15px;
        height: 15px;
        transform: rotate(45deg);
        border-left: 1px solid rgba(0, 47, 167, .5);
        border-top: 1px solid rgba(0, 47, 167, .5);
        box-sizing: border-box;
        position: relative;
        top: -18px;
        background: #fff;
    }
    .guide-way {
        margin-right: 20px;
        text-align: center;
        
    }
    .guide-way:last-child {
        margin: 0;
    }
    .guide-way a {
        text-decoration: none;
        color: #002f33;
        font-size: 12px;
    }
    .en-guide-way {
        &:first-of-type{
            img{
                margin: 10px 0 0 11px !important;
            }
        }
        margin: 0 10px 0 0;
        span{
            font-size: 10px !important;
            
            font-weight: normal !important;
            color: #000000 !important;
            line-height: 12px !important;
        }
    }
    .guide-way img {
        width: 36px;
        height: 36px;
        margin: 10px 0 0;
    }
    .snd-guidance p {
        font-size: 14px;
        line-height: 18px;
        text-align: left;
        margin: 0;
        color: #002f33;
    }
    .home-active {
        width: 100%;
        height: 220px;
        text-align: center;
        margin-top: 120px;
        background-color: rgba(1, 0, 87, .85);
        background-repeat: repeat-x;
        background-size:contain;
    }
    .home-active a {
        display: block;
        width: 100%;
        height: 220px;
        text-decoration: none;
        color: #fff;
    }
    .en-h3-home .en-h3-home{
        
        font-weight: 400 !important;
        color: #FFFFFF !important;
        line-height: 34px !important;
    }
    .home-active h3 {
        font-size: 30px;
        color: #fff;
        padding: 70px 0 20px;
        margin: 0;
    }
    .home-active p {
        font-size: 14px;
        margin: 0 35px;
        text-align: center;
        color: rgba(255, 255, 255, .8);
    }
    .home-calendar {
        width: 1080px;
        margin: 90px auto 0;
        @media screen and (max-width: 1000px) {
            margin-top: 30px;
        }
    }
    .time-tab {
        margin-top: 40px;
    }
    .time-active {
        display: flex;
    }
    .calendar-active {
        display: flex;
        justify-content: space-between;
        background: #fff;
    }
    .topBtn,
    .bottomBtn,
    .leftBtn,
    .rightBtn {
        margin-left: -10px;
        width: 0;
        height: 0;
        border-width: 15px;
        border-style: solid;
        border-color: transparent #002fa7 transparent transparent;
    }
    .rightBtn {
        margin-top: 6px;
    }
    .leftBtn {
        margin-top: 6px;
        left: 8px;
        z-index: 1;
        border-color: transparent transparent transparent #002fa7;
    }
    .bottomBtn {
        margin: 0 auto;
        border-color: #002fa7 transparent transparent transparent;
    }
    .topBtn {
        margin: 0 auto;
        border-color: transparent transparent #002fa7 transparent;
    }
    .date-box {
        width: 240px;
        position: relative;
    }
    .calendar-time {
        width: 130px;
    }
    .calendar-time p {
        font-size: 14px;
        height: 56px;
        line-height: 56px;
        margin-bottom: 20px;
    }
    .date-item {
        flex-shrink: 0;
        width: 240px;
        height: 40px;
        margin-left: 20px;
        text-align: center;
        line-height: 40px;
        border: 1px solid black;
    }
    .active-box {
        display: inline-block;
        box-shadow: 0px 6px 20px 0px rgba(0,0,0,0.1);
        border-radius: 4px;
        margin: 12px 20px;
        padding: 6px 20px;
        overflow: hidden;
        position: absolute;
        top: 60px;
    }
    .active-box p {
        font-size: 16px;
    }
    .active-info {
        display: none;
    }
    .active-info span {
        font-size: 14px;
    }
    .home-newsroom {
        width: 1080px;
        margin: 123px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .room-left {
        overflow: hidden;
        width: 622px;
        position: relative;
    }
    .room-contain {
        display: none;
    }
    .flex-room {
        width: 555px;
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 40px;
    }
    .room-contain span {
        font-size: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, .5);
    }
    .room-contain p {
        font-size: 16px;
        line-height: 22px;
        margin: 20px 0 25px;
        text-align: left;
        color: rgba(0, 0, 0, .85);
        overflow: hidden;
        display: -webkit-box;
        word-wrap: break-word;
        word-break: normal;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .room-contain a {
        font-size: 16px;
        line-height: 16px;
        color: #002fa7;
        text-decoration: none;
        
        cursor: pointer;
    }
    .room-title {
        margin-bottom: 35px;
    }
    .room-title a {
        display: inline-block;
        height: 54px;
        font-size: 20px;
        line-height: 54px;
        margin-right: 50px;
        color: rgba(0, 0, 0, .25);
        text-decoration: none;
        cursor: pointer;
    }
    .room-title .active {
        color: #333;
        border-bottom: 2px solid #002fa7;
        border-radius: 2px;
    }
    .room-img {
        width: 420px;
        left: 52px;
        top: 75px;
        box-shadow: 0 6px 30px 0px rgba(0, 0, 0, .1);
        position: absolute;
        z-index: -1;
        cursor: pointer;
    }
    .room-img img {
        width: 420px;
        height: 260px;
    }
    .room-box a {
        color: #000;
    }
    .room-box img {
        vertical-align: middle;
        width: 18px;
        margin-right: 10px;
    }
    .active{
        display: block;
    }
    .home-developer {
        width: 1080px;
        margin: 60px auto 0;
    }
    .home-developer .en-developer-p{ 
        
        font-weight: 400 !important;
        line-height: 20px !important;
    }
    .home-developer .dev-leader {
        width: 1033px;
        margin: 50px auto 0;
    }
    .home-developer .show-all {
        display: none;
    }
    .dev-leader {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .dev-dever:nth-child(-n+4) {
        margin-top: 0;
    }
    .dev-dever {
        display: inline-block;
        text-align: center;
        width: 25%;
        min-width: 25%;
        max-width: 25%;
        margin-top: 30px;
    }
    .dev-dever .dev-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .dev-dever .dever-name {
        color: #005CC7;
        font-size: 16px;
        margin: 20px 0 10px;
        text-transform: uppercase;
        
    }
    .dev-dever .dever-rank {
        font-size: 16px;
        color: #000;
        line-height: 22px;
    }
    .dev-dever .en-rank {
        font-size: 14px !important;
        
        line-height: 20px !important;
    }
    .dev-link {
        margin-top: 20px;
        height: 28px;
        line-height: 28px;
    }
    .dev-link a {
        vertical-align: middle;
    }
    .dev-link img {
        width: 24px;
        height: 24px;
    }
    .dev-link .email-link {
        width: 24px;
        height: 20px;
        margin-right: 16px;
    }
    .medal-logo {
        position: relative;
        top: -5px;
    }
    .home-source {
        width: 1080px;
        margin: 60px auto 200px;
    }
    .source-contain {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }
    .source-contain .en-source-title{
        
        font-weight: 400;
        color: #000000;
        line-height: 32px;
    }
    .home-source .source-title {
        font-size: 24px;
        line-height: 30px;
        color: #000;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .home-source h3 {
        margin-bottom: 50px;
    }
    .home-source a {
        font-size: 18px;
        color: #0041bd;
        text-decoration: none;
    }
    .home-source .source-sponsor {
        font-size: 18px;
        color: #0041BD;
    }
    .source-apply,
    .source-mail {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .apply-img,
    .mail-img {
        width: 120px;
        height: 120px;
        margin-right: 40px;
    }
    .apply-img img,
    .mail-img img{
        width: 120px;
        height: 120px;
    }
    .apply-des p,
    .mail-des p {
        text-align: left;
        font-size: 18px;
        margin-top: 20px;
    }
    .apply-des p{
        &:last-of-type{
            cursor: pointer;
        }
    }
    .mail-des a ,
    .apply-des a {
        cursor: pointer;
    }
    .apply-des .click-here {
        margin-top: 10px;
    }
    .source-publish-link {
        margin-top: 100px;
        font-size: 30px;
    }
    .source-publish-link.publish {
        margin-top: 100px;
    }
    .diff-pc-mobile{
        .mobile-img{
            display: none;
        }
    }
    .source-publish-link h5 {
        text-align: center;
        line-height: 30px;
        margin-bottom: 50px;
        color: rgba(0, 0, 0, .87);
    }
    .publish-edition {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }
    .publish .publish-edition img {
        width: 280px;
        height: 80px;
        margin-right: 70px;
    }
    .publish .publish-edition .empty-a{
        img{
            opacity:0;
            @media screen and (max-width: 1000px){
                display: none;
            }
        }
    }
    .publish-edition img {
        width: 280px;
        height: 80px;
        margin-right: 180px;
    }
    .publish-edition a:last-child img {
        margin-right: 0;
    }
    @media screen and (max-width: 1000px){
        .is-pc {
            display: none;
        }
        .is-h5 {
            display: block;
            .carousel-video{
                .mobile-btn{
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    border-radius: 50px;
                    bottom: 50%;
                    left: 50%;
                    margin: 0 0 -50px -50px;
                    background-image: url('/img/home/play-btn.gif');
                    background-size: contain;
                    opacity: 0.6;
                }
            }
            .carousel-item .HC-mobile-box{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            .carousel-item .train-img{
                width: 100%;
                height: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
        }
        .is-pc.mapArea {
            display: none;
        }
        .home-introduce .is-pc {
            display: none;
        }
        .home {
            margin: 0 15px;
        }
        .home-introduce .is-h5.mapArea {
            display: block;
            margin-top: 25px;
            height: 100%;
            position: relative;
            .location{
                position: absolute;
                top: 31%;
                left: 4%;
            }
        }
        .home h3 {
            margin-top: 35px;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .home p {
            font-size: 16px;
            margin: 0 30px;
        }
        .carousel-item .card-summer {
            width: 100%;
            height: 300px;
            line-height: 300px;
            text-align: center;
            margin-top: 0;
        }
        .carousel-img {
            width: 100%;
        }
        .card-summer img {
            vertical-align: middle;
        }
        .home-carousel {
            margin: 0 -15px;
        }
        .home-carousel .el-carousel__item h3 {
            font-size: 18px;
            
            text-align: center;
            margin-top: 35px;
            margin-bottom: 0;
        }
        .carousel-item-index img {
            width: 260px;
            height: 200px;
            margin: 0;
            display: block;
            margin: 0 auto;
        }
        .carousel-item-index .mobile-version{
            width: 100%;
            height: 300px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .home-carousel .el-carousel__item span {
            display: inline-block;
            width: 65%;
            font-size: 1.5vw;
            line-height: 24px;
            margin-top: 0;
        }
        .el-carousel__container {
            width: 100%;
            height: 380px;
            font-size: 1vw;
        }
        .home-introduce {
            padding-top: 40px;
            width: 100%;
        }
        .home-introduce h1 {
            width: 306px;
            height: 65px;
            background-image: url('/img/home/mobile-h1.png');
        }
        .area-box .box-icon {
            display: inline-block;
            width: 50px;
            height: 50px;
            color: #fff;
            font-size: 18px;
            line-height: 50px;
            background-color: #002fa7;
            border-radius: 50%;
        }
        .area-box p {
            display: inline-block;
            font-size: 16px;
            color: #002fa7;
            margin-left: 16px;
        }
        .area-box .lang-en {
           display: block;
           margin: 4px 0 0 25px;
           font-weight: bold;
        }
        .area-box img {
            display: block;
            margin: 10px auto 26px;
        }
        .home-calendar {
            width: 100%;
        }
        .home-active {
            margin-top: 40px;
            background-size: cover;
        }
        .home-active h3 {
            margin-bottom:  20px;
            padding: 40px 0 20px;
        }
        html[lang="ru"] .home-active {
            height: 250px;
        }
        html[lang="ru"] .home-active p {
            margin-top: -10px;
        }
        .home-active p {
            margin-bottom:  45px;
        }
        .area-box {
            display: block;
            margin: 0 auto;
            width: 67%;
        }
        .calendar-time p {
            font-size: 14px;
            height: 56px;
            line-height: 56px;
            margin: 0 0 10px;
        }
        .active-box {
            margin: 0;
        }
        .calendar-time {
            width: 110px;
        }
        .home-newsroom {
            width: 100%;
            margin-top: 80px;
        }
        .blog-room {
            margin-top: 40px;
        }
        .newsroom h5 {
            font-size: 18px;
            line-height: 18px;
            color: #333;
            font-weight: 600;
            margin-bottom: 30px;
        }
        .rooms span {
            font-size: 14px;
            line-height: 14px;
            color: rgba(0, 0, 0, .5);
        }
        .rooms p {
            font-size: 16px;
            line-height: 24px;
            text-align: left;
            margin: 10px 0 20px;
            color: rgba(0, 0, 0, .85);
            overflow: hidden;
            display: -webkit-box;
            word-wrap: break-word;
            word-break: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
        }
        .newsroom a {
            font-size: 14px;
            display: inline-block;
            text-decoration: none;
            color: #002fa7;
        }
        .newsroom .room-more {
            margin-bottom: 40px;
        }
        .home-developer {
            width: 100%;
            margin-top: 20px;
        }
        .home-developer .dev-leader {
            width: 100%;
            margin: 0;
        }
        .home-developer .show-all {
            display: block;
            text-align: center;
            margin-top: 40px;
        }
        .show-all p {
            color: #002fa7;
        }
        .dev-dever {
            width: 50%;
            min-width: 50%;
            max-width: 50%;
            margin-top: 35px;
        }
        .dev-dever.hidden {
            display: none;
        }
        .dev-dever .dever-name {
            font-size: 18px;
            
            margin: 0;
        }
        .dev-dever .dever-rank {
            margin: 0;
            font-size: 14px;
            
        }
        .dev-dever:nth-child(-n+4) {
            display: inline-block;
            margin-top: 35px;
        }
        .medal-logo {
            position: relative;
            top: 0px;
        }
        .publish-edition {
            display: block;
        }
        .publish .publish-edition img {
            width: 280px;
            height: 60px;
            margin: 5px auto;
        }
        .publish-edition img {
            width: 280px;
            height: 60px;
            margin: 0 auto;
            display: block;
        }
        .publish-edition a:last-child img {
            margin: 0 auto;
        }
        .home-source {
            width: 100%;
            margin-top: 60px;
            margin-bottom: 90px;
        }
        .home-source .source-title {
            font-size: 18px;
            font-weight: 600;
        }
        .home-source a {
            font-size: 16px;
        }
        .source-publish-link {
            margin-top: 30px;
        }
        .source-contain {
            width: 100%;
            display: block;
        }
        .source-apply,
        .source-mail {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
        }
        .source-publish-link.publish {
            margin-top: 50px;
        }
        .diff-pc-mobile{
            .mobile-img{
                display: block;
            }
            .pc-img{
                display: none;
            }
        }
        .source-publish-link h5 {
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            margin-bottom: 0;
        }
        html[lang="ru"] .source-publish-link h5 {
          line-height: 34px;
        }
        .apply-img,
        .mail-img {
            display: none;
        }
        .apply-des p,
        .mail-des p {
            text-align: center;
        }
    }
</style>