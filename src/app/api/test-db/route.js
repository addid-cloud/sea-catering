import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany(); // Ganti sesuai model
    res.status(200).json({ success: true, count: users.length });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
