import React from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Form from '../Form/Form';

const userDetails = (props) => {
  return (
    <Aux>
      <div><h3>Add new user</h3></div>
      <Form
        onSubmitForm={(event) => props.onSubmitForm(event)}
        inputChangeHandler={(event) => props.inputChangeHandler(event)}
        placeholder={props.placeholder}
        name={'name'}
        username={'username'}
        email={'email'}
        street={'street'}
        suite={'suite'}
        city={'city'}
        zipcode={'zipcode'}
        lat={'-33.99'}
        lng={'34.53'}
        phone={'123-123-123'}
        website={'www.example.com'}
        companyName={'company name'}
        bs={'harness real-time e-markets'}
        catchPhrase={'Multi-layered client-server neural-net'}
        buttonText={'Add new user'}
      />
    </Aux>
  )
};

export default userDetails