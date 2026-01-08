// models/MonthlyTrend.js
import mongoose from "mongoose";

const MonthlyTrendSchema = new mongoose.Schema({
  month: { type: String, required: true },
  trees: { type: Number, default: 0 },
  funds: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  donations: { type: Number, default: 0 },
  growth: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.MonthlyTrend ||
  mongoose.model("MonthlyTrend", MonthlyTrendSchema);
