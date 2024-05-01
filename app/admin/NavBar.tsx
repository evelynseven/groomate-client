import React, { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const router = useRouter();
  const redirect = () => {
    router.replace("/login");
  };
  const logoutHandler = () => {
    sessionStorage.removeItem("access_token");
    redirect();
  };

  const [userFullName, setUserFullName] = useState("");
  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    if (access_token) {
      const decoded = jwtDecode(access_token) as { fullName: string };
      setUserFullName(decoded.fullName);
    } else {
      redirect();
    }
  }, []);

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-10">
      <div className="flex-1">
        <Link href="/admin/board" className="btn btn-ghost text-xl">
          <Image
            src="/groomate-logo-transparent.png"
            width={150}
            height={30}
            alt="groomate logo"
          />
        </Link>
      </div>
      <p className="text-sm mr-2">{userFullName}</p>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          </ul>
        </div>

        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <Link href="/admin/customers">
            <SettingOutlined />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
