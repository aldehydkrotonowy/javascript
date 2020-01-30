import React from 'react';
import { ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const user = (props) => {
  return (
    <ListGroupItem key={props.userid}>
    {props.username}
    <span className="pull-right">
      <ButtonToolbar>
        <Button 
          bsStyle="primary" 
          bsSize="xsmall" 
          onClick={()=>props.onShowUserDetails(props.id)}      
        >
          <Link to={'/details/users/'+props.id} style={{ textDecoration: 'none', color: 'white' }}>Details</Link>
        </Button>
        <Button 
          bsStyle="info" 
          bsSize="xsmall" 
          onClick={()=>props.onEditUser(props.id)}
        >
          <Link to={'/edit/users/'+props.id} style={{ textDecoration: 'none', color: 'white' }}> Edit user</Link>
        </Button>
      </ButtonToolbar>
    </span>            
  </ListGroupItem>
  )
}

export default user