import React, { useEffect, useState, useRef } from "react";
import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function HomeSlider({ className, slide, totalCount }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = slide;
  const slideCount = data.length;
  const intervalRef = useRef(null);
  const lang = localStorage.getItem("lang") || "en";
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "ArrowRight") changeSlide(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [currentSlide]);

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const changeSlide = (direction) => {
    const newIndex = currentSlide + direction;
    if (newIndex >= 0 && newIndex < slideCount) {
      showSlide(newIndex);
    }
  };

  console.log(+slide.number);
  return (
    <div
      className={`bg-[#c3b6f347] backdrop-blur-sm rounded-lg p-6 ${className}`}
    >
      <div className="h-fit inset-0 transition-all duration-700 ease-in-out flex items-center justify-center opacity-100 translate-x-0 z-10">
        <div className="relative max-w-5xl mx-auto px-6 text-black z-10">
          <div className="text-4xl font-bold mb-2 text-white">
            {slide.number || String(idx + 1).padStart(2, "0")}
            <span className="text-xl">
              /{totalCount.toString().padStart(2, "0")}
            </span>
          </div>
          <div
            className={`${
              lang === "en" ? "border-l pl-5" : "border-r pr-5"
            }  max-w-xl animate-fade-in-up text-white`}
          >
            <h1 className="text-2xl font-extrabold mb-6 leading-tight">
              {slide.title}
            </h1>
            <p
              className="text-md mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: slide.description }}
            />
            {slide.buttonText && (
              <button className="relative px-5 py-3  font-semibold text-white rounded-full bg-neutral-950 transition-all duration-300">
                {slide.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute ${
          lang === "en" ? "bottom-5 right-6" : "bottom-5 left-6"
        } flex gap-4 z-10 translate-y-0 translate-x-0 `}
      >
        {lang === "ar" ? (
          <>
            <CarouselNext
              disabled={+slide.number === totalCount}
              className="!translate-y-0 !translate-x-0 !top-0 !left-0 !right-0 !bottom-0 !relative"
            />
            <CarouselPrevious
              disabled={+slide.number === 1}
              className="!translate-y-0 !translate-x-0 !top-0 !left-0 !right-0 !bottom-0 !relative"
            />
          </>
        ) : (
          <>
            <CarouselPrevious
              disabled={+slide.number === 1}
              className="!translate-y-0 !translate-x-0 !top-0 !left-0 !right-0 !bottom-0 !relative"
            />
            <CarouselNext
              disabled={+slide.number === totalCount}
              className="!translate-y-0 !translate-x-0 !top-0 !left-0 !right-0 !bottom-0 !relative"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default HomeSlider;
