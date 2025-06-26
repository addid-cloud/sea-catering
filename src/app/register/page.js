"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", {
        fullName: form.name,
        email: form.email,
        password: form.password,
      });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
          required
        />
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
          href="/login"
          className="text-sm text-blue-500 mb-4 block hover:underline"
        >
          Already have an account? Login here
        </Link>
        <button
          type="submit"
          disabled={loading} // ← tombol disable saat loading
          className={`w-full bg-accent text-white p-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
