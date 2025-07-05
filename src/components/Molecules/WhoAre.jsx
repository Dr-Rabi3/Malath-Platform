import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function WhoAre({ ...props }) {
  const { t } = useTranslation();

  return (
    <Row {...props} gutter={[0, 32]} className="flex-wrap">
      <Col
        xs={24}
        md={12}
        className="flex items-center justify-center md:justify-start mb-6 md:mb-0"
      >
        <div className="w-full px-2 md:px-8">
          <h1 className="text-neutral-950 font-extrabold text-2xl sm:text-3xl md:text-[36px] font-main text-center ">
            {t("whoare.heading")}
          </h1>
          <h2 className="text-neutral-950 font-light text-lg sm:text-xl md:text-[30px] font-main text-center  mt-2">
            {t("whoare.heading")}
          </h2>
        </div>
      </Col>
      <Col xs={24} md={12} className="flex items-center justify-center">
        <div className="text-brand-700 font-tiny text-base sm:text-lg md:text-[20px] text-center font-main w-full px-2 md:px-8">
          {t("whoare.description")}
        </div>
      </Col>
    </Row>
  );
}

export default WhoAre;
