<template>
    <div class="containter">
        <div class="banner" :style="{ background: 'url(/img/intership/banner-' + deviceText + ') no-repeat center' }">
            <div class="contain banner-info">
                <p>开源软件供应链点亮计划</p>
                <p>开源实习</p>
                <p class="gray-p">主办：中国科学院软件所、openEuler社区</p>
                <a href=""></a>
            </div>
        </div>
        <div class="contain desc-1">
            <p>开源软件供应链计划-开源实习（简称开源实习），是中国科学院软件所和openEuler社区共同发起的线上实习项目，旨在鼓励和引导在校学生积极参与开源社区，提升开源实践能力。由openEuler社区提供实习任务，实习期限为6个月，学生在实习期根据自己的兴趣和能力选择领取任务，社区导师提供辅导，每完成一个任务将获得相应积分，当满60积分时学生可获得总计工资4000元，满100分可获得总计工资8000元，并可获得实习证书。</p>
        </div>
        <div class="part-title">
            <h3>申请步骤
              <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
              <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
              <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
            </h3>
        </div>
        <div class="step-card contain">
            <div class="card-itemize">
                <div :class="['step-foot', curKey === 'apply' ? 'active' : '']" @click="swichTab('apply')">
                    <img src="/img/intership/1.png" alt="number-icon">
                    <p>申请实习</p>
                </div>
                <div :class="['step-foot', curKey === 'mission' ? 'active' : '']" @click="swichTab('mission')">
                    <img src="/img/intership/2.png" alt="number-icon">
                    <p>领取任务</p>
                </div>
                <div :class="['step-foot', curKey === 'submit' ? 'active' : '']" @click="swichTab('submit')">
                    <img src="/img/intership/3.png" alt="number-icon">
                    <p>提交任务</p>
                </div>
                <div :class="['step-foot', curKey === 'grant' ? 'active' : '']" @click="swichTab('grant')">
                    <img src="/img/intership/4.png" alt="number-icon">
                    <p>工资与证书发放</p>
                </div>
            </div>
            <div class="card-desc">
                <div :class="['card-content', 'apply', curKey === 'apply' ? 'active' : '']">
                    <div class="card-border">
                        <div :class="['content-desc','apply']">
                            <h5>申请实习</h5>
                            <p>（1）填写报名资料表。</p>
                            <p>（2）签署劳务协议书。</p>
                            <p>（3）提供学生证扫描件或其他学生身份证明材料。</p>
                            <div class="letter-2">
                                <p class="pad-10"><a href="">申请材料模板下载</a></p>
                                <p class="pad-10">将以上3份材料发送至开源实习官方邮箱
                                    <a href="mailto:intern@openeuler.io">intern@openeuler.io</a>
                                    。发送后等待审核，将以邮件反馈审核结果，审核通过后才可开始实习。
                                </p>
                                <p><span>实习资格申请邮件规范</span></p>
                                <p><span>邮件标题：</span></p>
                                <p>【开源实习资格申请】姓名+Gitee用户名</p>
                                <p><span>邮件内容：</span></p>
                                <ul>
                                    <li> · 报名资料表</li>
                                    <li> · 学生证扫描件或 <a href="">学信网</a>下载的学籍在线验证报告扫描件</li>
                                    <li> · 签署好的劳务协议书电子版</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="['card-content','mission', curKey === 'mission' ? 'active' : '']">
                    <div class="card-border">
                        <div :class="['content-desc','mission']">
                            <h5>领取任务</h5>
                            <p>（1）完成实习 <a class="dark-a" href="">测试任务</a></p>
                            <p>（2）正式领取任务，步骤：</p>
                            <div class="letter-2">
                                <ul>
                                    <li> · 在Gitee查看任务，找到你想做的任务issue。</li>
                                    <li> · 在任务issue下方评论区输入 <a href="">/intern-assign命令</a>，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。</li>
                                    <li> · 导师收到邮件后对申请人进行评审，在该任务issue评论下通过命令反馈结果，<a href="">/intern-approve</a> 代表审核通过，成功领取任务，可以开始进行任务处理；
                                        <a href="">/intern-unapprove</a> 代表领取失败，该学生可再去领取其他任务。</li>
                                    <li> · 如果领取后无法完成，可通过在issue下 <a href="">/intern-unassign</a>放弃任务。实习期6个月内仅有6次主动放弃的机会。</li>
                                  <p class="pad-10"><span>注意：</span>每个任务只能有一个人认领，每人一次只能认领一个任务，当上一个领取的任务完成并通过、或认领失败、或放弃认领的情况下才能领下一个任务。</p>
                                  <li class="pad-10"> · 输入<a href="">/intern-assign</a>命令后两周内没有发简历和方案给导师的，认领自动失效，任务被释放。</li>
                                </ul>
                                <p><a class="dark-a" href="">任务认领邮件模板下载</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="['card-content','submit', curKey === 'submit' ? 'active' : '']">
                    <div class="card-border">
                        <div :class="['content-desc','submit']">
                            <h5>提交任务</h5>
                            <ul>
                                <li> · 任务处理完成后，提交pr，并在pr描述里添加issue编号（#issue编号）；
                                    <p class="letter-2"> · 提交pr后在任务issue评论区输入 <a href="">/intern-completed 命令</a>，表示当前任务已提交，然后等待审核。</p>
                                </li>
                                <li> · 跟进导师和相关SIG maintainer审核PR，PR被合入则获得积分，issue自动关闭。</li>
                                <li> · 导师有不通过任务成果的权利，如学生提交的PR离实际所需太远，可选择输入 <a href="">命令/intern-fail</a>，不通过该任务，则无积分。</li>
                            </ul>
                            <div class="card-chart">
                                <div class="line">
                                    <div class="row-1 row">
                                        <p class="title alone">查看任务</p>
                                    </div>
                                    <div class="row-2 row">
                                        <p class="title">认领任务</p>
                                        <p class="desc">学生输入 <a href="">/intern-assign</a></p>
                                    </div>
                                    <div class="row-3 row">
                                        <p class="title">筛选通过</p>
                                        <p class="desc">导师输入 <a href="">/intern-approve</a></p>
                                    </div>
                                    <div class="row-4 row">
                                        <p class="title alone">处理任务</p>
                                    </div>
                                    <div class="row-5 row">
                                        <p class="title">提交任务 pr 后</p>
                                        <p class="desc">学生输入 <a href="">/intern-assign</a></p>
                                    </div>
                                    <div class="row-6 row">
                                        <p class="title alone">PR合入</p>
                                    </div>
                                    <div class="row-7 row">
                                        <p class="title">获得积分</p>
                                        <p class="close">Issue关闭</p>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="row-1"></div>
                                    <div class="row-2 row">
                                        <p class="title alone">继续申请其他任务</p>
                                    </div>
                                    <div class="row-3 row">
                                        <p class="title">提交任务 pr 后</p>
                                        <p class="desc">学生输入 <a href="">/intern-assign</a></p>
                                    </div>
                                    <div class="row-4"></div>
                                    <div class="row-5 row">
                                        <p class="title">筛选未通过</p>
                                        <p class="desc">导师输入 <a href="">/intern-unapprove</a></p>
                                    </div>
                                    <div class="row-8 row">
                                        <p class="title">PR 不合格未合入</p>
                                        <p class="desc">导师输入 <a href="">/intern-fail</a></p>
                                    </div>
                                    <div class="row-9 row">
                                        <p class="title">无积分</p>
                                        <p class="close">任务被释放，给其他人认领</p>
                                    </div>
                                </div>
                                <div class="arrow">
                                  <img src="/img/intership/arrow1.png" alt="arrow line">
                                  <img src="/img/intership/arrow1.png" alt="arrow line">
                                  <img src="/img/intership/arrow1.png" alt="arrow line">
                                  <img src="/img/intership/arrow1.png" alt="arrow line">
                                  <img src="/img/intership/arrow2.png" alt="arrow line">
                                  <img src="/img/intership/arrow2.png" alt="arrow line">
                                  <img src="/img/intership/arrow2.png" alt="arrow line">
                                  <img src="/img/intership/arrow3.png" alt="arrow line">
                                  <img src="/img/intership/arrow5.png" alt="arrow line">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="['card-content','grant', curKey === 'grant' ? 'active' : '']">
                    <div class="card-border">
                        <div :class="['content-desc','grant']">
                            <h5>工资与证书发放</h5>
                            <p>（1）在实习有效期6个月内，积分满60分时，经核实后，将发放实习工资4000元；满100分时，经核实后，将继续发放实习工资4000元。</p>
                            <p>（2）证书申请：在实习有效期6个月内满60分即可开具实习证书，如需开具实习证书，发送邮件给实习官方邮箱 <a class="dark-a" href="mailto:intern@openeuler.io">intern@openeuler.io </a>提出申请。</p>
                            <div class="letter-2">
                                <p>证书开具后视为实习结束，不再计算实习工资。</p>
                                <p><a class="dark-a" href="">证书申请材料和邮件模板下载</a></p>
                           </div>
                        </div>
                    </div>
                </div>
                <img class="task-icon" src="/img/intership/step-bg.png" alt="task-icon">
            </div>
        </div>
        <div class="step-card-h5 contain">
          <div class="step-h5-box">
            <p class="step-title">申请实习</p>
            <div class="inner-card">
              <p>（1）填写报名资料表。</p>
              <p>（2）签署劳务协议书。</p>
              <p>（3）提供学生证扫描件或其他学生身份证明材料。</p>
              <p class="letter-2">将以上3份材料发送至开源实习官方邮箱
                <a class="dark-a" href="mailto:intern@openeuler.io">intern@openeuler.io</a>
                。发送后等待审核，将以邮件反馈审核结果，审核通过后才可开始实习。
              </p>
              <p><a href="" class="dark-a letter-2">申请材料模板下载</a></p>
            </div>
            <img class="card-bg" src="/img/intership/1-h5.png" alt="ranking">
          </div>
          <div class="step-h5-box">
            <p class="step-title">领取任务</p>
            <div class="inner-card">
              <p>（1）完成实习 <a class="dark-a" href="">测试任务</a></p>
              <p>（2）正式领取任务，步骤：</p>
              <div class="letter-2">
                <ul>
                  <li> · 在Gitee查看任务，找到你想做的任务issue。</li>
                  <li> · 在任务issue下方评论区输入 <a href="">/intern-assign命令</a>，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。</li>
                  <li> · 导师收到邮件后对申请人进行评审，在该任务issue评论下通过命令反馈结果，<a href="">/intern-approve</a> 代表审核通过，成功领取任务，可以开始进行任务处理；
                    <a href="">/intern-unapprove</a> 代表领取失败，该学生可再去领取其他任务。</li>
                  <li> · 如果领取后无法完成，可通过在issue下 <a href="">/intern-unassign</a>放弃任务。实习期6个月内仅有6次主动放弃的机会。</li>
                  <p class="pad-10"><span>注意：</span>每个任务只能有一个人认领，每人一次只能认领一个任务，当上一个领取的任务完成并通过、或认领失败、或放弃认领的情况下才能领下一个任务。</p>
                  <li class="pad-10"> · 输入<a href="">/intern-assign</a>命令后两周内没有发简历和方案给导师的，认领自动失效，任务被释放。</li>
                </ul>
                <p><a class="dark-a" href="">任务认领邮件模板下载</a></p>
              </div>
            </div>
            <img class="card-bg" src="/img/intership/2-h5.png" alt="ranking">
          </div>

          <div class="step-h5-box">
            <p class="step-title">提交任务 </p>
            <div class="inner-card">
              <ul>
                <li> · 任务处理完成后，提交pr，并在pr描述里添加issue编号（#issue编号）；
                  <p class="letter-2"> · 提交pr后在任务issue评论区输入 <a href="">/intern-completed 命令</a>，表示当前任务已提交，然后等待审核。</p>
                </li>
                <li> · 跟进导师和相关SIG maintainer审核PR，PR被合入则获得积分，issue自动关闭。</li>
                <li> · 导师有不通过任务成果的权利，如学生提交的PR离实际所需太远，可选择输入 <a href="">命令/intern-fail</a>，不通过该任务，则无积分。</li>
              </ul>
              <div>
                <img src="/img/intership/task.png" alt="ranking">
              </div>
            </div>
            <img class="card-bg" src="/img/intership/3-h5.png" alt="ranking">
          </div>

          <div class="step-h5-box">
            <p class="step-title">工资与证书发放</p>
            <div class="inner-card">
              <p>（1）在实习有效期6个月内，积分满60分时，经核实后，将发放实习工资4000元；满100分时，经核实后，将继续发放实习工资4000元。</p>
              <p>（2）证书申请：在实习有效期6个月内满60分即可开具实习证书，如需开具实习证书，发送邮件给实习官方邮箱 <a class="dark-a" href="mailto:intern@openeuler.io">intern@openeuler.io </a>提出申请。</p>
              <div class="letter-2">
                <p><span>注意：</span>证书开具后视为实习结束，不再计算实习工资。</p>
                <p><a class="dark-a" href="">证书申请材料和邮件模板下载</a></p>
              </div>
            </div>
            <img class="card-bg" src="/img/intership/4-h5.png" alt="ranking">
          </div>

        </div>
        <div class="part-title">
        <h3>实习任务
          <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
          <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
          <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
        </h3>
      </div>
        <div class="task-card contain">
          <p class="desc-2">SIG（Special Interest Group）是openEuler社区的组织形式，点击你感兴趣的SIG，查看相关实习任务。</p>
          <div class="task-item" v-for="(item, index) in i18n.intership.MISSION_CARD" :key="index">
            <p class="title">{{ item.NAME }}</p>
            <p>{{ item.DESC }}</p>
            <p class="btn"><a class="task-btn" :href=item.TASK_LIKN target="_blank">实习任务</a><a class="gitee-link" :href=item.GITEE target="_blank">Gitee主页</a>
              <img src="/img/intership/gitee-arrow.svg" alt="gitee-icon"></p>
          </div>
        </div>
        <div class="part-title">
        <h3>积分展示
          <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
          <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
          <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
        </h3>
        </div>
        <div class="integral-card contain">
          <div class="inner-card">
            <h5>积分与奖励</h5>
            <p>
              <span><img src="/img/intership/dot.svg" alt="dot-icon"></span>
              <span>实习有效期6个月内满60分，实习工资总计4000元，可申请实习证书。</span>
            </p>
            <p>
              <span><img src="/img/intership/dot.svg" alt="dot-icon"></span>
              <span>实习有效期6个月内满100分，实习工资总计8000元，可申请实习证书。</span>
            </p>
            <p>
              <span><img src="/img/intership/dot.svg" alt="dot-icon"></span>
              <span>一年内累计积分满150分，获得openEuler社区高校开发者“开源之星”荣誉。</span>
            </p>
            <h6>“开源之星”荣誉权益：</h6>
            <p>
              <span><img src="/img/intership/star.svg" alt="star-icon"></span>
              <span>获得openEuler社区颁发的“开源之星”徽章</span>
            </p>
            <p>
              <span><img src="/img/intership/star.svg" alt="star-icon"></span>
              <span>将作为高校贡献者在openEuler官网长期展示，获得社区官方渠道的宣传报道</span>
            </p>
            <p>
              <span><img src="/img/intership/star.svg" alt="star-icon"></span>
              <span>获得一次受邀参与openEuler年度峰会的机会（包行程住宿）</span>
            </p>
          </div>
          <img class="card-bg" src="/img/intership/wave.svg" alt="wave-icon">
        </div>
        <div class="rank contain">
          <h3 :style="{background: 'url(/img/intership/rank-' + deviceText + ')'}">积分排行</h3>
          <div class="rank-card">
            <div class="top">
              <div class="top-two ahead">
                  <p>{{ topTwo.name }}</p>
                  <p><span>{{ topTwo.score }}</span> 积分</p>
                  <p class="rank-prize">第二名</p>
              </div>
              <div class="top-one ahead">
                <p>{{  topOne.name }}</p>
                <p><span>{{  topOne.score }}</span> 积分</p>
                <p class="rank-prize">第一名</p>
              </div>
              <div class="top-three ahead">
                <p>{{  topThree.name }}</p>
                <p><span>{{ topThree.score }}</span> 积分</p>
                <p class="rank-prize">第三名</p>
              </div>
            </div>
            <div class="list">
              <ul>
                  <li v-for="(item, index) of rankData.slice(3, 10)" :key="index">
                      <div class="num">{{ (index + 4) >= 10 ? (index + 4) : '0' + (index + 4) }}</div>
                      <div class="name">{{ index }}</div>
                      <div class="sorce">{{item.integralValue}}</div>
                      <div>积分</div>
                  </li>
                <template v-if="rankData.length > 10">
                  <li v-if="showAll"  v-for="(item, index) of rankData.slice(10)">
                      <div class="num">{{ index + 11 }}</div>
                      <div class="name">{{ item.GiteeId }}</div>
                      <div class="sorce">{{item.integralValue}}</div>
                      <div>积分</div>
                  </li>
                </template>
              </ul>
              <div class="see-more"><a @click="showAllData"> {{ seeMore }} </a></div>
            </div>
          </div>
        </div>
        <div class="part-title faq">
        <h3>实习规则FAQ
          <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
          <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
          <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
        </h3>
      </div>
        <div class="qa-card">
          <div class="qa-item contain">
            <p class="question">1、哪些人可以报名？</p>
            <p class="answer">A：开源实习面向全国范围内全日制/非全日制在校学生招募，无专业年级限制，欢迎感兴趣的同学踊跃报名。</p>
          </div>
          <div class="qa-item contain">
            <p class="question">2、劳务协议签署的时间为6个月，必须要6个月都在社区做任务吗？</p>
            <p class="answer">A：不用，线上实习时间管理相对自由，协议期6个月内满60分或者100分即可申请领取实习证书和实习工资。协议期6个月内未满60分则不能领取证书和工资。</p>
          </div>
          <div class="qa-item contain">
            <p class="question">3、超过了6个月或者完成了100积分还能继续在社区做任务吗？</p>
            <p class="answer">A：可以，但积分不能再用于领取证书和奖金，一年内累计到150积分可获得openEuler社区高校“开源之星”荣誉。 </p>
          </div>
          <div class="qa-item contain">
            <p class="question">4、任务领取成功后不能完成可以放弃吗？</p>
            <p class="answer">A：在实习期内有3次放弃任务的机会，在任务issue评论下输入/intern-unassign命令即为放弃任务。超过3次放弃则不能再领取任务。</p>
          </div>
          <div class="qa-item contain">
            <p class="question">5、实习证书有公司盖章吗？</p>
            <p class="answer">A：开源实习的证书与正式实习证书一样，将加盖公章。将由“中国科学院软件所-人力资源处”盖章。</p>
          </div>
          <p class="note contain">更多问题，请移步<a href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4AJIR?from=project-issue" target="_blank">本帖</a>评论区提问。</p>
        </div>
        <div class="part-title">
        <h3>合作伙伴
          <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
          <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
          <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
        </h3>
      </div>
        <div class="partner contain">
          <div class="line">
            <a href="https://www.kylinos.cn/" target="_blank"><img :src="'/img/intership/qiling-' + deviceText" alt="circle-icon"></a>
            <a href="https://www.uniontech.com/" target="_blank"><img :src="'/img/intership/tongxin-' + deviceText" alt="circle-icon"></a>
            <a href="http://www.kylinsec.com.cn/" target="_blank"><img :src="'/img/intership/kylinsec-' + deviceText" alt="circle-icon"></a>
            <a href="https://mindspore.cn/" target="_blank"><img :src="'/img/intership/mindspore-' + deviceText" alt="circle-icon"></a>
            <a href="https://www.openeuler.org/zh/" target="_blank"><img :src="'/img/intership/openeuler-' + deviceText" alt="circle-icon"></a>
            <a href="https://opengauss.org/zh/" target="_blank"><img :src="'/img/intership/opengauss-' + deviceText" alt="circle-icon"></a>
            <a href="https://openlookeng.io/zh-cn/" target="_blank"><img :src="'/img/intership/openlookeng-' + deviceText" alt="circle-icon"></a>
          </div>
        </div>
        <div class="part-title">
          <h3>帮助咨询
            <span class="circle"><img :src="'/img/intership/circle-' + deviceText" alt="circle-icon"></span>
            <span class="half-circle"><img :src="'/img/intership/half-circle-' + deviceText" alt="half-circle-icon"></span>
            <span class="line"><img :src="'/img/intership/line-' + deviceText" alt="line-icon"></span>
          </h3>
        </div>
        <div class="help contain">
        <div class="help-info">
          <div class="info-desc">
            <p>联系邮箱：<a href="mailto:contact@openeuler.io">contact@openeuler.io</a></p>
            <p>扫码加入“开源实习”学生QQ群，更多问题群内咨询。</p>
            <p>群号：458603235</p>
          </div>
          <div class="info-qr">
            <img src="/img/intership/qrcode.png" alt="QR-code">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getGiteeJson} from "./../../api/common";
