import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllServices,
  uploadFile,
  deleteCategory,
  deleteService,
} from "../../api/http";
import CustomCollapse from "../Organisms/CustomCollapse";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useState } from "react";
import { Modal, Select, Form, Input, Upload } from "antd";
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
  const [categoryFile, setCategoryFile] = useState(null);
  const [serviceCategoryId, setServiceCategoryId] = useState(null);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState("");

  // Delete functionality states
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState(""); // "category" or "service"
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [deleteForm] = Form.useForm();

  const handleCreateCategory = async () => {
    setCategoryLoading(true);
    setCategoryError("");
    try {
      let uploadedFilePath = null;
      if (categoryFile) {
        uploadedFilePath = await uploadFile(
          user?.token,
          categoryFile,
          "Categories"
        );
      }
      await createCategory(user?.token, {
        nameEn: categoryNameEn,
        nameAr: categoryNameAr,
        photoUrl: uploadedFilePath, // ✅ send file path
      });
      setOpenResponsive(false);
      setCategoryNameEn("");
      setCategoryNameAr("");
      setCategoryFile(null);
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

  const handleDelete = () => {
    // Show confirmation modal first
    if (deleteType === "category" && selectedCategoryId) {
      const category = categories?.find((cat) => cat.id === selectedCategoryId);
      setItemToDelete({
        type: "category",
        id: selectedCategoryId,
        name: category?.name || "Unknown Category",
      });
      setOpenConfirmModal(true);
    } else if (deleteType === "service" && selectedServiceId) {
      const service = services?.find((srv) => srv.id === selectedServiceId);
      setItemToDelete({
        type: "service",
        id: selectedServiceId,
        name: service?.name || "Unknown Service",
      });
      setOpenConfirmModal(true);
    } else {
      setDeleteError("Please select an item to delete");
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      console.log("Delete attempt:", {
        deleteType: itemToDelete?.type,
        id: itemToDelete?.id,
      });

      if (itemToDelete?.type === "category") {
        console.log("Deleting category with ID:", itemToDelete.id);
        await deleteCategory(user?.token, itemToDelete.id);
        queryClient.refetchQueries(["categories"]);
      } else if (itemToDelete?.type === "service") {
        console.log("Deleting service with ID:", itemToDelete.id);
        await deleteService(user?.token, itemToDelete.id);
        queryClient.refetchQueries(["services"]);
      }

      setOpenDeleteModal(false);
      setOpenConfirmModal(false);
      setDeleteType("");
      setSelectedCategoryId(null);
      setSelectedServiceId(null);
      setItemToDelete(null);
      deleteForm.resetFields();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteTypeChange = (value) => {
    setDeleteType(value);
    setSelectedCategoryId(null);
    setSelectedServiceId(null);
    // Reset only the specific fields, not all fields
    deleteForm.setFieldsValue({
      deleteType: value,
      categoryId: undefined,
      serviceId: undefined,
    });
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
    categoryPhoto: cat.photoUrl,
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

          <Form.Item
            label={t("admin.addService.photoUrl")}
            name="photoUrl"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseEnterPhotoUrl"),
              },
            ]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              accept="image/*"
              beforeUpload={() => false} // prevent auto-upload
              onChange={(info) => {
                if (info.fileList.length > 0) {
                  const file = info.fileList[0].originFileObj;
                  setCategoryFile(file);
                } else {
                  setCategoryFile(null);
                }
              }}
            >
              {categoryFile ? null : t("admin.addService.uploadPhoto")}
            </Upload>

            {categoryFile && (
              <img
                src={URL.createObjectURL(categoryFile)}
                alt="Category Preview"
                className="w-32 h-32 object-cover rounded-md border mt-2"
              />
            )}
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
            name="descriptionEn"
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
            name="descriptionAr"
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

      <Modal
        title={t("admin.addService.deleteItem")}
        centered
        open={openDeleteModal}
        onOk={() => setOpenDeleteModal(false)}
        onCancel={() => setOpenDeleteModal(false)}
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
          form={deleteForm}
          onFinish={handleDelete}
          className="space-y-4"
        >
          <Form.Item
            label={t("admin.addService.selectDeleteType")}
            name="deleteType"
            rules={[
              {
                required: true,
                message: t("admin.addService.pleaseSelectDeleteType"),
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder={t("admin.addService.selectTypeToDelete")}
              onChange={(value) => {
                handleDeleteTypeChange(value);
                deleteForm.setFieldsValue({ deleteType: value });
              }}
              options={[
                { value: "category", label: t("admin.addService.category") },
                { value: "service", label: t("admin.addService.service") },
              ]}
            />
          </Form.Item>

          {deleteType === "category" && (
            <Form.Item
              label={t("admin.addService.selectCategory")}
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: t("admin.addService.pleaseSelectCategory"),
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={t("admin.addService.searchToSelectCategory")}
                optionFilterProp="label"
                onChange={(value) => {
                  setSelectedCategoryId(value);
                  deleteForm.setFieldsValue({ categoryId: value });
                }}
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
          )}

          {deleteType === "service" && (
            <Form.Item
              label={t("admin.addService.selectService")}
              name="serviceId"
              rules={[
                {
                  required: true,
                  message: t("admin.addService.pleaseSelectService"),
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={t("admin.addService.searchToSelectService")}
                optionFilterProp="label"
                onChange={(value) => {
                  setSelectedServiceId(value);
                  deleteForm.setFieldsValue({ serviceId: value });
                }}
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
                options={(services || []).map((srv) => ({
                  value: srv.id,
                  label: srv.name,
                }))}
              />
            </Form.Item>
          )}

          {deleteError && <div className="text-red-600">{deleteError}</div>}
          <Button
            type="submit"
            className="px-4 py-2 rounded w-full !bg-red-600 !text-[#fff] !font-medium !shadow-custom-gray"
            disabled={deleteLoading}
          >
            {deleteLoading
              ? t("admin.addService.deleting")
              : t("admin.addService.deleteButton")}
          </Button>
        </Form>
      </Modal>

      <Modal
        title={t("admin.addService.confirmDelete")}
        centered
        open={openConfirmModal}
        onOk={confirmDelete}
        onCancel={() => setOpenConfirmModal(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        okText={t("admin.addService.yesDelete")}
        cancelText={t("admin.addService.cancel")}
        okButtonProps={{
          danger: true,
          loading: deleteLoading,
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {t("admin.addService.confirmDeleteTitle")}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {t("admin.addService.confirmDeleteMessage", {
                  type:
                    itemToDelete?.type === "category"
                      ? t("admin.addService.category").toLowerCase()
                      : t("admin.addService.service").toLowerCase(),
                  name: itemToDelete?.name || "",
                })}
              </p>
            </div>
          </div>

          {deleteError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {t("admin.addService.error")}
                  </h3>
                  <div className="mt-2 text-sm text-red-700">{deleteError}</div>
                </div>
              </div>
            </div>
          )}
        </div>
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
          <Button
            className="!bg-red-600 !text-[#fff] !font-medium !shadow-custom-gray !rounded-md !hover:bg-red-700"
            onClick={() => setOpenDeleteModal(true)}
          >
            {t("admin.addService.deleteItem")}
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
