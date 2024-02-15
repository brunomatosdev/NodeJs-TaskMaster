// backend/models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String, required: true },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
