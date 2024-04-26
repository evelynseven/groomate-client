"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import dateFormatter from "@/app/utils/dateFormatter/dateFormatter";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditPet from "./EditPet";

interface Props {
  customerId: string;
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

const PetDetail = ({ customerId }: Props) => {
  const [petList, setPetList] = useState<Pet[]>();
  const [selectedPetId, setSelectedPetId] = useState("");
  const [pet, setPet] = useState<Pet>();

  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState<Pet>();

  const fetchPets = async () => {
    try {
      const pets = await fetchData(`customers/${customerId}/pets`);
      setPetList(pets);
      setSelectedPetId(pets[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  let pets: TabsProps["items"] = [];
  if (petList) {
    pets = petList.map((pet) => {
      return { key: pet.id, label: pet.name };
    });
  }

  const onChange = (key: string) => {
    setSelectedPetId(key);
  };

  const fetchPet = async () => {
    try {
      const pet = await fetchData(
        `customers/${customerId}/pets/${selectedPetId}`
      );
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [openStatus]);

  useEffect(() => {
    fetchPet();
  }, [selectedPetId]);

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
      label: "Weight",
      children: pet?.weight,
    },
    {
      key: "5",
      label: "GroomRating",
      span: 2,
      children: pet?.groomRating,
    },
    {
      key: "6",
      label: "Note",
      span: 2,
      children: pet?.remarks ? pet?.remarks : "--",
    },
    {
      key: "7",
      label: "Rabies Due Date",
      span: 2,
      children: pet?.rabiesDue
        ? typeof pet?.rabiesDue === "string"
          ? dateFormatter(pet?.rabiesDue)
          : pet?.rabiesDue
        : "--",
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
    // setFieldsValue(undefined);
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
      key: "1",
      label: <a onClick={addBtnHandler}>Add</a>,
    },
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
    <div className="w-2/4 h-full ml-4 mr-2 py-4 px-5 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <p className="font-semibold ">Pets</p>

        {petList && (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button icon={<MoreOutlined />} shape="circle"></Button>
          </Dropdown>
        )}
      </div>

      {petList && (
        <Tabs defaultActiveKey="1" items={pets} onChange={onChange} />
      )}
      <Descriptions layout="vertical" items={petProps} column={2} />
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

export default PetDetail;
