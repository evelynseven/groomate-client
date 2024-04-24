import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { fetchData } from "@/app/api/api";

interface Props {
  endpoint: string;
}

const SearchSelect = <T extends Record<string, any>>({ endpoint }: Props) => {
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const items: Array<T> = await fetchData(endpoint);
        const mappedOptions = items.map((item) => ({
          value: item.id,
          label: item.fullName,
        }));
        setSelectOptions(mappedOptions);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

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
    />
  );
};

export default SearchSelect;
