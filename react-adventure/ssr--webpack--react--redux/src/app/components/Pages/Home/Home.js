import React, { Component } from 'react';
import styles from './Home.scss';
import DesktopBreakpoint from 'breakpoints/desktop';
import TabletBreakpoint from 'breakpoints/tablet';
import PhoneBreakpoint from 'breakpoints/phone';
import Aux from 'hoc/ReactAux/ReactAux';
import { Link } from 'react-router-dom';
import LoginModal from 'components/LoginModal/LoginModal';
import CreateAccountModal from 'components/CreateAccountModal/CreateAccountModal';
import { CSSTransition } from 'react-transition-group';

class Home extends Component {

    state = {
        showLoginModal: false,
        isAuthenticated: false,
        showCreateAccountModal: false
    }

    shouldShowLoginModal(event) {
        if (this.state.isAuthenticated) {
            this.setState({ showLoginModal: false });
        } else {
            event.preventDefault();
            this.setState({ showLoginModal: true })
        }
    }
    onSwitchModals() {
        // switch to create-account modal
        this.setState({ showLoginModal: false })
        this.setState({ showCreateAccountModal: true })
    }
    onLoginHandler() {
        //login user
        this.setState({ showLoginModal: false })
    }
    onCreateAccountHandler() {
        // create new account
        event.preventDefault();
        console.log('acccont created');
    }
    onModalClose() {
        event.preventDefault();
        this.setState({ showLoginModal: false, showCreateAccountModal: false })
    }

    render() {
        return (
            <Aux>
                <DesktopBreakpoint>
                    <section className={styles.leading}>
                        <Link to='/board' className={styles.hugeButton} onClick={(e) => this.shouldShowLoginModal(e)}> START </Link>
                        <p className={styles.description}>
                            Let&#39;s start repeating</p>
                        <CSSTransition
                            mountOnEnter={true}
                            unmountOnExit={true}
                            in={this.state.showLoginModal}
                            timeout={{
                                enter: 500,
                                exit: 500,
                               }}
                            classNames={{
                                enter: styles.enterLogin,
                                enterActive: styles.enterLoginActive,
                                exit: styles.exitLogin,
                                exitActive: styles.exitLoginActive
                               }}
                            >
                            <LoginModal
                                header={'Welcome'}
                                buttonText={'Login'}
                                loginButton={this.onLoginHandler.bind(this)}
                                switchModals={this.onSwitchModals.bind(this)}
                                modalClose={this.onModalClose.bind(this)}
                            />
                        </CSSTransition>
                        <CSSTransition
                            mountOnEnter={true}
                            unmountOnExit={true}
                            in={this.state.showCreateAccountModal}
                            timeout={{
                                enter: 500,
                                exit: 500,
                               }}
                            classNames={{
                                enter: styles.enterNewAccount,
                                enterActive: styles.enterNewAccountActive,
                                exit: styles.exitNewAccount,
                                exitActive: styles.exitNewAccountActive
                               }}
                            >
                        <CreateAccountModal
                            header={'Create new account'}
                            buttonText={'Create account'}
                            onCreateAccountButton={this.onCreateAccountHandler.bind(this)}
                            onModalClose={this.onModalClose.bind(this)}
                        />
                        </CSSTransition>
                    </section>
                </DesktopBreakpoint>
                <TabletBreakpoint>
                    <section className={styles.leading}>
                        <Link to='/board' className={styles.hugeButton}>START</Link>
                        <p className={styles.description}>
                            Let&#39;s start repeating</p>
                    </section>
                </TabletBreakpoint>
                <PhoneBreakpoint>
                    <section className={styles.leadingPhone}>
                        <Link to='/board' className={styles.hugeButton}>START</Link>
                        <p className={styles.description}>
                            Let&#39;s start repeating</p>
                    </section>
                </PhoneBreakpoint>
            </Aux>
        )
    }
}

export default Home