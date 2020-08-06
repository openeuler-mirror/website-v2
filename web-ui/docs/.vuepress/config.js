module.exports = {
	home: false,
    title: '',
    description: '',
    head: [
        ['link', { rel: 'icon', href: '/public/openeuler.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
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