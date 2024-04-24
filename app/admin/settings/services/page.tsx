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
      render: (_text: string, record: Service) => (
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
  const [services, setServices] = useState<Service[]>([]);
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});
  //make page refresh
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    const getServices = async () => {
      const data: Array<Service> = await fetchData("services");
      setServices(data.map((item) => ({ ...item, key: item.id })));
    };
    getServices();
  }, [refresh]);

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    toggleRefresh();
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create");
    setFieldsValue({});
    showDrawer();
  };

  const editBtnHandler = (record: Service) => {
    setDrawerType("Edit");
    setFieldsValue(record);
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
          fieldsValue={fieldsValue}
        />
      </div>
      <GenericTable<Service>
        dataSource={services}
        columns={columns}
        refresh={refresh}
      />
    </>
  );
};

export default ServicesPage;
