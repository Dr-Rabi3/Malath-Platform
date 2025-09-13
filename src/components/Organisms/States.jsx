import { useTranslation } from "react-i18next";

function States() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-2xl sm:text-3xl">2500+</div>
        <div className="text-xs sm:text-sm text-[#646A69] font-thin">
          {t("states.projectCount")}
        </div>
      </div>
      {/* <div className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                {t("states.sustainabilityCommitment")}
              </div> */}

      <div>
        <div className="text-2xl sm:text-3xl">1000+</div>
        <div className="text-xs sm:text-sm text-[#646A69] font-thin">
          {t("states.customersServed")}
        </div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl">5+</div>
        <div className="text-xs sm:text-sm text-[#646A69] font-thin">
          {t("states.yearsExperienceText")}
        </div>
      </div>
    </div>
  );
}

export default States;
