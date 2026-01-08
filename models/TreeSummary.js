// models/TreeSummary.js
import mongoose from "mongoose";

const TreeSummarySchema = new mongoose.Schema({
  totalTrees: Number,
  targetTrees: Number,
  plantedThisMonth: Number,
  plantedThisYear: Number,
  survivalRate: Number,
  pendingPlantations: Number,
  completedProjects: Number,
  activeLocations: Number,
  totalVolunteers: Number,
  estimatedCO2: Number, // kg
  waterSaved: Number // liters
}, { timestamps: true });

export default mongoose.models.TreeSummary ||
  mongoose.model("TreeSummary", TreeSummarySchema);
