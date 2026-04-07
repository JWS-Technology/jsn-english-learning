import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect"; // Ensure this path matches your setup
import Schedule from "@/models/schedule.model";

// --- GET: Fetch Schedule for Homepage ---
export async function GET() {
  try {
    await connectDB();
    // Fetch the single schedule document
    const schedule = await Schedule.findOne().lean();

    if (!schedule) {
      return NextResponse.json({ isActive: false }, { status: 200 });
    }

    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch schedule" },
      { status: 500 },
    );
  }
}

// --- POST: Update Schedule (Admin Portal) ---
export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Use findOneAndUpdate with upsert: true.
    // This updates the existing record, or creates one if the DB is empty.
    const updatedSchedule = await Schedule.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true },
    );

    return NextResponse.json(
      { success: true, data: updatedSchedule },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update schedule" },
      { status: 500 },
    );
  }
}
