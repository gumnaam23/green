// models/FundAllocation.js
import mongoose from "mongoose";

const FundAllocationSchema = new mongoose.Schema({
  plantation: Number,
  community: Number,
  admin: Number,
  fundraising: Number,
  research: Number
}, { timestamps: true });

export default mongoose.models.FundAllocation ||
  mongoose.model("FundAllocation", FundAllocationSchema);
