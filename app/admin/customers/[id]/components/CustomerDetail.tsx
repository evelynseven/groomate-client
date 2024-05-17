"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditCustomer from "../../components/EditCustomer";
import Link from "next/link";
import AsyncModal from "@/app/components/AsyncModal";
import { jwtDecode } from "jwt-decode";

interface Props {
  customerId: string;
  redirect?: () => void;
  showDelete?: boolean;
}

interface Customer {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  remarks: string;
  address: string;
}

const CustomerDetail = ({ customerId, redirect, showDelete = true }: Props) => {
  const access_token = sessionStorage.getItem("access_token");
  let userRole = "";
  if (access_token) {
    const decoded = jwtDecode(access_token) as { role: string };
    userRole = decoded.role;
  }

  const [customer, setCustomer] = useState<Customer>();
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState<Customer>();
  //control the async modal
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  //control the modal title
  const [modalTitle, setModalTitle] = useState("");
  //control the modal text
  const [modalText, setModalText] = useState("");
  //update the current item
  const [currentItemId, setCurrentItemId] = useState("");
  //update the delete status
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchCustomer = async () => {
    try {
      const customer = await fetchData(`customers/${customerId}`);
      setCustomer(customer);
    } catch (error) {
      console.error(error);
    }
  };

  const setDeleted = () => {
    setIsDeleted(true);
  };

  useEffect(() => {
    fetchCustomer();
  }, [openStatus]);

  useEffect(() => {
    if (isDeleted) {
      redirect?.();
    }
  }, [modalOpenStatus]);

  const customerProps: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Phone Number",
      children: customer?.phoneNumber,
    },
    {
      key: "2",
      label: "Email",
      children: customer?.email,
    },
    {
      key: "3",
      label: "Note",
      children: customer?.remarks ? customer?.remarks : "--",
    },
    {
      key: "4",
      label: "Address",
      span: 2,
      children: customer?.address ? customer?.address : "--",
    },
  ];

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const editBtnHandler = () => {
    setDrawerType("Edit");
    if (customer) {
      setFieldsValue(customer);
      showDrawer();
    }
  };

  const deleteBtnHandler = () => {
    setModalTitle("Delete Confirmation");
    if (customer) {
      setModalText(`Confirm to delete customer "${customer.fullName}"?`);
    }
    setCurrentItemId(customerId);

    showModal();
  };

  const showModal = () => {
    setModalOpenStatus(true);
  };

  const closeModal = () => {
    setModalOpenStatus(false);
  };

  const items: MenuProps["items"] = showDelete
    ? [
        {
          key: "1",
          label: <a onClick={editBtnHandler}>Edit</a>,
        },
        {
          key: "2",
          label: (
            <Button
              type="link"
              danger
              disabled={userRole === "ADMIN" ? false : true}
              className="p-0"
              size="small"
              onClick={() => {
                deleteBtnHandler();
              }}
            >
              Delete
            </Button>
          ),
          danger: true,
        },
      ]
    : [
        {
          key: "1",
          label: <a onClick={editBtnHandler}>Edit</a>,
        },
      ];

  return (
    <div className="w-1/4 h-full p-5 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between mb-4 items-center">
        <Link
          href={`/admin/customers/${customer ? customer.id : ""}`}
          className="font-semibold text-xl text-blue-500"
        >
          {customer ? customer.fullName : "Customer"}
        </Link>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button icon={<MoreOutlined />} shape="circle"></Button>
        </Dropdown>
      </div>
      <Descriptions layout="vertical" items={customerProps} column={1} />
      {fieldsValue && (
        <EditCustomer
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getCustomers={fetchCustomer}
          drawerType={drawerType}
          fieldsValue={fieldsValue}
        />
      )}
      <AsyncModal
        modalOpenStatus={modalOpenStatus}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalText={modalText}
        endpoint="customers"
        itemId={currentItemId}
        postAction={setDeleted}
      />
    </div>
  );
};

export default CustomerDetail;
