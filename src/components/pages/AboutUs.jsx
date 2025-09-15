import States from "../Organisms/States";
import Strategy from "../Organisms/Strategy";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-14 mb-16 sm:mb-20">
      <div className="w-full bg-gradient-to-r from-[#C19E6B] to-[#CEC4B7] rounded-2xl px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8 py-8 sm:py-12 md:py-16">
        <div className="flex-1 w-full">
          <Strategy />
        </div>
        <div className="w-full md:w-auto md:min-w-[320px]">
          <States />
        </div>
      </div>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12 px-2">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-thin mb-2 sm:mb-4">
          {t("aboutUs.whoWeAre")}
        </h1>
        <h3 className="text-lg sm:text-2xl text-neutral-700 font-thin max-w-3xl mx-auto">
          {t("aboutUs.drivingSuccess")}
        </h3>
      </div>

      {/* Three Column Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base sm:text-[17px] leading-relaxed">
            {t("aboutUs.card1")}
          </p>
        </div>

        {/* Middle Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base sm:text-[17px] leading-relaxed">
            {t("aboutUs.card2")}
          </p>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-8 border border-gray-100">
          <p className="text-neutral-700 text-base sm:text-[17px] leading-relaxed">
            {t("aboutUs.card3")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
