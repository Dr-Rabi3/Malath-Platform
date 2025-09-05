import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import image from "../../assets/icons/service.svg";
import serviceIcon from "../../assets/icons/carbon_development.svg";
import Button from "../atoms/Button";
import { message } from "antd";
import { useAuth } from "../../store/AuthContext";
import { Roles } from "../../utils/roles";
function CustomCollapse({ services }) {
  const { t, i18n } = useTranslation();
  const [messageApi, contextHelper] = message.useMessage();
  const { user } = useAuth();

  // Calculate flex basis based on total number of services
  const getFlexBasis = () => {
    if (services?.length === 1) {
      return "100%"; // Single card takes full width
    } else if (services?.length === 2) {
      return "calc(50% - 12.5px)"; // Two cards take half width with gap
    } else {
      return "calc(33.333% - 16.67px)"; // Three or more cards with gap
    }
  };
  console.log(services);
  return (
    <>
      {contextHelper}
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-5">
          {services?.map((service, index) => (
            <div
              key={service.categoryId}
              className="relative flex rounded-[20px] justify-center gap-6 group"
            >
              {/* Left box */}
              <div className="relative w-[400px] h-[300px] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={
                    service.categoryPhoto
                      ? `${
                          import.meta.env.VITE_API_BASE_URL
                        }api/General/download?filePath=${service.categoryPhoto}`
                      : image
                  }
                  className="w-full h-full object-cover"
                />

                {/* Overlay at bottom */}
                <div className="absolute bottom-0 w-full bg-[#D9D9D9]/50 backdrop-blur-[50px] px-5 text-[22px] py-4 flex items-center gap-5">
                  <div className="w-12 h-12 p-2 flex justify-center items-center rounded-full bg-[#F9F8F5]">
                    <img src={serviceIcon} alt="" className="w-full h-full" />
                  </div>
                  {service.categoryName}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full h-full
               bg-[#EAC482] rounded-2xl p-5 
               shadow-lg overflow-hidden"
              >
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
                  <div className="w-12 h-12 p-2 flex justify-center items-center rounded-full bg-[#F9F8F5]">
                    <img src={serviceIcon} alt="" className="w-full h-full" />
                  </div>
                  <h1 className="text-[30px] m-0">{service.categoryName}</h1>
                </h3>
                <ul className="max-h-full list-disc list-inside text-white/90 text-[20px] mb-4 overflow-auto">
                  {service?.services.map((s, idx) => (
                    <li key={idx}>
                      {s.name}
                      <p>{s.description}</p>
                    </li>
                  ))}
                </ul>
                {user.role !== Roles.Admin && (
                  <Button
                    className="bg-white !text-[#EAC482] px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
                    onClick={() => {
                      if (!user?.token) {
                        messageApi.open({
                          type: "warning",
                          content:
                            t("please_login_first") || "You must login first.",
                        });
                        return;
                      }
                      navigate("../add-service");
                    }}
                  >
                    {t("service_request")}
                  </Button>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomCollapse;
