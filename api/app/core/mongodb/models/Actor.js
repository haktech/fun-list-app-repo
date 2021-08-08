const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String },
  imgPath: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model("Actor", ActorSchema);
