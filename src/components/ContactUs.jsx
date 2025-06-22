"use client";
import { WhatsappLogoIcon, X } from "@phosphor-icons/react";
import React, { useState } from "react";

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);

  const name = "Brian";
  const phone = "08123456789";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phone}}`, "_blank");
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          <WhatsappLogoIcon size={28} />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          <div className="absolute bottom-20 right-4 animate-slide-in w-[90%] max-w-sm bg-white rounded-2xl p-6 shadow-xl z-50">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Kontak Kami
            </h2>
            <div className="text-gray-800 space-y-2">
              <p>
                <strong>Nama:</strong> {name}
              </p>
              <p>
                <strong>Nomor HP:</strong> {phone}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Hubungi via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
