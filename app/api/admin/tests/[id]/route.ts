import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/test.model";
import TestResult from "@/models/testResult.model";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Test ID" }, { status: 400 });
    }

    // 1. Delete the actual test
    const deletedTest = await Test.findByIdAndDelete(id);

    if (!deletedTest) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    // 2. Delete all results associated with this test to keep the DB clean
    await TestResult.deleteMany({ test: id });

    return NextResponse.json(
      { message: "Test and associated results deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Failed to delete test:", error);
    return NextResponse.json(
      { message: "Failed to delete test" },
      { status: 500 },
    );
  }
}
