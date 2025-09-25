import { AutoComplete, Col, Form, Input, message, Row, Select } from "antd";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getAllServices,
  requestService,
} from "../../api/http";

import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

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

function AddService() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [messageApi, contextHelper] = message.useMessage();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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

  // Request service mutation
  const requestServiceMutation = useMutation({
    mutationFn: (requestData) => requestService(user?.token, requestData),
    onSuccess: () => {
      messageApi.success(t("addService.submitSuccess"));
      form.resetFields();
      setSelectedServiceType(null);
      // Optionally invalidate and refetch user services if you have a query for them
      // queryClient.invalidateQueries({ queryKey: ["userServices"] });
    },
    onError: (error) => {
      messageApi.error(t("addService.submitError", { error: error.message }));
    },
  });

  // Filter services based on selected service type
  const filteredServices = selectedServiceType
    ? services?.filter((service) => service.categoryId === selectedServiceType)
    : services;

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
    // Trigger validation to clear any previous errors
    form.validateFields(["services"]);
  };

  const onServiceChange = (value) => {
    // Trigger validation when service is selected
    form.validateFields(["services"]);
  };

  // console.log(services);

  const onFinish = (values) => {
    if (!user?.token) {
      messageApi.open({
        type: "info",
        content: t("addService.loginWarning"),
      });
      return null;
    }

    // Transform form values to match API requirements
    const requestData = {
      title: values.title,
      description: values.description,
      userID: user.id, // Assuming user object has an id field
      serviceID: values.services,
      status: 0, // Default status for new requests
    };

    requestServiceMutation.mutate(requestData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHelper}
      <div className="bg-accent-25 shadow-custom-gray flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full p-12">
        <div className="font-semibold text-[20px] sm:text-[25px] text-neutral-950 font-secondary">
          {t("addService.title")}
        </div>
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
          className="flex flex-col justify-center items-center w-full"
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label={t("addService.serviceTitle")}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: t("addService.titleRequired"),
                whitespace: true,
              },
              {
                max: 15,
                message: t("addService.titleMaxLength"),
              },
            ]}
          >
            <Input placeholder={t("addService.serviceTitle")} />
          </Form.Item>
          <Row className="w-full" justify="space-between">
            <Col span={11}>
              <Form.Item
                label={t("addService.selectType")}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ minWidth: "100%" }}
                name="type"
                rules={[
                  {
                    required: true,
                    message: t("addService.typeRequired"),
                  },
                ]}
                className="w-full"
              >
                <Select
                  placeholder={t("addService.selectService")}
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
                        {t("addService.noServiceTypes")}
                      </Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label={t("addService.selectService")}
                layout="vertical"
                className="w-full"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ minWidth: "100%" }}
                name="services"
                rules={[
                  {
                    required: true,
                    message: t("addService.serviceRequired"),
                  },
                ]}
              >
                <Select
                  placeholder={
                    selectedServiceType
                      ? t("addService.selectService")
                      : t("addService.selectServiceTypeFirst")
                  }
                  onChange={onServiceChange}
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
                          ? t("addService.noServicesForType")
                          : t("addService.selectServiceTypeFirst")}
                      </Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label={t("addService.description")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="w-full"
            rules={[
              {
                required: true,
                message: t("addService.descriptionRequired"),
              },
            ]}
          >
            <Editor />
          </Form.Item>

          <Form.Item
            label={null}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Button
              type="submit"
              className="w-full bg-neutral-950 hover:bg-neutral-700 font-regular px-[30px] py-2 sm:py-2.5"
              loading={requestServiceMutation.isPending}
            >
              {requestServiceMutation.isPending
                ? t("addService.submitting")
                : t("addService.sendRequest")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AddService;
