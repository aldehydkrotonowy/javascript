import PerfectScrollbar from 'perfect-scrollbar';
import Utils from '../Utils';
import * as actions from '../store/actions/Actions';


const NavbarMobile = (function () {

    const state = new WeakMap();

    class NavbarMobile extends Utils {
        constructor(scopeRoot, _store) {
            super();
            this.initDependencies(_store);
            this.initElems(scopeRoot);
            this.initListeners();
            this.initCustomScrollbar();
            this.initDefaults();
            this.screenSizeChangeWatcher();
        }


        initDependencies(_store) {
            this.store = _store;
        }


        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                menuMobile: scopeRoot.querySelector("#wh-menu-mobile"),
                hamburger: scopeRoot.querySelector("#hamburger"),
                mobileBtns: scopeRoot.querySelector("#mobileBtns"),
                content: document.querySelector("#content"),
                mobileNavText: scopeRoot.querySelector("#mobileNavText"),
                subMenuTriggerAll: scopeRoot.querySelectorAll(".subMenuTrigger"),
                mobileNavTextWrapper: scopeRoot.querySelector("#mobileNavTextWrapper"),
                toHideOnSubMenuAll: scopeRoot.querySelectorAll(".toHideOnSubMenu")
            });
        }

        initListeners() {
            const {hamburger, mobileNavTextWrapper, subMenuTriggerAll} = state.get(this);

            hamburger.addEventListener("click", this.hamburgerClickHandler.bind(this));
            mobileNavTextWrapper.addEventListener("click", this.navTextClickHandler.bind(this));
            for (let el of subMenuTriggerAll) {
                el.addEventListener("click", () => {
                    this.subMenuClickHandler(el);
                });
            }
        }

        initDefaults() {
            this.updateState(state, {
                subMenuIsOpen: false
            });
        }


        screenSizeChangeWatcher() {
            const {mobileBtns} = state.get(this);
            $(window).resize(() => {

                const {betslip:be, navbarMobile:nm} = this.store.getState();

                const isMobile = this.viewport().width < 992;

                if (isMobile) {
                    if (be.isToggled) {

                        if (!nm.menuIsOpen) {
                            this.j2is(mobileBtns, {
                                transform: 'translateY(-44px)'
                            });
                        }

                        const htmlRef = document.querySelector('html');

                        this.j2is(htmlRef, {
                            overflow: 'hidden'
                        });
                    }
                } else {
                    this.j2is(mobileBtns, {});

                    if (nm.menuIsOpen) {
                        this.hamburgerClickHandler();
                    }
                }
            });
        }

        initCustomScrollbar() {
            new PerfectScrollbar('.wh-mobile-top');
            for (let el of document.querySelectorAll(".wh-menu-mobile-sub")) {
                new PerfectScrollbar(el);
            }
            new PerfectScrollbar('.content');
        }

        hamburgerClickHandler() {

            const {betslip:be, navbarMobile:nm} = this.store.getState();

            const {menuMobile, mobileBtns, content} = state.get(this);

            const htmlRef = document.querySelector('html');

            if (!nm.menuIsOpen) {

                if (be.isToggled) {
                    const betslipRef = document.querySelector('#betslip');

                    this.j2is(betslipRef, {
                        pointerEvents: 'none',
                        transition: 'transform 300ms ease-out',
                        visibility: 'visible',
                        transform: 'translateX(270px)'
                    });
                }

                this.j2is(menuMobile, {
                    transform: 'translateX(0)'
                });

                this.j2is(mobileBtns, {
                    transform: 'translateX(270px)'
                });

                this.j2is(content, {
                    pointerEvents: 'none',
                    transform: 'translateX(270px)'
                });

                this.j2is(htmlRef, {
                    overflow: 'hidden'
                });


            } else {

                if (be.isToggled) {
                    const betslipRef = document.querySelector('#betslip');

                    this.j2is(betslipRef, {
                        transition: 'transform 300ms ease-out',
                        visibility: 'visible',
                        transform: 'translateY(-41px)'
                    });

                    this.j2is(mobileBtns, {
                        transform: 'translateY(-44px)'
                    });
                } else {
                    this.j2is(mobileBtns, {
                        transform: 'translateX(0)'
                    });
                }


                this.j2is(menuMobile, {
                    transform: 'translateX(-270px)'
                });


                this.j2is(content, {
                    transform: 'translateX(0)'
                });

                this.j2is(htmlRef, {
                    overflow: 'auto'
                });
            }

            this.store.dispatch(actions.toggleMenuMobile(!nm.menuIsOpen));
        }

        subMenuClickHandler(el) {

            const {mobileNavText, toHideOnSubMenuAll, subRef, spanRef} = state.get(this);

            const subMenuId = el.dataset.submenuId;
            const newSpanRef = el.querySelector('span');
            const newSubRef = document.querySelector('#' + subMenuId);

            if (newSubRef === subRef) {
                this.navTextClickHandler();
            } else {
                if (!state.get(this).subMenuIsOpen) {
                    newSpanRef.className = 'active';
                    mobileNavText.textContent = newSpanRef.textContent;

                    this.j2is(newSubRef, {
                        transform: 'translateX(0)'
                    });

                    for (let el of toHideOnSubMenuAll) {
                        this.j2is(el, {
                            transform: 'translateX(200px)'
                        });
                    }

                    this.updateState(state, {
                        subMenuIsOpen: true,
                        subRef: newSubRef,
                        spanRef: newSpanRef
                    });
                } else {
                    spanRef.className = '';
                    newSpanRef.className = 'active';

                    this.j2is(subRef, {
                        visibility: 'hidden'
                    });

                    mobileNavText.textContent = newSpanRef.textContent;

                    this.j2is(newSubRef, {
                        visibility: 'visible',
                        transition: 'none',
                        transform: 'translateX(0)'
                    });

                    this.updateState(state, {
                        subRef: newSubRef,
                        spanRef: newSpanRef
                    });
                }
            }
        }

        navTextClickHandler() {

            const {mobileNavText, toHideOnSubMenuAll, subRef, spanRef, subMenuIsOpen} = state.get(this);

            if (subMenuIsOpen) {
                mobileNavText.textContent = "Take me to...";
                this.j2is(subRef, {
                    transform: 'translateX(230px)'
                });

                for (let el of toHideOnSubMenuAll) {
                    this.j2is(el, {
                        transform: 'translateX(0)'
                    });
                }
                spanRef.className = '';
                this.updateState(state, {
                    subMenuIsOpen: false,
                    subRef: null
                });
            }
        }
    }

    return NavbarMobile;

})();

export default NavbarMobile;