<!-- 角色说明 -->
<template>
    <div class="role-description">
        <common-banner 
        :pc-src="'/img/sig/roledescription-banner.png'"
        :mobile-src="'/img/sig/roledescription-banner.png'"
        :inside-name="'SIG'"
        :outside-name="i18n.sig.ROLE_DESCRIPTION.ROLE_DESCRIPTION"
        ></common-banner>
    </div>
</template>

<script>
import commonBanner from './../common/banner.vue';
export default {
    data () {
        return {
            
        }
    },
  components: {
        commonBanner
    }
}

</script>

<style lang='less'>
.markdown{
    table{
        thead{
            tr{
                th{
                    &:nth-of-type(2){
                        white-space:nowrap;
                    }
                }
            }
        }
    }
}
</style>
