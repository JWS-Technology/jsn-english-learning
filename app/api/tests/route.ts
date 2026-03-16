import { NextResponse } from "next/server";
import Test from "@/models/test.model"; // Adjust to your actual model path
import { connectDB } from "@/config/dbConnect";

export async function GET() {
  try {
    await connectDB();

    // Fetch all active tests, but EXCLUDE the questions array for performance.
    // We only need the metadata (title, duration, etc.) for the listing page.
    const tests = await Test.find({ isActive: true })
      .select("-questions")
      .sort({ createdAt: -1 });

    return NextResponse.json(tests, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Tests Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch tests" },
      { status: 500 },
    );
  }
}
