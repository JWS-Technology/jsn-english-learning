import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/order.model"; // Adjust path if necessary
import TestResult from "@/models/testResult.model";
import Test from "@/models/test.model";
import Material from "@/models/material.model";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing User ID" },
        { status: 400 },
      );
    }

    // 1. Fetch Material Orders for this user
    const orders = await Order.find({ user: userId })
      .populate("material") // Brings in the Material title, subject, etc.
      .sort({ createdAt: -1 });

    // 2. Fetch Test Results for this user
    const testResults = await TestResult.find({ user: userId })
      .populate("test", "title subject examType durationInMinutes") // Brings in Test details
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders, testResults }, { status: 200 });
  } catch (error: any) {
    console.error("Dashboard Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard data" },
      { status: 500 },
    );
  }
}
