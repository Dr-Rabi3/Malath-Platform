import { Form, Input } from "antd";
import { PhoneNumberUtil } from "google-libphonenumber";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

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

function AddService() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-accent-25 shadow-custom-gray">
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full px-2">
        <div className="font-regular text-[20px] sm:text-[25px] text-neutral-950 font-secondary">
          Service info
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
          <Form.Item
            label="Type"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="type"
            rules={[
              {
                required: true,
                type: "type",
              },
            ]}
            className="w-full"
          >
            <Input placeholder="example@gmail.com" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Service"
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
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item
            label="Link"
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
            <Input.Password className="w-full" />
          </Form.Item>
          <Form.Item
            label="Name"
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

          <Form.Item
            label={null}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Button
              type="submit"
              className="w-full bg-neutral-950 hover:bg-neutral-700 font-regular px-[30px] py-2 sm:py-2.5"
            >
              Send Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddService;
