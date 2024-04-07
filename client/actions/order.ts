"use server";
import { redirect } from "next/navigation";
import { order } from "../types/order";
import { auth } from "@clerk/nextjs";

export const getOrder = async (id: string) => {
  const authToken = auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders/${id}`, {
    headers: {
      Authorization: `Bearer ${await authToken.getToken()}`,
    },
  });
  return res.json();
};
export const updateOrder = async (orderData: order) => {
  const authToken = auth();
  if (!orderData.id) {
    //insert an order
    console.log(`inserting order`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await authToken.getToken()}`,
      },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    console.log(`new order:${data.id}`);
    return redirect(`/order/${data.id}`);
  }
  console.log(`updating`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}orders/${orderData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await authToken.getToken()}`,
      },
      body: JSON.stringify(orderData),
    }
  );
  return res.json();
};
