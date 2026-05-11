import { NextResponse } from "next/server";

// Helper to translate YouTube's ISO 8601 duration (PT1H2M10S) into clean 00:00 format
function formatDuration(isoDuration: string) {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  let formatted = "";
  if (hours) formatted += `${hours}:`;
  formatted += `${hours && minutes.length === 1 ? "0" : ""}${minutes || "0"}:`;
  formatted += `${seconds.length === 1 ? "0" : ""}${seconds || "00"}`;

  return formatted;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  // STEP 1: Search the channel to get the Video IDs
  let searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=id&order=date&maxResults=15&type=video`;
  if (searchQuery) {
    searchUrl += `&q=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const cacheOptions = searchQuery
      ? { cache: "no-store" }
      : { next: { revalidate: 3600 } };

    // Fetch IDs
    const searchRes = await fetch(searchUrl, cacheOptions as RequestInit);
    if (!searchRes.ok)
      return NextResponse.json(
        { error: "Failed to fetch search" },
        { status: 500 },
      );
    const searchData = await searchRes.json();

    // Extract IDs into a comma-separated list
    const videoIds = searchData.items
      .map((item: any) => item.id.videoId)
      .join(",");
    if (!videoIds) return NextResponse.json([]);

    // STEP 2: Ask YouTube for the exact details (Duration & Date) of those specific videos
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails`;
    const videosRes = await fetch(videosUrl, cacheOptions as RequestInit);
    if (!videosRes.ok)
      return NextResponse.json(
        { error: "Failed to fetch details" },
        { status: 500 },
      );

    const videosData = await videosRes.json();

    // STEP 3: Clean up the data for the mobile app
    const formattedVideos = videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
      duration: formatDuration(video.contentDetails.duration),
    }));

    // Keep them sorted by date
    formattedVideos.sort(
      (a: any, b: any) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return NextResponse.json(formattedVideos);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
