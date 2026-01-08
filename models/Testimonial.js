// models/Event.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  target: Number,
  volunteersNeeded: Number,
  status: String,
}, { timestamps: true });

export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);
