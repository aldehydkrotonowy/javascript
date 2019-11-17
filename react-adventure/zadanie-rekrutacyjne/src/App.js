import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Body from './containers/Body/Body';
import Aux from './hoc/ReactAux/ReactAux'
import {BrowserRouter} from 'react-router-dom'

const app = () => {
    return (
        <BrowserRouter>
          <Aux>
            <Navbar/>
            <Body/>
          </Aux>
        </BrowserRouter>
    );
}

export default app;
