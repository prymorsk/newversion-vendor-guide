"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useAuth } from "@/context/UserContext";
import BidFavoriteButton from "@/components/Front/BidFavoriteButton";
import AssignStatusButton from "@/app/(modules)/manager/bids/[id]/AssignStatusButton";
import Loading from "@/app/loadingScreen";
import { ViewModal } from "../../Modal";

const BidMessage = ({ bid }) => {
  const { navigate } = useAuth();
  const [meLoading, setMeLoading] = useState(false);

  const handleGoVendors = async () => {
    setMeLoading(true);
    navigate.push(`/manager/message/${bid.id}/${bid.vendor_id}`);
  };

  return (
    <Button
      type="button"
      className="bg-green-600 text-white p-2"
      onClick={handleGoVendors}
      severity="info"
    >
      {meLoading ? <Loading /> : "Message"}
    </Button>
  );
};

const TableData = ({ bidId }) => {
  const { user, renderFieldError, isLoding } = useAuth();
  const [vendorsData, setVendorsData] = useState([]);

  const columns = [
    { field: "name", header: "Vendor Name", sortable: true },
    { field: "email", header: "Email" },
    { field: "mobile", header: "Mobile" },
    { field: "assign_to", header: "Award To Bid", actionBtn: statusBtn },
    { field: "vendor_id", header: "Action", actionBtn: favoriteBtn },
  ];

  const paginatorLeft = (
    <Button type="button" className="relative inline-flex items-center px-2 py-2" />
  );

  const paginatorRight = (
    <Button type="button" className="relative inline-flex items-center px-2 py-2" />
  );

  useEffect(() => {
    const allResult = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}bid-vendor/${bidId}?token=${getCookie("token")}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const dataProp = await response.json();
        const newData = dataProp.data;

        const updatedRows = newData.map((item) => ({
          bid: item?.bid,
          bid_status: item?.bid?.status,
          id: item?.bid_id,
          name: item?.vendornew?.name,
          email: item?.vendornew?.email,
          mobile: item?.vendornew?.mobile,
          vendor_id: item?.vendor_id,
          manager_id: item?.manager_id,
          favorite: item?.is_favourite,
          bid_assgin_vendor: item?.is_bid_assgin,
        }));

        setVendorsData(updatedRows);
      } catch (error) {
        console.error(error);
      }
    };

    allResult();
  }, [bidId]);

  function favoriteBtn(bid) {
    return (
      <>
        <ViewModal data={vendorsData} />
        <BidFavoriteButton
          bid={bid}
          setVendorsData={setVendorsData}
          vendorsData={vendorsData}
        />
        <BidMessage bid={bid} />
      </>
    );
  }

  function statusBtn(bid) {
    return (
      <AssignStatusButton
        bid={bid}
        setVendorsData={setVendorsData}
        vendorsData={vendorsData}
      />
    );
  }

  return (
    <DataTable
      value={vendorsData}
      paginator
      rows={10}
      className="table w-full text-gray-700"
      paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      paginatorLeft={paginatorLeft}
      paginatorRight={paginatorRight}
      pt={{
        thead: { className: "border border-black" },
        tbody: { className: "border border-black" },
      }}
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable={col.sortable}
          body={col.actionBtn}
          style={{ width: "25%" }}
          pt={{
            headerCell: {
              className:
                "p-4 pr-8 border-b border-black text-black whitespace-nowrap text-left",
            },
            bodyCell: {
              className:
                "p-4 pr-8 border-b border-black whitespace-nowrap text-sm",
            },
          }}
        />
      ))}
    </DataTable>
  );
};

export default TableData;
