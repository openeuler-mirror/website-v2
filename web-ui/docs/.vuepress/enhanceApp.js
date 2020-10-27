import ElementUI from 'element-ui';
import './public/style/theme/index.css';
import './public/style/base.css';
import locale from 'element-ui/lib/locale/lang/en'
import'./public/style/markdown.less';
import directive from './libs/directive';
import './public/style/font-en.css';
import './public/style/font-cn.css';

export default ({
    Vue
}) => {
    Vue.directive('fade', directive.fade);
    let checkLoop = false;
    let checkImport = false;
    Vue.mixin({
        data () {
            return {
                i18n: {},
                isShowH5: false,
            }
        },
        mounted () {
            if(this.$router && this.$frontmatter) {
                document.title = this.$frontmatter.title || 'openEuler';
            }
            if(!checkImport){
                if (window.location.href.includes('/en/')) {
                    checkImport = true;
                    Vue.use(ElementUI, {locale});
                    Vue.prototype.$isCn = false;
                } else {
                    checkImport = true;
                    Vue.use(ElementUI);
                    Vue.prototype.$isCn = true;
                }
            }
            let screenWidth = document.body.clientWidth;
            if(screenWidth <= 1000){
                this.isShowH5 = true;
            }
        },
        created () {
            let pagesArr = [];
            if(!checkLoop){
                checkLoop = true;
                this.$sitePages.forEach(item => {
                    if(this.$lang === 'zh' && item.path.includes('/zh/')) {
                        pagesArr.push(item);
                    } else if(this.$lang === 'en' && !item.path.includes('/zh/')) {
                        pagesArr.push(item);
                    }
                })
                this.$sitePages = pagesArr;
                const originalPush = this.$router.push;
                this.$router.push = function push(location) {
                    return originalPush.call(this, location).catch(err => err);
                }
            }
            
            const locales = this.$site;
            if(this.$router){
                this.i18n = locales.themeConfig.locales[this.$lang].lang;
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
    
    
}