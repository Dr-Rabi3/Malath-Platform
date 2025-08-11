import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import addask from "../../assets/icons/addask.svg";

function About() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-accent-25 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 rounded-[20px] shadow-custom-gray px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 min-h-[200px] sm:min-h-[220px] lg:min-h-[180px]">
      {/* Main content */}
      <div className="text-start w-full lg:max-w-[800px] font-main order-1 lg:order-1">
        <h1 className="font-barlow text-neutral-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-regular leading-tight mb-2 sm:mb-3">
          {t("about.title")}
        </h1>
        <p className="text-sm sm:text-base font-regular leading-[1.5] text-neutral-700">
          {t("about.supportMessage")}
          <span className="font-medium text-neutral-800">
            {t("about.supportHighlight")}
          </span>
        </p>
      </div>

      {/* Floating icon - positioned absolutely for larger screens, inline for mobile */}
      <div className="lg:absolute lg:top-[-30%] lg:right-[10px] order-2 lg:order-2 self-end lg:self-auto">
        <Link to="/contact" className="block">
          <img
            src={addask}
            alt=""
            className="w-[60px] sm:w-[80px] lg:w-[100px] h-auto"
          />
        </Link>
      </div>

      {/* CTA Button */}
      <div className="w-full lg:w-auto order-3 lg:order-3 self-stretch lg:self-auto">
        <Link
          to="/about"
          className="flex gap-2 bg-neutral-950 text-white w-full lg:w-fit py-3 sm:py-3 lg:py-3 px-4 sm:px-5 lg:px-5 justify-center items-center rounded-full text-sm sm:text-base lg:text-lg font-medium hover:bg-neutral-800 transition-colors duration-200"
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
