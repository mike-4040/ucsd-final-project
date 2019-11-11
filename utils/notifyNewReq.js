const db = require("../models");

function notifyNewReq(request) {
  return new Promise((resolve, reject) => {
    db.User.find({ isOwner: true })
      .select("username email")
      .then(owners => {
        if (!owners)
          return resolve('No owners in DB');
  
        const msg = owners.map(owner => {
          msg.push({
            to: owner.email,
            from: "bringucsd@gmail.com",
            templateId: "d-259500ad24ca45d0891e0d0cc93111af",
            dynamic_template_data: {
              subject: "New request",
              name: owner.username,
              item: request.item,
              price: request.priceInitial,
              location: request.location,
              time: request.time
            }
          });
        });
        console.log(msg);
      });

  });
}

module.exports = notifyNewReq;
