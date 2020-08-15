let fadeInElements = null;
let curElement = null;

let visibleRect = null;
let visibleRectElemTop = null;
let visibleRectElemBottom = null;

let unvisibleRect = null;
let unvisibleRectElemTop = null;
let unvisibleRectElemBottom = null;
let unvisibleRectElemTopAll = null;

const privacyMethods = {

    isElemVisible (el) {
        visibleRect = el.getBoundingClientRect();
        visibleRectElemTop = visibleRect.top + 200;
        visibleRectElemBottom = visibleRect.bottom - 200;
        return visibleRectElemTop < window.innerHeight && visibleRectElemBottom >= 0;
    },
    isElemUnvisible (el) {
        unvisibleRect = el.getBoundingClientRect();
        unvisibleRectElemTopAll = unvisibleRect.top;
        unvisibleRectElemBottom = unvisibleRect.bottom;
        unvisibleRectElemTop = unvisibleRect.top + unvisibleRect.height;
        return unvisibleRectElemTop <  0 || !(unvisibleRectElemTopAll < window.innerHeight && unvisibleRectElemBottom >= 0);
    },
    handleScroll () {
        for (let i = 0; i < fadeInElements.length; i++) {
            curElement = fadeInElements[i];
            if (privacyMethods.isElemVisible(curElement)) {
                curElement.style.opacity = '1';
                curElement.style.transform = 'scale(1)';
            }
            if(privacyMethods.isElemUnvisible(curElement)){
                curElement.style.opacity = '0';
                curElement.style.transform = 'scale(0.8)';
            }
        }
    }
}

const exportMethods = {
    fade : {
        inserted(el){
            fadeInElements = Array.from(el.getElementsByClassName('fade-in'));
            document.addEventListener('scroll', privacyMethods.handleScroll);
            privacyMethods.handleScroll();
        },
        unbind() {
            document.removeEventListener('scroll', privacyMethods.handleScroll);
        }
    }
};

export default exportMethods;