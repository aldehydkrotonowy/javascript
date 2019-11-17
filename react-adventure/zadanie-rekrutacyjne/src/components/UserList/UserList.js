import React from 'react';
import User from '../User/User';
import { ListGroup } from 'react-bootstrap';
import Aux from '../../hoc/ReactAux/ReactAux';
import Footer from '../Footer/Footer';

const userList = (props) => {
  let elements;
  if (props.loaded){
    elements = props.users.map((user) => {
      return ( 
        <User
          key={user.id}
          id={user.id}
          username={user.name}
          onEditUser={props.onEditUser}
          onShowUserDetails={props.onShowUserDetails}
        />
      )
    });
  } else {
     elements = <div>Loading...</div>
  }
  return (
    <Aux>
      <h3>Users</h3>
      <ListGroup>
        {elements} 
      </ListGroup>
      <Footer/>
    </Aux>
  )
}

export default userList