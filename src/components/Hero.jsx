import React from "react";
import landingPageData from "@/data/landing-page-data.json";
export const Hero = () => {
  const lpData = landingPageData.umum;
  return (
    <div className="bg-[url(/images/hero.png)] h-screen w-screen bg-no-repeat bg-cover pb-44 flex flex-col justify-center items-center overflow-x-hidden">
      <h1 className="text-center pb-4 font-bold text-8xl font-pacifico text-primary-white ">
        {lpData.name}
      </h1>
      <p className="font-quicksand text-center text-primary-dark font-semibold w-1/3 text-xl">
        {lpData.intro}
      </p>
      <button className="bg-primary-dark text-primary-white w-fit p-4 mt-6 rounded font-bold cursor-pointer hover:bg-[#292d29]">
        see pricing and plans
      </button>
      <p className="text-primary-dark  font-quicksand text-center mb-7 font-medium">
        {lpData.services.join(". ")}
      </p>
    </div>
  );
};
