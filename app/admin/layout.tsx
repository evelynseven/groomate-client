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
import NavBar from "./NavBar";

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
      getItem("Services", "settings/services"),
      getItem("Add-ons", "settings/addons"),
      getItem("Breeds", "settings/breeds"),
      getItem("Users", "settings/users"),
    ]),
  ];

  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/admin/${e.key}`);
  };

  return (
    <>
      <NavBar />

      <div className="flex h-dvh pt-[66px]">
        <Menu
          onClick={onClick}
          style={{ width: 220 }}
          defaultSelectedKeys={["dashboard"]}
          defaultOpenKeys={["dashboard"]}
          mode="inline"
          items={items}
        />
        <div className="w-full p-5 bg-slate-50">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
