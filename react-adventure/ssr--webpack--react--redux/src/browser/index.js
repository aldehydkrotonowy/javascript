import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import App from '../app/App';
import reducer from '../app/store/reducers/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer, {...window.__PRELOADED_STATE__} );
// delete window.__PRELOADED_STATE__;

hydrate(
    <BrowserRouter>
        <Provider store={store}>
            <Route path='/' component={props => <App {...props} />} />
        </Provider>
    </BrowserRouter>, document.getElementById("root")
)
