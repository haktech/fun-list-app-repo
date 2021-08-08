const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  imgPath: { type: String },
  trailerPath: { type: String },
  videoPath: { type: String },
  genre: { type: String },
  isSeries: { type: Boolean, default: false },
});

module.exports = mongoose.model("Movie", MovieSchema);
