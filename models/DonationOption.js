// models/DonationOption.js
import mongoose from "mongoose";

const DonationOptionSchema = new mongoose.Schema({
  amount: Number,
  trees: Number,
  label: String,
  popular: Boolean,
  description: String,
}, { timestamps: true });

export default mongoose.models.DonationOption ||
  mongoose.model("DonationOption", DonationOptionSchema);
