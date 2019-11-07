const mongoose = require("mongoose");
const db = require("../models");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";
const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const cutoffHours = 50;

function closeRequests(message) {
  console.log(message)
  let timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() + cutoffHours);

  mongoose
    .connect(connectionString, connectionOptions)
    .then(() => console.log("MongoDB Connected!", Date()))
    .catch(err => console.error(err));
  
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
      mongoose.disconnect(() => console.log("Connection closed"));
    });
}

// closeRequests(id);
module.exports = closeRequests;
