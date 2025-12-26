const Video = require("../models/Video");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const { processVideo } = require("../services/videoProcessing.service");

/**
 * =========================
 * UPLOAD VIDEO
 * =========================
 */
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Video title is required" });
    }

    const video = await Video.create({
      title,
      filename: req.file.path,
      ownerId: req.user._id,
      organizationId: req.user.organizationId,
      size: req.file.size
    });

    // 🔥 Start background processing
    processVideo(video._id);

    res.status(201).json({
      message: "Video uploaded successfully",
      video
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Video upload failed" });
  }
};

/**
 * =========================
 * GET ALL VIDEOS
 * =========================
 */
exports.getVideos = async (req, res) => {
  try {
    const filter = { organizationId: req.user.organizationId };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.json({
      count: videos.length,
      videos
    });

  } catch (error) {
    console.error("Get videos error:", error);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

/**
 * =========================
 * GET SINGLE VIDEO
 * =========================
 */
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOne({
      _id: id,
      organizationId: req.user.organizationId
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);

  } catch (error) {
    console.error("Get video error:", error);
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

/**
 * =========================
 * STREAM VIDEO (HTTP RANGE)
 * =========================
 */
exports.streamVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOne({
      _id: id,
      organizationId: req.user.organizationId,
      status: { $in: ["SAFE", "FLAGGED"] }
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const videoPath = path.resolve(video.filename);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: "Video file missing" });
    }

    const fileSize = fs.statSync(videoPath).size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4"
      });

      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4"
      });

      fs.createReadStream(videoPath).pipe(res);
    }

  } catch (error) {
    console.error("Streaming error:", error);
    res.status(500).json({ message: "Streaming failed" });
  }
};
