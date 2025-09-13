import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function Strategy() {
  const { t } = useTranslation();
  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12">
      <h1 className="!leading-[60px] text-lg sm:text-2xl md:text-[32px] lg:text-[50px] font-thin mb-4 sm:mb-6">
        {t("strategy.title")}
      </h1>
      <div className="font-main text-base sm:text-lg md:text-[18px] text-[#624823] font-thin leading-relaxed">
        {t("strategy.empowerText")}
      </div>
      <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4">
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.generalBusinessConsulting")}
        </li>
        <li className="w-[2px] bg-[#F7F8E6]/50 hidden md:block"></li>
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.digitalMarketing")}
        </li>
        <li className="w-[2px] bg-[#F7F8E6]/50 hidden md:block"></li>
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.realEstatePromotion")}
        </li>
        <li className="w-[2px] bg-[#F7F8E6]/50 hidden md:block"></li>
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.administrativeOutsourcing")}
        </li>
        <li className="w-[2px] bg-[#F7F8E6]/50 hidden md:block"></li>
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.feasibilityStudies")}
        </li>
        <li className="w-[2px] bg-[#F7F8E6]/50 hidden md:block"></li>
        <li className="inline-flex bg-[#F7F8E6]/25 text-xs sm:text-[13px] md:text-sm rounded-lg font-thin px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
          {t("strategy.remoteExecutiveServices")}
        </li>
      </ul>
    </div>
  );
}

export default Strategy;
