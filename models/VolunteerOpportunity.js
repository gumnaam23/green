// models/VolunteerOpportunity.js
import mongoose from "mongoose";

const VolunteerOpportunitySchema = new mongoose.Schema({
  title: String,
  category: String,
  location: String,
  date: Date,
  duration: String,
  volunteersNeeded: Number,
  volunteersRegistered: Number,
  priority: String,
  description: String,
  requirements: [String],
  benefits: [String],
  skillsGained: [String],
  impact: {
    trees: Number,
    co2: Number,
    community: Number
  }
}, { timestamps: true });

export default mongoose.models.VolunteerOpportunity ||
  mongoose.model("VolunteerOpportunity", VolunteerOpportunitySchema);
