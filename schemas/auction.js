
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  artId: { type: Schema.Types.ObjectId, required: true, ref: "art" },
  minimumPrice: { type: Number, default: 1000 },
  endDate: { type: Date, required: true},
  auctionWinner: { type: ObjectId}
});
