"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Button, Space } from "antd";
import EditAddon from "./EditAddon";
import { PlusOutlined } from "@ant-design/icons";
import AsyncModal from "@/app/components/AsyncModal";
import { jwtDecode } from "jwt-decode";

interface Addon {
  id: string;
  name: string;
  nameAbbrev: Date;
  price: number;
  remarks: string;
}

const AddonsPage = () => {
  const access_token = sessionStorage.getItem("access_token");
  let userRole = "";
  if (access_token) {
    const decoded = jwtDecode(access_token) as { role: string };
    userRole = decoded.role;
  }

  //control the table data
  const [addons, setAddons] = useState<Addon[]>([]);
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

  const getAddons = async () => {
    try {
      const addons: Array<Addon> = await fetchData("addons");
      setAddons(addons.map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAddons();
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

  const editBtnHandler = (record: Addon) => {
    setDrawerType("Edit");
    setFieldsValue(record);
    showDrawer();
  };

  const deleteBtnHandler = (record: Addon) => {
    setModalTitle("Delete Confirmation");
    setModalText(`Confirm to delete addon "${record.name}"?`);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Abbreviation",
      dataIndex: "nameAbbrev",
      key: "nameAbbrev",
    },
    {
      title: "Price (CAD)",
      dataIndex: "price",
      key: "price",
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
      render: (_text: string, record: Addon) => (
        <Space size="middle">
          <a
            onClick={() => {
              editBtnHandler(record);
            }}
            className="text-blue-500"
          >
            Edit
          </a>
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
        <TableHeader PageName="Addons" />
        <Button type="primary" onClick={addBtnHandler} icon={<PlusOutlined />}>
          New
        </Button>
        <EditAddon
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getAddons={getAddons}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      </div>
      <GenericTable<Addon> dataSource={addons} columns={columns} />
      <AsyncModal
        modalOpenStatus={modalOpenStatus}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalText={modalText}
        endpoint="addons"
        itemId={currentItemId}
        postAction={getAddons}
      />
    </div>
  );
};

export default AddonsPage;
