import React from 'react';
import Breakpoints from './breakpoints';
import propTypes from 'prop-types';

const phoneBreakpoints = (props) => {
    return (
        <Breakpoints name="phone">
            {props.children}
        </Breakpoints>
    )
}


phoneBreakpoints.propTypes = {
    name: propTypes.string,
    children: propTypes.node
}

export default phoneBreakpoints