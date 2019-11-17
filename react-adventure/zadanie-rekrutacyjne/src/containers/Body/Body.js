import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import {Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'

import UserList from '../../components/UserList/UserList';
import EditUser from '../../components/EditUser/EditUser';
import UserDetails from '../../components/UserDetails/UserDetails';
import AddUser from '../../components/AddUser/AddUser';

import FindUser from '../../containers/FindUser/FindUser';

import {fetchUsers, createUser, updateUser, delteUser} from '../../store/actions/Actions';

class Body extends Component {

  state = {
    loaded: false,
    users: [],
    userToEdit: {},
    editedUserDetails: {},
    selectedUserDetails: {},
    newUser: {},
    _editedDataSaved: false
  }

  divStyle = {
    width: '50%',
    minWidth: '400px',
    margin: '0 auto'
  };


  async componentDidMount(){
    let users = await fetchUsers(this.props.usersUrl);
    this.setState({loaded: true, ...users});
  }

  onEditUser = (id) => {
    const userToEdit = this.state.users.find(user => user.id === id);
    this.setState({userToEdit: userToEdit, editedUserDetails:{}});
  }

  onShowUserDetails = (id) => {
    const userDetails = this.state.users.find(user => user.id === id);
    this.setState({selectedUserDetails: userDetails});
  }

  onAddNewUser = (event) => {
    event.preventDefault();
    const newuser = {...this.state.newUser};
    const users = [...this.state.users];
    const data = {
      id: users[users.length-1].id+1,
      name: newuser.name,
      username: newuser.username,
      email: newuser.email,
      phone: newuser.phone,
      website: newuser.website,
      address:{
        street: newuser.street,
        suite: newuser.suite,
        city: newuser.city,
        zipcode: newuser.zipcode,
        geo: {
          lat: newuser.lat,
          lng: newuser.lng
        }
      },
      company: {
        name: newuser.companyname,
        catchPhrase: newuser.catchPhrase,
        ba: newuser.bs
      }
    }
    users.push(data);
    this.setState({users: users});
    axios({
      method: 'post',
      url: this.props.usersUrl,//'https://jsonplaceholder.typicode.com/users',
      data: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    }); 
    this.props.dispatch(createUser(users));
  }

  // merge flat object with edited data with state
  onSaveChangesButton = (event, userID) => {
    event.preventDefault();
    const userToEdit = Object.assign(this.state.userToEdit);
    const editedFields = {...this.state.editedUserDetails};
    const allUsers = [...this.state.users];

    const data = {
      id: userID,
      name: editedFields.name === undefined ? userToEdit.name : editedFields.name,
      username: editedFields.username === undefined ? userToEdit.username : editedFields.username,
      email: editedFields.email === undefined ? userToEdit.email : editedFields.email,
      phone: editedFields.phone === undefined ? userToEdit.phone : editedFields.phone,
      website: editedFields.website === undefined ? userToEdit.website : editedFields.website,
      address:{
        street: editedFields.street === undefined ? userToEdit.address.street : editedFields.street,
        suite: editedFields.suite === undefined ? userToEdit.address.suite : editedFields.suite,
        city: editedFields.city === undefined ? userToEdit.address.city : editedFields.city,
        zipcode: editedFields.zipcode === undefined ? userToEdit.address.zipcode : editedFields.zipcode,
        geo: {
          lat: editedFields.lat === undefined ? userToEdit.address.geo.lat : editedFields.lat,
          lng: editedFields.lng === undefined ? userToEdit.address.geo.lng : editedFields.lng
        }
      },
      company: {
        name: editedFields.companyname === undefined ? userToEdit.company.name : editedFields.companyname,
        catchPhrase: editedFields.catchPhrase === undefined ? userToEdit.company.catchPhrase : editedFields.catchPhrase,
        ba: editedFields.bs === undefined ? userToEdit.company.ba : editedFields.ba
      }
    }

    // change user in array of all users
    for (let key in allUsers){
      if (allUsers[key].id === userID){
        allUsers[key] = data;
      }
    }
    // update state
    this.setState({users: allUsers, _editedDataSaved: true, editedUserDetails: {}});
    // update store
    this.props.dispatch(updateUser(allUsers));
    // update server
    axios({
      method: 'patch',
      url: this.props.usersUrl+'/'+userID,
      data: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }


  //collect edited data to flat object
  onUserDetailsChange = (event) => {
    if (this.state._editedDataSaved === true){
      this.setState({_editedDataSaved: false})
    }
    let data = {...this.state.editedUserDetails}
    data[event.target.getAttribute('type')] = event.target.value;
    this.setState({editedUserDetails: {...data}});
  }

  //collect data about new user in flat object
  inputChangeHandler = (event) => {
    let data = {...this.state.newUser};
    data[event.target.getAttribute('type')] = event.target.value;
    this.setState({newUser: {...data}});
  }

  onDeleteUser = (userID) => {
    const allUsers = [...this.state.users];
    for (let key in allUsers){
      if (allUsers[key].id === userID){
        const index = allUsers.indexOf(allUsers[key]);
        allUsers.splice(index, 1);
      }
    }
    this.setState({users: allUsers});
    this.props.dispatch(delteUser(allUsers));
    axios({
      method: 'delete',
      url: this.props.usersUrl+'/'+userID,
      data: JSON.stringify(allUsers),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(function (response) {
      console.log('DELETED',response)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render(){
    return(
      <Row style={this.divStyle}>
        <Col xs={12} md={12}>
        <Switch>
          <Route 
            exact={true} 
            path={'/'} 
            render={() => <UserList
              loaded={this.state.loaded}
              users={this.state.users}
              onEditUser={this.onEditUser}//return user.is
              onShowUserDetails={this.onShowUserDetails}//return user.id
            />}
          />
          <Route
            path={'/edit/users/:id'}
            render={() => <EditUser
              onUserDetailsChange={(event) => this.onUserDetailsChange(event)}
              onSaveChangesButton={(event, userID) => this.onSaveChangesButton(event, this.state.userToEdit.id)}
              placeholder={false}
              id={this.state.userToEdit.id}
              name={this.state.userToEdit.name}
              username={this.state.userToEdit.username}
              email={this.state.userToEdit.email}
              street={this.state.userToEdit.address.street}
              suite={this.state.userToEdit.address.suite}
              city={this.state.userToEdit.address.city}
              zipcode={this.state.userToEdit.address.zipcode}
              lat={this.state.userToEdit.address.geo.lat}
              lng={this.state.userToEdit.address.geo.lng}
              phone={this.state.userToEdit.phone}
              website={this.state.userToEdit.website}
              companyName={this.state.userToEdit.company.name}
              catchPhrase={this.state.userToEdit.company.catchPhrase}
              bs={this.state.userToEdit.company.bs}
              buttonText={'Save changes'}  
            />}
          />  
          <Route 
            exact={true} 
            path={'/add'} 
            render={() => <AddUser
              placeholder={true}
              onSubmitForm={(event) => this.onAddNewUser(event)}
              inputChangeHandler={(event) => this.inputChangeHandler(event)}
            />}
          />
          <Route 
            path={'/details/users/:id'}
            render={() => <UserDetails
              selectedUserDetails={this.state.selectedUserDetails}
              onEditUser={this.onEditUser}
              onDeleteUser={this.onDeleteUser}
            />}
          />
          <Route 
            path={'/find/users/'}
            render={() => <FindUser/>}
          />
          </Switch>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersUrl: state.jsonplaceholder.api.users
  };
};

export default withRouter(connect(mapStateToProps)(Body))