// models/PlantedTree.js
import mongoose from "mongoose";

const MaintenanceLogSchema = new mongoose.Schema({
  date: Date,
  activity: String,
  status: String,
  notes: String
}, { _id: false });

const ImpactSchema = new mongoose.Schema({
  co2Absorbed: Number,
  oxygenProduced: Number,
  waterFiltered: Number,
  biodiversityIndex: Number
}, { _id: false });

const PlantedTreeSchema = new mongoose.Schema({
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
  impact: ImpactSchema,
  maintenanceLogs: [MaintenanceLogSchema]
}, { timestamps: true });

export default mongoose.models.PlantedTree ||
  mongoose.model("PlantedTree", PlantedTreeSchema);
