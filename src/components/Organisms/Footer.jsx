import lightLogo from "../../assets/icons/light-logo.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import mobile from "../../assets/icons/mobile.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-neutral-1000"
      style={{ borderRadius: " 60px 60px 0px 0px" }}
    >
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-white flex items-center">
              <img src={lightLogo} alt="logo" className="w-[80px]" />
              <h1 className="font-bold text-[22px]">
                <span className="text-brand-600">Mala</span>th
              </h1>
            </div>

            <p className="mt-4 max-w-xs text-[#D3D4DC]">
              {" "}
              {t("footer.slogan")}
            </p>
            <div className="text-xs text-gray-500">
              <p className="text-xs text-gray-500">{t("footer.copyright")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2">
            <div>
              <p className="font-medium text-[#fff] text-[15px]">
                {t("footer.services")}
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link to="/" className="text-[#D3D4DC] hover:opacity-75">
                    {t("footer.main")}
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="text-[#D3D4DC] hover:opacity-75">
                    {t("footer.blogs")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-[#D3D4DC] hover:opacity-75">
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service"
                    className="text-[#D3D4DC] hover:opacity-75"
                  >
                    {t("nav.services")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-[#fff] text-[15px]">
                {t("footer.contact")}
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-3"
                  >
                    <img src={location} alt="" /> <p>{t("footer.address")}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-3"
                  >
                    <img src={email} alt="" /> <p>{t("footer.email")}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-3"
                  >
                    <img src={phone} alt="" /> <p>{t("footer.phone")}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC] flex items-center gap-3"
                  >
                    <img src={mobile} alt="" /> <p>{t("footer.mobile")}</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#191538] h-[60px]"></div>
    </footer>
  );
}

export default Footer;
