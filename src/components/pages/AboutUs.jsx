import { useEffect, useState } from "react";
import States from "../Organisms/States";
import Strategy from "../Organisms/Strategy";

import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";

const slidesData = [
  {
    number: "01",
    title: "Business Development",
    description:
      "Helping your company grow — not just by increasing revenue, but by making better strategic decisions, entering new markets, improving operations, and identifying new opportunities for long-term success.",
    buttonText: "Request A Service",
    bgClass: "slide-1",
  },
  {
    number: "02",
    title: "Strategic Consulting",
    description:
      "Transform your business with data-driven insights and proven methodologies. Our strategic consulting services help you navigate complex challenges, optimize performance, and accelerate growth through innovative solutions.",
    buttonText: "Get Started",
    bgClass: "slide-2",
  },
  {
    number: "03",
    title: "Digital Innovation",
    description:
      "Lead the digital transformation of your industry with cutting-edge technology solutions. We help you leverage AI, automation, and emerging technologies to create competitive advantages and drive sustainable growth.",
    buttonText: "Explore Solutions",
    bgClass: "slide-3",
  },
];

function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slidesData.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "ArrowRight") changeSlide(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
  return (
    <div className="mt-[20px] space-y-[50px] px-2 sm:px-4 md:px-8">
      <Strategy />
      <States />
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[50px]">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] text-neutral-950 font-main relative before:absolute before:bg-brand-600 before:w-7 before:right-[calc(100%+15px)] before:top-1/2 before:translate-y-[-50%] before:h-[2px] ml-4 sm:ml-10">
            Who We Are
          </h1>
          <h3 className="text-neutral-700 font-main text-sm sm:text-base my-[20px]">
            Driving Success Across Every Sector
          </h3>
          <h3 className="text-neutral-700 font-main text-sm sm:text-base">
            We partner with startups, SMEs, and investors to simplify
            operations, streamline growth, and unlock real value through
            integrated services and consulting.
          </h3>
        </div>
        <div className="bg-neutral-1000 py-5 rounded-2xl mt-6 lg:mt-0 w-full max-w-xl">
          <div className="border-l-[4px] border-brand-200 text-white px-4 sm:px-6 h-full flex flex-col justify-between gap-2">
            To deliver trusted, results-driven services in management,
            marketing, and investment — empowering our clients to grow with
            confidence.
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-brand-200 text-base sm:text-lg">
                Our Mission
              </h1>
              <div className="bottom-6 right-6 flex gap-2 sm:gap-4 z-10">
                <button
                  onClick={() => changeSlide(-1)}
                  disabled={currentSlide === 0}
                  className="bg-brand-200 w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center text-xl transition-transform hover:scale-110 disabled:opacity-50"
                >
                  <img
                    src={leftArrow}
                    alt="left arrow"
                    className="text-brand-200"
                  />
                </button>
                <button
                  onClick={() => changeSlide(1)}
                  disabled={currentSlide === slideCount - 1}
                  className="bg-brand-200 w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center text-xl transition-transform hover:scale-110 disabled:opacity-50"
                >
                  <img
                    src={rightArrow}
                    alt="right arrow"
                    className="text-brand-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
