import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/config/dbConnect";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // 🔒 forced
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 },
    );
  }
}
