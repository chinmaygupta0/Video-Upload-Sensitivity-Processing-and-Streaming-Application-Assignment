import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      alert("Please provide title and video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    try {
      setLoading(true);
      await api.post("/videos/upload", formData);
      alert("Video uploaded successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleUpload}>
        <h2 style={styles.heading}>📤 Upload Video</h2>
        <p style={styles.subText}>
          Upload a video to analyze sensitivity and stream securely
        </p>

        <label style={styles.label}>Video Title</label>
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Select Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #f9fafb 0%, #eef2ff 50%, #f8fafc 100%)",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "35px",
    width: "420px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    backdropFilter: "blur(6px)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "8px",
    fontSize: "22px"
  },

  subText: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px",
    fontSize: "14px"
  },

  label: {
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "6px",
    display: "block"
  },

  input: {
    width: "100%",
    padding: "11px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  fileInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "25px",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px"
  }
};
