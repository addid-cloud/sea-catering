import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const { name, phone, plan, allergies, menus } = data;

  const subscription = await prisma.subscription.create({
    data: {
      name,
      phone,
      plan,
      allergies,
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
