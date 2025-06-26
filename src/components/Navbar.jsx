"use client";
import React, { useState } from "react";
import { DotsThreeCircleIcon, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-accent">
          <img src="/logo.svg" alt="SEA Catering Logo" className="w-8 h-8" />
        </div>

        {/* Desktop Menu */}
        <div className="space-x-6 hidden md:flex font-bold">
          <Link href="/" className="text-gray-700 hover:text-accent transition">
            Home
          </Link>
          <Link
            href="/menu"
            className="text-gray-700 hover:text-accent transition"
          >
            Menu
          </Link>
          <Link
            href="/subscription"
            className="text-gray-700 hover:text-accent transition"
          >
            Subcription
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-accent transition"
          >
            Kontak
          </Link>
          <LogoutButton />
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <DotsThreeCircleIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="#opening"
            className="block text-gray-700 hover:text-accent transition"
          >
            Tentang
          </a>
          <a
            href="#map"
            className="block text-gray-700 hover:text-accent transition"
          >
            Lokasi
          </a>
          <a
            href="#services"
            className="block text-gray-700 hover:text-accent transition"
          >
            Layanan
          </a>
          <a
            href="#contact"
            className="block text-gray-700 hover:text-accent transition"
          >
            Kontak
          </a>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
