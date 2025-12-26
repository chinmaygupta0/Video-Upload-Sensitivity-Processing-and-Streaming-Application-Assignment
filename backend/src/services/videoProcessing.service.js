const Video = require("../models/Video");
const { getVideoMetadata } = require("../utils/ffmpeg");
const { analyzeSensitivity } = require("./sensitivity.service");
const { emitProgress } = require("../sockets/progress.socket");

console.log("✅ videoProcessing.service loaded");

const processVideo = async (videoId) => {
  console.log("⚙️ processVideo START:", videoId);

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      console.log("❌ Video not found");
      return;
    }

    video.status = "PROCESSING";
    await video.save();
    console.log("✅ Status set to PROCESSING");

    emitProgress(videoId, 10, "PROCESSING");
    console.log("📡 Emitted 10%");

    const metadata = await getVideoMetadata(video.filename);
    console.log("🎥 Metadata received:", metadata);

    emitProgress(videoId, 50, "PROCESSING");

    const score = analyzeSensitivity({
      duration: metadata.duration,
      size: video.size
    });

    video.duration = metadata.duration;
    video.sensitivityScore = score;
    video.status = score >= 60 ? "FLAGGED" : "SAFE";
    await video.save();

    emitProgress(videoId, 100, video.status);
    console.log("✅ Processing COMPLETE");

  } catch (error) {
    console.error("🔥 Video processing CRASHED:", error);
  }
};

module.exports = { processVideo };
