import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

import UserData from "../Organisms/UserData";
import UserServices from "../Organisms/UserServices";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

function Profile() {
  const user = useAuth();
  const [activeTab, setActiveTab] = useState("data"); // "data" or "service"
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      console.log(user);
      navigate("/login", {
        state: {
          from: `/profile`,
          message: "Please log in to continue",
        },
      });
    }
  }, [user, user.token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {/* Profile Section */}
      <div className="flex items-center space-x-2 mb-8">
        <Avatar size={60} icon={<UserOutlined />} />
        <div className="flex justify-center items-center space-x-4">
          <input id="image" type="file" className="hidden" />
          <label
            htmlFor="image"
            className="border border-neutral-950 text-[14px] text-neutral-950 px-2 py-1 rounded hover:bg-neutral-700/10"
          >
            Upload new photo
          </label>
          <button className="text-red-500 text-[14px] hover:underline">
            Delete
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="relative flex border-b mb-4 text-sm font-medium">
        <button
          className={`w-1/2 text-center pb-2 transition-colors duration-300 ${
            activeTab === "data"
              ? "text-blue-800 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("data")}
        >
          Data
        </button>
        <button
          className={`w-1/2 text-center pb-2 transition-colors duration-300 ${
            activeTab === "service"
              ? "text-yellow-700 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("service")}
        >
          Service
        </button>
        {/* Animated underline */}
        <span
          className={`absolute bottom-0 left-0 h-0.5 rounded transition-all duration-300`}
          style={{
            width: "50%",
            background: activeTab === "data" ? "#1e40af" : "#ca8a04", // blue-800 or yellow-700
            transform:
              activeTab === "data" ? "translateX(0%)" : "translateX(100%)",
          }}
        />
      </div>
      <div className="relative min-h-[100px]">
        <TabContent active={activeTab === "data"}>
          {/* Data tab content */}
          <UserData />
        </TabContent>
        <TabContent active={activeTab === "service"}>
          {/* Service tab content */}
          <UserServices />
        </TabContent>
      </div>
    </div>
  );
}

// Fade/slide transition for tab content
function TabContent({ active, children }) {
  return (
    <div
      className={`absolute w-full transition-all duration-300 ${
        active
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 translate-x-4 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

export default Profile;
