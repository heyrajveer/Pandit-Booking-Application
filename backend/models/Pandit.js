const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  city: String,
  experience: Number,
  services: [String],
  price: Number,
  description: String

}, { timestamps: true });

module.exports = mongoose.model("Pandit", panditSchema);