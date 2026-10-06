import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import prisma from "./prisma";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn("⚠️ WARNING: JWT_SECRET is not set in environment variables! Using fallback secret.");
    }
    return "arogya_bandhan_jwt_fallback_key_2026_xyz";
  }
  return secret;
}

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
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export const DEMO_ADMIN = {
  id: "demo-admin-id",
  userId: "demo-admin-id",
  email: "admin@arogyabandhan.org",
  name: "Super Administrator (Demo)",
  role: "SUPER_ADMIN" as const,
  phone: "+91 75449 90585",
  city: "New Delhi",
  address: "Institutional Area, Sector 18, New Delhi",
};

export const DEMO_USER = {
  id: "demo-user-id",
  userId: "demo-user-id",
  email: "user@arogyabandhan.org",
  name: "Standard Member (Demo)",
  role: "USER" as const,
  phone: "+91 98765 11111",
  city: "New Delhi",
  address: "Rohini, Sector 14, New Delhi",
};

export function isDemoLoginEnabled(): boolean {
  return process.env.ENABLE_DEMO_LOGIN !== "false";
}

export function checkDemoCredentials(email: string, password: string): typeof DEMO_ADMIN | typeof DEMO_USER | null {
  if (!isDemoLoginEnabled()) return null;

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === "admin@arogyabandhan.org" && password === "Admin@12345") {
    return DEMO_ADMIN;
  }
  if (normalizedEmail === "user@arogyabandhan.org" && password === "User@12345") {
    return DEMO_USER;
  }
  return null;
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
  const sameSite = isProd ? "None" : "Lax";
  const secure = isProd ? "; Secure" : "";
  return `${TOKEN_NAME}=${token}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${7 * 24 * 60 * 60}${secure}`;
}

export function clearAuthCookieHeader(): string {
  const isProd = process.env.NODE_ENV === "production";
  const sameSite = isProd ? "None" : "Lax";
  const secure = isProd ? "; Secure" : "";
  return `${TOKEN_NAME}=; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=0${secure}`;
}
