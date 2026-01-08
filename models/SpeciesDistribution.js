// models/SpeciesDistribution.js
import mongoose from "mongoose";

const SpeciesDistributionSchema = new mongoose.Schema({
  name: String,
  count: Number,
  percentage: Number,
  benefits: [String]
}, { timestamps: true });

export default mongoose.models.SpeciesDistribution ||
  mongoose.model("SpeciesDistribution", SpeciesDistributionSchema);
