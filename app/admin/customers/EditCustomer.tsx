import React, { useEffect } from "react";
import { postData, putData } from "../../api/api";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";

interface Props {
  openStatus: boolean;
  closeDrawer: () => void;
  getCustomers: () => void;
  drawerType?: string;
  fieldsValue?: Customer;
}

interface Customer {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
  address: string;
}

const EditDrawer: React.FC<Props> = ({
  openStatus,
  closeDrawer,
  getCustomers,
  drawerType,
  fieldsValue,
}) => {
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+1">+1</Option>
      </Select>
    </Form.Item>
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (fieldsValue && Object.keys(fieldsValue).length === 0) {
      form.resetFields();
    }
    form.setFieldsValue(fieldsValue);
  }, [fieldsValue]);

  const createHandler = () => {
    form
      .validateFields()
      .then(async (values) => {
        values.phoneNumber = `+1${values.phoneNumber}`;
        const customer = {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          remarks: values.remarks,
        };
        console.log(customer);

        postData("customers", customer).then(() => {
          closeDrawer();
          getCustomers();
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
          const customer = {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            remarks: values.remarks,
          };

          console.log(customer);

          putData(`customers/${fieldsValue.id}`, customer).then(() => {
            closeDrawer();
            getCustomers();
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
        title={`${drawerType} Customer`}
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
                <Input placeholder="Please enter email" autoComplete="off" />
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
