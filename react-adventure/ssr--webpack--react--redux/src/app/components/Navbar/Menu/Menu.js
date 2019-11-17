import React from 'react';
import styles from './Menu.scss';
import { Link } from 'react-router-dom';
import routes from 'routes/Routes';
import propTypes from 'prop-types';

const menu = (props) => {
  console.log('menu props', props);
  return(
    <div className={styles.container}>
      <div className={styles.menuBar}>
        {routes.map( ({path, text}) => {
          if (path != props.location.pathname){
            return (
            <Link 
              className={styles.link}
              key={path}
              to={path}>
                {text}
            </Link>
            )
          }
        }
          
          
        )}
      </div>

    </div>
  )
}

menu.propTypes = {
  path: propTypes.string,
  location: propTypes.object,
  pathname: propTypes.string
}

export default menu