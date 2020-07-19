module.exports = {
	home: false,
    title: '',
    description: '',
    head: [
        ['link', { rel: 'icon', href: '/public/openeuler.png' }],
	],
	markdown: {
        lineNumbers: false
	},
	locales: {
		'/': {
		  lang: 'en-US',
		  title: '',
		  description: ''
		},
		'/zh/': {
		  lang: 'zh-CN',
		  title: '',
		  description: ''
		}
	},
    themeConfig: {
		locales: {
			'/': {
			  lang: require('./lang/en.js')
			},
			'/zh/': {
			  lang: require('./lang/zh.js')
			}
		  }   
        
    }
}