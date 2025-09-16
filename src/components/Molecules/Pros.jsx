import { Card, Col, Row, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import Silk from "../ui/Silk";
import why1 from "../../assets/icons/why1.svg";
import why2 from "../../assets/icons/why2.svg";
import why3 from "../../assets/icons/why3.svg";
import why4 from "../../assets/icons/why4.svg";
import serviceBg from "../../assets/images/background.png";
const { Meta } = Card;

function Pros() {
  const { t, i18n } = useTranslation();
  const pros = t("pros.points", { returnObjects: true });
  const lang = i18n.language.includes("en") ? "en" : "ar";
  console.log(lang);
  return (
    <div>
      <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[360px]">
        <div className="absolute inset-0 w-full h-full z-[-1] bg-gradient-to-r from-[#BA9258] to-[#C9BFB1]">
          <img
            src={serviceBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-[-1] transparent-bg opacity-25"
          />
        </div>
        <div className="z-[10] p-4 sm:p-6 w-full min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-center items-center text-center select-none">
          <h1 className="font-barlow font-semibold text-2xl sm:text-4xl md:text-5xl">
            {t("prosHero.title")}
          </h1>
          <div className="font-barlow font-regular text-sm sm:text-base md:text-lg max-w-[1000px] px-4 sm:px-8 mt-2 sm:mt-3">
            {t("prosHero.subtitle")}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        <Card
          className="w-full"
          styles={{ body: { padding: 24 } }}
          style={{ borderWidth: 1, borderColor: "#d6d6d6", borderRadius: 10 }}
          cover={
            <div className={`!flex !text-neutral-950 items-center text-xl sm:text-2xl md:text-[26px] font-medium font-barlow gap-3 pt-3 pb-2 ${lang === "en" ? "pl-3" : "pr-3"}`}>
              <div
                className="rounded-full bg-gradient-to-r from-[#BA9258] to-[#C9BFB1] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center border border-gray-200"
              >
                <img src={why1} className="w-[18px] h-auto" />
              </div>
              <div>{t("pros.cards.0", "Business Expertise")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-sm sm:text-base md:text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.0",
                  "Our team brings deep knowledge of regional and international markets. We combine strategic thinking with real-world experience to deliver practical, high-impact business solutions."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="w-full"
          styles={{ body: { padding: 24 } }}
          style={{ borderWidth: 1, borderColor: "#d6d6d6", borderRadius: 10 }}
          cover={
            <div className={`!flex !text-neutral-950 items-center text-xl sm:text-2xl md:text-[26px] font-medium font-barlow gap-3 pt-3 pb-2 ${lang === "en" ? "pl-3" : "pr-3"}`}>
              <div
                className="bg-gradient-to-r from-[#BA9258] to-[#C9BFB1] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center border border-gray-200 rounded-full"
              >
                <img src={why2} className="w-[23px] h-auto" />
              </div>
              <div>{t("pros.cards.1", "Client-Focused Mindset")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-sm sm:text-base md:text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.1",
                  "We tailor our services around your goals. Whether you're an entrepreneur, SME, or investor, your success is our top priority — and we treat your business like our own."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="w-full"
          styles={{ body: { padding: 24 } }}
          style={{ borderWidth: 1, borderColor: "#d6d6d6", borderRadius: 10 }}
          cover={
            <div className={`!flex !text-neutral-950 items-center text-xl sm:text-2xl md:text-[26px] font-medium font-barlow gap-3 pt-3 pb-2 ${lang === "en" ? "pl-3" : "pr-3"}`}>
              <div
                className="bg-gradient-to-r from-[#BA9258] to-[#C9BFB1] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center border border-gray-200 rounded-full" 
              >
                <img src={why3} className="w-[16px] h-auto" />
              </div>
              <div>{t("pros.cards.2", "Results That Matter")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-sm sm:text-base md:text-[18px] font-regular font-barlow">
                {t(
                  "pros.cardsDesc.2",
                  "We don’t just offer services — we deliver outcomes. From feasibility studies to marketing campaigns, everything we do is designed to create measurable value and drive growth."
                )}
              </div>
            }
          />
        </Card>
        <Card
          className="w-full"
          styles={{ body: { padding: 24 } }}
          style={{ borderWidth: 1, borderColor: "#d6d6d6", borderRadius: 10 }}
          cover={
            <div className={`!flex !text-neutral-950 items-center text-xl sm:text-2xl md:text-[26px] font-medium font-barlow gap-3 pt-3 pb-2 ${lang === "en" ? "pl-3" : "pr-3"}`}>
              <div
                className="bg-gradient-to-r from-[#BA9258] to-[#C9BFB1] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] flex justify-center items-center border border-gray-200 rounded-full"
              >
                <img src={why4} className="w-[12px] sm:w-[23px] h-auto" />
              </div>
              <div>{t("pros.cards.3", "Long-Term Partnership")}</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-sm sm:text-base md:text-[18px] font-regular font-barlow">
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
