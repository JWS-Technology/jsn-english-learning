import jwt from "jsonwebtoken";

export type AuthPayload = {
  userId: string;
  role: "user" | "admin";
};

export function verifyToken(token: string): AuthPayload | null {
  try {
    console.log(
      "Happening",
      jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload,
    );
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
  } catch (e) {
    console.error("JWT verify failed:", e);
    return null;
  }
}
