import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;

  try {
    // Cache for 1 hour, just like the website!
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data.items || []);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
