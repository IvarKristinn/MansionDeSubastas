const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

module.exports = new Schema({
  auctionId: { type: ObjectId, required: true },
  customerId: { type: ObjectId, required: true },
  price: { type: Number, required: true},
});
