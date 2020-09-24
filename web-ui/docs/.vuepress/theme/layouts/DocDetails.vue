<template>
  <div class="doc-details-content">
    <div
      class="details-left"
      :class="[showMobileMenu && 'show-mobile-menu', !showMobileMenu && 'hide-mobile-menu',$lang == 'en'?'en-mobile-width':'']"
    >
      <div class="version-div" v-if="!showMobileMenu && versionArr.length">
          <span>{{versionValue == versionArr[0].value?versionArr[0].name:versionArr[1].name}}</span>
          <div>
              <i class="icon-document" @click="showSelection = !showSelection"></i>
              <div class="version-select" v-show="showSelection">
                  <p v-for="(item,key) in versionArr"
                  :key="key"
                  :class="item.value == versionValue?'selected':''"
                  @click="changeVersion(item.value)"
                  >{{item.name}}</p>
              </div>
          </div>
      </div>
      <div class="mobile-selection" v-if="showMobileMenu">
          <el-select v-model="versionValue" @change="changeVersion">
              <el-option
              v-for="(item, index) in versionArr"
              :key="index"
              :label="item.name"
              :value="item.value"
              ></el-option>
          </el-select>
      </div>
      <el-tree
        ref="tree"
        :data="menuData"
        node-key="path"
        :highlight-current="true"
        @node-click="handleNodeClick"
        :class="$lang == 'en'?'dialog-tree':''"
      ></el-tree>
    </div>
    <div class="mobile-previous-and-next" :class="{ mask: showMobileMenu }" @click="showMobileMenu = false"></div>
    <div class="details-center">
      <div class="mobile-previous-and-next menu-box">
        <p class="prev-page">
          <i class="el-icon-arrow-left"></i>
          <span @click="previous" class="toggle-doc">{{i18n.documentation.PREVIOUS}}</span>
        </p>
				<p class="menu-doc">
          <span @click="showMenu" class="toggle-doc">{{i18n.documentation.MENU}}</span>
        </p>
        <p class="next-page">
          <span @click="next" class="toggle-doc">{{i18n.documentation.NEXT}}</span>
          <i class="el-icon-arrow-right"></i>
        </p>
      </div>
      <div class="markdown">
          <Content id="docs-content" />
      </div>
    </div>
    <div class="details-right">
        <div class="null-box"></div>
        <div class="clearfix">
            <p class="previous-doc fl">
                <i class="el-icon-arrow-left"></i>
                <span @click="previous" class="toggle-doc">{{i18n.documentation.PREVIOUS}}</span>
            </p>
            <p class="next-doc fr">
                <span @click="next" class="toggle-doc">{{i18n.documentation.NEXT}}</span>
                <i class="el-icon-arrow-right"></i>
            </p>
            <p class="feedback-doc">
                <i class="el-icon-edit"></i>
                <a :href="feedbackPath" target="_blank">{{i18n.documentation.FEEDBACK}}</a>
            </p>
        </div>
        <ul class="second-title-list">
            <li v-for="(item,index) in secondTitleList" :key="index" :class="isIndex == index?'active':''"><a @click="isActive(index,item)">{{item.id}}</a></li>
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
      //当前版本路径
      versionValue: "",
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
      isIndex:0,
      versionArr:[],
      showSelection:false,
      timer:null
    };
  },
  created() {
    this.targetLocale = this.$lang === "zh" ? "/zh/" : "/en/";
  },
  mounted() {
    let currentPath = this.$route.path;
    this.versionValue = currentPath.split("/")[3];
    this.menuData = require("../../../" +
      this.$lang +
      "/docs/" +
      this.versionValue +
      "/menu/menu.json");
    this.currentDocPath = this.getCurrentDocPath(currentPath);
    this.renderFeedbackPath();//初次进入页面时设置点击意见反馈的链接
    this.allPathArr = this.getAllPathArr(this.menuData);
    this.getNextPathAndPreviousPath();
    this.getSecondTitle();
    this.getVersionArr();
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
        this.targetLocale + "docs/" + this.versionValue + "/" + data.path + ".html"
      );
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
        this.versionValue +
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
          this.versionValue +
          "/" +
          this.currentDocPath +
          ".html"
      );
    },
    previous() {
        this.getSecondTitle();
        this.changePage(this.previousPath);
    },
    next() {
        this.getSecondTitle();
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
      this.showMobileMenu = !this.showMobileMenu;
    },
    getSecondTitle(){
        this.timer = setInterval(()=>{
            this.secondTitleList = [];
            let getSecondTile = document.getElementsByTagName("h2");
            if(getSecondTile.length != 0 && this.secondTitleList.length == 0){
                getSecondTile.forEach((item,index) => {
                    this.secondTitleList.push(item);
                    if(getSecondTile.length == this.secondTitleList.length){
                        clearInterval(this.timer);
                    }
                });
            }else{
                clearInterval(this.timer);
            }
        },500);
        
    },
    isActive(index,item){
        this.isIndex = index;
        let offsetTop = item.offsetTop;
        document.documentElement.scrollTop = offsetTop;
    },
    changeVersion(item){
        this.menuData = [];
        this.showSelection = !this.showSelection;
        this.$router.push(this.targetLocale + "docs/" + item + "/docs/Releasenotes/release_notes.html");
        this.timer = setInterval(()=>{
            let currentPath = this.$route.path;
            this.versionValue = currentPath.split("/")[3];
            this.menuData = require("../../../" +
            this.$lang +
            "/docs/" +
            this.versionValue +
            "/menu/menu.json");
            this.currentDocPath = this.getCurrentDocPath(currentPath);
            this.renderFeedbackPath();//初次进入页面时设置点击意见反馈的链接
            this.allPathArr = this.getAllPathArr(this.menuData);
            this.getNextPathAndPreviousPath();
            this.getSecondTitle();
            if(this.menuData.length != 0){
                clearInterval(this.timer);
            }
        },300)
    },
    clickOutside(){
        if(this.showSelection){
            this.showSelection = false;
        }
    },
    getVersionArr(){
        let timer = setTimeout(() => {
            this.versionArr = require("../../../" + this.$lang + "/docs/path/path.json");
        },500);
    },
  },
  beforeDestroy () {
        clearInterval(this.timer);
    }
};
</script>

