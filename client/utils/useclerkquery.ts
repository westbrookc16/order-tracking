import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

export default function useClerkQuery(queryOptions: Object, url: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["key"],
    ...queryOptions,
    queryFn: async () => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (!res.ok) {
        throw new Error("Network response error");
      }

      return res.json();
    },
  });
}
