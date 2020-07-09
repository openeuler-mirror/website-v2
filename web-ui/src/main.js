/**
 * @file  vue组件主入口
 * */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {
    Button,
    Select
} from 'element-ui';
import Vue18n from 'vue-i18n';
import '@/assets/style/base.css';

Vue.use(Vue18n);

Vue.use(Button);
Vue.use(Select);

const i18n = new Vue18n({
    locale: localStorage.getItem('locale') || 'zh-cn',
    messages: {
        'zh-cn': require('@/lang/cn'), // 中文语言包
        'zh-en': require('@/lang/en') // 英文语言包
    }
});

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app');