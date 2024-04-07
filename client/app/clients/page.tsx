"use client";
import { useFormState } from "react-dom";
import { updateClient } from "@/actions/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { DataTable } from "@/components/ui/dataTable";
import { client } from "@/types/client";
import { useAuth } from "@clerk/nextjs";
import { getClients } from "@/actions/client";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ClientsPage() {
  const clientQuery = useQuery<client[]>({
    queryKey: ["clients"],
    queryFn: () => {
      return getClients();
    },
  });
  const clientColumns: ColumnDef<client>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Is active",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <input type="checkbox" checked={row.original.isActive} disabled />
      ),
    },
    {
      header: "Edit",
      cell: ({ row }) => <Link href={`/clients/${row.original.id}`}>Edit</Link>,
    },
  ];
  return (
    <div>
      <h1>Clients</h1>

      {clientQuery.isLoading && <div>Loading...</div>}
      {clientQuery.isError && <div>Error: {clientQuery.error.message}</div>}
      {clientQuery.isSuccess && (
        <DataTable columns={clientColumns} data={clientQuery.data} />
      )}
    </div>
  );
}
