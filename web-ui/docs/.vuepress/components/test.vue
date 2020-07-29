<template>
    <div>
        <button @click="change">{{ i18n.home.test[0].test }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        change() {
            console.log(111);
        }
    }
};
</script>