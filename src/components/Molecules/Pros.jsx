import { Card, Col, Row, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import Silk from "../ui/Silk";
import why1 from "../../assets/icons/why1.svg";
import why2 from "../../assets/icons/why2.svg";
import why3 from "../../assets/icons/why3.svg";
import why4 from "../../assets/icons/why4.svg";
import serviceBg from "../../assets/images/background.jpg";
const { Meta } = Card;

function Pros() {
  const { t } = useTranslation();
  const pros = t("pros.points", { returnObjects: true });
  return (
    <div>
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute h-full w-full z-[-1]">
          {/* <Silk
            speed={5}
            scale={1}
            color="#3B307D"
            noiseIntensity={2.5}
            rotation={0}
          /> */}
          <img
            src={serviceBg}
            alt=""
            className="absolute h-full w-full z-[-1] object-cover"
          />
        </div>
        <div className="text-white z-[10] p-2 w-full h-full flex flex-col justify-center items-center select-none">
          <h1 className="font-barlow font-semibold text-[50px] text-center">
            {t("prosHero.title")}
          </h1>
          <div className="font-barlow font-regular text-[20px] text-center">
            {t("prosHero.subtitle")}
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap gap-2 mt-2 rounded-[20px]">
        <Card
          className="bg-accent-25"
          style={{
            width: 500,
            padding: 50,
            borderWidth: 2,
            borderColor: "#d6d6d6",
            borderRadius: 20,
            flexGrow: 1,
          }}
          cover={
            <div className="!flex !text-neutral-950 items-center text-[26px] font-medium font-barlow gap-3 pt-3 pl-3 pb-2">
              <div
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border border-gray-200 rounded-md"
                style={{
                  background:
                    "linear-gradient(rgba(236, 229, 218, 0.2) 20%, rgba(36, 36, 36, 0.05) 56%, rgba(236, 229, 218, 0.2) 86%)",
                }}
              >
                <img src={why1} className="w-[30px] sm:w-[30px] h-auto" />
              </div>
              <div>{t("pros.cards.0", "Business Expertise")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.0",
                  "Our team brings deep knowledge of regional and international markets. We combine strategic thinking with real-world experience to deliver practical, high-impact business solutions."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="bg-accent-25"
          style={{
            width: 500,
            padding: 50,
            borderWidth: 2,
            borderColor: "#d6d6d6",
            borderRadius: 20,
            flexGrow: 1,
          }}
          cover={
            <div className="!flex !text-neutral-950 items-center text-[26px] font-medium font-barlow gap-3 pt-3 pl-3 pb-2">
              <div
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border border-gray-200 rounded-md"
                style={{
                  background:
                    "linear-gradient(rgba(236, 229, 218, 0.2) 20%, rgba(36, 36, 36, 0.05) 56%, rgba(236, 229, 218, 0.2) 86%)",
                }}
              >
                <img src={why2} className="w-[30px] sm:w-[30px] h-auto" />
              </div>
              <div>{t("pros.cards.1", "Client-Focused Mindset")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.1",
                  "We tailor our services around your goals. Whether you're an entrepreneur, SME, or investor, your success is our top priority — and we treat your business like our own."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="bg-accent-25"
          style={{
            width: 500,
            padding: 50,
            borderWidth: 2,
            borderColor: "#d6d6d6",
            flexGrow: 1,
            borderRadius: 20,
          }}
          cover={
            <div className="!flex !text-neutral-950 items-center text-[26px] font-medium font-barlow gap-3 pt-3 pl-3 pb-2">
              <div
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border border-gray-200 rounded-md"
                style={{
                  background:
                    "linear-gradient(rgba(236, 229, 218, 0.2) 20%, rgba(36, 36, 36, 0.05) 56%, rgba(236, 229, 218, 0.2) 86%)",
                }}
              >
                <img src={why3} className="w-[30px] sm:w-[30px] h-auto" />
              </div>
              <div>{t("pros.cards.2", "Results That Matter")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.2",
                  "We don’t just offer services — we deliver outcomes. From feasibility studies to marketing campaigns, everything we do is designed to create measurable value and drive growth."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="bg-accent-25"
          style={{
            width: 500,
            padding: 50,
            borderWidth: 2,
            borderColor: "#d6d6d6",
            borderRadius: 20,
            flexGrow: 1,
          }}
          cover={
            <div className="!flex !text-neutral-950 items-center text-[26px] font-medium font-barlow gap-3 pt-3 pl-3 pb-2">
              <div
                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex justify-center items-center border border-gray-200 rounded-md"
                style={{
                  background:
                    "linear-gradient(rgba(236, 229, 218, 0.2) 20%, rgba(36, 36, 36, 0.05) 56%, rgba(236, 229, 218, 0.2) 86%)",
                }}
              >
                <img src={why4} className="w-[30px] sm:w-[30px] h-auto" />
              </div>
              <div>{t("pros.cards.3", "Long-Term Partnership")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.3",
                  "At Malath, we believe in building strong, lasting relationships. We stay with you beyond the launch — offering continuous support, insight, and scalability as your business evolves."
                )}
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
}
export default Pros;
