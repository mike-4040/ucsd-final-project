import React, { Component } from "react";
import withAuth from "./../components/withAuth";
import API from "./../utils/API";
import { Link } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

class NewRequest extends Component {
  state = {
    boardSize: "",
    price: "",
    time: "",
    location: ""
  };
  // onChangeTime = time => this.setState({ time })

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let newRequest = {
      renteeId: this.props.user.id,
      item: this.state.boardSize,
      priceInitial: this.state.price,
      location: this.state.location,
      time: this.state.time
    };
    API.newRequest(newRequest)
      .then(res => this.props.history.push("/rentee/"))
      .catch(err => alert(err));
  };

  getCurrentTime = () => {
    let now = new Date();
    let utcString = now.toISOString().substring(0, 19);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    // let second = now.getSeconds();
    let localDatetime =
      year +
      "-" +
      (month < 10 ? "0" + month.toString() : month) +
      "-" +
      (day < 10 ? "0" + day.toString() : day) +
      "T" +
      (hour < 10 ? "0" + hour.toString() : hour) +
      ":" +
      (minute < 10 ? "0" + minute.toString() : minute) +
      utcString.substring(16, 19);
    this.setState({
      time: localDatetime
    });
  };
  componentDidMount() {
    this.getCurrentTime()
    console.log(new Date().getMinutes());
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username
      });
    });
  }

  render() {
    return (
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-sm-11  col-md-8 col-lg-7 wrapper">
            <br />
            <h1>Create new request</h1>
            <br />
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group row">
                <label htmlFor="boardSize" className="col-sm-2 col-form-label">
                  Board size
                </label>
                <div className="col-sm-10">
                  <select
                    onChange={this.handleChange}
                    value={this.state.boardSize}
                    name="boardSize"
                    className="custom-select"
                    id="boardSize"
                    required
                  >
                    <option defaultValue>Choose prefered size</option>
                    <option value='7"'>7"</option>
                    <option value='8"'>8"</option>
                    <option value='9"'>9"</option>
                    <option value='10"'>10"</option>
                    <option value='11"'>11"</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="price" className="col-sm-2 col-form-label">
                  Price
                </label>
                <div className="col-sm-10">
                  <input
                    onChange={this.handleChange}
                    value={this.state.price}
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                    placeholder="$"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="time" className="col-sm-2 col-form-label">
                  Time
                </label>
                <div className="col-sm-10">
                  {/* <DateTimePicker
                  onChange={this.onChangeTime}
                  value={this.state.time}
                    disableClock="true"
                    className="form-control"
                /> */}
                  <input
                    value={this.state.time}
                    onChange={this.handleChange}
                    type="datetime-local"
                    max="3000-12-31T00:00"
                    className="form-control"
                    name="time"
                    id="time"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="location" className="col-sm-2 col-form-label">
                  Location
                </label>
                <div className="col-sm-10">
                  <select
                    value={this.state.location}
                    onChange={this.handleChange}
                    name="location"
                    className="custom-select"
                    id="location"
                    required
                  >
                    <option defaultValue>Choose your location</option>
                    <option value="La Jolla Shores">La Jolla Shores</option>
                    <option value="Pacific Beach">Pacific Beach</option>
                    <option value="Mission Beach">Mission Beach</option>
                    <option value="Ocean Beach">Ocean Beach</option>
                    <option value="Point Loma">Point Loma</option>
                    <option value="Torrey Pines">Torrey Pines</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <Link to="/rentee/">
                    <div className="btn btn-danger">Cancel</div>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(NewRequest);
