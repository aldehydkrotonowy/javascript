import Utils from '../Utils';

const HeroDesktop = (function () {

    const state = new WeakMap();

    class HeroDesktop extends Utils {
        constructor(scopeRoot) {
            super();
            this.initElems(scopeRoot);
            this.initListeners();
            this.initDefaults();
        }

        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                heros: [
                    {
                        container: scopeRoot.querySelectorAll('.col-md-3')[0],
                        inactive: scopeRoot.querySelectorAll('.hero-inactive')[0],
                        timeBar: scopeRoot.querySelectorAll('.time-bar')[0],
                        text: scopeRoot.querySelectorAll('.hero-text')[0],
                        textHover: scopeRoot.querySelectorAll('.hero-text-hover')[0],
                        [Symbol.toStringTag]: 'Hero'
                    },
                    {
                        container: scopeRoot.querySelectorAll('.col-md-3')[1],
                        inactive: scopeRoot.querySelectorAll('.hero-inactive')[1],
                        timeBar: scopeRoot.querySelectorAll('.time-bar')[1],
                        text: scopeRoot.querySelectorAll('.hero-text')[1],
                        textHover: scopeRoot.querySelectorAll('.hero-text-hover')[1],
                        [Symbol.toStringTag]: 'Hero'
                    },
                    {
                        container: scopeRoot.querySelectorAll('.col-md-3')[2],
                        inactive: scopeRoot.querySelectorAll('.hero-inactive')[2],
                        bgBigAd: scopeRoot.querySelector('.bg-big-ad'),
                        [Symbol.toStringTag]: 'Ad'
                    },
                    {
                        container: scopeRoot.querySelectorAll('.col-md-3')[3],
                        inactive: scopeRoot.querySelectorAll('.hero-inactive')[3],
                        timeBar: scopeRoot.querySelectorAll('.time-bar')[2],
                        text: scopeRoot.querySelectorAll('.hero-text')[2],
                        textHover: scopeRoot.querySelectorAll('.hero-text-hover')[2],
                        [Symbol.toStringTag]: 'Hero'
                    }
                ]
            });
        }

        initListeners() {
            const {heros, scopeRoot} = state.get(this);

            for (let hero of heros) {
                hero.container.addEventListener("mouseenter", () => {
                    this.heroMouseEnterHandler(hero);
                });
                hero.container.addEventListener("mouseleave", () => {
                    this.heroMouseLeaveHandler(hero);
                });
            }

            scopeRoot.addEventListener("mouseleave", this.scopeRootMouseLeaveHandler.bind(this));
        }

        initDefaults() {

            this.updateState(state, {
                duration: 5000,
                activeIndex: 0
            });

            const {duration, heros, activeIndex} = state.get(this);
            this.j2is(heros[activeIndex].inactive, {
                visibility: 'hidden'
            });
            this.j2is(heros[activeIndex].text, {
                opacity: 1
            });
            this.j2is(heros[activeIndex].timeBar, {
                opacity: 1,
                width: '100%'
            });

            this.updateState(state, {
                interval: setInterval(
                    () => {
                        console.log('in');
                        this.makeInactive();
                        this.makeActive();
                    }, duration)
            });
        }

        makeInactive() {
            const {activeIndex: ai, heros} = state.get(this);

            if (heros[ai][Symbol.toStringTag] === 'Hero') {
                this.j2is(heros[ai].inactive, {
                    visibility: 'visible'
                });
                this.j2is(heros[ai].text, {
                    opacity: 0
                });
                this.j2is(heros[ai].timeBar, {
                    opacity: 0,
                    width: 0
                });
            } else {
                this.j2is(heros[ai].inactive, {
                    visibility: 'visible'
                });
                this.j2is(heros[ai].bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '101%',
                    zIndex: '160'
                });
                setTimeout(() => {
                    this.j2is(heros[ai].bgBigAd, {
                        background: "url('img/hero/vegas.jpg') center center no-repeat",
                        width: '101%',
                        zIndex: '500'
                    });
                }, 300);
            }


            const newAi = ai === 3 ? 0 : ai + 1;
            this.updateState(state, {
                activeIndex: newAi
            });
        }

        makeActive() {
            const {activeIndex: ai, heros} = state.get(this);

            if (heros[ai][Symbol.toStringTag] === 'Hero') {
                this.j2is(heros[ai].inactive, {
                    visibility: 'hidden'
                });
                this.j2is(heros[ai].text, {
                    opacity: 1
                });
                this.j2is(heros[ai].timeBar, {
                    opacity: 1,
                    width: '100%'
                });
            } else {
                this.j2is(heros[ai].inactive, {
                    visibility: 'hidden'
                });
                this.j2is(heros[ai].bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '890px',
                    zIndex: '160'
                });
            }

        }

        heroMouseEnterHandler(hero) {
            const {interval, activeIndex: ai, heros} = state.get(this);
            clearInterval(interval);

            this.j2is(heros[ai].inactive, {
                visibility: 'visible'
            });

            if (heros[ai][Symbol.toStringTag] === 'Hero') {
                this.j2is(heros[ai].text, {
                    opacity: 0
                });
                this.j2is(heros[ai].timeBar, {
                    opacity: 0,
                    width: 0,
                    transition: 'none'
                });
            } else {
                this.j2is(heros[ai].bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '101%',
                    zIndex: '160'
                });
            }

            if (hero[Symbol.toStringTag] === 'Hero') {
                this.j2is(hero.textHover, {
                    opacity: 1
                });
            } else {
                this.j2is(hero.bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '890px',
                    zIndex: '160'
                });
            }

            this.j2is(hero.inactive, {
                visibility: 'hidden'
            });
        }

        heroMouseLeaveHandler(hero) {
            this.j2is(hero.inactive, {
                visibility: 'visible'
            });
            if (hero[Symbol.toStringTag] === 'Hero') {
                this.j2is(hero.textHover, {
                    opacity: 0
                });
            } else {
                this.j2is(hero.bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '101%',
                    zIndex: '160'
                });

            }
        }

        scopeRootMouseLeaveHandler() {
            const {duration, heros, activeIndex: ai} = state.get(this);

            this.j2is(heros[ai].inactive, {
                visibility: 'hidden'
            });

            if (heros[ai][Symbol.toStringTag] === "Hero") {
                this.j2is(heros[ai].text, {
                    opacity: 1
                });
                this.j2is(heros[ai].timeBar, {
                    opacity: 1,
                    width: '100%'
                });
            } else {
                this.j2is(heros[ai].bgBigAd, {
                    background: "url('img/hero/vegas.jpg') center center no-repeat",
                    width: '890px',
                    zIndex: '160'
                });
            }

            this.updateState(state, {
                interval: setInterval(
                    () => {
                        this.makeInactive();
                        this.makeActive();
                    }, duration)
            });
        }

    }

    return HeroDesktop;

})();

export default HeroDesktop;
