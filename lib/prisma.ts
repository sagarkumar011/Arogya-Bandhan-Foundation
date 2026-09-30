import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function isPostgresDatabaseUrl(url?: string): boolean {
  if (!url) return false;
  const clean = url.trim();
  return clean.startsWith("postgresql://") || clean.startsWith("postgres://");
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  const clean = url.trim();
  if (clean.includes("placeholder")) return false;
  return isPostgresDatabaseUrl(clean);
}

export function getDatabaseUrl(): string {
  const envUrl = process.env.DATABASE_URL;
  if (isPostgresDatabaseUrl(envUrl)) {
    return envUrl!.trim();
  }
  // Safe fallback placeholder so PrismaClient validation never crashes on initialization
  return "postgresql://placeholder:placeholder@127.0.0.1:5432/arogya_bandhan?schema=public";
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
