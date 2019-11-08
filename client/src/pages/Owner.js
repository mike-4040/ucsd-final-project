import React, { Component } from "react";
import withAuth from "../components/withAuth";
import API from "../utils/API";
// import { Link } from 'react-router-dom';

class Owner extends Component {
  state = {
    // username: "",
    requests: [],
    offers: []
  };

  componentDidMount() {
    // API.getUser(this.props.user.id).then(res => {
    //   this.setState({
    //     username: res.data.username
    //   });
    // });

    API.getOwnerReqs()
      .then(res => {
        this.setState({
          requests: res.data.requests || []
        });
      })
      .catch(console.log);

    API.getOffersClosed(this.props.user.id)
      .then(res => {
        //console.log(res.data.offers);
        this.setState({
          offers: res.data.offers || []
        });
      })
      .catch(console.log);
  }
  showreq = requestId => {
    this.props.history.push(`/owner/requests/${requestId}`);
  };

  render() {
    console.log(JSON.stringify(this.state, null, 2));
    return (
      <div className="container ">
        <br />
        <div className="row">
          <div className="col-sm-6 ">
            <h1>Recent Requests</h1>
          </div>
          <div className="col-sm-6 text-right">
            <button className="btn btn-danger">Test</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-center table-hover ">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Initial price</th>
                  <th scope="col">Location</th>
                  <th scope="col">When</th>
                </tr>
              </thead>
              <tbody>
                {this.state.requests.map(request => (
                  <tr
                    key={request._id}
                    onClick={() => this.showreq(request._id)}
                  >
                    <td>{request.item}</td>
                    <td>{request.priceInitial}</td>
                    <td>{request.location}</td>
                    <td>{request.time} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <h1>My Offers</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-center table-hover ">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Price</th>
                  <th scope="col">Bid</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Winner</th>
                </tr>
              </thead>
              <tbody>
                {this.state.offers.map(closedOffer => (
                  <tr key={closedOffer._id}>
                    <td>{closedOffer.requestId.item}</td>
                    <td>{closedOffer.requestId.priceInitial}</td>
                    <td>{closedOffer.price}</td>
                    <td>{closedOffer.requestId.location}</td>
                    <td>{closedOffer.requestId.time}</td>
                    <td>{closedOffer.isWinner ? "Winner" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Owner);
