"use client";

import { useEffect, useState } from "react";

export default function BdcPress() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // YouTube channel info
  const CHANNEL_ID = "UCk_pBB6TriKLB_biEnMo4kg";
  const CHANNEL_NAME = "BDC Press"; // আপনার চ্যানেলের সঠিক নাম দিন

  // 👇 সমাধান: এখানে আপনার চ্যানেলের আসল লোগোর লিংকটি দিন
  const channelLogo = "https://yt3.googleusercontent.com/YOUR_ACTUAL_IMAGE_URL_HERE.jpg"; 
  // উদাহরণস্বরূপ, যদি কপি করা লিংক অনেক বড় হয়, তবুও সেটি কাজ করবে।

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/youtube");
        const data = await res.json();

        const entries = data?.feed?.entry;
        
        // সব সময় অ্যারে নিশ্চিত করা
        const videosArray = entries
          ? Array.isArray(entries)
            ? entries
            : [entries]
          : [];

        setVideos(videosArray);
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading)
    return <p className="text-center p-5 text-lg">Loading videos...</p>;

  return (
    <main>
    <div className="flex justify-between gap-1 mb-4 pb-2 font-extrabold items-center border-pg border-b">
      <div className="flex gap-1 items-center">
                    <img className="w-7" src={"/images/svg/media/yt.svg"} />
                    <h3 className="font-extrabold">BDC PRESS</h3>
                    </div>
                     <a
          href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition text-sm font-medium"
        >
          Subscribe
        </a>
                </div>
                
    <div>

      {/* Videos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 text-black md:grid-cols-3 gap-3">
        {videos.map((video, i) => {
          const videoId = video["yt:videoId"];
          const title = video.title;

          return (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col"
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold line-clamp-2" title={title}>
                    {title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </main>
  );
}