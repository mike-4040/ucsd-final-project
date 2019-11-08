import React, { Component } from "react";
import withAuth from "../components/withAuth";
import API from "../utils/API";
// import { Link } from 'react-router-dom';

class Owner extends Component {
  state = {
    // username: "",
    requests: [],
    closedOffers: [],
    openOffers: []
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

    API.getOwnerOffers(this.props.user.id)
      .then(res => {
        console.log("all offers");
        console.log(res.data.offers);
        this.setState({
          closedOffers:
            res.data.offers.filter(offer => offer.requestId.closed) || [],
          openOffers:
            res.data.offers.filter(offer => !offer.requestId.closed) || []
        });
        // console.log(this.state.openOffers);
      })
      .catch(console.log);
  }
  showreq = requestId => {
    this.props.history.push(`/owner/requests/${requestId}`);
  };

  render() {
    //console.log(JSON.stringify(this.state, null, 2));
    console.log("open offers");
    console.log(this.state.openOffers);
    return (
      <div className="container wrapper">
        <br />
        <div className="row">
          <div className="col-sm-6 ">
            <h1>Recent Requests</h1>
          </div>
          {/* <div className="col-sm-6 text-right">
            <button className="btn btn-danger">Test</button>
          </div> */}
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
            <table className="table table-sm text-center table-hover table-condensed">
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
            <h1>My Open Offers</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
            <table className="table table-sm text-center table-hover table-condensed">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Price</th>
                  <th scope="col">Bid</th>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  {/* <th scope="col">Winner</th>
                  <th scope="col">Winner</th>
                    <th scope="col">Contact</th> */}
                </tr>
              </thead>
              <tbody>
                {this.state.openOffers.map(openOffer => (
                  <tr key={openOffer._id}
                  onClick={() => this.showreq(openOffer.requestId._id)}>
                    <td>{openOffer.requestId.item}</td>
                    <td>{openOffer.requestId.priceInitial}</td>
                    <td>{openOffer.price}</td>
                    <td>{openOffer.requestId.location}</td>
                    <td>{openOffer.requestId.time}</td>
                    {/* <td>{openOffer.isWinner ? "Winner" : "No"}</td>
                    <td>closedReqs.kostas</td>
                    <td>closedReqs.location.kostas@gmail.com</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <h1>My Closed Offers</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
            <table className="table table-sm text-center table-hover table-condensed">
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
                {this.state.closedOffers.map(closedOffer => (
                  <tr key={closedOffer._id}
                  onClick={() => this.showreq(closedOffer.requestId._id)}>
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
