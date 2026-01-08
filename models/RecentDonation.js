// models/RecentDonation.js
import mongoose from "mongoose";

const RecentDonationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  trees: Number,
  time: String
}, { timestamps: true });

export default mongoose.models.RecentDonation ||
  mongoose.model("RecentDonation", RecentDonationSchema);
