import { useQuery } from "@tanstack/react-query";
import { getUserServiceRequests, getAllServices } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

function UserServices() {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Fetch user service requests using React Query
  const {
    data: serviceRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userServiceRequests", user?.userId],
    queryFn: () => getUserServiceRequests(user?.token, user?.userId),
    enabled: !!user?.token && !!user?.userId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch all services to get service names
  const { data: allServices, isLoading: servicesLoading } = useQuery({
    queryKey: ["allServices"],
    queryFn: () => getAllServices(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Function to get service name by ID
  const getServiceNameById = (serviceId) => {
    if (!allServices || !serviceId) return "N/A";
    const service = allServices.find((s) => s.id === serviceId);
    return service?.name || "Service not found";
  };

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return "text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded";
      case 1:
        return "text-xs bg-green-100 text-green-700 px-2 py-1 rounded";
      case 2:
        return "text-xs bg-red-100 text-red-600 px-2 py-1 rounded";
      default:
        return "text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded";
    }
  };

  // Function to get status text
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return t("userServices.pending");
      case 1:
        return t("userServices.approved");
      case 2:
        return t("userServices.rejected");
      default:
        return t("userServices.unknown");
    }
  };

  if (isLoading || servicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">{t("userServices.loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">{t("userServices.errorLoading")}</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!serviceRequests || serviceRequests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <p className="text-gray-600">{t("userServices.noRequests")}</p>
          <p className="text-gray-500 text-sm">
            {t("userServices.noRequestsHint")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 font-medium text-gray-500">
              {t("userServices.serviceName")}
            </th>
            <th className="py-2 px-4 font-medium text-gray-500">
              {t("userServices.service")}
            </th>
            <th className="py-2 px-4 font-medium text-gray-500">
              {t("userServices.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((request) => (
            <tr key={request.id} className="border-b text-[13px]">
              <td className="py-3 px-4">{request.title || "N/A"}</td>
              <td className="py-3 px-4">
                {getServiceNameById(request.serviceID)}
              </td>
              <td className="py-3 px-4">
                <span className={getStatusBadge(request.status)}>
                  {getStatusText(request.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserServices;
