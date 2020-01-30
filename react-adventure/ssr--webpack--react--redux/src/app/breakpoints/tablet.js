import React from 'react';
import Breakpoints from './breakpoints';
import propTypes from 'prop-types';

const tabletBreakpoints = (props) => {
    return (
        <Breakpoints name="tablet">
            {props.children}
        </Breakpoints>
    )
}


tabletBreakpoints.propTypes = {
    name: propTypes.string,
    children: propTypes.node
}

export default tabletBreakpoints