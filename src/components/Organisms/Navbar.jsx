import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import earth from "../../assets/icons/earth.svg";
import darkLogo from "../../assets/icons/dark-logo.svg";
import logout from "../../assets/icons/logout.svg";

const list = [
  {
    name: "Home",
    link: "/",
    hash: "home",
  },
  { name: "Blog", link: "/blogs", hash: "blogs" },
  {
    name: "Our Services",
    link: "/service",
    hash: "service",
  },
  {
    name: "About us",
    link: "/about",
    hash: "about",
  },
  { name: "Contact us", link: "/contact", hash: "contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const location = useLocation();
  const [activePath, setActivePath] = useState(
    location.pathname.substring(1) || "home"
  );
  // console.log(location);
  // console.log(activePath);
  useEffect(() => {
    setActivePath(location.pathname.substring(1) || "home");
  }, [location.pathname]);

  return (
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
              <h2 className="text-neutral-1000 m-0">Malath</h2>
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
            <button className="flex justify-between items-center bg-neutral-1000 rounded-full p-1">
              <img src={logout} alt="logout icon" className="w-5" />
            </button>
            <img src={earth} alt="icon" />

            {/* Profile dropdown */}
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
                  icon={<UserOutlined />}
                  className="bg-brand-600"
                />
                </Link>
                <div className="hidden sm:block">Mohamed abdalrazek</div>
              </div>
            </div>
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
                  to={"#" + item.hash}
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
  );
}
