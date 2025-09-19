import { Form, message, Upload, Button as AntButton } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import Blogs from "./Blogs";
import { useCallback, useState, useRef, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";
import { createBlog, getBlogs, deleteBlog } from "../../api/admin";
import { uploadFile, getFile } from "../../api/http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function AdminBlog() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => {
        if (img.url && img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, []);

  // Mutation for creating a blog
  const createBlogMutation = useMutation({
    mutationFn: (values) => createBlog(user?.token, values),
    onSuccess: () => {
      message.success(t("adminBlog.createSuccess", "Blog created!"));
      form.resetFields();

      // Clean up blob URLs before clearing
      uploadedImages.forEach((img) => {
        if (img.url && img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });

      setUploadedImages([]); // Clear uploaded images
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      message.error(
        t("adminBlog.createError", {
          error: err.message,
          defaultValue: "Failed to create blog: {{error}}",
        })
      );
    },
  });

  // Mutation for deleting a blog
  const deleteBlogMutation = useMutation({
    mutationFn: (blogId) => deleteBlog(user?.token, blogId),
    onSuccess: () => {
      message.success(t("adminBlog.deleteSuccess", "Blog deleted!"));
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      message.error(
        t("adminBlog.deleteError", {
          error: err.message,
          defaultValue: "Failed to delete blog: {{error}}",
        })
      );
    },
  });

  // Delete handler
  const handleDelete = useCallback(
    (blogId) => {
      deleteBlogMutation.mutate(blogId);
    },
    [deleteBlogMutation]
  );

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (uploadedImages.length >= 4) {
      message.error(
        t("adminBlog.maxImagesReached", "Maximum 4 images allowed")
      );
      return false;
    }

    // First add the file to the list with uploading status
    const newImage = {
      uid: file.uid,
      name: file.name,
      status: "uploading",
      url: "",
      file: file,
    };

    setUploadedImages((prev) => [...prev, newImage]);
    setUploading(true);

    try {
      // Upload the file
      const uploadResult = await uploadFile(user?.token, file, "blog");

      // Get the file path - it should be a relative path
      const filePath = uploadResult.url || uploadResult;

      // Create a blob URL for display
      let imageUrl = "";
      try {
        const blob = await getFile(filePath);
        imageUrl = URL.createObjectURL(blob);
      } catch (blobError) {
        console.error("Error creating blob URL:", blobError);
        // Fallback: try to construct URL directly
        imageUrl = `${
          import.meta.env.VITE_API_BASE_URL
        }api/General/download?filePath=${filePath}`;
      }

      // Update the image with the uploaded URL
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.uid === file.uid
            ? {
                ...img,
                status: "done",
                url: imageUrl,
                filePath: filePath, // Store original path for API
              }
            : img
        )
      );

      message.success(
        t("adminBlog.imageUploadSuccess", "Image uploaded successfully")
      );
    } catch (error) {
      // Update the image with error status
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.uid === file.uid
            ? {
                ...img,
                status: "error",
              }
            : img
        )
      );

      message.error(t("adminBlog.imageUploadError", "Failed to upload image"));
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }

    return false; // Prevent default upload behavior
  };

  // Handle image removal
  const handleImageRemove = (file) => {
    // Clean up blob URL before removing
    if (file.url && file.url.startsWith("blob:")) {
      URL.revokeObjectURL(file.url);
    }

    setUploadedImages((prev) => prev.filter((img) => img.uid !== file.uid));
    return true;
  };

  // Handle image preview
  const handlePreview = async (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  // Form submit handler
  const onFinish = useCallback(
    async (values) => {
      try {
        // Prepare photos array from uploaded images - use filePath for API, not blob URL
        const photos = uploadedImages
          .filter((img) => img.status === "done" && img.filePath)
          .map((img) => img.filePath);

        // Create blog with photos
        const blogData = {
          ...values,
          photos: photos,
        };

        createBlogMutation.mutate(blogData);
      } catch (error) {
        message.error(t("adminBlog.submitError", "Failed to submit blog"));
        console.error("Submit error:", error);
      }
    },
    [createBlogMutation, uploadedImages, t]
  );

  const onFinishFailed = (errorInfo) => {
    message.error(
      t("adminBlog.submitError", {
        error: errorInfo,
        defaultValue: "Failed to submit: {{error}}",
      })
    );
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col w-full"
      >
        <Form.Item
          label={null}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <div className="flex justify-between">
            <h1 className="font-main text-[18px] font-semibold">
              {t("adminBlog.addNewBlog", "Add new blog")}
            </h1>
            <Button
              type="submit"
              className="!bg-[#E6F3FF] !text-[#000] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
              loading={createBlogMutation.isLoading}
            >
              {t("adminBlog.addBlog", "Add Blog")}
            </Button>
          </div>
        </Form.Item>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Form.Item
            name="contentEn"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label={t("adminBlog.englishContent", "Content in English")}
            rules={[
              {
                required: true,
                message: t(
                  "adminBlog.englishContentRequired",
                  "Please enter content in English"
                ),
                whitespace: true,
              },
            ]}
          >
            <Editor field="contentEn" />
          </Form.Item>
          <Form.Item
            name="contentAr"
            label={t("adminBlog.arabicContent", "Content in Arabic")}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: t(
                  "adminBlog.arabicContentRequired",
                  "Please enter content in Arabic"
                ),
                whitespace: true,
              },
            ]}
          >
            <Editor field="contentAr" />
          </Form.Item>
        </div>

        {/* Image Upload Section */}
        <Form.Item
          label={t("adminBlog.images", "Images")}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <div className="space-y-4">
            <Upload
              listType="picture-card"
              fileList={uploadedImages}
              onRemove={handleImageRemove}
              onPreview={handlePreview}
              beforeUpload={handleImageUpload}
              accept="image/*"
              multiple={false}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
              disabled={uploading || uploadedImages.length >= 4}
              customRequest={() => {}} // Prevent default upload behavior
            >
              {uploadedImages.length >= 4 ? null : (
                <div className="text-center">
                  <UploadOutlined className="text-2xl text-gray-400" />
                  <div className="mt-2 text-sm text-gray-500">
                    {t("adminBlog.uploadImage", "Upload Image")}
                  </div>
                  <div className="text-xs text-gray-400">
                    {t("adminBlog.maxImages", "Max 4 images")}
                  </div>
                </div>
              )}
            </Upload>

            {uploadedImages.length > 0 && (
              <div className="text-sm text-gray-600">
                {t("adminBlog.uploadedImages", "Uploaded Images")}:{" "}
                {uploadedImages.length}/4
                {uploading && (
                  <span className="ml-2 text-blue-500">
                    {t("adminBlog.uploading", "Uploading...")}
                  </span>
                )}
              </div>
            )}
          </div>
        </Form.Item>
      </Form>
      <Blogs isAdmin={true} onDelete={handleDelete} />
    </>
  );
}
export default AdminBlog;
