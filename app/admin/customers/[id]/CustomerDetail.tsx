"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditCustomer from "../EditCustomer";

interface Props {
  customerId: string;
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

const CustomerDetail = ({ customerId }: Props) => {
  const [customer, setCustomer] = useState<Customer>();
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState<Customer>();

  const fetchCustomer = async () => {
    try {
      const customer = await fetchData(`customers/${customerId}`);
      setCustomer(customer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [openStatus]);

  const customerProps: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Phone Number",
      children: customer?.phoneNumber,
    },
    {
      key: "2",
      label: "Email",
      children: customer?.email,
    },
    {
      key: "3",
      label: "Note",
      children: customer?.remarks ? customer?.remarks : "--",
    },
    {
      key: "4",
      label: "Address",
      span: 2,
      children: customer?.address ? customer?.address : "--",
    },
  ];

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const editBtnHandler = () => {
    setDrawerType("Edit");
    if (customer) {
      setFieldsValue(customer);
      showDrawer();
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={editBtnHandler}>Edit</a>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Delete
        </a>
      ),
      danger: true,
    },
  ];

  return (
    <div className="w-1/4 h-full p-5 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between mb-4 items-center">
        <p className="font-semibold text-xl">
          {customer ? customer.fullName : "Customer"}
        </p>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button icon={<MoreOutlined />} shape="circle"></Button>
        </Dropdown>
      </div>
      <Descriptions layout="vertical" items={customerProps} column={1} />
      {fieldsValue && (
        <EditCustomer
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getCustomers={fetchCustomer}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      )}
    </div>
  );
};

export default CustomerDetail;
