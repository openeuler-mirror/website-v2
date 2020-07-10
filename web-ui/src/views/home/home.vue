<template>
    <div class="home">
        <ul>
            <li v-for="(item, index) in $t('home.test')" :key="index">
                {{ item.test }}
            </li>
        </ul>
        <el-button type="info" @click="toDocs">{{
            $t("download.test")
        }}</el-button>
    </div>
</template>

<script>
import { downloadList } from "@/api/download"

export default {
    name: "Home",
    mounted() {
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
    methods: {
        toDocs() {
            this.$i18n.locale =
                this.$i18n.locale === "zh-cn" ? "zh-en" : "zh-cn";
            // this.$router.push("documentation/documentation");
        }
    }
};
</script>
