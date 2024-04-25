"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import AppointmentCard from "./AppointmentCard";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

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
  remarks: string;
}

const AppointmentList = ({ customerId }: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>();

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
  }, []);

  return (
    <div className="w-1/4 h-full overflow-hidden">
      <div className="flex justify-between m-2 items-center">
        <p className="font-semibold">Appointments</p>
        <Button icon={<PlusOutlined />} shape="round" type="link">
          New
        </Button>
      </div>
      <div className="h-full pt-1 pl-2 pb-8 overflow-y-auto ">
        {appointments &&
          appointments.map((appointment) => {
            return (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            );
          })}
      </div>
    </div>
  );
};

export default AppointmentList;
