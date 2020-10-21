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
        }],
        ['meta', { name: 'keywords', content: 'openEuler, 操作系统, 开放, 生态, 开源, Linux 开源, OS, open, ecosystem, open source, Linux open source'}]
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
            description: 'openEuler is an open source, free Linux distribution platform. The platform provides an open community for global developers to build an open, diversified, and architecture-inclusive software ecosystem. openEuler is also an innovative platform that encourages everyone to propose new ideas, explore new approaches, and practice new solutions.'        },
        '/zh/': {
            lang: 'zh',
            title: '',
            description: 'openEuler 是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。'        }
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