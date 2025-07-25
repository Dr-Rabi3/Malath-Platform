import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, theme } from "antd";
import lightLogo from "../../assets/icons/light-logo.svg";
import location from "../../assets/icons/location.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import mobile from "../../assets/icons/mobile.svg";
import darkLogo from "../../assets/icons/dark-logo.svg";
import logout from "../../assets/icons/logout.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import { useAuth } from "../../store/AuthContext";
import { Earth } from "../../assets/icons/Earth.jsx";
import NotificationDropdown from "../Organisms/NotificationDropdown";
import { useNotification } from "../../hooks/useNotification";
import ScrollToTop from "../atoms/ScrollToTop.jsx";

const { Header, Sider, Content, Footer } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  // scrollbarWidth: "thin",
  // scrollbarGutter: "stable",
};

function SupportLayout() {
  const { logout: Logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Initialize real-time notifications
  const { contextHolder: notificationContextHolder } = useNotification();

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    // optionally, store user language
    localStorage.setItem("lang", lng);
  };
  return (
    <>
      <ScrollToTop />
      {notificationContextHolder}
      <style>
        {`
        .ant-layout-sider-collapsed {
          flex: 0 0 60px !important;
          max-width: 60px !important;
          min-width: 60px !important;
          width: 60px !important;
        }
        .ant-menu ant-menu-root{
          position: relative !important;
        }
        .ant-menu-item-selected {
          background: #3B307D !important;
          box-shadow: 0px 0px 8px 2px #2525258f !important;
          }
        [data-menu-id$="-3"].ant-menu-item{
          position: absolute !important;
          bottom:0px !important;
        }
        `}
      </style>
      <Layout hasSider className="min-h-screen">
        <Sider
          style={siderStyle}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="bg-[#211A4D]"
        >
          <div className="demo-logo-vertical" />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "20px",
              width: 60,
              color: "#fff",
              height: 64,
              transform: "rotateY(180deg)",
            }}
          />
          <Menu
            theme="dark"
            className="bg-[#211A4D]"
            mode="inline"
            style={{ background: "#211A4D" }}
            defaultSelectedKeys={["1"]}
            onSelect={(value) => {
              if (value.key === "4") {
                handleLogout();
                return null;
              } else if (value.key === "3") {
                localStorage.getItem("lang") === "en" ||
                !localStorage.getItem("lang")
                  ? changeLanguage("ar")
                  : changeLanguage("en");
                window.location.reload();
              } else if (value.key === "1") {
                navigate("/support");
              } else if (value.key === "2") {
                navigate("/support/settings");
              }
            }}
            items={[
              {
                key: "1",
                icon: (
                  <img src={dashboard} alt="dashboard icon" className="w-5" />
                ),
                label: t("sidebar.dashboard"),
              },
              {
                key: "2",
                icon: <SettingOutlined />,
                label: t("sidebar.settings"),
              },
              {
                key: "3",
                icon: <Earth color="#ddd" className="w-5 text-[#fff]/50" />,
                label: `Translate to ${
                  localStorage.getItem("lang") === "en" ||
                  !localStorage.getItem("lang")
                    ? "arabic"
                    : "english"
                }`,
              },
              {
                key: "4",
                icon: <img src={logout} alt="logout icon" className="w-5" />,
                label: t("sidebar.logout"),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 15px 0px 0px",
              backgroundColor: "#FBFBF3",
            }}
            className="shadow-custom-gray flex justify-between"
          >
            <div className="flex">
              <img src={darkLogo} alt="logo" />
              <h2 className="text=base font-semibold text-[18px] font-main">
                Malath
              </h2>
            </div>
            <div className="flex gap-5 justify-center items-center">
              <NotificationDropdown />
              <button
                className="m-auto flex justify-between items-center bg-neutral-1000 rounded-full p-1"
                onClick={handleLogout}
              >
                <img src={logout} alt="logout icon" className="w-5" />
              </button>
              <div
                type="button"
                className="relative flex rounded-full text-sm items-center gap-2"
                id="user-menu-button"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>

                <Link to="/profile">
                  <Avatar
                    size={28}
                    icon={<UserOutlined />}
                    className="bg-brand-600"
                  />
                </Link>
                <div className="hidden sm:block bg-neutral-1000 text-white px-2 py-1 rounded-full">
                  Malath Support
                </div>
              </div>
            </div>
          </Header>
          <Content
            className="container max-w-screen m-auto space-y-[35px]"
            style={{
              padding: "15px 25px",
            }}
          >
            <Outlet />
          </Content>
          <Footer
            className="bg-[#211A4D] text-white flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-0 px-4 py-6 md:py-2"
            style={{ padding: undefined }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
              <div className="text-white flex items-center">
                <img
                  src={lightLogo}
                  alt="logo"
                  className="w-[40px] md:w-[50px]"
                />
                <h1 className="font-bold text-[14px] md:text-[12px]">
                  <span className="text-brand-600">Mala</span>th
                </h1>
              </div>

              <div className="ml-0 sm:ml-2 text-xs text-gray-500 space-x-3">
                <p className="mb-1 max-w-xs text-[#D3D4DC]/50 text-[12px] md:text-[13px]">
                  {t("footer.slogan")}
                </p>
                <p className="text-xs text-gray-500 text-[11px] md:text-[12px]">
                  {t("footer.copyright")}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <p className="mb-1 font-medium text-[#fff]/50 text-[15px] md:text-[15px]">
                {t("footer.contact")}
              </p>
              <ul className="flex flex-col sm:flex-row items-start sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC]/50 flex items-center gap-2 md:gap-3"
                  >
                    <img src={email} alt="" className="opacity-50 w-4 md:w-5" />
                    <p className="m-0 text-[12px] md:text-[14px]">
                      {t("footer.email")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC]/50 flex items-center gap-2 md:gap-3"
                  >
                    <img src={phone} alt="" className="opacity-50 w-4 md:w-5" />
                    <p className="m-0 text-[12px] md:text-[14px]">
                      {t("footer.phone")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#D3D4DC]/50 flex items-center gap-2 md:gap-3"
                  >
                    <img
                      src={mobile}
                      alt=""
                      className="opacity-50 w-4 md:w-5"
                    />
                    <p className="m-0 text-[12px] md:text-[14px]">
                      {t("footer.mobile")}
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default SupportLayout;
