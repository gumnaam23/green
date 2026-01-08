// models/PendingTask.js
import mongoose from "mongoose";

const NextStepSchema = new mongoose.Schema(
  {
    step: String,
    status: {
      type: String,
      enum: ["not-started", "pending", "in-progress", "completed"],
      default: "not-started",
    },
    deadline: Date,
  },
  { _id: false }
);

const ImpactSchema = new mongoose.Schema(
  {
    co2Reduction: Number,
    jobsCreated: Number,
    communitiesImpacted: Number,
  },
  { _id: false }
);

const PendingTaskSchema = new mongoose.Schema(
  {
    taskCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },

    status: {
      type: String,
      enum: ["planning", "funding", "volunteer-recruitment", "scheduled"],
      required: true,
    },

    targetTrees: Number,
    estimatedCost: Number,
    deadline: Date,

    volunteersNeeded: Number,
    volunteersRegistered: Number,

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    description: String,
    challenges: [String],

    nextSteps: [NextStepSchema],
    impact: ImpactSchema,
  },
  { timestamps: true }
);

export default mongoose.models.PendingTask ||
  mongoose.model("PendingTask", PendingTaskSchema);



  