"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/api";
import AppointmentCard from "./AppointmentCard";

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
    <div className="w-1/4 h-full">
      <p className="font-semibold mb-4">Appointments</p>
      {appointments &&
        appointments.map((appointment) => {
          return (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          );
        })}
    </div>
  );
};

export default AppointmentList;
