import React, { useEffect } from "react";
import { postData, putData } from "../../../api/api";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import SearchSelect from "../../appointments/SearchSelect";
import dayjs from "dayjs";

interface Props {
  openStatus: boolean;
  closeDrawer: () => void;
  getPets: () => void;
  drawerType?: string;
  customerId: string;
  fieldsValue?: Pet;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthday: string;
  weight: number;
  groomRating: string;
  remarks: string;
  rabiesDue: string;
  ownerId: string;
  breedId: string;
}

const EditDrawer: React.FC<Props> = ({
  openStatus,
  closeDrawer,
  getPets,
  drawerType,
  customerId,
  fieldsValue,
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  if (drawerType === "Create") {
    form.resetFields();
  }

  const newPet = {
    name: "",
    type: "",
    breedId: "",
    birthday: "",
    weight: 0,
    remarks: "",
    groomRating: "",
  };

  const setType = (type: string) => {
    form.setFieldValue("type", type);
    newPet.type = type;
  };

  const setBreedId = (breedId: string) => {
    form.setFieldValue("breed", breedId);
    newPet.breedId = breedId;
  };

  useEffect(() => {
    if (fieldsValue && Object.keys(fieldsValue).length === 0) {
      form.resetFields();
    }
    if (fieldsValue) {
      form.setFieldValue("name", fieldsValue.name);
      form.setFieldValue("type", fieldsValue.type);
      form.setFieldValue("breed", fieldsValue.breedId);
      form.setFieldValue("birthday", dayjs(fieldsValue.birthday, "YYYY-MM-DD"));
      form.setFieldValue("weight", fieldsValue.weight);
      fieldsValue.rabiesDue &&
        form.setFieldValue(
          "rabiesDue",
          dayjs(fieldsValue.rabiesDue, "YYYY-MM-DD")
        );
      form.setFieldValue("groomRating", fieldsValue.groomRating);
      form.setFieldValue("remarks", fieldsValue.remarks);
    }
  }, [openStatus, fieldsValue]);

  const createHandler = () => {
    form
      .validateFields()
      .then(async (values) => {
        newPet.name = values.name;
        newPet.birthday = new Date(values.birthday).toISOString();
        newPet.weight = values.weight;
        newPet.remarks = values.remarks;
        newPet.breedId = values.breed;

        postData(`customers/${customerId}/pets`, newPet).then(() => {
          closeDrawer();
          getPets();
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
          const pet = {
            name: values.name,
            type: values.type,
            breedId: form.getFieldValue("breed"),
            birthday: new Date(values.birthday).toISOString(),
            weight: values.weight,
            rabiesDue: values.rabiesDue
              ? new Date(values.rabiesDue).toISOString()
              : undefined,
            groomRating: values.groomRating,
            remarks: values.remarks,
          };

          putData(`customers/${customerId}/pets/${fieldsValue.id}`, pet).then(
            () => {
              closeDrawer();
              getPets();
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
        title={`${drawerType} Pet`}
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
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter pet's name" }]}
              >
                <Input
                  placeholder="Please enter pet's name"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please select pet type" }]}
              >
                <Select
                  placeholder="Please select breed type"
                  onChange={setType}
                >
                  <Option value="DOG">Dog</Option>
                  {/* <Option value="CAT">Cat</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="breed"
                label="Breed"
                rules={[
                  {
                    required: true,
                    message: "Please choose the breed",
                  },
                ]}
              >
                <SearchSelect<Pet>
                  endpoint="breeds"
                  setItemId={setBreedId}
                  defaultValue={
                    drawerType === "Edit" && fieldsValue
                      ? {
                          value: fieldsValue?.breedId,
                          label: fieldsValue?.breed,
                        }
                      : undefined
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="weight"
                label="Weight"
                rules={[{ required: true, message: "Please enter weight" }]}
              >
                <InputNumber step="0.1" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[
                  {
                    required: true,
                    message: "Please enter birthday",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="groomRating"
                label="Groom Rating"
                rules={[{ message: "Please select grooming rating" }]}
              >
                <Select placeholder="Please select grooming rating">
                  <Option value="PREFERRED">Preferred</Option>
                  <Option value="NEUTRAL">Neutral</Option>
                  <Option value="CAUTION">Caution</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {drawerType === "Edit" && (
              <Col span={12}>
                <Form.Item name="rabiesDue" label="Rabies Due Date">
                  <DatePicker />
                </Form.Item>
              </Col>
            )}
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
