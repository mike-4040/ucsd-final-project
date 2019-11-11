require("dotenv").config();
const mongoose = require("mongoose");

const closeRequests = require("./closeRequests");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => closeRequests())
  .then(() => mongoose.disconnect())
  .catch(err => console.error(err));