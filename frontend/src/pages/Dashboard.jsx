import { useEffect, useState } from "react";
import api from "../api/axios";
import { io } from "socket.io-client";
import VideoPlayer from "../components/VideoPlayer";
import "./Dashboard.css";

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/videos").then(res => setVideos(res.data.videos));
  }, []);

  useEffect(() => {
    socket.on("video-progress", (data) => {
      setVideos(prev =>
        prev.map(v =>
          v._id === data.videoId
            ? { ...v, status: data.status, progress: data.progress }
            : v
        )
      );
    });

    return () => socket.off("video-progress");
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>My Videos</h2>
        <p>Track processing status and stream your videos</p>
      </div>

      {videos.length === 0 && (
        <div className="empty-state">
          No videos uploaded yet.
        </div>
      )}

      <div className="video-grid">
        {videos.map(video => (
          <div key={video._id} className="video-card">
            <h4 className="video-title">{video.title}</h4>

            <div className="status-row">
              <span
                className={`status-badge ${video.status.toLowerCase()}`}
              >
                {video.status}
              </span>

              <span className="progress-text">
                {video.status === "SAFE" || video.status === "FLAGGED"
                  ? "100%"
                  : `${video.progress || 0}%`}
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    video.status === "SAFE" || video.status === "FLAGGED"
                      ? "100%"
                      : `${video.progress || 0}%`
                }}
              />
            </div>

            {video.status !== "PROCESSING" && (
              <div className="player-wrapper">
                <VideoPlayer videoId={video._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
