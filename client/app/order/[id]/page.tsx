"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/actions/order";
import OrderForm from "@/components/orderForm";
import { getClients } from "@/actions/client";
import { useParams } from "next/navigation";
import invariant from "tiny-invariant";
import { order } from "@/types/order";
import { client } from "@/types/client";
export default function OrderPage() {
  const { id } = useParams();
  invariant(id && typeof id === "string", "No id provided");
  const orderQuery = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
  const clientQuery = useQuery({
    queryKey: ["clients"],
    queryFn: () => {
      return getClients();
    },
  });
  if (orderQuery.isLoading || clientQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (orderQuery.isError) {
    return <div>Order Error: {orderQuery.error.message}</div>;
  }
  if (clientQuery.isError) {
    return <div>Client Error: {clientQuery.error.message}</div>;
  }
  const order = orderQuery.data as order;
  const clients = clientQuery.data as client[];
  return (
    <div>
      <h1>{order.name}</h1>
      <OrderForm order={order} clients={clients} />
    </div>
  );
}