import { rankList, students, tutors, points } from "../../api/intership";
let that = null;
let remoteMethods = {
  rankList () {
    rankList(that.rankRes)
        .then(data => {
          if (data.code === 200) {
            that.rankData = data.UserPoints
            that.filterTopthree(data.UserPoints)
            that.topTwo = {}
          } else{
            that.$message.error(data.message);
          }
        })
        .catch(data => {
          that.$message.error(data);
        });
  }
}
export default {
    data() {
        that = this;
        return {
            deviceText: '',
            curKey: 'apply',
            rankData: [{
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              },
              {
                userID: "giteeID",
                UserPoints: "1110"
              }],
            topOne: {},
            topTwo: {},
            topThree: {},
            showAll: false,
            seeMore: "查看全部 >",
            rankRes: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjg2NjY1NDAsImlhdCI6MTYyODA2MTc0MCwiaXNzIjoiMTI3LjAuMC4xIiwic3ViIjoidXNlciB0b2tlbiJ9.odlznwL_dYF_h63F6Tc5-PPQD5kfOvfd81ZqwwbqxCQ',
              currentPage: 1,
              pageSize: 10
            }
        };
    },
    methods: {
        go(link) {
            if (link == '') {
                return false;
            } else {
                window.open(link);
            }
        },
        swichTab(str) {
            this.curKey = str;
            console.log('into tab', str);
        },
        showAllData() {
            this.showAll = !this.showAll;
            if (this.showAll === false) {
              this.seeMore = "查看全部 > "
            } else {
              this.seeMore = "点击收起 > "
            }
        },
      filterTopthree(data) {
        let rank = ['topOne', 'topTwo', 'topThree']
        for (let i = 0; i < 3; i++) {
          let d = data[i]
          let k = rank[i]
          this[k] = {
            name: d.GiteeId,
            score: d.integralValue
          }
        }
      }
    },
    mounted: function() {
      this.deviceText = this.isShowH5 ? 'h5.png' : 'pc.png';
      remoteMethods.rankList()
    }
};
</script>

