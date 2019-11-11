const db = require("../models");

function closeRequest(requestId) {
  return new Promise((resolve, reject) => {
    p = [];
    console.log("Closing requests");
    db.Request.findById(requestId)
      .populate({ path: "offers", select: "price ownerId", sort: { price: 1 } })
      .then(request => {
        let requestUpdate = { closed: true };

        if (request.offers.length) {
          const bestOffer = request.offers[0];
          p.push(db.Offer.findByIdAndUpdate(bestOffer._id, { isWinner: true }));
          requestUpdate.priceFinal = bestOffer.price;
          requestUpdate.winnerId = bestOffer.ownerId;
        } else {
          requestUpdate.canceled = true;
        }
        p.push(db.Request.findByIdAndUpdate(request._id, requestUpdate));
      });
    Promise.all(p)
      .then(result => resolve(result))
      .catch(err => reject(new Error('can"n sorry' + err.message)));
  })
    .then(() => console.log("done"))
    .catch(console.log);
}

module.exports = closeRequest;
