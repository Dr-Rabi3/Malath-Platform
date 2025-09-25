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
        // console.log(data);
        setSettingData(data);
      })
      .catch(() => {
        message.error(
          t("admin.setting.fetchError", "Failed to fetch settings")
        );
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
                  className="w-full h-full border-0"
                  style={{
                    borderWidth: 1,
                    borderColor: "#d6d6d6",
                    borderRadius: 10,
                  }}
                  cover={
                    <div
                      className={` pt-3 pb-2 px-6${
                        i18n.language === "en" ? "pl-3" : "pr-3"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="p-3 rounded-full">
                          <img
                            src={card.icon}
                            alt={card.alt}
                            className="w-[32px] sm:w-[40px] h-auto"
                          />
                        </div>
                        <div className="font-semibold text-xl font-main text-neutral-800">
                          {t(card.titleKey)}
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Meta
                    description={
                      <div
                        className="text-neutral-600 font-regular text-sm sm:text-base font-main leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{
                          __html: card.content,
                        }}
                      ></div>
                    }
                  />
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
