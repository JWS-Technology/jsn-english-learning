import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Order from "@/models/order.model";
import { verifyToken } from "@/config/auth"; // Adjust this path to your verifyToken file
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Verify Authentication using your custom JWT logic
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Please login" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const { materialId, name, phone, address, amount } = await req.json();

    // 2. Validate Input
    if (!materialId || !name || !phone || !address || !amount) {
      return NextResponse.json(
        { message: "All shipping and payment details are required." },
        { status: 400 },
      );
    }

    // 3. Create Order Entry linked to the decoded userId
    const order = await Order.create({
      user: decoded.userId, // Using userId from your JWT payload
      material: materialId,
      customerName: name,
      phoneNumber: phone,
      shippingAddress: address,
      amount: Number(amount),
      status: "PENDING",
    });

    return NextResponse.json(
      {
        message: "Order registered successfully.",
        orderId: order._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
