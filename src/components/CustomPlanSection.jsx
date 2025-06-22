"use client";

import Image from "next/image";
import React from "react";
import landingPageData from "@/data/landing-page-data.json";

export const CustomPlanSection = () => {
  const customPlan = landingPageData.customPlan;

  return (
    <section className="bg-white py-16 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold text-[#151E15] mb-4 leading-snug font-pacifico">
            {customPlan.title}
          </h2>
          <p className="text-gray-700 text-lg mb-6">{customPlan.description}</p>
          <ul className="text-gray-800 space-y-3">
            {customPlan.features.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full aspect-[4/3]">
          <Image
            src="/images/choosefood.jpg"
            alt="Customizable Meal Plan"
            fill
            className="rounded-xl object-cover shadow-lg"
          />
          <h1 className="absolute bg-accent text-primary-white p-2 left-10 top-10 shadow-sm  shadow-black ">
            Customize sesukamu
          </h1>
          <h1 className="absolute bg-accent text-primary-white p-2 right-10 bottom-10 shadow-sm shadow-black ">
            tanpa ribet
          </h1>
        </div>
      </div>
    </section>
  );
};
