/**
 * @file  路由配置入口文件
 * */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';

Vue.use(Router);

const router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    next();

});

export default router;