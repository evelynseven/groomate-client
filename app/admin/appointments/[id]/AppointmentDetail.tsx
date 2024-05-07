"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import { Button, Descriptions, Dropdown } from "antd";
import type { DescriptionsProps, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import EditAppointment from "../EditAppointment";
import dateTimeFormatter from "@/app/utils/dateTimeFormatter/dateTimeFormatter";
import AsyncModal from "@/app/components/AsyncModal";
import { jwtDecode } from "jwt-decode";

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
  const access_token = sessionStorage.getItem("access_token");
  let userRole = "";
  if (access_token) {
    const decoded = jwtDecode(access_token) as { role: string };
    userRole = decoded.role;
  }

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
  //update button text
  const [primaryButtonText, setPrimaryButtonText] = useState("");
  const [secondaryButtonText, setSecondaryButtonText] = useState("");
  const [cancelButtonText, setCancelButtonText] = useState("Cancel");

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
  }, []);

  useEffect(() => {
    if (appointment?.status === "INCOMING") {
      setPrimaryButtonText("Check In");
    }
    if (appointment?.status === "CHECKED_IN") {
      setPrimaryButtonText("Check Out");
      setSecondaryButtonText("Uncheckin");
    }
    if (
      appointment?.status === "CHECKED_OUT" ||
      appointment?.status === "CANCELLED"
    ) {
      setCancelButtonText("");
    }
  }, [appointment]);

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

  const editBtnHandler = () => {
    setDrawerType("Edit");
    if (appointment) {
      showDrawer();
    }
  };

  const postAction = () => {
    if (modalTitle === "Delete Confirmation") {
      setIsDeleted(true);
    }

    if (modalTitle === "Checkin Confirmation") {
      setSecondaryButtonText("Uncheckin");
    }
  };

  const deleteBtnHandler = () => {
    setModalTitle("Delete Confirmation");
    setModalText(`Confirm to delete ${appointment?.customer}'s appointment?`);
    if (appointment) {
      setCurrentItemId(appointment.id);
    }
    showModal();
  };

  const showModal = () => {
    setModalOpenStatus(true);
  };

  const closeModal = () => {
    setModalOpenStatus(false);
    fetchAppointment();
  };

  const primaryBtnHandler = () => {
    if (appointment) {
      setCurrentItemId(appointment.id);
    }
    if (primaryButtonText === "Check In") {
      setModalTitle("Checkin Confirmation");
      setModalText(`Confirm to check in ${appointment?.pet}?`);
    }

    if (primaryButtonText === "Check Out") {
      setModalTitle("Checkout Confirmation");
      setModalText(`Confirm to check out ${appointment?.pet}?`);
    }
    showModal();
  };

  const secondaryBtnHandler = () => {
    if (appointment) {
      setCurrentItemId(appointment.id);
    }
    if (secondaryButtonText === "Uncheckin") {
      setModalTitle("Uncheckin Confirmation");
      setModalText(`Confirm to uncheck in ${appointment?.pet}?`);
    }
    showModal();
  };

  const cancelBtnHandler = () => {
    if (appointment) {
      setCurrentItemId(appointment.id);
    }
    setModalTitle("Cancel Confirmation");
    setModalText(`Confirm to cancel ${appointment?.pet}'s appointment?`);
    showModal();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={editBtnHandler}>Edit</a>,
    },
    appointment?.status === "CHECKED_IN"
      ? {
          key: "2",
          label: <a onClick={secondaryBtnHandler}>{secondaryButtonText}</a>,
        }
      : null,
    appointment?.status !== "CHECKED_OUT" && appointment?.status !== "CANCELLED"
      ? {
          key: "3",
          label: <a onClick={cancelBtnHandler}>{cancelButtonText}</a>,
        }
      : null,
    {
      key: "4",
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
  ];

  return (
    <div className="ml-4 mb-4 py-4 px-5 bg-white shadow-lg rounded-lg overflow-y-auto overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <p className="font-semibold text-xl mr-2">
            {appointment?.baseService}
          </p>
          {appointment?.status === "INCOMING" && (
            <p className="text-orange-500 bg-orange-100 font-semibold rounded-full text-sm p-1 px-2">
              Incoming
            </p>
          )}
          {appointment?.status === "CHECKED_IN" && (
            <p className="bg-sky-100 font-semibold rounded-full text-sm text-sky-600 p-1 px-2">
              Checked In
            </p>
          )}
          {appointment?.status === "CHECKED_OUT" && (
            <p className="text-green-600 bg-green-100 font-semibold rounded-full text-sm p-1 px-2">
              Checked Out
            </p>
          )}
          {appointment?.status === "CANCELLED" && (
            <p className="text-rose-500 bg-rose-100 font-semibold rounded-full text-sm p-1 px-2">
              Cancelled
            </p>
          )}
        </div>
        <div>
          {appointment?.status !== "CHECKED_OUT" &&
            appointment?.status !== "CANCELLED" && (
              <Button
                type="primary"
                className="mr-2"
                onClick={primaryBtnHandler}
              >
                {primaryButtonText}
              </Button>
            )}
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
        postAction={postAction}
      />
    </div>
  );
};

export default AppointmentDetail;
