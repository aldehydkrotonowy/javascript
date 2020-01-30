import React, { Component } from 'react';
import styles from './CreateAccountModal.scss';
import propTypes from 'prop-types';

class CreateAccontModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        form: {
            firstname: {
                label: {
                    text: 'First name'
                },
                labelConfig: {
                    htmlFor: 'new-account-firstname',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'firstname',
                    placeholder: 'Enter your first name',
                    id: 'new-account-firstname',
                    defaultValue: '',
                    className: styles.userInput

                },
                value: '',
                validation: {
                    checkIfEmail: false,
                    required: true,
                    options: {
                        minLength: 3,
                        maxLength: 50
                    }
                },
                mandatory: true,
                touched: false,
                fieldIsValid: false
            },
            lastname: {
                label: {
                    text: 'Last name'
                },
                labelConfig: {
                    htmlFor: 'new-account-lastname',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'lastname',
                    placeholder: 'Enter your last name',
                    id: 'new-account-lastname',
                    defaultValue: '',
                    className: styles.userInput

                },
                value: '',
                validation: {
                    required: true,
                    checkIfEmail: false,
                    options: {
                        minLength: 3,
                        maxLength: 50
                    }
                },
                mandatory: true,
                touched: false,
                fieldIsValid: false
            },
            email: {
                label: {
                    text: 'Email'
                },
                labelConfig: {
                    htmlFor: 'new-account-email',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Enter your email address',
                    id: 'new-account-email',
                    defaultValue: '',
                    className: styles.userInput

                },
                value: '',
                validation: {
                    required: true,
                    checkIfEmail: true,
                    options: {}
                },
                mandatory: true,
                touched: false,
                fieldIsValid: false
            },
            password: {
                label: {
                    text: 'Password'
                },
                labelConfig: {
                    htmlFor: 'new-account-password',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Enter your password',
                    id: 'new-account-password',
                    defaultValue: '',
                    className: styles.userInput

                },
                value: '',
                validation: {
                    required: true,
                    checkIfEmail: false,
                    options: {
                        minLength: 3,
                        maxLength: 50
                    }
                },
                mandatory: true,
                touched: false,
                fieldIsValid: false
            },
            passwordConfirm: {
                label: {
                    text: 'Confirm password'
                },
                labelConfig: {
                    htmlFor: 'new-account-passwordConfirmation',
                    className: styles.userLabel
                },
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'passwordConfirmatin',
                    placeholder: 'Enter your password again',
                    id: 'new-account-passwordConfirmation',
                    defaultValue: '',
                    className: styles.userInput

                },
                value: '',
                validation: {
                    required: true,
                    checkIfEmail: false,
                    options: {
                        minLength: 3,
                        maxLength: 50
                    }
                },
                mandatory: true,
                touched: false,
                fieldIsValid: false
            }
        },
        formIsValid: false,
        trySubmitEmptyForm: false,
    }

    onInputChange(event, inputID) {
        let dataIsValid = true;
        const form = {...this.state.form};
        const formField = form[inputID];
        formField.value = event.target.value;
        formField.fieldIsValid = true; //make this better
        formField.touched = true;
        form[inputID] = formField;
        for (let key in form) {
            if (form[key].validation.required) {
                dataIsValid = form[key].fieldIsValid && dataIsValid;
            }
        }
        this.setState({ form: form, formIsValid: dataIsValid });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.formIsValid) {
            let data = {};
            // collect data from state
            for (let key in this.state.form) {
                data[key] = this.state.form[key].value;
            }            
            fetch('http://localhost:3000/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin' : 'http://localhost:3000',
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(data => console.log('response from server',data))
            .catch(err => console.log('CATCH BLOCK: something goes wrong: ',err));
            this.props.onModalClose();
        } else {
            console.log("data is ", this.state.formIsValid);
        }
    }

    render() {

        let newAccountForm = [];



        for (let key in this.state.form) {
            newAccountForm.push(
                (
                    <div className={styles.field} key={key}>
                        <label {...this.state.form[key].labelConfig} >
                            {this.state.form[key].label.text}
                        </label>
                        <input {...this.state.form[key].elementConfig} onChange={(e) => this.onInputChange(e, key)} />
                    </div>
                )
            )
        }



        return (
            <div className={styles.modalContainer} >
                <div className={styles.modalBackground} onClick={this.props.onModalClose}></div>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        {this.props.header}
                    </div>

                    <hr />

                    <div className={styles.modalBody}>
                        <form autoComplete="on" onSubmit={(e) => this.onSubmit(e)}>
                            {newAccountForm}
                            <div className={styles.buttonContainer}>
                                <button className={styles.button} name="submit" type="submit">
                                    {this.props.buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CreateAccontModal.propTypes = {
    onModalClose: propTypes.func,
    header: propTypes.string,
    buttonText: propTypes.string,
    onCreateAccountButton: propTypes.func
}

export default CreateAccontModal