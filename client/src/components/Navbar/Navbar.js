import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../AuthService";

class Navbar extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  showNavigation = () => {
    if (this.Auth.loggedIn()) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
             {this.Auth.getProfile().username}
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    }
     else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  };

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light mb-4 shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
           <h1>Bring</h1> 
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto"></ul>
            {this.showNavigation()}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
