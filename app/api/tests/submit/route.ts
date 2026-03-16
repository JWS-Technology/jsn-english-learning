import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/test.model";
import TestResult from "@/models/testResult.model";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const { testId, userId, answers } = await req.json();

    if (!testId || !userId || !answers) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const test = await Test.findById(testId);
    if (!test) {
      return NextResponse.json({ message: "Test not found" }, { status: 404 });
    }

    let score = 0;
    const gradedAnswers = [];
    const detailedFeedback = []; // Sent back to frontend for the Review Screen

    for (const question of test.questions) {
      const qIdStr = question._id.toString();
      const studentAnswerIndex =
        answers[qIdStr] !== undefined ? answers[qIdStr] : null; // Handle skipped questions
      const isCorrect = studentAnswerIndex === question.correctAnswer;

      if (isCorrect) score += 1;

      // Save to database
      if (studentAnswerIndex !== null) {
        gradedAnswers.push({
          questionId: question._id,
          selectedOption: studentAnswerIndex,
          isCorrect,
        });
      }

      // Add to feedback array
      detailedFeedback.push({
        questionId: qIdStr,
        selectedOption: studentAnswerIndex,
        correctOption: question.correctAnswer,
        isCorrect: isCorrect,
      });
    }

    const newResult = await TestResult.create({
      user: userId,
      test: testId,
      score,
      totalMarks: test.totalQuestions,
      answers: gradedAnswers,
    });

    return NextResponse.json(
      {
        message: "Test graded successfully",
        resultId: newResult._id,
        score,
        totalMarks: test.totalQuestions,
        details: detailedFeedback, // ✅ NEW: Returning detailed feedback
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Test Submit Error:", error);
    return NextResponse.json(
      { message: "Failed to submit test" },
      { status: 500 },
    );
  }
}
