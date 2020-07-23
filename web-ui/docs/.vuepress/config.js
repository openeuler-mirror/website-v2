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
        
    }
}