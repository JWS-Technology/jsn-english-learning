import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token"); // Remove the JWT cookie

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
