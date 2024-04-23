"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import GenericTable from "@/app/components/GenericTable";
import TableHeader from "@/app/components/TableHeader";
import AddCustomer from "./AddCustomer";

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

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const handleDrawerClose = () => {
    setShouldRefresh(true);
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Customers" />
        <AddCustomer onClose={handleDrawerClose} />
      </div>
      <GenericTable<Customer>
        dataType={customers}
        columns={columns}
        shouldRefresh={shouldRefresh}
      />
    </>
  );
};

export default CustomersPage;
