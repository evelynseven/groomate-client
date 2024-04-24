import React, { useEffect } from "react";
import { postData, putData } from "@/app/api/api";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from "antd";
import SearchSelect from "./SearchSelect";
import CascadeSelect from "./CascadeSelect";

interface Props {
  openStatus: boolean;
  closeDrawer: () => void;
  getAppointments: () => void;
  drawerType?: string;
  fieldsValue: object;
}

interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

const EditDrawer: React.FC<Props> = ({
  openStatus,
  closeDrawer,
  getAppointments,
  drawerType,
  fieldsValue,
}) => {
  const [form] = Form.useForm();
  const format = "YYYY-MM-DD HH:mm";

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
        console.log(values);

        // postData("appointments", values).then(() => {
        //   closeDrawer();
        //   getAppointments();
        // });
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
          putData(`appointments/${fieldsValue.id}`, values).then(() => {
            closeDrawer();
            getAppointments();
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
        title={`${drawerType} Appointment`}
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
                // name="customer"
                label="Customer and Pet"
                rules={[
                  { required: true, message: "Please select customer and pet" },
                ]}
              >
                <CascadeSelect />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                // name="associate"
                label="Associate"
                rules={[{ required: true, message: "Please select associate" }]}
              >
                <SearchSelect<User> endpoint="users" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="appointmentTime"
                label="Appointment Time"
                rules={[
                  { required: true, message: "Please select appointment time" },
                ]}
              >
                <DatePicker showTime={{ format: format, showSecond: false }} />
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
