import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get("userId");

    if (!userIdParam) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userId = parseInt(userIdParam);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      include: {
        menus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error(" Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { subscriptionId, pauseStart, pauseEnd } = await req.json();

    if (!subscriptionId || !pauseStart || !pauseEnd) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: "paused",
        pauseStart: new Date(pauseStart),
        pauseEnd: new Date(pauseEnd),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Pause API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
