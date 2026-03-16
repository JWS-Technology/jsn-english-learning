import mongoose, { Schema, models } from "mongoose";

const TestResultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    test: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, required: true },
        selectedOption: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default models.TestResult ||
  mongoose.model("TestResult", TestResultSchema);
