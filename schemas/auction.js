
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

module.exports = new Schema({
  artId: { type: ObjectId, required: true, ref: "art" },
  minimumPrice: { type: Number, default: 1000 },
  endDate: { type: Date, required: true},
  auctionWinner: { type: ObjectId}
});
