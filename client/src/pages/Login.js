import React, { Component } from "react";
import AuthService from "./../components/AuthService";
import { Link, Redirect } from "react-router-dom";
import {toast } from "react-toastify";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }
  state = {
    email: "",
    password: ""
  };

  notify = (err) => {
    toast.error(` ${err}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => window.location.replace(res.data.user.isOwner ? "/owner" : "/rentee"))
      // .catch(err => this.notify(err.response.data.message))
      .catch(err => this.notify("⚠️Can not find this user, please check your e-mail and password and try again."))

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (this.Auth.loggedIn() && this.Auth.getProfile().isOwner) {
      return <Redirect to="/owner" />;
    } else if (this.Auth.loggedIn() && !this.Auth.getProfile().isOwner) {
      return <Redirect to="/rentee" />;
    }
    return (
      <div className="container ">
        <div className="row mt-5 d-flex justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <form className="m-3" onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <h1 className="p-1">Welcome</h1>
                    <br />
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      onChange={this.handleChange}
                    />
                    <br />
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-sm-12">
                      <button type="submit" id="logIn" className="btn  btn-light m-1">
                        Log In
                      </button>{" "}
                      <span id="separator"> or </span>{" "}
                      <Link to="/signup">
                        <button id="signUp" className="btn  btn-light m-1">
                          Sign up
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
