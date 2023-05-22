import { Button, DatePicker, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const SignUpForm2 = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?{" "}
        <Link to="/login" className="font-medium underline text-primary">
          Login
        </Link>
      </p>
      <button className="flex items-center justify-center w-full py-4 mb-5 text-xl font-semibold border gap-x-3 border-strock rounded-xl text-text2 dark:text-white dark:border-darkStroke">
        {/* <img srcSet="/icon-google.png 2x" alt="icon-google" /> */}
        <span>Sign up with google</span>
      </button>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Fullname"
          name="userFullname"
          rules={[{ required: true, message: "Please input your Fullname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="userEmail"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phonenumber"
          name="userPhone"
          rules={[{ required: true, message: "xxx-xxx-xxx!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Date of Birth" name="userDayOfBirth">
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm2;
