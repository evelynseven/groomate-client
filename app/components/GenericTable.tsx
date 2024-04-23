import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface GenericTableProps<T> {
  dataType: T[];
  columns: TableProps<T>["columns"];
  shouldRefresh: boolean;
}

const GenericTable = <T extends Record<string, any>>({
  dataType,
  columns,
  shouldRefresh,
}: GenericTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setData(dataType.map((item, index) => ({ ...item, key: index })));
  }, [dataType, shouldRefresh]);

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
