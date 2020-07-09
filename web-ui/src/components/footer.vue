<template>
    <div class="footer-wrapper">
        <div class="footer-content">
            <div class="footer-left">
                <div class="footer-logo">{{ $t("common.footer.leftLogo") }}</div>
                <div class="footer-mail">{{ $t("common.footer.mail") }}</div>
            </div>
            <div class="footer-right">
                <p class="footer-copyright">{{ $t("common.footer.copyright") }}</p>
                <ul class="right-list">
                    <li v-for="(item, index) in $t('common.footer.rightList')" :key="index"><a href="/">{{ item }}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {}
};
</script>

<style lang="less" scoped>
.footer-wrapper {
    height: 176px;
    background-color: #111;
    .footer-content {
        margin: 0 auto;
        height: 100%;
        width: 62.5%;
        min-width: 1000px;
        display: flex;
        justify-content: space-between;
        .footer-left {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .footer-logo {
                font-size: 40px;
                font-weight: border;
                color: @text-white;
            }
            .footer-mail {
                color: @text-white;
                margin-top: 10px;
            }
        }
        .footer-right {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            .footer-copyright {
                color: #909090;
                margin-bottom: 10px;
            }
            .right-list {
                display: flex;
                align-items: flex-end;
                li {
                    margin-left: 10px;  
                    a {
                        color: #467fbf;
                        text-decoration: none;
                    } 
                }
               
            }
        }
    }
}
</style>
