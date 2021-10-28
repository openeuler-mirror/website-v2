<template>
    <div class="compatibility-box">
        <common-banner
        :pc-src="'/img/compatibility/compatibility_banner.png'"
        :mobile-src="'/img/compatibility/compatibility_banner.png'"
        :inside-name="'SUPPORT'"
        :outside-name="i18n.compatibility.COMPATIBILITY"
        ></common-banner>
        <div class="compatibility-content">
            <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
                <!-- 板卡 -->
                <el-tab-pane :label="i18n.compatibility.DRIVE" name="drive">
                     <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.OS">
                            <el-select class="pc-select" 
                                v-model="formData.os" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.OS">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input 
                                v-model="formData.keyword" 
                                class="pc-search"
                                @keyup.enter.native='driverChange()'
                                :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="driverChange()"></i>
                            </el-input>
                            <el-input 
                                v-model="formData.keyword" 
                                class="mobile-search"
                                @keyup.enter.native='driverChange()'
                                :placeholder="i18n.compatibility.SEARCH_LABEL"
                            >
                                <i slot="suffix" class="icon-search" @click="driverChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="driverTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="architecture" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE" width="110"></el-table-column>
                        <el-table-column prop="driverName" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME" width="115"></el-table-column>
                        <el-table-column prop="os" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS" width="190"></el-table-column>
                        <el-table-column prop="version" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"  width="115"></el-table-column>
                        <el-table-column prop="type" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE" width="85" ></el-table-column>
                        <el-table-column prop="driverDate" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE" width="115"></el-table-column>
                        <el-table-column prop="chipVendor" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR" width="115"></el-table-column>
                        <el-table-column prop="boardModel" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL" width="160"></el-table-column>
                        <el-table-column prop="chipModel" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL" width="115"></el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <li class="item" v-for="(item, index) in driverTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE}}:</span>
                                    {{item.architecture}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME}}:</span>
                                    {{item.driverName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS}}:</span>
                                    {{item.os}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION}}:</span>
                                    {{item.version}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE}}:</span>
                                    {{item.type}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE}}:</span>
                                    {{item.driverDate}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR}}:</span>
                                    {{item.chipVendor}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL}}:</span>
                                    {{item.boardModel}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL}}:</span>
                                    {{item.chipModel}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 整机 -->
                <el-tab-pane :label="i18n.compatibility.HARDWARE" name="hardware">
                    <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.OS">
                            <el-select class="pc-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.OS">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input 
                                v-model="formData.keyword"
                                class="pc-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                            <el-input
                                v-model="formData.keyword"
                                class="mobile-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.SEARCH_LABEL"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="hardwareTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="hardwareFactory" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR" width="110"></el-table-column>
                        <el-table-column prop="hardwareModel" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL" width="230"></el-table-column>
                        <el-table-column prop="osVersion" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.OS" width="240"></el-table-column>
                        <el-table-column prop="date" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE" width="190"></el-table-column>
                        <el-table-column prop="productInformation" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION" width="230">
                            <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    @click="go(scope.row.id)"
                                >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION2}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="friendlyLink" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE" width="120">
                            <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    target="_blank"
                                    :href="scope.row.friendlyLink"
                                >{{ i18n.compatibility.LINK}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <li class="item" v-for="(item, index) in hardwareTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR}}:</span>
                                    {{item.hardwareFactory}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL}}:</span>
                                    {{item.hardwareModel}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.OS}}:</span>
                                    {{item.osVersion}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE}}:</span>
                                    {{item.date}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION}}:</span>
                                    <a
                                        class="table-link"
                                        @click="go(item.id)"
                                    >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION2 }}</a>
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE}}:</span>
                                    <a
                                        class="table-link"
                                        target="_blank"
                                        :href="item.friendlyLink"
                                    >{{ i18n.compatibility.LINK }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 软件 -->
                <!-- <el-tab-pane :label="i18n.compatibility.SOFTWARE" name="software">
                    <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SOFTWARETYPE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SOFTWARETYPE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ADAPTIVE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.ADAPTIVE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box" v-if="!software">
                            <el-input 
                                v-model="formData.keyword"
                                class="pc-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                            <el-input
                                v-model="formData.keyword"
                                class="mobile-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.SEARCH_LABEL"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="softwareTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="arch" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE" width="110"></el-table-column>
                        <el-table-column prop="type" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE" width="120"></el-table-column>
                        <el-table-column prop="softwareName" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME" width="200"></el-table-column>
                        <el-table-column prop="version" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION" width="110"></el-table-column>
                        <el-table-column prop="property" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES" width="150"></el-table-column>
                        <el-table-column prop="downloadLink" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK" width="100">
                             <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    target="_blank"
                                    :href="scope.row.downloadLink"
                                >{{ i18n.compatibility.LINK}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="os" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM" width="150"></el-table-column>
                        <el-table-column prop="license" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE" width="180"></el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <div class="wait" v-if="!softwareTableData">暂无数据</div>
                        <li class="item" v-for="(item, index) in softwareTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE}}:</span>
                                    {{item.arch}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE}}:</span>
                                    {{item.type}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME}}:</span>
                                    {{item.softwareName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION}}:</span>
                                    {{item.version}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES}}:</span>
                                    {{item.property}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK}}:</span>
                                    <a
                                        class="table-link"
                                        target="_blank"
                                        :href="item.downloadLink"
                                    >{{ i18n.compatibility.LINK }}</a>
                                </li>
                                 <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM}}:</span>
                                    {{item.os}}
                                </li>
                                 <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE}}:</span>
                                    {{item.license}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane> -->
            </el-tabs>
            <!-- 分页 -->
            <el-pagination
                class="compatibility-pagination"
                background
                @current-change="pageChange"
                :page-size="formData.pageSize"
                :current-page="formData.page"
                :layout="paginationLayout"
                :total="total"
                :hide-on-single-page="pageValue"
            ></el-pagination>
            <div class="bottomBanner">
                <div class="bottomBanner-content">
                    {{i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT}}
                    <a @click="goToHareware()" class="bottom-link">
                        {{i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE}}.
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
import { 
    hardwareList,
    hardwareOSOptions,
    hardwareArchitectureOptions,
    driverList, 
    driverOSOptions, 
    driverArchitectureOptions,
    softwareList
    } from "../../api/compatibility";

let that = null;

const locationMethods = {
    // 硬件列表
    getHardwareList(params) {
        that.tableLoading = true;
        hardwareList(params)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords) {
                that.total = data.totalRecords;
                that.hardwareTableData = data.list;
            } else {
                that.total = 0;
                that.hardwareTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    },
    // 驱动列表
    getDriverList(params) {
        that.tableLoading = true;
        driverList(params)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords) {
                that.total = data.totalRecords;
                that.driverTableData = data.list;
            } else {
                that.total = 0;
                that.driverTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    },
    // 软件列表
    getSoftwareList(params) {
        that.tableLoading = true;
        softwareList(params)
        .then(data => {
            that.tableLoading = false;
            console.log(data);
            if(data) {
                that.total = 100;
                that.softwareTableData = data;
            } else {
                that.total = 0;
                that.softwareTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    }
}

export default {
    data() {
        that = this;
        return {
            software:false,
            tabActiveName: 'drive',
            hardwareOSOptions: [],
            hardwareArchitectureOptions: [],
            driverOSOptions: [],
            driverArchitectureOptions: [],
            formData: {
                keyword: '',
                os: '',
                architecture: '',
                page: 1,
                pageSize: 10,
                lang:'zh'
            },
            hardwareTableData: [],
            softwareTableData:[],
            driverTableData: [],
            tableLoading: false,
            total: 0,
            pageValue: true
        };
    },
    components: {
        commonBanner,
    },
    computed: {},

    created() {},

    mounted() {
        // 获取软件列表json数据
        // this.getFile()
        let lang = '';
        if(window.location.pathname.indexOf('/en/') !== -1) {
            lang = 'en';
        } else if (window.location.pathname.indexOf('/ru/') !== -1) {
            lang = 'en';
        } else {
             lang = 'zh';
        }
        this.formData.lang = lang;
        this.initData(this.formData);
        // 下拉选项
        hardwareOSOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.hardwareOSOptions = data;
            }
        })
        hardwareArchitectureOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.hardwareArchitectureOptions = data;
            }
        })

        driverOSOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.driverOSOptions = data;
            }
        })

        driverArchitectureOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.driverArchitectureOptions = data;
            }
        })
    },
    methods: {
        initData(params) {
            if(this.tabActiveName === 'hardware') {
                locationMethods.getHardwareList(params);
            } else if(this.tabActiveName === 'drive') {
                locationMethods.getDriverList(params);
            } else if(this.tabActiveName=== 'software') {
                locationMethods.getSoftwareList(params)
            }
        },
        handleTabClick(tab, event) {
            this.tabActiveName === 'software'? this.software=true:this.software=false;
            let lang = '';
            if(window.location.pathname.indexOf('/en/') !== -1) {
                lang = 'en';
            } else if (window.location.pathname.indexOf('/ru/') !== -1) {
                lang = 'en';
            } else {
                 lang = 'zh';
            }
            this.formData = {
                keyword: '',
                os: '',
                architecture: '',
                page: 1,
                pageSize: 10,
                lang:lang
            }
            this.initData(this.formData);
        },
        pageChange(value) {
            this.formData.page = value;
            this.initData(this.formData);
        },
        // 硬件筛选
        hardwareChange() {
            this.formData.page = 1;
            locationMethods.getHardwareList(this.formData);
        },
        // 驱动筛选
        driverChange() {
            this.formData.page = 1;
            locationMethods.getDriverList(this.formData);
        },
        go (id) {
            this.$router.push({
                path: this.resolvePath('/compatibility/hardware-info/'),
                query: { id: id}
            })
        },
        goToHareware () {
            this.$router.push({
                path: this.resolvePath('/compatibility/hardware/')
            })
        }
    }
};
</script>

<style lang="less" scoped>
.wait {
  padding-bottom: 20px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.compatibility-content {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
        margin-bottom: 80px;
    }
    /deep/ .el-tabs__item {
        font-size: 24px;
        color:rgba(0, 0, 0, 0.5);
    }
    /deep/ .el-tabs__item.is-active {
        font-size: 24px;
        color:#000;
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 0px;
    }
    .compatibility-filter {
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
        .label-font{
            span{
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
            width: 217px;
            height: 32px;
            @media (max-width: 1000px) {
                display: none;
            }
            .icon-search{
                cursor: pointer;
            } 
        }
        .mobile-select,
        .mobile-search {
            display: none;
            width:100%;
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
    .compatibility-pagination {
        margin-top: 60px;
    }
    .bottomBanner {
        margin-top:40px;
        font-size: 18px;
        a {
            color: #002fa7;
            text-decoration: none;
            cursor: pointer;
        }
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
</style>
