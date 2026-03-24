const mongoose = require("mongoose");
const panditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  experience: {
    type: String,
    default: ""
  },

  price: {
    type: Number,
    default: 0
  },

  description: {
    type: String,
    default: ""
  },
   services: [
    {
      type: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Pandit", panditSchema);