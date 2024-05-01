"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const redirect = () => {
    router.replace("/login");
  };
  redirect();
  return;
}
