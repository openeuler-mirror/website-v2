<template>
  <div class="approve-box">
    <common-banner
      :pc-src="'/img/compatibility/compatibility_banner.png'"
      :mobile-src="'/img/compatibility/compatibility_banner.png'"
      :inside-name="'SUPPORT'"
      :outside-name="i18n.approve.TITLE"
    ></common-banner>
    <div class="approve-desc">
      <div>
        <p>{{ i18n.approve.SUMMARY.CONTENT }}</p>
      </div>
    </div>

    <div class="approve-content">
      <div class="approve-table">
        <p class="table-title">{{ i18n.approve.TABLE_TITLE }}</p>
        <el-form :inline="true" :model="formData" class="approve-filter">
          <el-form-item :label="i18n.approve.SELECT_COMPANY">
            <el-select
              class="pc-select"
              v-model="formData.osv_name"
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
              v-model="formData.osv_name"
              @change="initData(1)"
              :placeholder="i18n.approve.SELECT_COMPANY"
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
            prop="osv_name"
            :label="i18n.approve.TABLE_COLUMN.COMPANY"
            width="110"
          ></el-table-column>
          <el-table-column
            prop="os_version"
            :label="i18n.approve.TABLE_COLUMN.VERSION"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="os_download_link"
            :label="i18n.approve.TABLE_COLUMN.DOWNLOAD"
            width="220"
          >
            <template slot-scope="scope">
              <a class="table-link" :href="scope.row.os_download_link">{{
                scope.row.os_download_link
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
              <a class="table-link" @click="go(scope.row.os_version)">{{
                scope.row.details
              }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="friendly_link"
            :label="i18n.approve.TABLE_COLUMN.LINK"
            width="200"
          >
            <template slot-scope="scope">
              <a
                class="table-link"
                :href="scope.row.friendly_link"
                target="_blank"
                >{{ scope.row.friendly_link }}</a
              >
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
                {{ item.osv_name }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.VERSION }}:</span>
                {{ item.os_version }}
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.DOWNLOAD }}:</span>
                <a :href="item.os_download_link" class="table-link">
                  {{ item.os_download_link }}
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
                <a class="table-link" @click="go(item.os_version)">{{
                  item.details
                }}</a>
              </li>
              <li>
                <span>{{ i18n.approve.TABLE_COLUMN.LINK }}:</span>
                <a :href="item.friendly_link" class="table-link" target="_blank">
                  {{ item.friendly_link }}
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

        <div class="bottomBanner">
          <span>{{ i18n.approve.TO_STEP.TEXT_1 }}</span>
          <a @click="toStep">
            {{ i18n.approve.TO_STEP.LINK_1 }} </a
          >。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
import { osvList, getOsName, getType, osvData } from "../../api/approve";
let that = null;

const locationMethods = {
  getOsvList(flag) {
    that.tableLoading = true;
    that.formData.page = flag;
    osvList(that.formData)
      .then((data) => {
        that.tableLoading = false;
        if (data.totalRecords) {
          that.total = data.totalRecords;
          that.tableData = data.list;
        } else {
          that.total = 0;
          that.tableData = [];
        }
      })
      .catch((data) => {
        that.$message.error(data);
        that.tableLoading = false;
      });
  },
};
export default {
  data() {
    that = this;
    return {
      osNameOptions: [],
      typeOptions: [],
      formData: {
        osv_name: "",
        type: "",
        keyword: "",
        page: 1,
        pageSize: 10,
      },
      tableLoading: false,
      tableData: [],
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
    go(version) {
      this.$router.push({
        path: this.resolvePath("/approve/approve-info/"),
        query:{version},
      });
    },

    //跳转至步骤页
    toStep() {
      this.$router.push({
        path: this.resolvePath("/approve/approve-step"),
      });
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
    this.tableData = osvData;
  },
};
</script>

<style lang="less" scoped>
.approve-box {
  .approve-desc {
    width: 100%;
    background-image: url("/img/minisite/atune/desc-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 84px;
    & > div {
      width: 1120px;
    }
    p {
      color: #ffffff;
      line-height: 48px;
      font-size: 18px;
    }
  }
  .approve-content {
    width: 1120px;
    margin: 0 auto 200px;
    .table-title {
      font-size: 24px;
    }
  }

  .bottomBanner {
    margin-top: 40px;
    font-size: 18px;
    a {
      color: #002fa7;
      text-decoration: none;
      cursor: pointer;
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
    .approve-desc {
      height: 370px;
      background-image: url("/img/minisite/atune/desc-mobile.png");
      p {
        width: 315px;
        margin: 0 auto;
        line-height: 30px;
        font-size: 14px;
        text-align: left;
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
  }
}
</style>
