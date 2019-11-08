import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import API from "./../utils/API";
// import { Link } from "react-router-dom";

class OwnerRequest extends Component {
  state = {
    request: null,
    offers: [],
    newOffer: "",
    minOffer: Infinity
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitNewOffer = () => {
    if (this.state.newOffer > this.state.minOffer - 1)
      return alert("Offer should be at leatst $1 less than current best offer!");
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

  componentDidMount() {
    API.getOwnerRequestById(this.props.match.params.requestId).then(res => {
      this.setState({ request: res.data.request || null });
    });

    this.fetchOffers();
  }

  render() {
    return (
      <div>
        <h1>Request Details Page</h1>
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
              <div className="col-sm-6 ">
                <h1>Make a Bid!</h1>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <h3>Offers:</h3>
                <div className="card m-1 bg-light">
                  <div className="card-body d-flex justify-content-between">
                    <ul>
                      {this.state.offers.map(offer => (
                        <li key={offer._id}>
                          ${offer.price} {offer.createdAt}{" "}
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
                      <li>Item: {this.state.request.item}</li>
                      <li>Initial Price: {this.state.request.priceInitial}</li>
                      <li>Time: {this.state.request.time}</li>
                      <li>Location: {this.state.request.location}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row ">
              <div className="col-sm-5">
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
                  />
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon1"
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
