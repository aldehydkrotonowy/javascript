import React from 'react';
import {Form, FormGroup, Col, FormControl, Button, ControlLabel} from 'react-bootstrap';


const form = (props) => (
  <Form onSubmit={(event) => props.onSubmitForm(event)} horizontal>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Name
      </Col>
      <Col sm={10}>
        {props.placeholder ?
          <FormControl type="name" placeholder={props.name} onChange={props.inputChangeHandler} /> :
          <FormControl type="name" defaultValue={props.name} onChange={props.onUserDetailsChange} />        
        }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Username
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="username" placeholder={props.username} onChange={props.inputChangeHandler} /> :
        <FormControl type="username" defaultValue={props.username} onChange={props.onUserDetailsChange} />
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="email" placeholder={props.email} onChange={props.inputChangeHandler} /> :
        <FormControl type="email" defaultValue={props.email} onChange={props.onUserDetailsChange} />
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Street
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="street" placeholder={props.street} onChange={props.inputChangeHandler} /> :
        <FormControl type="street" defaultValue={props.street} onChange={props.onUserDetailsChange} />
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Suite
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="suite" placeholder={props.suite} onChange={props.inputChangeHandler}/> :
        <FormControl type="suite" defaultValue={props.suite} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        City
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="city" placeholder={props.city} onChange={props.inputChangeHandler}/> :
        <FormControl type="city" defaultValue={props.city} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Zipcode
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="zipcode" placeholder={props.zipcode} onChange={props.inputChangeHandler}/> :
        <FormControl type="zipcode" defaultValue={props.zipcode} onChange={props.onUserDetailsChange}/> 
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Lattitude
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="lat" placeholder={props.lat} onChange={props.inputChangeHandler}/> :
        <FormControl type="lat" defaultValue={props.lat} onChange={props.onUserDetailsChange}/> 
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Longnitute
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="lng" placeholder={props.lng} onChange={props.inputChangeHandler}/> :
        <FormControl type="lng" defaultValue={props.lng} onChange={props.onUserDetailsChange}/> 
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Phone
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="phone" placeholder={props.phone} onChange={props.inputChangeHandler}/> :
        <FormControl type="phone" defaultValue={props.phone} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Website
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="website" placeholder={props.website} onChange={props.inputChangeHandler}/> :
        <FormControl type="website" defaultValue={props.website} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Company
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="companyname" placeholder={props.companyName} onChange={props.inputChangeHandler}/> :
        <FormControl type="companyname" defaultValue={props.companyName} onChange={props.onUserDetailsChange}/> 
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Phrase
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="catchPhrase" placeholder={props.catchPhrase} onChange={props.inputChangeHandler}/> :
        <FormControl type="catchPhrase" defaultValue={props.catchPhrase} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Bs
      </Col>
      <Col sm={10}>
      {props.placeholder ?
        <FormControl type="bs" placeholder={props.bs} onChange={props.inputChangeHandler}/> :
        <FormControl type="bs" defaultValue={props.bs} onChange={props.onUserDetailsChange}/>
      }
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button bsStyle='info' type="submit" className="pull-right">{props.buttonText}</Button>
      </Col>
    </FormGroup>
  </Form>
)

export default form