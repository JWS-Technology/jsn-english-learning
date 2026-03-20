import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Announcement from "@/models/announcement.model";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    // If activeOnly is true, only fetch active ones. Otherwise, fetch all for the admin.
    const query = activeOnly ? { isActive: true } : {};

    // Fetch the newest announcements first
    const announcements = await Announcement.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Announcement GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch announcements" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.message) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 },
      );
    }

    const newAnnouncement = await Announcement.create({
      message: body.message,
      isActive: true, // Defaults to active when created
    });

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error("Announcement POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create announcement" },
      { status: 500 },
    );
  }
}
