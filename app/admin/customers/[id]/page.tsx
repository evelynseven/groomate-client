import React, { useEffect, useState } from "react";
import CustomerDetail from "./CustomerDetail";
import PetDetail from "./PetDetail";
import AppointmentList from "./AppointmentList";

interface Props {
  params: { id: string };
}

const CustomerDetailPage = ({ params: { id } }: Props) => {
  return (
    <div className="h-full flex">
      <CustomerDetail customerId={id} />
      <PetDetail customerId={id} />
      <AppointmentList customerId={id} />
    </div>
  );
};

export default CustomerDetailPage;
