import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import Card from "../components/Card";
import API from "./../utils/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    winnerEmail: "",
    canceled: false
  };
  notify = () => {
    toast.warn("🦄 There are no offers, yet!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  cancelBid = () => {
    let cancelRequest = {
      requestId: this.props.match.params.requestId,
      closed: true,
      price: 0,
      canceled: true
    };
    API.cancelRequest(cancelRequest).then(res => {
      this.setState({
        canceled: true
      });
    });
  };
  //ACCEPTING BID
  acceptBid = () => {
    if (!this.state.offers.length) {
      return this.notify();
    }
    let minprice = this.state.offers[0].price;
    let bestOffer = this.state.offers[0];
    for (let i = 1; i < this.state.offers.length; i++) {

      let price = this.state.offers[i].price;
      if (price < minprice) {
        minprice = price;
        bestOffer = this.state.offers[i];
      }
    }

    //getting winner info
    API.getUser(bestOffer.ownerId._id).then(response => {
      this.setState({
        winnerEmail: response.data.email,
        winnerName: response.data.username
      });
    });

    API.updateRequest(bestOffer).then(res => {
      this.setState({
        bestPrice: res.data.priceFinal,
        closed: true
      });
    });

    API.updateOffer(bestOffer).then(res => {
      console.log("all good!");
    });
  };

  componentDidMount() {
    API.getSingleRequest(this.props.match.params.requestId).then(res => {
      if (res.data[0].closed && res.data[0].winnerId) {
        API.getUser(res.data[0].winnerId).then(response => {
          this.setState({
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
        bestPrice: res.data[0].priceFinal,
        canceled: res.data[0].canceled
      });
      // console.log(res.data)
    });

    API.getAllOffers(this.props.match.params.requestId).then(res => {
      console.log(res.data);
      this.setState({
        offers: res.data
      });
    });

    // API.getUser(this.props.user.id).then(res => {
    //   this.setState({
    //     username: res.data.username
    //   });
    // });
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
              {this.state.item} surf board on{" "}
              {new Date(this.state.time).toLocaleString()} at{" "}
              {this.state.location}
            </li>
            <li>
              {" "}
              You can contact {this.state.winnerName} by this email:
              {this.state.winnerEmail}{" "}
            </li>
          </Card>
        </div>
      </div>
    );
  }
  renderButtons() {
    return (
      <div className="row ">
        <div className="col-sm-12 d-flex justify-content-between">
          <button onClick={() => this.acceptBid()} className="btn btn-danger">
            Accept bid
          </button>
          <button onClick={() => this.cancelBid()} className="btn btn-primary ">
            Cancel request
          </button>
        </div>
      </div>
    );
  }
  renderCancelation() {
    return (
      <div className="row ">
        <div className="col-sm-12 d-flex justify-content-center">
          <h1 className="text-danger">You have canceled your order!</h1>;
        </div>
      </div>
    );
  }
  renderblock = () => {
    if (this.state.canceled === true) {
      return this.renderCancelation();
    } else if (this.state.closed === true) {
      return this.renderConfirmation();
    } else {
      return this.renderButtons();
    }
  };
  render() {
    return (
      <div className="container wrapper ">
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
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h3>Offers:</h3>
            <Card>
              {this.state.offers.map(offer => (
                <li key={offer._id}>
                  ${offer.price} {offer.ownerId.username}{" "}
                  {new Date(offer.createdAt).toLocaleString()}{" "}
                </li>
              ))}
            </Card>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <h3>Request information:</h3>
            <Card>
              <li>{this.state.item}</li>
              <li>{this.state.priceInitial}</li>
              <li>{new Date(this.state.time).toLocaleString()}</li>
              <li>{this.state.location}</li>
            </Card>
          </div>
        </div>
        <hr />
        {this.renderblock()}
        <ToastContainer />
      </div>
    );
  }
}

export default withAuth(RequestInfo);
