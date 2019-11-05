import React, { Component } from "react";
import AuthService from "./../components/AuthService";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }
  state = {
    email:"",
    password:""
  };
  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        this.props.history.replace(`/profile`);
      })
      .catch(err => {
        alert(err.response.data.message);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
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
                      <span id="separator"> if you not registered yet go to </span>{" "}
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
      // <div className="container">
      //   <h1>Login</h1>
      //   <form onSubmit={this.handleFormSubmit}>
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
      //              autoComplete="current-password"
      //              onChange={this.handleChange}/>
      //     </div>
      //     <button type="submit" className="btn btn-primary">Submit</button>
      //   </form>
      //   <p><Link to="/signup">Go to Signup</Link></p>
      // </div>
    );
  }
}

export default Login;
