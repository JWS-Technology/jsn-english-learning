import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Announcement from "@/models/announcement.model";
import mongoose from "mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updated = await Announcement.findByIdAndUpdate(
      id,
      { isActive: body.isActive },
      { new: true },
    );

    if (!updated)
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 },
      );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update announcement" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete announcement" },
      { status: 500 },
    );
  }
}
