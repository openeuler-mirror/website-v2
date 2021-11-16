<template>
  <div class="internship">
    <titlenav
      v-show="isShowNav"
      :currentIndex="activeIndex"
      :dataList="navList"
    ></titlenav>
    <div class="internship-banner">
      <a href="#task"></a>
    </div>
    <div class="internship-list">
      <div class="intership-introduce" id="introduce">
        <p></p>
      </div>
      <div class="step" id="step">
        <div class="step-title"><img src="" alt="" /></div>
        <div class="step-content">
          <div class="step-nav" v-if="!isShowH5">
            <div
              class="step-bar"
              :class="{ stepActive: index == stepActive }"
              v-for="(item, index) in step.stepNav"
              :key="index"
              @click="stepChange(index)"
            >
              <img :src="item.IMG" alt="" />
              <p>{{ item.TEXT }}</p>
            </div>
          </div>
          <div class="step-body" >
            <div class="step-text" v-if="stepActive === 0 || isShowH5">
              <h4>申请实习</h4>
              <p></p>
              <div class="attention">
                <div class="attention-title">注意</div>
                <p></p>
              </div>
            </div>
            <div class="step-text" v-if="stepActive === 1 || isShowH5">
              <h4>领取任务</h4>
              <p></p>
              <div class="attention">
                <div class="attention-title">注意</div>
              </div>
            </div>
            <div class="step-text" v-if="stepActive === 2 || isShowH5">
              <h4>提交任务</h4>
              <p></p>
              <div class="attention">
                <div class="attention-title">注意</div>
              </div>
            </div>
            <div class="step-text" v-if="stepActive === 3 || isShowH5">
              <h4>工资与证书发放</h4>
              <p></p>
              <div class="attention">
                <div class="attention-title">注意</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="task">
        <p class="task-introduce"></p>
        <div class="item-box">
          <div class="item" v-for="(item, index) in 10" :key="index">
            <div class="item-name">sig-QA</div>
            <div class="item-intriduce">
              致力于持续提升openEuler社区开发行版本质量
            </div>
            <div class="button-box">
              <button class="button-left">实习任务</button>
              <button class="button-right">Gittee主页 →</button>
            </div>
          </div>
        </div>
      </div>
      <div id="integral">
        <div class="integral-title">
          <img src="" alt="" />
        </div>
        <div class="integral-content">
          <h3>{{ integral.reward.head }}</h3>
          <div v-for="item in integral.reward.text" :key="item">
            <p><span>·</span> {{ item }}</p>
          </div>
          <h4>{{ integral.honor.head }}</h4>
          <div v-for="item in integral.honor.text" :key="item">
            <p><span>·</span> {{ item }}</p>
          </div>
        </div>
      </div>
      <div id="rank">
        <div class="rank-title"><img src="" alt="" /></div>
        <div class="rank-content">
          <div class="rank-top"></div>
          <div class="rank-item" v-for="(item, index) in 9" :key="index">
            <div class="rank-class">0{{ index + 1 }}</div>
            <div class="gitee-name">haml-707</div>
            <div class="score">77777</div>
            <div>积分</div>
          </div>
          <div class="view-all">查看全部 ></div>
        </div>
      </div>
      <div id="rule">
        <div class="rule-title"><img src="" alt="" /></div>
        <div class="rule-content">
          <div class="rule-item" v-for="(item, index) in ruleData" :key="index">
            <div class="question">{{ item.question }}</div>
            <div class="answer">{{ item.answer }}</div>
          </div>
        </div>
        <div class="more-question">
          更多问题，请移步<a href="">本贴</a>评论区提问。
        </div>
      </div>
      <div id="partner">
        <div class="partner-title">
          <img src="" alt="" />
        </div>
        <div class="img-list">
          <img
            v-lazy="item.IMG"
            alt=""
            v-for="(item, index) in partnerData"
            :key="index"
          />
        </div>
      </div>
      <div id="help">
        <div class="help-title">
          <img src="" alt="" />
        </div>
        <div class="help-content">
          <div class="help-left">
            <p>联系邮箱: <a href="">intern@openeuler.io</a></p>
            <p></p>
          </div>
          <div class="help-right">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titlenav from "../summit/titleNav.vue";
