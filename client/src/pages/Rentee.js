import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import OpenRequests from '../components/OpenRequests';

class Rentee extends Component {

  state = {
    username: "",
    requests: []
  };

  componentDidMount() {
    API
      .getUser(this.props.user.id)
      .then(res => this.setState({ username: res.data.username }));

    API
      .getRenteeReqs(this.props.user.id)
      .then(res => {
        console.log(res);
        this.setState({
          requests: res.data
        })
      });
  }

  render() {
    return (
      <div className="container ">
        <br />
        <div className="row">
          <div className="col-sm-6 ">
            <h1>My requests</h1>
          </div>
          <div className="col-sm-6 text-right">
            <button className="btn btn-danger">Create new request</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.state.requests.length === 0
              ? <h2>No requests</h2>
              : <OpenRequests requests={this.state.requests} />}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <h1>My Complete request</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-center table-hover ">
              <thead>
                <tr>

                  <th scope="col">Items</th>
                  <th scope="col">Price</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Winner</th>
                  <th scope="col">Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>9" long board</td>
                  <td>$50</td>
                  <td>La Jolla Shores</td>
                  <td>11:00am 11/12/2019 </td>
                  <td>Kostas</td>
                  <td>kostas@gmail.com</td>
                </tr>
                <tr>

                  <td>11" long board</td>
                  <td>$80</td>
                  <td>Pacific Beach</td>
                  <td>11:00am 11/12/2019 </td>
                  <td>OldMan</td>
                  <td>OldMan@gamil.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Rentee);