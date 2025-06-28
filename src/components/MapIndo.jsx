"use client";

import Image from "next/image";
import React from "react";

const cities = [
  { name: "Jakarta", x: 0.25, y: 0.62 },
  { name: "Surabaya", x: 0.38, y: 0.66 },
  { name: "Bandung", x: 0.31, y: 0.65 },
  { name: "Medan", x: 0.1, y: 0.35 },
  { name: "Makassar", x: 0.53, y: 0.59 },
];

export const MapIndo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 overflow-x-hidden">
      <h2 className="text-center text-3xl font-bold text-[#151E15] mb-6 font-pacifico">
        Delivery to Major Cities in Indonesia
      </h2>

      <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-md bg-white">
        <Image
          src="/images/map.png"
          alt="Indonesia Map"
          fill
          className="object-contain"
        />
        {cities.map((city, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              top: `${city.y * 100}%`,
              left: `${city.x * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="mb-1 w-6 h-6 rounded-full bg-white border border-green-600 flex items-center justify-center shadow">
              <Image
                src="logo.svg"
                alt="SEA Logo"
                width={16}
                height={16}
                className="rounded-full"
              />
            </div>
            <div className="absolute inset-0 animate-ping bg-green-400 rounded-full opacity-60"></div>
            <div className="relative w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow"></div>
            <span className="mt-1 text-xs bg-white px-2 py-0.5 rounded shadow text-gray-700 whitespace-nowrap">
              {city.name}
            </span>
          </div>
        ))}
        <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hover:bg-[#292d29] cursor-pointer font-bold p-3 bg-primary-dark text-primary-white w-fit rounded md:text-base text-xs">
          check our outlet on your location
        </button>
      </div>
    </div>
  );
};
