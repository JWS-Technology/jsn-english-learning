// models/Test.js
import mongoose, { Schema, models } from "mongoose";

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of strings for choices
  correctAnswer: { type: Number, required: true }, // Index of the correct option (0, 1, 2, or 3)
  explanation: { type: String }, // Optional: Why this answer is correct
});

const TestSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    examType: {
      type: String,
      enum: ["TRB", "NET", "SET"],
      required: true,
    },
    subject: { type: String, required: true },
    durationInMinutes: { type: Number, default: 30 },
    totalQuestions: { type: Number, default: 0 },
    questions: [QuestionSchema], // Embedded sub-documents
    isActive: { type: Boolean, default: true },
    isPremium: { type: Boolean, default: true }, // To gate behind isPaidUser status
  },
  { timestamps: true },
);

// Middleware to automatically update the totalQuestions count
TestSchema.pre("save", function () {
  // Check if questions exist to prevent other potential errors
  if (this.questions) {
    this.totalQuestions = this.questions.length;
  }
});

export default models.Test || mongoose.model("Test", TestSchema);
