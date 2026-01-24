import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Order from "@/models/order.model";
import { verifyToken } from "@/config/auth"; // Your custom JWT helper
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const materialId = searchParams.get("materialId");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ isOrdered: false });

    const decoded = verifyToken(token);

    // Add this guard clause:
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { isOrdered: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    const order = await Order.findOne({
      user: decoded.userId, // TypeScript is now happy because decoded is guaranteed to exist
      material: materialId,
    }).lean();
    return NextResponse.json({ isOrdered: !!order, order });
  } catch (error) {
    return NextResponse.json({ isOrdered: false }, { status: 500 });
  }
}
