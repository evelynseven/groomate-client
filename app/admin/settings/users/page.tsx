"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/api/api";
import GenericTable from "@/app/components/GenericTable";
import TableHeader from "@/app/components/TableHeader";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditUser from "./EditUser";
import AsyncModal from "@/app/components/AsyncModal";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

const UsersPage = () => {
  const [userRole, setUserRole] = useState("");

  //control the table data
  const [users, setUsers] = useState<User[]>([]);
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});
  //control the async modal
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  //control the modal title
  const [modalTitle, setModalTitle] = useState("");
  //control the modal text
  const [modalText, setModalText] = useState("");
  //update the current item
  const [currentItemId, setCurrentItemId] = useState("");

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
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      const decoded = jwtDecode(access_token) as { role: string };
      setUserRole(decoded.role);
    }
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

  const deleteBtnHandler = (record: User) => {
    setModalTitle("Delete Confirmation");
    setModalText(`Confirm to delete user "${record.fullName}"?`);
    setCurrentItemId(record.id);
    showModal();
  };

  const showModal = () => {
    setModalOpenStatus(true);
  };

  const closeModal = () => {
    setModalOpenStatus(false);
  };

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
      title: "Role",
      dataIndex: "role",
      key: "role",
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
          <Button
            type="link"
            onClick={() => {
              editBtnHandler(record);
            }}
            disabled={userRole === "ADMIN" ? false : true}
            className="px-0"
          >
            Edit
          </Button>

          <Button
            type="link"
            danger
            disabled={userRole === "ADMIN" ? false : true}
            className="px-0"
            onClick={() => {
              deleteBtnHandler(record);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full p-5 bg-white shadow-lg rounded-lg">
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Users" />
        <Button
          type="primary"
          onClick={addBtnHandler}
          icon={<PlusOutlined />}
          disabled={userRole === "ADMIN" ? false : true}
        >
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
      <AsyncModal
        modalOpenStatus={modalOpenStatus}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalText={modalText}
        endpoint="users"
        itemId={currentItemId}
        postAction={getUsers}
      />
    </div>
  );
};

export default UsersPage;
