// app/api/admin/tests/upload/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import * as XLSX from "xlsx";
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

    // Parse the workbook (handles .xlsx, .xls and .csv)
    const workbook = XLSX.read(buffer, {
      type: "buffer",
      cellDates: false,
    });
    const questions = parseWorkbookToQuestions(workbook);

    if (questions.length === 0) {
      return NextResponse.json(
        {
          message:
            "Could not find any valid questions in the file. Ensure it has Question, Option A-D and Correct Answer columns.",
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

// --- HELPER: EXCEL / CSV PARSER ---
// Expected columns: Question, Option A, Option B, Option C, Option D, Correct Answer
// (also accepts a single "Options"/"Choices" column split by "|" or ";").
// "Correct Answer" can be the option text, a letter (A/B/C/D) or a 1-based index.
function parseWorkbookToQuestions(workbook: XLSX.WorkBook): any[] {
  const questions: any[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: false,
      defval: "",
    });

    const headerIndex = rows.findIndex((row) => {
      const header = row.map((c) => c.toString().trim().toLowerCase());
      return (
        header.some((c) => c.includes("question")) &&
        header.some((c) => c.includes("answer"))
      );
    });

    if (headerIndex === -1) continue;

    const header = rows[headerIndex].map((c) => c.toString().trim());
    const qCol = header.findIndex((h) => h.toLowerCase().includes("question"));
    const aCol = header.findIndex((h) => h.toLowerCase().includes("answer"));

    // Collect option columns (e.g. "Option A", "Option B", ...)
    const optCols: number[] = [];
    const optionsCol = header.findIndex((h) => {
      const lower = h.toLowerCase();
      return lower === "options" || lower === "choices";
    });
    header.forEach((h, i) => {
      const lower = h.toLowerCase();
      if (/^option\s+[a-d]$/.test(lower) || /^opt[a-d]$/.test(lower)) {
        optCols.push(i);
      }
    });

    for (let r = headerIndex + 1; r < rows.length; r++) {
      const row = rows[r];
      const getCell = (i: number) => (row[i] ? row[i].toString().trim() : "");

      const questionText = qCol >= 0 ? getCell(qCol) : "";
      if (!questionText) continue;

      let options: string[] = [];

      if (optCols.length > 0) {
        // Option columns mode
        for (const i of optCols) {
          const opt = getCell(i);
          if (opt) options.push(opt);
        }
      } else if (optionsCol !== -1) {
        // Single "Options" column mode, split by | or ;
        const raw = getCell(optionsCol);
        options = raw
          .split(/[|;]/)
          .map((o) => o.trim())
          .filter((o) => o.length > 0);
      }

      if (options.length === 0) continue;

      const answerRaw = aCol >= 0 ? getCell(aCol) : "";
      const correctAnswer = findAnswerIndex(answerRaw, options);

      questions.push({ questionText, options, correctAnswer });
    }
  }

  return questions;
}

function findAnswerIndex(answerRaw: string, options: string[]): number {
  const answer = answerRaw.trim();

  if (!answer) return 0;

  // 1) Exact match against one of the options (ignoring case)
  const exactIndex = options.findIndex(
    (opt) => opt.toLowerCase() === answer.toLowerCase(),
  );
  if (exactIndex !== -1) return exactIndex;

  // 2) Letter form: "A", "a", "A)", "A."
  const letterMatch = answer.match(/^([a-dA-D])[).:]?\s*$/);
  if (letterMatch) {
    const letterIndex = letterMatch[1].toUpperCase().charCodeAt(0) - 65;
    if (letterIndex >= 0 && letterIndex < options.length) return letterIndex;
  }

  // 3) Letter-prefixed text form: "B) Samuel Taylor Coleridge", "B. text", "B - text"
  const prefixMatch = answer.match(/^([a-dA-D])[).:\-]?\s+(.+)$/);
  if (prefixMatch) {
    const letterIndex = prefixMatch[1].toUpperCase().charCodeAt(0) - 65;
    const remainder = prefixMatch[2].trim().toLowerCase();
    if (letterIndex >= 0 && letterIndex < options.length) {
      const opt = options[letterIndex].toLowerCase();
      if (opt === remainder || opt.startsWith(remainder) || remainder.startsWith(opt)) {
        return letterIndex;
      }
    }
  }

  // 4) Partial text match against one of the options
  const startsWithIndex = options.findIndex((opt) =>
    opt.toLowerCase().startsWith(answer.toLowerCase()),
  );
  if (startsWithIndex !== -1) return startsWithIndex;

  // 5) 1-based index form: "1", "2", "3", "4"
  const numMatch = answer.match(/^\s*(\d+)\s*$/);
  if (numMatch) {
    const idx = parseInt(numMatch[1], 10) - 1;
    if (idx >= 0 && idx < options.length) return idx;
  }

  return 0;
}
