import { fetchCurrentOrder } from "@/services/cart"
import { useQuery } from "@tanstack/react-query"

export const useCurrentOrder = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: fetchCurrentOrder,
    refetchOnMount: "always",
  })
}
