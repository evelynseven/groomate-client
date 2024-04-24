"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/api/api";
import GenericTable from "@/app/components/GenericTable";
import TableHeader from "@/app/components/TableHeader";
import { Space } from "antd";

interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

const UsersPage = () => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
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

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const users: Array<User> = await fetchData("users");
      setUsers(users.map((item) => ({ ...item, key: item.phoneNumber })));
    };
    getUsers();
  }, []);

  return (
    <>
      <TableHeader PageName="Users" />
      <GenericTable<User> dataSource={users} columns={columns} />
    </>
  );
};

export default UsersPage;
