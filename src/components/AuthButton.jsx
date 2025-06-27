"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(!!parsedUser?.id);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return isLoggedIn ? (
    <Link
      href="/dashboard"
      className="bg-accent text-white px-4 py-2 rounded  transition"
    >
      Dashboard
    </Link>
  ) : (
    <Link
      href="/login"
      className="bg-accent text-white px-4 py-2 rounded  transition"
    >
      Login / Register
    </Link>
  );
}
