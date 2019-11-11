require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");

const db = require("./models");
const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");
const seed = require("./seed");

const PORT = process.env.PORT || 3001;

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

//log all requests to the console
app.use(morgan("dev"));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get("/api/user/:id", isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch(err => res.status(400).send(err));
});

// Open requests
app.get("/api/requestsO/:renteeId", isAuthenticated, (req, res) => {
  db.Request.find({ renteeId: req.params.renteeId, closed: false })
    .populate({ path: "priceBest" })
    .then(requests => {
      if (!requests)
        res.status(404).send({ success: false, message: "No requests found" });

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
      if (!requests)
        res.status(404).send({ success: false, message: "No requests found" });
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
  // console.log('Request for Requests', req.params.ownerId);
  // --  isAuthenticated,
  if (!req.user.isOwner) {
    return res.status(403).send("Must be an owner.");
  }

  db.Request.find({ closed: "false" })
    .then(data => {
      if (data) {
        res.json({ requests: data });
      } else {
        res.status(404).send({ success: false, message: "No requests found" });
      }
    })
    .catch(err => res.status(400).send(err));
});

//api/owner/closedrequests
app.get("/api/offersOwner/:ownerId", isAuthenticated, (req, res) => {
  // console.log('Request for Requests', req.params.ownerId);
  // --  isAuthenticated,
  if (!req.user.isOwner) {
    return res.status(403).send("Must be an owner.");
  }

  db.Offer
    .find({ ownerId: req.params.ownerId})
    .populate({path: "requestId", select: "closed item priceInitial location time"})
    .then(offers => {
      if (offers) {
        res.json({offers: offers})
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch(err => res.status(400).send(err));
});

//Owner makes New Offer
//('/api/offer',newOffer
app.post("/api/offer/", isAuthenticated, (req, res) => {
  db.Offer.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err.message));
});

// Serve up static assets (usually on heroku)

app.get(
  "/",
  isAuthenticated /* Using the express jwt MW here */,
  (req, res) => {
    res.send("You are authenticated"); //Sending some response when authenticated
  }
);

//ROUTE FOR RENTEE NEW REQUEST
app.post("/api/request/", isAuthenticated, (req, res) => {
  db.Request.create(req.body)
    .then(data => res.json({ id: data._id }))
    .catch(err => res.status(400).send(err.message));
});

//ROUTE TO GET SINGLE REQUEST FROM DATABASE
app.get("/api/request/:requestId", isAuthenticated, (req, res) => {
  db.Request.find({ _id: req.params.requestId })
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "Request not found" });
      }
    })
    .catch(err => res.status(400).send(err));
});
//get offers
app.get("/api/offers/:requestId", isAuthenticated, (req, res) => {
  // console.log(req.params.requestId)
  db.Offer
    .find({ requestId: req.params.requestId })
    .populate({path: "ownerId", select: "username"})
    .then(data => {
      // console.log(data.toString());
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No offers for this request" });
      }
    })
    .catch(err => res.status(400).send(err));
});
app.post("/api/offers/", isAuthenticated, (req, res) => {
  // console.log(req.body)
  db.Offer.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

//Route to view one request
app.get("/api/owner/requests/:id", (req, res) => {
  //console.log(req.params.id)
  db.Request
  .findById(req.params.id)
  .populate({path: "renteeId", select: "email username"})
  .then(data => {
    console.log('"/api/owner/requests/:id"');
    console.log(data.email);
    res.json({ request: data })
  })
  .catch(err => res.status(400).json(err));
});

//ADMIN

app.get("/admin/rentee", (req, res) => {
  seed.addRentee();
  res.send("Creating rentees");
});

app.get("/admin/request", (req, res) => {
  seed.addReqests();
  res.send("Creating Requests");
});

app.get("/admin/owner", (req, res) => {
  seed.addOwner();
  res.send("Creating Owners");
});

app.get("/admin/offer", (req, res) => {
  seed.addOffers();
  res.send("Creating Offers");
});
//CANEL BID!
app.put("/api/request-cancel/",isAuthenticated, (req, res) => {
  db.Request.findOneAndUpdate(
    { _id: req.body.requestId },
    {
      closed: true,
      closedAt: Date.now(),
      priceFinal: req.body.price,
      canceled: req.body.canceled
    },
    { new: true }
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
});
// UPDATE REQUEST ROUTE
app.put("/api/request/", isAuthenticated, (req, res) => {
  db.Request.findOneAndUpdate(
    { _id: req.body.requestId },
    {
      closed: true,
      closedAt: Date.now(),
      priceFinal: req.body.price,
      winnerId: req.body.ownerId._id,
      canceled: req.body.canceled
    },
    { new: true }
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
});
//UPDATE OFFER ROUTE
app.put("/api/offer/", isAuthenticated, (req, res) => {
  db.Offer.findOneAndUpdate(
    { _id: req.body._id },
    {
      isBest: true,
      isWinner: true
    },
    { new: true }
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(err => res.status(400).json(err));
});

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
