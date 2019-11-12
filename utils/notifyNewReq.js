const sgMail = require('@sendgrid/mail');
const db = require("../models");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function notifyNewReq(request) {
  db.User.find({ isOwner: true })
    .select("username email")
    .then(owners => {
      if (!owners) return resolve("No owners in DB");

      const emails = owners.map(owner => {
        return {
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
        };
      });
      sgMail.send(emails);
    });
}

module.exports = notifyNewReq;
