import Card from "../Organisms/Card";
import { Col, Form, Input, Pagination, Row, Select } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllServices,
  getAllUserServiceRequests,
  getUserById,
} from "../../api/http";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const { Option } = Select;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

function SupportDashboard() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin-service");
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsPageSize, setRequestsPageSize] = useState(10);
  const [users, setUsers] = useState({});
  const [usersLoading, setUsersLoading] = useState(false);

  // Fetch type services using React Query
  const { data: servicesType, isLoading: servicesTypeLoading } = useQuery({
    queryKey: ["servicesType"],
    queryFn: () => getAllCategories(user?.token, i18n.language),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch services using React Query
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token, i18n.language),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,  
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch all user service requests
  const {
    data: serviceRequestsResponse,
    isLoading: requestsLoading,
    error: requestsError,
  } = useQuery({
    queryKey: [
      "allUserServiceRequests",
      requestsPage,
      requestsPageSize,
      user?.token,
    ],
    queryFn: () =>
      getAllUserServiceRequests(user?.token, requestsPage, requestsPageSize),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  const serviceRequests = serviceRequestsResponse?.data || [];
  const pagination = serviceRequestsResponse?.pagination || {};
  const totalServiceRequests = pagination.TotalCount || 0;
  const currentRequestsPage = pagination.CurrentPage || requestsPage;
  const currentRequestsPageSize = pagination.PageSize || requestsPageSize;
  // console.log(serviceRequestsResponse);
  // Filter services based on selected service type and search input
  const filteredServices = (services || [])
    .filter(
      (service) =>
        !selectedServiceType || service.categoryId === selectedServiceType
    )
    .filter(
      (service) =>
        !searchValue ||
        service.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  // Filter service requests based on selected service and search input
  const filteredServiceRequests = (serviceRequests || [])
    .filter(
      (request) => !selectedServiceId || request.serviceID === selectedServiceId
    )
    .filter(
      (request) =>
        !searchValue ||
        (request.title &&
          request.title.toLowerCase().includes(searchValue.toLowerCase())) ||
        (request.description &&
          request.description.toLowerCase().includes(searchValue.toLowerCase()))
    );

  // Function to get service name by ID
  const getServiceNameById = (serviceId) => {
    if (!services || !serviceId) return "N/A";
    const service = services.find((s) => s.id === serviceId);
    return service?.name || "Service not found";
  };

  // Function to get status text and styling
  const getStatusInfo = (status) => {
    console.log(status);
    switch (status) {
      case 0:
        return {
          text: t("supportDashboard.status.pending"),
          className: "text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded",
        };
      case 1:
        return {
          text: t("supportDashboard.status.contact"),
          className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded",
        };
      case 2:
        return {
          text: t("supportDashboard.status.resolve"),
          className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded",
        };
      case 3:
        return {
          text: t("supportDashboard.status.rejected"),
          className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded",
        };
      default:
        return {
          text: t("supportDashboard.status.unknown"),
          className: "text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded",
        };
    }
  };

  const onTypeChange = (value) => {
    setSelectedServiceType(value);
    // Clear the services selection when type changes
    form.setFieldsValue({ services: undefined });
  };

  const onServiceChange = (value) => {
    setSelectedServiceId(value);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Fetch user data for all unique userIDs in serviceRequests
  useEffect(() => {
    const fetchUsers = async () => {
      if (!serviceRequests || serviceRequests.length === 0) return;
      setUsersLoading(true);
      const uniqueUserIds = [
        ...new Set(serviceRequests.map((r) => r.userID).filter(Boolean)),
      ];
      // console.log(uniqueUserIds);
      const userMap = {};
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          // console.log(userId);
          try {
            const curUser = await getUserById(user?.token, userId);
            // console.log(curUser);
            userMap[userId] = curUser;
          } catch (e) {
            userMap[userId] = null;
          }
        })
      );
      setUsers(userMap);
      setUsersLoading(false);
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceRequests]);
  // console.log(users);
  if (requestsLoading || usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("supportDashboard.loading")}</p>
        </div>
      </div>
    );
  }

  // if (requestsError) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-red-600 mb-4">
  //           {t("supportDashboard.errorLoading")}
  //         </p>
  //         <p className="text-gray-600 text-sm">{requestsError.message}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      <div>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: "100%" }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Row gutter={5} justify="start">
            <Col span={10}>
              <Form.Item
                label={t("form.type")}
                name="type"
                style={{ minWidth: "100%", marginBottom: "10px" }}
                className="w-full"
              >
                <Select
                  placeholder={t("form.selectType")}
                  onChange={onTypeChange}
                  loading={servicesTypeLoading}
                  allowClear
                >
                  {servicesType?.map((serviceType) => (
                    <Option key={serviceType.id} value={serviceType.id}>
                      {serviceType.name}
                    </Option>
                  ))}
                  {(!servicesType || servicesType.length === 0) &&
                    !servicesTypeLoading && (
                      <Option value={null} disabled>
                        {t("supportDashboard.noServiceTypes")}
                      </Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label={t("form.service")}
                name="services"
                style={{ minWidth: "100%", marginBottom: "10px" }}
                className="w-full"
              >
                <Select
                  placeholder={
                    selectedServiceType
                      ? t("form.selectService")
                      : t("supportDashboard.selectServiceTypeFirst")
                  }
                  loading={servicesLoading}
                  allowClear
                  disabled={!selectedServiceType}
                  onChange={onServiceChange}
                >
                  {filteredServices?.map((service) => (
                    <Option key={service.id} value={service.id}>
                      {service.name}
                    </Option>
                  ))}
                  {(!filteredServices || filteredServices.length === 0) &&
                    !servicesLoading && (
                      <Option value={null} disabled>
                        {selectedServiceType
                          ? t("supportDashboard.noServicesForType")
                          : t("supportDashboard.selectServiceTypeFirst")}
                      </Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="search"
            label={t("supportDashboard.search")}
            layout="vertical"
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 15 }}
            style={{ minWidth: "100%" }}
          >
            <Input
              placeholder={t("form.searchPlaceholder")}
              value={searchValue}
              onChange={onSearchChange}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="mx-auto">
        {filteredServiceRequests && filteredServiceRequests.length > 0 ? (
          filteredServiceRequests.map((request) => {
            const statusInfo = getStatusInfo(request.status);
            const userObj = users[request.userID];
            return (
              <Card
                key={request.id}
                id={request.id}
                status={statusInfo.text}
                user={userObj}
                category={getServiceNameById(request.serviceID)}
                title={request.title || t("supportDashboard.noTitle")}
                description={
                  request.description || t("supportDashboard.noDescription")
                }
                createdAt={
                  request.createdAt || t("supportDashboard.unknownDate")
                }
                isAdmin={isAdmin}
                onClick={() =>
                  navigate(`service/${request.id}`, {
                    state: { service: request, userRequest: userObj, isAdmin },
                  })
                }
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <p className="text-gray-600">
                {t("supportDashboard.noRequests")}
              </p>
              <p className="text-gray-500 text-sm">
                {t("supportDashboard.noRequestsHint")}
              </p>
            </div>
          </div>
        )}
        <Pagination
          className="flex justify-center"
          current={currentRequestsPage}
          pageSize={currentRequestsPageSize}
          total={totalServiceRequests}
          onChange={(page, size) => {
            setRequestsPage(page);
            setRequestsPageSize(size);
          }}
        />
      </div>
    </div>
  );
}

export default SupportDashboard;
