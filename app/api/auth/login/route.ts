import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/dbConnect";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as any, // Quickest fix for the overload error
      },
    );

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
