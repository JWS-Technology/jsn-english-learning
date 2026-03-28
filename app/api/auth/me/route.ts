import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/dbConnect";
import User from "@/models/user.model";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // 1. Check for token presence
    if (!token) {
      return NextResponse.json(
        { message: "Session expired or not found" },
        { status: 401 },
      );
    }

    // 2. Verify JWT Integrity
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();

    // 3. Fetch Fresh Data from MongoDB
    // ✅ CHANGED: Replaced "isPaidUser" with "access" in the select statement
    const user = await User.findById(decoded.userId)
      .select("name email role access")
      .lean();

    if (!user) {
      return NextResponse.json(
        { message: "User no longer exists" },
        { status: 404 },
      );
    }

    // 4. Return the actual DB data
    // ✅ CHANGED: Pass the access object to the frontend with a safe fallback
    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        access: user.access || { tests: false, materials: false },
      },
    });
  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 },
    );
  }
}
