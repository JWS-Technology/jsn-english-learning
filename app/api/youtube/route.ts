import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Look for a search word in the URL (e.g., ?q=Chapter 1)
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  // 2. Base URL (Fetches latest videos)
  let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15&type=video`;

  // 3. If the user typed a search, append it to the YouTube request
  if (searchQuery) {
    url += `&q=${encodeURIComponent(searchQuery)}`;
  }

  try {
    // 4. Cache logic: Cache the main page for 1 hour, but don't cache specific searches
    const cacheOptions = searchQuery
      ? { cache: "no-store" }
      : { next: { revalidate: 3600 } };

    const res = await fetch(url, cacheOptions as RequestInit);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data.items || []);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
