import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d"; // 7d, 30d, 3m, 6m, 1y

    // Calculate cutoff date
    const now = new Date();
    let cutoff = new Date();
    if (range === "7d") cutoff.setDate(now.getDate() - 7);
    else if (range === "30d") cutoff.setDate(now.getDate() - 30);
    else if (range === "3m") cutoff.setMonth(now.getMonth() - 3);
    else if (range === "6m") cutoff.setMonth(now.getMonth() - 6);
    else if (range === "1y") cutoff.setFullYear(now.getFullYear() - 1);

    // 1. KPI Aggregations from real database records
    const totalDonationsSum = await prisma.donation.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
      _count: { id: true },
    });

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthDonationsSum = await prisma.donation.aggregate({
      where: {
        status: "SUCCESS",
        createdAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
      _count: { id: true },
    });

    const activeCampaignsCount = await prisma.campaign.count({
      where: { status: "ACTIVE" },
    });

    const totalUsersCount = await prisma.user.count();

    const totalVolunteersCount = await prisma.volunteerApplication.count({
      where: { status: "APPROVED" },
    });

    const pendingApplicationsCount = await prisma.volunteerApplication.count({
      where: { status: "PENDING" },
    });

    const upcomingEventsCount = await prisma.event.count({
      where: { status: "OPEN" },
    });

    const totalRegistrationsCount = await prisma.eventRegistration.count();

    // 2. Donation Trend Series
    const recentDonations = await prisma.donation.findMany({
      where: {
        status: "SUCCESS",
        createdAt: { gte: cutoff },
      },
      orderBy: { createdAt: "asc" },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Group donations by date
    const trendMap: Record<string, number> = {};
    recentDonations.forEach((d) => {
      const dateKey = d.createdAt.toISOString().split("T")[0];
      trendMap[dateKey] = (trendMap[dateKey] || 0) + d.amount;
    });

    const donationTrends = Object.entries(trendMap).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      amount,
    }));

    // 3. Campaign Performance
    const campaignStats = await prisma.campaign.findMany({
      take: 5,
      orderBy: { raisedAmount: "desc" },
      select: {
        id: true,
        title: true,
        goalAmount: true,
        raisedAmount: true,
        donorsCount: true,
      },
    });

    return NextResponse.json({
      success: true,
      summary: {
        totalDonations: totalDonationsSum._sum.amount || 0,
        donationCount: totalDonationsSum._count.id || 0,
        monthDonations: monthDonationsSum._sum.amount || 0,
        monthDonationCount: monthDonationsSum._count.id || 0,
        activeCampaigns: activeCampaignsCount,
        totalUsers: totalUsersCount,
        totalVolunteers: totalVolunteersCount,
        pendingApplications: pendingApplicationsCount,
        upcomingEvents: upcomingEventsCount,
        totalRegistrations: totalRegistrationsCount,
      },
      donationTrends,
      campaignStats,
    });
  } catch (err) {
    console.error("Analytics API error:", err);
    return NextResponse.json({ error: "Failed to generate analytics" }, { status: 500 });
  }
}
