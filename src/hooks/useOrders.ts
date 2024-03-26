import { useQuery } from "@tanstack/react-query"
import { fetchOrders } from "@/services/cart"

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  })
}
