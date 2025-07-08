import { Form, message } from "antd";
import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import Blogs from "./Blogs";
import { useCallback, useState, useRef } from "react";
import { useAuth } from "../../store/AuthContext";
import { createBlog, getBlogs, deleteBlog } from "../../api/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function AdminBlog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // Mutation for creating a blog
  const createBlogMutation = useMutation({
    mutationFn: (values) => createBlog(user?.token, values),
    onSuccess: () => {
      message.success("Blog created!");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      message.error("Failed to create blog: " + err.message);
    },
  });

  // Mutation for deleting a blog
  const deleteBlogMutation = useMutation({
    mutationFn: (blogId) => deleteBlog(user?.token, blogId),
    onSuccess: () => {
      message.success("Blog deleted!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      message.error("Failed to delete blog: " + err.message);
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
    message.error("Failed to submit: " + errorInfo);
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
              Add new blog
            </h1>
            <Button
              type="submit"
              className="!bg-[#E6F3FF] !text-[#000] !font-medium !shadow-custom-gray !rounded-md !hover:bg-[#c7e1f8]"
              loading={createBlogMutation.isLoading}
            >
              Add Blog
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="description"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Editor />
        </Form.Item>
      </Form>
      <Blogs
        isAdmin={true}
        onDelete={handleDelete}
      />
    </>
  );
}
export default AdminBlog;
