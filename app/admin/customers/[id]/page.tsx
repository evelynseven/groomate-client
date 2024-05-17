"use client";
import React from "react";
import CustomerDetail from "./components/CustomerDetail";
import PetDetail from "./components/PetDetail";
import AppointmentList from "./components/AppointmentList";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

const CustomerDetailPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const redirect = () => {
    router.replace("/admin/customers");
  };
  return (
    <div className="h-full flex">
      <CustomerDetail customerId={id} redirect={redirect} />
      <PetDetail customerId={id} />
      <AppointmentList customerId={id} />
    </div>
  );
};

export default CustomerDetailPage;
