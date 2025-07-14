import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllServices } from "../../api/http";
import CustomCollapse from "../Organisms/CustomCollapse";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useState } from "react";
import { Modal, Select, Form, Input } from "antd";
import { createCategory } from "../../api/http";
import { getAllCategories } from "../../api/http";
import { createService } from "../../api/http";
import { useRef } from "react";

function AdminAddService() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [openResponsive, setOpenResponsive] = useState(false);
  const [categoryNameEn, setCategoryNameEn] = useState("");
  const [categoryNameAr, setCategoryNameAr] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [serviceNameEn, setServiceNameEn] = useState("");
  const [serviceNameAr, setServiceNameAr] = useState("");
  const [serviceDescEn, setServiceDescEn] = useState("");
  const [serviceDescAr, setServiceDescAr] = useState("");
  const [serviceCategoryId, setServiceCategoryId] = useState(null);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();

  const handleCreateCategory = async () => {
    setCategoryLoading(true);
    setCategoryError("");
    try {
      await createCategory(user?.token, {
        nameEn: categoryNameEn,
        nameAr: categoryNameAr,
      });
      setOpenResponsive(false);
      setCategoryNameEn("");
      setCategoryNameAr("");
      categoryForm.resetFields();
      queryClient.refetchQueries(["categories"]);
    } catch (err) {
      setCategoryError(err.message);
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleCreateService = async () => {
    setServiceLoading(true);
    setServiceError("");
    try {
      await createService(user?.token, {
        nameEn: serviceNameEn,
        nameAr: serviceNameAr,
        descriptionEn: serviceDescEn,
        descriptionAr: serviceDescAr,
        categoryId: serviceCategoryId,
      });
      setOpenServiceModal(false);
      setServiceNameEn("");
      setServiceNameAr("");
      setServiceDescEn("");
      setServiceDescAr("");
      setServiceCategoryId(null);
      form.resetFields();
      queryClient.refetchQueries(["services"]);
    } catch (err) {
      setServiceError(err.message);
    } finally {
      setServiceLoading(false);
    }
  };

  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(user?.token),
    enabled: !!user?.token,
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
    queryFn: () => getAllCategories(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        {t("loading")}
      </div>
    );
  }
  // if (servicesError || categoriesError) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px] text-red-600">
  //       {servicesError?.message || categoriesError?.message}
  //     </div>
  //   );
  // }

  // Group services by category using fetched categories
  const groupedServices = (categories || []).map((cat) => ({
    categoryId: cat.id,
    categoryName: cat.name,
    services: (services || []).filter((srv) => srv.categoryId === cat.id),
  }));

  return (
    <>
      <Modal
        title={t("admin.addService.addServiceType")}
        centered
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          form={categoryForm}
          onFinish={handleCreateCategory}
          className="space-y-4"
        >
          <Form.Item
            label={t("admin.addService.nameEn")}
            name="nameEn"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterNameEn"),
              },
            ]}
            initialValue={categoryNameEn}
          >
            <Input
              value={categoryNameEn}
              onChange={(e) => setCategoryNameEn(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={t("admin.addService.nameAr")}
            name="nameAr"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterNameAr"),
              },
            ]}
            initialValue={categoryNameAr}
          >
            <Input
              value={categoryNameAr}
              onChange={(e) => setCategoryNameAr(e.target.value)}
              dir="rtl"
            />
          </Form.Item>
          {categoryError && <div className="text-red-600">{categoryError}</div>}
          <Button
            type="submit"
            className="px-4 py-2 rounded w-full !bg-neutral-700 !text-[#fff] !font-medium !shadow-custom-gray"
            disabled={categoryLoading}
          >
            {categoryLoading
              ? t("admin.addService.adding")
              : t("admin.addService.addServiceTypeButton")}
          </Button>
        </Form>
      </Modal>

      <Modal
        title={t("admin.addService.addService")}
        centered
        open={openServiceModal}
        onOk={() => setOpenServiceModal(false)}
        onCancel={() => setOpenServiceModal(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateService}
          className="space-y-4"
        >
          <Form.Item
            label={t("admin.addService.nameEn")}
            name="nameEn"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterNameEn"),
              },
            ]}
            initialValue={serviceNameEn}
          >
            <Input
              value={serviceNameEn}
              onChange={(e) => setServiceNameEn(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={t("admin.addService.nameAr")}
            name="nameAr"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterNameAr"),
              },
            ]}
            initialValue={serviceNameAr}
          >
            <Input
              value={serviceNameAr}
              onChange={(e) => setServiceNameAr(e.target.value)}
              dir="rtl"
            />
          </Form.Item>
          <Form.Item
            label={t("admin.addService.descriptionEn")}
            name="descEn"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterDescEn"),
              },
            ]}
            initialValue={serviceDescEn}
          >
            <Input.TextArea
              value={serviceDescEn}
              onChange={(e) => setServiceDescEn(e.target.value)}
              rows={3}
            />
          </Form.Item>
          <Form.Item
            label={t("admin.addService.descriptionAr")}
            name="descAr"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterDescAr"),
              },
            ]}
            initialValue={serviceDescAr}
          >
            <Input.TextArea
              value={serviceDescAr}
              onChange={(e) => setServiceDescAr(e.target.value)}
              rows={3}
              dir="rtl"
            />
          </Form.Item>
          <Form.Item
            label={t("admin.addService.typeOfService")}
            name="categoryId"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseSelectType"),
              },
            ]}
            initialValue={serviceCategoryId}
          >
            <Select
              showSearch
              value={serviceCategoryId}
              style={{ width: "100%" }}
              placeholder={t("admin.addService.searchToSelect")}
              optionFilterProp="label"
              onChange={setServiceCategoryId}
              filterSort={(optionA, optionB) => {
                var _a, _b;
                return (
                  (_a =
                    optionA === null || optionA === void 0
                      ? void 0
                      : optionA.label) !== null && _a !== void 0
                    ? _a
                    : ""
                )
                  .toLowerCase()
                  .localeCompare(
                    ((_b =
                      optionB === null || optionB === void 0
                        ? void 0
                        : optionB.label) !== null && _b !== void 0
                      ? _b
                      : ""
                    ).toLowerCase()
                  );
              }}
              options={(categories || []).map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />
          </Form.Item>
          {serviceError && <div className="text-red-600">{serviceError}</div>}
          <Button
            type="submit"
            className="px-4 py-2 rounded w-full !bg-neutral-700 !text-[#fff] !font-medium !shadow-custom-gray"
            disabled={serviceLoading}
          >
            {serviceLoading
              ? t("admin.addService.adding")
              : t("admin.addService.addServiceButton")}
          </Button>
        </Form>
      </Modal>

      <div className="space-y-[20px]">
        <div className="space-x-[20px] flex justify-end">
          <Button
            className="!bg-[#E6F3FF] !text-[#000] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
            onClick={() => setOpenResponsive(true)}
          >
            {t("admin.addService.addServiceTypeButton")}
          </Button>
          <Button
            className="!bg-[#E6F3FF] !text-[#000] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
            onClick={() => setOpenServiceModal(true)}
          >
            {t("admin.addService.addServiceButton")}
          </Button>
        </div>
        {groupedServices.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-500">
            {t("admin.addService.notFound", "No services found.")}
          </div>
        ) : (
          <CustomCollapse services={groupedServices} />
        )}
      </div>
    </>
  );
}

export default AdminAddService;
