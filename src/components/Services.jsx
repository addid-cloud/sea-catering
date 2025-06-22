"use client";
import React from "react";
import Carousel from "./Carousel";

export const Services = () => {
  const OPTIONS = {
    dragFree: true,
    loop: true,
    speed: 10,
    slidesToScroll: 1,
    align: "start",
  };
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1551218372-458e7a497df5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption:
        "Your meals, your way. Pick your portions, preferences, and plan—just the way you like it.",
      color: "#B9D4AA",
      services: "meal customization",
    },
    {
      url: "https://images.unsplash.com/photo-1590930754517-64d5fffa06ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption:
        "Fresh meals delivered right to your doorstep—Jakarta to Makassar, we’ve got you covered.",
      color: "#578FCA",
      services: "delivery to major cities",
    },
    {
      url: "https://images.unsplash.com/photo-1580928953289-b1a4245ebab5?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption:
        "Know what’s on your plate. Every dish comes with full nutrition facts so you can eat smarter.",
      color: "#FFB823",
      services: "detailed nutritional information",
    },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="text-4xl font-bold mb-4 text-center font-pacifico">
        Our Services
      </h2>
      <Carousel slides={slides} options={OPTIONS} />
    </div>
  );
};
