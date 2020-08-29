<template>
    <div class="safety-bulletin-content" v-loading.fullscreen="loading">
        <div class="breadcrumb" @click="to">{{i18n.security.SECURITY_ADVISORIES}} \</div>
        <div class="bulletinInner">
            <h1>{{i18n.security.SECURITY_ADVISORIES}}{{i18n.security.DETAIL}}</h1>
            <h2>{{detailData.securityNoticeNo}}</h2>
            <p>{{i18n.security.SYNOPSIS}}: {{detailData.summary}}</p>
            <p>{{i18n.security.RELEASE_DATE}}: {{detailData.announcementTime}}</p>
            <h2>{{i18n.security.BRIEF_INTRODUCTION}}</h2>
            <p>{{detailData.introduction}}</p>
            <h2>{{i18n.security.SEVERITY}}</h2>
            <p>{{detailData.type}}</p>
            <h2>{{i18n.security.THEME}}</h2>
            <p>{{detailData.subject}}</p>
            <h2>{{i18n.security.DESCRIPTION}}</h2>
            <p>{{detailData.description}}</p>
            <h2>{{i18n.security.AFFECTED_COMPONENTS}}</h2>
            <p>{{detailData.affectedComponent}}</p>
            <h2>{{i18n.security.AFFECTED_PRODUCTS}}</h2>
            <p>{{detailData.affectedProduct}}</p>
            <h2>CVE</h2>
            <div class="link-group">
                <a v-for="(item, index) in detailData.cveId.split(';')" :key="index" @click="go(item)">{{item}}</a>    
            </div>
            <h2>{{i18n.security.PACKAGE}}</h2>
            <div class="link-group">
                <a v-for="(item, index) in detailData.packageName.split(';')" @click="open(item)">{{item}}</a>    
            </div>
            <h2>{{i18n.security.REFERENCE_DOCUMENTS}}</h2>
            <a :href="detailData.referenceDocuments" target="_blank">{{detailData.referenceDocuments}}</a>
        </div>
    </div>
</template>

<script>
import { securityDetail, getDownloadUrl } from "../../api/security"
let that = null;

const locationMethods = {
    getSecurityDetail () {
        that.loading = true;
        securityDetail({
            sn: that.$route.query.id
        })
        .then(data => {
            that.loading = false;
            if(data){
                that.detailData = data;
            }

        })
        .catch(data => {
            that.$message.error(data);
            that.loading = false;
        });
    },
    getDownloadUrl (id) {
        getDownloadUrl({
            id
        })
        .then(data => {
            window.open(data.packageLink);
        })
        .catch(data => {
            that.$message.error(data);
        });
    }
}
export default {
    data() {
        that = this;
        return {
            loading: false,
            detailData: {
                cveId: '',
                packageName: ''
            }
        };
    },
    created () {
        locationMethods.getSecurityDetail();
    },
    methods: {
        to () {
            this.$router.push({
                path: this.resolvePath('/security/safety-bulletin/')
            })
        },
        go (id) {
            this.$router.push({
                path: this.resolvePath('/security/cve/detail.html'),
                query: {id}
            })
        },
        open(id) {
            locationMethods.getDownloadUrl(id);
        }
    }
};
</script>
<style lang="less" scoped>
.safety-bulletin-content {
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
    .bulletinInner {
        h1 {
            font-size: 36px;
            margin-bottom: 104px;
            font-family: FZLTCHJW;
            @media (max-width: 1000px) {
                margin-top: 40px;
                margin-bottom: 30px;
                font-size: 16px;
                line-height: 26px;
                font-family: FZLTCHJW;
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
                font-family: FZLTHJW;
            }
        }
        p {
            color: rgba(0, 0, 0, .5);
            font-size: 14px;
            line-height: 32px;
            margin-bottom: 40px;
            font-family: FZLTXIHJW;
            @media (max-width: 1000px) {
                margin-bottom: 30px;
                font-size: 14px;
                line-height: 24px;
            }
        }
        a {
            color: #002fa7;
            text-decoration: none;
            font-size: 14px;
            line-height: 32px;
            font-family: FZLTXIHJW;
            cursor: pointer;
            @media (max-width: 1000px) {
                line-height: 24px;
            }
        }
        h2:last-child {
            margin-top: 40px;
            @media (max-width: 1000px) {
                margin-top: 30px;
            }
        }
        .link-group {
            margin-bottom: 40px;
            @media (max-width: 1000px) {
                margin-bottom: 30px;
            }
            a {
                display: block;
            }
        }
    }
    p {
        white-space: pre-wrap;
        text-align: justify;
    }
}
</style>
