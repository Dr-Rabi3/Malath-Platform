import { AutoComplete, Col, Form, Input, message, Row, Select } from "antd";
import { useState } from "react";

import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

const { Option } = Select;

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

function AddService() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [messageApi, contextHelper] = message.useMessage();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const { t } = useTranslation();

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  const onTypeChange = (value) => {
    // switch (value) {
    //   case "male":
    //     form.setFieldsValue({ services: "Hi, man!" });
    //     break;
    //   case "female":
    //     form.setFieldsValue({ services: "Hi, lady!" });
    //     break;
    //   case "other":
    //     form.setFieldsValue({ services: "Hi there!" });
    //     break;
    //   default:
    // }
  };

  const onFinish = (values) => {
    if (!user.token) {
      messageApi.open({
        type: "info",
        content: t("addService.loginWarning"),
      });
      return null;
    }
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHelper}
      <div className="bg-accent-25 shadow-custom-gray flex flex-col items-center justify-center space-y-4 sm:space-y-5 w-full p-12">
        <div className="font-semibold text-[20px] sm:text-[25px] text-neutral-950 font-secondary">
          {t("addService.title")}
        </div>
        <Form
          form={form}
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
          <Form.Item
            name="title"
            label={t("addService.serviceTitle")}
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            rules={[
              {
                required: true,
                message: t("addService.titleRequired"),
                whitespace: true,
              },
            ]}
          >
            <Input placeholder={t("addService.serviceTitle")} />
          </Form.Item>
          <Row className="w-full" justify="space-between">
            <Col span={11}>
              <Form.Item
                label={t("addService.selectType")}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ minWidth: "100%" }}
                name="type"
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: t("addService.typeRequired"),
                  },
                ]}
                className="w-full"
              >
                <Select
                  placeholder={t("addService.selectType")}
                  onChange={onTypeChange}
                  allowClear
                >
                  <Option value="male">{t("addService.types.male")}</Option>
                  <Option value="female">{t("addService.types.female")}</Option>
                  <Option value="other">{t("addService.types.other")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label={t("addService.selectService")}
                layout="vertical"
                className="w-full"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ minWidth: "100%" }}
                name="services"
                rules={[
                  {
                    required: true,
                    message: t("addService.serviceRequired"),
                    whitespace: true,
                  },
                ]}
              >
                <Select
                  placeholder={t("addService.selectService")}
                  // onChange={onTypeChange}
                  allowClear
                >
                  <Option value="male">{t("addService.types.male")}</Option>
                  <Option value="female">{t("addService.types.female")}</Option>
                  <Option value="other">{t("addService.types.other")}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("addService.website")}
            layout="vertical"
            className="w-full"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ minWidth: "100%" }}
            name="website"
            rules={[
              {
                required: true,
                message: t("addService.websiteRequired"),
                whitespace: true,
              },
            ]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder={t("addService.websitePlaceholder")}
            >
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            className="w-full"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Editor />
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
              {t("addService.sendRequest")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AddService;
