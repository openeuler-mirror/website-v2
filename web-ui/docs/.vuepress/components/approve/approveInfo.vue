<template>
  <div class="approveInfo-box">
    <div class="banner">
      <div class="breadcrumb" @click="toApprove">{{ i18n.approve.TITLE }} \</div>
      <div class="banner-title">
        {{ i18n.approve.SUBTITLE_REPORT }}
      </div>
    </div>
    <div class="assess-content">
      <div class="title">{{ i18n.approve.ASSESS_LIST.ASSESS_INFO }}</div>
      <div class="content">
        <div class="content-box">
          <div class="content-name">
              <p>{{ i18n.approve.ASSESS_LIST.OSV }}</p>
              <p>{{i18n.approve.ASSESS_LIST.ARCHITECTURE}}</p>
              <p>{{i18n.approve.ASSESS_LIST.PUBLISH_ADDRESS}}</p>
              <p>{{i18n.approve.ASSESS_LIST.CHECKSUM}}</p>
              <p>{{i18n.approve.ASSESS_LIST.OPENEULER_EDITION}}</p>
          </div>
          <div class="content-text">
              <p>{{reportData.os_version}}</p>
              <p>{{reportData.arch}}</p>
              <p>
                  <a class="link-item" :href="reportData.os_download_link" target="_blank">
                    {{reportData.os_download_link}}
                  </a>
              </p>
              <p>{{reportData.checksum}}</p>
              <p>{{reportData.base_openeuler_version}}</p>
          </div>
        </div>
        <div class="claim-box">
          <div class="top">
            <div class="title-claim" v-if="reportData.total_result == 'pass'">
              <img src="/img/approve/adopt.png" alt="" />
              <div class="claim-text">{{ i18n.approve.ADOPT }}</div>
            </div>
            <div class="title-claim" v-else >
              <img src="/img/approve/fail.png" alt="">
              <div class="claim-text">{{i18n.approve.FAIL}}</div>
            </div>
            <div class="subtitle-claim">
              {{ i18n.approve.ASSESS_LIST.COMPATIBLE }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tool-content">
      <div class="title">{{ i18n.approve.TOOL_LIST.TOOL_DETECT }}</div>
      <div class="table-pc">
        <el-table :data="reportData.tools_result" stripe style="width: 100%">
          <el-table-column
            prop="naskName"
            :label="i18n.approve.TOOL_LIST.TEST_ITEM"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="describe"
            :label="i18n.approve.TOOL_LIST.DETECTION_DESC"
            width="550"
          ></el-table-column>
          <el-table-column
            prop="percent"
            :label="i18n.approve.TOOL_LIST.TEST_RESULT"
            width="178"
          ></el-table-column>
          <el-table-column
            prop="result"
            :label="i18n.approve.TOOL_LIST.CONCLUSION"
            width=""
          >
            <template slot-scope="scope">
              <div v-if="scope.row.result == 'pass'" class="table-result">
                <img src="/img/approve/adopt.png" alt="">
                <span>{{ i18n.approve.ADOPT }}</span>
              </div>
              <div v-else  class="table-result">
                <img src="/img/approve/fail.png" alt="">
                <span>{{ i18n.approve.FAIL }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="platform-content">
      <div class="title">{{ i18n.approve.PLATFORM_LIST.PLATFORM_VERIFY }}</div>
      <div class="table-pc">
        <el-table :data="reportData.platform_result" stripe style="width: 100%">
          <el-table-column
            prop="naskName"
            :label="i18n.approve.TOOL_LIST.TEST_ITEM"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="describe"
            :label="i18n.approve.TOOL_LIST.DETECTION_DESC"
            width="550"
          ></el-table-column>
          <el-table-column
            prop="percent"
            :label="i18n.approve.TOOL_LIST.TEST_RESULT"
            width="178"
          ></el-table-column>
          <el-table-column
            prop="result"
            :label="i18n.approve.TOOL_LIST.CONCLUSION"
            width=""
          >
            <template slot-scope="scope">
              <div v-if="scope.row.result == 'pass'" class="table-result">
                <img src="/img/approve/adopt.png" alt="">
                <span>{{ i18n.approve.ADOPT }}</span>
              </div>
              <div v-else  class="table-result">
                <img src="/img/approve/fail.png" alt="">
                <span>{{ i18n.approve.FAIL }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getApproveReport, osvData } from "../../api/approve";

let that = null;
const locationMethods = {
  getApproveInfo(id) {
    getApproveReport({ id: id }).then((response) => {
      if (response) {
        that.tableLoading = false;
        if (response) {
          that.detailList = response;
          console.log(response);
        }
      }
    });
  },
};
export default {
  data() {
    that = this;
    return {
      reportData: {},
      tableData: [],
      detailList: [],
      total: 1,
      version: ''
    };
  },
  methods:{
    //跳转osv认证列表页
    toApprove() {
      this.$router.push({
        path: this.resolvePath("/approve/"),
      });
    },
  },
  mounted() {
    // locationMethods.getApproveInfo(10204);
    this.reportData.platform_result.map(ele=>{
          switch(ele.name){
              case 'repo': ele.describe = this.i18n.approve.PLATFORM_DESCRIBE.REPO;
                           ele.naskName = this.i18n.approve.PLATFORM_NAME.REPO;break;
              case 'base_test': ele.describe = this.i18n.approve.PLATFORM_DESCRIBE.BASE;
                                ele.naskName = this.i18n.approve.PLATFORM_NAME.BASE;break;
              case 'performance_test': ele.describe = this.i18n.approve.PLATFORM_DESCRIBE.PERFORMANCE;
                                       ele.naskName = this.i18n.approve.PLATFORM_NAME.PERFORMANCE;break;
              case 'running_config': ele.describe = this.i18n.approve.PLATFORM_DESCRIBE.RUNNING;
                                     ele.naskName = this.i18n.approve.PLATFORM_NAME.RUNNING;break;
          }
      });
      this.reportData.tools_result.map(ele=>{
          switch(ele.name){
              case 'core_pkg': ele.describe = this.i18n.approve.TOOL_DESCRIBE.CORE_PKG;
                               ele.naskName = this.i18n.approve.TOOL_NAME.CORE_PKG; break;
              case 'soft_pkg': ele.describe = this.i18n.approve.TOOL_DESCRIBE.SOFT_PKG;
                               ele.naskName = this.i18n.approve.TOOL_NAME.SOFT_PKG; break;
              case 'KABI': ele.describe = this.i18n.approve.TOOL_DESCRIBE.KABI;
                           ele.naskName = this.i18n.approve.TOOL_NAME.KABI; break;
              case 'ABI': ele.describe = this.i18n.approve.TOOL_DESCRIBE.ABI;
                          ele.naskName = this.i18n.approve.TOOL_NAME.ABI; break;
              case 'service_config': ele.describe = this.i18n.approve.TOOL_DESCRIBE.SERVICE;
                                     ele.naskName = this.i18n.approve.TOOL_NAME.SERVICE; break;
              case 'soft_config': ele.describe = this.i18n.approve.TOOL_DESCRIBE.SOFT_CONFIG;
                                  ele.naskName = this.i18n.approve.TOOL_NAME.SOFT_CONFIG; break;
              case 'kernel_config': ele.describe = this.i18n.approve.TOOL_DESCRIBE.KARNEL_CONFIG;
                                    ele.naskName = this.i18n.approve.TOOL_NAME.KARNEL_CONFIG; break;
          }
      });
  },
  created() {
      let version = this.$route.query.version;
      osvData.forEach(item=>{
        if(item.os_version == version) {
          this.reportData = item;
        }
      })
  }
};
</script>

<style lang="less" scoped>
.approveInfo-box {
  .banner {
    width: 1150px;
    margin: 0 auto;
    .breadcrumb {
      margin-top: 34px;
      margin-bottom: 16px;
      font-size: 20px;
      color: #002fa7;
      line-height: 30px;
      cursor: pointer;
    }
    .banner-title {
      font-size: 36px;
      line-height: 46px;
      // margin-bottom: 27px;
      color: #000;
      border-bottom: 1px solid #e1e6ee;
      padding-bottom: 14px;
    }
  }
  .assess-content {
    width: 1150px;
    margin: 0 auto;
    position: relative;
    .title {
      margin-top: 27px;
      font-size: 24px;
      color: #000000;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .content {
      display: flex;
      .content-box {
        display: flex;
        .content-name {
            width: 180px;
        }
        .link-item {
          color: #002fa7;
          text-decoration: none;
          cursor: pointer;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          padding-bottom: 16px;
          .label {
            color: rgba(0, 0, 0, 0.5);
            margin-right: 16px;
          }
          .content-item {
            color: rgba(0, 0, 0, 0.85);
            width: 400px;
          }
        }
      }
      .claim-box {
        .top {
          position: absolute;
          top: 99px;
          right: 232px;
          .title-claim {
            display: flex;
            img {
              margin-right: 4px;
              width: 32px;
              height: 32px;
            }
            .claim-text {
              font-size: 32px;
              color: #000000;
              line-height: 32px;
              font-weight: 800;
            }
          }
          .subtitle-claim {
            width: 100px;
            font-size: 14px;
            color: #8d98aa;
            text-align: center;
            line-height: 24px;
            margin-top: 16px;
          }
        }
      }
    }
  }
  .tool-content {
    width: 1150px;
    margin: 0 auto;
    margin-top: 24px;
    padding-right: 30px;
    .title {
      font-size: 24px;
      color: #000000;
      font-weight: 600;
    }
    .table-pc {
      margin-top: 20px;
    }
  }
  .platform-content {
    width: 1150px;
    margin: 40px auto 100px;
    padding-right: 30px;
    .title {
      font-size: 24px;
      color: #000000;
      font-weight: 600;
    }
  }
}
.table-result {
  img{
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }
}
/deep/ .el-table thead {
  color: #000;
  font-size: 16px;
}
</style>