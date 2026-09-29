import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "healthy",
      database: "connected",
      organization: "Arogya Bandhan Foundation",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "degraded",
        database: "unreachable",
        error: process.env.NODE_ENV === "production" ? "Database connection error" : error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
