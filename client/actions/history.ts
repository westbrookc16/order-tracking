"use server";
import { History } from "../types/history";
import { auth } from "@clerk/nextjs";
export const getHistory = async (orderId: number) => {
  const authToken = auth();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}history/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${await authToken.getToken()}`,
      },
    }
  );
  return res.json();
};
