// models/DonationSource.js
import mongoose from "mongoose";

const DonationSourceSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  percentage: Number
}, { timestamps: true });

export default mongoose.models.DonationSource ||
  mongoose.model("DonationSource", DonationSourceSchema);
