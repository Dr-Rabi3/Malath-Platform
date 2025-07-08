import { Form, Input, message } from "antd";
import Button from "../atoms/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomPhoneInput from "../atoms/CustomPhoneInput";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { arrow } from "@floating-ui/react";
import { useAuth } from "../../store/AuthContext";
import { Roles } from "../../utils/roles";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

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

function From({ types, action, createAccount }) {
  const {
    loginWithCredentials,
    registerWithCredentials,
    loading,
    user,
    error,
  } = useAuth();
  const [messageApi, contextHelper] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { from, message: loginAlert } = location.state || {};
  const lang = localStorage.getItem("lang") || "en";
  const getError = useCallback(
    (field) => {
      const fieldError = error?.errors?.[field];
      console.log(field, fieldError, error);
      if (!fieldError) return undefined;
      if (
        typeof fieldError === "object" &&
        fieldError !== null &&
        (fieldError.ar || fieldError.en)
      ) {
        return fieldError[lang === "ar" ? "ar" : "en"];
      }
      if (Array.isArray(fieldError)) {
        return fieldError[0];
      }

      // Otherwise return as string
      return typeof fieldError === "string" ? fieldError : undefined;
    },
    [error, lang]
  );

  useEffect(() => {
    if (from) {
      messageApi.open({ type: "warning", content: loginAlert });
    }
    // console.log(user, from);
    if (user.token) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (from) navigate(from);
      else if (user.role === "User") navigate("/");
    }
  }, [user, from, loginAlert, navigate]);

  const handleLogin = useCallback(async (email, password) => {
    messageApi.open({
      key: "login",
      content: "Login...",
      type: "loading",
    });
    try {
      const result = await loginWithCredentials(email, password);
      if (result.success) {
        console.log("Login successful:", result.data);
        // Redirect or update UI as needed
        messageApi.open({
          key: "login",
          content: "Login successfully",
          type: "success",
        });
        if (result.data.role === Roles.Admin)
          navigate("/admin");
        else if (result.data.role === Roles.CusomerService)
          navigate("/support");
        else 
          navigate("/");
      } else {
        messageApi.open({
          key: "login",
          content: result.error || "Login failed",
          type: "error",
        });
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      messageApi.open({
        key: "login",
        content: error.message || "Login failed",
        type: "error",
      });
    }
  }, []);
  const handleRegister = useCallback(async (values) => {
    messageApi.open({
      key: "register",
      content: "Sign up...",
      type: "loading",
    });
    try {
      const result = await registerWithCredentials(values);
      if (result.success) {
        console.log("register successful:", result.data);
        // Redirect to success page
        messageApi.open({
          key: "register",
          content: "Register successfully",
          type: "success",
        });
        navigate("/registration-success", { replace: true });
      } else {
        console.log(result);
        messageApi.open({
          key: "register",
          content: result.message || "Registration failed",
          type: "error",
        });
        console.error("register failed:", result.error);
      }
    } catch (error) {
      messageApi.open({
        key: "register",
        content: error.message || "Registration failed",
        type: "error",
      });
    }
  }, []);

  const onFinish = useCallback(async (values) => {
    console.log("Success:", values);
    if (action === "login") await handleLogin(values.email, values.password);
    else await handleRegister(values);
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // console.log(error);
  return (
    <>
      {contextHelper}
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full px-2">
        <div className="font-regular text-[20px] sm:text-[25px] text-neutral-950 font-secondary">
          {t(`form.action.${action}`)}
        </div>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 500, width: "100%" }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col justify-center items-center w-full"
          validateMessages={validateMessages}
        >
          {types.includes("nameAr") && (
            <Form.Item
              name="fullNameAr"
              label={t("form.labels.nameAr")}
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              tooltip={t("form.tooltips.name")}
              validateStatus={getError("FullNameAr") ? "error" : ""}
              help={getError("FullNameAr")}
              disabled={loading}
              rules={[
                {
                  required: true,
                  message: t("form.validation.nameRequired"),
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          {types.includes("nameEn") && (
            <Form.Item
              name="fullNameEn"
              label={t("form.labels.nameEn")}
              layout="vertical"
              labelCol={{ span: 24 }}
              validateStatus={getError("FullNameEn") ? "error" : ""}
              help={getError("FullNameEn")}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              tooltip={t("form.tooltips.name")}
              disabled={loading}
              rules={[
                {
                  required: true,
                  message: t("form.validation.nameRequired"),
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          {types?.includes("email") && (
            <Form.Item
              label={t("form.labels.email")}
              layout="vertical"
              validateStatus={getError("Email") ? "error" : ""}
              help={getError("Email")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="email"
              disabled={loading}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: t("form.validation.emailInvalid"),
                },
              ]}
              className="w-full "
            >
              <Input
                placeholder={t("form.placeholders.email")}
                className="w-full"
              />
            </Form.Item>
          )}
          {types?.includes("phone") && (
            <Form.Item
              label={t("form.labels.phone")}
              layout="vertical"
              className="w-full"
              validateStatus={getError("MobileNumber") ? "error" : ""}
              help={getError("MobileNumber")}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              disabled={loading}
              name="mobileNumber"
              validateTrigger={["onBlur", "onSubmit"]}
              rules={[
                { required: true, message: t("form.validation.phoneRequired") },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const isValid = isPhoneValid(value);
                    // console.log(value, isValid);
                    // Basic validation - you can make this more sophisticated
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
              <CustomPhoneInput />
            </Form.Item>
          )}
          {types?.includes("whatsapp") && (
            <Form.Item
              label={t("form.labels.whatsapp")}
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              disabled={loading}
              style={{ minWidth: "100%" }}
              name="whatsAppNumber"
              validateStatus={getError("WhatsAppNumber") ? "error" : ""}
              help={getError("WhatsAppNumber")}
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
                    // console.log(value, isValid);
                    // Basic validation - you can make this more sophisticated
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
              <CustomPhoneInput />
            </Form.Item>
          )}
          {types?.includes("password") && (
            <Form.Item
              label={t("form.labels.password")}
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              disabled={loading}
              name="password"
              validateStatus={getError("Password") ? "error" : ""}
              help={getError("Password")}
              rules={[
                {
                  required: true,
                  message: t("form.validation.passwordRequired"),
                },
                action === "login"
                  ? {}
                  : {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: t("form.validation.passwordComplexity"), // Add this translation in your i18n files
                    },
              ]}
            >
              <Input.Password className="w-full" />
            </Form.Item>
          )}
          {types.includes("confirm-password") && (
            <Form.Item
              name="confirmPassword"
              label={t("form.labels.confirmPassword")}
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              disabled={loading}
              validateStatus={getError("ConfirmPassword") ? "error" : ""}
              help={getError("ConfirmPassword")}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("form.validation.confirmPasswordRequired"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("form.validation.passwordMismatch"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {types?.includes("forget-password") && (
            <Form.Item
              className="w-full text-end mt-[-8px]"
              labelCol={{ span: 24 }}
              disabled={loading}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
            >
              <Link to="" className="hover:text-black text-xs sm:text-sm">
                {t("form.links.forgotPassword")}
              </Link>
            </Form.Item>
          )}
          <Form.Item
            label={null}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-neutral-950 hover:bg-neutral-700 font-regular px-[30px] py-2 sm:py-2.5"
            >
              {t(`form.action.${action}`)} {/*{ action }*/}
            </Button>
          </Form.Item>
        </Form>
        {createAccount ? (
          <div className="text-[12px] sm:text-[14px]">
            <span className="opacity-50">
              {t("form.messages.dontHaveAccount")}{" "}
            </span>
            <Link
              className="text-brand-700 opacity-100 underline"
              to="../register"
            >
              {" "}
              {t("form.links.signUp")}{" "}
            </Link>
          </div>
        ) : (
          <div className="text-[12px] sm:text-[14px]">
            <span className="opacity-50">
              {" "}
              {t("form.messages.alreadyHaveAccount")}{" "}
            </span>
            <Link
              className="text-brand-700 opacity-100 underline"
              to="../login"
            >
              {" "}
              {t("form.links.login")}{" "}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default From;
