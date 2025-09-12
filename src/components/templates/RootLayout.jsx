import {
  Outlet,
  useFetcher,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Navbar from "../Organisms/Navbar";
import Footer from "../Organisms/Footer";
import { useAuth } from "../../store/AuthContext";
import { useEffect } from "react";
import { Roles } from "../../utils/roles";
import ScrollToTop from "../atoms/ScrollToTop";
import Home from "../Organisms/Home";
import serviceBg from "../../assets/images/background.png";
import { useTranslation } from "react-i18next";
import serviceIcon from "../../assets/icons/healthicons_high-bars-outline.svg";

function RootLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  console.log(location);
  const isNavigating = Boolean(navigation.location);
  const fetcher = useFetcher();
  console.log(fetcher, navigation);
  useEffect(() => {
    // console.log(user);
    if (user.token) {
      if (user.role === Roles.Admin) navigate("/admin");
      else if (user.role === Roles.CusomerService) navigate("/support");
    }
  }, [user]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <div className="h-5"></div>
        {location.pathname === "/" && <Home id="#home" />}
        {location.pathname === "/service" && (
          <>
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
                  {t("servicePage.ourServices", "Our Services")}
                </h1>
                <div className="font-barlow font-regular text-sm sm:text-base md:text-lg max-w-[1000px] px-4 sm:px-8 mt-2 sm:mt-3">
                  {t(
                    "servicePage.transformBrand",
                    "Transform your brand with our innovative digital solutions that captivate and engage your audience."
                  )}
                </div>
              </div>
            </div>
            <ul className="bg-[#363636] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-white text-sm md:text-base px-4 sm:px-6 py-4">
              <li className="flex items-center justify-center sm:justify-start gap-3 md:gap-4">
                <img
                  className="w-5 h-5 md:w-6 md:h-6"
                  src={serviceIcon}
                  alt="icon"
                />
                {t("service.bg1")}
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 md:gap-4">
                <img
                  className="w-5 h-5 md:w-6 md:h-6"
                  src={serviceIcon}
                  alt="icon"
                />
                {t("service.bg2")}
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 md:gap-4">
                <img
                  className="w-5 h-5 md:w-6 md:h-6"
                  src={serviceIcon}
                  alt="icon"
                />
                {t("service.bg3")}
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 md:gap-4">
                <img
                  className="w-5 h-5 md:w-6 md:h-6"
                  src={serviceIcon}
                  alt="icon"
                />
                {t("service.bg4")}
              </li>
            </ul>
          </>
        )}
        <div className="container max-w-[1360px] m-auto mt-[35px] space-y-[35px]">
          <Outlet />
        </div>
        <div className="h-5"></div>
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
