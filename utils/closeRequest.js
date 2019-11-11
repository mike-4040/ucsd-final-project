const db = require("../models");

function closeRequest(requestId) {
  db.Request.findById(requestId)
    .select("closed canceled")
    .populate({ path: "offers", select: "price ownerId", sort: { price: 1 } })
    .then(request => {
      if (!request)
        return { status: 1, message: "Request not found" };
      if (request.closed === true)
        return { status: 2, message: "Reques already closed" };
      
      let requestUpdate = {}
      requestUpdate = { closed: true };
        
      if (request.offers.length) {
        requestUpdate.priceFinal = request.offers[0].price;
        requestUpdate.winnerId = request.offers[0].ownerId;

        db.Offer
          .findByIdAndUpdate(request.offers[0]._id, { isWinner: true })
          .catch(err => console.log(err));
      }
      
      db.Request
        .findByIdAndUpdate(requestId, requestUpdate)
        .catch(err => console.log(err));
    });
}

module.exports = closeRequest;
