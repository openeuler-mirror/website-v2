<!-- 认证服务 -->
<template>
    <div class="authentication-service">

    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    created () {
        if(this.i18n.community.SERVICE.SERVICE == ''){
            this.$router.push(this.resolvePath("/building/"));
        }
        
    }
}

</script>

<style lang='less'>

</style>
