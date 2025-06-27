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
