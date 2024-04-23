"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";

interface Appointment {
  id: string;
  appointmentTime: Date;
  petId: string;
  customerId: string;
  associateId: string;
  totalPrice: number;
  duration: number;
  remarks: string;
}

const AppointmentsPage = () => {
  const columns = [
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (text: string) => {
        const appointmentDate = new Date(text);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[appointmentDate.getMonth()];
        const day = appointmentDate.getDate();
        const year = appointmentDate.getFullYear();
        const hours = appointmentDate.getHours();
        const minutes = appointmentDate.getMinutes();
        const formattedDate = `${month} ${day}, ${year} ${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;

        return <a className="text-blue-500">{formattedDate}</a>;
      },
    },
    {
      title: "Pet",
      dataIndex: "pet",
      key: "pet",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Associate",
      dataIndex: "associate",
      key: "associate",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    const getAppointments = async () => {
      const appointments: Array<Appointment> = await fetchData("appointments");
      setAppointments(appointments.map((item) => ({ ...item, key: item.id })));
    };
    getAppointments();
  }, []);

  return (
    <>
      <TableHeader PageName="Appointments" />
      <GenericTable<Appointment> dataType={appointments} columns={columns} />
    </>
  );
};

export default AppointmentsPage;
