import RegisterForm from "../Organisms/RegisterFrom";
import photo from "../../assets/images/Rectangle 23.png";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="container max-w-[1100px] bg-accent-25 flex flex-col md:flex-row p-4 md:p-10 justify-between items-center shadow-md gap-5 md:gap-10 w-full">
        <RegisterForm className="w-full" />
        <div className="relative w-full h-full">
          <img
            src={photo}
            alt="register photo"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto hidden md:block self-center"
          />
          <div
            className="absolute bg-white/30 backdrop-blur-[1px] w-[80%] h-[80%] top-[50%] left-[50%] rounded-[20px] text-white text-[25px] flex justify-center items-center flex-col font-thin space-y-5 px-8"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              {t("login.heroText1")}
            </div>
            <div style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              <span className="text-[#000]">
                Mala<span className="text-[#BA9258]">th</span>
              </span>{" "}
              {t("login.heroText2")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
