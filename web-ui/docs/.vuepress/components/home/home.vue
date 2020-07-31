<template>
    <div class="home">
        <div class="home-carousel">
            <el-carousel class="home-banner" trigger="click">
                <el-carousel-item>
                    <div class="carousel-video">
                        <img src="/home/BannerVideo.png" alt="">
                    </div>
                </el-carousel-item>
                <el-carousel-item class="carousel-item" :style="{ backgroundImage:'url(' + banner1 + ')' }">
                    <div class="card-summer">
                        <img src="/home/BannerSummer.png" alt="">
                        <span>{{ i18n.home.HOME_CAROUSEL_DATA[0].DES }}</span>
                    </div>
                </el-carousel-item>
                <el-carousel-item
                        class="carousel-item"
                        v-for="(item, index) in i18n.home.HOME_CAROUSEL_DATA"
                        :key="index"
                        :style="{ backgroundImage:'url(' + item.IMG + ')' }">
                    <h3>{{ item.TITLE }}</h3>
                    <span>{{ item.DES }}</span>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="home-introduce">
            <h1>{{ i18n.home.HOME_INTRODUCE.INTRO_TITLE }}</h1>
            <h3>{{ i18n.home.HOME_INTRODUCE.INTRO_HEAD }}</h3>
            <p>{{ i18n.home.HOME_INTRODUCE.INTRO_DESCRIPTION }}</p>
            <div class="isPC mapArea">
                <img src="/home/step.png"
                     alt=""
                     usemap="#maphover"
                     ref="img-display-1"
                     id="img-display-1"
                     class="active"
                     style="width: 100%">
                <div class="area-box inPC" v-for="(item, index) in i18n.home.HOME_INTRODUCE.INTRO_MAP" :key="index">
                    <a @click="go(item.LINK)">
                        <div class="box-icon">{{ item.NAME }}</div>
                        <p>{{ item.TITLE }}</p>
                        <img src="item.IMG" alt="">
                        <img :src="item.IMG" alt="" class="is-hidden">
                    </a>
                </div>
                <div class="area-box inPC" @click="clickDownload">
                    <a @click="go(i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.LINK)">
                        <div class="box-icon">{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.NAME }}</div>
                        <p>{{ i18n.home.HOME_INTRODUCE.INTRO_MAP_SND.TITLE }}</p>
                        <img src="/home/step2.png" alt="">
                        <img src="" alt="" class="is-hidden">
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
                                    <img :src="item.IMG" alt="" style="width: 36px; height: 36px">
                                    <span>{{ item.TITLE }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="isH5 mapArea">
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
            <div class="time-active">
                <div class="time-tab">
                    <div class="topBtn"></div>
                    <div class="calendar-time">
                        <p class="time-num">8:00-9:00</p>
                        <p class="time-num">9:00-10:00</p>
                        <p class="time-num">11:00-12:00</p>
                        <p class="time-num">12:00-13:00</p>
                        <p class="time-num">13:00-14:00</p>
                        <p class="time-num">14:00-15:00</p>
                        <p class="time-num">15:00-16:00</p>
                        <p class="time-num">16:00-17:00</p>
                        <p class="time-num">17:00-18:00</p>
                    </div>
                    <div class="bottomBtn"></div>
                </div>
                <div class="calendar-active">
                    <div class="rightBtn" @click="clickLeftBtn"></div>
                    <div
                        class="date-box"
                        v-for="(item, index) in i18n.home.HOME_CALENDAR.DATALIST.slice(startIndex, endIndex)"
                        :key="index"
                        :class="{'active': item.IS_CURRENT}">
                        <p> {{ item.DATE }}</p>
                        <div class="active-box"
                             v-for="(active, index) in item.EVENTS"
                             :key="index"
                             :data-index="active.TIME">
                            <p> {{ active.EVENT_NAME }}</p>
                            <div class="active-info">
                                <img :src="active.IMG" alt="">
                                <span>{{ active.MEMBER }}</span><br>
                                <span>{{ active.INFO }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="leftBtn" @click="clickRightBtn"></div>
                </div>
            </div>
        </div>

        <div class="home-newsroom">
            <div class="isPC room-right">
                <div class="room-title" data-active="1">
                    <a href="javascript:;" data-name="event" data-index="1" @click="toggleRooms">{{ i18n.home.HOME_ROOMS.EVENT_NAME }}</a>
                    <a href="javascript:;" data-name="blog" data-index="2" @click="toggleRooms">{{ i18n.home.HOME_ROOMS.BLOG_NAME }}</a>
                    <a href="javascript:;" data-name="news" data-index="3" @click="toggleRooms">{{ i18n.home.HOME_ROOMS.NEWS_NAME }}</a>
                </div>
                <div id="room-contain-1" class="room-contain active">
                    <div class="room-box"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.EVENT_LIST"
                         :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
                <div id="room-contain-2" class="room-contain">
                    <div class="room-box"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.BLOG_LIST"
                         :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
                <div id="room-contain-3" class="room-contain">
                    <div class="room-box"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.NEWS_LIST"
                         :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
            </div>
            <div class="isPC room-left">
                <div id="room-img-1" class="room-img active">
                    <img src="/home/eventImg.png" alt="">
                </div>
                <div id="room-img-2" class="room-img">
                    <img src="/home/blogImg.png" alt="">
                </div>
                <div id="room-img-3" class="room-img">
                    <img src="/home/newsImg.png" alt="">
                </div>
            </div>
            <div class="isH5 newsroom">
                <div class="event-room">
                    <h5>{{ i18n.home.HOME_ROOMS.EVENT_NAME }}</h5>
                    <div class="rooms"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.EVENT_LIST"
                         :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
                    </div>
                    <span><a href="">{{ i18n.home.MORE }}</a></span>
                </div>
                <div class="blog-room">
                    <h5>{{ i18n.home.HOME_ROOMS.BLOG_NAME }}</h5>
                    <div class="rooms"
                         v-for="(item, index) in i18n.home.HOME_ROOMS.BLOG_LIST"
                         :key="index">
                        <span>{{ item.TAG }}</span> <span>|</span> <span>{{ item.DATE }}</span>
                        <p>{{ item.CONTENT }}</p>
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
            <div class="dev-leader">
                <div class="dev-dever hidden" v-for="(value, index) in i18n.home.HOME_DEV.DEV_INFO" :key="index">
                    <el-image
                            style="width: 100px; height: 100px; border-radius: 50%"
                            src="/home/deverImg.png"></el-image>
                    <p class="dever-name">{{ value.NAME }}</p>
                    <p class="dever-rank">{{ value.TITLE }}</p>
                    <p class="dever-rank">{{ value.RANK }}</p>
                    <div class="dev-link">
                        <a :href="value.MAIL_LINK">
                            <img class="email-link" src="/home/email.png" alt="">
                        </a>
                        <a :href="value.GITEE_LINK">
                            <img src="/home/Gitee.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
            <div class="show-all" @click="showAll">
                <p>{{ i18n.home.EXPAND }}</p>
                <img src="/home/Gitee.png" alt="">
            </div>
        </div>

        <div class="home-auth">
            <h3>{{ i18n.home.HOME_AUTH.AUTH_TITLE }}</h3>
            <p>{{ i18n.home.HOME_AUTH.AUTH_DESCRIPTION }}</p>
            <div class="auth-product">
                <div class="product-box">
                    <img src="/home/Card1.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_HARDWARE }}</p>
                </div>
                <div class="product-box">
                    <img src="/home/Card2.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_OPEN_SOURCE }}</p>
                </div>
                <div class="product-box">
                    <img src="/home/Card3.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_FREE }}</p>
                </div>
                <div class="product-box">
                    <img src="/home/Card4.png" alt="">
                    <p>{{ i18n.home.HOME_AUTH.AUTH_BUSINESS }}</p>
                </div>
            </div>
        </div>

        <div class="home-source">
            <h3>{{ i18n.home.HOME_SOURCE.SOURCE_TITLE }}</h3>
            <div class="source-contain">
                <div class="source-apply">
                    <div class="apply-img">
                        <img src="/home/sourceApply.gif" alt="">
                    </div>
                    <div class="apply-des">
                        <p class="source-title">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.TITLE }}</p>
                        <p>
                            {{ i18n.home.HOME_SOURCE.SOURCE_APPLY.DES }}<a :href="i18n.home.HOME_SOURCE.SOURCE_APPLY.APPLY_LINK">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.APPLY }}</a>
                        </p>
                        <p><a class="source-sponsor" :href="i18n.home.HOME_SOURCE.SOURCE_APPLY.LINK">{{ i18n.home.HOME_SOURCE.SOURCE_APPLY.SPONSOR }}</a></p>
                    </div>
                </div>
                <div class="source-mail">
                    <div class="mail-img">
                        <img src="/home/sourceMail.gif" alt="">
                    </div>
                    <div class="mail-des">
                        <p class="source-title">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.TITLE }}</p>
                        <p><a href="">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.MAIL }}</a></p>
                        <p>{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.DES }}</p>
                        <p>{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.SUBSCRIBE }}<a href="">{{ i18n.home.HOME_SOURCE.SOURCE_MAIL.LINK }}</a></p>
                    </div>
                </div>
            </div>
            <div class="source-publish-link publish">
                <h5>{{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}</h5>
                <div class="publish-edition">
                    <a href=""><img src="/home/iscas.png" alt=""></a>
                    <a href=""><img src="/home/turbo.png" alt=""></a>
                    <a href=""><img src="/home/cetc.png" alt=""></a>
                </div>
            </div>
            <div class="source-publish-link">
                <h5>{{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}</h5>
                <div class="publish-edition link">
                    <a href=""><img src="/home/kunpeng.png" alt=""></a>
                    <a href=""><img src="/home/mulan.png" alt=""></a>
                    <a href=""><img src="/home/pengcheng.png" alt=""></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                info: 'aaa',
                flag: true,
                height: "680px",
                bgbimg: "/home/BannerVideo.png",
                banner1: "/home/Banner1.gif",
                activeImg: "/home/homeActive.gif",
                startIndex: 0,
                endIndex: 4,
            }
        },
        mounted() {
            this.toggleHover();
            this.shrinkCalendar();
            this.marginTop();
            if(window.innerWidth < '1000px') {
                this.height = '300px';
            }
        },
        methods: {
            go(path) {
                if (path) {
                    this.$router.push({
                        path: this.resolvePath(path)
                    });
                    this.menuMobileFlag = false;
                }
            },
            e(selector) {
                let e = document.querySelector(selector)
                if (e === null) {
                    return null
                } else {
                    return e
                }
            },
            es(selector) {
                let es = document.querySelectorAll(selector)
                if (es.length === 0) {
                    return null
                } else {
                    return es
                }
            },
            removeClassAll(className) {
                let selector = '.' + className;
                let elements = this.es(selector);
                for (let i = 0; i < elements.length; i++) {
                    let e = elements[i];
                    e.classList.remove(className);
                }
            },
            addClassAll(className) {
                let selector = '.' + className;
                let elements = document.querySelectorAll(selector);
                for (let i = 0; i < elements.length; i++) {
                    let e = elements[i];
                    e.classList.add('hidden');
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
            showRoom(slide, index) {
                let nextIndex = index;
                slide.dataset.active = String(nextIndex);
                let className = 'active';
                this.removeClassAll(className);
                let nextRoom = '#room-contain-' + String(nextIndex);
                let nextImg = '#room-img-' + String(nextIndex);
                let room = this.e(nextRoom);
                let img = this.e(nextImg);
                room.classList.add(className);
                img.classList.add(className);
            },
            toggleRooms(event) {
                let target = event.target;
                let slide = event.target.closest('.room-title');
                let index = target.dataset.index;
                this.showRoom(slide, index);
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
            shrinkHeight() {
                var height = window.innerWidth * 680 / 1920;
                this.height = height + 'px';
            },
            shrinkCalendar() {
                if (document.body.clientWidth <= 1000) {
                    this.endIndex = 1;
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
            clickLeftBtn() {
                if (this.startIndex <= 0) {
                    this.startIndex = 0;
                } else {
                    this.startIndex --;
                    this.endIndex --;
                }
                this.marginTop();
            },
            clickRightBtn() {
                if (document.body.clientWidth <= 1000) {
                    if (this.endIndex >= this.calendar.length) {
                        this.startIndex = this.calendar.length - 1;
                        this.endIndex = this.calendar.length;
                    } else {
                        this.startIndex ++;
                        this.endIndex ++;
                    }
                } else {
                    if (this.startIndex >= 4) {
                        this.startIndex = 4;
                    } else {
                        this.startIndex ++;
                        this.endIndex ++;
                    }
                }
                this.marginTop();
            },
            judgeTop(originTime, timeElement) {
                let es = this.es(timeElement);
                for (let i = 0; i < es.length; i++) {
                    let e = es[i];
                    let marchTime = e.innerHTML;
                    if (originTime === marchTime) {
                        var top = 76 * i;
                        top += 60;
                    }
                }
                return top
            },
            marginTop() {
                let boxs = this.es('.active-box');
                for (let i = 0; i < boxs.length; i++) {
                    let box = boxs[i];
                    let boxTime = box.dataset.index;
                    let top = this.judgeTop(boxTime, '.time-num');
                    box.setAttribute('style', 'top: '+ top +'px');
                }
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
        height: 680px;
    }

    @media screen and (max-width: 1000px) {
        .el-carousel__container {
            height: 300px;
        }
    }
</style>

<style lang="less" scoped>
    [v-cloak] {
        display: none !important;
    }
    .isPC {
        display: block;
    }
    .isH5 {
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
        font-size: 40px;
        color: #0b162b;
        text-align: center;
        margin-bottom: 30px;
    }
    .home p {
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        margin: 0 auto;
        color: rgba(0, 0, 0, .5);
    }

    .home-carousel .el-carousel__item h3 {
        font-size: 3vw;
        color: #000;
        text-align: left;
        line-height: 48px;
    }
    .home-carousel .el-carousel__item span {
        display: inline-block;
        width: 65%;
        font-size: 1.5vw;
        line-height: 48px;
        margin-top: 60px;
    }
    .carousel-item {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        padding: 10% 10%;
    }
    .carousel-item .card-summer {
        width: 65%;
        text-align: center;
    }
    .carousel-item .card-summer span {
        margin-left: 0;
        text-align: left;
        width: 100%;
    }
    .carousel-item img {
        z-index: -1;
    }
    .carousel-img {
        width: 1200px;
        height: 480px;
        z-index: -1;
    }
    .carousel-video img {
        width: 100%;
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
        max-width: 1200px;
        margin: 0 auto;
    }
    .home-introduce .isH5.mapArea {
        display: none ;
    }
    .home-introduce .isPC {
        display: block;
    }
    .home-introduce h1 {
        text-align: center;
        font-size: 60px;
        color: #002fa7;
        margin-bottom: 80px;
    }
    .home-introduce p {
        max-width: 800px;
    }
    .home-introduce .mapArea {
        display: inline-block;
        width: 100%;
        margin-top: 97px;
        position: relative;
    }
    .area-box.inPC:nth-child(2) {
        position: absolute;
        top: 88px;
        left: 0;
    }
    .area-box.inPC:nth-child(3) {
        display: none;
    }
    .area-box.inPC:nth-child(4) {
        position: absolute;
        top: 132px;
        left: 56%;
    }
    .area-box.inPC:nth-child(5) {
        position: absolute;
        top: -40px;
        left: 80%;
    }
    .area-box.inPC:nth-child(6) {
        position: absolute;
        top: 0;
        left: 25%;
        width: 460px;
    }
    .area-box {
        display: inline-block;
        max-width: 300px;
    }
    .area-box a {
        text-align: center;
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
        margin-top: 10px;
        margin-bottom: 26px;
    }
    .area-box .is-hidden {
        display: none;
    }
    .area-box .is-hovered {
        display: block;
        position: absolute;
        top: 50px;
    }
    .snd-guidance {
        display: none;
        box-sizing: border-box;
        border: 1px solid rgba(0, 47, 167, .5);
        padding: 30px 23px 23px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
    }
    .snd-guidance.is-show {
        display: block;
    }
    .d3-guide {
        display: flex;
        justify-content: space-between;
    }
    .d3{
        margin-left: 10px;
        width: 25px;
        height: 25px;
        transform: rotate(45deg);
        border-left: 1px solid rgba(0, 47, 167, .5);
        border-top: 1px solid rgba(0, 47, 167, .5);
        box-sizing: border-box;
        position: relative;
        top: -43px;
        background: #fff;
    }
    .guide-way {
        margin-right: 20px;
    }
    .guide-way:last-child {
        margin: 0;
    }
    .guide-way a {
        text-decoration: none;
        color: #002f33;
        font-size: 12px;
    }
    .snd-guidance p {
        font-size: 18px;
        line-height: 18px;
        text-align: left;
        margin: 0;
        color: #002f33;
    }
    .home-active {
        width: 100%;
        height: 220px;
        text-align: center;
        margin-top: 130px;
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
        font-size: 40px;
        color: #fff;
        padding: 60px 0 20px;
        margin: 0;
    }
    .home-active p {
        font-size: 20px;
        margin: 0 35px;
        text-align: center;
        color: rgba(255, 255, 255, .8);
    }
    .home-calendar {
        max-width: 1200px;
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
        max-width: 1200px;
        margin: 123px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .room-contain {
        display: none;
    }
    .room-contain span {
        font-size: 16px;
        line-height: 16px;
        color: rgba(0, 0, 0, .5);
    }
    .room-contain p {
        font-size: 20px;
        line-height: 20px;
        margin: 20px 0 30px;
        text-align: left;
        color: rgba(0, 0, 0, .85);
    }
    .room-contain a {
        font-size: 16px;
        line-height: 16px;
        color: #002fa7;
        text-decoration: none;
    }
    .room-title {
        margin-bottom: 40px;
    }
    .room-title a {
        display: inline-block;
        height: 54px;
        font-size: 30px;
        line-height: 54px;
        margin-right: 50px;
        color: rgba(0, 0, 0, .25);
        text-decoration: none;
    }
    .room-title a:focus {
        color: #333;
        border-bottom: 2px solid #002fa7;
        border-radius: 2px;
    }
    .room-img {
        display: none;
        margin-top: 70px;
        box-shadow: 0 6px 30px 0px rgba(0, 0, 0, .1);
    }
    .active {
        display: block;
        transition: 2s;
    }
    .home-developer {
        max-width: 1200px;
        margin: 160px auto 0;
    }
    .home-developer .dev-leader {
        max-width: 1033px;
        margin: 90px auto 0;
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
        margin-top: 115px;
    }
    .dev-dever .dever-name {
        color: #005CC7;
        font-size: 16px;
        margin: 15px 0 10px;
        text-transform: uppercase;
    }
    .dev-dever .dever-rank {
        font-size: 16px;
        color: #000;
        line-height: 22px;
    }
    .dev-link {
        margin-top: 20px;
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
        max-width: 1200px;
        margin: 160px auto 0;
    }
    .auth-product {
        max-width: 1200px;
        margin: 70px auto 0;
        display: flex;
        justify-content: space-between;
    }
    .product-box {
        display: inline-block;
        width: 270px;
        height: 200px;
        margin-right: 30px;
        text-align: center;
        border-radius: 8px;
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, .1);
    }
    .product-box img {
        width: 80px;
        height: 80px;
        margin: 30px auto;
    }
    .product-box p {
        font-size: 24px;
        line-height: 24px;
    }
    .home-source {
        max-width: 1200px;
        margin: 160px auto 200px;
    }
    .source-contain {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .home-source .source-title {
        font-size: 30px;
        line-height: 30px;
        color: #000;
        margin-bottom: 20px;
    }
    .home-source h3 {
        margin-bottom: 90px;
    }
    .home-source a {
        font-size: 20px;
        color: #0041bd;
        text-decoration: none;
    }
    .home-source .source-sponsor {
        font-size: 20px;
        font-weight: 600;
    }
    .source-apply,
    .source-mail {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .apply-img,
    .mail-img {
        width: 160px;
        height: 160px;
        margin-right: 50px;
    }
    .apply-des p,
    .mail-des p {
        text-align: left;
    }
    .source-publish-link {
        margin-top: 100px;
    }
    .source-publish-link.publish {
        margin-top: 120px;
    }
    .source-publish-link h5 {
        font-size: 30px;
        text-align: center;
        line-height: 30px;
        margin-bottom: 60px;
        color: rgba(0, 0, 0, .87);
    }
    .publish-edition {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .publish .publish-edition img {
        width: 280px;
        height: 80px;
        margin-right: 70px;
    }
    .publish-edition img {
        width: 100px;
        height: 100px;
        margin-right: 180px;
    }
    .publish-edition a:last-child img {
        margin-right: 0;
    }
    @media screen and (max-width: 1000px){
        .isPC {
            display: none;
        }
        .isH5 {
            display: block;
        }
        .isPC.mapArea {
            display: none;
        }
        .home-introduce .isH5.mapArea {
            display: block;
            margin-top: 25px;
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
        .carousel-item .card-summer {
            width: 100%;
        }
        .card-summer img {
            width: 50%;
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
            height: 300px;
            font-size: 1vw;
        }
        .home-introduce {
            padding-top: 40px;
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
            display: inline-block;
            margin-top: 10px;
            margin-bottom: 26px;
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
            margin: 40px 15px 0;
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
        }
        .newsroom a {
            font-size: 14px;
            display: inline-block;
            text-decoration: none;
            color: #002fa7;
            margin-bottom: 40px;
        }
        .home-developer {
            margin: 20px 15px 0;
        }
        .home-developer .dev-leader {
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
            margin: 70px 15px 0;
        }
        .auth-product {
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
            display: flex;
            justify-content: space-between;
            margin: 30px 20px 0 20px;
        }
        .publish .publish-edition img {
            width: 280px;
            height: 80px;
            margin: 20px auto;
        }
        .publish-edition img {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            display: block;
        }
        .publish-edition a:last-child img {
            margin: 0 auto;
        }
        .home-source {
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