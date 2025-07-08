import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/Button";
import photo from "../../assets/images/1560a64114a9372e.jpg";
import { getDurationFromNow } from "../../utils/timeAge";
import { Select, message } from "antd";
import Editor from "../Organisms/Editor";
import {
  getUserServiceRequestById,
  getAllServices,
  getAllCategories,
  updateUserServiceRequestStatus,
} from "../../api/http";
import { useAuth } from "../../store/AuthContext";

function ShowService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { service, isAdmin = false } = location.state || {};
  const queryClient = useQueryClient();

  // Use service from location state if available, otherwise fetch from API
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
      case "review":
        return 0;
      case "accepted":
        return 1;
      case "reject":
        return 2;
      default:
        return 0;
    }
  };

  const handleStatusChange = (value) => {
    const statusNumber = getStatusNumber(value);
    updateStatusMutation.mutate({
      requestId: serviceId,
      status: statusNumber,
    });
  };

  // Loading state (only show if we're fetching and don't have service in state)
  if (requestLoading && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service request...</p>
        </div>
      </div>
    );
  }

  // Error state (only show if we tried to fetch and failed)
  if (requestError && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service request</p>
          <p className="text-gray-600 text-sm">{requestError.message}</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
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
          <p className="text-gray-600 mb-4">Service request not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-accent-25 p-2 sm:p-4 pb-8 sm:pb-16 shadow-custom-gray rounded-lg sm:rounded-2xl">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b-2 border-[#6F6E6E]/30 pb-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <img
              src={photo}
              alt=""
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
            />
            <h1 className="text-sm sm:text-base font-semibold">
              {currentService.userName || "User"}
            </h1>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <span className="text-xs sm:text-sm font-regular text-[#727272]">
              {getDurationFromNow(currentService.createdAt)}
            </span>
            <svg
              width="18"
              height="19"
              className="sm:w-[21px] sm:h-[22px]"
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
        </div>

        {/* Service Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[30px]">
          <div className="flex-1 rounded-lg shadow-md h-full ">
            <Editor
              content={currentService.description || "No description available"}
            />
          </div>
          <div className="space-y-4 sm:space-y-5 w-full lg:max-w-[300px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">
                Request Status:
              </h1>
              <Select
                value={getStatusValue(currentService.status)}
                style={{ width: "100%", maxWidth: "120px" }}
                className="w-full sm:w-auto"
                onChange={handleStatusChange}
                disabled={!isAdmin || updateStatusMutation.isPending}
                loading={updateStatusMutation.isPending}
                options={[
                  { value: "review", label: "Review" },
                  { value: "accepted", label: "Accepted" },
                  { value: "reject", label: "Rejected" },
                ]}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Type:</h1>
              <p className="m-0 text-sm sm:text-base">
                {getCategoryNameById(currentService.categoryId)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Service:</h1>
              <p className="m-0 text-sm sm:text-base">
                {getServiceNameById(currentService.serviceID)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
              <h1 className="text-sm sm:text-base font-medium">Name:</h1>
              <p className="m-0 text-sm sm:text-base break-words">
                {currentService.title || "No title"}
              </p>
            </div>
            {currentService.link && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
                <h1 className="text-sm sm:text-base font-medium">Link:</h1>
                <p className="m-0 text-sm sm:text-base break-all">
                  {currentService.link}
                </p>
              </div>
            )}
            {currentService.phoneNumber && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 m-0 border-b-2 border-gray-300 h-fit pb-2">
                <h1 className="text-sm sm:text-base font-medium">
                  Phone number:
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
