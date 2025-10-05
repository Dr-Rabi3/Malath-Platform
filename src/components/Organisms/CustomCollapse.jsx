import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import image from "../../assets/icons/service.svg";
import serviceIcon from "../../assets/icons/carbon_development.svg";
import Button from "../atoms/Button";
import { message } from "antd";
import { useAuth } from "../../store/AuthContext";
import { Roles } from "../../utils/roles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CustomCollapse({ services }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHelper] = message.useMessage();
  const { user } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if screen is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {contextHelper}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services?.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={service.categoryId}
                className="relative rounded-[20px] overflow-hidden group w-full"
                onClick={() => {
                  if (isMobile) {
                    setOpenIndex(isOpen ? null : index);
                  }
                }}
              >
                {/* Media box */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] cursor-pointer">
                  <img
                    src={
                      service.categoryPhoto
                        ? `${
                            import.meta.env.VITE_API_BASE_URL
                          }api/General/download?filePath=${
                            service.categoryPhoto
                          }`
                        : image
                    }
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay at bottom */}
                  <div className="absolute bottom-0 w-full bg-[#D9D9D9]/50 backdrop-blur-[50px] px-4 sm:px-5 text-[18px] sm:text-[20px] md:text-[22px] py-3 sm:py-4 flex items-center gap-4 sm:gap-5">
                    <div className="w-10 sm:w-12 aspect-square p-2 flex justify-center items-center rounded-full bg-[#F9F8F5]">
                      <img src={serviceIcon} alt="" className="w-full h-full" />
                    </div>
                    {service.categoryName}
                  </div>
                </div>

                {/* Description overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isMobile
                      ? isOpen
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 40 }
                      : { opacity: 0, y: 40 }
                  }
                  whileHover={!isMobile ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-[#EAC482] rounded-2xl !p-4 !sm:p-5 shadow-lg overflow-auto custom-scrollbar"
                >
                  <div className="flex items-start gap-2 text-base sm:text-lg font-semibold text-white mb-2">
                    <div className="w-10 sm:w-12 p-2 aspect-square flex justify-center items-center rounded-full bg-[#F9F8F5]">
                      <img src={serviceIcon} alt="" className="w-full h-full" />
                    </div>
                    <div className="text-[18px] sm:text-[22px] md:text-[25px] m-0">
                      <div>{service.categoryName}</div>
                      {user.role !== Roles.Admin && (
                        <>
                          <Button
                            className="bg-white !text-[#EAC482] px-4 py-2 mb-5 rounded-md font-medium hover:bg-gray-100 transition"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent closing overlay
                              if (!user?.token) {
                                messageApi.open({
                                  type: "warning",
                                  content: t("please_login_first"),
                                });
                                return;
                              }
                              navigate("../add-service");
                            }}
                          >
                            {t("service_request")}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <ul className="max-h-[55%] sm:max-h-[60%] list-disc text-white/90 text-[12px] sm:text-[16px] md:text-[18px] mb-4 px-6">
                    {service?.services.map((s, idx) => (
                      <li key={idx} >
                        {s.name}
                        <p className="mt-1 text-[12px] sm:text-[13px] opacity-90 leading-normal">
                          {s.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CustomCollapse;
