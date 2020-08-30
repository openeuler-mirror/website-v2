module.exports = {
    home: false,
    title: '',
    description: '',
    head: [
        ['link', {
            rel: 'icon',
            href: '/public/openeuler.png'
        }],
        ['meta', {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1,user-scalable=no'
        }],
        ['script', {
            async: 'async',
            src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
        }],
    ],
    markdown: {
        lineNumbers: false
    },
    plugins: [
        [require('./sitePlugin.js')]
    ],
    locales: {
        '/': {
            lang: 'en',
            title: '',
            description: ''
        },
        '/en/': {
            lang: 'en',
            title: '',
            description: ''
        },
        '/zh/': {
            lang: 'zh',
            title: '',
            description: ''
        }
    },
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        locales: {
            'en': {
                lang: require('./lang/en.js')
            },
            'zh': {
                lang: require('./lang/zh.js')
            }
        },
        smoothScroll: true

    },
    devServer: {
        proxy: {
            '/api/sig': {
                target: 'http://119.8.32.82',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/sig': ''
                }
            },
            '/api/old-api': {
                target: 'https://cve.openeuler.org',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/old-api': ''
                }
            },
            '/api': {
                target: 'http://159.138.45.71',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }
}