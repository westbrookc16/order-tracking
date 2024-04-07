"use client";
import { ClientForm } from "@/components/clientForm";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
//create a react hook form for client
import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/actions/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { client } from "@/types/client";
import { updateClient } from "@/actions/client";
import invariant from "tiny-invariant";
import { useEffect } from "react";

export default function ClientFormPage() {
  const client: client = {
    id: 0,
    name: "",
    description: "",
    isActive: true,
  };
  return (
    <div>
      <h1>New Client</h1>

      <ClientForm client={client} />
    </div>
  );
}
