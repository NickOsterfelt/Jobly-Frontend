import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({loggedIn}) {

  let navItems;

  if (loggedIn === false) { //I don't know why !loggedIn does not work as intended...
    navItems = (
      <Nav className="ml-auto align-bottom p-2 px-5" navbar>
        <NavItem>
          <NavLink to="/Login" className="btn btn-info mr-5">Login/Signup</NavLink>
        </NavItem>
      </Nav>
    );
  }
  else {
    navItems = (
      <Nav className="ml-auto align-bottom p-2 px-5" navbar>
        <NavItem>
          <NavLink to="/companies">Companies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/jobs">Jobs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/Logout" className="btn btn-info">Logout</NavLink>
        </NavItem>
      </Nav>
    );
  }

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        {navItems}
      </Navbar>
    </div>
  );
}

export default NavBar;
