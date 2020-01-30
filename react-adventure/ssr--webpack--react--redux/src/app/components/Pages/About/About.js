import React from 'react';
import Navbar from 'components/Navbar/Navbar';

const about = (props) => {
    return (
        <div >
            <Navbar {...props}/>
            <div>About page</div>
        </div>
    )
}

export default about