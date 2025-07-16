import { Form, message, Spin } from "antd";
import Editor from "../Organisms/Editor";
import Button from "../atoms/Button";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEntitySettings, updateEntitySettings } from "../../api/settings";

function AdminSetting() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageApi, contextHelper] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingData, setSettingData] = useState({
    visionEn: "",
    visionAr: "",
    missionEn: "",
    missionAr: "",
    valuesEn: "",
    valuesAr: "",
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
        messageApi.error(
          t("admin.setting.fetchError", "Failed to fetch settings")
        );
      })
      .finally(() => setLoading(false));
  }, [form, messageApi, t]);

  // Save handler
  const onFinish = useCallback(
    async (values) => {
      console.log(values);
      setSaving(true);
      try {
        await updateEntitySettings(values);
        messageApi.success(
          t("admin.setting.updateSuccess", "Settings updated successfully!")
        );
      } catch (err) {
        messageApi.error(
          t("admin.setting.updateError", "Failed to update settings")
        );
      } finally {
        setSaving(false);
      }
    },
    [t, messageApi]
  );

  return (
    <div>
      {contextHelper}
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
          autoComplete="off"
          className="flex flex-col w-full space-y-8"
        >
          {/* Vision Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h1 className="!font-semibold text-base !text-[18px] mb-6 text-gray-800 border-b pb-2">
              {t("admin.setting.vision")}
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Form.Item
                  name="visionEn"
                  label={t("admin.setting.englishVision", "Vision in English")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.englishVisionRequired",
                        "Please enter vision in English"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.visionEn} field="visionEn" />
                </Form.Item>
              </div>
              <div className="space-y-2">
                <Form.Item
                  name="visionAr"
                  label={t("admin.setting.arabicVision", "Vision in Arabic")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.arabicVisionRequired",
                        "Please enter vision in Arabic"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.visionAr} field="visionAr" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="m-auto h-[2px] w-[80%] bg-gray-300"></div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h1 className="!font-semibold text-base !text-[18px] mb-6 text-gray-800 border-b pb-2">
              {t("admin.setting.mission")}
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Form.Item
                  name="missionEn"
                  label={t(
                    "admin.setting.englishMission",
                    "Mission in English"
                  )}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.englishMissionRequired",
                        "Please enter mission in English"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.missionEn} field="missionEn" />
                </Form.Item>
              </div>
              <div className="space-y-2">
                <Form.Item
                  name="missionAr"
                  label={t("admin.setting.arabicMission", "Mission in Arabic")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.arabicMissionRequired",
                        "Please enter mission in Arabic"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.missionAr} field="missionAr" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="m-auto h-[2px] w-[80%] bg-gray-300"></div>

          {/* Values Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h1 className="!font-semibold text-base !text-[18px] mb-6 text-gray-800 border-b pb-2">
              {t("admin.setting.values")}
            </h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Form.Item
                  name="valuesEn"
                  label={t("admin.setting.englishValues", "Values in English")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.englishValuesRequired",
                        "Please enter values in English"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.valuesEn} field="valuesEn" />
                </Form.Item>
              </div>
              <div className="space-y-2">
                <Form.Item
                  name="valuesAr"
                  label={t("admin.setting.arabicValues", "Values in Arabic")}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: t(
                        "admin.setting.arabicValuesRequired",
                        "Please enter values in Arabic"
                      ),
                    },
                  ]}
                >
                  <Editor content={settingData.valuesAr} field="valuesAr" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Form.Item>
              <Button
                type="submit"
                className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8] !px-8 !py-2"
                loading={saving}
                size="large"
              >
                {t("admin.setting.save")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
}

export default AdminSetting;
