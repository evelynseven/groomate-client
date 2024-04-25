"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import dateFormatter from "@/app/utils/dateFormatter/dateFormatter";

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
}

const PetDetail = ({ customerId }: Props) => {
  const [pet, setPet] = useState<Pet>();

  const fetchPet = async () => {
    try {
      const pet = await fetchData(
        `customers/${customerId}/pets/832d8dbb-011c-4b7e-91f8-729fee44c770`
      );
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPet();
  }, []);

  const items: DescriptionsProps["items"] = [
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
      children: pet?.rabiesDue ? pet?.rabiesDue : "--",
    },
  ];

  return (
    <div className="w-2/4 h-full p-5 mx-4 bg-white shadow-lg rounded-lg">
      <p className="font-semibold mb-4">{pet ? pet.name : "Pet"}</p>

      <Descriptions layout="vertical" items={items} column={2} />
    </div>
  );
};

export default PetDetail;
