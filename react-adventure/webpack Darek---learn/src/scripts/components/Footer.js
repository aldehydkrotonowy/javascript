import Utils from '../Utils';

const Footer = (function () {

    const state = new WeakMap();

    class Footer extends Utils {
        constructor(scopeRoot) {
            super();
            this.initElems(scopeRoot);
            this.initBackToTopBtn();
        }

        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                backToTopBtn: scopeRoot.querySelector("#footer-btn-backtotop")
            });
        }

        initBackToTopBtn() {
            const {backToTopBtn} = state.get(this);
            const scrollToTopAniMS = 300;

            $(backToTopBtn).click(() => $('html,body').animate({scrollTop: 0}, scrollToTopAniMS));
        }
    }
    return Footer;

})();

export default Footer;
