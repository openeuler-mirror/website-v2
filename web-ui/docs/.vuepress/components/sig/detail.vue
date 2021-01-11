<template>
   <div class="sig-detail">
       <div class="breadcrumbs" @click="back">
           SIG 
       </div>
       <h1>{{$route.query.name}}</h1>
       <h2 class="meetings">{{i18n.sig.SIG_DETAIL.ORGANIZING_MEETINGS}}</h2>
        <div class="calender-wrapper" v-if="calenderData.length">
            <calender :table-data="calenderData" />
        </div>
        <p v-else class="no-meeting">
            {{i18n.sig.SIG_DETAIL.NO_MEETINGS}}
        </p>
        <h2>{{i18n.sig.SIG_DETAIL.MEMBERS}}</h2>
        <div class="developer-wrapper">
            <div class="dev-leader">
                <div class="dev-dever" v-for="(value, index) in memberList" :key="index">
                    <el-image
                            style="width: 120px; height: 120px; border-radius: 50%"
                            :src="value.avatar_url"></el-image>
                    <p class="dever-name">{{ value.gitee_id }}</p>
                    <p class="dever-rank" :title="value.sigs.join(', ')+'SIG Maintainer'" :class="['dever-rank',$lang == 'en'?'en-dever-rank':'']">
                        <span v-for="(item, itemIndex) in value.sigs" :key="itemIndex">{{item}}{{itemIndex!=(value.sigs.length-1)?', ':''}}</span> <span>SIG Maintainer</span>
                    </p>
                    <div class="dev-link">
                        <a :href="'mailto:'+value.email" v-if="value.email">
                            <img class="email-link" src="/img/home/email.png" alt="">
                        </a>
                        <a target="_blank" :href="value.home_page">
                            <img src="/img/home/Gitee.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <h2>{{i18n.sig.SIG_DETAIL.CONTACT}}</h2>
        <div class="contact">
            <span>{{i18n.sig.SIG_DETAIL.MAIL_LIST}}: </span><a :href="'mailto:' + $route.query.mail">{{$route.query.mail}}</a>
        </div>
   </div>
</template>

<script>
import { sigDetail, sigMember } from "../../api/sig";
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
    },
    getSigMember() {
        sigMember(that.$route.query.id)
        .then(data => {
            that.memberList = JSON.parse(data.owners);
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
            calenderData: [],
            memberList: []
        }
    },
    components: {
        calender
    },
    mounted () {
        remoteMethods.getSigDetail();
        remoteMethods.getSigMember();
    },
    methods: {
        back () {
            this.$router.push({
                path: this.resolvePath('/sig/sig-list')
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
.sig-detail .no-meeting {
    font-size: 16px;
    color: rgba(0, 0, 0, .5);
    
}
.sig-detail .breadcrumbs {
    margin-top: 28px;
    color: #002fa7;
    font-size: 20px;
    
    cursor: pointer;
}
.sig-detail .meetings {
    padding-top: 40px;
    margin-bottom: 30px;
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
    
}
.sig-detail h2 {
    padding-top: 79px;
    font-size: 24px;
    color: #000;
    line-height: 24px;
    
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
}
.sig-detail .developer-wrapper .dev-leader .dev-dever {
    flex: 0 0 25%;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        flex: 0 0 50%;
    }
    flex-direction: column;
    display: flex;
    align-items: center;
    margin-top: 30px;
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-name {
    margin-top: 20px;
    color: #005cc7;
    font-size: 16px;
    line-height: 1;
    
}
.sig-detail .developer-wrapper .dev-leader .dev-dever .dever-rank {
    text-align: center;
    @media screen and (min-width: 1000px) {
        width: 200px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    margin-top: 10px;
    font-size: 14px;
    
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
