import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  totalFunds: Number,
  totalDonations: Number,
  avgDonation: Number,
  expenses: Number,
  netBalance: Number,
  growth: Number,
  auditor: String,
  opinion: String,
  compliance: String,
  findings: String
}, { _id: false });

const ReportSchema = new mongoose.Schema({
  title: String,
  period: String,
  date: Date,
  type: { type: String, enum: ["monthly", "quarterly", "annual", "audit"] },
  size: String,
  downloads: Number,
  summary: SummarySchema
}, { timestamps: true });

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
