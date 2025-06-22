"use client";

import { useState } from "react";
import Image from "next/image";
import "./globals.css";
import landingPageData from "@/data/landing-page-data.json";
import { Hero } from "@/components/Hero";
import { Opening } from "@/components/Opening";
import { MapIndo } from "@/components/MapIndo";
import { CustomPlanSection } from "@/components/CustomPlanSection";
import { DetailInformationSection } from "@/components/DetailInformationSection";
import { Services } from "@/components/Services";
import Fotter from "@/components/Fotter";
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";
import TestimonialSlider from "@/components/TestimonialSlider";
import TestimonialForm from "@/components/TestimonialForm";
import initialTestimonials from "@/data/testimonials-data.json";
export default function Home() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (testimonial) => {
    setTestimonials((prev) => [...prev, testimonial]);
    setShowForm(false); // Hide form after submit
  };

  return (
    <div>
      <div className="overflow-x-hidden">
        <Hero />
      </div>
      <Navbar />
      <div className="overflow-x-hidden bg-white">
        <Opening />
        <MapIndo />
        <CustomPlanSection />
        <DetailInformationSection />
        <Services />

        <TestimonialSlider testimonials={testimonials} onAdd={handleAdd} />

        <Fotter />
        <ContactUs />
      </div>
    </div>
  );
}
