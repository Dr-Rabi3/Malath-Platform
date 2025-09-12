import { ImagesSlider } from "../atoms/images-slider.tsx";
import HomeSlider from "../Molecules/HomeSlider.jsx";
import HomeInfo from "../Molecules/HomeInfo.jsx";
import { Spin } from "antd";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { useSliderData } from "../../hooks/useSliderData.js";
import { useEffect } from "react";

function Home(props) {
  const sliderMutation = useSliderData();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    // Trigger the mutation when component mounts
    sliderMutation.mutate({ lang });
  }, []);

  // Show loading spinner while data is being fetched
  // if (sliderMutation.isPending) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[600px]">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  if (sliderMutation.error) {
    return (
      <div className="text-red-500">
        Error loading slides: {sliderMutation.error.message}
      </div>
    );
  }

  const slides = sliderMutation.data || [];
  if ((!slides || slides.length === 0) && !sliderMutation.isPending) {
    return <div className="text-gray-500">No slides available</div>;
  }
  return (
    <div className="rounded-md" {...props}>
      <Carousel
        opts={{
          align: "end",
          loop: true,
          direction: lang === "ar" ? "rtl" : "ltr",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((s, index) => {
            return (
              <CarouselItem key={index} className="">
                <div className="relative w-full min-h-[600px] sm:min-h-[420px] md:min-h-[600px]">
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 z-[-1] w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 z-0" />
                  <div className="absolute bottom-2 left-2 right-2 sm:left-3 sm:right-auto md:bottom-4 md:left-4">
                    <HomeSlider slide={s} totalCount={slides.length} />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
          {slides.length === 0 && (
            <div className="w-full min-h-[280px] sm:min-h-[420px] md:min-h-[600px] flex flex-col gap-3 p-3 sm:p-4">
              <Skeleton className="h-full w-full rounded-xl" />
              <Skeleton className="h-[24px] sm:h-[28px] md:h-[30px] w-[60%] sm:w-[50%] md:w-[40%] rounded-xl" />
              <Skeleton className="h-[36px] sm:h-[40px] w-full rounded-xl" />
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
export default Home;
