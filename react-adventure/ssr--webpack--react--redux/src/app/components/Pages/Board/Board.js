import React from 'react';
import Navbar from 'components/Navbar/Navbar';
// import styles from './Board.scss';



const board = (props) => {
  console.log('props in board', props);
  return(
    <div >
        <Navbar {...props}/>
        <div>fdgdfg</div>
    </div>
  )
}

export default board