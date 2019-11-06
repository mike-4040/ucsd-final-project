import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import Card from "../components/Card";
import API from "./../utils/API";
// import { Link } from "react-router-dom";

class RequestInfo extends Component {
  state = {
    renteeId: "",
    item: "",
    priceInitial: "",
    location: "",
    time: "",
    offers: [],
    bestPrice: "",
    closed: false,
    winnerName: "",
    winnerEmail: ""
  };

  acceptBid = () => {
    let minprice = 1000;
    let bestOffer = {};
    for (let i = 0; i < this.state.offers.length; i++) {
      let price = this.state.offers[i].price;
      if (price < minprice) {
        minprice = price;
        bestOffer = this.state.offers[i];
      }
    }
    //getting winner info
    API.getUser(bestOffer.ownerId).then(response => {
      this.setState({
        winnerEmail: response.data.email,
        winnerName: response.data.username
      });
    });

    API.updateRequest(bestOffer).then(res => {
      this.setState({
        bestPrice: res.data.priceFinal
      });
    });

    API.updateOffer(bestOffer).then(res => {});
    this.setState({
      closed: true
    });
  };

  componentDidMount() {
    API.getSingleRequest(this.props.match.params.requestId).then(res => {
      if (res.data[0].closed) {
        API.getUser(res.data[0].winnerId).then(response => {
          this.setState({
            renteeId: res.data[0].renteeId,
            item: res.data[0].item,
            priceInitial: res.data[0].priceInitial,
            location: res.data[0].location,
            time: res.data[0].time,
            closed: res.data[0].closed,
            bestPrice: res.data[0].priceFinal,
            winnerEmail: response.data.email,
            winnerName: response.data.username
          });
        });
      }
      this.setState({
        renteeId: res.data[0].renteeId,
        item: res.data[0].item,
        priceInitial: res.data[0].priceInitial,
        location: res.data[0].location,
        time: res.data[0].time,
        closed: res.data[0].closed,
        bestPrice: res.data[0].priceFinal
      });
      // console.log(res.data)
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

  renderConfirmation() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <h3>Confirmation:</h3>
          <Card>
            <li>
              Winner is {this.state.winnerName} with $ {this.state.bestPrice}{" "}
              bid!
            </li>
            <li>
              {" "}
              {this.state.winnerName}, is going to provide you with{" "}
              {this.state.item} surf board on - {this.state.time} at -{" "}
              {this.state.location}
            </li>
            <li>
              {" "}
              You can contact {this.state.winnerName} by this email: -
              {this.state.winnerEmail}{" "}
            </li>
          </Card>
        </div>
      </div>
    );
  }
  renderButtons() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <button onClick={() => this.acceptBid()} className="btn btn-danger">
            Accept bid
          </button>
          <button className="btn btn-primary ">Cancel request</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm-12">
            <br />
            <button
              onClick={() => this.props.history.push("/rentee/")}
              className="btn btn-danger"
            >
              Back
            </button>
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
            <Card>
              {this.state.offers.map(offer => (
                <li key={offer._id}>
                  ${offer.price} {offer.ownerId} {offer.createdAt}{" "}
                </li>
              ))}
            </Card>
          </div>
          <div className="col-sm-6">
            <h3>Request information:</h3>
            <Card>
              <li>{this.state.item}</li>
              <li>{this.state.priceInitial}</li>
              <li>{this.state.time}</li>
              <li>{this.state.location}</li>
            </Card>
          </div>
        </div>
        <hr />

        {this.state.closed ? this.renderConfirmation() : this.renderButtons()}
      </div>
    );
  }
}

export default withAuth(RequestInfo);
