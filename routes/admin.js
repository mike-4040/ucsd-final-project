const seed = require("../utils/seed");

module.exports = function (app) {

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
};
