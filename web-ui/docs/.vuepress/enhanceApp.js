import ElementUI from 'element-ui';
import './public/style/theme/index.css';
import './public/style/base.css';
import locale from 'element-ui/lib/locale/lang/en'
import'./public/style/markdown.less';
import directive from './libs/directive';
import './public/style/font-en.css';
import './public/style/font-cn.css';

export default ({
    Vue,
    siteData,
    isServer
}) => {
    Vue.directive('fade', directive.fade);
    if(!isServer){
        let $lang = window.location.href.includes('/en/') ? 'en' : 'zh';
        let screenWidth = document.body.clientWidth;
        Vue.prototype.isShowH5 = false;
        if(screenWidth <= 1000){
            Vue.prototype.isShowH5 = true;
        }
        if (window.location.href.includes('/en/')) {
            Vue.use(ElementUI, {locale});
            Vue.prototype.$isCn = false;
        } else {
            Vue.use(ElementUI);
            Vue.prototype.$isCn = true;
        }
        let pagesArr = [];
        siteData.pages.forEach(item => {
            if($lang === 'zh' && item.path.includes('/zh/')) {
                pagesArr.push(item);
            } else if($lang === 'en' && !item.path.includes('/zh/')) {
                pagesArr.push(item);
            }
        })
        Vue.prototype.$sitePages = pagesArr;
        let instance = new Vue({
            data () {
                return {
                    i18n: siteData.themeConfig.locales[$lang].lang
                }
            }
        })
        Vue.prototype.i18n = instance.i18n;
    }else{
        Vue.use(ElementUI);
    }
    let checkLoop = false;
    Vue.mixin({
        data () {
            return isServer ? {i18n: {}} : {}
        },
        mounted () {
            if(this.$router && this.$frontmatter) {
                document.title = this.$frontmatter.title || 'openEuler';
            }
        },
        created () {
            if(!checkLoop){
                checkLoop = true;
                const originalPush = this.$router.push;
                this.$router.push = function push(location) {
                    return originalPush.call(this, location).catch(err => err);
                }
            }
            if(isServer){
                this.i18n = siteData.themeConfig.locales[this.$lang].lang
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