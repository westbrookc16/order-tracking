"use client";
import useClerkQuery from "@/utils/useclerkquery";
import { DataTable } from "@/components/ui/dataTable";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./summaryColumns";
export default function Dashboard() {
  const getDashboard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}dashboard`, {
      method: "GET",
      headers: { "Content-type": "Application/JSON" },
    });
    const data = res.json();
    //setTotals(dashboard);
    return data;
  };
  const dashboardQuery = useClerkQuery(
    { queryKey: ["dashboard"] },
    `${process.env.NEXT_PUBLIC_API_URL}dashboard`
  );

  console.log(`data=${dashboardQuery.data}`);
  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardQuery.data && (
        <DataTable columns={columns} data={dashboardQuery.data} />
      )}
    </div>
  );
}
