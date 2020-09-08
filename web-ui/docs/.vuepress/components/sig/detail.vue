<template>
   <div class="sig-detail">
       <div class="breadcrumbs" @click="back">
           SIG \
       </div>
       <h1>{{$route.query.name}}</h1>
       <h2>{{i18n.sig.SIG_DETAIL.ORGANIZING_MEETINGS}}</h2>
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
    let localMethods = {
        sortData (data) {
            data.forEach(dateItem => {
                let arr = [];
                dateItem.timeData.forEach(timeItem => {
                    let timeStart = this.formatTime(timeItem.duration_time)[0];
                    let timeEnd = this.formatTime(timeItem.duration_time)[1];
                    let indexTemp = null;
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
                                (timeEnd <= meetingStart) || 
                                (timeStart >= meetingEnd)
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
                        let eachFlag = false;
                        arr.forEach((meetingItem, index) => {
                            if(eachFlag){
                                return;
                            }
                            indexTemp = index;
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
                                eachFlag = true;
                                meetingItem.meetingData.push(timeItem);
                            }

                            
                            if(
                                (timeStart < meetingStart) && 
                                ((meetingStart < timeEnd) && 
                                (timeEnd <= meetingEnd))
                            ){
                                eachFlag = true;
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.duration = meetingEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + meetingEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if(
                                (timeEnd > meetingEnd) && 
                                ((meetingStart <= timeStart) && 
                                (timeStart < meetingEnd))
                            ){
                                eachFlag = true;
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - meetingStart;
                                meetingItem.duration_time = meetingStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if(
                                (timeStart < meetingStart) && 
                                (timeEnd > meetingEnd)
                            ){
                                eachFlag = true;
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                        })
                    }
                    let arrTemp = [];
                    let notCheckArr = [];
                    if(indexTemp !== null){
                        let curItemStartTime = arr[indexTemp].startTime;
                        let curItemEndTime = arr[indexTemp].endTime;
                        let curItemStart = this.formatTime(arr[indexTemp].duration_time)[0];
                        let curItemEnd = this.formatTime(arr[indexTemp].duration_time)[1];
                        arr.forEach((item, index) => {
                            let itemStart = this.formatTime(item.duration_time)[0];
                            let itemEnd = this.formatTime(item.duration_time)[1];
                            if(index != indexTemp){
                                if(
                                    (itemStart < curItemStart) && 
                                    ((curItemStart < itemEnd) && 
                                    (itemEnd <= curItemEnd))
                                ){
                                    curItemStart = itemStart;
                                    curItemStartTime = item.startTime;
                                    arrTemp.push(item);
                                    return;
                                }

                                if(
                                    (itemEnd > curItemEnd) && 
                                    ((curItemStart <= itemStart) && 
                                    (itemStart < curItemEnd))
                                ){
                                    curItemEnd = itemEnd;
                                    curItemEndTime = item.endTime;
                                    arrTemp.push(item);
                                    return;
                                }

                                if(
                                    (itemStart < curItemStart) && 
                                    (itemEnd > curItemEnd)
                                ){
                                    curItemStart = itemStart;
                                    curItemEnd = itemEnd;
                                    curItemStartTime = item.startTime;
                                    curItemEndTime = item.endTime;
                                    arrTemp.push(item);
                                    return;
                                }
                                notCheckArr.push(item);
                            }
                        })
                        let selItem = [];
                        if(arrTemp.length){
                            arr[indexTemp].startTime = curItemStartTime;
                            arr[indexTemp].duration = curItemEnd - curItemStart;
                            arr[indexTemp].endTime = curItemEndTime;
                            arr[indexTemp].duration_time = curItemStart + ':00-' + curItemEnd + ':00';
                            selItem.push(arr[indexTemp]);
                            
                            arrTemp.forEach((item, index) => {
                                selItem[0].meetingData = selItem[0].meetingData.concat(item.meetingData);
                            })
                            selItem = selItem.concat(notCheckArr);
                            arr = selItem;
                        }
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
