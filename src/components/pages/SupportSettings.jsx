import { useState } from "react";
import { Table, Button, message, Modal, Form, Input, Select } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, resetPasswordBySupport } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { LockOutlined, CopyOutlined } from "@ant-design/icons";

const { Option } = Select;

function SupportSettings() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // State for password reset modal
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordForm] = Form.useForm();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fetch all users
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (resetData) => resetPasswordBySupport(user?.token, resetData),
    onSuccess: (data) => {
      messageApi.success(t("supportSettings.passwordResetSuccess"));
      setGeneratedPassword(
        data || "Password generated successfully"
      );
      setShowPassword(true);
    },
    onError: (error) => {
      messageApi.error(
        t("supportSettings.passwordResetFail", { error: error.message })
      );
    },
  });

  // Handle reset password button click
  const handleResetPassword = (userData) => {
    setSelectedUser(userData);
    setPasswordModalVisible(true);
    setGeneratedPassword("");
    setShowPassword(false);
  };

  // Handle password form submission
  const handlePasswordSubmit = () => {
    passwordForm
      .validateFields()
      .then((values) => {
        resetPasswordMutation.mutate({
          email: values.email,
          phone: values.phone,
        });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    passwordForm.resetFields();
    setPasswordModalVisible(false);
    setSelectedUser(null);
    setGeneratedPassword("");
    setShowPassword(false);
  };

  // Handle copy password
  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        messageApi.success(t("supportSettings.passwordCopied"));
      })
      .catch(() => {
        messageApi.error(t("supportSettings.copyFailed"));
      });
  };

  // Table columns configuration
  const columns = [
    {
      title: t("supportSettings.table.name"),
      dataIndex: "fullName",
      key: "name",
      render: (text, record) =>
        text || record.fullName || t("supportSettings.table.noName"),
    },
    {
      title: t("supportSettings.table.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("supportSettings.table.phone"),
      dataIndex: "mobileNumber",
      key: "phone",
    },
    {
      title: t("supportSettings.table.role"),
      dataIndex: "role",
      key: "role",
      render: (role) => role || t("supportSettings.table.noRole"),
    },
    {
      title: t("supportSettings.table.actions"),
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<LockOutlined />}
          onClick={() => handleResetPassword(record)}
          className="bg-blue-600 border-blue-600 hover:bg-blue-700"
        >
          {t("supportSettings.resetPassword")}
        </Button>
      ),
    },
  ];

  if (usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("supportSettings.loading")}</p>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {t("supportSettings.errorLoading")}
          </p>
          <p className="text-gray-600 text-sm">{usersError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("supportSettings.title")}
          </h1>
          <p className="text-gray-600">{t("supportSettings.description")}</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table
            columns={columns}
            dataSource={users || []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `${t("supportSettings.table.showing")} ${range[0]}-${
                  range[1]
                } ${t("supportSettings.table.of")} ${total} ${t(
                  "supportSettings.table.users"
                )}`,
            }}
            loading={usersLoading}
            className="responsive-table"
          />
        </div>

        {/* Reset Password Modal */}
        <Modal
          title={
            <div className="text-lg font-semibold text-gray-900 sm:text-xl">
              {t("supportSettings.modal.title", {
                name: selectedUser?.fullName || selectedUser?.email,
              })}
            </div>
          }
          open={passwordModalVisible}
          onCancel={handleModalCancel}
          onOk={handlePasswordSubmit}
          okText={t("supportSettings.modal.reset")}
          cancelText={t("supportSettings.modal.cancel")}
          width="90%"
          style={{ maxWidth: "500px" }}
          className="responsive-modal"
          okButtonProps={{
            className: "!bg-blue-600 !border-blue-600 hover:!bg-blue-700",
            loading: resetPasswordMutation.isPending,
            disabled: showPassword,
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
          {!showPassword ? (
            <Form
              layout="vertical"
              form={passwordForm}
              className="space-y-4 sm:space-y-6"
              size="large"
            >
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {t("supportSettings.modal.email")}
                  </span>
                }
                name="email"
                initialValue={selectedUser?.email}
                rules={[
                  {
                    required: true,
                    message: t(
                      "supportSettings.modal.validation.emailRequired"
                    ),
                  },
                  {
                    type: "email",
                    message: t("supportSettings.modal.validation.emailInvalid"),
                  },
                ]}
              >
                <Input
                  placeholder={t("supportSettings.modal.enterEmail")}
                  className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700 sm:text-base">
                    {t("supportSettings.modal.phone")}
                  </span>
                }
                name="phone"
                initialValue={selectedUser?.mobileNumber}
                rules={[
                  {
                    required: true,
                    message: t(
                      "supportSettings.modal.validation.phoneRequired"
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={t("supportSettings.modal.enterPhone")}
                  className="!rounded-lg !border-gray-300 focus:!border-blue-500 focus:!ring-blue-500"
                />
              </Form.Item>
            </Form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t("supportSettings.modal.passwordGenerated")}
                </h3>
                <div className="flex items-center space-x-2">
                  <Input
                    value={generatedPassword}
                    readOnly
                    className="!rounded-lg !border-green-300 !bg-green-50"
                  />
                  <Button
                    type="primary"
                    icon={<CopyOutlined />}
                    onClick={handleCopyPassword}
                    className="bg-green-600 border-green-600 hover:bg-green-700"
                  >
                    {t("supportSettings.modal.copy")}
                  </Button>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  {t("supportSettings.modal.passwordNote")}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default SupportSettings;
