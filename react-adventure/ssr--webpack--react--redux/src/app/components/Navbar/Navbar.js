import React from 'react';
import styles from './Navbar.scss';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import PhoneMenu from './PhoneMenu/PhoneMenu';
import propTypes from 'prop-types';
import DesktopBreakpoint from 'breakpoints/desktop';
import TabletBreakpoint from 'breakpoints/tablet';
import PhoneBreakpoint from 'breakpoints/phone';
import Aux from 'hoc/ReactAux/ReactAux';

const navbar = (props) => {  
    console.log('navbar', props);
    return (
        <Aux>
            <DesktopBreakpoint>
                <header className={styles.navbarContainer}>
                    <Logo/>
                    <Menu {...props}/>
                </header>
            </DesktopBreakpoint>
            <TabletBreakpoint>
                <header className={styles.navbarContainer}>
                    <Logo/>
                    <Menu {...props}/>
                </header>
            </TabletBreakpoint>
            <PhoneBreakpoint>
                <header className={styles.navbarContainer}>
                    <Logo/>
                    <PhoneMenu {...props}/>
                </header>            
            </PhoneBreakpoint>
        </Aux>
    )
}

navbar.propTypes = {
    path: propTypes.string
}
export default navbar