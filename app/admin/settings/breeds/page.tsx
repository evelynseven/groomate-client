"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Space } from "antd";

interface Breed {
  id: string;
  type: string;
  name: string;
  coefficient: number;
  remarks: string;
}

const BreedsPage = () => {
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
      dataIndex: "remark",
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

  const [breeds, setBreeds] = useState<Breed[]>([]);
  useEffect(() => {
    const getBreeds = async () => {
      const breeds: Array<Breed> = await fetchData("breeds");
      setBreeds(breeds.map((item) => ({ ...item, key: item.id })));
    };
    getBreeds();
  }, []);

  return (
    <>
      <TableHeader PageName="Breeds" />
      <GenericTable<Breed> dataType={breeds} columns={columns} />
    </>
  );
};

export default BreedsPage;
