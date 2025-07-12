import { Modal, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import React from "react";

const ChangePasswordModal = ({ visible, onCancel, loading }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [messageApi, contextHelper] = message.useMessage();
  const { user } = useAuth();

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (passwordData) => changePassword(user?.token, passwordData),
    onSuccess: () => {
      messageApi.success(t("profile.passwordChangeSuccess"));
      form.resetFields();
      onCancel();
    },
    onError: (error) => {
      messageApi.error(
        t("profile.passwordChangeFail", { error: error.message })
      );
    },
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        changePasswordMutation.mutate({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      {contextHelper}
      <Modal
        title={
          <div className="text-lg font-semibold text-gray-900 sm:text-xl">
            {t("profile.changePassword")}
          </div>
        }
        open={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={t("profile.save")}
        cancelText={t("profile.cancel")}
        width="90%"
        style={{ maxWidth: "500px" }}
        className="responsive-modal"
        okButtonProps={{
          className: "!bg-blue-600 !border-blue-600 hover:!bg-blue-700",
          loading: changePasswordMutation.isPending,
        }}
        cancelButtonProps={{
          className: "!border-gray-300 !text-gray-700 hover:!border-gray-400",
        }}
        styles={{
          body: {
            padding: "24px",
          },
        }}
      >
        <Form
          layout="vertical"
          form={form}
          className="space-y-4 sm:space-y-6"
          size="large"
        >
          <Form.Item
            label={
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                {t("profile.oldPassword")}
              </span>
            }
            name="oldPassword"
            rules={[
              {
                required: true,
                message: t("profile.validation.oldPasswordRequired"),
              },
            ]}
          >
            <Input.Password
              placeholder={t("profile.enterOldPassword")}
              className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                {t("profile.newPassword")}
              </span>
            }
            name="newPassword"
            rules={[
              {
                required: true,
                message: t("profile.validation.newPasswordRequired"),
              },
              {
                min: 6,
                message: t("profile.validation.passwordMinLength"),
              },
            ]}
          >
            <Input.Password
              placeholder={t("profile.enterNewPassword")}
              className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                {t("profile.confirmNewPassword")}
              </span>
            }
            name="confirmNewPassword"
            rules={[
              {
                required: true,
                message: t("profile.validation.confirmPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("profile.validation.passwordsMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t("profile.confirmNewPasswordPlaceholder")}
              className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
