"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useFormState } from "react-dom";
import { getOrders } from "@/actions/dashboard";
export type dashboarSummary = {
  id: string;
  name: string;
  perif: number;
  onTarget: number;
  concern: number;
  critical: number;
  error: number;
};
export const columns: ColumnDef<dashboarSummary>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    accessorKey: "name",
  },

  {
    header: "Perif",
    accessorKey: "perif",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/${row.original.id}/perif`}>
          {row.original.perif}
        </Link>
      );
    },
  },
  {
    header: "On Target",
    accessorKey: "onTarget",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/${row.original.id}/onTarget`}>
          {row.original.onTarget}
        </Link>
      );
    },
  },
  {
    header: "Concern",
    accessorKey: "concern",

    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/${row.original.id}/concern`}>
          {row.original.concern}
        </Link>
      );
    },
  },
  {
    header: "Critical",
    accessorKey: "critical",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/${row.original.id}/critical`}>
          {row.original.critical}
        </Link>
      );
    },
  },
  {
    header: "Error",
    accessorKey: "error",

    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/${row.original.id}/error`}>
          {row.original.error}
        </Link>
      );
    },
  },
];
