"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex h-dvh justify-center items-center">
      <Image
        src="/login-background.jpg"
        sizes="100vw"
        fill
        alt="groomate logo"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <div className="w-80 bg-white/[.90] shadow-lg rounded-xl px-12 pt-8 pb-8">
        <Image
          src="/groomate-logo-transparent.png"
          width={200}
          height={30}
          alt="groomate logo"
          className="mb-6 mx-auto"
        />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon h-8" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon h-8" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-10">
              LOG IN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
