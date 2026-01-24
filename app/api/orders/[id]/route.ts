import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Order from "@/models/order.model";
import { verifyToken } from "@/config/auth";
import { cookies } from "next/headers";

// PATCH: Update Order Status & Tracking
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ✅ Unwrapping params
    const { status, trackingId } = await req.json();

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, trackingId },
      { new: true },
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// GET: Fetch Single Order
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ✅ Unwrapping params
    await connectDB();
    const order = await Order.findById(id).populate("material").lean();

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}
