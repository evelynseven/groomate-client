"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/api/api";
import GenericTable from "@/app/components/GenericTable";
import TableHeader from "@/app/components/TableHeader";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditUser from "./EditUser";

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
      render: (_text: string, record: User) => (
        <Space size="middle">
          <a
            onClick={() => {
              editBtnHandler(record);
            }}
            className="text-blue-500"
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  //control the table data
  const [users, setUsers] = useState<User[]>([]);

  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});

  const getUsers = async () => {
    try {
      const users: Array<User> = await fetchData("users");
      setUsers(users.map((item) => ({ ...item, key: item.phoneNumber })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
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

  const editBtnHandler = (record: User) => {
    setDrawerType("Edit");
    setFieldsValue(record);
    showDrawer();
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Users" />
        <Button type="primary" onClick={addBtnHandler} icon={<PlusOutlined />}>
          New
        </Button>
        <EditUser
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getUsers={getUsers}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      </div>
      <GenericTable<User> dataSource={users} columns={columns} />
    </>
  );
};

export default UsersPage;
