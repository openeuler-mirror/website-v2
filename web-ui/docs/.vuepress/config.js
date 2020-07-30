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
	locales: {
		'/': {
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
		locales: {
			'en': {
			  lang: require('./lang/en.js')
			},
			'zh': {
			  lang: require('./lang/zh.js')
			}
		  }   
        
    },
    plugins: [
        [require('./sitePlugin.js')]
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://baidu.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    }
}