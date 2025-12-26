const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const rbacMiddleware = require("../middlewares/rbac.middleware");
const upload = require("../middlewares/multer.middleware");

const {
  uploadVideo,
  getVideos,
  getVideoById,
  streamVideo
} = require("../controllers/video.controller");

// =========================
// Upload video
// =========================
router.post(
  "/upload",
  authMiddleware,
  rbacMiddleware("admin", "editor"),
  upload.single("video"),
  uploadVideo
);

// =========================
// List all videos
// =========================
router.get(
  "/",
  authMiddleware,
  rbacMiddleware("viewer", "editor", "admin"),
  getVideos
);

// =========================
// Stream video (MUST be before :id)
// =========================
router.get(
  "/:id/stream",
  authMiddleware,
  rbacMiddleware("viewer", "editor", "admin"),
  streamVideo
);

// =========================
// Get single video
// =========================
router.get(
  "/:id",
  authMiddleware,
  rbacMiddleware("viewer", "editor", "admin"),
  getVideoById
);

module.exports = router;
