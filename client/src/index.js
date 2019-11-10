import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { ToastContainer} from "react-toastify";

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import NavbarCustom from './components/Navbar';
import NewRequest from './pages/NewRequest';
import Rentee from './pages/Rentee';
import Owner from './pages/Owner'
import OwnerRequest from './pages/OwnerRequest';
import RequestInfo from './pages/RequestInfo';

if (localStorage.getItem("id_token")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
        <ToastContainer />
            <NavbarCustom />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/newRequest" component={NewRequest} />
            <Route exact path="/rentee" component={Rentee} />
            <Route exact path="/owner" component={Owner} />
            <Route exact path="/owner/requests/:requestId" component={OwnerRequest} />
            <Route exact path="/rentee-request/:requestId" component={RequestInfo} />

        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
