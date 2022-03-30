<template>
  <div class="approveInfo-box">
    <div class="banner">
      <div class="breadcrumb">{{ i18n.approve.TITLE }} \</div>
      <div class="banner-title">
        {{ i18n.approve.SUBTITLE_REPORT }}
      </div>
    </div>
    <div class="assess-content">
      <div class="title">{{ i18n.approve.ASSESS_LIST.ASSESS_INFO }}</div>
      <div class="content">
        <div class="content-box">
          <p>
            <span class="label">{{ i18n.approve.ASSESS_LIST.OSV }}</span>
            <span class="content-item">
                {{reportData.osv_name}}
            </span>
          </p>
          <p>
            <span class="label">{{
              i18n.approve.ASSESS_LIST.ARCHITECTURE
            }}</span>
            <span class="content-item">
                {{reportData.arch}}
            </span>
          </p>
          <p>
            <span class="label">{{
              i18n.approve.ASSESS_LIST.PUBLISH_ADDRESS
            }}</span>
            <a class="link-item" :href="reportData.os_download_link">
                {{reportData.os_download_link}}
            </a>
          </p>
          <p>
            <span class="label">{{ i18n.approve.ASSESS_LIST.CHECKSUM }}</span>
            <span class="content-item">
                {{reportData.checksum}}
            </span>
          </p>
          <p>
            <span class="label">{{
              i18n.approve.ASSESS_LIST.OPENEULER_EDITION
            }}</span>
            <span class="content-item">
                {{reportData.base_openeuler_version}}
            </span>
          </p>
        </div>
        <div class="claim-box">
          <div class="top">
            <div class="title-claim">
              <img src="/img/approve/adopt.png" alt="" />
              <!-- <img src="/img/approve/fail.png" alt=""> -->
              <div class="claim-text">{{ i18n.approve.ADOPT }}</div>
              <!-- <div class="claim-text">{{i18n.approve.FAIL}}</div> -->
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
          ></el-table-column>
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
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getApproveReport } from "../../api/approve";

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
      reportData: {
        os_version: "uniontechos-server-20-1020e-amd64",
        osv_name: "统信",
        total_result: "pass",
        type: "服务器",
        date: "2022/3/17",
        arch: "x86_64",
        details: "详细信息",
        friendly_link: "https://www.uniontech.com/",
        os_download_link:
          "https://cdimage-download.chinauos.com/uniontechos-server-20-1020e-amd64.iso",
        checksum: "8281ed83b678c2d39b05d206e72e5a6c",
        base_openeuler_version: "openEuler 20.03 LTS-SP1",
        tools_result: [
          {
            name: "core_pkg",
            percent: "100%",
            result: "pass",
          },
          {
            name: "soft_pkg",
            percent: "98%",
            result: "pass",
          },
          {
            name: "KABI",
            percent: "100%",
            result: "pass",
          },
          {
            name: "ABI",
            percent: "98%",
            result: "pass",
          },
          {
            name: "service_config",
            percent: "96%",
            result: "pass",
          },
          {
            name: "soft_config",
            percent: "98%",
            result: "pass",
          },
          {
            name: "kernel_config",
            percent: "98.5%",
            result: "pass",
          },
        ],
        platform_result: [
          {
            name: "repo",
            percent: "94%",
            result: "pass",
          },
          {
            name: "base_test",
            percent: "100%",
            result: "pass",
          },
          {
            name: "performance_test",
            percent: "96%",
            result: "pass",
          },
          {
            name: "running_config",
            percent: "91%",
            result: "pass",
          },
        ],
      },
      tableData: [],
      detailList: [],
      total: 1,
    };
  },
  mounted() {
    locationMethods.getApproveInfo(10204);
  },
  created() {
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
        width: 52%;
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
        width: 48%;
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
/deep/ .el-table thead {
  color: #000;
  font-size: 16px;
}
</style>