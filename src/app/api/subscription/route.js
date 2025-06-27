import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, phone, plan, allergies, menus, userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const planPrices = {
    "Diet Plan": 30000,
    "Protein Plan": 40000,
    "Royal Plan": 60000,
  };

  const mealCount = menus.length;
  const planPrice = planPrices[plan] || 0;
  const totalPrice = mealCount * planPrice;
  const subscription = await prisma.subscription.create({
    data: {
      name,
      phone,
      plan,
      allergies,
      userId,
      totalPrice,
      menus: {
        create: menus.map((menu) => ({
          date: menu.date,
          time: menu.time,
          main: menu.main,
          side: menu.side,
          drink: menu.drink,
        })),
      },
    },
  });

  return NextResponse.json(subscription);
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const subscriptions = await prisma.subscription.findMany({
    where: { userId },
    include: { menus: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(subscriptions);
}
export async function PATCH(req) {
  const body = await req.json();
  const { subscriptionId, action, pauseStart, pauseEnd } = body;

  if (!subscriptionId || !action) {
    return NextResponse.json(
      { error: "subscriptionId and action are required" },
      { status: 400 }
    );
  }

  let updatedData = {};
  if (action === "pause") {
    if (!pauseStart || !pauseEnd) {
      return NextResponse.json(
        { error: "pauseStart and pauseEnd required for pause" },
        { status: 400 }
      );
    }
    updatedData = {
      status: "Paused",
      pauseStart: new Date(pauseStart),
      pauseEnd: new Date(pauseEnd),
    };
  } else if (action === "cancel") {
    updatedData = {
      status: "Canceled",
    };
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const updated = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: updatedData,
  });

  return NextResponse.json(updated);
}
