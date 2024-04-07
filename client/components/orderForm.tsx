import { DataTable } from "./ui/dataTable";
import { getHistory } from "@/actions/history";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { History } from "@/types/history";
import { z } from "zod";
import { DateTime } from "luxon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { order } from "@/types/order";
import { client } from "@/types/client";
import { updateOrder } from "@/actions/order";
import invariant from "tiny-invariant";
export default function OrderForm({
  order,
  clients,
}: {
  order: order;
  clients: client[];
}) {
  const auth = useAuth();
  const historyColumns: ColumnDef<History>[] = [
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        DateTime.fromISO(row.original.createdAt.toString()).toFormat("DDDD t"),
    },
    {
      header: "User",
      accessorKey: "userId",
      cell: ({ row }) => row.original.user.name,
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Notes",
      accessorKey: "notes",
    },
  ];
  //invariant(order.id, "Order ID is required");
  const historyquery = useQuery<History[]>({
    queryKey: ["history", order.id ?? ""],
    enabled: !!order.id,
    queryFn: () => getHistory(+(order.id ?? 0)),
  });
  const formSchema = z
    .object({
      name: z.string(),
      description: z.string(),
      clientDueDate: z.coerce.date(),
      agencyDueDate: z.coerce.date(),
      status: z.string(),
      quantity: z.number(),
      clientId: z.number(),
      notes: z.string(),
    })
    .refine(
      (data) => {
        if (
          DateTime.fromJSDate(data.clientDueDate) <
          DateTime.fromJSDate(data.agencyDueDate)
        ) {
          return false;
        }

        return true;
      },
      {
        message: "Client due date must be after agency due date",
        path: ["clientDueDate"],
      }
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...order, notes: "" },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    //data.agencyDueDate = DateTime.fromISO(data.agencyDueDate).toUTC().toISO();
    //data.clientDueDate = DateTime.fromISO(data.clientDueDate).toUTC().toISO();

    updateOrder({
      ...data,
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: DateTime.now().toUTC().toJSDate(),
      userId: auth.userId ?? "",
    });
    historyquery.refetch();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The name of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The description of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(+e);
                  }}
                  defaultValue={field?.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="agencyDueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={DateTime.fromISO(field?.value?.toString())
                    .toUTC()
                    .toFormat("yyyy-MM-dd")}
                />
              </FormControl>
              <FormDescription>The due date for the agency.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientDueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={DateTime.fromISO(field?.value?.toString())
                    .toUTC()
                    .toFormat("yyyy-MM-dd")}
                />
              </FormControl>

              <FormDescription>The due date for the client.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormDescription>The quantity of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The status of the order.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {parseInt(order.id ?? ")") > 0 && (
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Any notes for the order.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>

      {historyquery.isSuccess && (
        <DataTable columns={historyColumns} data={historyquery.data} />
      )}
    </Form>
  );
}
