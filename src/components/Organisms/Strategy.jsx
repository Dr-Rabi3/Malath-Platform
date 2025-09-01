import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function Strategy() {
  const { t } = useTranslation();
  return (
    <div className="px-2 sm:px-6 md:px-12">
      <h1 className="text-xl sm:text-2xl md:text-[35px] text-neutral-1000 font-regular font-main mb-6">
        {t("strategy.title")}
      </h1>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="md:mt-20 flex-wrap"
        // align="middle"
      >
        <Col xs={24} md={12} className="mb-6 md:mb-0">
          <ul className="flex flex-wrap gap-3 sm:gap-4">
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.generalBusinessConsulting")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.digitalMarketing")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.realEstatePromotion")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.administrativeOutsourcing")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.feasibilityStudies")}
            </li>
            <li className="w-[2px] bg-brand-600/50 hidden md:block"></li>
            <li className="inline-flex bg-brand-600/20 text-xs sm:text-[13px] text-neutral-950 rounded-lg px-4 sm:px-5 py-2 sm:py-3">
              {t("strategy.remoteExecutiveServices")}
            </li>
          </ul>
        </Col>
        {/* <Col xs={0} md={2} className="h-full">
          <div className="h-full w-[2px] bg-brand-500/50"></div>
        </Col> */}
        <Col xs={24} md={10} className="mt-6 md:mt-0">
          <div className="font-main text-base sm:text-lg md:text-[20px] text-neutral-950 font-regular">
            {t("strategy.empowerText")}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Strategy;
