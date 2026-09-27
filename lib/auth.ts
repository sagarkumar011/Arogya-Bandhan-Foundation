import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "arogya_bandhan_default_secret_key_change_in_prod";
const TOKEN_NAME = "abf_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "USER" | "VOLUNTEER" | "ADMIN" | "SUPER_ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export async function getSessionUser(req?: NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  if (req) {
    // Check Authorization header first
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      token = req.cookies.get(TOKEN_NAME)?.value;
    }
  } else {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(TOKEN_NAME)?.value;
    } catch {
      // In non-request context
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(req: NextRequest, allowedRoles?: string[]) {
  const user = await getSessionUser(req);
  if (!user) {
    return { error: "Authentication required", status: 401, user: null };
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.includes(user.role);
    if (!isAllowed) {
      return { error: "Forbidden: Insufficient privileges", status: 403, user };
    }
  }

  return { error: null, status: 200, user };
}

export function setAuthCookieHeader(token: string): string {
  const isProd = process.env.NODE_ENV === "production";
  return `${TOKEN_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}${isProd ? "; Secure" : ""}`;
}

export function clearAuthCookieHeader(): string {
  return `${TOKEN_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
