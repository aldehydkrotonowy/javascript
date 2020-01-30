import React from 'react';
import mainLogo from 'images/Flap.png';
import styles from './Logo.scss';

const logo = () => {

    return (
        <div className={styles.logo}>
          <img  src={mainLogo}  alt="fireSpot"/>
        </div>
    )
}


export default logo