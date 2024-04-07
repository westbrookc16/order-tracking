"use client";
import { useAuth } from "@clerk/nextjs";
import { getClients } from "@/actions/client";
import OrderForm from "@/components/orderForm";
import { useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
export default function NewOrderPage() {
  const {
    data: clients,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => {
      return getClients();
    },
  });
  const { userId } = useAuth();
  invariant(userId, "User ID should be defined");
  return (
    <div>
      {isError && <div>{error.message}</div>}
      <h1>add New Order</h1>
      {isSuccess && (
        <OrderForm
          order={{
            name: "",
            id: undefined,
            clientId: undefined,
            updatedAt: undefined,
            description: "",
            clientDueDate: undefined,
            agencyDueDate: undefined,
            status: "Pending",
            quantity: 1,

            createdAt: new Date(),

            userId: userId,
          }}
          clients={clients}
        />
      )}
    </div>
  );
}
