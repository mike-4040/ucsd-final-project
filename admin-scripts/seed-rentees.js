const mongoose = require("mongoose");
const db = require("../models");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/appDB";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => addRentee())
  .then(() => mongoose.connection.close())
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function addRentee() {
  const users = [];
  const numRentee = 3;
  for (let i = 0; i < numRentee; i++) {
    users.push({
      username: `Rentee ${i}`,
      email: `rentee${i}@mail.com`,
      password: "password1",
      isOwner: false
    });
  }
  const numOwners = 3;
  for (let i = 0; i < numOwners; i++) {
    users.push({
      username: `Owner ${i}`,
      email: `owner${i}@mail.com`,
      password: "password1",
      isOwner: true
    });
  }

  return db.User.deleteMany({})
    .then(() => db.User.create(users))
    .then(result => console.log(`Created ${result.length} rentees.`));
}
