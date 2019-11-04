import axios from "axios";
export default {
  // Gets a single user by id
  getUser: id => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password, isOwner) => {
    return axios.post("api/signup", {
      username: username,
      email: email,
      password: password,
      isOwner: isOwner
    });
  },
  newRequest: newRequest => {
    return axios.post("/api/request/", newRequest);
  },

  // Get an array of all requests of the Rentee
  getRenteeReqs: renteeId => axios.get(`/api/requests/${renteeId}`),

  //Get all requests for the owner
  //-/api/requests/
  getOwnerReqs: ()=> axios.get('/api/requests/')
  //Get all reqs closed by owner
  getOwnerClosedReqs: ()=> axios.get('api/owner/closedrequests')
  
};
