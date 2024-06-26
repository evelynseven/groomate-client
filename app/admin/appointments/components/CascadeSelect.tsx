import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { fetchData } from "@/app/api/api";

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
}

interface Pet {
  id: string;
  name: string;
  remarks: string;
}

interface Props {
  setCustomerPetIds: (customerId: string, petId: string) => void;
  defaultValues?: {
    customerId: string;
    customer: string;
    petId: string;
    pet: string;
  };
}

const CascadeSelect = ({ setCustomerPetIds, defaultValues }: Props) => {
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [petOptions, setPetOptions] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const items: Array<Customer> = await fetchData("customers");
        const mappedOptions = items.map((item) => ({
          value: item.id,
          label: item.fullName,
        }));
        setCustomerOptions(mappedOptions);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleCustomerChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    setCustomerId(value.value);
  };

  const handlePetChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    setCustomerPetIds(customerId, value.value);
  };

  useEffect(() => {
    const getPets = async () => {
      if (customerId !== "") {
        try {
          const items: Array<Pet> = await fetchData(
            `customers/${customerId}/pets`
          );
          const mappedOptions = items.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setPetOptions(mappedOptions);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getPets();
  }, [customerId]);

  return (
    <div className="flex">
      <Select
        showSearch
        labelInValue
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={customerOptions ? customerOptions : []}
        onChange={handleCustomerChange}
        defaultValue={
          defaultValues
            ? {
                value: defaultValues?.customerId,
                label: defaultValues?.customer,
              }
            : undefined
        }
      />
      <div className="h-4 w-4"></div>
      <Select
        showSearch
        labelInValue
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={petOptions ? petOptions : []}
        onChange={handlePetChange}
        defaultValue={
          defaultValues
            ? {
                value: defaultValues?.petId,
                label: defaultValues?.pet,
              }
            : undefined
        }
      />
    </div>
  );
};

export default CascadeSelect;
