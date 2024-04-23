import React from "react";
import { Button } from "antd";

interface TableHeaderProps {
  PageName: string;
}

const TableHeader = ({ PageName }: TableHeaderProps) => {
  return (
    <div className="mb-4 flex justify-between">
      <p className="text-lg font-semibold">{PageName}</p>
      <Button type="primary">New</Button>
    </div>
  );
};

export default TableHeader;
