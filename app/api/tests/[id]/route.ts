import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/test.model";
import { connectDB } from "@/config/dbConnect";

export async function GET(
  request: Request,
  // ✅ FIX: Type params as a Promise
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    // ✅ FIX: Await the params object before destructuring
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Test ID" }, { status: 400 });
    }

    const test = await Test.findById(id).select(
      "-questions.correctAnswer -questions.explanation",
    );

    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json(test, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Single Test Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch test details" },
      { status: 500 },
    );
  }
}
