import { Card, Col, Row, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import Silk from "../ui/Silk";
import why1 from "../../assets/icons/why1.svg";
import why2 from "../../assets/icons/why2.svg";
import why3 from "../../assets/icons/why3.svg";
import why4 from "../../assets/icons/why4.svg";
const { Meta } = Card;

function Pros() {
  const { t } = useTranslation();
  const pros = t("pros.points", { returnObjects: true });
  return (
    <div>
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute h-full w-full z-[-1]">
          <Silk
            speed={5}
            scale={1}
            color="#3B307D"
            noiseIntensity={2.5}
            rotation={0}
          />
        </div>
        <div className="text-white z-[10] p-2 w-full h-full flex flex-col justify-center items-center select-none">
          <h1 className="font-barlow font-semibold text-[50px]">
            {t("prosHero.title")}
          </h1>
          <div className="font-barlow font-regular text-[20px]">
            {t("prosHero.subtitle")}
          </div>
        </div>
      </div>
      <div className="bg-accent-25 flex flex-wrap">
        <Card
          className="bg-accent-25"
          style={{
            width: 500,
            padding: 50,
            borderWidth: 2,
            borderColor: "#e6e4ff",
            borderRadius: 0,
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
              <div>Business Expertise</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                Our team brings deep knowledge of regional and international
                markets. We combine strategic thinking with real-world
                experience to deliver practical, high-impact business solutions.
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
            borderColor: "#e6e4ff",
            borderRadius: 0,
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
              <div>Client-Focused Mindset</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                We tailor our services around your goals. Whether you're an
                entrepreneur, SME, or investor, your success is our top priority
                — and we treat your business like our own.
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
            borderColor: "#e6e4ff",
            flexGrow: 1,
            borderRadius: 0,
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
              <div>Results That Matter</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                We don’t just offer services — we deliver outcomes. From
                feasibility studies to marketing campaigns, everything we do is
                designed to create measurable value and drive growth.
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
            borderColor: "#e6e4ff",
            borderRadius: 0,
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
              <div>Long-Term Partnership</div>
            </div>
          }
        >
          <Meta
            description={
              <div className="!text-neutral-950 text-[18px] font-regular font-barlow">
                At Malath, we believe in building strong, lasting relationships.
                We stay with you beyond the launch — offering continuous
                support, insight, and scalability as your business evolves.
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
}
export default Pros;
