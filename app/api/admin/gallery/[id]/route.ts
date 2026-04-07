import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Gallery from "@/models/gallery.model";
import { s3 } from "@/config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const item = await Gallery.findById(id);
    if (!item)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    // 1. Delete from S3
    const fileKey = item.mediaUrl.split(".com/").pop();
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: fileKey,
      }),
    );

    // 2. Delete from DB
    await item.deleteOne();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
