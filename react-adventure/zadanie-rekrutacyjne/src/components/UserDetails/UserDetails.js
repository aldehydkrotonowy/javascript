import React from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import { ListGroupItem, Button,  Row, Col, ListGroup,ControlLabel, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const userDetails = (props) => {
  
  return(
    <Aux>
        <Row className="show-grid">
          <Col xs={12} md={12}>
          <h4>User details</h4>
          <ListGroup>
            <ListGroupItem><ControlLabel>User id</ControlLabel> : {props.selectedUserDetails.id}</ListGroupItem>
            <ListGroupItem><ControlLabel>Name</ControlLabel> : {props.selectedUserDetails.name}</ListGroupItem>
            <ListGroupItem><ControlLabel>User name</ControlLabel> : {props.selectedUserDetails.username}</ListGroupItem>
            <ListGroupItem><ControlLabel>Email</ControlLabel> : {props.selectedUserDetails.email}</ListGroupItem>
            <ListGroupItem><ControlLabel>Phone</ControlLabel> : {props.selectedUserDetails.phone}</ListGroupItem>
            <ListGroupItem><ControlLabel>Website</ControlLabel> : {props.selectedUserDetails.website}</ListGroupItem>
          </ListGroup>
          </Col>
          <Col xs={12} md={12}>
            <h4>Address</h4>
            <ListGroup>
              <ListGroupItem><ControlLabel>Street</ControlLabel> : {props.selectedUserDetails.address.street}</ListGroupItem>
              <ListGroupItem><ControlLabel>City</ControlLabel> : {props.selectedUserDetails.address.city}</ListGroupItem>
              <ListGroupItem><ControlLabel>Suit</ControlLabel> : {props.selectedUserDetails.address.suite}</ListGroupItem>
              <ListGroupItem><ControlLabel>Zipcode</ControlLabel> : {props.selectedUserDetails.address.zipcode}</ListGroupItem>
              <ListGroupItem><ControlLabel>Lat.</ControlLabel> : {props.selectedUserDetails.address.geo.lat}</ListGroupItem>
              <ListGroupItem><ControlLabel>Lng.</ControlLabel> : {props.selectedUserDetails.address.geo.lng}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={12} md={12}>
          <h4>Company</h4>
            <ListGroup>
              <ListGroupItem><ControlLabel>Company</ControlLabel> : {props.selectedUserDetails.company.name}</ListGroupItem>
              <ListGroupItem><ControlLabel>Phrase</ControlLabel> : {props.selectedUserDetails.company.catchPhrase}</ListGroupItem>
              <ListGroupItem><ControlLabel>Bs</ControlLabel> : {props.selectedUserDetails.company.ba}</ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs={12} md={12}>
          <span className="pull-right">
            <ButtonToolbar>
              <Button 
                bsStyle="info" 
                onClick={(id) => props.onEditUser(props.selectedUserDetails.id)}
              >
                  <Link to={'/edit/users/'+props.selectedUserDetails.id} style={{ textDecoration: 'none', color: 'white' }}>Edit user</Link>
              </Button>
                <Button 
                bsStyle="danger" 
                onClick={(id) => props.onDeleteUser(props.selectedUserDetails.id)}
              >
                  <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Delete user</Link>
              </Button>
            </ButtonToolbar>
          </span>
          </Col>
  
        </Row>
        <Footer/>
    </Aux>
  )
};

export default userDetails