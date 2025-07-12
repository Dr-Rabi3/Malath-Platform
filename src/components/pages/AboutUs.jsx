import { useEffect, useState } from "react";
import States from "../Organisms/States";
import Strategy from "../Organisms/Strategy";
import { getEntitySettings } from "../../api/settings";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMission() {
      setLoading(true);
      try {
        const settings = await getEntitySettings();
        setMission(settings.mission || "");
      } catch (err) {
        setMission("");
      }
      setLoading(false);
    }
    fetchMission();
  }, []);

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
          <h1
            className={`text-lg sm:text-xl md:text-2xl lg:text-[24px] text-neutral-950 font-main relative before:absolute before:bg-brand-600 before:w-7 ${
              lang === "ar"
                ? "before:left-[calc(100%+15px)] mr-4 sm:mr-10"
                : "before:right-[calc(100%+15px)] ml-4 sm:ml-10"
            } before:top-1/2 before:translate-y-[-50%] before:h-[2px]`}
          >
            {t("aboutUs.whoWeAre")}
          </h1>
          <h3 className="text-neutral-700 font-main text-sm sm:text-base my-[20px]">
            {t("aboutUs.drivingSuccess")}
          </h3>
          <h3 className="text-neutral-700 font-main text-sm sm:text-base">
            {t("aboutUs.partnerText")}
          </h3>
        </div>
        <div className="bg-neutral-1000 py-5 rounded-2xl mt-6 lg:mt-0 w-full max-w-xl">
          <div className="border-l-[4px] border-brand-200 text-white px-4 sm:px-6 h-full flex flex-col justify-between gap-2">
            {loading ? (
              <Spin />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: mission }} />
            )}
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-brand-200 text-base sm:text-lg">
                {t("aboutUs.ourMission")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
