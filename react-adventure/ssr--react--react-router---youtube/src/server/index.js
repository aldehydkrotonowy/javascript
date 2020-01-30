import express from 'express'
import cors from 'cors'
import { renderToString } from 'react-dom/server'
import App from '../shared/App'
import React from 'react'
import serialize from 'serialize-javascript'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from '../shared/routes'

const app = express()

app.use(cors())

app.use(express.static('public'))

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData 
  ? activeRoute.fetchInitialData(req.path) 
  : Promise.resolve()

  promise.then((data) => {
    const context = {data}
    const markup = renderToString(
      // location  - current location requrested by user
      // context   - contain any information about the render
      <StaticRouter location={req.url} context={context} >
        <App/>
      </StaticRouter>
    )
    res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>SSR adventure</title>
          <script src="/bundle.js" defer></script>
          <script>
            window.__INITIAL_DATA__ = ${serialize(data)}
          </script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  // const port = app.address().port;
  console.log("Server is listening on port: 3000");
})