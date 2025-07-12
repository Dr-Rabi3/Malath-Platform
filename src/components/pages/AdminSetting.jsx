import { Form, message, Spin } from "antd";
import Editor from "../Organisms/Editor";
import Button from "../atoms/Button";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEntitySettings, updateEntitySettings } from "../../api/settings";

function AdminSetting() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingData, setSettingData] = useState({
    vision: "",
    mission: "",
    values: "",
  });
  // Fetch settings on mount
  useEffect(() => {
    setLoading(true);
    getEntitySettings()
      .then((data) => {
        setSettingData(data);
        form.setFieldsValue(data);
      })
      .catch(() => {
        message.error("Failed to fetch settings");
      })
      .finally(() => setLoading(false));
  }, [form]);

  // Save handler
  const onFinish = useCallback(async (values) => {
    console.log(values);
    setSaving(true);
    try {
      await updateEntitySettings(values);
      message.success("Settings updated successfully!");
    } catch (err) {
      message.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: "100%" }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
                  <Editor content={settingData.vision} field="vision" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="submit"
                    className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
                  >
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
                  <Editor content={settingData.mission} field="mission" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="submit"
                    className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
                  >
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
                  <Editor content={settingData.values} field="values" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="submit"
                    className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
                  >
                    {t("admin.setting.save")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </div>
  );
}

export default AdminSetting;
