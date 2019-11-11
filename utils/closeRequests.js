const db = require("../models");

const cutoffHours = 6;

function closeRequests() {
  return new Promise((resolve, reject) => {
    let timeLimit = new Date();
    p = [];
    console.log("Closing requests");
    timeLimit.setHours(timeLimit.getHours() + cutoffHours);
    db.Request
      .find({ closed: false, time: { $lt: timeLimit } })
      .select("renteeId time")
      .populate({ path: "offers", select: "price ownerId", sort: { price: 1 } })
      .then(requests => {
        requests.forEach(request => {
          let requestUpdate = { closed: true, canceled: true };

          if (request.offers.length) {
            p.push(db.Offer
              .findByIdAndUpdate(request.offers[0]._id, { isWinner: true }));

            requestUpdate.priceFinal = request.offers[0].price;
            requestUpdate.winnerId = request.offers[0].ownerId;
            requestUpdate.canceled = false;
          }
          p.push(db.Request.findByIdAndUpdate(request._id, requestUpdate));
        });
        Promise.all(p)
          .then(result => resolve(result))
          .catch(err => reject(new Error('can"n sorry' + err.message)));
      })
      .then(() => console.log('done'))
      .catch(console.log);
  })
}

module.exports = closeRequests;
