import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VideoPlayer({ videoId }) {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/videos/${videoId}/stream`, {
          responseType: "blob"
        });

        const url = URL.createObjectURL(res.data);
        setVideoUrl(url);
      } catch (err) {
        console.error("Video load error", err);
      }
    };

    fetchVideo();

    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoId]);

  if (!videoUrl) return <p>Loading video...</p>;

  return (
    <video controls width="400">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
