"use client";

import React, { useEffect, useState } from "react";
import CustomerDetail from "../../customers/[id]/CustomerDetail";
import { fetchData } from "@/app/api/api";
import AppointmentDetail from "./AppointmentDetail";
import SinglePetDetail from "./SinglePetDetail";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
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

const AppointmentDetailPage = ({ params: { id } }: Props) => {
  const [appointment, setAppointment] = useState<Appointment>();
  const router = useRouter();
  const redirect = () => {
    router.replace("/admin/appointments");
  };

  const fetchAppointment = async () => {
    try {
      const appointments = await fetchData(`appointments/${id}`);
      setAppointment(appointments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  return (
    <div className="h-full w-full flex justify-between">
      {appointment && (
        <CustomerDetail
          customerId={appointment.customerId}
          showDelete={false}
        />
      )}
      <div className="w-3/4 h-full">
        {appointment && (
          <AppointmentDetail
            appointmentId={appointment.id}
            redirect={redirect}
          />
        )}
        {appointment && (
          <SinglePetDetail
            customerId={appointment.customerId}
            petId={appointment.petId}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
