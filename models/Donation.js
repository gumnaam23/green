// models/Donation.js
import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donorName: String,
  amount: Number,
  trees: Number,
  type: String, // individual, corporate, government
  date: Date,
  city: String,
  anonymous: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Donation ||
  mongoose.model("Donation", DonationSchema);


  