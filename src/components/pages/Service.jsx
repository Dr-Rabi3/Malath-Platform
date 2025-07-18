import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import CustomCollapse from "../Organisms/CustomCollapse";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../api/http";
import { message } from "antd";
import Silk from "../ui/Silk";

function Service() {
  const [messageApi, contextHelper] = message.useMessage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token),
    // enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (servicesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        {t("loading")}
      </div>
    );
  }
  if (servicesError) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-600">
        {servicesError.message}
      </div>
    );
  }

  const groupedServices = services?.reduce((acc, service) => {
    const { categoryId, categoryName } = service;
    if (!acc[categoryId]) {
      acc[categoryId] = {
        categoryId,
        categoryName,
        services: [],
      };
    }
    acc[categoryId].services.push(service);
    return acc;
  }, {});

  // console.log(services);

  return (
    <>
      {contextHelper}
      <div className="relative h-[360px] rounded-3xl overflow-hidden">
        <div className="absolute h-full w-full z-[-1]">
          <Silk
            speed={5}
            scale={1}
            color="#3f377b"
            noiseIntensity={2.5}
            rotation={0}
          />
        </div>
        <div className="text-white z-[10] p-2 w-full h-full flex flex-col justify-center items-center select-none">
          <h1 className="font-barlow font-semibold text-[50px]">
            {t("servicePage.ourServices", "Our Services")}
          </h1>
          <div className="font-barlow font-regular text-[20px]">
            {t(
              "servicePage.transformBrand",
              "Transform your brand with our innovative digital solutions that captivate and engage your audience."
            )}
          </div>
        </div>
      </div>
      <div className="space-y-[20px]">
        <div className="flex justify-end">
          <Button
            className="bg-neutral-1000 hover:bg-neutral-950 font-main font-medium"
            onClick={() => {
              if (!user?.token) {
                messageApi.open({
                  type: "warning",
                  content: t("please_login_first") || "You must login first.",
                });
                return;
              }
              navigate("../add-service");
            }}
          >
            {t("service_request")}
          </Button>
        </div>
        <CustomCollapse services={Object.values(groupedServices || {})} />
      </div>
    </>
  );
}
export default Service;
