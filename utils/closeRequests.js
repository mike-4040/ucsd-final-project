const db = require("../models");

const cutoffHours = 50;

function closeRequests() {
  let timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() + cutoffHours);

  db.Request.find({ closed: false, time: { $lt: timeLimit } })
    .select("renteeId time")
    .populate({ path: "offers", select: "price", sort: { price: 1 } })
    .then(requests => {
      requests.forEach(request => {
        console.log("Request ID: ", request._id);
        if (request.offers.length) {
          console.log("The winner is: ", request.offers[0]);
        } else {
          console.log("No offers");
        }
        console.log("Offers: \n", request.offers);
      });
    });
}

module.exports = closeRequests;
