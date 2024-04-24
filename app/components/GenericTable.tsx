import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface GenericTableProps<T> {
  dataSource: T[];
  columns: TableProps<T>["columns"];
}

const GenericTable = <T extends Record<string, any>>({
  dataSource,
  columns,
}: GenericTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["bottomRight"],
          style: { position: "fixed", right: "32px", bottom: "50px" },
        }}
      />
    </div>
  );
};

export default GenericTable;
