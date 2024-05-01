import React from "react";

interface TableHeaderProps {
  PageName: string;
}

const TableHeader = ({ PageName }: TableHeaderProps) => {
  return <p className="text-lg font-semibold">{PageName}</p>;
};

export default TableHeader;
