import React, { Component } from 'react';
import API from "../utils/API";

class OwnerRequest extends Component {
    state = {
        request: null
    }

    componentDidMount() {
        API.getOwnerRequestById(this.props.match.params.requestId).then(res => {
            this.setState({ request: res.data.request || null })
        }).catch(console.log)

    }

    render() {
        console.log(this.props.match.params.requestId)
        return (<div>
            <h1>Request Details Page</h1>
            
            

        </div>)
    }
}

export default OwnerRequest;
