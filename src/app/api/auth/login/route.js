import { PrismaClient } from "@prisma/client";
import { comparePassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const res = NextResponse.json({
    message: "Login success",
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
