"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import dateFormatter from "@/app/utils/dateFormatter/dateFormatter";
import { MoreOutlined } from "@ant-design/icons";
import EditPet from "../../customers/[id]/EditPet";

interface Props {
  customerId: string;
  petId: string;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  birthday: string;
  weight: number;
  groomRating: string;
  remarks: string;
  rabiesDue: string;
  ownerId: string;
  breedId: string;
}

const SinglePetDetail = ({ customerId, petId }: Props) => {
  const [pet, setPet] = useState<Pet>();

  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState<Pet>();

  const fetchPet = async () => {
    try {
      const pet = await fetchData(`customers/${customerId}/pets/${petId}`);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  const petProps: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Type",
      children: pet?.type,
    },
    {
      key: "2",
      label: "Breed",
      children: pet?.breed,
    },
    {
      key: "3",
      label: "Birthday",
      children:
        typeof pet?.birthday === "string"
          ? dateFormatter(pet?.birthday)
          : pet?.birthday,
    },
    {
      key: "4",
      label: "Weight (lbs)",
      children: pet?.weight,
    },
    {
      key: "5",
      label: "GroomRating",
      children: pet?.groomRating,
    },
    {
      key: "7",
      label: "Rabies Due Date",
      children: pet?.rabiesDue
        ? typeof pet?.rabiesDue === "string"
          ? dateFormatter(pet?.rabiesDue)
          : pet?.rabiesDue
        : "--",
    },
    {
      key: "6",
      label: "Note",
      span: 3,
      children: pet?.remarks ? pet?.remarks : "--",
    },
  ];

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create");
    showDrawer();
  };

  const editBtnHandler = () => {
    setDrawerType("Edit");
    if (pet) {
      setFieldsValue(pet);
      showDrawer();
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: <a onClick={editBtnHandler}>Edit</a>,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Delete
        </a>
      ),
      danger: true,
    },
  ];

  return (
    <div className="h-1/2 ml-4 mb-4 py-4 px-5 bg-white shadow-lg rounded-lg overflow-y-auto overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold ">{pet?.name}</p>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button icon={<MoreOutlined />} shape="circle"></Button>
        </Dropdown>
      </div>
      <Descriptions layout="vertical" items={petProps} column={3} />
      <EditPet
        openStatus={openStatus}
        closeDrawer={closeDrawer}
        getPets={fetchPet}
        drawerType={drawerType}
        customerId={customerId}
        fieldsValue={fieldsValue}
      />
    </div>
  );
};

export default SinglePetDetail;
