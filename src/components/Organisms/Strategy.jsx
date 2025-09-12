import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function Strategy() {
  const { t } = useTranslation();
  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-12">
      <h1 className="text-lg sm:text-2xl md:text-[32px] lg:text-[35px] text-neutral-1000 font-regular font-main mb-4 sm:mb-6">
        {t("strategy.title")}
      </h1>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="mt-4 sm:mt-8 md:mt-12 lg:mt-16 flex-wrap"
        // align="middle"
      >
        <Col xs={24} md={12} className="mb-6 md:mb-0">
          <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.generalBusinessConsulting")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.digitalMarketing")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.realEstatePromotion")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.administrativeOutsourcing")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.feasibilityStudies")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] md:text-sm text-neutral-950 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3">
              {t("strategy.remoteExecutiveServices")}
            </li>
          </ul>
        </Col>
        {/* <Col xs={0} md={2} className="h-full">
          <div className="h-full w-[2px] bg-brand-500/50"></div>
        </Col> */}
        <Col xs={24} md={10} className="mt-4 sm:mt-6 md:mt-0">
          <div className="font-main text-base sm:text-lg md:text-[18px] lg:text-[20px] text-neutral-950 font-regular leading-relaxed">
            {t("strategy.empowerText")}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Strategy;
