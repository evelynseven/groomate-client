import React, { useEffect, useState } from "react";
import { postData, putData } from "@/app/api/api";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from "antd";
import SearchSelect from "./SearchSelect";
import CascadeSelect from "./CascadeSelect";
import dayjs from "dayjs";

interface Props {
  openStatus: boolean;
  closeDrawer: () => void;
  getAppointments: () => void;
  drawerType?: string;
  fieldsValue?: Appointment;
}

interface Appointment {
  id: string;
  appointmentTime: string;
  customer: string;
  pet: string;
  baseService: string;
  associate: string;
  customerId: string;
  petId: string;
  associateId: string;
  baseServiceId: string;
  duration: number;
  totalPrice: number;
  status: string;
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

  const customerAndPetEmpty = {
    customerId: "",
    petId: "",
    customer: "",
    pet: "",
  };

  const [customerAndPet, setCustomerAndPet] = useState(customerAndPetEmpty);

  const newAppointment = {
    appointmentTime: fieldsValue?.appointmentTime,
    customerId: fieldsValue?.customerId,
    petId: fieldsValue?.petId,
    baseServiceId: fieldsValue?.baseServiceId,
    associateId: fieldsValue?.associateId,
    remarks: fieldsValue?.remarks,
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

  const setDate = (dateString: any) => {
    newAppointment.appointmentTime = new Date(dateString).toISOString();
  };

  const setRemarks = () => {
    newAppointment.remarks = form.getFieldValue("remarks");
  };

  useEffect(() => {
    if (fieldsValue && Object.keys(fieldsValue).length === 0) {
      form.resetFields();
    }

    if (fieldsValue) {
      form.setFieldValue(
        "appointmentTime",
        dayjs(fieldsValue.appointmentTime, "YYYY-MM-DD HH:mm")
      );
      form.setFieldValue("remarks", fieldsValue.remarks);
      setCustomerAndPet({
        customerId: fieldsValue.customerId,
        petId: fieldsValue.customerId,
        customer: fieldsValue.customer,
        pet: fieldsValue.pet,
      });
    }
  }, [openStatus, fieldsValue]);

  const createHandler = () => {
    form
      .validateFields()
      .then(async () => {
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
      .then(async () => {
        const updatedAppointment = {
          baseServiceId: newAppointment.baseServiceId,
          associateId: newAppointment.associateId,
          appointmentTime: newAppointment.appointmentTime,
          remarks: newAppointment.remarks,
        };

        if (fieldsValue && "id" in fieldsValue) {
          putData(`appointments/${fieldsValue.id}`, updatedAppointment).then(
            () => {
              closeDrawer();
              getAppointments();
            }
          );
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
                <CascadeSelect
                  setCustomerPetIds={setCustomerPetIds}
                  defaultValues={customerAndPet}
                />
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
                  defaultValue={
                    drawerType === "Edit" && fieldsValue
                      ? {
                          value: fieldsValue?.baseServiceId,
                          label: fieldsValue?.baseService,
                        }
                      : undefined
                  }
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
                  defaultValue={
                    drawerType === "Edit" && fieldsValue
                      ? {
                          value: fieldsValue?.associateId,
                          label: fieldsValue?.associate,
                        }
                      : undefined
                  }
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
