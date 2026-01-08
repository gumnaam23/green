// models/FinancialSummary.js
import mongoose from "mongoose";

const FinancialSummarySchema = new mongoose.Schema({
  totalFunds: Number,
  totalDonations: Number,
  avgDonation: Number,
  fundsThisMonth: Number,
  fundsThisYear: Number,
  growthRate: Number,
  pendingAmount: Number,
  allocatedAmount: Number
}, { timestamps: true });

export default mongoose.models.FinancialSummary ||
  mongoose.model("FinancialSummary", FinancialSummarySchema);
