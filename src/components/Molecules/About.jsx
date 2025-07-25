import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-accent-25 flex flex-col justify-center items-center gap-4 sm:gap-6 rounded-[20px] shadow-custom-gray text-center min-h-[250px] sm:min-h-[350px] md:min-h-[400px] px-2 sm:px-6 md:px-12 py-8">
      <div className="font-extrabold text-[#5B5A5E] text-xl sm:text-2xl md:text-[35px] max-w-full md:max-w-[1200px] font-main md:leading-[2.5rem] lg:leading-[3rem]">
        {t("about.supportMessage")}
        <span className="text-neutral-950 font-main">
          {" "}
          {t("about.supportHighlight")}
        </span>
      </div>
      <Link
        to="/about"
        className="flex gap-2 bg-neutral-950 text-white w-fit py-2 sm:py-3 px-4 sm:px-5 justify-center items-center rounded-full text-base sm:text-lg"
      >
        <p className="m-0">{t("about.seeMore")}</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path
            d="M14.43 18.82C14.24 18.82 14.05 18.75 13.9 18.6C13.61 18.31 13.61 17.83 13.9 17.54L19.44 12L13.9 6.46C13.61 6.17 13.61 5.69 13.9 5.4C14.19 5.11 14.67 5.11 14.96 5.4L21.03 11.47C21.32 11.76 21.32 12.24 21.03 12.53L14.96 18.6C14.81 18.75 14.62 18.82 14.43 18.82Z"
            fill="#fff"
          />
          <path
            d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
            fill="#fff"
          />
        </svg>
      </Link>
    </div>
  );
}

export default About;
