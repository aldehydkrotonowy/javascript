import React, { Component } from 'react';
import styles from './loginModal.scss';
import propTypes from 'prop-types';

class LoginModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        form: {
            email: {
                label: {
                    text: 'Email',
                },
                labelConfig: {
                    htmlFor: 'login-form-email',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    className: styles.userInput,
                    defaultValue: '',
                    placeholder: 'Enter your email',
                    id: 'login-form-email',
                    type: 'text',
                    name: 'email',
                    'aria-required': 'true'
                },
                fieldIsValid: false
            },
            password: {
                label: {
                    text: 'Password',
                },
                labelConfig: {
                    htmlFor: 'login-form-password',
                    className: styles.passLabel
                },
                elementType: 'input',
                elementConfig: {
                    className: styles.passInput,
                    defaultValue: '',
                    placeholder: '',
                    id: 'login-form-password',
                    type: 'password',
                    name: 'password',
                    'aria-required': 'true'
                },
                fieldIsValid: false
            }
        },
        formIsEmpty: true,
        formIsValid: false
    }


    onInputChange(event, fieldID){
        event.preventDefault();
        let _formIsValid = true;
        const form = {...this.state.form}
        form[fieldID].value = event.target.value;
        form[fieldID].fieldIsValid = event.target.value ? true : false; // field is valid if its not empty
        for( let key in form){
            _formIsValid = form[key].fieldIsValid && _formIsValid
        }
        this.setState({form: form, formIsValid: _formIsValid, formIsEmpty: false})
        
    }

    onSubmit(event){
        event.preventDefault();
        console.log('LCGIN_MODAL i am trying to submit...');
        // if (this.state.formIsValid && !this.state.formIsEmpty){
            console.log('LCGIN_MODAL form looks ok...');
            let data = {}
            for (let key in this.state.form){
                data[key] = this.state.form[key].value;
            }
            console.log('LCGIN_MODAL data collected...', data);
            console.log('LCGIN_MODAL i am sending data to the server....');
            fetch('http://localhost:3000/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log('LCGIN_MODAL CATCH BLOCK: Something goes wrong while login: err = ', err))
        // }
    }

    render() {
        const formInput = [];
        for (let key in this.state.form) {
            formInput.push(
                (
                    <div className={styles.field} key={key}>
                        <label
                            {...this.state.form[key].labelConfig}
                        >
                            {this.state.form[key].label.text}
                        </label>
                        <input
                            {...this.state.form[key].elementConfig}
                            onChange={(e) => this.onInputChange(e, key)}
                        />
                    </div>
                )
            )
        }
        return (
            <div className={styles.modalContainer}>
                <div className={styles.modalBackground} onClick={this.props.modalClose}></div>
                <div className={styles.modal}>


                    <div className={styles.modalHeader}>
                        {this.props.header}
                    </div>

                    <hr />

                    <div className={styles.modalBody}>
                        <form autoComplete='on' onSubmit={(e) => this.onSubmit(e)}>
                            {formInput}
                            <div className={styles.buttonContainer}>
                                <button
                                    className={styles.button}
                                    name="submit"
                                    type="submit"
                                    value="submit"
                                    onClick={this.props.loginButton}
                                >
                                    {this.props.buttonText}
                                </button>
                            </div>
                        </form>
                    </div>


                    <div className={styles.modalFooter}>
                        <button onClick={this.props.switchModals} className={styles.button} >Create account</button>
                    </div>


                </div>
            </div>
        )
    }
}

LoginModal.propTypes = {
    modalClose: propTypes.func,
    header: propTypes.string,
    loginButton: propTypes.func,
    buttonText: propTypes.string,
    switchModals: propTypes.func
}

export default LoginModal