import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./../components/AuthService";
import API from "./../utils/API";
import {toast } from "react-toastify";
class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      isOwner: false,
      email: "",
      username: ""
    };
  }
    notify = (err) => {
    toast.error(` ${err}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    API.signUpUser(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.isOwner
    )
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace("/login");
      })
      .catch(err =>  this.notify(" ⚠️Can not create new aacount, please fill out all fields."));
  };

  handleChange = event => {
    const { name, value } = event.target;
    // if (name === "isOwner") this.setState({ isOwner: !this.state.isOwner });
    // else 
    this.setState({ [name]: value });
  };

  render() {
    // go to home page after signup
    if (this.Auth.loggedIn()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container ">
        <div className="row mt-5 d-flex justify-content-center">
        <div className="col-sm-12 col-md-10 col-lg-6">
            <div className="card">
              <div className="card-body">
                <form className="m-3" onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <h1 className="p-1">Create new account</h1>
                    <div className="btn-group mb-4 btn-group-toggle" data-toggle="buttons" role="group">
                      <button
                        onClick={() => this.setState({ isOwner: false })}
                        type="button"
                        className={this.state.isOwner ? "btn btn-light" : "btn btn-dark"}>
                        Looking for Surfboard
                      </button>
                      <button
                        onClick={() => this.setState({ isOwner: true })}
                        type="button"
                        className={!this.state.isOwner ? "btn btn-light" : "btn btn-dark"}
                      >
                        Renting Surfboards
                      </button>
                    </div>
                    <input
                      autoComplete="username"
                      onChange={this.handleChange}
                      type="text"
                      name="username"
                      className="form-control"
                      id="username"
                      placeholder="Enter user name"
                    />
                    <br />
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      autoComplete="email"
                      onChange={this.handleChange}
                      placeholder="Enter your email"
                    />
                    <br />
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      id="pwd"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        id="signUp"
                        className="btn  btn-light m-1"
                      >
                        Sign up
                      </button>{" "}
                      <span id="separator">
                        {" "}
                        or{" "}
                      </span>{" "}
                      <Link to="/login">
                        <button id="logIn" className="btn  btn-light m-1">
                          Log In
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

export default Signup;
