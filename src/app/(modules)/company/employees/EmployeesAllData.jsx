"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import Image from "next/image";
import ButtonNew from "@/components/Common/ButtonNew";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useState } from "react";

export const DeleteComponent = ({ resultData, property, setEmployees }) => {
  const [loading, setLoading] = useState(false);

  const remove = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}manager/${property.id}`,
        { _method: "DELETE" },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      setEmployees(resultData.filter((v) => v.id !== property.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonNew onClick={remove}>
      Delete {loading && "…"}
    </ButtonNew>
  );
};

const EmployeesAllData = ({ resultData, setEmployees }) => {
  const actionBody = (row) => (
    <>
      {/* ✅ FIXED ROUTE */}
      <Link href={`/company/employee/${row.id}`} className="mr-2">
        View
      </Link>
      <DeleteComponent
        property={row}
        resultData={resultData}
        setEmployees={setEmployees}
      />
    </>
  );

  const nameBody = (row) => (
    <div className="flex items-center gap-2">
      <Image src={row.image_url} width={32} height={32} alt="" />
      <span>{row.manager_name}</span>
    </div>
  );

  return (
    <DataTable value={resultData} paginator rows={10}>
      <Column header="Manager" body={nameBody} />
      <Column field="email" header="Email" />
      <Column field="mobile" header="Mobile" />
      <Column field="manager_type" header="Type" />
      <Column header="Action" body={actionBody} />
    </DataTable>
  );
};

export default EmployeesAllData;
