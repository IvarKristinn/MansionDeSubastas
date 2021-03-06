const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  title: { type: String, required: true },
  artistId: {type: Schema.Types.ObjectId, required: true , ref: "Artist"},
  date: { type: Date, required: true, default: Date.now }, 
  images: [String],
  description: String,
  isAuctionItem: { type: Boolean, default: false}
});
