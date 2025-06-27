import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
      return NextResponse.json(
        { error: "Missing date range" },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    // New Subscriptions
    const newSubs = await prisma.subscription.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // MRR (active subscriptions)
    const mrr = await prisma.subscription.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: "active",
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Reactivations (cancelled then restarted)
    const reactivated = await prisma.subscription.count({
      where: {
        status: "active",
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
        pauseStart: {
          not: null,
        },
        pauseEnd: {
          not: null,
        },
      },
    });

    // Total Active Subscriptions
    const totalActive = await prisma.subscription.count({
      where: {
        status: "active",
      },
    });

    return NextResponse.json({
      newSubscriptions: newSubs,
      mrr: mrr._sum.totalPrice || 0,
      reactivations: reactivated,
      totalActive,
    });
  } catch (err) {
    console.error("Admin Dashboard API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
