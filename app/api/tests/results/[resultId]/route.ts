import { NextResponse } from "next/server";
import mongoose from "mongoose";
import TestResult from "@/models/testResult.model";
import Test from "@/models/test.model"; // Ensure this is imported so populate() works

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> },
) {
  try {
    await connectDB();
    const { resultId } = await params;

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { message: "Invalid Result ID" },
        { status: 400 },
      );
    }

    // Fetch result and populate the related test data
    const result = await TestResult.findById(resultId).populate("test");

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Result Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch test result" },
      { status: 500 },
    );
  }
}
