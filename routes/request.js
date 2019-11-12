const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const notifyNewReq = require("../utils/notifyNewReq")

module.exports = function (app) {

  app.get("/api/requestsO/:renteeId", isAuthenticated, (req, res) => {
    db.Request.find({ renteeId: req.params.renteeId, closed: false })
      .populate({ path: "priceBest" })
      .then(requests => {
        if (!requests) res.status(404).send({ success: false, message: "No requests found" });

        let requestsClean = requests.map(request => {
          return {
            _id: request._id,
            item: request.item,
            priceInitial: request.priceInitial,
            location: request.location,
            time: request.time,
            priceBest: request.priceBest[0] ? request.priceBest[0].price : null,
            numberOffers: request.numberOffers
          };
        });
        res.json(requestsClean);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err.message);
      });
  });

  app.get("/api/requestsC/:renteeId", isAuthenticated, (req, res) => {
    db.Request.find({ renteeId: req.params.renteeId, closed: true })
      .populate({ path: "winnerId", select: "username email" })
      .then(requests => {
        if (!requests) res.status(404).send({ success: false, message: "No requests found" });
        let requestsClean = requests.map(request => {
          let requestClean = {
            _id: request._id,
            item: request.item,
            priceInitial: request.priceInitial,
            location: request.location,
            time: request.time
          };
          if (request.winnerId) {
            requestClean.winnerName = request.winnerId.username;
            requestClean.winnerEmail = request.winnerId.email;
            requestClean.priceFinal = request.priceFinal;
          }
          return requestClean;
        });
        res.json(requestsClean);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  app.get("/api/requests", isAuthenticated, (req, res) => {

    if (!req.user.isOwner) {
      return res.status(403).send("Must be an owner.");
    }

    db.Request.find({ closed: "false" })
      .then(data => {
        if (data)
          res.json({ requests: data });
        else
          res.status(404).send({ success: false, message: "No requests found" });
      })
      .catch(err => res.status(400).send(err));
  });


  app.post("/api/request/", isAuthenticated, (req, res) => {
    db.Request.create(req.body)
      .then(data => {
        notifyNewReq(data);
        res.json({ id: data._id })
      })
      .catch(err => res.status(400).send(err.message));
  });
  
  app.get("/api/request/:requestId", isAuthenticated, (req, res) => {
    db.Request.find({ _id: req.params.requestId })
      .then(data => {
        if (data)
          res.json(data);
        else
          res.status(404).send({ success: false, message: "Request not found" });
      })
      .catch(err => res.status(400).send(err));
  });

};
