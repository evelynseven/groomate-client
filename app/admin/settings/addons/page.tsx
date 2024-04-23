"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Space } from "antd";

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
      render: () => (
        <Space size="middle">
          <a className="text-blue-500">Edit</a>
        </Space>
      ),
    },
  ];

  const [addons, setAddons] = useState<Addon[]>([]);
  useEffect(() => {
    const getAddons = async () => {
      const addons: Array<Addon> = await fetchData("addons");
      setAddons(addons.map((item) => ({ ...item, key: item.id })));
    };
    getAddons();
  }, []);

  return (
    <>
      <TableHeader PageName="Addons" />
      <GenericTable<Addon> dataType={addons} columns={columns} />
    </>
  );
};

export default AddonsPage;
