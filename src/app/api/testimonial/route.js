import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  const { name, message, rating } = data;

  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      message,
      rating,
    },
  });

  return NextResponse.json(testimonial);
}

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonials);
}
