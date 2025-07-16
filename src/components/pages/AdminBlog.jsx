import { Form, message } from "antd";
import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import Blogs from "./Blogs";
import { useCallback, useState, useRef } from "react";
import { useAuth } from "../../store/AuthContext";
import { createBlog, getBlogs, deleteBlog } from "../../api/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function AdminBlog() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // Mutation for creating a blog
  const createBlogMutation = useMutation({
    mutationFn: (values) => createBlog(user?.token, values),
    onSuccess: () => {
      message.success(t("adminBlog.createSuccess", "Blog created!"));
      form.resetFields();
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

  // Form submit handler
  const onFinish = useCallback(
    (values) => {
      createBlogMutation.mutate(values);
    },
    [createBlogMutation]
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
      </Form>
      <Blogs isAdmin={true} onDelete={handleDelete} />
    </>
  );
}
export default AdminBlog;
