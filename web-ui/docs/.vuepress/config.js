module.exports = {
    home: false,
    title: '',
    description: '',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }],
        ['meta', {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1,user-scalable=no'
        }],
        ['script', {
            src: '/js/ba.js'
        }]
    ],
    markdown: {
        lineNumbers: false,
        extendMarkdown: md => {
            md.disable('emoji');
        }
    },
    plugins: [
        [require('./sitePlugin.js')]
    ],
    shouldPrefetch: () => {
        return false;
    },
    configureWebpack: (config, isServer) => {
        if (!isServer) {
            const CompressionPlugin = require('compression-webpack-plugin');
            config.plugins.push(new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$/,
                threshold: 10240,
                minRatio: 0.8
            }))
        }
    },
    locales: {
        '/': {
            lang: 'zh',
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
            '/api-sig': {
                target: 'https://api.openeuler.org/meetings',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-sig': ''
                }
            },
            '/api-old': {
                target: 'https://cve.openeuler.org',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api-old': ''
                }
            },
            '/api': {
                target: 'https://openeuler.org/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }
}