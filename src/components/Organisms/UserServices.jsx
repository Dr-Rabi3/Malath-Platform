import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserServiceRequests,
  getAllServices,
  deleteUserService,
} from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { message } from "antd";

function UserServices() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

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

  // Delete request mutation
  const deleteMutation = useMutation({
    mutationFn: (requestId) => deleteUserService(user?.token, requestId),
    onSuccess: () => {
      messageApi.success(t("userServices.deleteSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["userServiceRequests", user?.userId],
      });
    },
    onError: (error) => {
      messageApi.error(t("userServices.deleteError", { error: error.message }));
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(t("userServices.confirmDeleteMessage"));
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  if (isLoading || servicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-800 mx-auto mb-2"></div>
          <p className="text-gray-600 text-xs sm:text-sm">
            {t("userServices.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
        <div className="text-center">
          <p className="text-red-600 mb-2 text-sm sm:text-base">
            {t("userServices.errorLoading")}
          </p>
          <p className="text-gray-600 text-xs sm:text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!serviceRequests || serviceRequests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
        <div className="text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            {t("userServices.noRequests")}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {t("userServices.noRequestsHint")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {contextHolder}
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-2 sm:px-4 font-medium text-gray-500 text-xs sm:text-sm">
              {t("userServices.serviceName")}
            </th>
            <th className="py-2 px-2 sm:px-4 font-medium text-gray-500 text-xs sm:text-sm">
              {t("userServices.service")}
            </th>
            <th className="py-2 px-2 sm:px-4 font-medium text-gray-500 text-xs sm:text-sm">
              {t("userServices.status")}
            </th>
            <th className="py-2 px-2 sm:px-4 font-medium text-gray-500 text-xs sm:text-sm">
              {t("userServices.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((request) => (
            <tr
              key={request.id}
              className="border-b text-[12px] sm:text-[13px]"
            >
              <td className="py-3 px-2 sm:px-4">{request.title || "N/A"}</td>
              <td className="py-3 px-2 sm:px-4">
                {getServiceNameById(request.serviceID)}
              </td>
              <td className="py-3 px-2 sm:px-4">
                <span className={getStatusBadge(request.status)}>
                  {getStatusText(request.status)}
                </span>
              </td>
              <td className="py-3 px-2 sm:px-4">
                <button
                  onClick={() => handleDelete(request.id)}
                  disabled={deleteMutation.isPending}
                  className={`inline-flex items-center gap-1 border px-2 sm:px-3 py-1 rounded transition-colors duration-200 ${
                    deleteMutation.isPending
                      ? "border-red-300 text-red-300 cursor-not-allowed"
                      : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  }`}
                  aria-label={t("userServices.delete")}
                  title={t("userServices.delete")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  >
                    <path d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9zm1 4a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z" />
                    <path d="M6 8v10a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8H6z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    {t("userServices.delete")}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserServices;
