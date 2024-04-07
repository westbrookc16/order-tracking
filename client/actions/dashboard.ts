"use server";
import { auth } from "@clerk/nextjs/server";
export async function getOrders(id: string, status: string) {
  const authToken = auth();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}dashboard/${id}/${status}`,
    {
      headers: {
        Authorization: `Bearer ${await authToken.getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );

  //console.log(res);
  return res.json();
}
