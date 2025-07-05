import Card from "../Organisms/Card";
import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

const cards = [
  {
    id: 1,
    status: "Accepted",
    name: "Mohamed Abdalrazek",
    category: "Social Media / Marketing",
    title:
      "I have a big brand to marketing it (any title of service user write it)",
    description:
      "I have a big brand to marketing it (any description of service user write it), ".repeat(
        6
      ),
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    status: "Reviewing",
    name: "Mohamed Abdalrazek",
    category: "Social Media / Marketing",
    title:
      "I have a big brand to marketing it (any title of service user write it)",
    description:
      "I have a big brand to marketing it (any description of service user write it), ".repeat(
        6
      ),
    createdAt: "2025-01-01",
  },
  {
    id: 3,
    status: "New",
    name: "Mohamed Abdalrazek",
    category: "Social Media / Marketing",
    title:
      "I have a big brand to marketing it (any title of service user write it)",
    description:
      "I have a big brand to marketing it (any description of service user write it), ".repeat(
        6
      ),
    createdAt: "2025-01-01",
  },
  {
    id: 4,
    status: "Rejected",
    name: "Mohamed Abdalrazek",
    category: "Social Media / Marketing",
    title:
      "I have a big brand to marketing it (any title of service user write it)",
    description:
      "I have a big brand to marketing it (any description of service user write it), ".repeat(
        6
      ),
    createdAt: "2025-01-01",
  },
];

function AdminService() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
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
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="min-h-screen">
      <div>
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
          validateMessages={validateMessages}
        >
          <Row gutter={5} justify="start">
            <Col span={10}>
              <Form.Item
                label={t("form.type")}
                name="type"
                style={{ minWidth: "100%", marginBottom: "10px" }}
                className="w-full"
              >
                <Select
                  placeholder={t("form.selectType")}
                  onChange={onTypeChange}
                  allowClear
                >
                  <Option value="male">{t("gender.male")}</Option>
                  <Option value="female">{t("gender.female")}</Option>
                  <Option value="other">{t("gender.other")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label={t("form.service")}
                name="services"
                style={{ minWidth: "100%", marginBottom: "10px" }}
                className="w-full"
              >
                <Select placeholder={t("form.selectService")} allowClear>
                  <Option value="male">{t("gender.male")}</Option>
                  <Option value="female">{t("gender.female")}</Option>
                  <Option value="other">{t("gender.other")}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="search"
            label="Search"
            layout="vertical"
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 15 }}
            style={{ minWidth: "100%" }}
          >
            <Input placeholder={t("form.searchPlaceholder")} />
          </Form.Item>
        </Form>
      </div>
      <div className="mx-auto">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            {...card}
            isAdmin={true}
            onClick={() =>
              navigate(`${card.id}`, {
                state: { from: "service", service: card, isAdmin: true },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default AdminService;
