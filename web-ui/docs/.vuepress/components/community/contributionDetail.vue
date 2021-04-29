<template>
    <div class="container">
        <common-banner
            :pc-src="'/img/community/contribution/contribution-banner-pc.png'"
            :mobile-src="'/img/community/contribution/contribution-banner-h5.png'"
            :inside-name="'COMMUNITY'"
            :outside-name="i18n.community.CONTRIBUTION_H5.TITLE"
        >
            <div slot="pc-slot" class="pc-btn" @click="back">回到TRAIL CHESS</div>
        </common-banner>
    </div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.push('/'+this.$lang+'/community/contribution/')
            }
        }
    }
</script>
<style lang="less" scoped>
.container {
    .pc-btn {
        color: #fff;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        width: 160px;
        height: 40px;
        border-radius: 8px;
        background-color: #002fa7;
        position: absolute;
        left: 0;
        top: 254px;
        cursor: pointer;
    }
}
</style>
