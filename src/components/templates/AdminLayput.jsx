import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
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

import { Earth } from "../../assets/icons/Earth.jsx";
import { Service } from "../../assets/icons/Service";
import { Edit } from "../../assets/icons/Edit";
import { ElementPlus } from "../../assets/icons/ElementPlus";
import { Setting } from "../../assets/icons/Setting";
import { useAuth } from "../../store/AuthContext";
import { AddUser } from "../../assets/icons/AddUser.jsx";
import { SliderIcon } from "../../assets/icons/SliderIcon.jsx";
import NotificationDropdown from "../Organisms/NotificationDropdown";
import { useNotification } from "../../hooks/useNotification";
import { AddQuestionIcon } from "../../assets/icons/AddQuestionIcon.jsx";
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

function AdminLayout() {
  const { logout: Logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");
  const location = useLocation();

  // Initialize real-time notifications
  const { contextHolder: notificationContextHolder } = useNotification();

  useEffect(() => {
    const page = location.pathname.split("/").filter(Boolean).pop();
    const { from } = location.state || {};
    if (location.pathname.includes("admin-service") || from === "admin-service")
      setActiveKey("2");
    else if (location.pathname.includes("blog")) setActiveKey("3");
    else if (location.pathname.includes("add-service")) setActiveKey("4");
    else if (location.pathname.includes("add-user")) setActiveKey("5");
    else if (location.pathname.includes("setting")) setActiveKey("6");
    else if (location.pathname.includes("slider")) setActiveKey("7");
    else if (location.pathname.includes("add-question")) setActiveKey("8");
    else setActiveKey("1");
  }, [location, location.pathname, location.state]);

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  // console.log(value);
  //             if (value.key === "3") {
  //               handleLogout();
  //               return null;
  //             } else if (value.key === "2") {
  //               localStorage.getItem("lang") === "en" ||
  //               !localStorage.getItem("lang")
  //                 ? changeLanguage("ar")
  //                 : changeLanguage("en");
  //             } else if (value.key === "1") {
  //               navigate("/support/dashboard");
  //             }
  //           }}
  const items = [
    {
      key: "1",
      icon: <img src={dashboard} alt="dashboard icon" className="w-5" />,
      label: t("sidebar.dashboard", "Dashboard"),
      onClick: () => navigate("/admin"),
    },
    {
      key: "2",
      icon: <Service className="w-5 p-0 text-[#fff]/50" />,
      label: t("sidebar.services", "Requests"),
      onClick: () => navigate("/admin/admin-service"),
    },
    {
      key: "3",
      icon: <Edit className="w-5 p-0 text-[#fff]/50" />,
      label: t("sidebar.blogs", "Blogs"),
      onClick: () => navigate("/admin/blog"),
    },
    {
      key: "4",
      icon: <ElementPlus className="w-5 p-0 text-[#fff]/50" />,
      label: t("sidebar.addService", "Add service"),
      onClick: () => navigate("/admin/add-service"),
    },
    {
      key: "5",
      icon: <AddUser color="#ddd" className="w-5 p-0 !text-[#fff]/50" />,
      label: t("sidebar.addUser", "Add user"),
      onClick: () => navigate("/admin/add-user"),
    },
    {
      key: "6",
      icon: <Setting className="w-5 p-0 text-[#fff]/50" />,
      label: t("setting", "Setting"),
      onClick: () => navigate("/admin/setting"),
    },
    {
      key: "7",
      icon: <SliderIcon color="#ddd" className="w-5 p-0 text-[#fff]/50" />,
      label: t("slider", "Slider"),
      onClick: () => navigate("/admin/slider"),
    },
    {
      key: "8",
      icon: <AddQuestionIcon color="#ddd" className="w-5 p-0 text-[#fff]/50" />,
      label: t("addQuestions"),
      onClick: () => navigate("/admin/add-question"),
    },
    {
      key: "9",
      icon: <Earth color="#ddd" className="w-5 p-0 text-[#fff]/50" />,
      label: `Translate to ${
        localStorage.getItem("lang") === "en" || !localStorage.getItem("lang")
          ? "arabic"
          : "english"
      }`,
      onClick: () => {
        if (localStorage.getItem("lang") == "ar") {
          changeLanguage("en");
        } else {
          changeLanguage("ar");
        }
        window.location.reload();
      },
    },

    {
      key: "10",
      icon: <img src={logout} alt="logout icon" className="w-5" />,
      label: t("sidebar.logout", "Logout"),
      onClick: () => {
        Logout();
        navigate("/");
      },
    },
  ];

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
          background: #4D4D4D !important;
          box-shadow: 0px 0px 8px 2px #2525258f !important;
          }
        .ant-menu-item-selected > svg{
          position: absolute;
          top: 50%;
          // left: 25px;
          transform: translateY(-50%);
        }
        .ant-menu-item-selected > span {
          margin-left: 30px !important;
        }
        [data-menu-id$="-${items.length}"].ant-menu-item{
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
          className="bg-[#1D1D1D]"
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
            className="bg-[#1D1D1D]"
            mode="inline"
            style={{ background: "#1D1D1D" }}
            selectedKeys={[activeKey]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 15px 0px 15px",
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
              <NotificationDropdown link="/admin/admin-service" />
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
                  {user.name}
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
            className="bg-[#1D1D1D] text-white flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-0 px-4 py-6 md:py-2"
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

export default AdminLayout;
