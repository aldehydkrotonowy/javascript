import React from 'react';
import Navbar from 'components/Navbar/Navbar';

const addNewItem = (props) => {
    console.log('props in addnewItem', props);
    return (
        <div >
            <Navbar {...props}/>
            <div>addNewItem</div>
        </div>
    )
}

export default addNewItem