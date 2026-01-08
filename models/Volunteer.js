import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  name: String,
  city: String,
  hours: Number,
  treesPlanted: Number,
  role: String
}, { timestamps: true });

export default mongoose.models.Volunteer || mongoose.model("Volunteer", VolunteerSchema);
