"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useAuth } from "@/context/UserContext";
import BidFavoriteButton from "@/components/Front/BidFavoriteButton";
import { useRouter } from "next/navigation";
import StatusButton from "@/app/(modules)/manager/bids/[id]/StatusButton";
import Loading from "@/app/loadingScreen";

const BidVendorsButton = ({ bid }) => {
  const [meLoading, setMeLoading] = useState(false);
  const router = useRouter();

  const handleGoVendors = () => {
    setMeLoading(true);
    router.push(`/manager/bids/${bid.id}`);
  };

  return (
    <Button
      type="button"
      className="bg-[#c1272d] text-white p-2"
      onClick={handleGoVendors}
      severity="info"
    >
      {meLoading ? <Loading /> : "View"}
    </Button>
  );
};

const BidAllData = () => {
  const { user, renderFieldError, isLoding } = useAuth();
  const [requestsQuotes, setRequestsQuotes] = useState([]);
  const [bidStatus, setBidStatus] = useState([]);

  const columns = [
    { field: "bidenumber", header: "Bid Number", sortable: true },
    { field: "bidtitle", header: "Bid Title" },
    { field: "bidtype", header: "Bid Type" },
    { field: "property", header: "Property" },
    { field: "createddate", header: "Creation Date" },
    { field: "closedate", header: "Est.Close Date" },
    { field: "priority", header: "Priority" },
    { field: "status", header: "Status", actionBtn: statusBtn },
    { field: "vendor", header: "Vendors", actionBtn: vendorBtn },
  ];

  const paginatorLeft = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" />;

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            token: `${getCookie("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch bids.");

        const data = await response.json();
        const updatedRows = data.data.map((item) => ({
          favorite: item.favourite,
          favorite_id: item.favourite_id,
          id: item.id,
          manager_id: item.manager_id,
          bidenumber: item.bid_number,
          bidtitle: item.project_name,
          bidtype: item.project_type,
          property: item.property_name,
          createddate: item.created_at,
          closedate: item.close_date,
          status: item.status,
          priority: item.priority,
        }));
        setRequestsQuotes(updatedRows);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBidStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-status`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            token: `${getCookie("token")}`,
          },
        });
        const data = await response.json();
        setBidStatus(data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBids();
    fetchBidStatus();
  }, []);

  function vendorBtn(bid) {
    return <BidVendorsButton bid={bid} />;
  }

  function statusBtn(bid) {
    return <StatusButton bid={bid} setRequestsQuotes={setRequestsQuotes} requestsQuotes={requestsQuotes} bidStatus={bidStatus} />;
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
          body={col.actionBtn}
          style={{ width: "10%" }}
          pt={{
            headerCell: {
              className: "p-4 pr-4 border-b-[1px] border-black text-black sorting sorting_asc whitespace-nowrap text-black text-left",
            },
            bodyCell: {
              className: "p-4 pr-4 border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around",
            },
          }}
        />
      ))}
    </DataTable>
  );
};

export default BidAllData;
