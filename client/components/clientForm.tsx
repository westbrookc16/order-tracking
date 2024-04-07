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

export const ClientForm = ({ client }: { client: client | undefined }) => {
  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    id: z.number(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...client, //at this poitn the client is undefined
    },
  });

  const { setValue } = form;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    //invariant(id && typeof id === "string", "No id provided");
    console.log(`submit ${data.id}`);
    updateClient(data);
  }

  //initially the client is undefined (at the point of rendering)

  /*useEffect(() => {
      if (client) {
        setValue("name", client.name);
        setValue("description", client.description);
        setValue("isActive", client.isActive);
      }
    }, [client, setValue]);*/ //this check right here is to update the form when the client is fetched

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

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

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is active</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input {...field} type="hidden" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