<style lang="less" scoped>
.containter{
    margin: 0 auto 100px;
    text-align: center;
    @media screen and (max-width: 1000px) {
      margin: 0 auto 40px;
    }
    .banner {
        margin: 0 auto 60px;
        height: 380px;
        @media screen and (max-width: 1000px) {
            width: 375px;
            height: 300px;
            margin-bottom: 40px;
        }
    }

}
.containter p{
    text-align: left;
    font-size: 20px;
    line-height: 40px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
}
.contain{
    width: 1120px;
    margin: 0 auto;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 0 30px;
  }
}
.banner-info{
    padding-top: 66px;
    p{
        font-size: 40px;
        margin-top: 30px;
    }
    .gray-p {
        margin: 16px 0;
        color: rgba(0, 0, 0, 0.5);
    }
    a {
        display: block;
        width: 184px;
        height: 67px;
        background: url(/img/intership/mission-btn.png);
    }
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.part-title h3{
    width: 150px;
    margin: 67px auto 0;
    font-size: 30px;
    position: relative;
    span{
        position: absolute;
    }
    .circle {
        left: -15px;
        top: 18px;
        z-index: -1;
    }
    .half-circle {
        right: -13px;
        top: -9px;
        z-index: -1;
    }
    .line {
        right: 39px;
        top: 27px;
    }
  @media screen and (max-width: 1000px) {
    width: 72px;
    margin-top: 30px;
    font-size: 18px;
    .circle {
      left: -19px;
      top: 9px;
    }
    .line {
      right: 9px;
      top: 14px;
    }
  }
}
.part-title.faq h3{
  width: 180px;
  @media screen and (max-width: 1000px) {
    width: 114px;
  }
}
.step-card{
  .card-itemize{
    display: flex;
    margin-top: 70px;
    .step-foot{
      width: 280px;
      height: 160px;
      background: #5DC8FF;
      padding-top: 20px;
      p{
        text-align: center;
        color: #fff;
      }
    }
    .step-foot.active {
      background: url(/img/intership/active-card.png);
      height: 180px;
      position: relative;
      top: -20px;
    }
    :first-child{
      border-radius: 8px 0px 0px 0px;
    }
    :last-child{
      border-radius: 0px 8px 0px 0px;
    }
  }
  .card-desc {
    position: relative;
    height: 410px;
    .card-content{
      position: absolute;
      display: none;
      left: 0;
      width: 100%;
      background: #2E9AFE;
      margin-top: -20px;
      border-radius: 0px 0px 8px 8px;
      .card-border{
        width: 1110px;
        margin: 16px 5px 5px;
        background: #fff;
        opacity: 0.84;
        border-radius: 0px 0px 8px 8px;
        .content-desc{
          min-height: 380px;
          padding: 1px 32px 16px;
          h5{
            margin: 16px 0 10px;
            text-align: left;
            font-size: 18px;
            line-height: 24px;
          }
          p{
            font-size: 14px;
            line-height: 24px;
            color: rgba(0, 0, 0, 0.5);
            margin: 0;
            span{
              color: #000;
            }
          }
          ul{
            padding: 0;
            li{
              text-align: left;
              font-size: 14px;
              line-height: 24px;
              color: rgba(0, 0, 0, 0.5);
            }
          }
          a{
            color: #2E9AFE;
            text-decoration: none;
          }
          .dark-a{
            color: #002FA7;
          }
          .pad-10{
            margin: 10px 0;
          }
          .letter-2{
            margin-left: 2em;
          }
          .card-chart {
            position: relative;
            .line{
              display: flex;
              .row{
                height: 64px;
                background: #f3f9fe;
                border: 1px solid rgba(46, 154, 254, 0.7);
                p{
                  padding: 0;
                  margin: 0;
                  color: #000;
                  text-align: center;
                }
                .title{
                  margin-top: 8px;
                }
                .alone{
                  margin-top: 0;
                  line-height: 64px;
                }
                .desc{
                  font-size: 12px;
                }
                .close{
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.5);
                }
              }
              .row-1 {
                width: 72px;
              }
              .row-2{
                width: 160px;
                margin-left: 11px;
              }
              .row-3{
                width: 171px;
                margin-left: 29px;
              }
              .row-4{
                width: 72px;
                margin-left: 10px;
              }
              .row-5{
                width: 175px;
                margin-left: 30px;
              }
              .row-6{
                width: 66px;
                margin-left: 30px;
              }
              .row-7{
                width: 73px;
                margin-left: 10px;
              }
              .row-8{
                width: 128px;
                margin-left: 30px;
              }
              .row-9{
                width: 148px;
                margin-left: 10px;
              }
            }
            .line:nth-child(2){
              margin-top: 60px;
            }
            .arrow{
              position: absolute;
              top: 0;
              img:nth-child(1){
                position: absolute;
                top: 28px;
                left: 73px;
              }
              img:nth-child(2){
                position: absolute;
                top: 28px;
                left: 826px;
              }
              img:nth-child(3){
                position: absolute;
                top: 153px;
                left: 888px;
              }
              img:nth-child(4){
                position: absolute;
                top: 28px;
                left: 443px;
              }
              img:nth-child(5){
                position: absolute;
                top: 28px;
                left: 243px;
              }
              img:nth-child(6){
                position: absolute;
                top: 28px;
                left: 525px;
              }
              img:nth-child(7){
                position: absolute;
                top: 28px;
                left: 730px;
              }
              img:nth-child(8){
                position: absolute;
                top: 187px;
                left: 157px;
              }
              img:nth-child(9){
                position: absolute;
                top: 71px;
                left: 157px;
              }
            }
          }
        }
        .container.grant{
          .letter-2{
            margin-top: 10px;
          }
        }
      }
    }
    .card-content.active{
      display: block;
    }
    .task-icon {
      position: absolute;
      top: -20px;
      right: 22px;
      z-index: 0;
    }
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.step-card-h5{
  display: none;
  margin-top: 30px;
  @media screen and (max-width: 1000px) {
    display: block;
    .step-title{
      font-size: 16px;
      color: #fff;
      line-height: unset;
      margin: 0 0 12px 60px;
    }
    .step-h5-box{
      width: unset;
      margin-top: 20px;
      background: #2E9AFE;
      border-radius: 8px;
      padding: 15px 5px 5px;
      position: relative;
      .inner-card{
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        h5{
          font-size: 18px;
          color: #000;
          text-align: left;
          margin: 10px 0 6px;
        }
        p{
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 24px;
          .dark-a{
            color: #002FA7;
            text-decoration: none;
          }
          span{
            color: #000;
          }
          img{
            margin-right: 8px;
            vertical-align: middle;
          }
        }
        ul{
          padding: 0;
          li{
            text-align: left;
            font-size: 12px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.5);
            a{
              color: #2E9AFE;
              text-decoration: none;
            }
          }
        }
      }
      .card-bg{
        position: absolute;
        left: 0;
        top: 0;
      }
      .letter-2{
        margin-left: 2em;
        margin-top: 6px;
      }
    }
  }
}
.task-card{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .desc-2{
    margin: 24px 0 30px 0;
  }
  .task-item{
    width: 261px;
    height: 218px;
    margin-top: 25px;
    padding: 24px 20px;
    border-radius: 8px;
    box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
    position: relative;
    p{
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.5);
    }
    .title{
      font-size: 20px;
      color: #002FA7;
      line-height: 28px;
      margin-bottom: 8px;
    }
    .btn{
      position: absolute;
      bottom: 24px;
      line-height: 40px;
      .task-btn{
        margin-right: 24px;
        display: inline-block;
        width: 88px;
        height: 40px;
        font-size: 16px;
        background: #002FA7;
        text-align: center;
        color: #fff;
        text-decoration: none;
      }
      .gitee-link{
        color: #002FA7;
        font-size: 16px;
        margin-right: 6px;
        text-decoration: none;
      }
      img{
        vertical-align: sub;
      }
    }
    @media screen and (max-width: 1000px) {
      width: 100%;
      :first-child{
        margin-top: 0;
      }
    }
  }
}
.integral-card{
  margin-top: 60px;
  background: #5877FF;
  border-radius: 8px;
  padding: 16px 5px 5px;
  position: relative;
  .inner-card{
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    h5{
      font-size: 18px;
      color: #000;
      text-align: left;
      margin: 10px 0 6px;
    }
    h6{
      font-size: 14px;
      margin: 10px 0;
      text-align: left;
    }
    p{
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
      img{
        margin-right: 8px;
        vertical-align: middle;
      }
    }
  }
  .card-bg{
    position: absolute;
    right: 0;
    bottom: 0;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  @media screen and (max-width: 1000px) {
    margin: 30px auto 0;
    width: 315px;
    p{
      display: flex;
      align-content: flex-start;
    }
  }
}
.rank{
  h3{
    height: 80px;
    width: 374px;
    margin: 25px auto 0;
    line-height: 80px;
    font-size: 28px;
    color: #fff;
    @media screen and (max-width: 1000px) {
      width: 109px;
      height: 48px;
      font-size: 18px;
      line-height: 48px;
    }
  }
  .rank-card{
    border: 5px solid #FF7C56;
    border-top: 16px solid #FF7C56;
    background: #fff2ee;
    .top{
      display: flex;
      justify-content: center;
      align-content: flex-end;
      p{
        font-size: 14px;
        text-align: center;
        color: rgba(0, 0, 0, 0.5);
        span{
          font-size: 18px;
          color: #FF644E
        }
      }
      .ahead{
        width: 170px;
        .rank-prize{
          font-size: 24px;
          color: #fff;
          border: 1px solid #A4E1FF;
          @media screen and (max-width: 1000px) {
            font-size: 16px;
          }
        }
      }
      .top-two{
        margin-top: 68px;
        @media screen and (max-width: 1000px) {
          margin-top: 45px;
        }
        .rank-prize{
          height: 66px;
          line-height: 66px;
          background: #5DC8FF;
          @media screen and (max-width: 1000px) {
            height: 60px;
            line-height: 60px;
          }
        }
      }
      .top-one{
        margin-top: 30px;
        @media screen and (max-width: 1000px) {
          margin-top: 20px;
        }
        .rank-prize{
          height: 104px;
          line-height: 104px;
          background: #FF7C56;
          @media screen and (max-width: 1000px) {
            height: 85px;
            line-height: 85px;
          }
        }
      }
      .top-three{
        margin-top: 86px;
        @media screen and (max-width: 1000px) {
          margin-top: 65px;
        }
        .rank-prize{
          height: 48px;
          line-height: 48px;
          background: #2E9AFE;
          @media screen and (max-width: 1000px) {
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
    .list{
      width: 530px;
      margin: 30px auto 0;
      ul{
        li{
          height: 56px;
          border-top: 1px dashed #FF7C56;
          text-align: left;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          display: flex;
          div{
            margin-top: 20px;
          }
          .num,
          .sorce {
            font-size: 24px;
            color: #FF7C56;
            width: 50px;
            margin-top: 16px;
            @media screen and (max-width: 1000px) {
              font-size: 16px;
              width: 40px;
              margin-top: 20px;
            }
          }
          .name{
            width: 370px;
            @media screen and (max-width: 1000px) {
              width: 150px;
            }
          }
          .sorce{
            width: 80px;
            @media screen and (max-width: 1000px) {
              width: 45px;
            }
          }
        }
        li:last-child{
          border-bottom: 1px dashed #FF7C56;
        }
      }
      .see-more{
        margin: 25px 0;
        a{
          color: #002FA7;
          text-decoration: none;
        }
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
    @media screen and (max-width: 1000px) {
      padding: 0 15px;
    }
  }
}
.qa-card{
  border: 5px solid #5DC8FF;
  border-top: 16px solid #5DC8FF;
  background: #eff9ff;
  padding: 16px 0;
  margin-top: 60px;
  .qa-item{
    .question{
      font-size: 18px;
      color: #000;
      line-height: 24px;
      margin: 10px 0;
      @media screen and (max-width: 1000px) {
        font-size: 16px;
        line-height: 22px;
        margin: 10px 0 6px;
      }
    }
    .answer{
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
      @media screen and (max-width: 1000px) {
        font-size: 12px;
        line-height: 22px;
      }
    }
  }
  .qa-item.contain{
    padding: 0;
  }
  .note{
    font-size: 14px;
    margin-top: 20px;
    a{
      color: #002FA7;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 1000px) {
    margin: 30px 30px 0;
    padding: 0 10px;
  }
}
.partner{
  margin-top: 60px;
  @media screen and (max-width: 1000px) {
    margin-top: -40px;
  }
  .line{
    text-align: left;
    margin-top: 40px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    a{
      margin-top: 40px;
      @media screen and (max-width: 1000px) {
        img{
          width: 142px;
        }
      }
    }
  }
}
.help{
  .help-info{
    width: 700px;
    margin: 60px auto 0;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
     width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      line-height: 30px;
      margin-top: 30px;
    }
    .info-desc{
      padding-top: 20px;
      margin-bottom: 10px;
      @media screen and (max-width: 1000px) {
        padding-top: 0;
      }
      a{
        color: #002FA7;
        text-decoration: none;
      }
    }
  }
}
</style>