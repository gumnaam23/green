// models/VolunteerSummary.js
import mongoose from "mongoose";

const VolunteerSummarySchema = new mongoose.Schema({
  totalVolunteers: Number,
  activeVolunteers: Number,
  volunteerHours: Number,
  upcomingEvents: Number,
  citiesCovered: Number,
  trainingCompleted: Number,
  awardsGiven: Number,
  treesPlantedByVolunteers: Number,
}, { timestamps: true });

export default mongoose.models.VolunteerSummary ||
  mongoose.model("VolunteerSummary", VolunteerSummarySchema);
