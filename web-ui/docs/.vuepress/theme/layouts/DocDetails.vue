<template>
  <div class="doc-details-content">
    <div
      class="details-left"
      :class="[showMobileMenu && 'show-mobile-menu', !showMobileMenu && 'hide-mobile-menu']"
    >
      <div class="version-div">
        <span>{{version}}</span>
        <i class="el-icon-document"></i>
      </div>
      <el-tree
        ref="tree"
        :data="menuData"
        node-key="path"
        :highlight-current="true"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="mobile-previous-and-next" :class="{ mask: showMobileMenu }" @click="showMobileMenu = false"></div>
    <div class="details-center">
      <div class="mobile-previous-and-next">
        <p class="previous-doc">
          <i class="el-icon-arrow-left"></i>
          <span @click="previous" class="toggle-doc">{{i18n.documentation.PREVIOUS}}</span>
        </p>
        <p class="next-doc">
          <span @click="next" class="toggle-doc">{{i18n.documentation.NEXT}}</span>
          <i class="el-icon-arrow-right"></i>
        </p>
        <p class="menu-doc">
          <span @click="showMenu" class="toggle-doc">{{i18n.documentation.MENU}}</span>
        </p>
      </div>
      <Content id="docs-content" />
    </div>
    <div class="details-right">
      <p class="previous-doc">
        <i class="el-icon-arrow-left"></i>
        <span @click="previous" class="toggle-doc">{{i18n.documentation.PREVIOUS}}</span>
      </p>
      <p class="next-doc">
        <span @click="next" class="toggle-doc">{{i18n.documentation.NEXT}}</span>
        <i class="el-icon-arrow-right"></i>
      </p>
      <p class="feedback-doc">
        <i class="el-icon-edit"></i>
        <a :href="feedbackPath" target="_blank">{{i18n.documentation.FEEDBACK}}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocDetails",
  data() {
    return {
      targetLocale: "",
      //菜单数据
      menuData: [],
      //菜单平铺数据
      allPathArr: [],
      //当前版本
      version: "",
      //意见反馈路径
      feedbackPath: "",
      //当然页面路径
      currentDocPath: "",
      //前一篇路径
      previousPath: "",
      //下一把路径
      nextPath: "",
      showMobileMenu: false,
      i18n: {
        documentation: {},
      },
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  mounted() {
    let currentPath = this.$route.path;
    this.version = currentPath.split("/")[3];
    this.menuData = require("../../../" +
      this.$lang +
      "/docs/" +
      this.version +
      "/menu/menu.json");
    this.currentDocPath = this.getCurrentDocPath(currentPath);
    this.renderFeedbackPath();
    this.allPathArr = this.getAllPathArr(this.menuData);
    this.getNextPathAndPreviousPath();
  },
  updated() {
    this.setCheckedNode();
  },

  methods: {
    handleNodeClick(data) {
      this.currentDocPath = data.path;
      this.getNextPathAndPreviousPath();
      this.renderFeedbackPath();
      this.showMobileMenu = false;
      this.$router.push(
        this.targetLocale + "docs/" + this.version + "/" + data.path + ".html"
      );
    },
    getCurrentDocPath(path) {
      let pathArr = path.split("/");
      let pathStr = "";
      for (let i = 4; i < pathArr.length; i++) {
        pathStr += pathArr[i] + "/";
      }
      pathStr = pathStr.slice(0, pathStr.length - 6);
      return pathStr;
    },
    renderFeedbackPath() {
      this.feedbackPath =
        "https://gitee.com/openeuler/docs/blob/stable-" +
        this.version +
        "/content" +
        this.targetLocale +
        this.currentDocPath +
        ".md";
    },
    setCheckedNode() {
      this.$refs.tree.setCurrentKey(this.currentDocPath);
    },
    getAllPathArr(menuData) {
      menuData.forEach((item) => {
        this.allPathArr.push(item.path);
        if (item.children && item.children.length) {
          this.getAllPathArr(item.children);
        }
      });
      return this.allPathArr;
    },
    changePage(path) {
      if (path === "") {
        return false;
      }
      this.currentDocPath = path;
      this.getNextPathAndPreviousPath();
      this.setCheckedNode();
      this.$router.push(
        this.targetLocale +
          "docs/" +
          this.version +
          "/" +
          this.currentDocPath +
          ".html"
      );
    },
    previous() {
      this.changePage(this.previousPath);
    },
    next() {
      this.changePage(this.nextPath);
    },
    getNextPathAndPreviousPath() {
      this.allPathArr.forEach((item, index) => {
        if (item === this.currentDocPath) {
          if (index === 0) {
            this.nextPath = this.allPathArr[index + 1];
            this.previousPath = "";
            return false;
          }
          if (index === this.allPathArr.length - 1) {
            this.nextPath = "";
            this.previousPath = this.allPathArr[index - 1];
            return false;
          }
          this.nextPath = this.allPathArr[index + 1];
          this.previousPath = this.allPathArr[index - 1];
        }
      });
    },
    showMenu() {
      this.showMobileMenu = true;
    },
  },
};
</script>

<style lang="less">
.doc-details-content {
  width: 1120px;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 400px;
}
.mask {
  position: fixed;
  top: 72px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.details-left {
  width: 200px;
  display: inline-block;
  vertical-align: top;
  > div > div > div.el-tree-node__content {
    height: 60px;
    line-height: 60px;
    span {
      font-size: 16px;
    }
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    color: #002fa7;
    background: #ffffff;
    box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .el-tree-node__content {
    padding-left: 0 !important;
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    position: absolute;
    right: 0;
  }
  .el-icon-caret-right:before {
    content: "\e6e0";
  }
  .el-tree-node > .el-tree-node__children {
    padding: 15px 0;
  }
}
.version-div {
  padding-bottom: 20px;
  border-bottom: 4px solid #002fa7;
  span {
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
  }
  i {
    color: #002fa7;
    font-size: 24px;
    margin-left: 45px;
  }
}
.details-center {
  width: 670px;
  margin: 0 18px;
  display: inline-block;
}
.mobile-previous-and-next {
  display: none;
}
.details-right {
  width: 200px;
  vertical-align: top;
  display: inline-block;
  overflow: hidden;
}
.previous-doc {
  float: left;
}
.next-doc {
  float: right;
}
.toggle-doc {
  font-size: 14px;
  color: #002fa7;
  cursor: pointer;
}
.feedback-doc {
  float: left;
  margin-top: 20px;
  a {
    font-size: 14px;
    color: #002fa7;
    text-decoration: none;
  }
}
#docs-content {
  p {
    line-height: 24px;
    a {
      color: #002fa7;
      text-decoration: none;
    }
    img {
      width: 100%;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: bold;
    margin: 30px 0 20px 0;
    a {
      display: none;
    }
  }
  h1 {
    font-size: 36px;
    margin-top: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.5);
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 16px;
  }
  ol {
    li {
      line-height: 24px;
      ol {
        padding-left: 20px;
      }
    }
  }
  ul {
    li {
      line-height: 24px;
      a {
        color: #002fa7;
        text-decoration: none;
      }
    }
  }
}
@media (max-width: 1000px) {
  .doc-details-content {
    width: 100%;
    padding: 0 30px;
    position: relative;
    margin-top: 0px;
    margin-bottom: 80px;
  }
  .details-left {
    width: 282px;
    padding-top: 20px;
    vertical-align: top;
    > div > div > div.el-tree-node__content {
      height: 46px;
      line-height: 646px;
      span {
        font-size: 16px;
      }
    }
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      color: #002fa7;
      background: #ffffff;
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);
    }
    .el-tree-node__content {
      padding-left: 0 !important;
    }
    .el-tree-node__content > .el-tree-node__expand-icon {
      position: absolute;
      right: 0;
    }
    .el-icon-caret-right:before {
      content: "\e6e0";
    }
    .el-tree-node > .el-tree-node__children {
      padding: 5px 0;
    }
  }
  .show-mobile-menu {
    position: absolute;
    z-index: 1000;
    padding-left: 30px;
    margin-left: -30px;
    background: #fbfbfb;
  }
  .hide-mobile-menu {
    display: none;
  }
  .version-div {
    border-bottom: none;
    span {
      font-size: 18px;
    }
    i {
      display: none;
    }
  }
  .mobile-previous-and-next {
    display: block;
  }
  .details-center {
    width: 100%;
    margin: 0;
    display: inline-block;
  }
  .menu-doc {
    text-align: center;
    height: 40px;
    background: rgba(251, 251, 251, 1);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
  }
  .details-right {
    display: none;
  }
}
</style>
