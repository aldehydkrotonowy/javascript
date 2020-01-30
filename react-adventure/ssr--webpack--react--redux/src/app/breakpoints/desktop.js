import React from 'react';
import Breakpoints from './breakpoints';
import propTypes from 'prop-types';

const desktopBreakpoints = (props) => {
    return (
        <Breakpoints  name={"desktop"}>
            {props.children}
        </Breakpoints>
    )
}

desktopBreakpoints.propTypes = {
    name: propTypes.string,
    children: propTypes.node
}

export default desktopBreakpoints