export default {
  components: {
    titlenav,
  },
  data() {
    return {
      stepActive: 0,
      isShowNav: true,
      activeIndex: 0,
      navList: [
        {
          key: "#introduce",
          name: "活动介绍",
        },
        {
          key: "#step",
          name: "申请步骤",
        },
        {
          key: "#task",
          name: "实习任务",
        },
        {
          key: "#integral ",
          name: "积分展示",
        },
        {
          key: "#rule",
          name: "实习规则",
        },
        {
          key: "#partner",
          name: "合作伙伴",
        },
        {
          key: "#help",
          name: "帮助咨询",
        },
      ],
      step: {
        stepNav: [
          {
            IMG: "/img/internship/step_1.png",
            TEXT: "申请实习",
          },
          {
            IMG: "/img/internship/step_1.png",
            TEXT: "领取任务",
          },
          {
            IMG: "/img/internship/step_1.png",
            TEXT: "提交任务",
          },
          {
            IMG: "/img/internship/step_1.png",
            TEXT: "工资与证书发放",
          },
        ],
        stepOne: {
          pText: [],
        },
        stepTow: {
          pText: [],
        },
        stepThree: {
          pText: [],
        },
        stepFour: {
          pText: [],
        },
      },
      task:[
          {
              NAME:'sig-QA',
              INTRODUCE:'',
              TASK:'',
              GITEE:''
          },
      ],
      integral: {
        reward: {
          head: "积分与奖励",
          text: ["1312", "2"],
        },
        honor: {
          head: "“开源之星” 荣誉权益",
          text: ["13122", "2321", "3321"],
        },
      },
      ruleData: [
        {
          question: "哪些人可以报名",
          answer: "A:开源实习面向全国范围内全日制/非。。。",
        },
      ],
      partnerData: [
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
      ],
    };
  },
  methods: {
    stepChange(index) {
      this.stepActive = index;
    },
  },
};
</script>
<style lang="less" scoped>
.internship {
  width: 1120px;
  margin: 0 auto;
  padding-bottom: 200px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding-bottom: 80px;
  }
  .internship-banner a {
    cursor: pointer;
    display: inline-block;
    width: 1120px;
    height: 380px;
    margin-bottom: 60px;
    background: url("/img/activities/pc/banner_all.png") no-repeat;
    background-size: 100% 100%;
    @media screen and (max-width: 1000px) {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      background: url("/img/activities/mobile/banner.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .internship-list {
    #step {
      .step-content {
        .step-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          .step-bar {
            display: flex;
            flex-direction: column;
            text-align: center;
            img {
              width: 280px;
            }
          }
          .stepActive {
            img {
              margin-top: -20px;
              height: 206px;
            }
          }
        }
        .step-body {
          padding: 30px;
          height: 500px;
        }
      }
    }
    #task {
      .task-introduce {
        text-align: center;
      }
      .item-box {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        .item {
          padding: 10px;
          margin:0 30px 20px 0;
          background-color: #fff;
          color: rgba(0, 0, 0, 0.5);

          .item-name {
            cursor: pointer;
            color: #002fa7;
            font-size: 16px;
          }
          .item-intriduce {
            height: 100px;
            width: 180px;
            padding-top: 15px;
            font-size: 12px;
          }
          .button-box {
            .button-left,
            .button-right {
              margin: 0;
              padding: 10px;
              cursor: pointer;
              color: #fff;
              outline: none;
              border: 1px solid transparent;
              background-color: #002fa7;
            }
            .button-right {
              color: #002fa7;
              background-color: #fff;
            }
          }
        }
      }
    }
    #rank {
      .rank-title {
      }
      .rank-content {
        .rank-top {
        }
        .rank-item {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          margin-bottom: 10px;
          border-bottom: 1px dashed salmon;
          .rank-class {
            font-size: 24px;
            color: salmon;
          }
        }
        .view-all {
          cursor: pointer;
          text-align: center;
          color: #002fa7;
        }
      }
    }
    #partner {
      .img-list {
        margin-bottom: 40px;
        img {
          cursor: pointer;
          width: 280px;
          height: 80px;
        }
      }
    }
    #help {
      .help-content {
        display: flex;
        justify-content: center;
        .help-left {
          padding-right: 40px;
        }
      }
    }
  }
}
</style>