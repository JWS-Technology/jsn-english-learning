import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyEdgeToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as {
      userId: string;
      role: "admin" | "user";
    };
  } catch {
    return null;
  }
}
