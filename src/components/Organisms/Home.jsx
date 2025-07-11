import { ImagesSlider } from "../atoms/images-slider.tsx";
import HomeSlider from "../Molecules/HomeSlider.jsx";
import HomeInfo from "../Molecules/HomeInfo.jsx";
import { getAllSliders } from "../../api/admin";
import { getFile } from "../../api/http";
import { Spin } from "antd";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";

export async function homeLoader() {
  const res = await getAllSliders();

  if (res.isSuccess && Array.isArray(res.data)) {
    const slidesWithImages = await Promise.all(
      res.data.map(async (slide, idx) => {
        let imageUrl = slide.imageUrl;
        let imageBlobUrl = "";
        try {
          if (imageUrl) {
            const blob = await getFile(imageUrl);
            imageBlobUrl = URL.createObjectURL(blob);
          }
        } catch (e) {
          imageBlobUrl = "";
        }
        return {
          number: String(idx + 1).padStart(2, "0"),
          title: slide.title || "",
          description: slide.description || "",
          image: imageBlobUrl,
        };
      })
    );
    return slidesWithImages;
  }
  return [];
}

function Home({ ...props }) {
  const slides = useLoaderData();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  if (!slides) {
    return <Spin />;
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
                <div className="relative w-full min-h-[600px]">
                  <img
                    src={s.image}
                    alt=""
                    className="absolute z-[-1] w-full h-[600px] object-cover rounded-[20px]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 rounded-[20px] z-0" />
                  {/* Pass slide data to HomeSlider */}
                  <div className="absolute bottom-0 left-0 md:bottom-2 md:left-2">
                    <HomeSlider slide={s} totalCount={slides.length} />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
export default Home;
