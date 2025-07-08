import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import avatar from "../../assets/images/1560a64114a9372e.jpg"; // replace with your avatar image
import { getDurationFromNow } from "../../utils/timeAge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  Accepted: "bg-green-100 text-green-700",
  Pending: "bg-purple-100 text-purple-700",
  New: "bg-yellow-100 text-yellow-700",
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
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = localStorage.getItem("lang") || "en";

  return (
    <div
      className="border rounded-xl p-4 mb-4 shadow-sm bg-accent-25 relative"
      {...props}
    >
      {/* Top status badge */}
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
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p className="m-0 font-semibold text-sm">{name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="text-xs">
            <span className="font-semibold"> {t("contact.phone")}: </span>{" "}
            +201030666109
          </div>
          <div className="text-xs">
            <span className="font-semibold">{t("contact.mobile")}: </span>{" "}
            +201030666109
          </div>
          <div className="text-xs">
            <span className="font-semibold">{t("contact.email")}: </span>{" "}
            abdalrazekmohmed6@gmail.com
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">{category}</p>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <div
        className="text-sm text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-400">
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
        {!isAdmin && <ActionButtons status={status} />}
      </div>
    </div>
  );
};

export default Card;
