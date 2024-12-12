import { getPayment } from "@/services/pay";
import { useQuery } from "@tanstack/react-query";

// deprecated
export function useGetPayment(token: string) {
  return useQuery({
    queryKey: ["payments", token],
    queryFn: async () => await getPayment(token),
    retry: 3,
  });
}
