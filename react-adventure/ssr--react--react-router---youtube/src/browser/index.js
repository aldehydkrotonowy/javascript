import React from 'react'
import { hydrate } from 'react-dom'//instead of render, client should not rerender what was rendered already on server 
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
    document.getElementById('app')
)