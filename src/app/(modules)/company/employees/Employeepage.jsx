"use client";

import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import EmployeesAllData from "./EmployeesAllData";

const Employeepage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/");
    }

    const allResult = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}manager`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
              token: getCookie("token"),
            },
          }
        );

        if (!response.ok) throw new Error("Fetch failed");

        const dataProp = await response.json();
        const updatedRows = dataProp.data.map((item) => ({
          image_url: item.image_url,
          manager_name: item.name,
          email: item.email,
          mobile: item.mobile,
          manager_type: item.type,
          id: item.id,
        }));

        setEmployees(updatedRows);
      } catch (err) {
        console.error(err);
      }
    };

    allResult();
  }, [router]);

  return (
    <section className="pt-14">
      <div className="px-10">
        <div className="mb-10 text-right">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className="rounded px-7 py-1 border border-gray-500"
          >
            Add
          </Link>
        </div>

        <EmployeesAllData
          resultData={employees}
          setEmployees={setEmployees}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {user ? (
            <>
              <h1 className="text-3xl font-medium">Add Manager</h1>
              <AddForm
                onClose={() => setIsModalOpen(false)}
                employees={employees}
                setEmployees={setEmployees}
              />
            </>
          ) : (
            <>
              <p className="text-xl mt-2">Kindly login or register</p>
              <div className="flex gap-4 mt-6">
                <Link href="/manager/login">Login</Link>
                <Link href="/manager/register">Register</Link>
              </div>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Employeepage;
