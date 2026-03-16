import { NextResponse } from "next/server";
import mongoose from "mongoose";
import TestResult from "@/models/testResult.model";
import Test from "@/models/test.model";
import User from "@/models/user.model"; // Ensure User model is loaded for populate

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Test ID" }, { status: 400 });
    }

    // Fetch the test details for the header
    const test = await Test.findById(id).select(
      "title subject examType totalQuestions",
    );
    if (!test)
      return NextResponse.json({ message: "Test not found" }, { status: 404 });

    // Fetch all results for this test, populate user data, sort by highest score
    const results = await TestResult.find({ test: id })
      .populate("user", "name email")
      .sort({ score: -1, createdAt: -1 }); // Highest score first, then newest

    return NextResponse.json({ test, results }, { status: 200 });
  } catch (error: any) {
    console.error("Test Results Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch results" },
      { status: 500 },
    );
  }
}
