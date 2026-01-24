import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import Material from "@/models/material.model";
import Order from "@/models/order.model";
import { verifyToken } from "@/config/auth";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    // 1. Auth Guard: Ensure only admins can see stats
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const decoded = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Aggregate Data
    const [
      totalMaterials,
      totalOrders,
      pendingOrders,
      revenueData,
      recentOrders,
    ] = await Promise.all([
      Material.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.countDocuments({ status: "PENDING" }),
      // Calculate revenue only from orders that aren't CANCELLED or PENDING (assuming verified)
      Order.aggregate([
        { $match: { status: { $ne: "CANCELLED" } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      // Fetch the 5 most recent orders for the table
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("material", "title subject") // Join with Material data
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalMaterials,
        totalOrders,
        pendingOrders,
        totalRevenue: revenueData[0]?.total || 0,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
