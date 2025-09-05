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
          <div className="relative min-h-[360px] overflow-hidden">
            <div className="absolute h-[360px] w-full z-[-1] bg-gradient-to-r from-[#BA9258] to-[#C9BFB1]">
              <img
                src={serviceBg}
                alt=""
                className="absolute h-full z-[-1] transparent-bg opacity-25"
              />
            </div>
            <div className="z-[10] p-2 w-full h-[360px] flex flex-col justify-center items-center select-none">
              <h1 className="font-barlow font-semibold text-[50px]">
                {t("servicePage.ourServices", "Our Services")}
              </h1>
              <div className="font-barlow font-regular text-[20px]">
                {t(
                  "servicePage.transformBrand",
                  "Transform your brand with our innovative digital solutions that captivate and engage your audience."
                )}
              </div>
            </div>
            <ul className="bg-[#363636] w-full justify-between flex flex-wrap text-white text-[15px] md:text-[20px] px-5 py-5">
              <li className="flex items-center gap-5">
                <img src={serviceIcon} alt="icon" />
                {t("service.bg1")}
              </li>
              <li className="flex items-center gap-5">
                <img src={serviceIcon} alt="icon" />
                {t("service.bg2")}
              </li>
              <li className="flex items-center gap-5">
                <img src={serviceIcon} alt="icon" />
                {t("service.bg3")}
              </li>
              <li className="flex items-center gap-5">
                <img src={serviceIcon} alt="icon" />
                {t("service.bg4")}
              </li>
            </ul>
          </div>
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
