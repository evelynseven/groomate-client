import React, { useEffect } from "react";
import { postData, putData } from "@/app/api/api";
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

interface Props {
  openStatus: boolean;
  closeDrawer: () => void;
  getAddons: () => void;
  drawerType?: string;
  fieldsValue: object;
}

const EditDrawer: React.FC<Props> = ({
  openStatus,
  closeDrawer,
  getAddons,
  drawerType,
  fieldsValue,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(fieldsValue).length === 0) {
      form.resetFields();
    }
    form.setFieldsValue(fieldsValue);
  }, [fieldsValue]);

  const createHandler = () => {
    form
      .validateFields()
      .then(async (values) => {
        postData("addons", values).then(() => {
          closeDrawer();
          getAddons();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editHandler = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (fieldsValue && "id" in fieldsValue) {
          putData(`addons/${fieldsValue.id}`, values).then(() => {
            closeDrawer();
            getAddons();
          });
        } else {
          console.error("ID not found in fieldsValue");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Drawer
        destroyOnClose
        title={`${drawerType} Addon`}
        width={720}
        onClose={closeDrawer}
        open={openStatus}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button
              onClick={drawerType === "Create" ? createHandler : editHandler}
              type="primary"
            >
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
                name="price"
                label="Price (CAD)"
                rules={[
                  { required: true, message: "Please enter Price (CAD)" },
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

export default EditDrawer;
