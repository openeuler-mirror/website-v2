/**
 * @file  路由配置文件
 * */

export default [{
        path: '/',
        component: () => import('@/views/home/home.vue')
    },
    {
        path: '/download',
        component: () => import('@/views/download/download.vue')
    },
    {
        path: '/documentation/documentation',
        component: () => import('@/views/documentation/documentation.vue')
    },
    {
        path: '/documentation/docs-description',
        component: () => import('@/views/documentation/docs-description.vue')
    },
    {
        path: '/community/community-guidance',
        component: () => import('@/views/community/community-guidance.vue')
    },
    {
        path: '/community/event-list',
        component: () => import('@/views/community/event-list.vue')
    },
    {
        path: '/community/events-detail',
        component: () => import('@/views/community/events-detail.vue')
    },
    {
        path: '/community/blog-list',
        component: () => import('@/views/community/blog-list.vue')
    },
    {
        path: '/community/news-list',
        component: () => import('@/views/community/news-list.vue')
    },
    {
        path: '/community/mailing-list',
        component: () => import('@/views/community/mailing-list.vue')
    },
    {
        path: '/sig/sig-guidance',
        component: () => import('@/views/sig/sig-guidance.vue')
    },
    {
        path: '/sig/sig-list',
        component: () => import('@/views/sig/sig-list.vue')
    },
    {
        path: '/sig/sig-detail/:id',
        component: () => import('@/views/sig/sig-detail.vue'),
        props: {
            default: true
        }
    },
    {
        path: '/authentication',
        component: () => import('@/views/authentication/authentication.vue')
    },
    {
        path: '/security',
        component: () => import('@/views/security/security.vue')
    },
    {
        path: '*',
        component: () => import('@/views/404.vue')
    }
];