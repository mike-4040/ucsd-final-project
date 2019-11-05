import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
// import Navbar from './components/Navbar';
import NewRequest from './pages/NewRequest';
import Rentee from './pages/Rentee';
import Owner from './pages/Owner';
import OwnerRequest from './pages/OwnerRequest';

if (localStorage.getItem("id_token")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            {/* <Navbar /> */}
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/newRequest" component={NewRequest} />
            <Route exact path="/rentee" component={Rentee} />
            <Route exact path="/owner" component={Owner} />
            <Route exact path="/owner/requests/:requestId" component={OwnerRequest} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
