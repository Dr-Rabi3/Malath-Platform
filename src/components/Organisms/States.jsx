import photo from "../../assets/images/Rectangle 5489.png";
import { useTranslation } from "react-i18next";

function States() {
  const { t } = useTranslation();
  return (
    <div className="relative bg-white  sm:pb-[120px]">
      <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto px-2 sm:px-4 md:px-8 gap-6 md:gap-10">
        <div className="hidden sm:block rounded-2xl overflow-hidden z-10 w-full md:w-2/3">
          <img
            src={photo}
            alt="Laptop and Chart"
            className="w-full max-w-3xl object-cover h-48 sm:h-64 md:h-80 lg:h-96"
          />
        </div>
        <div className="bg-[#D9C7A3] text-white px-6 sm:px-8 py-8 sm:py-10 rounded-2xl z-10 shadow-lg w-full md:w-1/3 flex flex-col items-center max-w-[300px]">
          <div className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
            45+
          </div>
          <p className="text-white/80 mb-4 sm:mb-6 text-base sm:text-lg">
            {t("states.projectsComplete")}
          </p>

          <div className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
            5+
          </div>
          <p className="text-white/80 mb-4 sm:mb-6 text-base sm:text-lg">
            {t("states.yearsExperience")}
          </p>

          <div className="text-3xl sm:text-4xl md:text-5xl text-white font-bold">
            100+
          </div>
          <p className="text-white/80 text-base sm:text-lg">
            {t("states.customers")}
          </p>
        </div>
      </div>
      <div className="hidden sm:block absolute left-0 right-0 bottom-0 h-[80px] sm:h-[150px] bg-neutral-1000 rounded-2xl z-0"></div>
    </div>
  );
}

export default States;
