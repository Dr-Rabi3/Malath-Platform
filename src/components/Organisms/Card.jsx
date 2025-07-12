import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { getDurationFromNow } from "../../utils/timeAge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import { getFile } from "../../api/http";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const STATUS_STYLES = {
  Contact: "bg-green-100 text-green-700",
  Pending: "bg-purple-100 text-purple-700",
  Resolve: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const ActionButtons = ({ status }) => {
  if (status === "New" || status === "Reviewing") {
    return (
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button className="text-red-500 hover:underline">Reject</button>
        <button
          className={`${
            status === "Reviewing" ? "text-green-600" : "text-purple-600"
          } hover:underline`}
        >
          {status === "New" ? "Reviewing" : "Complete"}
        </button>
      </div>
    );
  }
  return null;
};

const Card = ({
  status,
  name,
  category,
  title,
  description,
  timestamp,
  isAdmin,
  user,
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang") || "en";
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchAvatar = async () => {
      if (user?.profilePicture) {
        try {
          const blob = await getFile(user.profilePicture);
          const url = URL.createObjectURL(blob);
          if (isMounted) setAvatarUrl(url);
        } catch {
          if (isMounted) setAvatarUrl(null);
        }
      } else {
        setAvatarUrl(null);
      }
    };
    fetchAvatar();
    return () => {
      isMounted = false;
    };
  }, [user?.profilePicture]);

  return (
    <div
      className="border rounded-xl p-4 mb-4 shadow-sm bg-accent-25"
      {...props}
    >
      <div className=" flex flex-col md:flex-row gap-6">
        {/* Top status badge */}
        {/* Left: User &  Service Info */}
        <div className="relative md:w-1/2 w-full border-b md:border-b-0 md:border-r border-[#6F6E6E]/20 pr-0 md:pr-6 pb-4 md:pb-0 flex-shrink-0">
          <div
            className={`absolute top-2 ${
              lang === "en" ? "right-2" : "left-2"
            } text-sm px-3 py-1 font-medium capitalize w-fit h-fit whitespace-nowrap text-xs font-semibold transition-all duration-300 ease-in-out z-10`}
          >
            <span className={`px-2 py-1 rounded-md ${STATUS_STYLES[status]}`}>
              {status}
            </span>
          </div>
          {/* User Info */}
          <div className="border-b pb-1 border-[#6F6E6E]/50 mb-1">
            <div className="flex items-center mb-2 gap-2">
              <Avatar
                size={28}
                src={avatarUrl}
                icon={<UserOutlined />}
                className="bg-brand-600"
              />
              {/* <img
                src={avatarUrl}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              /> */}
              <div>
                <p className="m-0 font-semibold text-sm">{user?.fullName}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="text-xs">
                <span className="font-semibold">{t("card.phone")}: </span>{" "}
                {user?.mobileNumber}
              </div>
              <div className="text-xs">
                <span className="font-semibold">{t("card.whatsapp")}: </span>{" "}
                {user?.whatsappNumber}
              </div>
              <div className="text-xs">
                <span className="font-semibold">{t("card.email")}: </span>{" "}
                {user?.email}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
          {/* Footer */}
          {/* <div className="flex justify-between items-center text-xs text-gray-400 mt-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-regular text-[#727272]">
                {getDurationFromNow(timestamp)}
              </span>
              <svg
                width="15"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2693 11C19.2693 15.777 15.3924 19.6539 10.6154 19.6539C5.8384 19.6539 1.96143 15.777 1.96143 11C1.96143 6.22298 5.8384 2.34601 10.6154 2.34601C15.3924 2.34601 19.2693 6.22298 19.2693 11Z"
                  stroke="#727272"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.8257 13.752L11.143 12.151C10.6757 11.8741 10.2949 11.2077 10.2949 10.6625V7.11438"
                  stroke="#727272"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div> */}
        </div>
        {/* Right: Description (Editor) */}
        <div className="md:w-1/2 w-full flex flex-col justify-start">
          <Editor content={description} readOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default Card;
