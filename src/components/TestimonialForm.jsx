"use client";
import { useState } from "react";

export default function TestimonialForm({ onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message, rating }),
      });

      if (res.ok) {
        const newTestimonial = await res.json();
        onAdd(newTestimonial); // masukkan ke slider
        setName("");
        setMessage("");
        setRating(5);
      } else {
        alert("Failed to submit testimonial.");
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Message</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Rating</label>
        <input
          type="number"
          min={1}
          max={5}
          className="w-full border p-2 rounded"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white font-medium py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}
