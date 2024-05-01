"use client";
import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { postData } from "@/app/api/api";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const redirect = () => {
    router.replace("/admin/board");
  };
  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      redirect();
    }
  }, []);

  const onFinish = async (values: any) => {
    try {
      const response = await postData("auth/login", values);
      sessionStorage.setItem("access_token", response.access_token);
      redirect();
    } catch (error) {
      console.error(error);
    }
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

      <div className="w-96 bg-white/[.90] shadow-lg rounded-xl px-14 pt-8 pb-8">
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
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon h-8" />}
              placeholder="Email"
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
