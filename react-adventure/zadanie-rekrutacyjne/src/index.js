import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './store/reducers/Reducer';
import {InitialState} from './store/InitialState';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

let store = createStore(reducer, InitialState, devToolsEnhancer());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
