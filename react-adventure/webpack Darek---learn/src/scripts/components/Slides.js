import Utils from '../Utils';

const Slides = (function () {

    const state = new WeakMap();

    class Slides extends Utils {
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
            const template = this.getSlickSliderTemplate();
            $(carousel).slick({
                infinite: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                nextArrow: template.nextArrow,
                prevArrow: template.prevArrow,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {  slidesToShow: 4 }
                    }, {
                        breakpoint: 992,
                        settings: {  slidesToShow: 7 }
                    }, {
                        breakpoint: 948,
                        settings: {  slidesToShow: 6 }
                    }, {
                        breakpoint: 800,
                        settings: {  slidesToShow: 5 }
                    }, {
                        breakpoint: 660,
                        settings: {  slidesToShow: 4 }
                    }, {
                        breakpoint: 520,
                        settings: {  slidesToShow: 3 }
                    }, {
                        breakpoint: 380,
                        settings: {  slidesToShow: 2 }
                    }
                ]
            });
        }
        getSlickSliderTemplate() {
            const prevArrow = document.querySelector('#templateSlickSlider_Prev');
            const nextArrow = document.querySelector('#templateSlickSlider_Next');
            return {
                prevArrow: prevArrow.innerHTML,
                nextArrow: nextArrow.innerHTML
            };
        }

    }
    return Slides;

})();

export default Slides;
