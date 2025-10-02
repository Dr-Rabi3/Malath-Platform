import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import addask from "../../assets/icons/addask.svg";
import whatsapp from "../../assets/icons/logos_whatsapp-icon.svg";
import phone from "../../assets/icons/ic_round-phone.svg";
function About() {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 rounded-[20px] px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 min-h-[200px] sm:min-h-[220px] lg:min-h-[180px]">
      {/* Main content */}
      <div className="text-start w-full lg:max-w-[800px] font-main order-1 lg:order-1">
        {/* <h1 className="font-barlow text-neutral-1000 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-regular leading-tight mb-2 sm:mb-3">
          {t("about.title")}
        </h1> */}
        <p className="text-[18px] font-regular leading-[1.5] text-neutral-700">
          {t("about.supportMessage")} {" "}
          {t("about.supportHighlight")}
        </p>
      </div>

      {/* Floating icon - positioned absolutely for larger screens, inline for mobile */}
      <div
        className={`relative group lg:absolute lg:top-[-30%] ${
          i18n.language === "en" ? "lg:right-[10px]" : "lg:left-[10px]"
        }  order-2 lg:order-2 self-end lg:self-auto`}
      >
        {/* Main button */}
        <img
          src={addask}
          alt=""
          className="w-[60px] sm:w-[80px] lg:w-[100px] h-auto"
        />

        {/* Hover Menu */}
        <div
          className="mr-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-[-10px] transition-all duration-300"
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70px",
          }}
        >
          <a
            href="https://wa.me/966549909990"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full p-[8px] rounded-2xl bg-[#F4F1EB]/75 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <img
              src={whatsapp}
              alt="whatsapp"
              className="w-[60px] sm:w-[80px] lg:w-[100px] h-auto"
            />
          </a>

          {/* Phone */}
          <a
            href="tel:+966549909990"
            className="w-full h-full p-[8px] rounded-2xl bg-[#F4F1EB]/75 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <img
              src={phone}
              alt="phone"
              className="w-[60px] sm:w-[80px] lg:w-[100px] h-auto"
            />
          </a>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full lg:w-auto order-3 lg:order-3 self-stretch lg:self-auto">
        <Link
          to="/about"
          className="flex gap-2 bg-gradient-to-r from-[#BA9258] to-[#C9BFB1] text-white w-full lg:w-fit py-3 sm:py-3 lg:py-3 px-4 sm:px-5 lg:px-5 justify-center items-center rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-neutral-800 transition-colors duration-200"
        > 
          <p className="m-0 text-sm sm:text-base lg:text-lg">
            {t("about.getInTouch")}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default About;
