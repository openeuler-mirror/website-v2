<template>
  <div class="internship">
    <titlenav
      class="titlenav"
      v-show="isShowNav"
      :currentIndex="activeIndex"
      :dataList="navList"
      :internship="true"
    ></titlenav>
    <div class="internship-banner">
      <a href="#task">
        <img
          src="/img/internship/internship-banner.png"
          alt=""
          v-if="!isShowH5"
        />
        <img
          src="/img/internship/internship-banner-mo.png"
          alt=""
          v-if="isShowH5"
        />
      </a>
    </div>
    <div class="internship-list">
      <div class="warper">
        <div class="intership-introduce" id="introduce">
          <p>
            {{ introduce }}
          </p>
        </div>
        <div class="step" id="step">
          <div class="step-title title">
            <img src="/img/internship/step-title.png" alt="" />
          </div>
          <div class="step-content">
            <div class="step-nav" v-if="!isShowH5">
              <div
                class="step-bar"
                :class="{ stepActive: index == stepActive }"
                v-for="(item, index) in step.stepNav"
                :style="`background:url(${item.IMG}) no-repeat;`"
                :key="item.IMG"
                @click="stepChange(index)"
              >
                <img :src="item.ACTIVE" alt="" />
              </div>
            </div>
            <div class="step-body">
              <div class="step-text" v-show="stepActive === 0 || isShowH5">
                <img
                  class="number"
                  v-if="isShowH5"
                  src="/img/internship/1.png"
                  alt=""
                />
                <h4>{{ step.stepONE.TITLE }}</h4>
                <div class="main-text">
                  <p>{{ step.stepONE.TEXT1 }}</p>
                  <p>
                    {{ step.stepONE.TEXT2
                    }}<a
                      href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4A68T?from=project-issue"
                      target="_blank"
                      >{{step.stepONE.LINK1 }}</a
                    >{{ step.stepONE.TEXT3 }}
                  </p>
                  <p>{{ step.stepONE.TEXT4 }}</p>
                  <div class="attention">
                    <p>
                      {{ step.stepONE.ATTENTION1 }}<a href="mailto:intern@openeuler.sh">intern@openeuler.sh</a>{{ step.stepONE.ATTENTION2 }}<span class="orange">{{ step.stepONE.TIP }}</span>
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/01%20%E5%AE%9E%E4%B9%A0%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                      >{{ step.stepONE.DONWLOAD }}</a
                    >
                  </div>
                  
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 1 || isShowH5">
                <img
                  class="number"
                  v-if="isShowH5"
                  src="/img/internship/2.png"
                  alt=""
                />
                <h4>{{ step.stepTow.TITLE }}</h4>
                <div class="main-text">
                  <p>{{ step.stepTow.pText[0] }}</p>
                  <p>
                    {{ step.stepTow.pText[1] }}
                    <span class="blue">{{ step.stepTow.pText[2] }}</span>
                    {{ step.stepTow.pText[3] }}
                  </p>
                  <p>
                    {{ step.stepTow.pText[4] }}
                    <span class="blue">{{ step.stepTow.pText[5] }}</span>
                    {{ step.stepTow.pText[6]
                    }}<span class="blue">{{ step.stepTow.pText[7] }}</span>
                    {{ step.stepTow.pText[8] }}
                  </p>
                  <p>
                    {{ step.stepTow.pText[9]
                    }}<span class="blue">{{ step.stepTow.pText[10] }}</span>
                    {{ step.stepTow.pText[11] }}
                    <span class="orange">{{ step.stepTow.pText[12] }}</span>
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ step.ATTENTION }}</div>
                    <p>
                      {{ step.stepTow.ATTENTION_TEXT[0] }}
                    </p>
                    <p>
                      {{ step.stepTow.ATTENTION_TEXT[1] }}
                      <span class="blue">
                        {{ step.stepTow.ATTENTION_TEXT[2] }}</span
                      >
                      {{ step.stepTow.ATTENTION_TEXT[3] }}
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/02%20%E4%BB%BB%E5%8A%A1%E8%AE%A4%E9%A2%86%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                    >
                      {{ step.stepTow.DONWLOAD }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 2 || isShowH5">
                <img
                  class="number"
                  v-if="isShowH5"
                  src="/img/internship/3.png"
                  alt=""
                />
                <h4>{{ step.stepThree.TITLE }}</h4>
                <div class="main-text">
                  <p>
                    {{ step.stepThree.pText[0] }}
                    <span class="blue"> {{ step.stepThree.pText[1] }}</span
                    >{{ step.stepThree.pText[2] }}
                  </p>
                  <p>
                    {{ step.stepThree.pText[3] }}
                    <span class="blue">{{ step.stepThree.pText[4] }}</span
                    > {{ step.stepThree.pText[5] }}
                  </p>
                  <p>
                    {{ step.stepThree.pText[6] }} <span class="blue"> {{ step.stepThree.pText[7] }} </span> {{ step.stepThree.pText[8] }}
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ step.ATTENTION }}</div>
                    <p>
                      {{ step.stepThree.ATTENTION_TEXT[0] }}
                      <span class="blue">{{
                        step.stepThree.ATTENTION_TEXT[1]
                      }}</span
                      >{{ step.stepThree.ATTENTION_TEXT[2] }}
                    </p>
                  </div>
                  <div class="flow-chart">
                    <img
                      v-if="!isShowH5"
                      src="/img/internship/step-3.png"
                      alt=""
                    />
                    <img v-else src="/img/internship/step-3-mo.png" alt="" />
                  </div>
                </div>
              </div>
              <div class="step-text" v-show="stepActive === 3 || isShowH5">
                <img
                  class="number"
                  v-if="isShowH5"
                  src="/img/internship/4.png"
                  alt=""
                />
                <div class="main-text">
                  <h4>{{ step.stepFour.TITLE }}</h4>
                  <p>
                    {{ step.stepFour.pText1[0] }}
                  </p>
                  <div class="attention firstAttention">
                    <p v-for="item in step.stepFour.pText" :key="item">
                      {{ item }}
                    </p>
                  </div>
                  <p>
                    {{ step.stepFour.pText1[1]
                    }}<a class="blue" href="mailto:intern@openeuler.sh">{{
                      step.stepFour.pText1[2]
                    }}</a
                    >{{ step.stepFour.pText1[3] }}
                  </p>
                  <div class="attention black">
                    <div class="attention-title">{{ step.ATTENTION }}</div>
                    <p v-for="item in step.stepFour.ATTENTION_TEXT" :key="item">
                      {{ item }}
                    </p>
                    <a
                      href="https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/%E5%BC%80%E6%BA%90%E5%AE%9E%E4%B9%A0%E8%B5%84%E6%96%99%E4%B8%8B%E8%BD%BD/03%20%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7%E6%9D%90%E6%96%99%E5%92%8C%E9%82%AE%E4%BB%B6%E6%A8%A1%E6%9D%BF.rar"
                      download
                      class="download"
                      >{{ step.stepFour.DONWLOAD }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="task">
          <div class="task-title title">
            <img src="/img/internship/task-title.png" alt="" />
          </div>
          <div class="tabbar">
            <el-tabs v-model="community" @tab-click="tabClick">
              <el-tab-pane label="openEuler" name="openEuler"></el-tab-pane>
              <el-tab-pane label="openLooKeng" name="openLooKeng"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="taks-body">
            <p class="task-introduce" v-show="community == 'openEuler'">
              {{ task.INTRODUCE }}
            </p>
            <div class="item-box">
             <div
               class="item"
               v-for="(item, index) in communityTask"
               :key="index"
             >
               <a :href="item.NAME_LINK" class="item-name" target="_blank">{{
                 item.NAME
               }}</a>
               <div class="item-intriduce">
                 {{ item.INTRODUCE }}
               </div>
               <div class="button-box">
                 <button @click="go(item.TASK)" class="button-left">
                   {{ task.INTERNSHIP_TASK }}
                 </button>
                 <button @click="go(item.GITEE)" class="button-right">
                   <span>{{ item.NAME == 'openLooKeng' ? officialWeb:task.SIG_DETAIL }}</span>
                   <img src="/img/internship/arrow.png" alt="" />
                 </button>
               </div>
             </div>
            </div>
          </div>
        </div>
        <div id="integral">
          <div class="integral-title title">
            <img src="/img/internship/integral-title.png" alt="" />
          </div>
          <div class="integral-border">
            <div class="integral-content">
              <h3>{{ integral.reward.head }}</h3>
              <div
                v-for="item in integral.reward.text"
                :key="item"
                class="circular"
              >
                <p>{{ item }}</p>
              </div>
              <h4>{{ integral.honor.head }}</h4>
              <div v-for="item in integral.honor.text" :key="item" class="star">
                <img src="/img/internship/star.png" alt="" />
                <p>{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="rank">
          <div class="rank-title">
            <img v-if="!isShowH5" src="/img/internship/rank-title.png" alt="" />
            <img v-else src="/img/internship/rank-title-mo.png" alt="" />
          </div>
          <div class="rank-border">
            <div class="rank-content" ref="rankContent">
              <div class="rank-box">
                <div class="rank-top">
                  <div class="top-item" v-for="(item, index) in rankTop" :key="index">
                    <div class="gitee-name">{{ item.GiteeId }}</div>
                    <div class="score" >
                      {{ item.integralValue }}<span>{{rank.SCORE}}</span>
                    </div>
                    <div
                      class="rank-box"
                      :class="[
                        { second: index === 0 },
                        { first: index === 1 },
                        { third: index === 2 },
                      ]"
                    >
                      <span v-if="index === 0">{{rank.SECOND}}</span>
                      <span v-if="index === 1">{{rank.FIRST}}</span>
                      <span v-if="index === 2">{{rank.THIRD}}</span>
                    </div>
                  </div>
                </div>
                <div class="rank-last">
                  <div
                    class="rank-item"
                    v-for="(item, index) in renderData"
                    :key="index"
                  >
                    <div class="rank-left">
                      <div class="rank-class">{{ item.rank }}</div>
                      <div class="gitee-name">{{ item.GiteeId }}</div>
                    </div>
                    <div class="rank-right">
                      <div class="score">{{ item.integralValue }}</div>
                      <span>{{rank.SCORE}}</span>
                    </div>
                  </div>
                </div>
                <div class="view-all" v-if="showAll">
                  <a @click="extend()" v-if="!isExent"
                    >{{rank.VIEW_ALL}}
                    <div>
                      <img src="/img/internship/right.svg" alt="" /></div
                  ></a>
                  <a @click="extend()" v-else
                    >{{rank.PACK_UP}}
                    <div>
                      <img
                        class="arrow"
                        src="/img/internship/right.svg"
                        alt=""
                      /></div
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="rule">
        <div class="rule-title title">
          <img src="/img/internship/rule-title.png" alt="" />
        </div>
        <div class="rule-border">
          <div class="rule-content">
            <div class="warper">
              <div
                class="rule-item"
                v-for="(item, index) in rule.RULE_DATA"
                :key="index"
              >
                <div class="question">{{ item.question }}</div>
                <div class="answer">{{ item.answer }}</div>
              </div>
              <div class="more-question orange">
                {{rule.MORE[0]}}<a
                  class="this-post "
                  href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4AJIR?from=project-issue"
                  target="_blank"
                  >{{rule.MORE[1]}}</a
                >{{rule.MORE[2]}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="partner">
        <div class="warper">
          <div class="partner-title title">
            <img src="/img/internship/partner-title.png" alt="" />
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
      </div>
      <div id="help">
        <div class="help-title title">
          <img src="/img/internship/help-title.png" alt="" />
        </div>
        <div class="help-content">
          <div class="help-left">
            <p>
              {{help[0]}}
              <a href="mailto:intern@openeuler.sh">{{help[1]}}</a>
            </p>
            <p>{{help[2]}}</p>
            <p>{{help[3]}}</p>
          </div>
          <div class="help-right">
            <img src="/img/internship/qrCode.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titlenav from "../summit/titleNav.vue";
import { getRank, getToken } from "../../api/internship";
export default {
  components: {
    titlenav,
  },
  data() {
    return {
      renderData: [],
      community:'openEuler',
      showAll:false,
      isExent: false,
      rankInfo: [],
      stepActive: 0,
      isShowNav: false,
      activeIndex: 0,
      rankTop: [],
      rankLast: [],
      communityTask:[],
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
      introduce:
        " openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力。由openEuler社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。",
      step: {
        stepNav: [
          {
            IMG: "/img/internship/step_1.png",
            ACTIVE: "/img/internship/step_1active.png",
            TEXT: "申请实习",
          },
          {
            IMG: "/img/internship/step_2.png",
            ACTIVE: "/img/internship/step_2active.png",
            TEXT: "领取任务",
          },
          {
            IMG: "/img/internship/step_3.png",
            ACTIVE: "/img/internship/step_3active.png",
            TEXT: "提交任务",
          },
          {
            IMG: "/img/internship/step_4.png",
            ACTIVE: "/img/internship/step_4active.png",
            TEXT: "工资与实习证明",
          },
        ],
        stepONE: {
          TITLE: "申请实习",
          TEXT1: "（1）阅读并签署活动声明。(见申请材料模板里)",
          TEXT2: "（2）完成",
          LINK1: "实习测试任务",
          TEXT3: "并提供PR链接。",
          TEXT4: "（3）填写报名资料表。",
          ATTENTION1: "将以上申请材料按照模板填写后发送至开源实习官方邮箱",
          ATTENTION2:
            "。发送后等待审核，组织方将以邮件反馈审核结果，审核通过后，签订劳务协议，用所分配的账号开始实习。",
          DONWLOAD: "申请材料模板下载",
          TIP:"（注：组织方会根据所提交的资料对报名学生进行一定的审核筛选）"
        },
        ATTENTION: "注意",
        stepTow: {
          TITLE: "领取任务",
          pText: [
            "（1）在Gitee查看任务，找到你想做的任务issue。",
            "（2）在任务issue下方评论区输入",
            "/intern-assign",
            "命令，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。",
            "（3）导师收到邮件后对申请人进行评审，在该任务issue评论下通过输入命令反馈结果，",
            "/intern-approve",
            "代表审核通过，学生成功领取任务,可以开始进行任务处理；",
            "/intern-unapprove",
            "代表领取失败，该学生可再去领取其他任务。",
            "（4）如果领取后无法完成，可通过在issue下输入",
            "/intern-unassign",
            "放弃任务。",
            "放弃超过3次，账号被限制一个月不能领取任务。",
          ],
          ATTENTION_TEXT: [
            "每个任务只能有一个人认领，每人一次最多只能有2个认领中的任务。",
            "输入",
            "/intern-assign",
            "命令后两周内没有发简历和方案给导师的，认领自动失效，任务被释放。",
          ],
          DONWLOAD: "任务认领邮件模板下载",
        },
        stepThree: {
          TITLE: "提交任务",
          pText: [
            "（1）任务处理完成后，提交pr，在pr描述里添加 ",
            "#issue",
            " 编号;",
            "（2）提交pr后在任务issue评论区输入",
            "/intern-completed",
            "命令，表示当前任务已提交，然后等待审核。",
            "（3）跟进导师和相关SIG maintainer审核PR，PR被合入后，导师确认任务完成即在issue下输入",
            "/intern-done",
            "命令，issue关闭，学生获得积分。"
          ],
          ATTENTION_TEXT: [
            "导师有不通过任务成果的权利，如学生提交的PR离实际所需太远，或未按时提交PR，可选择输入命令",
            "/intern-fail",
            "，不通过该任务，则无积分。",
          ],
        },
        stepFour: {
          TITLE: "工资与实习证明",
          pText1: [
            "（1）在实习合同里约定的6个月期限内，学生可凭积分获得实习工资。",
            "（2）证明申请：在实习有效期6个月内满60分即可开具实习证明，如需开具实习证明，发送邮件给实习官方邮箱",
            "intern@openeuler.sh",
            "提出申请。",
          ],
          pText: [
            "满20分可获得工资总计1000元；",
            "满40分可获得工资总计2500元；",
            "满60分可获得工资总计4000元；",
            "满80分可获得工资总计6000元；",
            "满100分可获得工资总计8000元；",
          ],
          ATTENTION_TEXT: [
            "以上工资金额为总计金额，每月月初按上月积分结算一次应发工资，在月底发放到实习生账户。应发工资为达到相应积分标准的总计工资金额减去已结算金额。",
            "总计100分为工资结算上限。超过100分不再计算工资，可选择结束实习，或继续贡献社区，满150分可获得“开源之星”荣誉。",
            "证明开具后视为实习结束，不再计算实习工资。",
          ],
          DONWLOAD: "证明申请材料和邮件模板下载",
        },
      },
      task: {
        INTRODUCE:
          "SIG（Special Interest Group）是openEuler社区的组织形式，找到你感兴趣的SIG，点击下列“实习任务”到Gitee查看相关SIG的任务（需先保持Gitee在登陆状态）。",
        EULER_TASK_ITEM: [
          {
            NAME: "Kernel",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=10&name=Kernel",
            INTRODUCE: "openEuler社区维护的Linux 内核",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590412&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/Kernel",
          },
          {
            NAME: "sig-QA",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=41&name=sig-QA",
            INTRODUCE: "致力于持续提升openEuler社区发行版本质量",
            TASK: "https://gitee.com/organizations/src-openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590164&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590164&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/sig-QA",
          },
          {
            NAME: "sig-openstack",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=59&name=sig-openstack",
            INTRODUCE:
              "在openEuler之上提供原生的OpenStack，构建开放可靠的云计算技术栈",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590186&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590186&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/openstack",
          },
          {
            NAME: "A-tune",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=1&name=A-Tune",
            INTRODUCE: "基于openEuler开发的自动化、智能化性能调优引擎",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590194&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/A-Tune",
          },
          {
            NAME: "sig-KIRAN-DESKTOP",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=37&name=sig-KIRAN-DESKTOP&mail=dev%40openeuler.org",
            INTRODUCE:
              "麒麟信安自主研发，致力于为用户提供更加美观，高效和易用的Linux桌面操作系统",
            TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590528&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/sig-KIRAN-DESKTOP",
          },
          {
            NAME: "sig-ops",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=83&name=sig-ops",
            INTRODUCE:
              "致力于运维工具的移植与开发，提升openEuler操作系统的运维能力",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590323&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/sig-ops",
          },
          {
            NAME: "Cloud Native",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=85&name=sig-CloudNative",
            INTRODUCE:
              "提供便捷、易用的云原生基础设施，提供简单、高效的云原生应用开发托管环境，共建云原生生态",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590352&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE:
              "https://gitee.com/openeuler/community/tree/master/sig/sig-CloudNative",
          },
          {
            NAME: "G11N",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=98&name=G11N",
            INTRODUCE: "致力于openEuler的国际化和本地化",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590388&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/community/tree/master/sig/G11N",
          },
          {
            NAME: "sig-UKUI",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=46&name=sig-UKUI",
            INTRODUCE: "负责在openEuler上提供UKUI桌面环境，及相关软件包的规划、维护和升级",
            TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590230&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-UKUI",
          },
          {
            NAME: "sig-OSCourse",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-OSCourse",
            INTRODUCE: "操作系统课程兴趣组",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=141433910&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-OSCourse",
          },
          {
            NAME: "sig-DDE",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=sig-DDE",
            INTRODUCE: "深度科技自主开发的美观易用、极简操作的桌面环境",
            TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590403&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/community/tree/master/sig/sig-DDE",
          },
          {
            NAME: "Infrastructure",
            NAME_LINK:
              "https://www.openeuler.org/zh/sig/sig-list/sig-detail.html?id=95&name=Infrastructure",
            INTRODUCE: "主要负责openEuler社区的基础设施功能开发、维护",
            TASK: "https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590142&single_label_text=&sort=&state=open&target_project&skip_mobile=true",
            GITEE: "https://gitee.com/openeuler/community/tree/master/sig/Infrastructure",
          },
          {
            NAME: "其他",
            INTRODUCE: "一些暂不属于任何SIG的任务，如Rust、存储等等",
            TASK: "https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=125884711&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&sort=&state=open&target_project&skip_mobile=true",
          },
          {
            INTRODUCE: "更多SIG任务，敬请期待",
          },
        ],
        LOOKENG_TASK_ITEM:[
           {
            NAME_LINK:
              "https://openlookeng.io",
            NAME: "openLooKeng",
            INTRODUCE: "一款超强易用的数据虚拟化引擎，让大数据更简单",
            TASK: "https://gitee.com/openlookeng-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true",
            GITEE: "https://openlookeng.io",
          },
          {
            INTRODUCE: "更多任务，敬请期待",
          },
        ],
        INTERNSHIP_TASK: "实习任务",
        SIG_DETAIL: "SIG详情",
      },
      integral: {
        reward: {
          head: "积分与奖励",
          text: [
            "实习有效期6个月内满20分以上，可获得不同级别的实习工资。",
            "一年内累计积分满150分，获得openEuler社区高校“开源之星”荣誉。",
          ],
        },
        honor: {
          head: "“开源之星”荣誉权益：",
          text: [
            "获得openEuler社区颁发的“开源之星”徽章。",
            "将作为高校贡献者在openEuler官网长期展示，获得社区官方渠道的宣传报道。",
            "获得一次受邀参与openEuler年度峰会的机会（包行程住宿）。",
          ],
        },
      },
      rule: {
        RULE_DATA: [
          {
            question: "1、哪些人可以报名？",
            answer:
              "A：开源实习面向全国范围内年满18周岁的全日制/非全日制在校学生招募，无专业年级限制，欢迎感兴趣的同学踊跃报名。",
          },
          {
            question: "2、实习有效期6个月是如何计算的？",
            answer:
              "A：在申请实习时需签署实习劳务合同，实习有效期即劳务合同上填写的实习有效期，为6个月期限，6个月期限内未满60积分则不能获得实习证明。线上实习时间管理相对自由，可根据自身情况安排时间，可提前结束实习。",
          },
          {
            question: "3、超过了6个月或者完成了100积分还能继续在社区做任务吗？",
            answer:
              "A：可以，但积分不能再用于领取证明和奖金，一年内累计到150积分可获得openEuler社区高校“开源之星”荣誉。 ",
          },
        ],
        MORE: ["更多问题，请移步", "本帖", "评论区提问。"],
      },
      officialWeb:'官网详情',
      rank: {
        FIRST: "第一名",
        SECOND: "第二名",
        THIRD: "第三名",
        SCORE: "积分",
        VIEW_ALL: "查看全部",
        PACK_UP: "收起全部",
      },
      partnerData: [
        {
          IMG: "/img/internship/iscas.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/qilinsoft.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/tongxin.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/kylinsec.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/mindSpore.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/openEuler.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/openGauss.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/openLooKeng.png",
          LINK: "",
        },
        {
          IMG: "/img/internship/gitee.png",
          LINK: "",
        },
      ],
      help: [
        "联系邮箱:",
        "intern@openeuler.sh",
        "扫码加入“开源实习”学生QQ群，更多问题群内咨询。",
        "群号：526089131",
      ],
    };
  },
  methods: {
    tabClick() {
      if(this.community == 'openEuler') {
        this.communityTask = this.task.EULER_TASK_ITEM
      } else if (this.community == 'openLooKeng') {
        this.communityTask = this.task.LOOKENG_TASK_ITEM
      } else {
        return false
      }
    },
    extend() {
      if (this.isExent) {
        this.renderData = this.rankInfo.slice(3, 10);
        window.location.href = "#rank";
      } else {
        this.renderData = this.rankInfo.slice(3);
      }
      this.isExent = !this.isExent;
    },
    stepChange(index) {
      this.stepActive = index;
    },
    go(path) {
      if (path && !path.includes("http")) {
        this.$router.push({
          path: this.resolvePath(path),
        });
      } else if (path.includes("http")) {
        window.open(path);
      } else {
        return false;
      }
    },
    scroTop() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      let value = 0;
      if (this.isExent) {
        value = 1400;
      }
      if (scrollTop < 270 || scrollTop > 7200) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
      if (scrollTop > 200 && scrollTop < 441) {
        this.activeIndex = 0;
      } else if (scrollTop > 450 && scrollTop < 1100) {
        this.activeIndex = 1;
      } else if (scrollTop > 1100 && scrollTop < 1700) {
        this.activeIndex = 2;
      } else if (scrollTop > 1700 && scrollTop < 3400) {
        this.activeIndex = 3;
      } else if (scrollTop > 3400 && scrollTop < 4500) {
        this.activeIndex = 4;
      } else if (scrollTop > 4500 && scrollTop < 4900) {
        //4170
        this.activeIndex = 5;
      } else if (scrollTop > 4600) {
        this.activeIndex = 6;
      } else {
        return false;
      }
    },
    showRank() {
      getToken()
        .then((data) => {
          return getRank({
            token: data.loginData.token,
            currentPage: 1,
            pageSize: 100,
            userId: data.loginData.userId,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res.UserPoints) {
            let info = res.UserPoints;         
            info.length > 10 ? this.showAll = true: '';
            info.sort((a, b) => {
              return b.integralValue - a.integralValue;
            });
            info.forEach((item, index) => {
              index < 9
                ? (item["rank"] = `0${index + 1}`)
                : (item["rank"] = index + 1);
            });
            this.rankInfo = info;
            this.renderData = info.slice(3, 10);
            this.rankTop = info.slice(0, 3);
            // 改变一二名数组顺序
            this.rankTop.splice(
              0,
              1,
              ...this.rankTop.splice(1, 1, this.rankTop[0])
            );
          }
        })
        .catch(err =>{
          console.log(err);
        })
    },
  },
  created() {},
  mounted() {
    this.tabClick()
    this.showRank()
    window.addEventListener("scroll", this.scroTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroTop);
  },
};
</script>
<style lang="less" scoped>
/deep/.tabbar {
   .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__nav-scroll {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-tabs__item {
    height: 60px;
    line-height: 60px;
    font-size: 28px;
     @media screen and (max-width: 1000px) {
        height: 20px;
        line-height: 0;
        font-size: 16px;
        .el-tabs__active-bar {
          height: 1px;
        }
    }
  }
  @media screen and (max-width: 1000px) {
        .el-tabs__active-bar {
          height: 1px;
        }
    }

}

.closeInternship {
  padding-top: 150px;
  text-align: center;
  font-size: 24px;
  p {
    padding-bottom: 20px;
  }
  img {
    width: 170px;
  }
   @media screen and (max-width: 1000px) {
    padding: 70px 20px 0;
    font-size: 16px;
  }
}
a {
  font-size: 14px;
  color: #002fa7;
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.internship {
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 200px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding-bottom: 80px;
  }
  .internship-banner {
    height: 380px;
    text-align: center;
    img {
      cursor: pointer;
      width: 100%;
    }
    @media screen and (max-width: 1000px) {
      height: 300px;
      img {
        max-width: 375px;
      }
    }
  }
  .banner-center {
    width: 1120px;
    height: 380px;
    font-size: 40px;
    margin: 0 auto;
    p:nth-child(1) {
      padding: 66px 0 30px 0;
    }
  }
  .warper {
    width: 1120px;
    margin: 0 auto;
    @media (max-width: 1000px) {
      width: 100%;
      padding: 0 30px;
    }
  }
  .internship-list {
    .intership-introduce {
      p {
        padding-top: 60px;
        font-size: 20px;
        line-height: 40px;
        @media (max-width: 1000px) {
          padding-top: 20px;
          font-size: 16px;
        }
      }
    }
    .title {
      text-align: center;
      padding: 106px 0 13px 0;
      img {
        width: 180px;
      }
      @media (max-width: 1000px) {
        padding: 30px 0 !important;
        img {
          width: 113px;
          height: 34px;
        }
      }
    }
    #step {
      .step-title {
        text-align: center;
        padding: 60px 0 70px 0;
        @media (max-width: 1000px) {
          padding: 30px 0;
        }
      }
      .step-content {
        border-radius: 8px 8px 8px 8px;
        background-color: rgb(93, 200, 255);
        .step-nav {
          display: flex;
          .step-bar {
            cursor: pointer;
            width: 280px;
            height: 160px;
            background-size: 100% 100% !important;
            img {
              display: none;
              width: 100%;
              margin-top: -20px;
              height: 180px;
            }
          }
          .stepActive {
            img {
              display: block;
            }
          }
        }
        .step-body {
          margin-top: -1px;
          padding: 32px 30px 37px;
          height: 392px;
          background: url(/img/internship/step-background.png) no-repeat;
          background-size: 100%;
          .suspend {
            padding: 10px 0 0 10px;
          }
          @media (max-width: 1000px) {
            padding: 0;
          }
          h4 {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: normal;
            color: #000000;
            line-height: 24px;
          }
          p {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 24px;
            @media (max-width: 1000px) {
              font-size: 12px;
              a {
                font-size: 12px;
              }
            }
          }
          .specialSpan {
            padding-left: 10px;
          }
          .blue {
            color: #2e9afe;
          }
          .orange {
            color: #ff7c56;
          }
          .attention {
            margin: 10px 14px 0 35px;
            .attention-title {
              font-size: 14px;
              color: #000000;
              line-height: 24px;
            }
            .download {
              display: block;
              margin-top: 10px;
            }
          }
          .firstAttention {
            margin-top: 0;
          }
          .black {
            p {
              position: relative;
              padding-left: 12px;
            }
            p::before {
              position: absolute;
              top: 10px;
              left: 0;
              content: "";
              height: 4px;
              width: 4px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
            }
          }
          .flow-chart {
            margin-top: 8px;
            padding-left: 35px;
            img {
              width: 960px;
            }
          }
        }
        @media (max-width: 1000px) {
          background: none;
          p::before {
            display: none;
          }
          .step-body {
            background: none;
            height: 100%;
            font-size: 12px;
            .step-text:nth-child(2) {
              .download {
                padding-bottom: 44px;
              }
            }
            .step-text:nth-child(4) {
              margin-bottom: 0;
            }
            .step-text {
              position: relative;
              margin-bottom: 20px;
              padding: 50px 5px 5px;
              background-color: #2e9afe;
              border-radius: 8px;
              .main-text {
                padding: 10px;
                border-radius: 8px;
                background-color: #eaf5fe;
                .download {
                  margin-top: 6px;
                  font-size: 12px;
                }
              }
             
              .number {
                position: absolute;
                top: 0;
                left: 0;
                width: 60px;
              }
              h4 {
                position: absolute;
                top: 12px;
                left: 60px;
                font-size: 16px;
                color: #fff;
              }
              p {
                line-height: 22px;
              }
              .attention {
                margin: 6px 0 0 30px;
              }
            }
            .flow-chart {
              padding: 0;
              text-align: center;
              img {
                width: 268px;
              }
            }
          }
        }
      }
    }
    #task {
      .task-introduce {
        font-size: 20px;
        line-height: 40px;
      }
      .item-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        .item {
          margin: 0 25px 25px 0;
          padding: 24px 20px;
          background-color: #fff;
          color: rgba(0, 0, 0, 0.5);
          box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition:  box-shadow 0.1s;
          .item-name {
            cursor: pointer;
            color: #002fa7;
            font-size: 16px;
          }
          .item-intriduce {
            padding-top: 8px;
            height: 94px;
            width: 221px;
            font-size: 14px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .button-box {
            display: flex;
            .button-left,
            .button-right {
              margin: 0;
              padding: 8px 12px;
              cursor: pointer;
              color: #fff;
              outline: none;
              border: none;
              background-color: #002fa7;
            }
            .button-right {
              display: flex;
              margin-left: 24px;
              align-content: center;
              color: #002fa7;
              background-color: #fff;
              line-height: 24px;
              img {
                margin-left: 6px;
                width: 24px;
              }
            }
          }
        }
        .item:nth-child(4n) {
          margin-right: 0;
        }
        .item:last-child {
          margin: 0 0 25px 0;
          flex: 1;
          height: 203px;
          .button-box {
            display: none;
          }
          .item-intriduce {
            padding: 0;
            width: 100%;
            height: 100%;
            line-height: 152px;
            text-align: center;
            font-size: 20px;
            color: #000000;
          }
        }
        .item:hover {
          box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
      }
      @media (max-width: 1000px) {
        .task-introduce {
          text-align: left;
          font-size: 16px;
        }
        .item-box {
          flex-direction: column;
          align-content: center;
          justify-content: center;
          .item:nth-child(n) {
            width: 310px;
            margin: 0 0 25px 0;
            .item-intriduce {
              width: 275px;
            }
          }
          .item:last-child {
            margin: 0;
            .item-intriduce {
              font-size: 16px;
            }
          }
        }
      }
    }
    #integral {
      .integral-title {
        padding: 67px 0 50px 0;
      }

      .integral-content {
        padding: 26px 15px;
        height: 239px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        background: url(/img/internship/integral-background.png) no-repeat;
        background-size: 100%;
        h3,
        h4 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #000000;
        }
        h4 {
          margin-top: 10px;
          font-size: 14px;
        }
        p {
          position: relative;
          padding-left: 12px;
        }
        .circular {
          p::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #2e9afe;
          }
        }
        .star {
          position: relative;
          img {
            position: absolute;
            left: 0;
            top: 8px;
            height: 8px;
          }
        }
      }
      @media (max-width: 1000px) {
        .integral-border {
          border: 5px solid #5877ff;
          border-top: 16px solid #5877ff;
          border-radius: 8px;
          background-color: #5877ff;
        }
        .integral-content {
          padding-bottom: 41px;
          height: 100%;
          background: none;
          border-radius: 8px;
          background-color: #eef1ff;
          h3,
          h4 {
            margin-bottom: 6px;
            font-size: 16px;
            color: #000000;
          }
          h4 {
            margin-top: 8px;
            margin-bottom: 0;
            font-size: 12px;
          }
        }
      }
    }
    #rank {
      padding-top: 30px;
      .rank-title {
        position: relative;
        height: 80px;
        text-align: center;
        img {
          border-radius: 8px 8px 0 0;
          width: 374px;
        }
      }
      .rank-title::before {
        position: absolute;
        content: "积分排行";
        width: 374px;
        color: #fff;
        text-align: center;
        font-size: 28px;
        line-height: 80px;
      }
      .rank-border {
        border-radius: 8px;
        border: 5px solid #ff7c56;
        border-top: 16px solid #ff7c56;
        background-color: #ff7c56;
      }
      .rank-content {
        border-radius: 8px;
        padding: 30px 290px 25px;
        background-color: #fff2ee;
        transition: all 0.5s;
        .rank-top {
          display: flex;
          justify-content: center;
          .top-item {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            text-align: center;
            .gitee-name {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.5);
              line-height: 16px;
            }
            .score {
              margin: 10px 0 20px;
              font-size: 18px;
              color: #ff644e;
              line-height: 16px;
              span {
                padding-left: 10px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
              }
            }
            .rank-box {
              width: 170px;
              font-size: 24px;
              color: #ffffff;
              line-height: 24px;
            }
            .second {
              height: 66px;
              line-height: 66px;
              background: #5dc8ff;
              border: 1px solid #a4e1ff;
            }
            .first {
              position: relative;
              height: 104px;
              line-height: 104px;
              background: #ff7c56;
              border: 1px solid #a4e1ff;
            }
            .third {
              height: 48px;
              line-height: 48px;
              background: #2e9afe;
              border: 1px solid #a4e1ff;
            }
          }
        }
        .rank-last {
          .rank-item:nth-of-type(1) {
            margin-top: 30px;
            border-top: 1px dashed #ff7c56;
          }
          .rank-item {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            margin-bottom: 10px;
            border-bottom: 1px dashed #ff7c56;
            .rank-left,
            .rank-right {
              display: flex;
              align-items: center;
              .rank-class {
                font-size: 24px;
                color: #ff7c56;
              }
              .gitee-name {
                padding-left: 20px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 16px;
              }
            }
            .rank-right {
              .score {
                font-size: 18px;
                color: #ff644e;
                line-height: 16px;
              }
              span {
                padding-left: 30px;
                font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                line-height: 16px;
              }
            }
          }
        }
        .dash {
          padding-top: 50px;
          margin-bottom: 20px;
          border-bottom: 1px dashed #ff7c56;
        }
        .view-all {
          padding-top: 15px;
          font-size: 14px;
          color: #002fa7;
          a {
            cursor: pointer;
            display: flex;
            justify-content: center;
            div {
              display: flex;
              justify-content: center;
              padding-left: 9px;
              img {
                transform: rotate(90deg);
                transition: 0.3s;
              }
              .arrow {
                transform: rotate(-90deg);
              }
            }
          }
        }
      }
      @media (max-width: 1000px) {
        .rank-title {
          height: 48px;
          img {
            width: 109px;
          }
        }
        .rank-title::before {
          content: "";
        }
        .rank-content {
          border-radius: 8px;
          padding: 26px 15px 10px;
          height: 100%;
          .dash {
            padding-top: 30px;
          }
          .rank-top {
            .top-item {
              .gitee-name {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
              }
              .score {
                margin: 10px 0;
                font-size: 14px;
                span {
                  font-size: 12px;
                }
              }
              .rank-box {
                width: 92px;
                font-size: 16px;
                line-height: 24px;
              }
              .second {
                height: 60px;
                line-height: 60px;
              }
              .first {
                height: 85px;
                line-height: 85px;
              }
              .first::after {
                top: -60px;
              }
              .third {
                height: 40px;
                line-height: 40px;
              }
            }
          }
          .rank-last {
            .rank-item:nth-of-type(1) {
              margin-top: 20px;
            }
            .rank-item {
              padding: 14px 0;
              margin: 0;
              border-bottom: 1px dashed #ff7c56;
              .rank-left,
              .rank-right {
                .rank-class {
                  font-size: 16px;
                }
                .gitee-name {
                  padding-left: 10px;
                  font-size: 12px;
                }
              }
              .rank-right {
                .score {
                  font-size: 14px;
                }
                span {
                  padding-left: 6px;
                  font-size: 12px;
                }
              }
            }
          }
          .view-all {
            padding-top: 20px;
          }
        }
      }
    }
    #rule {
      .rule-title {
        padding: 60px 0 50px 0;
        img {
          width: 250px;
        }
      }
      .rule-content {
        padding: 32px 0 20px 0;
        height: 488px;
        background: url(/img/internship/rule-background.png) no-repeat;
        background-size: 100% 488px;
        .question {
          margin-bottom: 10px;
          font-size: 18px;
          color: #000000;
          line-height: 24px;
        }
        .answer {
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 24px;
        }
        .more-question {
          padding-top: 25px;
          font-size: 14px;
          color: #ff7c56;
          .this-post {
            font-size: 16px;
          }
        }
      }
    }
    @media (max-width: 1000px) {
      #rule {
        padding: 0 30px;
        .rule-title {
          img {
            width: 155px;
          }
        }
        .rule-border {
          border-radius: 8px;
          border: 5px solid #5dc8ff;
          border-top: 16px solid #5dc8ff;
          background-color: #5dc8ff;
        }
        .rule-content {
          border-radius: 8px;
          padding: 26px 15px;
          height: 100%;
          background: none;
          background-color: #eff9ff;
          .warper {
            padding: 0;
          }
          .question {
            margin-bottom: 6px;
            font-size: 16px;
            line-height: 22px;
          }
          .answer {
            margin-bottom: 6px;
            font-size: 12px;
            line-height: 22px;
          }
          .more-question {
            padding-top: 6px;
            font-size: 12px;
            .this-post {
              font-size: 14px;
            }
          }
        }
      }
    }
    #partner {
      .partner-title {
        padding: 60px 0 50px 0;
      }
      .img-list {
        display: flex;
        flex-wrap: wrap;
        img {
          cursor: pointer;
          margin: 0 24px 40px 0;
          width: 260px;
          height: 60px;
        }
        img:nth-of-type(4n) {
          margin-right: 0;
        }
        img:last-child {
          margin-bottom: 0;
        }
      }
      @media (max-width: 1000px) {
        .img-list {
          margin-bottom: 0;
          img {
            margin: 0 30px 20px 0;
            width: 142px;
            height: 33px;
          }
          img:nth-of-type(2n) {
            margin: 0 0 20px 0;
          }
          img:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    #help {
      .help-title {
        padding: 60px 0 50px 0;
      }
      .help-content {
        display: flex;
        justify-content: center;
        .help-left {
          padding-right: 57px;
          p {
            font-size: 20px;
            color: #000000;
            line-height: 40px;
            margin-bottom: 10px;
            a {
              font-size: 20px;
            }
          }
        }
        .help-right {
          img {
            width: 170px;
          }
        }
      }
      @media (max-width: 1000px) {
        .help-content {
          padding: 0 30px;
          flex-direction: column;
          .help-left {
            padding-right: 57px;
            p {
              font-size: 16px;
              color: #000000;
              line-height: 30px;
              margin-bottom: 10px;
              a {
                font-size: 20px;
              }
            }
          }
          .help-right {
            text-align: center;
            img {
              width: 170px;
            }
          }
        }
      }
    }
  }
}
</style>