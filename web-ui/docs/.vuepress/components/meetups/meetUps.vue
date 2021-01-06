<!-- 沙龙 -->
<template>
    <div class="meetUps-content">
        <common-banner
          :pc-src="'/img/meetups/meetup-banner.png'"
          :mobile-src="'/img/meetups/meetup-banner.png'"
          :inside-name="'CONNECT'"
          :outside-name="i18n.interaction.MEETUPS.MEETUPS"
        ></common-banner>
        <div class="meetUps-list">
            <div class="meetUps-year-content" v-for="(items,indexs) in showMeetsList">
                <span class="meetUps-year">{{ indexs }}</span>
                <div class="meetUps-items" v-for="(item,index) in items">
                    <div class="meetUps-month">
                        <span>{{ index }}</span>
                    </div>
                    <div class="meetUps-item" v-for="(value,key) in item">
                        <div @click="goDetail(value.ID)" class="meetUps-img card-hover">
                          <img :src="value.MEETUPS_IMG" alt />
                        </div>
                        <div class="meetUps-info meetUps-info-item">
                            <div class="meetUps-time">
                                <p>
                                    <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
                                    <span class="meetUps-date">{{ value.MEETUPS_DATE }}</span>
                                </p>
                            </div>
                          	<div @click="goDetail(value.ID)" class="meetUps-title word-hover">{{ value.MEETUPS_TITLE }}</div>
							<div class="meetUps-time-mobile">
								<p>
									<span class="meetUps-date">{{ value.MEETUPS_DATE }}</span>
								</p>
							</div>
                          	<div class="meetUps-summary">{{ value.MEETUPS_DESC }}</div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="paginationClass">
					<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-size="5"
					layout="total, prev, jumper, next"
					:total="totalSize"
					></el-pagination>
			</div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
import commonBanner from "./../common/banner.vue";
export default {
  data() {
      return {
          totalSize: 0,
          currentPage: 1,
          PAGESIZE: 6,
          allMeetsList: [],  
          showMeetsList: {},
          currentMeetsList: []   
      };
  },
  components: {
    commonBanner,
  },
  mounted() {
      this.allMeetsList = this.i18n.interaction.MEETUPS.MEETUPS_DATA;
      this.totalSize = this.allMeetsList.length;
      this.sortMeetsList(this.allMeetsList);
  },
  methods: {
    handleCurrentChange(val) {
		this.currentMeetsList = this.allMeetsList.slice(
			(val - 1) * this.PAGESIZE,
			val * this.PAGESIZE
		);
		this.showMeetsList = this.currentMeetsList;
		scrollTo(0, 0);
    },
    sortMeetsList(array) {
        let temp = array;
        temp.forEach((item)=>{
            item.number = item.MEETUPS_DATE.slice(0,4) + item.MEETUPS_DATE.slice(5,7) + item.MEETUPS_DATE.slice(8);
            item.fullYear = item.MEETUPS_DATE.slice(0,4);
            item.fullMonth = item.MEETUPS_MONTH;
        });
        temp.sort((a,b) =>{
            return b.number - a.number;
        });
        let listObj = {};
        temp.forEach((item)=>{
            if(!listObj[item.fullYear]){
                listObj[item.fullYear] = {};
            }
            if(!listObj[item.fullYear][item.fullMonth]){
                listObj[item.fullYear][item.fullMonth] = [];
            }
            listObj[item.fullYear][item.fullMonth].push(item);
        })
        this.showMeetsList = listObj;
    },
    goDetail(id) {
        this.$router.push(
          {
              path:'/' + this.$lang + '/interaction/salon-list/detail/',
              query: {
                  id: id
              }
          });
    }
  },
};
</script>

<style lang="less" scoped>
.card-hover:hover {
    box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
}
.meetUps-list {
	width: 1120px;
	margin: 0 auto;
}
.meetUps-year-content {
  	position: relative;
}
.meetUps-year {
	position: absolute;
	font-size: 60px;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.05);
	height: 60px;
	line-height: 60px;
	top: -35px;
}
.paginationClass {
  	margin: 20px 0 200px 0;
}
.meetUps-items {
  	margin: 50px 0;
}
.meetUps-item {
 	margin-top: 30px;
}
.word-hover{
    &:hover{
        color: #002FA7;
    }
}
.meetUps-img {
	cursor: pointer;
	width: 400px;
	display: inline-block;
	border-radius:8px;
	@media screen and (max-width: 1000px) {
		box-shadow:none;
	}
	img {
		width: 400px;
		height:200px;
		box-shadow:0 6px 20px 0 rgba(0,0,0,0.1);
		border-radius: 8px;
		@media screen and (max-width: 1000px) {
			width: 270px;
			height: 150px;
			box-shadow: none;
		}
	}
}
.meetUps-month {
  	font-size: 24px;
}
.meetUps-info {
	display: inline-block;
	margin-left: 60px;
	width: calc(100% - 480px);
	vertical-align: top;
}
.meetUps-time {
  	margin-top: 5px;
	p {
		display: inline-block;
		margin-right: 51px;
	}
}
.meetUps-time-mobile {
  	display: none;
}
.meetUps-date {
	color: rgba(0, 0, 0, 0.4);
	font-size: 12px;
	@media screen and (max-width: 1000px) {
		line-height: 16px;
	}
}
.meetUps-info-item {
    .meetUps-title {
        cursor: pointer;
        font-size: 24px;
        margin: 21px 0 16px 0;
        @media screen and (max-width: 1000px) {
			font-size: 16px;
			margin: 0;
        }
    }   
}

.meetUps-summary {
	font-size: 14px;
	color: rgba(0, 0, 0, 0.5);
	line-height: 24px;
}
@media screen and (max-width: 1000px) {
	.meetUps-content {
		padding: 40px 30px 80px 30px;
	}
	.meetUps-list {
		width: 100%;
	}
	.meetUps-year {
		display: none;
	}
	.paginationClass {
		margin: 40px 0 0 0;
	}
	.meetUps-items {
		margin: 0;
	}
	.meetUps-item {
		margin-top: 40px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
	}
	.meetUps-img {
		cursor: pointer;
		width: 100%;
		margin: 22px 0;
		text-align: center;
		img {
			max-width: 270px;
		}
	}
	.meetUps-month {
		display: none;
	}
	.meetUps-info {
		display: inline-block;
		margin-left: 0px;
		padding: 0 22px 30px;
		width: 100%;
		vertical-align: top;
	}
	.meetUps-time {
		display: none;
	}
	.meetUps-time-mobile {
		display: inline-block;
		margin-top: 10px;
		p {
		display: inline-block;
			margin-right: 17px;
		}
	}
	.meetUps-date {
		color: rgba(0, 0, 0, 0.4);
		font-size: 12px;
	}
	.meetUps-title {
		cursor: pointer;
		font-size: 16px;
		margin: 0px 0 10px 0;
	}
	.meetUps-summary {
		display: none;
	}
}
</style>
