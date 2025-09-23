import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import CustomCollapse from "../Organisms/CustomCollapse";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllServices } from "../../api/http";
import { message } from "antd";
function Service() {
  const [messageApi, contextHelper] = message.useMessage();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token, i18n.language),
    // enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(user?.token, i18n.language),
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

  const groupedServices = (categories || []).map((cat) => ({
    categoryId: cat.id,
    categoryName: cat.name,
    categoryPhoto: cat.photoUrl,
    services: (services || []).filter((srv) => srv.categoryId === cat.id),
  }));

  // console.log(groupedServices, categories, services);
  return (
    <>
      {contextHelper}

      <div className="space-y-[20px] mb-[50px]">
        <div className="flex justify-end">
          {/* <Button
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
          </Button> */}
        </div>
        <CustomCollapse services={groupedServices || []} />
      </div>
    </>
  );
}
export default Service;
