// models/RecentTransaction.js
import mongoose from "mongoose";

const RecentTransactionSchema = new mongoose.Schema({
  donor: String,
  amount: Number,
  type: String, // individual, corporate, government, international
  date: Date,
  status: String // completed/pending
}, { timestamps: true });

export default mongoose.models.RecentTransaction ||
  mongoose.model("RecentTransaction", RecentTransactionSchema);
