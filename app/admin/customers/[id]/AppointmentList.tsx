"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import AppointmentCard from "./AppointmentCard";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import EditAppointment from "../../appointments/EditAppointment";

interface Props {
  customerId: string;
}

interface Appointment {
  id: string;
  appointmentTime: string;
  pet: string;
  baseService: string;
  associate: string;
  status: string;
  customerId: string;
  petId: string;
  remarks: string;
}

const AppointmentList = ({ customerId }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>();
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});

  const fetchAppointments = async () => {
    try {
      const appointments = await fetchData(
        `customers/${customerId}/appointments`
      );
      setAppointments(appointments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [openStatus]);

  const showDrawer = () => {
    setOpenStatus(true);
  };

  const closeDrawer = () => {
    setOpenStatus(false);
  };

  const addBtnHandler = () => {
    setDrawerType("Create");
    setFieldsValue({});
    showDrawer();
  };

  const editBtnHandler = (record: Appointment) => {
    setDrawerType("Edit");
    setFieldsValue(record);
    showDrawer();
  };

  return (
    <div className="w-1/4 h-full overflow-hidden">
      <div className="flex justify-between m-2 items-center">
        <p className="font-semibold">Appointments</p>
        <Button
          onClick={addBtnHandler}
          icon={<PlusOutlined />}
          shape="round"
          type="link"
        >
          {" "}
          New
        </Button>
      </div>
      {!(appointments === undefined || appointments.length === 0) && (
        <div className="h-full pt-1 pl-2 pb-8 overflow-y-auto ">
          {appointments &&
            appointments.map((appointment) => {
              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              );
            })}
        </div>
      )}
      <EditAppointment
        openStatus={openStatus}
        closeDrawer={closeDrawer}
        getAppointments={fetchAppointments}
        drawerType={drawerType}
      />
      {(appointments === undefined || appointments.length === 0) && (
        <div className="h-4/5 w-full flex justify-center items-center">
          <p className="text-gray-400 text-sm">Please add an appointment :)</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
