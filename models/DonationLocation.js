// models/DonationLocation.js
import mongoose from "mongoose";

const DonationLocationSchema = new mongoose.Schema({
  id: String,
  name: String,
  trees: Number,
  status: String // active/planned/recommended
}, { timestamps: true });

export default mongoose.models.DonationLocation ||
  mongoose.model("DonationLocation", DonationLocationSchema);
