import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Material from "@/models/material.model";
import { s3 } from "@/config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export async function GET() {
  try {
    await connectDB();
    // ✅ ADDED: price and viewCount to the selection for the frontend grid
    const materials = await Material.find({ isActive: true })
      .select(
        "title subject examType fileSize downloadCount viewCount price createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json({ message: "Sync failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const examType = formData.get("examType") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string; // ✅ NEW: Extract price
    const file = formData.get("file") as File;
    const totalPages = formData.get("totalPages") as string;
    // ✅ UPDATED: Validation to include price
    if (!title || !subject || !examType || !file || !price) {
      return NextResponse.json(
        { message: "Required fields (including price) missing" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileSize = formatBytes(file.size);
    const fileKey = `materials/${crypto.randomUUID()}.pdf`;

    // 1. Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileKey,
        Body: buffer,
        ContentType: "application/pdf",
      }),
    );

    await connectDB();

    // 2. Save to DB with price
    const material = await Material.create({
      title,
      subject,
      examType,
      description,
      pdfKey: fileKey,
      fileSize,
      price: Number(price),
      totalPages: Number(totalPages),
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
