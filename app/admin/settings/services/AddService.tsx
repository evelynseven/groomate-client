import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { postData } from "@/app/api/api";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";

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
        postData("services", values);
        closeDrawer();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [form] = Form.useForm();

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New
      </Button>
      <Drawer
        title="Create a new service"
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
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Please enter name" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nameAbbrev"
                label="Abbreviation"
                rules={[
                  { required: true, message: "Please enter abbreviation" },
                ]}
              >
                <Input
                  placeholder="Please enter abbreviation"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="basePrice"
                label="Base Price (CAD)"
                rules={[
                  { required: true, message: "Please enter Base Price (CAD)" },
                ]}
              >
                <InputNumber />
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
