"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditAppointment from "../EditAppointment";
import dateTimeFormatter from "@/app/utils/dateTimeFormatter/dateTimeFormatter";
import AsyncModal from "@/app/components/AsyncModal";

interface Props {
  appointmentId: string;
  redirect?: () => void;
}

interface Appointment {
  id: string;
  appointmentTime: string;
  customer: string;
  pet: string;
  baseService: string;
  associate: string;
  customerId: string;
  petId: string;
  associateId: string;
  baseServiceId: string;
  duration: number;
  totalPrice: number;
  status: string;
  remarks: string;
}

const AppointmentDetail = ({ appointmentId, redirect }: Props) => {
  const [appointment, setAppointment] = useState<Appointment>();

  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
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

  const fetchAppointment = async () => {
    try {
      const appointment = await fetchData(`appointments/${appointmentId}`);
      setAppointment(appointment);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [openStatus]);

  useEffect(() => {
    if (isDeleted) {
      redirect?.();
    }
  }, [modalOpenStatus]);

  const appointmentProps: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Appointment Time",
      children:
        typeof appointment?.appointmentTime === "string"
          ? dateTimeFormatter(appointment?.appointmentTime)
          : appointment?.appointmentTime,
    },
    {
      key: "2",
      label: "Associate",
      children: appointment?.associate,
    },
    {
      key: "3",
      label: "Duration (hours)",
      children: appointment?.duration,
    },
    {
      key: "4",
      label: "Total Price (CAD)",
      children: appointment?.totalPrice,
    },
    {
      key: "5",
      label: "Add-ons",
      span: 2,
      children: "--",
    },
    {
      key: "6",
      label: "Note",
      span: 3,
      children: appointment?.remarks ? appointment?.remarks : "--",
    },
  ];

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create");
    showDrawer();
  };

  const editBtnHandler = () => {
    setDrawerType("Edit");
    if (appointment) {
      showDrawer();
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: <a onClick={editBtnHandler}>Edit</a>,
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            deleteBtnHandler();
          }}
        >
          Delete
        </a>
      ),
      danger: true,
    },
  ];

  const setDeleted = () => {
    setIsDeleted(true);
  };

  const deleteBtnHandler = () => {
    setModalTitle("Delete Confirmation");
    if (appointment) {
      setModalText(`Confirm to delete ${appointment.customer}'s appointment?`);
      setCurrentItemId(appointment.id);
    }

    showModal();
  };

  const showModal = () => {
    setModalOpenStatus(true);
  };

  const closeModal = () => {
    setModalOpenStatus(false);
  };

  return (
    <div className="ml-4 mb-4 py-4 px-5 bg-white shadow-lg rounded-lg overflow-y-auto overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <p className="font-semibold text-xl mr-2">
            {appointment?.baseService}
          </p>
          <p className="bg-sky-100 font-semibold rounded-full text-sm text-sky-600 p-1 px-2">
            {appointment?.status}
          </p>
        </div>
        <div>
          <Button type="primary" className="mr-2">
            Check In
          </Button>
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button icon={<MoreOutlined />} shape="circle"></Button>
          </Dropdown>
        </div>
      </div>
      <Descriptions layout="vertical" items={appointmentProps} column={3} />
      {appointment && (
        <EditAppointment
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getAppointments={fetchAppointment}
          drawerType={drawerType}
          fieldsValue={appointment}
        />
      )}
      <AsyncModal
        modalOpenStatus={modalOpenStatus}
        closeModal={closeModal}
        modalTitle={modalTitle}
        modalText={modalText}
        endpoint="appointments"
        itemId={currentItemId}
        setDeleted={setDeleted}
      />
    </div>
  );
};

export default AppointmentDetail;
