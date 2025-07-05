import { Col, Row } from "antd";
import WhoAre from "../Molecules/WhoAre";
import About from "../Molecules/About";
import Pros from "../Molecules/Pros";
import { useTranslation } from "react-i18next";

function MetaData({ ...props }) {
  const { t } = useTranslation();
  const values = t("about.valuesList", { returnObjects: true });
  return (
    <div {...props} className="space-y-[35px]">
      <WhoAre />
      <Row
        justify="space-between"
        gutter={[16, 24]}
        className="gap-y-6 md:gap-y-0"
      >
        <Col xs={24} md={8} className="flex justify-center mb-4 md:mb-0">
          <div className="border-[2px] border-brand-500 min-h-[180px] sm:min-h-[220px] md:min-h-[250px] min-w-full sm:min-w-[250px] md:min-w-[250px] rounded-[20px] flex flex-col justify-center p-4 sm:p-5">
            <h1 className="text-neutral-950 font-semibold text-lg sm:text-xl md:text-[20px] font-main">
              {t("about.visionTitle")}
            </h1>
            <h3 className="text-brand-700 font-light text-base sm:text-lg md:text-[18px] font-main">
              {t("about.visionDescription")}
            </h3>
          </div>
        </Col>
        <Col xs={24} md={8} className="flex justify-center mb-4 md:mb-0">
          <div className="border-[2px] border-brand-500 min-h-[180px] sm:min-h-[220px] md:min-h-[250px] min-w-full sm:min-w-[250px] md:min-w-[250px] rounded-[20px] flex flex-col justify-center p-4 sm:p-5">
            <h1 className="text-neutral-950 font-semibold text-lg sm:text-xl md:text-[20px] font-main">
              {t("about.missionTitle")}
            </h1>
            <h3 className="text-brand-700 font-light text-base sm:text-lg md:text-[18px] font-main">
              {t("about.missionDescription")}
            </h3>
          </div>
        </Col>
        <Col xs={24} md={8} className="flex justify-center">
          <div className="border-[2px] border-brand-500 min-h-[180px] sm:min-h-[220px] md:min-h-[250px] min-w-full sm:min-w-[250px] md:min-w-[300px] rounded-[20px] flex flex-col justify-center p-4 sm:p-5">
            <h1 className="text-neutral-950 font-semibold text-lg sm:text-xl md:text-[20px] font-main">
              {t("about.valuesTitle")}
            </h1>
            <h3 className="text-brand-700 font-light text-base sm:text-lg md:text-[18px] font-main">
              {t("about.valuesDescription")}
            </h3>
            <ul className="flex gap-2 sm:gap-3 flex-wrap text-brand-700 mt-2">
              {values.map((val, idx) => (
                <li
                  key={idx}
                  className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main"
                >
                  {val}
                </li>
              ))}
              {/* <li className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main">
                Confidentiality
              </li>
              <li className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main">
                Professionalism
              </li>
              <li className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main">
                Trust
              </li>
              <li className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main">
                Precision
              </li>
              <li className="bg-brand-700/20 p-1 rounded-md text-xs sm:text-[13px] font-main">
                Innovation
              </li> */}
            </ul>
          </div>
        </Col>
      </Row>
      <About />
      <Pros />
    </div>
  );
}

export default MetaData;
