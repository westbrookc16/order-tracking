"use client";
import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/actions/client";
import { DataTable } from "@/components/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { getOrders } from "@/actions/dashboard";
import invariant from "tiny-invariant";
import { order } from "@/types/order";
import Link from "next/link";
export default function Page() {
  const { id, status } = useParams();
  invariant(id && typeof id === "string", "id is required");
  invariant(status && typeof status === "string", "status is required");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard", id, status],
    queryFn: () => {
      return getOrders(id, status);
    },
  });
  const { data: client } = useQuery({
    queryKey: ["client", id],
    queryFn: () => {
      return getClient(id);
    },
  });
  const columns: ColumnDef<order>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => (
        <Link href={`/order/${row.original.id}`}>{row.original.id}</Link>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Client Due Date",
      cell: ({ row }) => {
        invariant(row?.original?.clientDueDate, "clientDueDate is required");
        return DateTime.fromISO(row?.original?.clientDueDate?.toString())
          .toUTC()
          .toLocaleString();
      },
      accessorKey: "clientDueDate",
    },
    {
      header: "Agency Due Date",
      accessorKey: "agencyDueDate",
      cell: ({ row }) => {
        invariant(row?.original?.agencyDueDate, "agencyDueDate is required");
        return DateTime.fromISO(row.original.agencyDueDate.toString())
          .toUTC()
          .toLocaleString();
      },
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          <h1>
            {status} for {client?.name}
          </h1>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