<style lang="less">
.markdown #docs-content table tr:nth-child(odd) td,.markdown #docs-content table tr:nth-child(odd) th{
    background-color: unset;
}
.markdown #docs-content table td,.markdown #docs-content table th{
    border: 1px solid gray;
}
.markdown #docs-content table thead{
    background: #f7f7f7;
}
.markdown #docs-content h1 a,.markdown #docs-content h2 a,.markdown #docs-content h3 a
.markdown #docs-content h4 a,.markdown #docs-content h5 a,.markdown #docs-content h6 a
{
    display: none;
}
.doc-details-content {
  width: 1120px;
  margin: 60px auto 400px auto;
}
.dialog-tree .el-tree-node .el-tree-node__content span{
    position: absolute;
    white-space: normal;
    line-height: 20px;
}
.el-tree{
    max-height: calc(100vh - 344px);
    @media screen and (max-width: 1000px) {
        max-height: calc(100vh - 450px);
    }
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
        border-radius:10px;
        background-color:#F1F1F1;
    }
    &::-webkit-scrollbar {
        width:4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color:#AFBFE8;
    }
    overflow-x: hidden;
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
  width: 206px;
  display: inline-block;
  vertical-align: top;
  position: fixed;
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
  border-bottom: 2px solid #002fa7;
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
        top: -1px;
        cursor: pointer;
    }
    .version-select{
        position: absolute;
        right: -130px;
        z-index: 200000;
        width: 140px;
        height: 78px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #002FA7;
        font-size: 14px;
        font-family: FZLTXIHJW, FZLTXIHJW;
        font-weight: normal;
        color: #000000;
        line-height: 24px;
        p{
            width: 138px;
            height: 26px;
            padding-left: 13px;
            &:first-of-type{
                margin-top: 11px;
            }
            cursor: pointer;
        }
        .selected{
            color: #0041BD;
            background: rgba(0, 65, 189, 0.1);
        }
        @media (max-width: 1000px) {
            display: none;
        }
    }
}
.details-center {
  width: 670px;
  margin: 0 18px 0 240px;
  display: inline-block;
  .markdown{
      width: 670px;
      a[href^='#'] {
        display: inline;
    }
    @media (max-width: 1000px) {
      width: 100%;
      padding: 30px 30px 0 30px;
    }
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
    position: fixed;
    max-height: calc(100vh - 296px);
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
        border-radius:10px;
        background-color:#F1F1F1;
    }
    &::-webkit-scrollbar {
        width:4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius:10px;
        background-color:#AFBFE8;
    }
    overflow-x: hidden;
    .null-box{
        height: 20px;
    }
    .previous-doc{
        margin-left: 18px;
    }
    .next-doc{
        margin-right: 18px;
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
                cursor: pointer;
            }
            margin-bottom: 20px;
        }
    }
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
        max-width: 100%;
      @media screen and (max-width: 1000px) {
          max-width: 100%;
      }
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
    @media (max-width: 1000px) {
      font-size: 18px;
    }
  }
  h2 {
    font-size: 24px;
    @media (max-width: 1000px) {
        font-size: 17px;
    }
  }
  h3 {
    font-size: 20px;
    @media (max-width: 1000px) {
        font-size: 16px;
    }
  }
  h4 {
    font-size: 18px;
    @media (max-width: 1000px) {
        font-size: 15px;
    }
  }
  h5 {
    font-size: 16px;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
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
    position: relative;
    margin-top: 0px;
    margin-bottom: 80px;
  }
  .en-mobile-width{
    width: calc(100% + 30px) !important;
  }
  .details-left {
    width: 282px;
    padding-top: 70px;
    vertical-align: top;
    > div > div > div.el-tree-node__content {
      height: 46px;
      span {
        font-size: 16px;
      }
    }
    .el-input--suffix .el-input__inner{
      padding-right: 0;
    }
    .mobile-selection{
      margin-left: 22px;
    }
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      color: #002fa7;
      background: #ffffff;
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);
    }
    .el-tree-node__content {
      padding-left: 10px !important;
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
    position: fixed;
    z-index: 500;
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
	.menu-box{
        width: 100%;
        height: 50px;
        position: fixed;
		background: rgba(251, 251, 251, 1);
		box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-around;
        align-items: center;
        z-index: 88888;
		.menu-doc {
				text-align: center;
				flex: 2;
		}
		.prev-page{
				flex:1;
				text-align: right;
		}
		.next-page{
				flex:1;
		}
	}
  .details-center {
    width: 100%;
    margin: 0;
    display: inline-block;
  }
  .details-right {
    display: none;
  }
}
@media screen and (min-width: 1000px) and (max-width:1120px){
    .doc-details-content{
        width: 100% !important;
    }
    .details-center{
        margin: 0 0 0 260px;
        width: calc(100% - 260px);
    }
    .details-left{
        width: 250px;
    }
    .details-right{
        display: none;
    }
}
</style>