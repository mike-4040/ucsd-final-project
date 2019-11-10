import React, { Component } from "react";
// import { Link } from "react-router-dom";
import AuthService from "../AuthService";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
class NavbarCustom extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  showNavigation = () => {
    if (this.Auth.loggedIn()) {
      return (
        <Nav>
          <Nav.Link className="navtext " href="/"> {this.Auth.getProfile().username}</Nav.Link>
          <Nav.Link className="navtext" href="/" onClick={() => this.Auth.logout()}>
            Log out
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link className="navtext" href="/signup">Sign up</Nav.Link>
          <Nav.Link  className="navtext" href="/login">Log in</Nav.Link>
        </Nav>
      );
    }
  };

  render() {
    return (
      <Navbar className="shadow mb-4" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h1>Bring</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            // className="justify-content-end"
            id="basic-navbar-nav"
          >
            {this.showNavigation()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarCustom;
