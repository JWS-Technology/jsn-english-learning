import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/test.model";
import TestResult from "@/models/testResult.model";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function GET() {
  try {
    await connectDB();

    // 1. Fetch all tests
    const tests = await Test.find()
      .select("-questions")
      .sort({ createdAt: -1 })
      .lean();

    // 2. Aggregate statistics from TestResults
    const stats = await TestResult.aggregate([
      {
        $group: {
          _id: "$test",
          participants: { $sum: 1 },
          avgScore: { $avg: "$score" },
        },
      },
    ]);

    // 3. Merge the stats into the tests array
    const testsWithStats = tests.map((test) => {
      const testStat = stats.find(
        (s) => s._id.toString() === test._id.toString(),
      );
      return {
        ...test,
        participants: testStat ? testStat.participants : 0,
        avgScore: testStat ? Math.round(testStat.avgScore * 10) / 10 : 0, // Round to 1 decimal
      };
    });

    return NextResponse.json(testsWithStats, { status: 200 });
  } catch (error: any) {
    console.error("Analytics Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch test analytics" },
      { status: 500 },
    );
  }
}
