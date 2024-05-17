import React from "react";
import { Card } from "antd";
import dateTimeFormatter from "@/app/utils/dateTimeFormatter/dateTimeFormatter";
import { CommentOutlined } from "@ant-design/icons";
import Link from "next/link";

interface Props {
  appointment: Appointment;
}

interface Appointment {
  id: string;
  appointmentTime: string;
  pet: string;
  baseService: string;
  associate: string;
  customerId: string;
  petId: string;
  status: string;
  remarks: string;
}

const AppointmentCard = ({ appointment }: Props) => (
  <Link href={`/admin/appointments/${appointment.id}`}>
    <Card
      className="mb-4"
      title={appointment.pet}
      bordered={false}
      style={{ width: 270 }}
      hoverable
      size="small"
    >
      <p className="text-blue-500 font-semibold mb-1">
        {dateTimeFormatter(appointment.appointmentTime)}
      </p>
      <div className="flex mb-1">
        <p className="text-slate-500 mr-2">{appointment.baseService}</p>
        <div>
          {appointment.remarks ? (
            <CommentOutlined className="text-amber-500" />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-slate-500">{appointment.associate}</p>
        {appointment.status === "INCOMING" && (
          <p className="text-orange-500 bg-orange-100 font-semibold rounded-full text-xs p-1 px-2">
            Incoming
          </p>
        )}
        {appointment.status === "CHECKED_IN" && (
          <p className="text-sky-600 bg-sky-100 font-semibold rounded-full text-xs p-1 px-2">
            Checked In
          </p>
        )}
        {appointment.status === "CHECKED_OUT" && (
          <p className="text-green-600 bg-green-100 font-semibold rounded-full text-xs p-1 px-2">
            Checked Out
          </p>
        )}
        {appointment.status === "CANCELLED" && (
          <p className="text-rose-500 bg-rose-100 font-semibold rounded-full text-xs p-1 px-2">
            Cancelled
          </p>
        )}
      </div>
    </Card>
  </Link>
);

export default AppointmentCard;
