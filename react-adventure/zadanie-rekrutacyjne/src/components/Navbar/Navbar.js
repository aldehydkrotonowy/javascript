import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const navbar = () => (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    Projekt rekrutacyjny
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <div className='navbar-collapse collapse'>
                <ul className='nav navbar-nav'>
                    <li><Link  to={'/'}>Home</Link ></li>
                    <li><Link to={'/add'}>Add user</Link></li>
                    <li><Link to={'/find/users/'}>Find user</Link></li>
                </ul>
            </div>
            </Navbar.Collapse>
        </Navbar>
)
export default navbar