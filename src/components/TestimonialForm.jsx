"use client";
import { useState } from "react";

export default function TestimonialForm({ onAdd }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;
    onAdd({ name, message, rating });
    setName("");
    setMessage("");
    setRating(5);
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
      >
        Submit Testimonial
      </button>
    </form>
  );
}
