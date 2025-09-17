import LoginFrom from "../Organisms/LoginFrom";
import photo from "../../assets/images/Rectangle 23.png";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../store/AuthContext";
import { Roles } from "../../utils/roles";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const user = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, message: loginAlert } = location.state || {};
  useEffect(() => {
    if (from) {
      messageApi.open({ type: "warning", content: loginAlert });
    }
    if (user.token) {
      if (from) navigate(from);
      else if (user.role === Roles.Admin) navigate("/admin/dashboard");
      else if (user.role === Roles.CusomerService) navigate("/admin/dashboard");
      else navigate("/");
    }
  }, [user, from, loginAlert, navigate]);
  return (
    <>
      {/* {contextHolder} */}
      <div className="h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="container max-w-[900px] bg-accent-25 flex flex-col md:flex-row p-4 md:p-10 justify-between shadow-md gap-5 md:gap-10 w-full">
          <LoginFrom className="w-full" />
          <div className="relative w-full hidden md:block">
            <img
              src={photo}
              alt="login photo"
              className="w-full max-w-xs md:max-w-md max-h-[600px] lg:max-w-lg hidden md:block self-center"
            />
            <div
              className="absolute bg-[#E0D4C2]/30 backdrop-blur-[1px] w-[80%] h-[80%] top-[50%] left-[50%] rounded-[20px] text-white text-[25px] flex justify-center items-center flex-col font-thin space-y-5 px-8"
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
    </>
  );
}

export default Login;
