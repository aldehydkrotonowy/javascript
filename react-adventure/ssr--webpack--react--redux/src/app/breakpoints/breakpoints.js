import React from 'react';
import MediaQuery from 'react-responsive';
import propTypes from 'prop-types';

const breakpointsList = {
    desktop: '(min-width: 1025px)',
    tablet: '(min-width: 768px) and (max-width: 1024px)',
    phone: '(max-width: 767px)'
}


const breakpoint = (props) => {
    const query = breakpointsList[props.name] || breakpointsList.desktop;

    return (
        <MediaQuery  query={query}>
            {props.children}
        </MediaQuery>
    )
}

breakpoint.propTypes = {
    name: propTypes.string,
    children: propTypes.node
}

export default breakpoint