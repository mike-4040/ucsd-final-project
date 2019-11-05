import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import API from "./../utils/API";
import { Link } from "react-router-dom";

class RequestInfo extends Component {
  state = {
    renteeId: "",
    item: "",
    priceInitial: "",
    location: "",
    time: "",
    offers: [],
    winner: {},
    bestPrice: ""
  };

  acceptBid = requestId => {
    let minprice = 1000;
    let bestOffer = {};
    for (let i = 0; i < this.state.offers.length; i++) {
      let price = this.state.offers[i].price;
      if (price < minprice) {
        minprice = price;
        bestOffer = this.state.offers[i];
      }
    }
    // bestOffer.minprice = minprice;
    //getting winner info
    API.getUser(bestOffer.ownerId).then(res => {
      this.setState({
        winner: res.data
      });
    });

    API.updateRequest(bestOffer).then(res => {
      this.setState({
        bestPrice: res.data.priceFinal
      });
    });

    API.updateOffer(bestOffer).then(res => {
      console.log(res.data);
    });
  };

  componentDidMount() {
    // console.log("this ons " + this.props.match.params.requestId)
    API.getSingleRequest(this.props.match.params.requestId).then(res => {
      this.setState({
        renteeId: res.data[0].renteeId,
        item: res.data[0].item,
        priceInitial: res.data[0].priceInitial,
        location: res.data[0].location,
        time: res.data[0].time
      });
    });

    API.getAllOffers(this.props.match.params.requestId).then(res => {
      // console.log(res.data)
      this.setState({
        offers: res.data
      });
    });

    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username
      });
    });
  }

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm-12">
            <br />
            <button className="btn btn-danger">Back</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-right">
            <h1>{this.state.username}</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-6">
            <h3>Offers:</h3>
            <div className="card m-1 bg-light">
              <div className="card-body">
                <ul>
                  {this.state.offers.map(offer => (
                    <li key={offer._id}>
                      ${offer.price} {offer.ownerId} {offer.createdAt}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h3>Request information:</h3>
            <div className="card m-1 bg-light">
              <div className="card-body d-flex justify-content-between">
                <ul>
                  <li>{this.state.item}</li>
                  <li>{this.state.priceInitial}</li>
                  <li>{this.state.time}</li>
                  <li>{this.state.location}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <button
              onClick={() => this.acceptBid(this.props.match.params.requestId)}
              className="btn btn-danger"
            >
              Accept bid
            </button>
            <button className="btn btn-primary ">Cancel request</button>
          </div>
        </div>
      
        <div className="row">
          <div className="col-sm-12">
            <h3>Confirmation:</h3>
            <div className="card m-1 bg-light">
              <div className="card-body d-flex justify-content-between">
                <ul>
                  <li>Winner is {this.state.winner.username} with $ {this.state.bestPrice} bid!</li>
                  <li>
                    {" "}
                    {this.state.winner.username}, is going to provide you with {this.state.item} surf board
                    on - {this.state.time} at - {this.state.location}
                  </li>
                  <li>
                    {" "}
                    You can contact {this.state.winner.username} by this email:
                    -{this.state.winner.email}{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(RequestInfo);
