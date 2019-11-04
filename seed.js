const db = require('./models');

function addRentee() {
  const numRentee = 3;
  let rentees = [];
  for (let i = 0; i < numRentee; i++) {
    rentees.push({
      username: `Rentee ${i}`,
      email: `rentee${i}@mail.com`,
      password: 'password1',
      isOwner: false
    })
  }

  rentees.forEach(rentee => {
    db.User
      .findOne({ email: rentee.email })
      .then(dbRentee => {
        if (dbRentee === null)
          db.User
            .create(rentee)
            .then(dbRentee => console.log(`Created user: ${dbRentee.username}`))
            .catch(err => console.log(err))
        else
          console.log(`User with email: ${rentee.email} already exists`);
      })
  });
}

function addReqests() {
  db.User
    .find({ isOwner: false })
    .then(dbRentees => {
      dbRentees.forEach(rentee => {
        console.log(rentee._id)
        createRequests(rentee._id)
      })
    })
}

function createRequests(renteeId) {
  const numeReqs = 5;
  requests = [];
  for (let i = 0; i < numeReqs; i++) {
    console.log('Creating reqs: ', i);
    time = new Date();
    time.setDate(time.getDate() + Math.floor(Math.random() * 10));
    requests.push({
      renteeId,
      item: `Item # ${i}`,
      priceInitial: Math.floor(Math.random() * 20) + 10,
      location: `Location ${i}`,
      time
    });
  }
  db.Request
    .create(requests)
    .then(dbReqs => console.log(dbReqs))
    .catch(err => console.log(err))
}

function addOwner() {
  const numOwners = 3;
  let owners = [];
  for (let i = 0; i < numOwners; i++) {
    owners.push({
      username: `Owner ${i}`,
      email: `owner${i}@mail.com`,
      password: 'password1',
      isOwner: true
    })
  }
  owners.forEach(owner => {
    db.User
      .findOne({ email: owner.email })
      .then(dbOwner => {
        if (dbOwner === null)
          db.User
            .create(owner)
            .then(dbOwner => console.log(`Created owner: ${dbOwner.username}`))
            .catch(err => console.log(err))
        else
          console.log(`Owner: ${owner.username} already exists`);
      })
  });
}

function addOffers() {
  db.User
    .find({ isOwner: true })
    .then(dbOwners => dbOwners.forEach(owner => createOffer(owner._id)))
    .catch(err => console.log(err))
}

function createOffer(ownerId) {
  db.Request
    .find({})
    .then(requests => (
      requests.forEach(request => {
        db.Offer
          .create({
            ownerId,
            requestId: request._id,
            price: request.priceInitial - 1
          })
      })
    ))
    .catch(err => console.log(err))
}

module.exports = { addRentee, addOwner, addReqests, addOffers };