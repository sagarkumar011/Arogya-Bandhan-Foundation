import { NextResponse } from "next/server";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "unconfigured";

  if (isDatabaseConfigured()) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch {
      dbStatus = "disconnected";
    }
  }

  // Always return HTTP 200 so platform health checkers (Render, Vercel) never timeout
  return NextResponse.json({
    status: "healthy",
    server: "online",
    database: dbStatus,
    organization: "Arogya Bandhan Foundation",
    timestamp: new Date().toISOString(),
  });
}
