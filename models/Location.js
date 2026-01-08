// models/Location.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: String,
  trees: Number,
  province: String,
  type: String,
  status: String,
  completion: Number,
  impact: String,
  images: Number,
  volunteers: Number,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Location ||
  mongoose.model("Location", LocationSchema);

  