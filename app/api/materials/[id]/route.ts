import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Material from "@/models/material.model";
import { s3 } from "@/config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectDB();

    // Optimized: Atomic increment of viewCount while fetching
    const material = await Material.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true, lean: true },
    );

    if (!material)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ message: "Fetch error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const material = await Material.findById(id);
    if (!material)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    // Delete S3 object first
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: material.pdfKey,
      }),
    );

    await material.deleteOne();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
