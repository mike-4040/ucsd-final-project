import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./../components/AuthService";
import API from "./../utils/API";

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
      .catch(err => alert(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (name === "isOwner") this.setState({ isOwner: !this.state.isOwner });
    else this.setState({ [name]: value });
  };

  render() {
    // go to home page after signup
    if (this.Auth.loggedIn()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container ">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-sm-6 ">
            <div className="card ">
              <div className="card-body">
                <form className="m-3" onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <h1 className="p-1">Create new account</h1>
                    <div className="btn-group mb-4" role="group">
                      <button type="button" className="btn  btn-light">
                        Looking for Surfboard
                      </button>
                      <button
                        onClick={() => this.setState({ isOwner: true })}
                        type="button"
                        className="btn  btn-light"
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
                        if you not registered yet go to{" "}
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
      // <div className="container">

      //   <h1>Signup</h1>
      //   <form onSubmit={this.handleFormSubmit}>
      //     <div className="form-group">
      //       <label htmlFor="username">Username:</label>
      //       <input className="form-control"
      //              placeholder="Username goes here..."
      //              name="username"
      //              type="text"
      //              id="username"
      //              autoComplete="username"
      //              onChange={this.handleChange}/>
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="email">Email address:</label>
      //       <input className="form-control"
      //              placeholder="Email goes here..."
      //              name="email"
      //              type="email"
      //              id="email"
      //              autoComplete="email"
      //              onChange={this.handleChange}/>
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="pwd">Password:</label>
      //       <input className="form-control"
      //              placeholder="Password goes here..."
      //              name="password"
      //              type="password"
      //              id="pwd"
      //              autoComplete="new-password"
      //              onChange={this.handleChange}/>
      //     </div>
      //     <div className="form-group"> {/* form-check */}
      //       <input
      //         className="form-check-input"
      //         name="isOwner"
      //         type="checkbox"
      //         value="true"
      //         id="isOwner"
      //         onChange={this.handleChange}
      //       />
      //       <label className="form-check-label" htmlFor="isOwner">
      //         Is Owner
      //       </label>
      //     </div>

      //     <button type="submit" className="btn btn-primary">Submit</button>
      //   </form>
      //   <p><Link to="/login">Go to Login</Link></p>
      // </div>
    );
  }
}

export default Signup;
