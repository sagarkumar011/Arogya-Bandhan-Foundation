// ===============================================================
// AROGYA BANDHAN FOUNDATION - STANDALONE EXPRESS BACKEND SERVER
// Fully configured for production deployment on Render / Railway
// ===============================================================

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "../lib/prisma";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Dynamic CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [
      "https://arogya-bandhan-foundation-2.onrender.com",
      "https://www.arogyabandhan.org",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not allowed"), false);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------------------------------------------------------------
// Root & Health Check Endpoints
// ---------------------------------------------------------------
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Arogya Bandhan Foundation API",
    tagline: "Healthy People | Stronger Communities",
    version: "1.0.0",
    status: "online",
    endpoints: {
      health: "/health",
      campaigns: "/api/campaigns",
      programs: "/api/programs",
      events: "/api/events",
      gallery: "/api/gallery",
      transparency: "/api/transparency",
      faqs: "/api/faqs",
    },
  });
});

app.get("/health", async (req: Request, res: Response) => {
  try {
    // Quick database connectivity ping
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "healthy",
      database: "connected",
      organization: "Arogya Bandhan Foundation",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (dbErr: any) {
    res.status(503).json({
      status: "degraded",
      database: "unreachable",
      error: dbErr.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ---------------------------------------------------------------
// Public Data API Endpoints
// ---------------------------------------------------------------

// Campaigns
app.get("/api/campaigns", async (req: Request, res: Response) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, count: campaigns.length, campaigns });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/campaigns/:slugOrId", async (req: Request, res: Response) => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const campaign = await prisma.campaign.findFirst({
      where: { OR: [{ slug: slugOrId }, { id: slugOrId }] },
      include: {
        donations: {
          where: { status: "SUCCESS" },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            donorName: true,
            amount: true,
            isAnonymous: true,
            createdAt: true,
          },
        },
      },
    });

    if (!campaign) {
      return res.status(404).json({ success: false, error: "Campaign not found" });
    }

    res.json({ success: true, campaign });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Programs
app.get("/api/programs", async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany({
      where: { status: "ACTIVE" },
      orderBy: { displayOrder: "asc" },
    });
    res.json({ success: true, count: programs.length, programs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/programs/:slugOrId", async (req: Request, res: Response) => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const program = await prisma.program.findFirst({
      where: { OR: [{ slug: slugOrId }, { id: slugOrId }] },
    });

    if (!program) {
      return res.status(404).json({ success: false, error: "Program not found" });
    }

    res.json({ success: true, program });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Events
app.get("/api/events", async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      where: { status: { in: ["UPCOMING", "ONGOING"] } },
      orderBy: { eventDate: "asc" },
    });
    res.json({ success: true, count: events.length, events });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gallery
app.get("/api/gallery", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category && category !== "ALL") {
      where.category = String(category);
    }
    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, count: items.length, items });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// FAQs
app.get("/api/faqs", async (req: Request, res: Response) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    res.json({ success: true, count: faqs.length, faqs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Transparency Documents
app.get("/api/transparency", async (req: Request, res: Response) => {
  try {
    const documents = await prisma.transparencyDocument.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, count: documents.length, documents });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Contact Enquiry Form Submission
app.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Name, email, and message are required" });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || "Website Inquiry",
        message,
        status: "UNREAD",
      },
    });

    res.status(201).json({ success: true, message: "Inquiry received successfully", id: contact.id });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------
// Error & 404 Handlers
// ---------------------------------------------------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled API Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// ---------------------------------------------------------------
// Server Listener (Render Binds to 0.0.0.0 on process.env.PORT)
// ---------------------------------------------------------------
let server: any;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Arogya Bandhan Foundation Express API running on port ${PORT}`);
    console.log(`   Health check available at http://0.0.0.0:${PORT}/health`);
  });
}

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down Express server gracefully...");
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      console.log("Prisma disconnected and server closed.");
      process.exit(0);
    });
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default app;
