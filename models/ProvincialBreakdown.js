// models/ProvincialBreakdown.js
import mongoose from "mongoose";

const ProvincialBreakdownSchema = new mongoose.Schema({
  province: String,
  trees: Number,
  percentage: Number,
  projects: Number
}, { timestamps: true });

export default mongoose.models.ProvincialBreakdown ||
  mongoose.model("ProvincialBreakdown", ProvincialBreakdownSchema);
