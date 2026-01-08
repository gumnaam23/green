// models/Statistics.js
import mongoose from "mongoose";

const StatisticsSchema = new mongoose.Schema({
  totalTrees: Number,
  totalTreesTarget: Number,
  treesThisMonth: Number,
  treesThisYear: Number,
  totalFunds: Number,
  survivalRate: Number,
  locationsActive: Number,
  activeVolunteers: Number,
}, { timestamps: true });

export default mongoose.models.Statistics ||
  mongoose.model("Statistics", StatisticsSchema);
