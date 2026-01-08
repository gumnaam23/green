// models/DonationImpact.js
import mongoose from "mongoose";

const DonationImpactSchema = new mongoose.Schema({
  co2PerTree: Number,
  oxygenPerTree: Number,
  waterPerTree: Number,
  jobsPer100Trees: Number,
  biodiversityPer100Trees: Number
}, { timestamps: true });

export default mongoose.models.DonationImpact ||
  mongoose.model("DonationImpact", DonationImpactSchema);
