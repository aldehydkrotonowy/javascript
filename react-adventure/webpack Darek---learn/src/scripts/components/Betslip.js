import Utils from '../Utils';
import * as actions from '../store/actions/Actions';

const Betslip = (function () {

    const state = new WeakMap();

    class Betslip extends Utils {
        constructor(scopeRoot, _store) {
            super();
            this.initDependencies(_store);
            this.initElems(scopeRoot);
            this.initListeners();
            this.screenSizeChangeWatcher();
        }

        initDependencies(_store) {
            this.store = _store;
        }

        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                toggle: scopeRoot.querySelector('#toggle'),
                tapswipe: scopeRoot.querySelector('#tapswipe'),
                mobileBtns: document.querySelector('#mobileBtns'),
                tempTrigger: document.querySelector('#temptrigger')
            });
        }

        initListeners() {
            const {toggle, tempTrigger, tapswipe} = state.get(this);
            toggle.addEventListener("click", this.toggleClickHandler.bind(this));
            tapswipe.addEventListener("click", this.toggleClickHandler.bind(this));
            tempTrigger.addEventListener("click", this.toggleClickHandler.bind(this));
        }


        screenSizeChangeWatcher() {

            const {scopeRoot} = state.get(this);

            $(window).resize(() => {

                const {isToggled} = this.store.getState().betslip;
                const {navbarMobile:nm} = this.store.getState();

                const isMobile = this.viewport().width < 992;

                if (isMobile) {

                    if (!nm.menuIsOpen) {
                        this.j2is(scopeRoot, {
                            visibility: isToggled ? 'visible' : 'hidden',
                            transform: !isToggled ? 'translateX(320px)' : ''
                        });
                    }

                } else {
                    this.j2is(scopeRoot, {
                        transform: isToggled ? 'translateX(0)' : 'translateX(320px)'
                    });
                }
            });
        }

        toggleClickHandler() {

            const {isToggled} = this.store.getState().betslip;
            const {scopeRoot, mobileBtns} = state.get(this);

            const isMobile = this.viewport().width < 992;

            if (isMobile) {

                const htmlRef = document.querySelector('html');

                this.j2is(htmlRef,
                    !isToggled ? {
                        overflow: 'hidden'
                    } : {});


                this.j2is(mobileBtns, {
                    transform: !isToggled ? 'translateY(-44px)' : ''
                });
                this.j2is(scopeRoot, {
                    visibility: !isToggled ? 'visible' : 'hidden',
                });
            } else {
                this.j2is(scopeRoot, {
                    transform: !isToggled ? 'translateX(0)' : 'translateX(320px)'
                });
            }

            this.store.dispatch(actions.toggleBetslip(!isToggled));
        }
    }

    return Betslip;

})();

export default Betslip;