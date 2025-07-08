import Card from "../Organisms/Card";
import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllServices,
  getAllUserServiceRequests,
} from "../../api/http";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);

  // Fetch type services using React Query
  const { data: servicesType, isLoading: servicesTypeLoading } = useQuery({
    queryKey: ["servicesType"],
    queryFn: () => getAllCategories(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch services using React Query
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch all user service requests
  const {
    data: serviceRequests,
    isLoading: requestsLoading,
    error: requestsError,
  } = useQuery({
    queryKey: ["allUserServiceRequests"],
    queryFn: () => getAllUserServiceRequests(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Filter services based on selected service type
  const filteredServices = selectedServiceType
    ? services?.filter((service) => service.categoryId === selectedServiceType)
    : services;

  // Function to get service name by ID
  const getServiceNameById = (serviceId) => {
    if (!services || !serviceId) return "N/A";
    const service = services.find((s) => s.id === serviceId);
    return service?.name || "Service not found";
  };

  // Function to get status text and styling
  const getStatusInfo = (status) => {
    switch (status) {
      case 0:
        return {
          text: "Pending",
          className: "text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded",
        };
      case 1:
        return {
          text: "Approved",
          className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded",
        };
      case 2:
        return {
          text: "Rejected",
          className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded",
        };
      default:
        return {
          text: "Unknown",
          className: "text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded",
        };
    }
  };

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const onTypeChange = (value) => {
    setSelectedServiceType(value);
    // Clear the services selection when type changes
    form.setFieldsValue({ services: undefined });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (requestsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service requests...</p>
        </div>
      </div>
    );
  }

  if (requestsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service requests</p>
          <p className="text-gray-600 text-sm">{requestsError.message}</p>
        </div>
      </div>
    );
  }

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
                        No service types available
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
                      : "Please select a service type first"
                  }
                  loading={servicesLoading}
                  allowClear
                  disabled={!selectedServiceType}
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
                          ? "No services available for this type"
                          : "Please select a service type first"}
                      </Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="search"
            label="Search"
            layout="vertical"
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 15 }}
            style={{ minWidth: "100%" }}
          >
            <Input placeholder={t("form.searchPlaceholder")} />
          </Form.Item>
        </Form>
      </div>
      <div className="mx-auto">
        {serviceRequests && serviceRequests.length > 0 ? (
          serviceRequests.map((request) => {
            const statusInfo = getStatusInfo(request.status);
            return (
              <Card
                key={request.id}
                id={request.id}
                status={statusInfo.text}
                name="User" // You might want to fetch user details separately
                category={getServiceNameById(request.serviceID)}
                title={request.title || "No title"}
                description={request.description || "No description"}
                createdAt={request.createdAt || "Unknown date"}
                onClick={() =>
                  navigate(`../service/${request.id}`, {
                    state: { service: request },
                  })
                }
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <p className="text-gray-600">No service requests found</p>
              <p className="text-gray-500 text-sm">
                There are no service requests to display.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportDashboard;
