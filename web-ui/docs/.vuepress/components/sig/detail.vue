<template>
   <div class="sig-detail">
       <div class="breadcrumbs" @click="back">
           SIG \
       </div>
       <h1>{{$route.query.name}}</h1>
       <h2 class="meetings">{{i18n.sig.SIG_DETAIL.ORGANIZING_MEETINGS}}</h2>
        <div class="calender-wrapper">
            <calender :table-data="calenderData" />
        </div>
        <h2>{{i18n.sig.SIG_DETAIL.MEMBERS}}</h2>
        <div class="developer-wrapper">
            <div class="dev-leader">
                <div class="dev-dever" v-for="(value, index) in i18n.home.HOME_DEV.DEV_INFO" :key="index">
                    <el-image
                            style="width: 120px; height: 120px; border-radius: 50%"
                            src="/img/home/deverImg.png"></el-image>
                    <p class="dever-name">{{ value.NAME }}</p>
                    <p :class="['dever-rank',$lang == 'en'?'en-dever-rank':'']">{{ value.TITLE }}</p>
                    <p :class="['dever-rank',$lang == 'en'?'en-dever-rank':'']">{{ value.RANK }}</p>
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
        <h2>{{i18n.sig.SIG_DETAIL.CONTACT}}</h2>
        <div class="contact">
            <span>{{i18n.sig.SIG_DETAIL.MAIL_LIST}}：</span><a :href="'mailto:' + $route.query.mail">{{$route.query.mail}}</a>
        </div>
   </div>
</template>

<script>
import { sigDetail } from "../../api/sig";
import calender from "./../home/calender";
let that = null;
let remoteMethods = {
    getSigDetail() {
        sigDetail(that.$route.query.id)
        .then(data => {
            that.calenderData = data.tableData;
        })
        .catch(data => {
            that.$message.error(data);
        });
    }
}
export default {
    data () {
        that = this;
        return {
            calenderData: []
        }
    },
    components: {
        calender
    },
    mounted () {
        remoteMethods.getSigDetail();
    },
    methods: {
        back () {
            this.$router.push({
                path: this.resolvePath('/sig/sig-list/sig-list')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.sig-detail {
    width: 1120px;
    margin: 0 auto;
    @media screen and (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
    }
}
.sig-detail .breadcrumbs {
    margin-top: 28px;
    color: #002fa7;
    font-size: 20px;
    font-family: FZLTHJW;
    cursor: pointer;
}
.sig-detail .meetings {
    @media screen and (max-width: 1000px) {
        display: none;
    }
}
.en-dever-rank{
    font-size: 14px !important;
    line-height: 20px !important;
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
    @media screen and (max-width: 1000px) {
        margin-bottom: 80px;
    }
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
    @media screen and (max-width: 1000px) {
        flex: 0 0 50%;
        justify-content: space-between;
    }
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
