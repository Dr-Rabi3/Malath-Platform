import { Col, Form, Input, Row } from "antd";
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

function UserData() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full px-2">
      <Form
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
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
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
              <Input
                // value={ }
                defaultValue="mohamed abdalrazek"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
              <Input
                // value={}
                defaultValue="example@gmail.com"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={12}>
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
              <CustomPhoneInput defaultValue={"1030666109"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your country!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                // value={ }
                defaultValue="Egypt"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={12}>
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
              <CustomPhoneInput defaultValue={"1030666109"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              // tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                // value={ }
                defaultValue="Qena"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              layout="vertical"
              className="w-full"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ minWidth: "100%" }}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="w-full" defaultValue={"123456789"} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password defaultValue={"123456789"} />
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
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserData;
