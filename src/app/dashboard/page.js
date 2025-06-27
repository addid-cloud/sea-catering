"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const user = JSON.parse(storedUser);
        if (user?.role) {
          setRole(user.role);
        }
      }
    } catch (err) {
      console.error("Gagal membaca user dari localStorage:", err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {role === "ADMIN" ? (
        <AdminDashboard />
      ) : role === "USER" ? (
        <UserDashboard />
      ) : (
        <p className="text-center mt-10">Loading or unauthorized...</p>
      )}
    </div>
  );
}
