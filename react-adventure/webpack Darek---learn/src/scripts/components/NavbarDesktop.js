import PerfectScrollbar from 'perfect-scrollbar';
import Utils from '../Utils';

const NavbarDesktop = (function () {

    const state = new WeakMap();

    class NavbarDesktop extends Utils {
        constructor(scopeRoot) {
            super();
            this.initElems(scopeRoot);
            this.initListeners();
            this.initDefaults();
            this.initCustomScrollbar();
        }

        initElems(scopeRoot) {
            this.updateState(state, {
                scopeRoot,
                desktopSearchBar: scopeRoot.querySelector('#desktopSearchBar'),
                desktopSearch: scopeRoot.querySelector('#desktopSearch'),
                dropDownTriggerAll: scopeRoot.querySelectorAll('.dropDownTrigger'),
                dropdownBodyAll: scopeRoot.querySelectorAll('.dropdown-body'),
                dropdownBodyRightAll: scopeRoot.querySelectorAll('.dropdown-body-right')
            });
        }

        initListeners() {
            const {desktopSearch, dropDownTriggerAll} = state.get(this);
            const body = document.querySelector('body');

            desktopSearch.addEventListener("click", this.searchClickHandler.bind(this));
            for (let el of dropDownTriggerAll) {
                el.addEventListener("click", () => {
                    this.dropDownHandler(el);
                });
            }
            body.addEventListener("click", this.outsideDropDownHandler.bind(this));
        }

        initDefaults() {
            this.updateState(state, {
                searchIsOpen: false,
                activeDropRef: null
            });
        }

        initCustomScrollbar() {
            const {dropdownBodyAll, dropdownBodyRightAll} = state.get(this);

            for (let el of dropdownBodyAll) {
                new PerfectScrollbar(el);
            }

            for (let el of dropdownBodyRightAll) {
                new PerfectScrollbar(el);
            }
        }

        outsideDropDownHandler(e) {
            const {parent, dropRef, activeDropRef: ad} = state.get(this);

            if (parent && dropRef) {
                const outOfDrop = (!parent.contains(e.target) && !dropRef.contains(e.target));

                if (outOfDrop && ad) {
                    this.j2is(ad.dropRef, {
                        visibility: 'hidden'
                    });
                    this.j2is(ad.imgRef, {
                        transform: 'rotate(0)'
                    });
                    this.updateState(state, {
                        activeDropRef: null
                    });
                }
            }
        }


        dropDownHandler(parent) {
            const {activeDropRef: ad, searchIsOpen, desktopSearchBar} = state.get(this);
            const subMenuId = parent.dataset.submenuId;
            const dropRef = document.querySelector('#' + subMenuId);
            const spanRef = parent.querySelector('span');
            const imgRef = spanRef.querySelector('img');


            this.updateState(state, {
                parent,
                dropRef
            });

            if (searchIsOpen) {
                this.j2is(desktopSearchBar, {
                    opacity: 0,
                    transform: 'translateX(-400px)'
                });
                this.updateState(state, {
                    searchIsOpen: false
                });
            }

            if (!ad) {
                this.j2is(dropRef, {
                    visibility: 'visible'
                });
                this.j2is(imgRef, {
                    transform: 'rotate(180deg)'
                });
                this.updateState(state, {
                    activeDropRef: {
                        dropRef,
                        imgRef
                    }
                });
            } else {
                if (ad.dropRef === dropRef) {
                    this.j2is(dropRef, {
                        visibility: 'hidden'
                    });
                    this.j2is(imgRef, {
                        transform: 'rotate(0)'
                    });
                    this.updateState(state, {
                        activeDropRef: null
                    });
                } else {
                    this.j2is(ad.dropRef, {
                        visibility: 'hidden'
                    });
                    this.j2is(ad.imgRef, {
                        transform: 'rotate(0)'
                    });
                    this.j2is(dropRef, {
                        visibility: 'visible'
                    });
                    this.j2is(imgRef, {
                        transform: 'rotate(180deg)'
                    });
                    this.updateState(state, {
                        activeDropRef: {
                            dropRef,
                            imgRef
                        }
                    });
                }
            }
        }

        searchClickHandler() {
            const {desktopSearchBar, searchIsOpen, activeDropRef: ad} = state.get(this);

            if (ad) {
                this.j2is(ad.dropRef, {
                    visibility: 'hidden'
                });
                this.j2is(ad.imgRef, {
                    transform: 'rotate(0)'
                });
                this.updateState(state, {
                    activeDropRef: null
                });
            }

            if (!searchIsOpen) {
                this.j2is(desktopSearchBar, {
                    opacity: 1,
                    transform: 'translateX(0)'
                });
            } else {
                this.j2is(desktopSearchBar, {
                    opacity: 0,
                    transform: 'translateX(-400px)'
                });
            }

            this.updateState(state, {
                searchIsOpen: !searchIsOpen
            });
        }
    }

    return NavbarDesktop;

})();

export default NavbarDesktop;
