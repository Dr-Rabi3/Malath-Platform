import { Form } from "antd";
import Button from "../atoms/Button";
import Editor from "../Organisms/Editor";
import Blogs from "./Blogs";
import { useCallback } from "react";

function AdminBlog() {
  const onFinish = useCallback(async (values) => {
    console.log("Success:", values);
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
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
      <Blogs isAdmin={true} />
    </>
  );
}
export default AdminBlog;
