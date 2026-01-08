// models/Tree.js
import mongoose from "mongoose";

const TreeSchema = new mongoose.Schema({
  projectCode: String,
  location: String,
  coordinates: String,
  species: String,
  count: Number,
  plantingDate: Date,
  status: String,
  survivalRate: Number,
  volunteers: Number,
  projectLead: String,
  photos: Number,
  impact: {
    co2Absorbed: Number,
    oxygenProduced: Number,
    waterFiltered: Number,
    biodiversityIndex: Number
  },
  maintenanceLogs: [
    { date: Date, activity: String, status: String, notes: String }
  ]
}, { timestamps: true });

export default mongoose.models.Tree || mongoose.model("Tree", TreeSchema);
