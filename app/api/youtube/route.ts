import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
      return NextResponse.json(
        { error: "Missing API KEY or Channel ID" },
        { status: 500 }
      );
    }

    // --- Get channel info ---
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    const channelLogo =
      channelData.items?.[0]?.snippet?.thumbnails?.high?.url || "";
    const channelTitle = channelData.items?.[0]?.snippet?.title || "";

    // --- Get videos ---
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12`
    );
    const videoData = await videoRes.json();

    const videos =
      videoData.items
        ?.filter((item: any) => item.id.kind === "youtube#video")
        .map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })) || [];

    return NextResponse.json({
      channelId: CHANNEL_ID,
      channelLogo,
      channelTitle,
      videos,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server Error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
