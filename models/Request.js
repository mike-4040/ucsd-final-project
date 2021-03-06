const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const RequestSchema = new Schema(
  {
    renteeId: {
      type: Schema.Types.ObjectId,
      ref: "User"
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
      type: Date,
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
    },
    winnerId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User"
    },
    canceled :{
      type: Boolean,
      default: false
    }
  },
  opts
);

RequestSchema.virtual("priceBest", {
  ref: "Offer", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "requestId",
  options: { sort: { price: 1 }}
  });

RequestSchema.virtual("numberOffers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "requestId",
  count: true
});
RequestSchema.pre("find", function() {
  this.populate("numberOffers");
});

RequestSchema.virtual("offers", {
  ref: "Offer",
  localField: "_id",
  foreignField: "requestId"
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
