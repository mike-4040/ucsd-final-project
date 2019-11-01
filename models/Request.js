const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  renteeId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  item: {
    type: String,
    required: true
  },
  priceInitial: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  closed: {
    type: Boolean,
    default: false
  },
  closedAt: {
    type: Date
  },
  priceFinal: {
    type: Number
  }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
