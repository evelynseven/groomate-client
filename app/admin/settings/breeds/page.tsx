"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditBreed from "./EditBreed";
import AsyncModal from "@/app/components/AsyncModal";
import { jwtDecode } from "jwt-decode";

interface Breed {
  id: string;
  type: string;
  name: string;
  coefficient: number;
  remarks: string;
}

const BreedsPage = () => {
  const [userRole, setUserRole] = useState("");

  //control the table data
  const [breeds, setBreeds] = useState<Breed[]>([]);
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

  const getBreeds = async () => {
    try {
      const breeds: Array<Breed> = await fetchData("breeds");
      setBreeds(breeds.map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBreeds();
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

  const editBtnHandler = (record: Breed) => {
    setDrawerType("Edit");
    setFieldsValue(record);
    showDrawer();
  };

  const deleteBtnHandler = (record: Breed) => {
    setModalTitle("Delete Confirmation");
    setModalText(`Confirm to delete breed "${record.name}"?`);
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
      title: "Breed Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Coefficient",
      dataIndex: "coefficient",
      key: "coefficient",
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
      render: (_text: string, record: Breed) => (
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
        <TableHeader PageName="Breeds" />
        <Button
          type="primary"
          onClick={addBtnHandler}
          icon={<PlusOutlined />}
          disabled={userRole === "ADMIN" ? false : true}
        >
          New
        </Button>
        <EditBreed
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getBreeds={getBreeds}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      </div>
      <GenericTable<Breed> dataSource={breeds} columns={columns} />
      <AsyncModal
        modalOpenStatus={modalOpenStatus}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalText={modalText}
        endpoint="breeds"
        itemId={currentItemId}
        postAction={getBreeds}
      />
    </div>
  );
};

export default BreedsPage;
