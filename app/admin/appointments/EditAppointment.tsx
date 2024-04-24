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

interface Appointment {
  appointmentTime: string;
  customerId: string;
  petId: string;
  baseServiceId: string;
  associateId: string;
  remarks: string;
}

interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

interface Service {
  id: string;
  name: string;
  nameAbbrev: Date;
  basePrice: number;
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

  const newAppointment: Appointment = {
    appointmentTime: "",
    customerId: "",
    petId: "",
    baseServiceId: "",
    associateId: "",
    remarks: "",
  };

  const setCustomerPetIds = (customerId: string, petId: string) => {
    newAppointment.customerId = customerId;
    newAppointment.petId = petId;
  };

  const setServiceId = (baseServiceId: string) => {
    newAppointment.baseServiceId = baseServiceId;
  };

  const setAssociateId = (associateId: string) => {
    newAppointment.associateId = associateId;
  };

  const setDate = (_date: any, dateString: any) => {
    newAppointment.appointmentTime = new Date(dateString).toISOString();
  };

  const setRemarks = () => {
    newAppointment.remarks = form.getFieldValue("remarks");
  };

  const createHandler = () => {
    form
      .validateFields()
      .then(async () => {
        console.log(newAppointment);

        postData(
          `customers/${newAppointment.customerId}/appointments`,
          newAppointment
        ).then(() => {
          closeDrawer();
          getAppointments();
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
                label="Customer and Pet"
                rules={[
                  { required: true, message: "Please select customer and pet" },
                ]}
              >
                <CascadeSelect setCustomerPetIds={setCustomerPetIds} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Service"
                rules={[
                  { required: true, message: "Please select base service" },
                ]}
              >
                <SearchSelect<Service>
                  endpoint="services"
                  setItemId={setServiceId}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Associate"
                rules={[{ required: true, message: "Please select associate" }]}
              >
                <SearchSelect<User>
                  endpoint="users"
                  setItemId={setAssociateId}
                />
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
                <DatePicker
                  onChange={setDate}
                  showTime={{ format: format, showSecond: false }}
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
                  onChange={setRemarks}
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
