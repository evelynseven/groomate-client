"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

interface Props {
  customerId: string;
}

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
  address: string;
}

const CustomerDetail = ({ customerId }: Props) => {
  const [customer, setCustomer] = useState<Customer>();

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
  }, []);

  const items: DescriptionsProps["items"] = [
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

  return (
    <div className="w-1/4 h-full p-5 bg-white shadow-lg rounded-lg">
      <Descriptions
        title={customer ? customer.fullName : "Customer"}
        layout="vertical"
        items={items}
        column={1}
      />
    </div>
  );
};

export default CustomerDetail;
