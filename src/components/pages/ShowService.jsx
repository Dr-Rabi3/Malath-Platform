import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/Button";
import photo from "../../assets/images/1560a64114a9372e.jpg";
import { getDurationFromNow } from "../../utils/timeAge";
import { Select, message, Avatar } from "antd";
import Editor from "../Organisms/Editor";
import {
  getUserServiceRequestById,
  getAllServices,
  getAllCategories,
  updateUserServiceRequestStatus,
  resolveUserServiceRequest,
  contactUserServiceRequest,
  rejectUserServiceRequest,
} from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { getFile } from "../../api/http";
import axios from "axios";

function ShowService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { service, isAdmin = false, userRequest } = location.state || {};
  const queryClient = useQueryClient();
  const [avatarUrl, setAvatarUrl] = useState("");
  const {
    data: serviceRequest,
    isLoading: requestLoading,
    error: requestError,
  } = useQuery({
    queryKey: ["serviceRequest", serviceId],
    queryFn: () => getUserServiceRequestById(user?.token, serviceId),
    enabled: !!user?.token && !!serviceId && !service, // Only fetch if no service in state
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Use service from state if available, otherwise use fetched data
  const currentService = service || serviceRequest;
  const [localStatus, setLocalStatus] = useState(currentService?.status ?? 0);

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

  useEffect(() => {
    if (currentService?.status !== undefined) {
      setLocalStatus(currentService.status);
    }
  }, [currentService?.status]);

  // Use service from location state if available, otherwise fetch from API

  // Fetch services for service name lookup
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch categories for category name lookup
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Mutation for updating service request status
  const updateStatusMutation = useMutation({
    mutationFn: ({ requestId, status }) =>
      updateUserServiceRequestStatus(user?.token, requestId, status),
    onSuccess: (data) => {
      message.success("Status updated successfully");
      // Invalidate and refetch the service request data
      queryClient.invalidateQueries(["serviceRequest", serviceId]);
      queryClient.invalidateQueries(["allUserServiceRequests"]);
    },
    onError: (error) => {
      message.error(error.message || "Failed to update status");
    },
  });

  // Mutation handlers for status changes
  const resolveRequest = useMutation({
    mutationFn: async (id) => {
      await resolveUserServiceRequest(user?.token, id);
    },
  });
  const contactRequest = useMutation({
    mutationFn: async (id) => {
      await contactUserServiceRequest(user?.token, id);
    },
  });
  const rejectRequest = useMutation({
    mutationFn: async (id) => {
      await rejectUserServiceRequest(user?.token, id);
    },
  });

  // Handler for status change
  const handleStatusChange = async (value) => {
    if (!currentService?.id) return;
    if (value === 1) {
      await contactRequest.mutateAsync(currentService.id);
    } else if (value === 2) {
      await resolveRequest.mutateAsync(currentService.id);
    } else if (value === 3) {
      await rejectRequest.mutateAsync(currentService.id);
    }
    // Refetch the service request and all requests after update
    queryClient.invalidateQueries(["serviceRequest", currentService.id]);
    queryClient.invalidateQueries(["allUserServiceRequests"]);
  };

  // Helper functions
  const getServiceNameById = (serviceId) => {
    if (!services || !serviceId) return "N/A";
    const service = services.find((s) => s.id === serviceId);
    return service?.name || "Service not found";
  };

  const getCategoryNameById = (categoryId) => {
    if (!categories || !categoryId) return "N/A";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Category not found";
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const getStatusValue = (status) => {
    switch (status) {
      case 0:
        return "review";
      case 1:
        return "accepted";
      case 2:
        return "reject";
      default:
        return "review";
    }
  };

  const getStatusNumber = (statusValue) => {
    switch (statusValue) {
      case "Pending":
        return 0;
      case "Accepted":
        return 1;
      case "Reject":
        return 2;
      default:
        return 0;
    }
  };

  // Loading state (only show if we're fetching and don't have service in state)
  if (requestLoading && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("showService.loading")}</p>
        </div>
      </div>
    );
  }

  // Error state (only show if we tried to fetch and failed)
  if (requestError && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t("showService.errorLoading")}</p>
          <p className="text-gray-600 text-sm">{requestError.message}</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            {t("showService.goBack")}
          </Button>
        </div>
      </div>
    );
  }

  // No data state
  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("showService.notFound")}</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            {t("showService.goBack")}
          </Button>
        </div>
      </div>
    );
  }

  console.log(userRequest);
  return (
    <div className="bg-accent-25 p-2 sm:p-4 pb-8 sm:pb-16 shadow-custom-gray rounded-lg sm:rounded-2xl">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b-2 border-[#6F6E6E]/30 pb-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Avatar
              size={40}
              src={avatarUrl}
              icon={<UserOutlined />}
              className="bg-brand-600"
            />
            <h1 className="text-sm sm:text-base font-semibold">
              {userRequest?.fullName}
            </h1>
          </div>
        </div>

        {/* Service Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[30px]">
          <div className="flex-1 rounded-lg shadow-md h-full ">
            <Editor
              content={
                currentService.description || t("showService.noDescription")
              }
              readOnly={true}
            />
          </div>
          <div className="space-y-4 sm:space-y-5 w-full lg:max-w-[300px]">
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">
                {t("showService.name")}:
              </h1>
              <p className="m-0 text-sm sm:text-base break-words">
                {currentService.title || "No title"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">
                {t("showService.requestStatus")}:
              </h1>
              <Select
                value={localStatus}
                onChange={(value) => {
                  setLocalStatus(value);
                  handleStatusChange(value);
                }}
                loading={updateStatusMutation.isPending}
                disabled={isAdmin}
                options={[
                  { value: 0, label: t("showService.pending") },
                  { value: 1, label: t("showService.contact") },
                  { value: 2, label: t("showService.resolved") },
                  { value: 3, label: t("showService.rejected") },
                ]}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="m-0 text-sm sm:text-base font-medium">
                {t("showService.phone")}:
              </h1>
              <p className="m-0 text-sm sm:text-base">
                {userRequest?.mobileNumber}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="m-0 text-sm sm:text-base font-medium">
                {t("showService.email")}:
              </h1>
              <p className="m-0 text-sm sm:text-base">{userRequest?.email}</p>
            </div>

            {currentService.link && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
                <h1 className="text-sm sm:text-base font-medium">
                  {t("showService.link")}:
                </h1>
                <p className="m-0 text-sm sm:text-base break-all">
                  {currentService.link}
                </p>
              </div>
            )}
            {currentService.phoneNumber && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
                <h1 className="text-sm sm:text-base font-medium">
                  {t("showService.phoneNumber")}:
                </h1>
                <p className="m-0 text-sm sm:text-base">
                  {currentService.phoneNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowService;
