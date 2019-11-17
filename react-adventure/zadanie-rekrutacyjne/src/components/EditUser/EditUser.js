import React from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Form from '../Form/Form';

const editUser = (props) => {
 
  return(
    <Aux>
      <div><h3>Edit details</h3></div>
      <Form
        onSubmitForm={(event) => props.onSaveChangesButton(event)}
        onUserDetailsChange={(event) => props.onUserDetailsChange(event)}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        username={props.username}
        email={props.email}
        street={props.street}
        suite={props.suite}
        city={props.city}
        zipcode={props.zipcode}
        lat={props.lat}
        lng={props.lng}
        phone={props.phone}
        website={props.website}
        companyName={props.companyName}
        catchPhrase={props.catchPhrase}
        bs={props.bs}
        buttonText={props.buttonText}
      />
    </Aux>
  )
};

export default editUser