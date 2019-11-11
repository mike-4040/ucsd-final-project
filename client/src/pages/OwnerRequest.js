import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import API from "./../utils/API";
import { toast } from "react-toastify";
import { timeFormat } from "../utils/settings";

// import { Link } from "react-router-dom";

class OwnerRequest extends Component {
  state = {
    request: null,
    offers: [],
    newOffer: "",
    minOffer: Infinity,
    winner: false,
    canceled: false
  };

  notify = () => {
    toast.error(`⚠️Price should be less than $ ${this.state.minOffer} `, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitNewOffer = () => {
    if (this.state.newOffer > this.state.minOffer - 1) return this.notify();
    let objNewOffer = {
      requestId: this.props.match.params.requestId,
      ownerId: this.props.user.id,
      price: this.state.newOffer
    };
    // API.
    API.newOffer(objNewOffer)
      .then(res => {
        this.fetchOffers();
      })
      .catch(err => console.log(err));
  };

  fetchOffers() {
    API.getAllOffers(this.props.match.params.requestId)
      .then(res => {
        const minOffer = Math.min(...res.data.map(offer => offer.price));

        this.setState({
          offers: res.data || [],
          minOffer
        });
      })
      .catch(err => console.log(err));
  }
  renderHeading = () => {
    if (this.state.winner) {
      return <h1>You have won this bid!</h1>;
    } else if (this.state.canceled) {
      return <h1>This request was canceled!</h1>;
    } else if (this.state.request.closed) {
      return <h1>This request is already closed</h1>;
    } else {
      return <h1>Make a bid!</h1>;
    }
  };
  componentDidMount() {
    API.getOwnerRequestById(this.props.match.params.requestId).then(res => {
      console.log(res.data.request);
      if (
        res.data.request.closed &&
        res.data.request.winnerId === this.props.user.id
      ) {
        this.setState({ winner: true });
      } else if (res.data.request.canceled) {
        this.setState({ canceled: true });
      }
      this.setState({ request: res.data.request || null });
    });

    this.fetchOffers();
  }

  render() {
    // console.log(this.state.request);
    return (
      <div className="container wrapper">
        {!this.state.request ? (
          <p>Nothing</p>
        ) : (
          <div className="container ">
            <div className="row">
              <div className="col-sm-12">
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.history.push("/owner/")}
                >
                  Back
                </button>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-12">{this.renderHeading()}</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <h3>Offers:</h3>
                <div className="card m-1 bg-light">
                  <div className="card-body d-flex justify-content-between">
                    <ul>
                      {this.state.offers.map(offer => (
                        <li key={offer._id}>
                          ${offer.price}{" "}
                          {new Date(offer.createdAt).toLocaleString(
                            "en-US",
                            timeFormat
                          )}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <h3>Request information:</h3>
                <div className="card m-1 bg-light">
                  <div className="card-body d-flex justify-content-between">
                    {/* {this.state.} */}
                    <ul>
                      <li>Item: {this.state.request.item}</li>
                      <li>Initial Price: {this.state.request.priceInitial}</li>
                      <li>
                        Time:{" "}
                        {new Date(this.state.request.time).toLocaleString(
                          "en-US",
                          timeFormat
                        )}{" "}
                      </li>
                      <li>Location: {this.state.request.location}</li>
                      <li>
                        Contact: {this.state.request.renteeId.username} email:
                        <a href={this.state.request.renteeId.email}>
                          {this.state.request.renteeId.email}{" "}
                        </a>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row ">
              <div
                className="col-sm-12 col-md-10 col-lg-6"
                style={{
                  visibility: this.state.request.closed ? "hidden" : "visible"
                }}
              >
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    value={this.state.newOffer}
                    name="newOffer"
                    onChange={this.handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Can you give lower price?"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    // style = {{visibility: this.state.request.closed ? "hidden":"visible"}}
                  />
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon1"
                    // style = {{visibility: this.state.request.closed ? "hidden":"visible"}}
                    onClick={() => this.submitNewOffer()}
                  >
                    > Make an offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(OwnerRequest);
