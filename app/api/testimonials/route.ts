import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect"; // Ensure this path matches your DB config
import Testimonial from "@/models/testimonial.model";

// --- GET: Fetch Testimonials for the Homepage Slider ---
export async function GET(req: Request) {
  try {
    await connectDB();

    // Fetch only active testimonials, sorted by newest first
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Testimonial GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}

// --- POST: Add a new Testimonial (Admin Portal) ---
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, role, content, rating } = body;

    // Basic Validation
    if (!name || !content) {
      return NextResponse.json(
        { message: "Name and Content are required fields." },
        { status: 400 },
      );
    }

    const newTestimonial = await Testimonial.create({
      name,
      role: role || "JSN Aspirant",
      content,
      rating: rating || 5, // Default to 5 stars if not provided
      isActive: true,
    });

    return NextResponse.json(
      { message: "Testimonial added successfully", data: newTestimonial },
      { status: 201 },
    );
  } catch (error) {
    console.error("Testimonial POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}

// Add this to app/api/testimonials/route.ts
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID required" }, { status: 400 });

    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
