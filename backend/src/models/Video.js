const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  filename: {
    type: String,
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  status: {
    type: String,
    enum: ["UPLOADED", "PROCESSING", "SAFE", "FLAGGED"],
    default: "UPLOADED"
  },

  sensitivityScore: {
    type: Number,
    default: 0
  },

  size: {
    type: Number
  },

  duration: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
