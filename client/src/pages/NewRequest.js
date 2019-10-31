import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { Link } from 'react-router-dom';

class NewRequest extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    return (
      <div className="container ">
      <div className="row">
        <div className="col-sm-12">
          <br/>
          <h1>Create new request</h1>
          <br/>
          <form>
            <div className="form-group row">
              <label for="boardSize" className="col-sm-2 col-form-label">Surfboard size</label>
              <div className="col-sm-10">
                <select name="boardSize" className="custom-select" id="boardSize">
                  <option selected>Choose prefered size</option>
                  <option value="1">7"</option>
                  <option value="2">8"</option>
                  <option value="3">9"</option>
                  <option value="4">10"</option>
                  <option value="5">11"</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label for="price" className="col-sm-2 col-form-label">Price</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="price" id="price" value="$"
                  placeholder="enter price you willing to pay"/>
              </div>
            </div>
            <div className="form-group row">
              <label for="time" className="col-sm-2 col-form-label">Time</label>
              <div className="col-sm-10">
                <input type="datetime-local" className="form-control" name="time" id="time" placeholder="" required/>
              </div>
            </div>
            <div className="form-group row">
              <label for="location" className="col-sm-2 col-form-label">Location</label>
              <div className="col-sm-10">
                <select name="location" className="custom-select" id="location">
                  <option selected>Choose your location</option>
                  <option value="1">La Jolla Shores</option>
                  <option value="2">Pacific Beach</option>
                  <option value="3">Mission Beach</option>
                  <option value="4">Ocean Beach</option>
                  <option value="5">Point Loma</option>
                  <option value="5">Torrey Pines</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
      // <div className="container Profile">
      //   <h1>New request</h1>
      //   <p>Username: {this.state.username}</p>
      //   <p>Email: {this.state.email}</p>
      //   <Link to="/">Go home</Link>
      // </div>
    )
  }
}

export default withAuth(NewRequest);