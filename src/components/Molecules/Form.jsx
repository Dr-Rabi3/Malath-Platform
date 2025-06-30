import { Form, Input } from "antd";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import CustomPhoneInput from "../atoms/CustomPhoneInput";
import { PhoneNumberUtil } from "google-libphonenumber";

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
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full px-2">
      <div className="font-regular text-[20px] sm:text-[25px] text-neutral-950 font-secondary">
        {action}
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
        {types.includes("name") && (
          <Form.Item
            name="Name"
            label="Name"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {types?.includes("email") && (
          <Form.Item
            label="Email"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
            className="w-full "
          >
            <Input placeholder="example@gmail.com" className="w-full" />
          </Form.Item>
        )}
        {types?.includes("phone") && (
          <Form.Item
            label="Mobile number"
            layout="vertical"
            className="w-full"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="phone"
            validateTrigger={["onBlur", "onSubmit"]}
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const isValid = isPhoneValid(value);
                  // console.log(value, isValid);
                  // Basic validation - you can make this more sophisticated
                  if (!isValid) {
                    return Promise.reject(
                      new Error("Please enter a valid phone number")
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
            label="WhatsApp number"
            layout="vertical"
            className="w-full"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="whatsapp"
            validateTrigger={["onBlur", "onSubmit"]}
            rules={[
              { required: true, message: "Please input your phone!" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const isValid = isPhoneValid(value);
                  // console.log(value, isValid);
                  // Basic validation - you can make this more sophisticated
                  if (!isValid) {
                    return Promise.reject(
                      new Error("Please enter a valid phone number")
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
            label="Password"
            layout="vertical"
            className="w-full"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="w-full" />
          </Form.Item>
        )}
        {types.includes("confirm-password") && (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            layout="vertical"
            className="w-full"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
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
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
          >
            <Link to="" className="hover:text-black text-xs sm:text-sm">
              Forgot password
            </Link>
          </Form.Item>
        )}
        <Form.Item
          label={null}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Button
            type="submit"
            className="w-full bg-neutral-950 hover:bg-neutral-700 font-regular px-[30px] py-2 sm:py-2.5"
          >
            {action}
          </Button>
        </Form.Item>
      </Form>
      {createAccount ? (
        <div className="text-[12px] sm:text-[14px]">
          <span className="opacity-50"> Don't have an account? </span>
          <Link
            className="text-brand-700 opacity-100 underline"
            to="../register"
          >
            {" "}
            Sign up{" "}
          </Link>
        </div>
      ) : (
        <div className="text-[12px] sm:text-[14px]">
          <span className="opacity-50"> Already have an account? </span>
          <Link
            className="text-brand-700 opacity-100 underline"
            to="../login"
          >
            {" "}
            Login{" "}
          </Link>
        </div>
      )}
    </div>
  );
}

export default From;
