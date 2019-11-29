require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");

const db = require("./models");
const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");
const { connectionOptions } = require("./config/mongoose");

const PORT = process.env.PORT || 3001;

// Setting CORS so that any website can Access our API
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

if (process.env.NODE_ENV === "production")
  app.use(express.static("client/build"));

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";

mongoose
  .connect(connectionString, connectionOptions)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));

app.post("/api/login", (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
});

app.post("/api/signup", (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

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

require("./routes/request")(app);

app.get("/api/offersOwner/:ownerId", isAuthenticated, (req, res) => {
  if (!req.user.isOwner) {
    return res.status(403).send("Must be an owner.");
  }
  db.Offer.aggregate([
    {
      $match: {
        ownerId: mongoose.Types.ObjectId(req.params.ownerId)
      }
    },
    {
      $group: {
        _id: "$requestId",
        offers: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        item: {
          $reduce: {
            input: "$offers",
            initialValue: "$offers.0",
            in: {
              $cond: {
                if: {
                  $lt: ["$$value.price", "$$this.price"]
                },
                then: "$$value",
                else: "$$this"
              }
            }
          }
        }
      }
    },
    {
      $replaceRoot: { newRoot: "$item" }
    }
  ]).then(result => {
    db.Request.populate(result, {
      path: "requestId",
      select: "closed item priceInitial location time"
    })
      .then(offers => {
        if (offers) res.json({ offers });
        else
          res.status(404).send({ success: false, message: "No offers found" });
      })
      .catch(err => res.status(400).send(err));
  });
});

app.post("/api/offer/", isAuthenticated, (req, res) => {
  db.Offer.updateMany({ requestId: req.body.requestId }, { isBest: false })
    .then(result => {
      db.Offer.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).send(err.message));
    })
    .catch(err => res.status(400).json(err));
});

// Serve up static assets (usually on heroku)

app.get(
  "/",
  isAuthenticated /* Using the express jwt MW here */,
  (req, res) => {
    res.send("You are authenticated"); //Sending some response when authenticated
  }
);

//get offers
app.get("/api/offers/:requestId", isAuthenticated, (req, res) =>
  db.Offer.find({ requestId: req.params.requestId })
    .populate({ path: "ownerId", select: "username" })
    .then(data => {
      if (data) res.json(data);
      else
        res
          .status(404)
          .send({ success: false, message: "No offers for this request" });
    })
    .catch(err => res.status(400).send(err))
);

//Route to view one request
app.get("/api/owner/requests/:id", (req, res) =>
  db.Request.findById(req.params.id)
    .populate({ path: "renteeId", select: "email username" })
    .then(data => res.json({ request: data }))
    .catch(err => res.status(400).json(err))
);

//ADMIN
require("./routes/admin")(app);

//CANEL Request
app.put("/api/request-cancel/", isAuthenticated, (req, res) => {
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
    .then(data => res.json(data))
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
    .then(data => res.json(data))
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

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
