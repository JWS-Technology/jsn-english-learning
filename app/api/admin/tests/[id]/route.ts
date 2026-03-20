import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Test from "@/models/test.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Fetch the full test including the questions AND the correct answers
    // (We do not use .select('-questions.correctAnswer') here like in the public route)
    const test = await Test.findById(id);

    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json(test, { status: 200 });
  } catch (error) {
    console.error("Admin Fetch Test Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch test" },
      { status: 500 },
    );
  }
}

// Keep your existing DELETE function here if you have one!
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    await Test.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete test" },
      { status: 500 },
    );
  }
}
