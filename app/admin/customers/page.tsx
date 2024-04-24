"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import GenericTable from "@/app/components/GenericTable";
import TableHeader from "@/app/components/TableHeader";
import EditCustomer from "./EditCustomer";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Customer {
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

const CustomersPage = () => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a className="text-blue-500">{text}</a>,
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
      render: (text: string) => <a>{text ? text : "--"}</a>,
    },
  ];

  //control the table data
  const [customers, setCustomers] = useState<Customer[]>([]);
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});

  const getCustomers = async () => {
    const customers: Array<Customer> = await fetchData("customers");
    setCustomers(customers.map((item) => ({ ...item, key: item.phoneNumber })));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create");
    setFieldsValue({});
    showDrawer();
  };

  const editBtnHandler = (record: Customer) => {
    setDrawerType("Edit");
    setFieldsValue(record);
    showDrawer();
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Customers" />
        <Button type="primary" onClick={addBtnHandler} icon={<PlusOutlined />}>
          New
        </Button>
        <EditCustomer
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getCustomers={getCustomers}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      </div>
      <GenericTable<Customer> dataSource={customers} columns={columns} />
    </>
  );
};

export default CustomersPage;
