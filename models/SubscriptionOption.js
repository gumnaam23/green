// models/SubscriptionOption.js
import mongoose from "mongoose";

const SubscriptionOptionSchema = new mongoose.Schema({
  amount: Number,
  frequency: String, // monthly
  trees: Number,
  label: String
}, { timestamps: true });

export default mongoose.models.SubscriptionOption ||
  mongoose.model("SubscriptionOption", SubscriptionOptionSchema);
