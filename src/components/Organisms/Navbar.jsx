import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import earth from "../../assets/icons/earth.jsx";
import darkLogo from "../../assets/icons/dark-logo.svg";
import logout from "../../assets/icons/logout.svg";
import Button from "../atoms/Button";
import login from "../../assets/icons/login.svg";
import { useTranslation } from "react-i18next";
import { Earth } from "../../assets/icons/Earth.jsx";
import { useAuth } from "../../store/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getFile } from "../../api/http.js";
import NotificationDropdown from "./NotificationDropdown";
import { useNotification } from "../../hooks/useNotification";

export default function Navbar() {
  const { user, logout: Logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  // Initialize real-time notifications
  const { contextHolder: notificationContextHolder } = useNotification();

  const list = [
    { name: t("nav.home"), link: "/", hash: "home" },
    { name: t("nav.blog"), link: "/blogs", hash: "blogs" },
    { name: t("nav.services"), link: "/service", hash: "service" },
    { name: t("nav.about"), link: "/about", hash: "about" },
    { name: t("nav.contact"), link: "/contact", hash: "contact" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const location = useLocation();
  const [activePath, setActivePath] = useState(
    location.pathname.substring(1) || "home"
  );
  // console.log(user);
  useEffect(() => {
    setActivePath(location.pathname.substring(1) || "home");
  }, [location.pathname]);

  const { data: profileImageBlob } = useQuery({
    queryKey: ["profileImage", user?.profileImageUrl],
    queryFn: () => getFile(user?.profileImageUrl),
    enabled: !!user?.profileImageUrl,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Create image URL from blob when profile image is fetched
  // console.log(user);
  useEffect(() => {
    if (profileImageBlob) {
      const imageUrl = URL.createObjectURL(profileImageBlob);
      setProfileImageUrl(imageUrl);

      // Cleanup function to revoke the URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [profileImageBlob]);

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

  const handleLogout = () => {
    Logout();
  };
  return (
    <>
      {notificationContextHolder}
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between pt-5">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-950"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                {/* Icon when menu is closed */}
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                {/* Icon when menu is open */}
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} size-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Logo + desktop menu */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  className="w-10 w-auto"
                  src={darkLogo}
                  alt="Malath Company"
                />
                <h2 className="hidden sm:block text-neutral-1000 m-0">
                  Malath
                </h2>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 h-full justify-center items-center">
                  {list.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={item.link}
                        className={`hover:text-brand-600 rounded-md px-3 py-2 text-[16px] font-semibold ${
                          item.hash == activePath ? "text-brand-600" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Notifications & profile */}

            <div className="absolute inset-y-0 space-x-2 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user.userId && <NotificationDropdown />}
              {user.userId && (
                <button
                  className="flex justify-between items-center bg-neutral-1000 rounded-full p-1"
                  onClick={handleLogout}
                >
                  <img src={logout} alt="logout icon" className="w-5" />
                </button>
              )}
              <Tooltip
                title={`Translate to ${
                  localStorage.getItem("lang") === "en" ||
                  !localStorage.getItem("lang")
                    ? "arabic"
                    : "english"
                }`}
              >
                <button
                  onClick={() =>
                    localStorage.getItem("lang") === "en" ||
                    !localStorage.getItem("lang")
                      ? changeLanguage("ar")
                      : changeLanguage("en")
                  }
                >
                  {/* <img src={earth} alt="icon" /> */}
                  <Earth />
                </button>
              </Tooltip>

              {!user.userId && (
                <Button
                  className="bg-neutral-950 py-1 flex gap-2 font-semibold hover:bg-neutral-700"
                  onClick={() => navigate("/login")}
                >
                  <img src={login} alt="icon" className="w-4" />{" "}
                  {t("form.action.login")}
                </Button>
              )}
              {/* Profile dropdown */}
              {user.userId && (
                <div className="relative ml-3">
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
                        src={profileImageUrl}
                        icon={<UserOutlined />}
                        className="bg-brand-600"
                      />
                    </Link>
                    <div className="hidden sm:block">{user?.name}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="bg-accent-25 px-2 pt-2 pb-3">
              {list.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.link}
                    className={`block px-3 py-2 text-base font-semibold hover:text-brand-600 ${
                      item.hash == activePath ? "text-brand-600" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
