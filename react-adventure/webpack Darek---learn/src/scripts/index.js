if (module.hot) {
    module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import 'imports-loader?jQuery=jquery!slick-carousel';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './store/Reducers/Reducer';
import ComponentSeeker from './ComponentSeeker';

class Main {
    constructor() {
        this.initRedux();
        this.onDOMLoaded();
    }

    initRedux() {
        const composeEnhancers =
            (process.env === 'production')
                ? compose
                : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    }

    onDOMLoaded() {
        $(window).on('load', () => {
            $("body").removeClass("preload");
            this.initComponents();
        });
    }

    initComponents() {
       new ComponentSeeker(document, this.store);
    }
}

new Main();

