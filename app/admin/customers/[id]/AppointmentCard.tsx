import React from "react";
import { Card } from "antd";
import dateTimeFormatter from "@/app/utils/dateTimeFormatter/dateTimeFormatter";
import { CommentOutlined } from "@ant-design/icons";

interface Props {
  appointment: Appointment;
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

const AppointmentCard = ({ appointment }: Props) => (
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
      <p className="text-slate-500 bg-sky-100 rounded-full text-xs p-1 px-2">
        {appointment.status}
      </p>
    </div>
  </Card>
);

export default AppointmentCard;
