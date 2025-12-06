"use client";
import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export default function BdcPress() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelLogo, setChannelLogo] = useState("");
  const [channelId, setChannelId] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");
        const data = await res.json();

        setVideos(data.videos || []);
        setChannelLogo(data.channelLogo || "");
        setChannelId(data.channelId || "");
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (!videos.length) return <p>No videos found.</p>;

  return (
    <div className="w-full text-pg">
      {/* Header */}
      <div className="flex w-full gap-2 text-lg mb-4 pb-2 font-extrabold items-center border-b border-pg">
        <img className="w-7 h-7" src="/images/svg/media/yt.svg" alt="YouTube" />
        <h3 className="font-extrabold">DBC PRESS</h3>
      </div>

      {/* Channel info */}
      <div className="flex items-center gap-3 mb-4">
        {channelLogo && (
          <img
            src={channelLogo}
            alt="channel logo"
            className="w-12 h-12 rounded-full border shadow"
          />
        )}
        {channelId && (
          <a
            href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
            target="_blank"
            className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Subscribe
          </a>
        )}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border rounded-lg overflow-hidden shadow bg-white">
            {/* Thumbnail / Player */}
            <div className="relative w-full">
              {playing === video.id ? (
                <iframe
                  className="w-full h-40 sm:h-44 lg:h-48"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <div
                  className="relative cursor-pointer"
                  onClick={() => setPlaying(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video title */}
            <div className="p-2">
              <p className="text-sm font-semibold line-clamp-2">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
