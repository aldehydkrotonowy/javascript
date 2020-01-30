import path from 'path';
import express from 'express';
import react from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'

const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.use(handleRender);

function handleRender(req, res){
    const store = createStore(reducers);

    const html = renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    )
    const preloadedStore = store.getState();

    res.send(renderFullPage(html, preloadedStore))
}

function renderFullPage(html, preloadedStore){
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
 
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/public/bundle.js"></script>
      </body>
    </html>
    `
}


app.listen(port, () => console.log(`Server is runing on port ${port}`));