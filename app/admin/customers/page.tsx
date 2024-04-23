import React from "react";
import CustomerTable from "./CustomerTable";
import { Button } from "antd";

const CustomersPage = () => {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <p className="text-lg font-semibold">Customers</p>
        <Button type="primary">New</Button>
      </div>
      <CustomerTable />
    </>
  );
};

export default CustomersPage;
