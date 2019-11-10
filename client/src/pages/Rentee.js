import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import API from "./../utils/API";
import OpenRequests from "../components/OpenRequests";
import ClosedRequests from "../components/ClosedRequests";

class Rentee extends Component {
  state = {
    // username: "",
    requestsOpen: [],
    requestsClosed: []
  };

  componentDidMount() {
    // API.getUser(this.props.user.id).then(res =>
    //   this.setState({ username: res.data.username })
    // );
    API.getRenteeReqsOpen(this.props.user.id).then(res =>
      this.setState({ requestsOpen: res.data })
    );

    API.getRenteeReqsClosed(this.props.user.id).then(res =>
      this.setState({ requestsClosed: res.data })
    );
  }
  // this method is to test request info page
  handleRequestClick = id => {
    this.props.history.push(`/rentee-request/${id}`);
  };

  render() {

    console.log('Rentee, open Requests\n', this.state.requestsOpen)
    return (
      <div className="container wrapper">
        <div className="row">
          <div className="col-sm-12 text-right">
            <button
              onClick={() => this.props.history.push("/newRequest")}
              className="btn btn-danger"
            >
              Create new request
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h1 className="tableName m-4">My requests</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
            {this.state.requestsOpen.length === 0 ? (
              <h2>No requests</h2>
            ) : (
              <OpenRequests
                requests={this.state.requestsOpen}
                handler={this.handleRequestClick}
              />
            )}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <h1 className="tableName m-4">My Complete request</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
            {this.state.requestsClosed.length === 0 ? (
              <h2>No requests</h2>
            ) : (
              <ClosedRequests
                requests={this.state.requestsClosed}
                handler={this.handleRequestClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Rentee);
