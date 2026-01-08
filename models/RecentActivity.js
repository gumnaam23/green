// models/RecentActivity.js
import mongoose from "mongoose";

const RecentActivitySchema = new mongoose.Schema({
  location: String,
  trees: Number,
  date: Date,
  status: String,
  volunteers: Number
}, { timestamps: true });

export default mongoose.models.RecentActivity ||
  mongoose.model("RecentActivity", RecentActivitySchema);
