<template>
    <div class="download-content">
        <div class="download-banner"></div>
        <div class="download-banner-mobile">
            <h3>{{ i18n.download.downloadBtnName }}</h3>
            <div></div>
        </div>
        <div class="download-list-wrapper">
            <el-form :inline="true" :model="formData" class="download-filter">
                <el-form-item :label="i18n.download.manufacturer">
                    <el-select v-model="formData.manufacturer" multiple placeholder="">
                        <el-option
                            v-for="(item, index) in i18n.download.manufacturerList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="i18n.download.publishDate">
                    <el-select v-model="formData.publishDate" multiple placeholder="">
                        <el-option
                            v-for="(item, index) in i18n.download.publishDateList"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="LTS">
                    <el-checkbox v-model="formData.lts"></el-checkbox>
                </el-form-item>
            </el-form>
            <ul class="download-list">
                <li
                    class="download-item"
                    v-for="(item, index) in downloadList"
                    :key="index"
                >
                    <h3 class="title">{{ item.name }}</h3>
                    <el-button
                        size="medium"
                        class="download-btn"
                        type="primary"
                        icon="el-icon-download"
                        @click="download(item.downloadUrl)"
                        >{{ i18n.download.downloadBtnName }}</el-button
                    >
                    <p>{{ item.desc }}</p>
                    <ul class="url-list">
                        <li>
                            <img src="/search.png" alt="" />
                            <a :href="item.releaseDescUrl">{{
                                i18n.download.releaseDesc
                            }}</a>
                        </li>
                        <li>
                            <img src="/search.png" alt="" />
                            <a :href="item.installGuidenceUrl">{{
                                i18n.download.installGuidence
                            }}</a>
                        </li>
                        <li>
                            <img src="/search.png" alt="" />
                            <a :href="item.seekHelpUrl">{{
                                i18n.download.seekHelp
                            }}</a>
                        </li>
                        <li>
                            <img src="/search.png" alt="" />
                            <a :href="item.getIsoUrl">{{
                                i18n.download.getIso
                            }}</a>
                        </li>
                        <li>
                            <img src="/search.png" alt="" />
                            <a :href="item.lifeCycleUrl">{{
                                i18n.download.lifeCycle
                            }}</a>
                        </li>
                    </ul>
                    <div class="btn-mobile-wrapper">
                        <el-button
                            size="medium"
                            class="download-btn-mobile"
                            type="primary"
                            icon="el-icon-download"
                            @click="download(item.downloadUrl)"
                            >{{ i18n.download.downloadBtnName }}</el-button
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { downloadList } from "../../api/download"
let that = null;

export default {
    data() {
        that = this;
        return {
            formData: {
                manufacturer: [],
                publishDate: [],
                lts: false
            },
            list: []
        };
    },
    mounted () {
        this.list = this.i18n.download.downloadList;
        downloadList({
            manufacturer: "1",
            publishTime: "2"
        })
            .then(data => {
                console.log(data);
            })
            .catch(data => {
                console.log(data);
            });
    },
    computed: {
        downloadList() {
            if (
                !this.formData.manufacturer.length &&
                !this.formData.publishDate.length
            ) {
                return this.list.filter(item => {
                    return this.formData.lts
                        ? item.lts === this.formData.lts
                        : true;
                });
            } else if (!this.formData.manufacturer.length) {
                return this.list.filter(item => {
                    return (
                        this.formData.publishDate.indexOf(item.publishDate) >
                            -1 &&
                        (this.formData.lts
                            ? item.lts === this.formData.lts
                            : true)
                    );
                });
            } else if (!this.formData.publishDate.length) {
                return this.list.filter(item => {
                    return (
                        this.formData.manufacturer.indexOf(item.manufacturer) >
                            -1 &&
                        (this.formData.lts
                            ? item.lts === this.formData.lts
                            : true)
                    );
                });
            } else {
                return this.list.filter(item => {
                    return this.formData.publishDate.indexOf(item.publishDate) >
                        -1 &&
                        this.formData.manufacturer.indexOf(item.manufacturer) >
                            -1 &&
                        (this.formData.lts
                        ? item.lts === this.formData.lts
                        : true);
                });
            }
        }
    },
    methods: {
        download(url) {
            window.open(url);
        }
    }
};
</script>

<style lang="less">
.el-select__tags {
    min-width: 140px !important;
}
.el-form-item__label {
    font-size: 18px;
    color: #000;
    font-family: FZLTXIHJW;
}

.el-input__inner {
    font-size: 14px;
    color: #000;
    font-family: FZLTXIHJW;
}

.el-select-dropdown__item {
    color: #000;
    font-family: FZLTXIHJW;
}

.el-form-item {
    margin-right: 50px !important;
}

.el-form-item__content {
    min-width: 140px;
    min-height: 32px;
}

.el-button--primary {
    background-color: #002fa7;
}

.el-button--primary:focus,
.el-button--primary:hover {
    background-color: #002fa7;
}
.el-input {
    width: unset;
    margin: unset;
}
</style>
<style lang="less" scoped>
.download-content {
    width: 1200px;
    margin: 0 auto;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 15px;
    }
    .download-banner {
        height: 600px;
        background-color: #002FA7;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .download-banner-mobile {
        display: none;
        margin-top: 40px;
        h3 {
            text-align: center;
            font-size: 24px;
            font-family: FZLTHJW;
            margin-bottom: 10px;
            height: 34px;
            line-height: 34px;
        }
        div {
            width: 100%;
            height: 200px;
            background-color: #002FA7;
        }
        @media (max-width: 1000px) {
            display: block;
        }
    }
    .download-list-wrapper {
        .download-filter {
            margin-top: 22px;
            @media (max-width: 1000px) {
                display: none;
            }
        }
        .download-list {
            padding-top: 50px;
            border-top: 1px solid rgba(0, 0, 0, 0.5);
            margin-bottom: 150px;
            @media (max-width: 1000px) {
                padding-top: 0;
                border-top: unset;
                margin-bottom: 60px;
            }
            .download-item {
                width: 380px;
                margin: 0 30px 30px 0;
                box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                display: inline-block;
                padding: 36px 30px 16px 30px;
                @media (max-width: 1000px) {
                    display: block;
                    margin: 40px auto !important;
                    width: unset;
                }
                .title {
                    font-size: 24px;
                    margin-bottom: 24px;
                    @media (max-width: 1000px) {
                        text-align: center;
                    }
                }
                .download-btn {
                    margin-bottom: 24px;
                    @media (max-width: 1000px) {
                        display: none;
                    }
                }
                .btn-mobile-wrapper {
                    text-align: center;
                }
                .download-btn-mobile {
                    margin-bottom: 24px;
                    display: none;
                    @media (max-width: 1000px) {
                        display: inline-block;
                    }
                }
                p {
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.5);
                    font-family: FZLTXIHJW;
                    margin-bottom: 24px;
                }
                ul {
                    @media (min-width: 1000px) {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                }
                ul li {
                    margin: 0 0 20px 0;
                    display: inline-block;
                    line-height: 14px;
                    @media (max-width: 1000px) {
                        margin: 0 0 20px 0;
                    }
                    img {
                        width: 20px;
                        height: 17px;
                        vertical-align: middle;
                        @media (max-width: 1000px) {
                            display: none;
                        }
                    }
                    a {
                        font-size: 14px;
                        text-decoration: none;
                        margin-left: 5px;
                        color: #002fa7;
                    }
                    &:last-child {
                        flex: 0.86;
                    }
                }
            }
            .download-item:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
}
</style>
