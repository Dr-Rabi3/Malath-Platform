import lightLogo from "../../assets/icons/light-logo.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import mobile from "../../assets/icons/mobile.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
  faTiktok,
  faLinkedin,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Tooltip } from "antd";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-neutral-1000"
      style={{ borderRadius: " 60px 60px 0px 0px" }}
    >
      <div className="mx-auto max-w-[1350px] space-y-8 px-4 py-10 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
          <div>
            <div className="text-white flex items-center gap-3">
              <img
                src={lightLogo}
                alt="logo"
                className="w-[64px] sm:w-[72px] lg:w-[80px] h-auto"
              />
              <h1 className="font-bold text-[18px] sm:text-[20px] lg:text-[22px]">
                <span className="text-brand-600">Mala</span>th
              </h1>
            </div>

            <p className="mt-3 sm:mt-4 max-w-md text-[#D3D4DC] text-sm sm:text-[15px]">
              {" "}
              {t("footer.slogan")}
            </p>
            <div className="text-[11px] sm:text-xs text-gray-500 mt-2">
              <p className="text-[11px] sm:text-xs text-gray-500">
                {t("footer.copyright")}
              </p>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-wrap gap-8 lg:gap-10">
            <div>
              <p className="font-medium text-[#fff] text-[14px] sm:text-[15px]">
                {t("footer.services")}
              </p>

              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-[#D3D4DC] hover:text-brand-600 transition-colors"
                  >
                    {t("footer.main")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="text-[#D3D4DC] hover:text-brand-600 transition-colors"
                  >
                    {t("footer.blogs")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-[#D3D4DC] hover:text-brand-600 transition-colors"
                  >
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service"
                    className="text-[#D3D4DC] hover:text-brand-600 transition-colors"
                  >
                    {t("nav.services")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-[#fff] text-[14px] sm:text-[15px]">
                {t("footer.contact")}
              </p>

              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-2 sm:gap-3"
                  >
                    <img
                      src={location}
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />{" "}
                    <p className="m-0 text-sm sm:text-[15px] break-words">
                      {t("footer.address")}
                    </p>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:khedaib@malathegypt.com"
                    className="m-0 text-[#D3D4DC] flex items-center gap-2 sm:gap-3 hover:text-brand-600 transition-colors duration-200"
                  >
                    <img src={email} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                    <p className="m-0 text-sm sm:text-[15px] break-all">
                      {t("footer.email")}
                    </p>
                  </a>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-2 sm:gap-3"
                  >
                    <img src={phone} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                    <p className="m-0 text-sm sm:text-[15px]">
                      {" "}
                      {t("footer.phone")}
                    </p>
                  </Link>
                </li>
                <li>
                  <div className="text-[#D3D4DC] flex items-center gap-2 sm:gap-3">
                    <img
                      src={mobile}
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <p className="m-0 text-sm sm:text-[15px] flex space-x-1">
                      <p className="m-0">{t("footer.mobile")}</p>
                      <a
                        href="https://wa.me/01067661338"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-600 transition-colors duration-200"
                      >
                        01067661338
                      </a>

                      <a
                        href="https://wa.me/01033056559"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-600 transition-colors duration-200"
                      >
                        01033056559
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="text-[#D3D4DC] flex items-center gap-2 sm:gap-3">
                    <img
                      src={mobile}
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />{" "}
                    <p className="m-0 text-sm sm:text-[15px] flex items-center gap-2">
                      {t("footer.mobile")}
                      <a
                        href="https://wa.me/+966549909990"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-600 transition-colors duration-200"
                      >
                        +966549909990
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Social Media Column */}
            <div>
              <p className="font-medium text-[#fff] text-[14px] sm:text-[15px]">
                {t("footer.social")}
              </p>
              <ul className="mt-4 text-sm flex gap-5">
                <li>
                  <a
                    href="https://www.facebook.com/Malath.Marketing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faSquareFacebook} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/malath.sa.eg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/%D9%85%D9%84%D8%A7%D8%B0-malath/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                  </a>
                </li>
                <li>
                  <Tooltip title={t("footer.soon")}>
                    {/* <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200"
                    > */}
                    <p className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200">
                      <FontAwesomeIcon icon={faTiktok} size="lg" />{" "}
                    </p>
                    {/* </a> */}
                  </Tooltip>
                </li>
                <li>
                  <a
                    href="https://x.com/MalathOutsource"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D3D4DC] flex items-center gap-2 hover:text-brand-600 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faXTwitter} size="lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1D1D1D] h-[48px] sm:h-[56px] md:h-[60px]"></div>
    </footer>
  );
}

export default Footer;
