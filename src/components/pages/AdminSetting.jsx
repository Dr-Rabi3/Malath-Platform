import { Form } from "antd";
import Editor from "../Organisms/Editor";
import Button from "../atoms/Button";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function AdminSetting() {
  const { t } = useTranslation();

  const onFinish = useCallback(async (values) => {
    console.log("Success:", values);
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
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
          className="flex flex-col w-full space-y-5"
        >
          <Form.List>
            {() => (
              <>
                <h1 className="!font-semibold text-base !text-[18px]">
                  {t("admin.setting.vision")}
                </h1>
                <Form.Item
                  name="vision"
                  layout="vertical"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{ minWidth: "100%" }}
                >
                  <Editor />
                </Form.Item>
                <Form.Item>
                  <Button className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]">
                    {t("admin.setting.save")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="m-auto h-[2px] w-[80%] bg-gray-300"></div>
          <Form.List>
            {() => (
              <>
                <h1 className="!font-semibold text-base !text-[18px]">
                  {t("admin.setting.mission")}
                </h1>
                <Form.Item
                  name="mission"
                  layout="vertical"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{ minWidth: "100%" }}
                >
                  <Editor />
                </Form.Item>
                <Form.Item>
                  <Button className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]">
                    {t("admin.setting.save")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="m-auto h-[2px] w-[80%] bg-gray-300"></div>
          <Form.List>
            {() => (
              <>
                <h1 className="!font-semibold text-base !text-[18px]">
                  {t("admin.setting.values")}
                </h1>
                <Form.Item
                  name="values"
                  layout="vertical"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{ minWidth: "100%" }}
                >
                  <Editor />
                </Form.Item>
                <Form.Item>
                  <Button className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]">
                    {t("admin.setting.save")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </>
  );
}

export default AdminSetting;
