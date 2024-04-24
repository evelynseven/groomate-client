"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Button, Space } from "antd";
import AddService from "./AddService";
import { PlusOutlined } from "@ant-design/icons";

interface Service {
  id: string;
  name: string;
  nameAbbrev: Date;
  basePrice: number;
  remarks: string;
}

const ServicesPage = () => {
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
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
    },
    {
      title: "Remarks",
      dataIndex: "remark",
      key: "remarks",
      render: (text: string) => <a>{text ? text : "--"}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a onClick={editBtnHandler} className="text-blue-500">
            Edit
          </a>
        </Space>
      ),
    },
  ];

  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    const getServices = async () => {
      const services: Array<Service> = await fetchData("services");
      setServices(services.map((item) => ({ ...item, key: item.id })));
    };
    getServices();
  }, []);

  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create a new service");
    showDrawer();
  };

  const editBtnHandler = () => {
    setDrawerType("Edit service information");
    showDrawer();
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Services" />
        <Button type="primary" onClick={addBtnHandler} icon={<PlusOutlined />}>
          New
        </Button>
        <AddService
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          drawerType={drawerType}
        />
      </div>
      <GenericTable<Service> dataSource={services} columns={columns} />
    </>
  );
};

export default ServicesPage;
