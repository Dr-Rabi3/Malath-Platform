import { Card, Col, Avatar, message, Row, Tooltip } from "antd";
import WhoAre from "../Molecules/WhoAre";
import About from "../Molecules/About";
import Pros from "../Molecules/Pros";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getEntitySettings } from "../../api/settings";
import visionIcon from "../../assets/icons/vision.svg";
import missionIcon from "../../assets/icons/mission.svg";
import valuesIcon from "../../assets/icons/values.svg";
import impactIcon from "../../assets/icons/impact.svg";
import FrequentQs from "../Molecules/FrequantQs";

const { Meta } = Card;

function MetaData({ ...props }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [settingData, setSettingData] = useState({
    visionEn: "",
    visionAr: "",
    missionEn: "",
    missionAr: "",
    valuesEn: "",
    valuesAr: "",
  });

  useEffect(() => {
    setLoading(true);
    getEntitySettings(i18n.language)
      .then((data) => {
        console.log(data);
        setSettingData(data);
      })
      .catch(() => {
        message.error("Failed to fetch settings");
      })
      .finally(() => setLoading(false));
  }, [i18n.language]);

  const cardData = [
    {
      icon: visionIcon,
      titleKey: "about.visionTitle",
      content:
        i18n.language === "ar" ? settingData?.visionAr : settingData?.visionEn,
      alt: "vision icon",
    },
    {
      icon: missionIcon,
      titleKey: "about.missionTitle",
      content:
        i18n.language === "ar"
          ? settingData?.missionAr
          : settingData?.missionEn,
      alt: "mission icon",
    },
    {
      icon: valuesIcon,
      titleKey: "about.valuesTitle",
      content:
        i18n.language === "ar" ? settingData?.valuesAr : settingData?.valuesEn,
      alt: "values icon",
    },
    {
      icon: impactIcon,
      content: t("metaData.impactDescription"),
      titleKey: t("metaData.ourImpact"),
      alt: "impact icon",
    },
  ];

  return (
    <div
      {...props}
      className="space-y-6 sm:space-y-8 lg:space-y-[35px] px-4 sm:px-6 lg:px-0"
    >
      <About />
      {/* Main content section */}
      <div className="flex flex-col  gap-6 lg:gap-8">
        {/* WhoAre component */}
        <WhoAre className="w-full" />

        {/* Cards section */}
        <div className="flex-1">
          <Row gutter={[16, 16]} className="w-full">
            {cardData.map((card, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                <Card
                  loading={loading}
                  className="w-full h-full bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white hover:to-accent-25 transition-all duration-500 ease-in-out transform group cursor-pointer overflow-hidden"
                  cover={
                    <div
                      className={`pt-6 pb-4 px-6 bg-gradient-to-r from-accent-50 to-accent-100 ${
                        i18n.language === "en" ? "pl-6" : "pr-6"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="p-3 bg-white rounded-full shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
                          <img
                            src={card.icon}
                            alt={card.alt}
                            className="w-[32px] sm:w-[40px] h-auto group-hover:rotate-12 transition-transform duration-300"
                          />
                        </div>
                        <div className="font-semibold text-xl font-main text-neutral-800 group-hover:text-accent-700 transition-colors duration-300">
                          {t(card.titleKey)}
                        </div>
                      </div>
                    </div>
                  }
                  bodyStyle={{
                    padding: "24px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  }}
                >
                  <Meta
                    description={
                      <div
                        className="text-neutral-600 font-regular text-sm sm:text-base font-main leading-relaxed flex-1 group-hover:text-neutral-700 transition-colors duration-300"
                        dangerouslySetInnerHTML={{
                          __html: card.content,
                        }}
                      ></div>
                    }
                  />
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full transition-all duration-500 ease-out"></div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Additional components */}
      <Pros />
      <FrequentQs />
    </div>
  );
}

export default MetaData;
