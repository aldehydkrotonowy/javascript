import React, {Component} from 'react';
import axios from 'axios';
import {Form, FormControl, FormGroup, Col,Row, ControlLabel, Button, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';

// import User from '../../components/User/User';

import Aux from '../../hoc/ReactAux/ReactAux';

class FindUser extends Component {

  state = {
    firstTime: true,
    responseStatus: null,
    userfound: false,
    userID: null,
    user: {}
  }

  onInputChange = (event) => {
    console.log('user id to find', event.target.value)
    if (event.target.value === ''){
      this.setState({userfound: false})
    } else {
      this.setState({userID: event.target.value})      
    }

  }

  fetchUser = () => {
    const id = this.state.userID;
    axios({
      method: 'get',
      url: this.props.usersUrl+'/'+id,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => {
      console.log(this);
      this.setState({user: response.data, userfound: true, responseStatus: 200, firstTime: false})
      console.log(response)
    })
    .catch((error) => {
      if (error.response) {
        this.setState({user: {}, userfound: false, responseStatus: error.response.status})
      }
      console.log(error);
    }); 
  }

  render(){
    return(
      <Aux>
        <Row>
          <Form  horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Enter id
              </Col>
              <Col sm={10}>
                  <FormControl type="name" placeholder='user id' onChange={this.onInputChange} /> 
              </Col>
            </FormGroup>
          <Button className="pull-right" bsStyle="success" onClick={this.fetchUser}>Find user</Button>
          </Form>
        </Row>
        <Row style={{marginTop: '20px'}}>
        { this.state.userfound ?
            <ListGroupItem key={this.state.user.name}>
              {this.state.user.name}           
            </ListGroupItem>
          : this.state.firstTime ? null :
            <ListGroupItem key={this.state.user.name}>
            User not found
            </ListGroupItem>
          }
        </Row>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersUrl: state.jsonplaceholder.api.users
  };
};

export default connect(mapStateToProps)(FindUser);