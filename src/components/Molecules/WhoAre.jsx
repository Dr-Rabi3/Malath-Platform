import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function WhoAre({ ...props }) {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <div className="flex items-center justify-center md:justify-start mb-6 md:mb-0">
        <div className="w-full px-2 md:px-8">
          <h1 className="text-[#1D1F1E] font-regular text-2xl sm:text-[40px] md:text-[45px] font-main">
            {t("whoare.heading")}
          </h1>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#646A69] font-tiny text-base sm:text-lg md:text-[16px] font-main w-full px-2 md:px-8">
          {t("whoare.description")}
        </div>
      </div>
    </div>
  );
}

export default WhoAre;
