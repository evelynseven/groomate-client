"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Button, Space } from "antd";
import EditAddon from "./EditAddon";
import { PlusOutlined } from "@ant-design/icons";

interface Addon {
  id: string;
  name: string;
  nameAbbrev: Date;
  price: number;
  remarks: string;
}

const AddonsPage = () => {
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
      title: "Price",
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
        </Space>
      ),
    },
  ];

  //control the table data
  const [addons, setAddons] = useState<Addon[]>([]);
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});

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
    </div>
  );
};

export default AddonsPage;
