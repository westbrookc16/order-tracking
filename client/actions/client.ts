"use server";
import { client } from "../types/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export const getClients = async () => {
  const authToken = auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}clients`, {
    headers: {
      Authorization: `Bearer ${await authToken.getToken()}`,
    },
  });
  return res.json();
};

export const getClient = async (id: string) => {
  const authToken = auth();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}clients/${id}`, {
    headers: {
      Authorization: `Bearer ${await authToken.getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const updateClient = async (clientData: client) => {
  const authToken = auth();
  console.log(`in update: ${clientData.id}`);
  if (!clientData.id) {
    //insert a client
    console.log(`inserting client`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}clients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await authToken.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    return redirect(`/clients`);
  } else {
    console.log(`updating`);
    console.log(`isActive:${clientData.isActive}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}clients/${clientData.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await authToken.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      }
    );

    return redirect(`/clients`);
  }
};
