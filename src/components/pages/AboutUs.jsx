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
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMission() {
      setLoading(true);
      try {
        const data = await getEntitySettings();
        setSettings(data || {});
      } catch (err) {
        setSettings({});
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
    <div className="mt-[20px] space-y-[50px] px-2 sm:px-4 md:px-8 mb-20">
      <Strategy />
      <States />
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-950 mb-4">
          {t("aboutUs.whoWeAre")}
        </h1>
        <h3 className="text-xl sm:text-2xl text-neutral-700 font-medium">
          {t("aboutUs.drivingSuccess")}
        </h3>
      </div>

      {/* Three Column Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        {/* Left Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base leading-relaxed">
            {t("aboutUs.card1")}
          </p>
        </div>

        {/* Middle Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base leading-relaxed">
            {t("aboutUs.card2")}
          </p>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base leading-relaxed">
            {t("aboutUs.card3")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
