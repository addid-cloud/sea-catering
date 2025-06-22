"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react"; // ✅
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

const Carousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            // ...existing code...
            <div
              className="embla__slide relative flex justify-center group px-2"
              key={index}
            >
              <div className="relative w-full h-full max-w-md sm:max-w-lg md:max-w-xl">
                <img
                  src={src.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded shadow"
                />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none rounded" />
                <div className="absolute left-4 right-4 bottom-2 group-hover:bottom-6 transition-all ease-in-out">
                  <div
                    className="p-2 bg-opacity-30 rounded"
                    style={{ backgroundColor: src.color }}
                  >
                    <h1 className="text-base sm:text-lg md:text-xl font-bold text-white">
                      {src.services}
                    </h1>
                  </div>
                  <h4 className="mt-2 text-white px-3 backdrop-blur-sm text-xs sm:text-sm md:text-base leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
                    {src.caption}
                  </h4>
                </div>
              </div>
            </div>

            // ...existing code...
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__progress w-full h-2 bg-gray-300 mt-4 rounded overflow-hidden">
          <div
            className="h-full rounded transition-all duration-300"
            style={{
              width: `${scrollProgress}%`,
              background: `linear-gradient(to right, black, black)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
