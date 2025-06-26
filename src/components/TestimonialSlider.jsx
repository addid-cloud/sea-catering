"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    emblaApi.on("select", onSelect);
    onSelect();

    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    fetch("/api/testimonial")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Failed to load testimonials", err));
  }, []);

  const handleAddTestimonial = (testimonial) => {
    setTestimonials((prev) => [testimonial, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="bg-white py-8 px-4 rounded-lg shadow max-w-3xl mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        What Our Customers Say
      </h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, idx) => (
            <div
              className="min-w-full flex-shrink-0 px-6 text-center"
              key={idx}
            >
              <p className="italic mb-2 text-lg">"{t.message}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-yellow-500 text-lg">{"★".repeat(t.rating)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={scrollPrev}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          ←
        </button>
        <button
          onClick={scrollNext}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          →
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              selectedIndex === idx ? "bg-accent" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white py-2 px-4 rounded"
        >
          {showForm ? "Close Form" : "Add Testimonial"}
        </button>
      </div>

      {showForm && (
        <div className="mt-6">
          <TestimonialForm onAdd={handleAddTestimonial} />
        </div>
      )}
    </div>
  );
}
