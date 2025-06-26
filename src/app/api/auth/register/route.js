import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { fullName, email, password } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { fullName, email, password: hashed },
  });

  return NextResponse.json({
    message: "User registered",
    user: { id: user.id, fullName, email },
  });
}
