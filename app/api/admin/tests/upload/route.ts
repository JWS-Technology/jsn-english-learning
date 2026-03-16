// app/api/admin/tests/upload/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import mammoth from "mammoth";
import Test from "@/models/test.model";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const examType = formData.get("examType") as string;
    const durationInMinutes =
      parseInt(formData.get("durationInMinutes") as string) || 30;
    const isPremium = formData.get("isPremium") === "true";
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to HTML to preserve Word Tables
    const result = await mammoth.convertToHtml({ buffer });
    const htmlContent = result.value;

    // Parse the HTML tables
    let questions = parseQuizFromHtmlTable(htmlContent);

    // Fallback if no tables found
    if (questions.length === 0) {
      const rawTextResult = await mammoth.extractRawText({ buffer });
      questions = parseFallbackText(rawTextResult.value);
    }

    if (questions.length === 0) {
      console.log("Extracted HTML preview:", htmlContent.substring(0, 500));
      return NextResponse.json(
        {
          message:
            "Could not find any valid questions in the document. Ensure it matches the template.",
        },
        { status: 400 },
      );
    }

    // Save to Database
    const newTest = await Test.create({
      title,
      subject,
      examType,
      durationInMinutes,
      isPremium,
      questions,
      totalQuestions: questions.length,
    });

    return NextResponse.json(
      {
        message: "Test created successfully",
        testId: newTest._id,
        totalParsed: questions.length,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Test Upload Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to upload test" },
      { status: 500 },
    );
  }
}

// --- HELPER 1: THE TABLE PARSER (UPDATED) ---
function parseQuizFromHtmlTable(html: string) {
  const questions: any[] = [];

  // ✅ FIX 1: Removed 's' flag, changed (.*?) to ([\s\S]*?)
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(html)) !== null) {
    const tableHtml = tableMatch[1];
    const rows: string[][] = [];

    // ✅ FIX 2: Removed 's' flag, changed (.*?) to ([\s\S]*?)
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;

    // Extract all rows and cells
    while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
      const rowHtml = rowMatch[1];
      const cells: string[] = [];

      // ✅ FIX 3: Removed 's' flag, changed (.*?) to ([\s\S]*?)
      const cellRegex = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi;
      let cellMatch;

      while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
        // cellMatch[2] contains the inner content of the td/th
        let cellText = cellMatch[2].replace(/<[^>]+>/g, " ").trim();
        cellText = cellText
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .trim();

        // Clean up extra spaces caused by stripped tags
        cellText = cellText.replace(/\s+/g, " ");
        cells.push(cellText);
      }
      if (cells.length > 0) rows.push(cells);
    }

    // Find the header row (looking for "Answers" and "Grade")
    let headerRowIndex = -1;
    for (let r = 0; r < rows.length; r++) {
      const rowString = rows[r].join(" ").toLowerCase();
      if (rowString.includes("answers") && rowString.includes("grade")) {
        headerRowIndex = r;
        break;
      }
    }

    // If we found a valid structure inside this table
    if (headerRowIndex !== -1) {
      // Based on your template, the Question Text is in Row 1, Column 1
      let questionText = rows[0][0];

      const options = [];
      let correctAnswer = 0;

      // Extract the options below the header
      for (let r = headerRowIndex + 1; r < rows.length; r++) {
        const row = rows[r];

        if (row.length >= 2) {
          let answerText = "";
          let gradeText = "";

          // Handle varying column counts (Word sometimes merges empty cells)
          if (row.length >= 4) {
            answerText = row[1]; // Answers are usually in the 2nd column
            gradeText = row[row.length - 1]; // Grade is usually in the last column
          } else if (row.length === 3) {
            answerText = row[1];
            gradeText = row[2];
          } else {
            answerText = row[0];
            gradeText = row[row.length - 1];
          }

          // Clean up numbering (e.g., if Word exported "A row in a relational table" next to a list item)
          answerText = answerText.replace(/^#\s*/, "").trim();

          const grade = parseInt(gradeText, 10);

          if (answerText && !isNaN(grade)) {
            options.push(answerText);
            if (grade === 100) {
              correctAnswer = options.length - 1; // Mark index as correct
            }
          }
        }
      }

      if (questionText && options.length > 0) {
        questions.push({ questionText, options, correctAnswer });
      }
    }
  }

  return questions;
}

// --- HELPER 2: COMMA-SEPARATED PARSER (Fallback) ---
function parseFallbackText(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const questions: any[] = [];
  let currentQuestion: any = null;
  let readingAnswers = false;

  for (const line of lines) {
    if (line.includes(",MC") || (line.includes("?") && !readingAnswers)) {
      if (currentQuestion && currentQuestion.options.length > 0) {
        questions.push(currentQuestion);
      }
      let qText = line.replace(",MC", "").trim().replace(/^"|"$/g, "");
      currentQuestion = { questionText: qText, options: [], correctAnswer: 0 };
      readingAnswers = false;
    } else if (line.includes("Answers") && line.includes("Grade")) {
      readingAnswers = true;
    } else if (readingAnswers && currentQuestion) {
      const parts = line.split(",");
      if (parts.length >= 2) {
        const gradeStr = parts[parts.length - 1].trim();
        const grade = parseInt(gradeStr, 10);

        if (!isNaN(grade)) {
          let answerText =
            parts.length >= 4 ? parts[1].trim() : parts[0].trim();
          answerText = answerText.replace(/^"|"$/g, "");

          if (answerText) {
            currentQuestion.options.push(answerText);
            if (grade === 100)
              currentQuestion.correctAnswer =
                currentQuestion.options.length - 1;
          }
        }
      }
    }
  }

  if (currentQuestion && currentQuestion.options.length > 0)
    questions.push(currentQuestion);
  return questions;
}
