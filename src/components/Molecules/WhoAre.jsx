import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function WhoAre({ ...props }) {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <div
        className="flex items-center justify-center md:justify-start mb-6 md:mb-0"
      >
        <div className="w-full px-2 md:px-8">
          <h1 className="text-neutral-950 font-extrabold text-2xl sm:text-3xl md:text-[36px] font-main">
            {t("whoare.heading")}
          </h1>
          <h2 className="text-neutral-950 font-light text-lg sm:text-xl md:text-[30px] font-main mt-2">
            {t("whoare.heading")}
          </h2>
        </div>
      </div>
      <div className="flex">
        <div className="text-brand-700 font-tiny text-base sm:text-lg md:text-[18px] font-main w-full px-2 md:px-8">
          {t("whoare.description")}
        </div>
      </div>
    </div>
  );
}

export default WhoAre;
