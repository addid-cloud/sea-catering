import React from "react";
import landingPageData from "@/data/landing-page-data.json";

export const Opening = () => {
  const lpData = landingPageData.umum;

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 overflow-x-hidden ">
      {lpData.welcoming.map((text, index) => {
        if (index === 0) {
          return (
            <h1
              key={index}
              className="text-4xl font-bold mb-4 text-primary-dark"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              {text}
            </h1>
          );
        }
        if (index === 1) {
          return (
            <p
              key={index}
              className="text-lg text-gray-700 max-w-2xl"
              style={{ fontFamily: "var(--font-quicksand)" }}
            >
              {text}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};
