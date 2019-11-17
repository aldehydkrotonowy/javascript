import colors from 'colors';
import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../app/store/reducers/reducers';
import App from '../app/App';
import Html from './html';

const server = express();
const port = 3000;

server.use('/assets/images', express.static(__dirname + '/assets/images'));
server.use(handleRender);

// This is fired every time the server side receives a request
function handleRender(req: any, res: any) {

	const initialState = { initialText: "rendered on the server" };
	const store = createStore(reducer, initialState as any);
	const title = "Hello React with SSR and Redux";
	const appMarkup = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	);

	const preloadedState = store.getState();
	const htmlDoc = renderToStaticMarkup(
		<Html
			title={title}
			appMarkup={appMarkup}
			preloadedState={preloadedState}
		/>
	)
	res.type('html');
	res.send(`<!DOCTYPE html>${htmlDoc}`)
}

server.listen(port, () => {
	console.log(`${colors.cyan('>>>')} ${colors.bold.underline('Server started')} ${colors.yellow('Listening on:')} ${colors.magenta('localhost::')}${colors.green(`${port}`)}`)
});