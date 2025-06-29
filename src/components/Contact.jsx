"use client";
import React from "react";
import { useState } from "react";

export const Contact = () => {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    const phone = "628123456789";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-gray-100 ">
      <div className="flex items-center justify-center mx-auto">
        <img src="/logo.svg" alt="SEA Catering Logo" className="w-40 h-40" />
      </div>
      <div className="p-4 max-w-md mx-auto">
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          placeholder="Nama Anda"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          rows="4"
          placeholder="Tulis pesan untuk dikirim ke WhatsApp"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Kirim ke WhatsApp
        </button>
      </div>
    </div>
  );
};
