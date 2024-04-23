"use client";
import React, { ReactNode } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  SmileOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("Dashboard", "dashboard", <DashboardOutlined />),
    getItem("Customers", "customers", <SmileOutlined />),
    getItem("Appointments", "appointments", <CalendarOutlined />),

    { type: "divider" },

    getItem("Settings", "settings", <SettingOutlined />, [
      getItem("Services", "services"),
      getItem("Add-ons", "addons"),
      getItem("Breeds", "breeds"),
      getItem("Users", "users"),
    ]),
  ];

  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/admin/${e.key}`);
  };

  return (
    <div className="flex h-dvh pt-[66px]">
      <Menu
        onClick={onClick}
        style={{ width: 220 }}
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["dashboard"]}
        mode="inline"
        items={items}
      />
      <div className="w-full p-5 bg-slate-50">
        <div className="h-full p-5 bg-white shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
