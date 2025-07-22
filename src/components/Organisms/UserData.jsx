import { Col, Form, Input, Row } from "antd";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import CustomPhoneInput from "../atoms/CustomPhoneInput";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useTranslation } from "react-i18next";

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

function UserData({ userData, onSubmit, isSubmitting = false }) {
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log("Success:", values);
    if (onSubmit) {
      onSubmit(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(userData);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full px-2">
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ width: "100%" }}
        initialValues={{
          name: userData?.fullName || "",
          email: userData?.email || "",
          phone: userData?.mobileNumber || "",
          whatsapp: userData?.whatsappNumber || "",
          country: userData?.country || "",
          city: userData?.city || "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col justify-center items-center w-full"
        validateMessages={validateMessages}
        disabled={!userData}
      >
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t("userData.name")}
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              tooltip={t("userData.tooltipName")}
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
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("userData.email")}
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: t("form.validation.emailInvalid"),
                },
              ]}
              className="w-full "
            >
              <Input className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t("userData.mobile")}
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="phone"
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
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("userData.whatsapp")}
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="whatsapp"
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
          </Col>
        </Row>

        <Form.Item
          label={null}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Button
            type="submit"
            className="w-full bg-neutral-950 hover:bg-neutral-700 font-regular px-[30px] py-1 sm:py-1.5"
            disabled={isSubmitting || !userData}
          >
            {isSubmitting ? t("userData.saving") : t("userData.save")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserData;
