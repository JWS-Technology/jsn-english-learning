import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Gallery from "@/models/gallery.model";
import { s3 } from "@/config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const mediaType = formData.get("mediaType") as string;

    if (!file || !title || !mediaType) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // 1. Process File for S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileKey = `gallery/${crypto.randomUUID()}.${fileExtension}`;

    // 2. Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    const mediaUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${fileKey}`;
    // 3. Save to MongoDB
    await connectDB();
    const newItem = await Gallery.create({
      title,
      mediaUrl,
      mediaType,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

// GET Route for the Homepage
export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}
