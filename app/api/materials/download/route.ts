import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/config/s3";
import { connectDB } from "@/config/dbConnect";
import Material from "@/models/material.model";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    const id = searchParams.get("id"); // Get ID to track analytics

    if (!key)
      return NextResponse.json({ message: "Key missing" }, { status: 400 });

    // Generate URL
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    // Log Analytics (Non-blocking)
    if (id) {
      await connectDB();
      await Material.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
    }

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    return NextResponse.json({ message: "Signed URL failed" }, { status: 500 });
  }
}
