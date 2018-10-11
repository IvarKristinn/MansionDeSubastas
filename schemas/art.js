const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

module.exports = new Schema({
  title: { type: String, required: true },
  artistId: {type: ObjectId, required: true , ref: "Artist"},
  date: { type: Date, required: true, default: Date.now }, 
  images: [String],
  description: String,
  isAuctionItem: { type: Boolean, default: false}
});
