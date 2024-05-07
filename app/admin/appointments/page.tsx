"use client";
import TableHeader from "@/app/components/TableHeader";
import React, { useEffect, useState } from "react";
import GenericTable from "@/app/components/GenericTable";
import { fetchData } from "@/app/api/api";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditAppointment from "./EditAppointment";
import Link from "next/link";
import dateFormatter from "@/app/utils/dateTimeFormatter/dateTimeFormatter";

interface Appointment {
  id: string;
  appointmentTime: Date;
  petId: string;
  customerId: string;
  associateId: string;
  status: string;
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
      render: (text: string, record: Appointment) => {
        const formattedDate = dateFormatter(text);

        return (
          <Link href={`appointments/${record.id}`} className="text-blue-500">
            {formattedDate}
          </Link>
        );
      },
    },
    {
      title: "Service",
      dataIndex: "baseService",
      key: "baseService",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let status = "";
        let statusTag = "";
        if (text === "INCOMING") {
          status = "Incoming";
          statusTag =
            "bg-orange-100 text-orange-500 font-semibold rounded-full px-2 py-1";
        }
        if (text === "CHECKED_IN") {
          status = "Checked In";
          statusTag =
            "bg-sky-100 text-sky-600 font-semibold rounded-full px-2 py-1";
        }
        if (text === "CHECKED_OUT") {
          status = "Checked Out";
          statusTag =
            "bg-green-100 text-green-600 font-semibold rounded-full px-2 py-1";
        }
        if (text === "CANCELLED") {
          status = "Cancelled";
          statusTag =
            "bg-rose-100 text-rose-500 font-semibold rounded-full px-2 py-1";
        }

        return (
          <div className="flex">
            <p className={statusTag}>{status}</p>
          </div>
        );
      },
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
      render: (text: string) => <a>{text ? text : "--"}</a>,
    },
  ];

  //control the table data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  //control the opening of the drawer
  const [openStatus, setOpenStatus] = useState(false);
  //control the title of the drawer
  const [drawerType, setDrawerType] = useState("");
  //control the fields value of the drawer
  const [fieldsValue, setFieldsValue] = useState({});

  const getAppointments = async () => {
    try {
      const appointments: Array<Appointment> = await fetchData("appointments");
      setAppointments(appointments.map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

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

  return (
    <div className="h-full p-5 bg-white shadow-lg rounded-lg">
      <div className="mb-4 flex justify-between">
        <TableHeader PageName="Appointments" />
        <Button type="primary" onClick={addBtnHandler} icon={<PlusOutlined />}>
          New
        </Button>
        <EditAppointment
          openStatus={openStatus}
          closeDrawer={closeDrawer}
          getAppointments={getAppointments}
          drawerType={drawerType}
        />
      </div>
      <GenericTable<Appointment> dataSource={appointments} columns={columns} />
    </div>
  );
};

export default AppointmentsPage;
