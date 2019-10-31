const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  requestId: {
    type: ObjectId,
    ref: 'Request'
  },
  ownerId: {
    type: ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isBest: {
    type: Boolean,
    default: false
  },
  isWinner: {
    type: Boolean,
    default: false
  }
});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
