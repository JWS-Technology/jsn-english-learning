import YouTubeClient from "./YouTubeClient";

// 1. Secure Server-Side Fetch Function
async function getLatestVideos() {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`;

    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });

        if (!res.ok) {
            // NEW DEBUGGING CODE HERE:
            const errorData = await res.json();
            console.error("YOUTUBE API EXACT ERROR:", JSON.stringify(errorData, null, 2));
            return [];
        }

        const data = await res.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
}

// 2. The Server Component
export default async function YouTubePage() {
    // Fetch data safely on the server
    const videos = await getLatestVideos();

    // Pass data to your interactive client component
    return <YouTubeClient videos={videos} />;
}