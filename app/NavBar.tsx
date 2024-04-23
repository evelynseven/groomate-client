import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-10">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Groomate
        </Link>
      </div>
      <div className="flex-none">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="user profile picture"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <Link href="/admin">
            <SettingOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
