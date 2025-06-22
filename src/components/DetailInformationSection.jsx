"use client";

import Image from "next/image";
import React from "react";
import landingPageData from "@/data/landing-page-data.json";

export const DetailInformationSection = () => {
  const { nutritionInfo } = landingPageData;

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/images/nutrition2.jpg"
            alt="Nutrition Information"
            fill
            className="rounded-xl object-cover shadow-md"
          />
          <h1 className="absolute bg-accent text-primary-white p-2 left-10 bottom-10 shadow-sm  shadow-black ">
            balance your nutrition
          </h1>
        </div>

        {/* Right Text */}
        <div>
          <h2 className="text-4xl font-bold text-[#151E15] mb-4 font-pacifico">
            {nutritionInfo.title}
          </h2>
          <p className="text-gray-700 text-lg">{nutritionInfo.description}</p>
        </div>
      </div>
    </section>
  );
};
