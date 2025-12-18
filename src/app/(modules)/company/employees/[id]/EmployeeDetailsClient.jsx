"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import EditForm from "../EditForm";
import { useRouter } from "next/navigation";
import LoadingComponents from "@/components/LoadingComponents";

const EmployeeDetailsClient = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [manager, setManager] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getCookie("token")) router.push("/");
  }, [router]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}manager/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await res.json();
      setManager(data.data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <LoadingComponents />;

  return (
    <section className="py-14 bg-gray-100">
      <Link href="/company/employee">Back</Link>

      <h1 className="text-xl">{manager?.name}</h1>

      <Image src={manager?.image_url} width={300} height={300} alt="" />

      <button onClick={() => setOpen(true)}>Edit</button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {user && (
          <EditForm manager={manager} setManagers={setManager} />
        )}
      </Modal>
    </section>
  );
};

export default EmployeeDetailsClient;
