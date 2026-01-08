"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useAuth } from "@/context/UserContext";
import FavoriteButton from "@/components/Front/FavoriteButton";

const FavoriteAllData = () => {
  const { user, renderFieldError, isLoding } = useAuth();
  const [requestsQuotes, setRequestsQuotes] = useState([]);

  const columns = [
    { field: "vendorname", header: "Vendor Name", sortable: true },
    { field: "contact", header: "Contact" },
    { field: "phone", header: "Phone" },
    { field: "vendor_id", header: "Action", actionButton: favoriteBtn },
  ];

  const paginatorLeft = (
    <Button
      type="button"
      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    />
  );
  const paginatorRight = (
    <Button
      type="button"
      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    />
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            token: `${getCookie("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch favorites.");

        const data = await response.json();
        const updatedRows = data.data.map((item) => ({
          vendorname: item.vendor.name,
          contact: item.vendor.email,
          phone: item.vendor.mobile,
          vendor_id: item.vendor_id,
          manager_id: item.manager_id,
          id: item.id,
        }));
        setRequestsQuotes(updatedRows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  function favoriteBtn(bid) {
    return <FavoriteButton bid={bid} setRequestsQuotes={setRequestsQuotes} />;
  }

  return (
    <DataTable
      className="table w-full text-gray-700 dataTable no-footer dt-responsive"
      value={requestsQuotes}
      paginator
      rows={10}
      paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      paginatorLeft={paginatorLeft}
      paginatorRight={paginatorRight}
      pt={{
        thead: { className: "border-[1px] border-black" },
        tbody: { className: "border-[1px] border-black" },
      }}
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable={col.sortable}
          body={col.actionButton}
          style={{ width: "25%" }}
          pt={{
            headerCell: {
              className:
                "p-4 pr-8 border-b-[1px] border-black text-black sorting sorting_asc whitespace-nowrap text-left",
            },
            bodyCell: {
              className:
                "p-4 pr-8 border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around",
            },
          }}
        />
      ))}
    </DataTable>
  );
};

export default FavoriteAllData;
