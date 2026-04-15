import mongoose from "mongoose";
const panditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  city: {
    type: String,
    default: "",
    index:true
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
  ],

  profileImage: {
    type: String,
    default: ""
  }

}, { timestamps: true });

const Pandit = mongoose.model("Pandit", panditSchema);
export default Pandit;