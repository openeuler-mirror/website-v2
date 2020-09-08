<template>
    <div class="home">
        <div class="is-pc home-carousel">
            <el-carousel class="home-banner" trigger="click" :autoplay="autoPlay" interval="5000" @change="eventChange()">
                <el-carousel-item>
                    <div class="carousel-video">
                        <video poster="/img/home/BannerVideo.png" loop width="100%" height="500px" id="home-video">
                            <source src="/img/home-video/home-video.mp4"  type="video/mp4">
                        </video>
                        <div class="playControll">
                            <div :class="['play-pause', isPlay?'pause-icon':'play-icon']" @click="isPlay=!isPlay"></div>
                            <el-progress :percentage="barPercentage" id="timebar" :show-text="false" :color="'#ffffff'" @click="clickBar()"></el-progress>
                            <div :class="['voice-mute', isMuted?'mute-icon':'voice-icon']" @click="isMuted=!isMuted"></div>
	                    </div>
                        <div class="play-btn"v-if="!isPlay" @click="isPlay=!isPlay">
                        </div>
                    </div>
                </el-carousel-item>
                <el-carousel-item class="carousel-item">
                    <a class="banner-link"  @click="go('/news/20200607.html')">
                        <div class="banner-item">
                            <div class="card-summer">
                                    <img src="/img/home/BannerSummer.png" alt="">
                                    <span>{{ i18n.home.HOME_CAROUSEL_DATA[0].DES }}</span>
                            </div>
                            <img class="banner-gif" src="/img/home/BannerS.gif">
                        </div>
                    </a>
                </el-carousel-item>
                <el-carousel-item
                        class="carousel-item"
                        v-for="(item, index) in i18n.home.HOME_CAROUSEL_DATA"
                        :key="index">
                    <a class="banner-link" v-if="index === 0" @click="go(item.LINK)">
                        <div class="banner-item">
                            <div class="item-info">
                                <h3>{{ item.TITLE }}</h3>
                                <span>{{ item.DES }}</span>
                            </div>
                            <img class="banner-gif" :src="'/img/home/Banner' + index + '.gif'">
                        </div>
                    </a>
                    <a class="banner-link" v-if="index !== 0" :href="item.LINK" target="_blank">
                        <div class="banner-item">
                            <div class="item-info">
                                <h3>{{ item.TITLE }}</h3>
                                <span>{{ item.DES }}</span>
                            </div>
                            <img class="banner-gif" :src="'/img/home/Banner' + index + '.gif'">
                        </div>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="is-h5 home-carousel">
            <el-carousel class="home-banner" trigger="click" :interval="5000">
                <el-carousel-item>
                    <div class="carousel-video">
                        <video poster="/img/home/BannerVideo.png"
                               loop
                               muted
                               width="100%"
                               height="300px"
                               ref="video"
                               @click="playVideo">
                            <source src="https://openeuler-website.obs.ap-southeast-1.myhuaweicloud.com/%E6%AC%A7%E6%8B%89MG%E5%8A%A8%E7%94%BB_0903_1920x500.mp4"  type="video/mp4">
                        </video>
                    </div>
                </el-carousel-item>
                <el-carousel-item class="carousel-item">
                    <a @click="go('/news/20200607.html')">
                        <div class="card-summer">
                            <img src="/img/home/webBannerSummer.png" alt="">
                        </div>
                    </a>
                </el-carousel-item>
                <el-carousel-item
                        class="carousel-item-index"
                        v-for="(item, index) in i18n.home.HOME_CAROUSEL_DATA"
                        :key="index">
                    <a v-if="index !== 0" :href="item.LINK" target="_blank">
                        <h3>{{ item.TITLE }}</h3>
                        <img :src="'/img/home/webBanner' + index + '.png'">
                    </a>
                    <a v-if="index === 0" @click="go(item.LINK)">
                        <h3>{{ item.TITLE }}</h3>
                        <img :src="'/img/home/webBanner' + index + '.png'">
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="home-introduce">
            <h1>{{ i18n.home.HOME_INTRODUCE.INTRO_TITLE }}</h1>
            <h3>{{ i18n.home.HOME_INTRODUCE.INTRO_HEAD }}</h3>
            <p>{{ i18n.home.HOME_INTRODUCE.INTRO_DESCRIPTION }}</p>
            <div class="is-pc mapArea">
                <div class="area-box in-pc" v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_MAP" :key="index">
                    <a v-if="(index !== 3)" @click="go(item.LINK)" target="_blank">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p>{{ item.TITLE }}</p>
                        <img :src="item.IMG" alt="">
                        <img :src="item.GIF" alt="" class="is-hidden">
                    </a>
                    <a class="down" v-if="(index === 3)" @click="go(item.LINK)" target="_blank">
                        <img :src="item.IMG" alt="">
                        <img :src="item.GIF" alt="" class="is-hidden">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p>{{ item.TITLE }}</p>
                    </a>
                </div>
                <div class="area-box bottom in-pc" @click="clickDownload">
                    <a class="down">
                        <img src="/img/home/step2.png" alt="">
                        <img src="/img/home/step-move-2.gif" alt="" class="is-hidden">
                        <div class="box-icon">{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.NAME }}</div>
                        <p>{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.TITLE }}</p>
                    </a>
                    <div class="snd-guidance">
                        <div class="d3"></div>
                        <p>{{ i18n.home.HOME_INTRODUCE.INTRO_GUIDE.INFO }}</p>
                        <div class="d3-guide">
                            <div
                                    class="guide-way"
                                    v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_GUIDE.GUIDE_WAY"
                                    :key="index">
                                <a :href="item.LINK">
                                    <img :src="item.IMG" alt="">
                                    <span>{{ item.TITLE }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="map-rode">
                <img class="is-pc rode-left" src="/img/home/rodeLeft.svg" alt="">
                <img class="is-pc plane-left" src="/img/home/planeLeft.svg" alt="">
                <img class="is-pc rode-middle" src="/img/home/rodeMiddle.svg" alt="">
                <img class="is-pc plane-middle" src="/img/home/planeMiddle.svg" alt="">
                <img class="is-pc rode-right" src="/img/home/rodeRight.svg" alt="">
                <img class="is-pc plane-right" src="/img/home/planeRight.svg" alt="">
            </div>
            <div class="is-h5 mapArea">
                <div
                    class="area-box"
                    v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_MAP"
                    :key="index">
                    <a :href="item.LINK">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p>{{ item.TITLE }}</p>
                        <img :src="item.IMG" alt="">
                    </a>
                </div>
            </div>
        </div>

        <div class="home-active" :style="{ backgroundImage:'url('+activeImg+')' }">
            <a href="#">
                <h3>{{ i18n.home.HOME_ACTIVE.ACTIVE_TITLE }}</h3>
                <p>{{ i18n.home.HOME_ACTIVE.ACTIVE_DESCRIPTION }}</p>
            </a>
        </div>

        <div class="home-calendar">
            <calender :table-data="calenderData" />
        </div>

        <div class="home-newsroom">
            <div class="is-pc room-right">
                <div class="room-title">
                    <a v-for="(item, index) in roomName" :key="index" :class="{'active': currentRoom === index}" @click="vueToggle(index)">{{ item }} </a>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 0}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in newsList"
                             :key="index">
                            <span><img src="/img/home/eventDate.svg" alt=""></span> <span>{{ item.frontmatter.date }}</span>
                            <p><a :href="item.path">{{ item.frontmatter.title }}</a></p>
                        </div>
                        <span></span>
                    </div>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 1}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in blogList"
                             :key="index">
                            <span>{{ item.frontmatter.date }}</span>
                            <span>|</span>
                            <span>{{ item.frontmatter.author }}</span>
                            <p><a :href="item.path">{{ item.frontmatter.summary }}</a></p>
                        </div>
                        <span><a @click="go('/interaction/blog-list/')">{{ i18n.home.MORE }}</a></span>
                    </div>
                </div>
                <div class="room-contain" :class="{'active':currentRoom === 2}">
                    <div class="flex-room">
                        <div class="room-box"
                             v-for="(item, index) in newsList"
                             :key="index">
                            <span>{{ item.frontmatter.date }}</span>
                            <span>|</span>
                            <span>{{ item.frontmatter.author }}</span>
                            <p><a :href="item.path">{{ item.frontmatter.title }}</a></p>
                        </div>
                        <span><a @click="go('/interaction/news-list/')">{{ i18n.home.MORE }}</a></span>
                    </div>
                </div>
            </div>
            <div class="is-pc room-left">
                <template>
                    <el-carousel indicator-position="none" :autoplay="false" arrow="never" ref="newsroomCard" class="room-card">
                        <el-carousel-item>
                            <a class="room-img active">
                                <img src="/img/home/eventImg.png" @click="go('/news/20200607.html')" alt="">
                            </a>
                        </el-carousel-item>
                        <el-carousel-item>
                            <a class="room-img active"  @click="go('/interaction/blog-list/')" target="_blank">
                                <img src="/img/home/blogImg.png" alt="" >
                            </a>
                        </el-carousel-item>
                        <el-carousel-item>
                            <a class="room-img active" @click="go('/interaction/news-list/')" target="_blank">
                                <img src="/img/home/newsImg.png" alt="">
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </template>

            </div>
            <div class="is-h5 newsroom">
                <div class="event-room">
                    <h5>{{ i18n.home.HOME_ROOMS.EVENT_NAME }}</h5>
                    <div class="rooms"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.EVENT_LIST"
                         :key="index">
                        <span>{{ item.TAG }}  <span>|</span> </span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                </div>
                <div class="blog-room">
                    <h5>{{ i18n.home.HOME_ROOMS.BLOG_NAME }}</h5>
                    <div class="rooms"
                         v-for="(item, index) in blogList"
                         :key="index">
                        <span v-for="tag in item.frontmatter.tags">{{ tag }} <span>|</span> </span>
                        <span>{{ item.frontmatter.date }}</span>
                        <span>|</span>
                        <span>{{ item.frontmatter.author }}</span>
                        <p><a :href="item.path"></a>{{ item.frontmatter.summary }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
                <div class="news-room">
                    <h5>{{ i18n.home.HOME_ROOMS.NEWS_NAME }}</h5>
                    <div class="rooms" v-for="(item, index) in i18n.home.HOME_ROOMS.NEWS_LIST" :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
            </div>
        </div>

        <div class="home-developer">
            <h3>{{ i18n.home.HOME_DEV.DEV_TITLE }}</h3>
            <p>{{ i18n.home.HOME_DEV.DEV_DESCRIPTION }}</p>
            <div class="dev-leader" v-fade>
                <div class="dev-dever hidden fade-in" v-for="(value, index) in i18n.home.HOME_DEV.DEV_INFO" :key="index">
                    <img class="dev-img" :src="value.IMG">
                    <p class="dever-name">{{ value.NAME }}</p>
                    <p class="dever-rank">{{ value.TITLE }}</p>
                    <p class="dever-rank">{{ value.RANK }}</p>
                    <div class="dev-link">
                        <a :href="'mailto:' + value.MAIL_LINK" target="_blank">
                            <img class="email-link" src="/img/home/email.png" alt="">
                        </a>
                        <a :href="value.GITEE_LINK" target="_blank">
                            <img src="/img/home/Gitee.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
            <div class="show-all" @click="showAll">
                <p>{{ i18n.home.EXPAND }}</p>
                <img v-if="flag" src="/img/home/arrow.svg" alt="">
                <img v-if="!flag" src="/img/home/arrowUp.svg" alt="">
            </div>
        </div>

        <div class="home-auth">
            <h3>{{ i18n.home.HOME_AUTH.AUTH_TITLE }}
                <img class="medal-logo" src="/img/home/medal.svg" alt="">
            </h3>

            <p>{{ i18n.home.HOME_AUTH.AUTH_DESCRIPTION }}</p>
            <div class="auth-product">
                <div class="product-box">
                    <img src="/img/home/Card1.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_HARDWARE }}</p>
                </div>
                <div class="product-box">
                    <img src="/img/home/Card2.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_OPEN_SOURCE }}</p>
                </div>
                <div class="product-box">
                    <img src="/img/home/Card3.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_FREE }}</p>
                </div>
                <div class="product-box">
                    <img src="/img/home/Card4.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_BUSINESS }}</p>
                </div>
            </div>
        </div>

        <div class="home-source">
            <h3>{{ i18n.home.HOME_SOURCE.SOURCE_TITLE }}</h3>
            <div class="source-contain">
                <div class="source-apply">
                    <div class="apply-img">
                        <img src="/img/home/sourceApply.gif" alt="">
                    </div>
                    <div class="apply-des">
                        <p class="source-title">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.TITLE }}</p>
                        <p>
                            {{ i18n.home.HOME_SOURCE.SOURCE_APPLY.DES }}
                        </p>
                        <p class="click-here"><a @click="go('/blog/fred_li/2020-03-25-apply-for-vm-from-pcl.html')">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.APPLY }}</a></p>
                        <p><span class="source-sponsor">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.SPONSOR }}</span></p>
                    </div>
                </div>
                <div class="source-mail">
                    <div class="mail-img">
                        <img src="/img/home/sourceMail.gif" alt="">
                    </div>
                    <div class="mail-des">
                        <p class="source-title">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.TITLE }}</p>
                        <p><a href="mailto:community@openeuler.org">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.MAIL }}</a></p>
                        <p>{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.DES }}</p>
                        <p>{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.SUBSCRIBE }}<a @click="go('/community/mailing-list/')">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.LINK }}</a></p>
                    </div>
                </div>
            </div>
            <div class="source-publish-link publish">
                <h5>{{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}</h5>
                <div class="publish-edition">
                    <a href="https://eulixos.com/#/download" target="_blank"><img src="/img/home/iscas.png" alt=""></a>
                    <a href="http://download.turbolinux.com.cn:8011/" target="_blank"><img src="/img/home/turbo.png" alt=""></a>
                </div>
                <div class="publish-edition">
                    <a href="http://download.isoft-linux.com.cn/iso/server/5.x/Kunpeng/iSoftServerOS-Kunpeng-5.1-aarch64-RC-Community.iso" target="_blank"><img src="/img/home/cetc.png" alt=""></a>
                    <a href="http://download.hopeedge.com/ISO/HopeEdge-1.0-aarch64-dvd.iso" target="_blank"><img src="/img/home/hopeEdge.png" alt=""></a>
                </div>
                <div class="publish-edition">
                    <a href="http://www.kylinos.cn/" target="_blank"><img src="/img/home/qiling.png" alt=""></a>
                    <a href="https://www.uniontech.com" target="_blank"><img src="/img/home/tongxin.png" alt=""></a>
                </div>
            </div>
            <div class="source-publish-link">
                <h5>{{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}</h5>
                <div class="publish-edition link">
                    <a href="http://www.mulanos.cn/" target="_blank"><img src="/img/home/mulan.png" alt=""></a>
                    <a href="https://www.huaweicloud.com/kunpeng/" target="_blank"><img src="/img/home/kunpeng.png" alt=""></a>
                    <a href="https://dw.pcl.ac.cn/dwmain/main/" target="_blank"><img src="/img/home/pengcheng.png" alt=""></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { meetingList } from "../../api/home";
    import calender from "./calender";
    let that = null;
    let remoteMethods = {
        meetingList () {
            meetingList()
            .then(data => {
                console.log(data.tableData);
                console.log(localMethods.sortData(data.tableData));
                that.calenderData = localMethods.sortData(data.tableData);
            })
            .catch(data => {
                that.$message.error(data);
            });
        }
    }
    let localMethods = {
        sortData (data) {
            data.forEach(dateItem => {
                let arr = [];
                dateItem.timeData.forEach(timeItem => {
                    let timeStart = this.formatTime(timeItem.duration_time)[0];
                    let timeEnd = this.formatTime(timeItem.duration_time)[1];
                    if(!arr.length) {
                        arr.push({
                            startTime: timeItem.startTime,
                            endTime: timeItem.endTime,
                            duration: timeItem.duration,
                            duration_time: timeItem.duration_time,
                            meetingData: [
                                timeItem
                            ]
                        })
                    } else {
                        let findItem = arr.every(meetingItem => {
                            let meetingStart = this.formatTime(meetingItem.duration_time)[0];
                            let meetingEnd = this.formatTime(meetingItem.duration_time)[1];
                            return (
                                (timeEnd < meetingStart) || 
                                (timeStart > meetingEnd)
                            );
                        })
                        if(findItem){
                            arr.push({
                                startTime: timeItem.startTime,
                                endTime: timeItem.endTime,
                                duration: timeItem.duration,
                                duration_time: timeItem.duration_time,
                                meetingData: [
                                    timeItem
                                ]
                            })
                            return;
                        }

                        arr.forEach(meetingItem => {
                            let meetingStart = this.formatTime(meetingItem.duration_time)[0];
                            let meetingEnd = this.formatTime(meetingItem.duration_time)[1];
                            if(
                                (meetingStart
                                <= timeStart) && 
                                (timeStart
                                <= meetingEnd) && 
                                (meetingStart
                                <= timeEnd) && 
                                (timeEnd 
                                <= meetingEnd)
                            ){
                                meetingItem.meetingData.push(timeItem);
                            }

                            
                            if(
                                (timeStart < meetingStart) && 
                                ((meetingStart <= timeEnd) && 
                                (timeEnd <= meetingEnd))
                            ){
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.duration = meetingEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + meetingEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if(
                                (timeEnd > meetingEnd) && 
                                ((meetingStart <= timeStart) && 
                                (timeStart <= meetingEnd))
                            ){
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - meetingStart;
                                meetingItem.duration_time = meetingStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if(
                                (timeStart < meetingStart) && 
                                (timeEnd > meetingEnd)
                            ){
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                        })
                    }
                })
                dateItem.timeDate = arr;
            })
            return data;
        },
        formatTime (time) {
            let arr = time.split('-');
            arr[0] = parseInt(arr[0].split(':')[0]);
            arr[1] = parseInt(arr[1].split(':')[0]);
            return arr;
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
                videoElement:'',
                isPlay:false,
                isMuted:false,
                realTimeUpdate:null, //定时器变量
                barPercentage:0,    //进度条进度
            }
        },
        watch: {
            isPlay:function(){
                if(this.isPlay==true){
                    this.videoElement.play();
                    this.realTimeUpdate = setInterval(()=>{
                        this.progressBar();
                    }, 100) ;
                }else{
                    this.videoElement.pause();
                    clearInterval(this.realTimeUpdate);
                }
            },
            isMuted:function(){
                if(this.isMuted==false){
                    this.videoElement.muted=false;
                }else{
                    this.videoElement.muted=true;
                }
            }
        },
        mounted() {
            this.videoElement = document.getElementById('home-video');
            remoteMethods.meetingList();
            this.roomName = this.i18n.home.HOME_ROOMS.ROOM_NAME
            this.toggleHover();
            this.getRoomsData();
        },
        components: {
            calender
        },
        methods: {
            go(path) {
                if (path) {
                    this.$router.push({
                        path: this.resolvePath(path)
                    });
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
            toggleHover() {
                let hovers = this.es('.area-box');
                for (let i = 0; i < hovers.length; i++) {
                    let hover = hovers[i];
                    hover.addEventListener('mouseenter', function () {
                        let img = hover.querySelector('.is-hidden');
                        img.classList.add('is-hovered');
                    })
                    hover.addEventListener('mouseleave', function () {
                        let img = hover.querySelectorAll('img')[1];
                        img.classList.remove('is-hovered');
                    })
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
            filterSiteData(datas, string) {
                let newData = datas.filter(data => data.path.includes(string));
                newData.sort(function (date1, date2) {
                    return(date1.date - date2.date);
                })
                newData = newData.slice(0, 3);
                return newData;
            },
            vueToggle(index) {
                this.currentRoom = index;
                this.$refs.newsroomCard.setActiveItem(index);
            },
            progressBar(){
                let duration = this.videoElement.duration;  //  获取视频总长度
                let currentTime = this.videoElement.currentTime; //  获取当前播放时间
                let ratio = parseFloat(currentTime/duration);
                if(this.videoElement.readyState <= 0) {  //  判断视频是否能够正常读取
                    this.barPercentage = 0;
                    return;
                }
                if(currentTime >= duration){
                    ratio = 1;
                    clearInterval(this.realTimeUpdate);
                    this.isPlay = true;
                }
                this.barPercentage = Math.floor(ratio*100);
            },
            eventChange(){
                this.videoElement.pause();
                this.isPlay = false;
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

    .room-card .el-carousel__container {
        height: 360px;
    }

    @media screen and (max-width: 1000px) {
        .el-carousel__container {
            height: 300px;
        }
        .room-card {
            display: none;
        }
    }
</style>

<style lang="less" scoped>
    [v-cloak] {
        display: none !important;
    }
    .home-calendar {
        // display: none;
    }
    .home-auth {
        display: none;
    }
    .is-pc {
        display: block;
    }
    .is-h5 {
        display: none;
    }
    .home h1,
    .home h3,
    .home h5,
    .home p,
    .home span,
    .home a {
        font-family: FZLTHJW;
    }
    .home h3 {
        font-size: 30px;
        color: #0b162b;
        text-align: center;
        margin-bottom: 20px;
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
        font-family: FZLTCHJW;
        margin-top: 100px;
    }
    .home-carousel .el-carousel__item span {
        display: inline-block;
        width: 620px;
        font-size: 18px;
        line-height: 40px;
        margin-top: 30px;
    }
    .carousel-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
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
    }
    .banner-item {
        width: 1080px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
    }
    .carousel-item .card-summer span {
        margin-left: 0;
        text-align: left;
        width: 100%;
    }
    .carousel-item img {
        z-index: -1;
    }
    .carousel-item video {
        position: absolute;
        top: 0;
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
        .playControll{
            display: none;
            width: 390px;
            height: 40px;
            background: #AAAAAA;
            position: absolute;
            bottom: 35px;
            left: 50%;
            margin-left: -195px;
            z-index: 999999999;
            border-radius: 25px;
            opacity: 0.5;
            .play-pause{
                 width: 30px;
                height: 30px;
                position: absolute;
                top: 5px;
                left: 10px;
                cursor: pointer;
                background-size: cover;
            }
            .play-icon{
                background-image: url('/img/home/icon-play.svg');
            }
            .pause-icon{
                background-image: url('/img/home/icon-pause.svg');
            }
            #timebar{
                width: 300px;
                position: absolute;
                top: 16px;
                left: 45px;
                /deep/.el-progress-bar{
                    .el-progress-bar__outer{
                        background-color: #222222 !important;
                    }
                }
            }
            .voice-mute{
                width: 26px;
                height: 25px;
                display: inline-block;
                position: absolute;
                right: 10px;
                top: 5px;
                cursor: pointer;
                background-size: cover;
            }
            .voice-icon{
                background-image: url('/img/home/icon-voice.svg');
            }
            .mute-icon{
                background-image: url('/img/home/icon-mute.svg');
            }
        }
        .play-btn{
            width: 100px;
            height: 100px;
            position: absolute;
            border-radius: 50px;
            bottom: 200px;
            left: 700px;
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
        text-align: center;
        font-size: 40px;
        color: #002fa7;
        margin-bottom: 40px;
        font-family: Roboto-BoldCondensed;
    }
    .home-introduce p {
        max-width: 576px;
        font-family: FZLTXIHJW;
    }
    .home-introduce .mapArea {
        display: inline-block;
        width: 100%;
        height: 280px;
        margin-top: 84px;
        position: relative;
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
    .area-box p {
        display: inline-block;
        font-size: 16px;
        color: #002fa7;
        margin-left: 10px;
    }
    .area-box img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 10px 0 26px 30px;
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
        font-family: FZLTXIHJW;
    }
    .guide-way:last-child {
        margin: 0;
    }
    .guide-way a {
        text-decoration: none;
        color: #002f33;
        font-size: 12px;
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
        font-family: PingFangSC-Regular;
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
        margin: 13px auto 40px;
        box-shadow: 0 6px 30px 0px rgba(0, 0, 0, .1);
        position: relative;
        z-index: -1;
        cursor: pointer;
    }
    .room-img img {
        width: 420px;
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
        font-family: HuaweiSans-Medium;
    }
    .dev-dever .dever-rank {
        font-size: 16px;
        color: #000;
        line-height: 22px;
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
    .home-auth {
        width: 1080px;
        margin: 68px auto 0;
    }
    .medal-logo {
        position: relative;
        top: -5px;
    }
    .auth-product {
        width: 1080px;
        margin: 30px auto 0;
        display: flex;
        justify-content: space-between;
    }
    .product-box {
        display: inline-block;
        width: 240px;
        height: 160px;
        margin-right: 30px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, .1);
    }
    .product-box img {
        width: 80px;
        height: 80px;
        margin: 20px auto 12px;
    }
    .product-box p {
        font-size: 20px;
        line-height: 20px;
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
        width: 100%;
        height: 100%;
    }
    .apply-des p,
    .mail-des p {
        text-align: left;
        font-size: 18px;
        margin-top: 20px;
    }
    .mail-des a ,
    .apply-des a {
        cursor: pointer;
    }
    .apply-des .click-here {
        margin-top: 10px;
    }
    .source-publish-link {
        margin-top: 50px;
    }
    .source-publish-link.publish {
        margin-top: 50px;
    }
    .source-publish-link h5 {
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        margin-bottom: 30px;
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
        }
        .home h3 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .home p {
            font-size: 16px;
            margin: 0 30px;
        }
        .carousel-item {
            padding-left: 20px;
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
            font-family: FZLTCHJW;
            text-align: center;
            margin-top: 35px;
            margin-bottom: 0;
        }
        .carousel-item-index a {
            text-decoration: none;
        }
        .carousel-item-index img {
            width: 200px;
            height: 200px;
            margin: 0;
            display: block;
            margin: 0 auto;
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
            font-size: 30px;
            margin-bottom: 40px;
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
            font-size: 18px;
            color: #002fa7;
            margin-left: 16px;
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
        .home-active p {
            margin-bottom:  45px;
        }
        .area-box {
            display: block;
            margin: 0 auto;
            width: 100%;
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
            font-family: Huawei Sans Medium;
            margin: 0;
        }
        .dev-dever .dever-rank {
            margin: 0;
            font-size: 14px;
            font-family: Huawei Sans;
        }
        .dev-dever:nth-child(-n+4) {
            display: inline-block;
            margin-top: 35px;
        }
        .home-auth {
            width: 100%;
            margin-top: 70px;
        }
        .medal-logo {
            position: relative;
            top: 0px;
        }
        .auth-product {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 0;
        }
        .product-box {
            width: 50%;
            min-width: 47%;
            max-width: 47%;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .2);
            margin: 20px 10px 0 0;
        }
        .product-box:nth-child(even) {
            margin-right: 0;
        }
        .publish-edition {
            display: block;
        }
        .publish-edition.link {
            display: block;
            margin: 30px 20px 0 20px;
        }
        .publish .publish-edition img {
            width: 280px;
            height: 80px;
            margin: 20px auto;
        }
        .publish-edition img {
            width: 280px;
            height: 80px;
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
            margin-top: 50px;
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
        .source-publish-link h5 {
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
            margin-bottom: 0;
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