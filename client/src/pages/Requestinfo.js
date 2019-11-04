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
    offers: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
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
      console.log(res.data)
      this.setState({
        offers:res.data
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
              <li key={offer._id}>${offer.price} {offer.ownerId} {offer.createdAt} </li>
              
            ))}
                  {/* <li>$45 NewMans SurfShop 11:00 AM 11/12/2019</li>
                  <li>$40 OldMans SurfShop 11:12 AM 11/12/2019</li>
                  <li>$35 Kostas 11:14 AM 11/12/2019</li>
                  <li>$30 Ringo Star 11:15 AM 11/12/2019</li> */}
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
            <button className="btn btn-danger">Accept bid</button>
            <button className="btn btn-primary ">Cancel request</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(RequestInfo);
