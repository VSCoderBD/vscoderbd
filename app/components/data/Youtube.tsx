"use client";
import { useEffect, useState } from "react";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  // 1. ADDED publishedAt to interface
  publishedAt: string; 
}

// Function to format the date string
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function YouTube() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [logo, setLogo] = useState("");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVideos(data.videos);
          setLogo(data.channelLogo);
        }
      });
  }, []);

  // --- (Fix from previous exchange is also included in the iframe) ---

  return (
    <div className="p-4">
      {logo && (
        <img src={logo} alt="Channel Logo" className="w-20 h-20 rounded-full mb-4" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.videoId} className="relative rounded-lg overflow-hidden">
            {playingVideo === video.videoId ? (
              <iframe
                className="w-full h-[180px]"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=0`}
                title={video.title}
                // Updated 'allow' for robust fullscreen support
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img src={video.thumbnail} alt={video.title} className="w-full" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-4xl"
                  onClick={() => setPlayingVideo(video.videoId)}
                >
                  ▶
                </button>
              </>
            )}
            <h3 className="p-2 text-sm font-semibold">{video.title}</h3>
            {/* 2. DISPLAY the published date */}
            <p className="px-2 pb-2 text-xs text-gray-500">
                Published: **{formatDate(video.publishedAt)}**
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}