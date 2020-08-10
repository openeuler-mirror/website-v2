<template>
    <div class="cve-detail-content" v-loading.fullscreen="loading">
        <div class="breadcrumb" @click="to">CVE \</div>
        <div class="cveInner">
            <h1>{{i18n.security.CVE_DETAIL}}</h1>
            <h2>{{detailData.cveId}}</h2>
            <p>{{i18n.security.RELEASE_DATE}}: {{detailData.announcementTime}}<br/>{{i18n.security.MODIFIED_TIME}}: {{detailData.announcementTime}}</p>
            <h2>{{i18n.security.SYNOPSIS}}</h2>
            <p>{{detailData.summary}}</p>
            <h2>{{i18n.security.METRICS}}</h2>
            <ul class="metrics-list">
                <li class="item">
                    <ul>
                        <li></li>
                        <li>NVD</li>
                        <li>openEuler</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>CVSS{{i18n.security.SCORE}}</li>
                        <li>{{detailData.cvssScoreNVD}}</li>
                        <li>{{detailData.cvssScoreOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Attack Vector</li>
                        <li>{{detailData.attackVectorNVD}}</li>
                        <li>{{detailData.attackVectorOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Attack Complexity</li>
                        <li>{{detailData.attackComplexityNVD}}</li>
                        <li>{{detailData.attackComplexityOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Privileges Required</li>
                        <li>{{detailData.privilegesRequiredNVD}}</li>
                        <li>{{detailData.privilegesRequiredOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>User Interaction</li>
                        <li>{{detailData.userInteractionNVD}}</li>
                        <li>{{detailData.userInteractionOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Scope</li>
                        <li>{{detailData.scopeNVD}}</li>
                        <li>{{detailData.scopeOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Confidentiality</li>
                        <li>{{detailData.confidentialityNVD}}</li>
                        <li>{{detailData.confidentialityOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Integrity</li>
                        <li>{{detailData.integrityNVD}}</li>
                        <li>{{detailData.integrityOE}}</li>
                    </ul>
                </li>
                <li class="item">
                    <ul>
                        <li>Availability</li>
                        <li>{{detailData.availabilityNVD}}</li>
                        <li>{{detailData.availabilityOE}}</li>
                    </ul>
                </li>
            </ul>
            <h2>{{i18n.security.SECURITY_ADVISORIES}}</h2>
            <ul class="security-list">
                <li class="item">
                    <ul>
                        <li>{{i18n.security.SECURITY_ADVISORIES_NAME}}</li>
                        <li>{{i18n.security.SYNOPSIS}}</li>
                        <li>{{i18n.security.RELEASE_DATE}}</li>
                        <li>{{i18n.security.OPERATION}}</li>
                    </ul>
                </li>
                <li class="item" v-for="(item, index) in detailData.noticeList" :key="index">
                    <ul>
                        <li><span>{{i18n.security.SECURITY_ADVISORIES_NAME}}:</span>{{item.securityNoticeNo}}</li>
                        <li><span>{{i18n.security.SYNOPSIS}}:</span>{{item.summary}}</li>
                        <li><span>{{i18n.security.RELEASE_DATE}}:</span>{{item.announcementTime}}</li>
                        <li><span>{{i18n.security.OPERATION}}:</span><a @click="toDetail(item.securityNoticeNo)">{{i18n.security.DETAIL}}</a></li>
                    </ul>
                </li>
            </ul>
            <h2>{{i18n.security.AFFECTED_PRODUCTS}}</h2>
            <ul class="affect-list">
                <li class="item">
                    <ul>
                        <li>{{i18n.security.PRODUCT}}</li>
                        <li>{{i18n.security.PACKAGE}}</li>
                        <li>{{i18n.security.STATUS}}</li>
                    </ul>
                </li>
                <li class="item" v-for="(item, index) in detailData.packageList">
                    <ul>
                        <li><span>{{i18n.security.PRODUCT}}:</span>{{item.productName}}</li>
                        <li><span>{{i18n.security.PACKAGE}}:</span>{{item.packageName}}</li>
                        <li><span>{{i18n.security.STATUS}}:</span>{{item.status}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { cveDetail } from "../../api/security"
let that = null;

const locationMethods = {
    getCveDetail () {
        that.loading = true;
        cveDetail({
            cveId: that.$route.query.id
        })
        .then(data => {
            that.loading = false;
            if(data && data.list && data.list.length){
                that.detailData = data.list[0];
            }

        })
        .catch(data => {
            that.$message.error(data);
            that.loading = false;
        });
    }
}
export default {
    data() {
        that = this;
        return {
            loading: false,
            detailData: {}
        };
    },
    created () {
        locationMethods.getCveDetail();
    },
    methods: {
        to () {
            this.$router.push({
                path: this.resolvePath('/security/cve/')
            });
        },
        toDetail (id) {
            this.$router.push({
                path: this.resolvePath('/security/safety-bulletin/detail.html'),
                query: {id}
            });
        }
    }
};
</script>
<style lang="less" scoped>
.cve-detail-content {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
        margin-bottom: 80px;
    }
    .breadcrumb {
        margin-top: 34px;
        margin-bottom: 16px;
        font-size: 20px;
        color: #002fa7;
        line-height: 20px;
        font-family: FZLTHJW;
        cursor: pointer;
        @media (max-width: 1000px) {
            display: none;
        }
    }
    .cveInner {
        h1 {
            font-size: 36px;
            margin-bottom: 104px;
            font-family: FZLTCHJW;
            @media (max-width: 1000px) {
                font-size: 16px;
                line-height: 26px;
                margin-bottom: 30px;
                margin-top: 40px;
            }
        }
        h2 {
            margin-bottom: 20px;
            font-family: FZLTHJW;
            font-size: 24px;
            font-weight: normal;
            @media (max-width: 1000px) {
                font-size: 14px;
                line-height: 24px;
                margin-bottom: 20px;
            }
        }
        p {
            color: rgba(0, 0, 0, .5);
            font-size: 14px;
            line-height: 32px;
            margin-bottom: 40px;
            font-family: FZLTXIHJW;
            @media (max-width: 1000px) {
                line-height: 24px;
                margin-bottom: 30px;
            }
        }
        a {
            color: #002fa7;
            text-decoration: none;
            cursor: pointer;
        }
        .metrics-list,
        .security-list,
        .affect-list {
            margin-bottom: 40px;
            @media (max-width: 1000px) {
                margin-bottom: 30px;
            }
            .item:first-child {
                li {
                    color: #000 !important;
                    font-size: 16px !important;
                }
            }
            .item > ul {
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: rgba(0, 0, 0, .85);
                margin: 0 30px;
                
                li:first-child {
                    font-size: 16px;
                    color: #000;
                }
                li:nth-child(2) {
                    font-size: 14px;
                    color: rgba(0, 0, 0, .85);
                    text-align: center;
                }
                li:nth-child(3) {
                    font-size: 14px;
                    text-align: right;
                    color: rgba(0, 0, 0, .85);
                }
                li:nth-child(4) {
                    font-size: 14px;
                    text-align: right;
                    color: rgba(0, 0, 0, .85)
                }
                li {
                    flex: 0 0 33.333333%;
                    span {
                        display: none;
                    }
                }
            }
            .item:nth-child(odd) {
                background-color: rgba(0, 0, 0, .05);
            }
        }
        .metrics-list {
            @media (max-width: 1000px) {
                margin-bottom: 30px;
                .item:first-child {
                    li {
                        color: #000 !important;
                        font-size: 14px !important;
                    }
                }
            }
        }
        .security-list .item > ul li {
            flex: 0 0 25%;
        }
        .security-list .item > ul li:nth-child(3) {
            text-align: center;
        }
        .security-list .item > ul li:nth-child(4) {
            text-align: right;
        }
        .security-list,
        .affect-list {
            @media (max-width: 1000px) {
                .item:nth-child(1) {
                    display: none;
                }
                .item:nth-child(even) {
                    background-color: rgba(0, 0, 0, .05);
                }
                .item > ul {
                    display: block;
                    padding: 20px;
                    margin: 0;
                    height: unset;
                    li {
                        text-align: left !important;
                        display: block;
                        margin-bottom: 12px;
                        span {
                            display: inline;
                            color: #000;
                            margin-right: 4px;
                        }
                    }
                    li:first-child {
                        font-size: 12px;
                        color: rgba(0, 0, 0, .85);
                    }
                    li:nth-child(2),
                    li:nth-child(3),
                    li:nth-child(4) {
                        font-size: 12px;
                        color: rgba(0, 0, 0, .85);
                    }
                    li:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
        .metrics-list {
            @media (max-width: 1000px) {
                .item > ul {
                    height: 52px;
                    margin: 0 10px;
                    font-size: 12px;
                    &:first-child {
                        font-size: 14px;
                    }
                    li:first-child {
                        font-size: 12px;
                        color: #000;
                    }
                }
            }
        }
    }
    p {
        white-space: pre-wrap;
        text-align: justify;
    }
}
</style>
