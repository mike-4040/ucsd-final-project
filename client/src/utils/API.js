import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: id => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password, isOwner) => {
    return axios.post('api/signup', {username: username, email: email, password: password, isOwner: isOwner});
  },

  // Get an array of all requests of the Rentee
  getRenteeReqs: renteeId => axios.get(`/api/requests/${renteeId}`)
  
};
