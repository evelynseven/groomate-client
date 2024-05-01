import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { fetchData } from "@/app/api/api";

interface Props {
  endpoint: string;
  setItemId: (itemId: string) => void;
  defaultValue?: { value: string; label: string };
}

const SearchSelect = <T extends Record<string, any>>({
  endpoint,
  setItemId,
  defaultValue,
}: Props) => {
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const items: Array<T> = await fetchData(endpoint);
        const mappedOptions = items.map((item) => ({
          value: item.id,
          label: item.hasOwnProperty("fullName") ? item.fullName : item.name,
        }));

        setSelectOptions(mappedOptions);
      } catch (error) {
        console.error(error);
      }
    };

    getItems();
  }, []);

  const handleItemChange = (value: {
    value: string;
    label: React.ReactNode;
  }) => {
    setItemId(value.value);
  };

  return (
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
      options={selectOptions ? selectOptions : []}
      onChange={handleItemChange}
      defaultValue={defaultValue}
    />
  );
};

export default SearchSelect;
