// models/TreeFinancials.js
import mongoose from "mongoose";

const TreeFinancialsSchema = new mongoose.Schema({
  totalFunds: Number,
  fundsThisMonth: Number,
  fundsThisYear: Number,
  costPerTree: Number,
  allocation: {
    plantation: Number,
    maintenance: Number,
    community: Number,
    admin: Number
  }
}, { timestamps: true });

export default mongoose.models.TreeFinancials ||
  mongoose.model("TreeFinancials", TreeFinancialsSchema);
