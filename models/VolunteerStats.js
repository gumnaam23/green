// models/VolunteerStats.js
import mongoose from "mongoose";

const VolunteerStatsSchema = new mongoose.Schema({
  totalVolunteers: Number,
  activeVolunteers: Number,
  volunteerHours: Number,
  upcomingEvents: Number,
  citiesCovered: Number,
  trainingCompleted: Number,
  awardsGiven: Number,
  treesPlantedByVolunteers: Number
}, { timestamps: true });

export default mongoose.models.VolunteerStats ||
  mongoose.model("VolunteerStats", VolunteerStatsSchema);
