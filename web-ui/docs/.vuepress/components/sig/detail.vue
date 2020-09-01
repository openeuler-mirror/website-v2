<template>
   <div class="sig-detail">
       <div class="breadcrumbs">
           SIG \
       </div>
       <h1>A-Tune</h1>
       <h2>组织会议</h2>
        <div class="calender-wrapper">
            <calender />
        </div>
        <h2>组织会议</h2>
        <div class="developer-wrapper">
            <div class="dev-leader">
                <div class="dev-dever" v-for="(value, index) in i18n.home.HOME_DEV.DEV_INFO" :key="index">
                    <el-image
                            style="width: 120px; height: 120px; border-radius: 50%"
                            src="/img/home/deverImg.png"></el-image>
                    <p class="dever-name">{{ value.NAME }}</p>
                    <p class="dever-rank">{{ value.TITLE }}</p>
                    <p class="dever-rank">{{ value.RANK }}</p>
                    <div class="dev-link">
                        <a :href="value.MAIL_LINK">
                            <img class="email-link" src="/img/home/email.png" alt="">
                        </a>
                        <a :href="value.GITEE_LINK">
                            <img src="/img/home/Gitee.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <h2>联系方式</h2>
        <div class="contact">
            <span>邮件列表：</span><a href="mailto:dev@openeuler.org">dev@openeuler.org</a>
        </div>
   </div>
</template>

<script>
import calender from "./../home/calender"
export default {
    data () {
        return {

        }
    },
    components: {
        calender
    }
}
</script>

<style scoped>
.sig-detail {
    width: 1120px;
    margin: 0 auto;
}
.sig-detail .breadcrumbs {
    margin-top: 28px;
    color: #002fa7;
    font-size: 20px;
    font-family: FZLTHJW;
    cursor: pointer;
}
.sig-detail .calender-wrapper {
    margin-top: -25px;
}
.sig-detail h1 {
    margin-top: 12px;
    font-size: 36px;
    color: #000;
    line-height: 46px;
    font-family: FZLTHJW;
}
.sig-detail h2 {
    padding-top: 79px;
    font-size: 24px;
    color: #000;
    line-height: 24px;
    font-family: FZLTHJW;
}
.sig-detail .contact {
    margin-top: 20px;
    margin-bottom: 200px;
    color: #002fa7;
    font-size: 16px;
    line-height: 32px;
}
.sig-detail .contact a {
    color: #002fa7;
    cursor: pointer;
    text-decoration: none;
}
.sig-detail .developer-wrapper .dev-leader {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever {
    flex: 0 0 25%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-name {
    margin-top: 20px;
    color: #005cc7;
    font-size: 16px;
    line-height: 1;
    font-family: HuaweiSans-Medium;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-rank {
    margin-top: 10px;
    font-size: 14px;
    font-family: HuaweiSans;
    line-height: 14px;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dev-link {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dev-link a {
    margin: 0 8px;
}

</style>
