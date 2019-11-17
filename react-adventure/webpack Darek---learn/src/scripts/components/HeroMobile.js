import Utils from '../Utils';

const HeroMobile = (function () {

    const state = new WeakMap();

    class HeroMobile extends Utils {
        constructor(scopeRoot) {
            super();
            this.initElems(scopeRoot);
            this.initCarousel();
        }

        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                carousel: scopeRoot.querySelector(".carousel")
            });
        }

        initCarousel() {
            const {carousel} = state.get(this);
            $(carousel).slick({
                centerMode: true,
                centerPadding: '15px',
                dots: true,
                arrows: false
            });
        }

    }
    return HeroMobile;

})();

export default HeroMobile;
