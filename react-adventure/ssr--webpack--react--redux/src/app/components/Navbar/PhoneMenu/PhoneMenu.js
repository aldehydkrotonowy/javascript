import React from 'react';
import styles from './PhoneMenu.scss';
// import { Link } from 'react-router-dom';
import propTypes from 'prop-types';


const phoneMenu = () => {

  return(
    <div className={styles.container}>
      <div className={styles.burger}></div>
      <div className={styles.burger}></div>
      <div className={styles.burger}></div>
    </div>
  )
}

phoneMenu.propTypes = {
  path: propTypes.string
}

export default phoneMenu