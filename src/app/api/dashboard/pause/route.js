import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { id, start, end } = await req.json();

    if (!id || !start || !end) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updated = await prisma.subscription.update({
      where: { id: parseInt(id) },
      data: {
        status: "paused",
        pauseStart: new Date(start),
        pauseEnd: new Date(end),
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
