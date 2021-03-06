import axios from "axios";
export default {
  // Gets a single user by id
  getUser: id => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password, isOwner) => {
    return axios.post("/api/signup", {
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

  //Get all requests for the owner
  //-/api/requests/
  getOwnerReqs: () => axios.get("/api/requests/"),
  //Get all reqs closed by owner
  getOwnerOffers: ownerId => axios.get(`/api/offersOwner/${ownerId}`),
  getOwnerRequestById: id => axios.get(`/api/owner/requests/${id}`),

  //Getting all offers on single requestID
  getAllOffers: requestId => axios.get(`/api/offers/${requestId}`),
  // Get all offers made for a req by Owner
  getOffersMade: requestId => axios.get(`/api/offers`),
  // Submit New Offer
  newOffer: newOffer => {
    return axios.post("/api/offer", newOffer);
  },

  updateRequest: bestOffer => {
    return axios.put("/api/request/", bestOffer);
  },
  updateOffer: bestOffer => {
    return axios.put("/api/offer/", bestOffer);
   },
   cancelRequest : cancelRequest => {
     return axios.put("/api/request-cancel/", cancelRequest)
   }
 
};
