import React from "react";
import { Card } from "antd";

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
    style={{ width: 300 }}
  >
    <p>{appointment.appointmentTime}</p>
    <p>{appointment.baseService}</p>
    <p>{appointment.associate}</p>
    <p>{appointment.status}</p>
    <p>{appointment.remarks !== "" ? "hasRemarks" : "noRemarks"}</p>
  </Card>
);

export default AppointmentCard;
