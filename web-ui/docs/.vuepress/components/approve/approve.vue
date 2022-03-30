<template>
  <div class="approve-box">
    <common-banner
      :pc-src="'/img/compatibility/compatibility_banner.png'"
      :mobile-src="'/img/compatibility/compatibility_banner.png'"
      :inside-name="'SUPPORT'"
      :outside-name="i18n.approve.TITLE"
    ></common-banner>
    <div class="approve-head">
      <div class="title">{{ i18n.approve.SUMMARY.TITLE }}</div>
      <div class="content">
        {{ i18n.approve.SUMMARY.CONTENT }}
      </div>
    </div>
    <div class="approve-content">
      <div class="approve-middle">
        <div class="title">{{ i18n.approve.STEP_TITLE }}</div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[0].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[0].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[0].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[0].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[0].LINK_1 }} </a
              >。
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[1].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[1].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[1].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[1].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[1].LINK_1 }} </a
              >。
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[2].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[2].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[2].TEXT_1 }}
              <a :href="'mailto:' + i18n.approve.STEP_CONTENT[2].LINK_1">
                {{ i18n.approve.STEP_CONTENT[2].LINK_1 }}
              </a>
              {{ i18n.approve.STEP_CONTENT[2].TEXT_2 }}
              <p>
                {{ i18n.approve.STEP_CONTENT[2].TEXT_3 }}
                <a :href="i18n.approve.STEP_CONTENT[2].LINK_2" target="_blank">
                  {{ i18n.approve.STEP_CONTENT[2].LINK_2 }}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[3].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[3].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[3].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[3].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[3].LINK_1 }}
              </a>
              {{ i18n.approve.STEP_CONTENT[3].TEXT_2 }}
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[4].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[4].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[4].TEXT_1 }}
              <a :href="i18n.approve.STEP_CONTENT[4].LINK_1" target="_blank">
                {{ i18n.approve.STEP_CONTENT[4].LINK_TEXT }}
              </a>
              {{ i18n.approve.STEP_CONTENT[4].TEXT_2 }}
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="left">{{ i18n.approve.STEP_CONTENT[5].ID }}</div>
          <div class="right">
            <div class="item-title">
              {{ i18n.approve.STEP_CONTENT[5].TITLE }}
            </div>
            <div class="item-content">
              {{ i18n.approve.STEP_CONTENT[5].TEXT_1 }}
              <a @click="toCompatibility">
                {{ i18n.approve.STEP_CONTENT[5].LINK_1 }}
              </a>
              {{ i18n.approve.STEP_CONTENT[5].TEXT_2 }}
            </div>
          </div>
        </div>
      </div>
      <div class="approve-table">
        <p>{{ i18n.approve.TABLE_TITLE }}</p>
        <el-form :inline="true" :model="formData" class="approve-filter">
          <el-form-item :label="i18n.approve.SELECT_COMPANY">
            <el-select
              class="pc-select"
              v-model="formData.osvName"
              style="width: 150px"
              @change="initData(1)"
              :placeholder="i18n.approve.SELECT_PLACEHOLDER"
            >
              <el-option
                :label="i18n.approve.SELECT_ALL"
                value="all"
              ></el-option>
              <el-option
                v-for="(item, index) in osNameOptions"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              class="mobile-select"
              v-model="formData.osvName"
              @change="initData(1)"
              :placeholder="i18n.approve.SELECT_COMPANY"
            >
              <el-option
                :label="i18n.approve.SEARCH_ALL"
                value="all"
              ></el-option>
              <el-option
                v-for="(item, index) in osNameOptions"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="i18n.approve.SELECT_TYPE">
            <el-select
              class="pc-select"
              style="width: 180px"
              v-model="formData.type"
              @change="initData(1)"
              :placeholder="i18n.approve.SELECT_PLACEHOLDER"
            >
              <el-option
                :label="i18n.approve.SELECT_ALL"
                value="all"
              ></el-option>
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
            <el-select
              class="mobile-select"
              v-model="formData.type"
              @change="initData(1)"
              :placeholder="i18n.approve.SELECT_TYPE"
            >
              <el-option
                :label="i18n.approve.SELECT_ALL"
                value="all"
              ></el-option>
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="i18n.approve.SEARCH_TEXT" class="search-box">
            <el-input
              v-model="formData.keyword"
              class="pc-search"
              @keyup.enter.native="initData(1)"
              :placeholder="i18n.approve.SEARCH_PLACEHOLDER"
            >
              <i slot="suffix" class="icon-search" @click="initData(1)"></i>
            </el-input>
            <el-input
              v-model="formData.keyword"
              class="mobile-search"
              @keyup.enter.native="initData(1)"
              :placeholder="i18n.approve.SEARCH_PLACEHOLDER"
            >
              <i slot="suffix" class="icon-search" @click="initData(1)"></i>
            </el-input>
          </el-form-item>
        </el-form>

        <el-table
          v-loading.fullscreen="tableLoading"
          class="table-pc"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="arch"
            :label="i18n.approve.TABLE_COLUMN.ARCHITECTURE"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="osvName"
            :label="i18n.approve.TABLE_COLUMN.COMPANY"
            width="110"
          ></el-table-column>
          <el-table-column
            prop="osVersion"
            :label="i18n.approve.TABLE_COLUMN.VERSION"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="osDownloadLink"
            :label="i18n.approve.TABLE_COLUMN.DOWNLOAD"
            width="220"
          >
            <template slot-scope="scope">
              <a class="table-link" :href="scope.row.osDownloadLink">{{
                scope.row.osDownloadLink
              }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            :label="i18n.approve.TABLE_COLUMN.TYPE"
            width="110"
          ></el-table-column>
          <el-table-column
            prop="date"
            :label="i18n.approve.TABLE_COLUMN.DATE"
            width="110"
          ></el-table-column>
          <el-table-column
            prop="details"
            :label="i18n.approve.TABLE_COLUMN.DETAILS"
            width="120"
          >
            <template slot-scope="scope">
              <a class="table-link" @click="go(scope.row.details)">{{
                i18n.approve.TABLE_COLUMN.REPORT
              }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="friendlyLink"
            :label="i18n.approve.TABLE_COLUMN.LINK"
            width="200"
          >
            <template slot-scope="scope">
              <a class="table-link" :href="scope.row.friendlyLink" target="_blank">{{
                scope.row.friendlyLink
              }}</a>
            </template>
          </el-table-column>
        </el-table>
        <ul class="table-mobile" v-loading.fullscreen="tableLoading">
          <li class="item" v-for="(item, index) in tableData" :key="index">
            <ul>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.ARCHITECTURE }}:</span>
                {{ item.arch }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.COMPANY }}:</span>
                {{ item.osvName }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.VERSION }}:</span>
                {{ item.osVersion }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.DOWNLOAD }}:</span>
                <a :href="item.osDownloadLink" class="table-link">
                  {{ item.osDownloadLink }}
                </a>
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.TYPE }}:</span>
                {{ item.type }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.DATE }}:</span>
                {{ item.date }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.DETAILS }}:</span>
                <a class="table-link" @click="go(item.details)">{{
                  i18n.approve.TABLE_COLUMN.REPORT
                }}</a>
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.LINK }}:</span>
                <a :href="item.friendlyLink" class="table-link" target="_blank">
                  {{ item.friendlyLink }}
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <el-pagination
          class="approve_pagination"
          background
          @current-change="initData"
          :page-size="formData.pageSize"
          :current-page="formData.page"
          :layout="paginationLayout"
          :total="total"
          :hide-on-single-page="true"
        ></el-pagination>

        <div class="spacing_box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
