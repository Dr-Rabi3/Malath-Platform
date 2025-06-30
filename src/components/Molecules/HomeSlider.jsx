import React, { useEffect, useState, useRef } from "react";
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
function HomeSlider({ className }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slidesData.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "ArrowRight") changeSlide(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    // intervalRef.current = setInterval(() => {
    //   const next = (currentSlide + 1) % slideCount;
    //   showSlide(next);
    // }, 8000);
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

  return (
    <div
      className={`bg-[#c3b6f347] backdrop-blur-sm rounded-lg p-6 ${className}`}
    >
      {slidesData.map((slide, idx) => (
        <div
          key={idx}
          className={`h-fit inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
            idx === currentSlide
              ? "opacity-100 translate-x-0 z-10"
              : "opacity-0 translate-x-full absolute"
          } ${slide.bgGradient}`}
        >
          <div className="relative max-w-5xl mx-auto px-6 text-black z-10">
            <div className="text-4xl font-bold mb-2 text-white">
              {slide.number}
              <span className="text-xl">/03</span>
            </div>
            <div className="border-l pl-5 max-w-xl animate-fade-in-up text-white">
              <h1 className="text-2xl font-extrabold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-md mb-8 leading-relaxed">
                {slide.description}
              </p>
              <button
                // onClick={() => handleCTAClick(slide.title)}
                className="relative px-5 py-3  font-semibold text-white rounded-full bg-neutral-950 transition-all duration-300"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute bottom-6 right-6 flex gap-4 z-10">
        <button
          onClick={() => changeSlide(-1)}
          disabled={currentSlide === 0}
          className="bg-white w-10 h-10 rounded-full text-white flex items-center justify-center text-xl transition-transform hover:scale-110 disabled:opacity-50"
        >
          <img src={leftArrow} alt="left arrow" className="text-white" />
        </button>
        <button
          onClick={() => changeSlide(1)}
          disabled={currentSlide === slideCount - 1}
          className="bg-white w-10 h-10 rounded-full text-white flex items-center justify-center text-xl transition-transform hover:scale-110 disabled:opacity-50"
        >
          <img src={rightArrow} alt="right arrow" className="text-white" />
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}
export default HomeSlider;
