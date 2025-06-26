"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", form);
      Cookies.set("token", res.data.token, { expires: 7 });
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      router.push("/subscription");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
          required
        />
        <Link
          href="/register"
          className="text-sm text-blue-500 mb-4 block hover:underline"
        >
          Don't have an account? Register here
        </Link>
        <button
          type="submit"
          disabled={loading} // ← tombol disable saat loading
          className={`w-full bg-accent text-white p-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
