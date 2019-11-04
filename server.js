require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan"); // used to see requests
const db = require("./models");
const PORT = process.env.PORT || 3001;

const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");

const seed = require('./seed');

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

<<<<<<< HEAD
// New
const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";

mongoose
  .connect(connectionString, { useNewUrlParser: true, useCreateIndex: true })
=======
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB';

mongoose
  .connect(connectionString, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
>>>>>>> 5e7c1690ad2cdc2df7e7983aebad184b28de32e9
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

<<<<<<< HEAD
app.get("/api/requests/:renteeId", isAuthenticated, (req, res) => {
  db.Request.find({ renteeId: req.params.renteeId })
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch(err => res.status(400).send(err));
=======
app.get('/api/requests/:renteeId', isAuthenticated, (req, res) => {
  db.Request.find({ renteeId: req.params.renteeId }).then(data => {
    if(data) {
      res.json(data);
      console.log('\nSERVER: Found requests', data);
    } else {
      res.status(404).send({success: false, message: 'No requests found'});
    }
  }).catch(err => res.status(400).send(err));
>>>>>>> 5e7c1690ad2cdc2df7e7983aebad184b28de32e9
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
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
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
  db.Offer.find({ requestId: req.params.requestId })
    .then(data => {
      // console.log(data);
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "Request not found" });
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

<<<<<<< HEAD
=======
//ADMIN

app.get('/admin/rentee', (req, res) => {
  seed.addRentee();
  res.send('Creating rentees');
})

app.get('/admin/request', (req, res) => {
  seed.addReqests();
  res.send('Creating Requests');
})

app.get('/admin/owner', (req, res) => {
  seed.addOwner();
  res.send('Creating Owners');
})

app.get('/admin/offer', (req, res) => {
  seed.addOffers();
  res.send('Creating Offers');
})


>>>>>>> 5e7c1690ad2cdc2df7e7983aebad184b28de32e9
// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
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
