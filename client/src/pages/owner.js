import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { Link } from 'react-router-dom';

class Owner extends Component {

  state = {
    username: "",
    requests: []
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username
      })
    });

    API.getOwnerReqs().then(res => {
        console.log(res.data.requests)
      this.setState({
        requests: res.data.requests || []
      })
    }).catch(console.log);
  }
  API.getOwnerClosedReqs().then(res => {
    console.log(res.data.requests)
  this.setState({
    requests: res.data.requests || []
  })
}).catch(console.log);
}

  render() {
    console.log(this.state);
    return (
      <div className="container ">
        <br />
        <div className="row">
          <div className="col-sm-6 ">
            <h1>Recent Requests</h1>
          </div>
          <div className="col-sm-6 text-right">
            <button className="btn btn-danger">Test</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-center table-hover ">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Initial price</th>
                  <th scope="col">Location</th>
                  <th scope="col">When</th>
                </tr>
              </thead>
                            {/*{this.state.friends.map(friend => (
          <FriendCard
            clickFriend={this.clickFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            // occupation={friend.occupation}
            // location={friend.location}
          />
              ))}*/}
              <tbody>
                  {this.state.requests.map(request =>(
                      <tr>
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
              <h1>My Complete request</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <table className="table text-center table-hover ">
                <thead>
                  <tr>

                    <th scope="col">Items</th>
                    <th scope="col">Price</th>
                    <th scope="col">Location</th>
                    <th scope="col">Time</th>
                    <th scope="col">Winner</th>
                    <th scope="col">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9" long board</td>
                    <td>$50</td>
                    <td>La Jolla Shores</td>
                    <td>11:00am 11/12/2019 </td>
                    <td>Kostas</td>
                    <td>kostas@gmail.com</td>
                  </tr>
                  <tr>

                    <td>11" long board</td>
                    <td>$80</td>
                    <td>Pacific Beach</td>
                    <td>11:00am 11/12/2019 </td>
                    <td>OldMan</td>
                    <td>OldMan@gamil.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}
      
export default withAuth(Owner);