const db = require("../models");

const cutoffHours = 12;

function closeRequests() {
  let timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() + cutoffHours);

  db.Request.find({ closed: false, time: { $lt: timeLimit } })
    .select("renteeId time")
    .populate({ path: "offers", select: "price ownerId", sort: { price: 1 } })
    .then(requests => {
      requests.forEach(request => {
        let requestUpdate = { closed: true };
        
        if (request.offers.length) {
          console.log('Bets offer', request.offers[0]);
          db.Offer
            .findByIdAndUpdate(request.offers[0]._id, { isWinner: true })
            .catch(err => console.log(err));
         
          requestUpdate.priceFinal = request.offers[0].price;
          requestUpdate.winnerId = request.offers[0].ownerId;
          requestUpdate.canceled = true;
        }

        db.Request
          .findByIdAndUpdate(request._id, requestUpdate)
          .catch(err => console.log(err));
        
      });
    });
}

module.exports = closeRequests;
