"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/customersApi";
import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface Customer {
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

const columns: TableProps<Customer>["columns"] = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <a className="text-blue-500">{text}</a>,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a className="text-blue-500">Edit</a>
      </Space>
    ),
  },
];

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    const getCustomers = async () => {
      const customers: Array<Customer> = await fetchData("customers");
      setCustomers(
        customers.map((item) => ({ ...item, key: item.phoneNumber }))
      );
    };
    getCustomers();
  }, []);
  return (
    customers && (
      <div>
        {
          <Table
            columns={columns}
            dataSource={customers}
            pagination={{
              position: ["bottomRight"],
              style: { position: "fixed", right: "32px", bottom: "50px" },
            }}
          />
        }
      </div>
    )
  );
};

export default CustomerTable;
