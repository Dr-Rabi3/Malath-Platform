import React, { useState, useEffect } from "react";
import { Form, Input, Upload, message, List, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ImagesSlider } from "../atoms/images-slider";
import { getAllSliders } from "../../api/admin";
import { getFile } from "../../api/http";
import Editor from "../Organisms/Editor";
import { createSlider } from "../../api/admin";
import { useAuth } from "../../store/AuthContext";
import Button from "../atoms/Button";
import { deleteSlider } from "../../api/admin";
import { Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const REQUIRED_WIDTH = 1360;
const REQUIRED_HEIGHT = 669;

const Slider = () => {
  const [messageApi, contextHelper] = message.useMessage();
  const [slides, setSlides] = useState([]); // { image, description }
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  // Fetch slides from backend on mount
  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      try {
        const res = await getAllSliders(i18n.language);
        if (res.isSuccess && Array.isArray(res.data)) {
          // Fetch images as blobs and convert to object URLs
          const slidesWithImages = await Promise.all(
            res.data.map(async (slide) => {
              let imageUrl = slide.imageUrl;
              let imageBlobUrl = "";
              try {
                if (imageUrl) {
                  const blob = await getFile(imageUrl);
                  imageBlobUrl = URL.createObjectURL(blob);
                }
              } catch (e) {
                imageBlobUrl = "";
              }
              return {
                image: imageBlobUrl,
                description: slide.description,
                title: slide.title,
                id: slide.id,
                order: slide.order,
              };
            })
          );
          setSlides(slidesWithImages);
        } else {
          setSlides([]);
        }
      } catch (err) {
        messageApi.error(t("admin.slider.fetchSlidersError"));
        setSlides([]);
      }
      setLoading(false);
    };
    fetchSlides();
  }, []);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const beforeUpload = (file) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== REQUIRED_WIDTH || img.height !== REQUIRED_HEIGHT) {
          messageApi.error(
            t("admin.slider.imageSizeError", {
              width: REQUIRED_WIDTH,
              height: REQUIRED_HEIGHT,
            })
          );
          reject();
        } else {
          resolve();
        }
      };
      img.onerror = () => {
        messageApi.error(t("admin.slider.invalidImageError"));
        reject();
      };
    });
  };

  const onFinish = async (values) => {
    setUploading(true);
    const file = values.image[0]?.originFileObj;
    if (!file) {
      messageApi.error(t("admin.slider.uploadImageError"));
      setUploading(false);
      return;
    }
    try {
      await createSlider(user.token, {
        titleEn: values.titleEn,
        titleAr: values.titleAr,
        descriptionEn: values.descriptionEn,
        descriptionAr: values.descriptionAr,
        imageFile: file,
        order: slides.length + 1,
      });
      messageApi.success(t("admin.slider.createSliderSuccess"));
      form.resetFields();
      if (typeof window !== "undefined") window.location.reload();
    } catch (err) {
      messageApi.error(err.message || t("admin.slider.createSliderError"));
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSlider(user.token, id);
      messageApi.success(t("admin.slider.deleteSliderSuccess"));
      if (typeof window !== "undefined") window.location.reload();
    } catch (err) {
      messageApi.error(err.message || t("admin.slider.deleteSliderError"));
    }
  };

  return (
    <>
      {contextHelper}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
        <h2 style={{ marginBottom: 24 }}>{t("admin.slider.title")}</h2>
        <div style={{ marginBottom: 32 }}>
          <h3>{t("admin.slider.currentSlides")}</h3>
          {loading ? (
            <Spin />
          ) : slides.length > 0 ? (
            <div style={{ marginBottom: 16 }}>
              <ImagesSlider
                images={slides.map((s) => s.image)}
                autoplay={false}
              />
            </div>
          ) : (
            <p>{t("admin.slider.noSlides")}</p>
          )}
          <List
            itemLayout="horizontal"
            dataSource={slides}
            renderItem={(slide, idx) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title={t("admin.slider.deleteConfirmTitle")}
                    onConfirm={() => handleDelete(slide.id)}
                    okText={t("admin.slider.deleteConfirmYes")}
                    cancelText={t("admin.slider.deleteConfirmNo")}
                    key="delete"
                  >
                    <span style={{ color: "red", cursor: "pointer" }}>
                      {t("admin.slider.deleteSlide")}
                    </span>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={slide.image}
                      alt="slide"
                      style={{
                        width: 80,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  }
                  title={
                    slide.title
                      ? `${slide.title}`
                      : t("admin.slider.slideNumber", { number: idx + 1 })
                  }
                  description={
                    <span
                      dangerouslySetInnerHTML={{ __html: slide.description }}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div>
          <h3>{t("admin.slider.addNewSlide")}</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400 }}
          >
            <Form.Item
              name="titleEn"
              label={t("admin.slider.slideTitle") + " (English)"}
              rules={[
                {
                  required: true,
                  message: t("admin.slider.enterTitleError") + " (English)",
                },
              ]}
            >
              <Input
                placeholder={t("admin.slider.enterSlideTitle") + " (English)"}
              />
            </Form.Item>
            <Form.Item
              name="titleAr"
              label={t("admin.slider.slideTitle") + " (Arabic)"}
              rules={[
                {
                  required: true,
                  message: t("admin.slider.enterTitleError") + " (Arabic)",
                },
              ]}
            >
              <Input
                placeholder={t("admin.slider.enterSlideTitle") + " (Arabic)"}
                dir="rtl"
              />
            </Form.Item>
            <Form.Item
              name="image"
              label={t("admin.slider.slideImage")}
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                {
                  required: true,
                  message: t("admin.slider.uploadImageRequired"),
                },
              ]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                beforeUpload={beforeUpload}
                showUploadList={{ showPreviewIcon: true }}
                customRequest={({ file, onSuccess }) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                onPreview={handlePreview}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{t("admin.slider.upload")}</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              name="descriptionEn"
              label={t("admin.slider.slideDescription") + " (English)"}
              rules={[
                {
                  required: true,
                  message:
                    t("admin.slider.enterDescriptionError") + " (English)",
                },
              ]}
            >
              <Editor field="descriptionEn" limited={1000} />
            </Form.Item>
            <Form.Item
              name="descriptionAr"
              label={t("admin.slider.slideDescription") + " (Arabic)"}
              rules={[
                {
                  required: true,
                  message:
                    t("admin.slider.enterDescriptionError") + " (Arabic)",
                },
              ]}
            >
              <Editor field="descriptionAr" limited={1000} />
            </Form.Item>
            <Form.Item>
              <Button
                type="submit"
                loading={uploading}
                className="!bg-[#E6F3FF] !text-[#000] !text-[15px] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
              >
                {t("admin.slider.addSlide")}
              </Button>
            </Form.Item>
          </Form>
          <Modal
            open={previewVisible}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Slider;
