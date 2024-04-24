import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { postData } from "../../api/api";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";

const AddDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const submitHandler = () => {
    form
      .validateFields()
      .then(async (values) => {
        values.phoneNumber = `+1${values.phoneNumber}`;
        postData("customers", values);
        closeDrawer();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [form] = Form.useForm();

  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+1">+1</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New
      </Button>
      <Drawer
        title="Create a new customer"
        width={720}
        onClose={closeDrawer}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button onClick={submitHandler} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} initialValues={{ prefix: "+1" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input
                  placeholder="Please enter first name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input
                  placeholder="Please enter last name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input
                  placeholder="Please enter last name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="remarks"
                label="Remarks"
                rules={[
                  {
                    message: "Please enter remarks",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Please enter remarks"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddDrawer;
