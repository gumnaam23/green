// models/VolunteerTestimonial.js
import mongoose from "mongoose";

const VolunteerTestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  city: String,
  hours: Number,
  trees: Number,
  quote: String,
  avatar: String,
}, { timestamps: true });

export default mongoose.models.VolunteerTestimonial ||
  mongoose.model("VolunteerTestimonial", VolunteerTestimonialSchema);
