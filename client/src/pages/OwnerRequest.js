import React, { Component } from "react";
import API from "../utils/API";

class OwnerRequest extends Component {
  state = {
    request: null,
    offers: [],
    newOffer: ""
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  submitNewOffer =() =>{
      console.log(this.props.user.id)
    let objNewOffer ={
        requestId: this.props.match.params.requestId,
        //ownerId: 
    }
    // API.
  }

  componentDidMount() {
    API.getOwnerRequestById(this.props.match.params.requestId).then(res => {
      this.setState({ request: res.data.request || null });
    });

    API.getAllOffers(this.props.match.params.requestId).then(res => {
      this.setState({ offers: res.data || [] });
    });
  }

  render() {
    console.log(this.state.request);
    return (
      <div>
        <h1>Request Details Page</h1>
        {!this.state.request ? (
          <p>Nothing</p>
        ) : (
          <div class="container ">
            {/* // <div>
                    //     <p>item is: {this.state.request.item}</p>
                    //     <p>priceInitial is: {this.state.request.priceInitial}</p>
                    //     <p>location is: {this.state.request.location}</p>
                    //     <p>Time is: {this.state.request.time}</p>
                    // </div> */}

            <div class="row">
              <div class="col-sm-12">
                <br />
                <button class="btn btn-danger">back</button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm-6 ">
                <h1>Make a Bid!</h1>
              </div>
              <div class="col-sm-6 text-right">
                <h1>#1</h1>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-6">
                <h3>Offers:</h3>
                <div class="card m-1 bg-light">
                  <div class="card-body d-flex justify-content-between">
                    <ul>
                      {this.state.offers.map(offer => (
                        <li key={offer._id}>
                          ${offer.price} {offer.createdAt}{" "}
                        </li>
                      ))}
                      {/* <li>$45 11:00 AM 11/12/2019</li>
                      <li>$40 11:10 AM 11/12/2019</li>
                      <li>$35 11:15 AM 11/12/2019</li>
                      <li>$30 11:25 AM 11/12/2019</li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <h3>Request information:</h3>
                <div class="card m-1 bg-light">
                  <div class="card-body d-flex justify-content-between">
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
            <div class="row ">
              <div class="col-sm-5">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input
                    value={this.state.newOffer}
                    name="newOffer"
                    onChange={this.handleChange}
                    type="number"
                    class="form-control"
                    placeholder="Can you give lower price?"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    id="button-addon1"
                    onClick={() => this.submitNewOffer()}
                  >
                    } > Make an offer
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

export default OwnerRequest;
