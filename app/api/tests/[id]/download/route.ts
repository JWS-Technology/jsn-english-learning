import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import Test from "@/models/test.model"; // Adjust to your actual model path
import { connectDB } from "@/config/dbConnect";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const testId = params.id;

    // Check if the user wants answers via query params (?withAnswers=true)
    const { searchParams } = new URL(req.url);
    const withAnswers = searchParams.get("withAnswers") === "true";

    // 1. Fetch the test from DB
    const fullTest = await Test.findById(testId);
    if (!fullTest || !fullTest.questions || fullTest.questions.length === 0) {
      return NextResponse.json(
        { message: "No questions found" },
        { status: 404 },
      );
    }

    // 2. Initialize jsPDF
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 40;

    // --- YOUR EXACT DRAWING LOGIC STARTS HERE ---
    const drawPageBackground = (isFirstPage: boolean) => {
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

      // Watermark
      doc.saveGraphicsState();
      (doc as any).setGState(new (doc as any).GState({ opacity: 0.12 }));
      doc.setTextColor(15, 23, 42);
      doc.setFont("times", "bold");
      doc.setFontSize(42);
      doc.text("JSN ENGLISH LEARNING", pageWidth / 2, pageHeight / 2 - 8, {
        angle: 45,
        align: "center",
      });
      doc.setFontSize(35);
      doc.text("+91 98432 87913", pageWidth / 2, pageHeight / 2 + 12, {
        angle: 45,
        align: "center",
      });
      doc.restoreGraphicsState();

      // Footer
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.setFont("times", "bold");
      doc.text("Dr. S. Jerald Sagaya Nathan - 9843287913", 15, pageHeight - 15);
      doc.text(
        `Page ${(doc as any).internal.getNumberOfPages()}`,
        pageWidth - 15,
        pageHeight - 15,
        { align: "right" },
      );

      // Header
      if (isFirstPage) {
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(14);
        doc.setFont("times", "bold");
        doc.text(
          `${fullTest.examType.toUpperCase()} ENGLISH`,
          pageWidth / 2,
          22,
          { align: "center" },
        );

        const documentType = withAnswers ? "Answer Key" : "Question Paper";
        doc.setFontSize(11);
        doc.setFont("times", "normal");
        doc.text(
          `${fullTest.subject} - ${fullTest.title} (${documentType})`,
          pageWidth / 2,
          28,
          { align: "center" },
        );

        doc.setDrawColor(200, 200, 200);
        doc.line(15, 32, pageWidth - 15, 32);
      }
    };

    drawPageBackground(true);

    fullTest.questions.forEach((q: any, index: number) => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        drawPageBackground(false);
        yPos = 25;
      }

      doc.setFont("times", "bold");
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10.5);
      const qText = `${index + 1}. ${q.questionText}`;
      const qLines = doc.splitTextToSize(qText, pageWidth - 30);
      doc.text(qLines, 15, yPos);
      yPos += qLines.length * 6 + 2;

      q.options.forEach((opt: string, optIndex: number) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          drawPageBackground(false);
          yPos = 25;
        }

        const isCorrect = q.correctAnswer === optIndex;
        const letter = String.fromCharCode(65 + optIndex);

        if (isCorrect && withAnswers) {
          doc.setFont("times", "bold");
          doc.setTextColor(22, 163, 74); // Green
        } else {
          doc.setFont("times", "normal");
          doc.setTextColor(71, 85, 105); // Slate
        }

        doc.setFontSize(10);
        const baseOptText = opt.startsWith(`${letter})`)
          ? opt
          : `${letter}) ${opt}`;
        const optText =
          isCorrect && withAnswers ? `${baseOptText}` : baseOptText;
        const optLines = doc.splitTextToSize(optText, pageWidth - 35);
        doc.text(optLines, 20, yPos);

        yPos += optLines.length * 5 + 2;
      });
      yPos += 6;
    });
    // --- YOUR EXACT DRAWING LOGIC ENDS HERE ---

    // 3. Output as a Buffer (ArrayBuffer -> Node Buffer)
    const arrayBuffer = doc.output("arraybuffer");
    const buffer = Buffer.from(arrayBuffer);

    // 4. Send the PDF file to the client
    const fileNameSuffix = withAnswers ? "Answer_Key" : "Question_Paper";
    const fileName = `${fullTest.title.replace(/\s+/g, "_")}_${fileNameSuffix}.pdf`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // 'attachment' forces download on web, 'inline' opens in browser.
        // For APIs serving apps, attachment is usually best.
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { message: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
