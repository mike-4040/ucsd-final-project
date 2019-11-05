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
  //Creates new request
  newRequest: newRequest => {
    return axios.post("/api/request/", newRequest);
  },

  // Get an array of all OPEN requests of the Rentee
  getRenteeReqsOpen: renteeId => axios.get(`/api/requestsO/${renteeId}`),

  // Get an array of all CLOSED requests of the Rentee
  getRenteeReqsClosed: renteeId => axios.get(`/api/requestsC/${renteeId}`),

  //Get an array of one request of Rentee
  getSingleRequest: requestId => axios.get(`/api/request/${requestId}`),
  
  //Getting all offers on single requestID
  getAllOffers: requestId => axios.get(`/api/offers/${requestId}`),

  updateRequest: bestOffer => {
   return axios.put("/api/request/", bestOffer);
  },
  updateOffer: bestOffer => {
    return axios.put("/api/offer/", bestOffer);
   }
 
};
