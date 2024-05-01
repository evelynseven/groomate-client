"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const [path, setPath] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setPath(pathname);
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      const decoded = jwtDecode(access_token) as { role: string };
      setUserRole(decoded.role);
    }
  }, [pathname]);

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
    // getItem("Dashboard", "dashboard", <DashboardOutlined />),
    getItem("Customers", "customers", <SmileOutlined />),
    getItem("Appointments", "appointments", <CalendarOutlined />),

    { type: "divider" },

    userRole !== "ASSOCIATE"
      ? getItem("Settings", "settings", <SettingOutlined />, [
          getItem("Services", "settings/services"),
          getItem("Add-ons", "settings/addons"),
          getItem("Breeds", "settings/breeds"),
          getItem("Users", "settings/users"),
        ])
      : null,
  ];

  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/admin/${e.key}`);
  };

  return (
    <>
      <NavBar />

      <div className="flex h-dvh pt-[66px]">
        {path !== "/admin/board" && (
          <Menu
            onClick={onClick}
            style={{ width: 220 }}
            defaultSelectedKeys={["customers"]}
            defaultOpenKeys={["settings"]}
            mode="inline"
            items={items}
          />
        )}
        <div className="w-full p-5 bg-slate-50">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