import { osvList, getOsName, getType } from "../../api/approve";
let that = null;

const locationMethods = {
    getOsvList (flag) {
        that.tableLoading = true;
        that.formData.page = flag;
        osvList(that.formData)
        .then(data => {
            that.tableLoading = false;
            if (data.totalRecords) {
                that.total = data.totalRecords;
                that.tableData = data.list;
            } else {
            that.total = 0;
            that.tableData = [];
            }
        })
        .catch(data => {
            that.$message.error(data);
            that.tableLoading = false;
        });
    }
}
export default {
  data() {
    that = this;
    return {
      osNameOptions: [],
      typeOptions: [],
      formData: {
        osvName: "",
        type: "",
        keyword: "",
        page: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [
        {
          arch: "X86_64",
          osvName: "统信",
          osVersion: "uniontechos-server-20-1020e-amd64",
          osDownloadLink: "https://cdimage-download.chinauos.com/uniontechos-server-20-1020e-amd64.iso",
          type: "服务器",
          date: "2022/3/17",
          details: "",
          friendlyLink: "https://www.uniontech.com/",
        }
      ],
    };
  },
  components: {
    commonBanner,
  },
  computed: {
    total() {
      return this.tableData.length;
    },
  },
  methods: {
    //选择分页
    initData(flag) {
      // locationMethods.getOsvList(flag);
    },

    //跳转至报告页
    go(data) {
        this.$router.push({
                path: this.resolvePath('/approve/approve-info/'),
                query: { id: data}
            })
    },

    //跳转至兼容性列表页
    toCompatibility() {
        this.$router.push({
            path: this.resolvePath('/compatibility/')
        })
    },

    
  },
  created() {
    // getOsName().then(res=>{
    //   this.osNameOptions = [...res]
    // });
    // getType().then(res=>{
    //   this.typeOptions = [...res]
    // });
    // this.initData(1);
  },
};
</script>

<style lang="less" scoped>
.approve-box {
  .approve-head {
    width: 1120px;
    margin: 0 auto;
    .title {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      line-height: 34px;
    }
    .content {
      font-size: 16px;
      line-height: 26px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .approve-content {
    width: 1120px;
    margin: 0 auto;
  }
  .approve-middle {
    margin: 40px 0;
    .title {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      line-height: 34px;
    }
    .content-item {
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: left;
      .left {
        font-size: 48px;
        color: #002fa7;
        padding-right: 30px;
      }
      .right {
        padding-left: 30px;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        .item-title {
          color: rgba(0, 0, 0, 1);
          font-size: 20px;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .item-content {
          font-size: 16px;
          line-height: 26px;
          color: rgba(0, 0, 0, 0.5);
          a{
            text-decoration: none;
            color: #002fa7;
            cursor: pointer;
            }
        }
      }
    }
  }

  .approve-filter {
    margin: 30px 0 28px 0;
    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      margin: 20px 0;
    }
    .search-box {
      float: right;
      margin-right: 0;
    }
    .label-font {
      span {
        font-size: 15px;
      }
    }
    .el-form-item {
      margin-bottom: 0;
      margin-right: 20px;
      @media (max-width: 1000px) {
        margin-bottom: 20px;
        margin-right: 0;
      }
      /deep/ .el-form-item__content {
        @media (max-width: 1000px) {
          width: 100%;
        }
      }
      /deep/ .el-form-item__label {
        color: #000;
        font-size: 18px;
        font-size: 18px;
        vertical-align: center;
        @media (max-width: 1000px) {
          display: none !important;
        }
      }
    }
    .pc-select,
    .pc-search {
      width: 180px;
      height: 32px;
      @media (max-width: 1000px) {
        display: none;
      }
      .icon-search {
        cursor: pointer;
      }
    }
    .pc-search {
      width: 230px;
    }
    .mobile-select,
    .mobile-search {
      display: none;
      width: 100%;
      @media (max-width: 1000px) {
        display: inline-table;
        .icon-search {
          right: 6px;
        }
      }
      .el-input__suffix {
        right: 10px;
      }
    }
  }

  .table-pc {
    @media (max-width: 1000px) {
      display: none;
    }
    .table-link {
      color: #002fa7;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .table-mobile {
    line-height: 16px;
    display: none;
    width: 100%;
    font-size: 12px;
    @media (max-width: 1000px) {
      display: block;
    }
    .table-link {
      color: #002fa7;
      text-decoration: none;
      cursor: pointer;
    }
    .item {
      padding: 20px;
      &:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
      }
      li {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.5);
        word-break: break-all;
        span {
          color: #000;
          margin-right: 4px;
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .approve_pagination {
    margin-top: 16px;
  }
  .spacing_box {
    width: 100%;
    height: 200px;
  }

  /deep/ .el-table {
    color: rgba(0, 0, 0, 0.85);
  }
  /deep/ .el-table thead {
    color: #000;
    font-size: 16px;
  }
  /deep/ .el-table th {
    background-color: rgba(0, 0, 0, 0.05);
  }
  /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: rgba(0, 0, 0, 0.05);
  }
  /deep/ .el-table td,
  /deep/ .el-table th {
    padding: 31px 0;
  }
}

@media (max-width: 1000px) {
  .approve-box {
    .approve-head {
      width: 100%;
      padding-left: 30px;
      padding-right: 30px;
      .title {
        width: 100%;
        font-size: 24px;
        margin: 40px 0 30px 0;
      }
      .content {
        font-size: 16px;
        line-height: 26px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .approve-content {
      width: 100%;
      padding-left: 30px;
      padding-right: 30px;
      margin-bottom: 80px;
      font-size: 14px;
      line-height: 24px;
    }
    .approve-middle {
      .title {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
      }
      .content-item {
        padding: 15px 0;
        .left {
          font-size: 36px;
          padding-right: 15px;
        }
        .right {
          padding-left: 15px;
          border-left: 1px solid rgba(0, 0, 0, 0.15);
          .item-title {
            color: rgba(0, 0, 0, 1);
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 10px;
          }
          .item-content {
            font-size: 14px;
            line-height: 24px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
}
</style>
