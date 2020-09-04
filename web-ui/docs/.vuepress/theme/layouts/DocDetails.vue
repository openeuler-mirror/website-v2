<template>
  <div class="doc-details-content">
    <div
      class="details-left"
      :class="[showMobileMenu && 'show-mobile-menu', !showMobileMenu && 'hide-mobile-menu']"
    >
      <div class="version-div">
        <span>{{version}}</span>
        <i class="icon-document"></i>
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
      <div class="markdown">
          <Content id="docs-content" />
      </div>
    </div>
    <div class="details-right">
        <div class="null-box"></div>
        <div class="clearfix">
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
        <ul class="second-title-list">
            <li v-for="(item,index) in secondTitleList" :key="index" :class="isIndex == index?'active':''"><a :href="'#'+item" @click="isActive(index)">{{item}}</a></li>
        </ul>
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
      secondTitleList:[],
      //二级标题是否显示蓝色
      active:false,
      //是否等于下标
      isIndex:0 
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
    this.renderFeedbackPath();//初次进入页面时设置点击意见反馈的链接
    this.allPathArr = this.getAllPathArr(this.menuData);
    this.getNextPathAndPreviousPath();
    this.getSecondTitle();
  },
  updated() {
    this.setCheckedNode();
  },

  methods: {
    handleNodeClick(data) {
        //点击树形目录触发事件
      this.currentDocPath = data.path;
      this.getNextPathAndPreviousPath();
      this.renderFeedbackPath();
      this.showMobileMenu = false;
      this.$router.push(
        this.targetLocale + "docs/" + this.version + "/" + data.path + ".html"
      );
      this.secondTitleList=[];
      this.isIndex = 0;
      this.getSecondTitle();
    },
    getCurrentDocPath(path) {
        //获取当前URL版本后面的路径
      let pathArr = path.split("/");
      let pathStr = "";
      for (let i = 4; i < pathArr.length; i++) {
        pathStr += pathArr[i] + "/";
      }
      pathStr = pathStr.slice(0, pathStr.length - 6);
      return pathStr;
    },
    renderFeedbackPath() {
        //设置点击意见反馈的链接
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
        //获取文档所有的path
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
              //当前是第一篇点击下一篇
            this.nextPath = this.allPathArr[index + 1];
            this.previousPath = "";
            return false;
          }
          if (index === this.allPathArr.length - 1) {
              //当前是最后一篇点击下一篇
            this.nextPath = "";
            this.previousPath = this.allPathArr[index - 1];
            return false;
          }
          //当前是第二篇（及以上）文章开始点击下一章
          this.nextPath = this.allPathArr[index + 1];
          this.previousPath = this.allPathArr[index - 1];
        }
      });
    },
    showMenu() {
      this.showMobileMenu = true;
    },
    getSecondTitle(){   
        let getSecondTile = document.getElementsByTagName("h2");
        setTimeout(() => {
            getSecondTile.forEach((item,index) => {
                this.secondTitleList.push(item.innerText);
            });
        },200);
    },
    isActive(index){
        this.isIndex = index;
    }
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
  width: 192px;
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
    > .el-tree-node__content,.el-tree--highlight-current
    .el-tree-node.is-expanded
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
  .el-tree-node__content > .el-tree-node__label {
    margin-left: 12px;
  }
  .el-icon-caret-right:before {
    content: "\e6e0";
  }
  .el-tree-node > .el-tree-node__children {
    padding: 15px 0;
  }
  .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content{
      box-shadow: none;
      margin-bottom: 10px;
  }
}
.version-div {
  padding-bottom: 20px;
  border-bottom: 4px solid #002fa7;
  position: relative;
  span {
    font-size: 24px;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
  }
  .icon-document {
      position: absolute;
      width: 22px;
      height: 28px;
      background-image: url('/img/docs/icon-document.svg');
      right:13px;
  }
}
.details-center {
  width: 670px;
  margin: 0 18px;
  display: inline-block;
  .markdown{
      width: 670px;
  }
}
.mobile-previous-and-next {
  display: none;
}
.details-right {
    width: 200px;
    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    vertical-align: top;
    display: inline-block;
    overflow: hidden;
    .null-box{
        height: 20px;
    }
    .second-title-list{
        margin-left: 20px;
        .active{
            a{
                color: #002FA7;
            }
        }
        li{
            a{
                text-decoration: none;
                font-size: 16px;
                font-family: FZLTXIHJW--GB1-0, FZLTXIHJW--GB1;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.7);
                line-height: 20px;
                display: block;
            }
            margin-bottom: 20px;
        }
    }
}
.previous-doc {
  float: left;
  margin-left: 18px;
}
.next-doc {
  float: right;
  margin-right: 18px;
}
.toggle-doc {
  font-size: 14px;
  color: #002fa7;
  cursor: pointer;
}
.feedback-doc {
  float: left;
  margin-top: 20px;
  margin-left: 18px;
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
