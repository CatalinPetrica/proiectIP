import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
                <img src="https://image.flaticon.com/icons/svg/891/891399.svg" width="25" height="25" alt="brand"/> WearableHealth
            </Link>
            <Nav className="mr-auto">
                <Link to={"add"} className="nav-link">Add Patients</Link>
                <Link to={"list"} className="nav-link">Patients List</Link>
                <Link to={"users"} className="nav-link">User List</Link>
            </Nav>
        </Navbar>
    );
}