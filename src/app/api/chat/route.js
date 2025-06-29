// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  const { message } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY; // set di .env.local
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: message }],
        role: "user",
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada jawaban.";

  return NextResponse.json({ reply: text });
}
