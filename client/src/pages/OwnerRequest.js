import React, { Component } from 'react';
import API from "../utils/API";

class OwnerRequest extends Component {
    state = {
        request: null
    }

    componentDidMount() {
        API.getOwnerRequestById(this.props.match.params.requestId).then(res => {
            this.setState({ request: res.data.request || null })
        })

    }

    render() {
        console.log(this.state.request)
        return (<div>
            <h1>Request Details Page</h1>
            {!this.state.request ? 
            <p>Nothing</p> :
            (
            <div>
                <p>item is: {this.state.request.item}</p>
                <p>priceInitial is: {this.state.request.priceInitial}</p>
                <p>location is: {this.state.request.location}</p>
                <p>Time is: {this.state.request.time}</p>
            </div>
            )
        }
        </div>)
    }
}

export default OwnerRequest;
