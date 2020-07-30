import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './public/style/base.css';

if (!localStorage.getItem('locale') || localStorage.getItem('locale') === 'en') {
    import('./public/style/font-en.css');
} else {
    import('./public/style/font-cn.css');
}

export default ({
    Vue
}) => {
    Vue.mixin({
        data () {
            return {
                i18n: {}
            }
        },
        created () {
            let pagesArr = [];
            this.$sitePages.forEach(item => {
                if(this.$lang === 'zh' && item.path.includes('/zh/')) {
                    pagesArr.push(item);
                } else if(this.$lang === 'en' && !item.path.includes('/zh/')) {
                    pagesArr.push(item);
                }
            })
            this.$sitePages = pagesArr;


            const locales = this.$site;
            this.i18n = locales.themeConfig.locales[this.$lang].lang;
            const originalPush = this.$router.push;
            this.$router.push = function push(location) {
                return originalPush.call(this, location).catch(err => err);
            }
        },
        methods : {
            resolvePath(path){
                if(path){
                    const targetLocale = this.$lang === "zh" ? "/zh" : "/en";
                    return targetLocale + path;    
                }
                
            }
        }
    })
    Vue.use(ElementUI);
}