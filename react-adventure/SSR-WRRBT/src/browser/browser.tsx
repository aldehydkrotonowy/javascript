import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from "../app/App"
import reducer from '../app/store/reducers/reducers';


declare global {
	interface Window { __APP__PRELOADED_STATE__: any; }
}

const preloadedState = JSON.parse(window.__APP__PRELOADED_STATE__);
const store = createStore(reducer, { ...preloadedState });
delete window.__APP__PRELOADED_STATE__;


ReactDOM.hydrate(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById("root") as HTMLElement
)

// hydrate(
// 	<BrowserRouter>
// 		<Provider store={store}>
// 			<Route path='/' component={props => <App {...props} />} />
// 		</Provider>
// 	</BrowserRouter>, document.getElementById("root")
// )



