import { Modal, Form, Input, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import { getLocalizedRole } from "../../utils/roles";
import CustomPhoneInput from "../atoms/CustomPhoneInput";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, addUserWithRole } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import React, { useEffect } from "react";

const { Option } = Select;

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const AddUserModal = ({ visible, onCancel, userToEdit, onSubmit, loading }) => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [messageApi, contextHelper] = message.useMessage();
  const { user } = useAuth();
  const token = user?.token;
  const queryClient = useQueryClient();

  // Fetch roles only once on mount
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(token),
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Prefill form when editing
  useEffect(() => {
    if (userToEdit && visible) {
      form.setFieldsValue({
        name: userToEdit.fullNameEn || userToEdit.fullNameAr || "",
        email: userToEdit.email || "",
        mobileNumber: userToEdit.mobileNumber || "",
        whatsAppNumber: userToEdit.whatsAppNumber || "",
        rule: userToEdit.role || "",
        // No password fields for edit
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [userToEdit, visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  console.log(userToEdit);
  return (
    <>
      {contextHelper}
      <Modal
        title={
          <div className="text-lg font-semibold text-gray-900 sm:text-xl">
            {userToEdit
              ? t("admin.addUserModal.editUser")
              : t("admin.addUserModal.addUser")}
          </div>
        }
        open={visible}
        onCancel={onCancel}
        onOk={handleOk}
        okText={
          userToEdit
            ? t("admin.addUserModal.save")
            : t("admin.addUserModal.add")
        }
        cancelText={t("admin.addUserModal.cancel")}
        width="90%"
        style={{ maxWidth: "600px" }}
        className="responsive-modal"
        okButtonProps={{
          className: "!bg-blue-600 !border-blue-600 hover:!bg-blue-700",
          loading,
        }}
        cancelButtonProps={{
          className: "!border-gray-300 !text-gray-700 hover:!border-gray-400",
        }}
        styles={{
          body: {
            padding: "24px",
            maxHeight: "80vh",
            overflowY: "auto",
          },
        }}
      >
        <Form
          layout="vertical"
          form={form}
          className="space-y-4 sm:space-y-6"
          size="large"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  {t("admin.addUserModal.name")}
                </span>
              }
              name="name"
              rules={[
                {
                  required: true,
                  message: t("admin.addUserModal.validation.nameRequired"),
                },
              ]}
              className="sm:col-span-2"
            >
              <Input
                placeholder={t("admin.addUserModal.enterName")}
                className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  {t("admin.addUserModal.email")}
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: t("admin.addUserModal.validation.emailRequired"),
                },
                {
                  type: "email",
                  message: t("admin.addUserModal.validation.emailInvalid"),
                },
              ]}
              className="sm:col-span-2"
            >
              <Input
                placeholder={t("admin.addUserModal.enterEmail")}
                className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
              />
            </Form.Item>
          </div>
          {!userToEdit && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {t("admin.addUserModal.password")}
                  </span>
                }
                name="password"
                rules={[
                  {
                    required: true,
                    message: t(
                      "admin.addUserModal.validation.passwordRequired"
                    ),
                  },
                  {
                    min: 6,
                    message: t(
                      "admin.addUserModal.validation.passwordMinLength"
                    ),
                  },
                ]}
              >
                <Input.Password
                  placeholder={t("admin.addUserModal.enterPassword")}
                  className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {t("admin.addUserModal.confirmPassword")}
                  </span>
                }
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: t(
                      "admin.addUserModal.validation.confirmPasswordRequired"
                    ),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          t("admin.addUserModal.validation.passwordsMismatch")
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder={t(
                    "admin.addUserModal.confirmPasswordPlaceholder"
                  )}
                  className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
                />
              </Form.Item>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  {t("form.labels.phone")}
                </span>
              }
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="mobileNumber"
              validateTrigger={["onBlur", "onSubmit"]}
              rules={[
                { required: true, message: t("form.validation.phoneRequired") },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const isValid = isPhoneValid(value);
                    if (!isValid) {
                      return Promise.reject(
                        new Error(t("form.validation.phoneInvalid"))
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="!rounded-lg !border-gray-300 focus-within:!border-blue-500 focus-within:!ring-blue-500">
                <CustomPhoneInput value={userToEdit?.mobileNumber} />
              </div>
            </Form.Item>
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700 sm:text-base">
                  {t("form.labels.whatsapp")}
                </span>
              }
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="whatsAppNumber"
              validateTrigger={["onBlur", "onSubmit"]}
              rules={[
                {
                  required: true,
                  message: t("form.validation.whatsappRequired"),
                },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const isValid = isPhoneValid(value);
                    if (!isValid) {
                      return Promise.reject(
                        new Error(t("form.validation.phoneInvalid"))
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="!rounded-lg !border-gray-300 focus-within:!border-blue-500 focus-within:!ring-blue-500">
                <CustomPhoneInput value={userToEdit?.whatsAppNumber} />
              </div>
            </Form.Item>
          </div>
          <Form.Item
            label={
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                {t("admin.addUserModal.role")}
              </span>
            }
            name="rule"
            rules={[
              {
                required: !userToEdit,
                message: t("admin.addUserModal.validation.roleRequired"),
              },
            ]}
          >
            <Select
              placeholder={t("admin.addUserModal.selectRole")}
              className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
              size="large"
            >
              {roles?.map((role) => (
                <Option key={role.id} value={role.name}>
                  {getLocalizedRole(role.name, i18n.language)}
                </Option>
              ))}
              {(!roles || roles.length === 0) && (
                <Option value={null}>{t("admin.addUserModal.noRoles")}</Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModal;
