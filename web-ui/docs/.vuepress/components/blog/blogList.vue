<template>
  <div>
    <el-form :inline="true" :model="formData" class="download-filter">
      <el-form-item :label="i18n.community.blog.label">
        <el-select v-model="formData.tag" placeholder>
          <el-option
            v-for="(item, index) in formData.tags"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="i18n.community.blog.file">
        <el-select v-model="formData.time" placeholder>
          <el-option
            v-for="(item, index) in formData.times"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-link type="primary">{{i18n.community.blog.blogging}}</el-link>
      </el-form-item>
    </el-form>
    <div>
{{dataList}}
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import dayjs from "dayjs";
import { NavigationIcon, ClockIcon, TagIcon } from "vue-feather-icons";
import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";

export default {
  components: { NavigationIcon, ClockIcon, TagIcon },

  data() {
    return {
      targetLocale: "",
      formData: {
        tag: "",
        time: "",
        tags: [],
        times: [],
      },
      dataList:null
    };
  },

  computed: {
    pages() {
      return this.getBlogDataByLang(this.$pagination.pages);
    },
  },

  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
    this.dataList = this.$sitePages
  },

  methods: {
    getBlogDataByLang(data) {
      let blogData = [];
      let langID = this.$lang === "zh" ? "zh" : "en";
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === langID) {
          blogData.push(data[i]);
        }
      }
      return blogData;
    },
    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },

    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags;
      return [tags];
    },
  },
};
</script>

<style lang="stylus">
#base-list-layout {
  width: 1200px;
  margin: 0 auto;
}

.download-filter {
  margin-top: 22px;

  @media (max-width: 1000px) {
    display: none;
  }
}

.common-layout {
  .content-wrapper {
    padding-bottom: 80px;
  }
}

.ui-post {
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid $borderColor;

  &:last-child {
    border-bottom: 0px;
    margin-bottom: 0px;
  }
}

.ui-post-title {
  font-family: PT Serif, Serif;
  font-size: 28px;
  border-bottom: 0;

  a {
    cursor: pointer;
    color: $darkTextColor;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ui-post-summary {
  font-size: 14px;
  color: $darkTextColor;
  font-weight: 200;
}

.ui-post-meta {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 12px;

  &:not(:last-child) {
    margin-bottom: 3px;
    margin-right: 20px;
  }

  svg {
    margin-right: 5px;
    width: 14px;
    height: 14px;
  }

  @media (max-width: $MQMobile) {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.ui-post-author {
  color: $darkTextColor;
  font-weight: 400;
}

.ui-post-date {
  color: $darkTextColor;
  font-weight: 200;
}

.ui-post-tag {
  color: $darkTextColor;
  font-weight: 200;

  a {
    color: inherit;
    font-weight: 200;
    text-decoration: none;
    margin-right: 5px;

    &:hover {
      color: $accentColor;
    }
  }
}
</style>
