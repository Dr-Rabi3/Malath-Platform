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
  ];

  return (
    <div
      {...props}
      className="space-y-6 sm:space-y-8 lg:space-y-[35px] px-4 sm:px-6 lg:px-0"
    >
      {/* Main content section */}
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        {/* WhoAre component */}
        <div className="w-full xl:max-w-[400px] xl:flex-shrink-0">
          <WhoAre className="w-full" />
        </div>

        {/* Cards section */}
        <div className="flex-1">
          <Row gutter={[16, 16]} className="w-full">
            {cardData.map((card, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                lg={8}
                xl={8}
                className="flex justify-center"
              >
                <Card
                  loading={loading}
                  className="w-full max-w-[350px] h-full"
                  style={{
                    minHeight: "280px",
                    borderWidth: "1px",
                    borderColor: "#9A743C",
                  }}
                  cover={
                    <div className="flex justify-center pt-3 pl-3 pb-2">
                      <div
                        className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border border-gray-200 rounded-md"
                        style={{
                          background:
                            "linear-gradient(rgba(236, 229, 218, 0.2) 20%, rgba(36, 36, 36, 0.05) 56%, rgba(236, 229, 218, 0.2) 86%)",
                        }}
                      >
                        <img
                          src={card.icon}
                          alt={card.alt}
                          className="w-[30px] sm:w-[40px] h-auto"
                        />
                      </div>
                    </div>
                  }
                  bodyStyle={{
                    padding: "16px 20px 20px",
                    height: "calc(100% - 100px)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Meta
                    title={
                      <h1 className="text-neutral-950 font-semibold text-base sm:text-lg md:text-xl font-main mb-2">
                        {t(card.titleKey)}
                      </h1>
                    }
                    description={
                      <Tooltip
                        title={
                          <span
                            dangerouslySetInnerHTML={{
                              __html: card.content,
                            }}
                          />
                        }
                        placement="top"
                      >
                        <div
                          className="text-brand-700 font-regular text-sm sm:text-base font-main leading-relaxed flex-1"
                          style={{
                            maxHeight: "150px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: "vertical",
                            cursor: "pointer",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: card.content,
                          }}
                        />
                      </Tooltip>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Additional components */}
      <About />
      <Pros />
    </div>
  );
}

export default MetaData;
